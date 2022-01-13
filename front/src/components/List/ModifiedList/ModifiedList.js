import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Tooltip, Typography } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import DeleteIcon from '@material-ui/icons/Delete'
import BackupIcon from '@material-ui/icons/Backup'

import { useMutationUploadFile } from 'api/useMutationUploadFile'
import { FILES_QUERY_KEY } from 'api/queriesKeys'
import { UploadFilesDialog } from 'components/Storage/Files/UploadFilesDialog'
import RestrictedContent from 'components/auth/RestrictedContent'
import { ITEM_TYPES } from 'constants/ItemTypes'
import { FileStatusType } from 'hooks/useUploadFiles'

import { PhotoItem } from '../ListItem/PhotoItem/PhotoItem'
import { ModifiedGroupItem } from '../ListItem/ModifiedGroupItem/ModifiedGroupItem'
import * as CommonStyled from '../List.styles'
import * as Styled from './ModifiedList.styles'

const ModifiedList = ({ items, onRemove: handleRemove }) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [isOpenLoading, setIsOpenLoading] = useState(false)
  const [uploadDialogState, setUploadDialogState] = useState({
    open: false,
    initFiles: [],
  })

  const handleDownloadGroupPhotos = (photoItems) => {
    const link = document.createElement('a')
    link.style.dislay = 'none'
    document.body.appendChild(link)
    photoItems.forEach((photoItem) => {
      link.setAttribute('download', `m-${photoItem.photo.name}`)
      link.setAttribute('href', photoItem.photo.image)
      link.click()
    })
    document.body.removeChild(link)
  }

  const handleOpenUploadDialog = async (item) => {
    setIsOpenLoading(true)
    if (item.type === ITEM_TYPES.PHOTO) {
      const res = await fetch(item.photo.image)
      const blob = await res.blob()
      const file = new File([blob], item.photo.name, { ...item.photo })
      setUploadDialogState({
        open: true,
        initFiles: [{ file, status: FileStatusType.WAITING }],
      })
    } else {
      const files = []
      const promises = item.photoItems.map(async ({ photo }) => {
        const res = await fetch(photo.image)
        const blob = await res.blob()
        files.push(new File([blob], photo.name, { ...photo }))
      })
      await Promise.all(promises)
      setUploadDialogState({
        open: true,
        initFiles: files.map((file) => ({ file, status: FileStatusType.WAITING })),
      })
    }
    setIsOpenLoading(false)
  }

  const {
    mutateAsync: uploadFileMutateAsync,
    isLoading,
  } = useMutationUploadFile({
    onSuccess: () => {
      queryClient.invalidateQueries([FILES_QUERY_KEY])
    },
  })

  const handleUpload = async (file) => {
    await uploadFileMutateAsync({
      file,
    })
  }

  const handleUploadFinished = () => {
    enqueueSnackbar(t('storage.action.allUploaded'), { variant: 'info' })
  }

  return (
    <CommonStyled.HorizontalList>
      {items.length ? (
        items.map((item) => (
          <Styled.Container key={item.id}>
            {item.type === ITEM_TYPES.PHOTO ? (
              <PhotoItem photo={item?.photo} draggable={false} />
            ) : (
              <ModifiedGroupItem group={item} />
            )}
            <Styled.DetailsContainer>
              <Styled.GeoLocationContainer>
                <Styled.DetailsText>
                  {`${t('common.latitude')} ${item.coordinates.lat}`}
                </Styled.DetailsText>
                <Styled.DetailsText>
                  {`${t('common.longitude')} ${item.coordinates.lng}`}
                </Styled.DetailsText>
              </Styled.GeoLocationContainer>
              <Styled.ButtonsContainer>
                <RestrictedContent>
                  <Tooltip title={t('common.uploadToRepo')}>
                    <CommonStyled.IconButton
                      onClick={() => handleOpenUploadDialog(item)}
                      disabled={isOpenLoading}
                    >
                      <BackupIcon />
                    </CommonStyled.IconButton>
                  </Tooltip>
                </RestrictedContent>
                <Tooltip title={t('common.download')}>
                  {item.type === ITEM_TYPES.PHOTO ? (
                    <CommonStyled.IconButton
                      href={item?.photo?.image}
                      download={`m-${item?.photo?.name}`}
                    >
                      <CloudDownloadIcon />
                    </CommonStyled.IconButton>
                  ) : (
                    <CommonStyled.IconButton
                      onClick={() => handleDownloadGroupPhotos(item.photoItems)}
                    >
                      <CloudDownloadIcon />
                    </CommonStyled.IconButton>
                  )}
                </Tooltip>
                <Tooltip title={t('common.remove')}>
                  <CommonStyled.IconButton onClick={() => handleRemove(item?.id)}>
                    <DeleteIcon />
                  </CommonStyled.IconButton>
                </Tooltip>
              </Styled.ButtonsContainer>
            </Styled.DetailsContainer>
          </Styled.Container>
        ))
      ) : (
        <Typography variant='subtitle1'>
          {t('downloadSection.noPhotos')}
        </Typography>
      )}
      <UploadFilesDialog
        open={uploadDialogState.open}
        onClose={() => setUploadDialogState({
          open: false,
          initFiles: [],
        })}
        onUpload={handleUpload}
        isLoading={isLoading}
        onUploadFinished={handleUploadFinished}
        acceptedFileTypes={['.jpg', '.jpeg']}
        initFiles={uploadDialogState.initFiles}
        addingDisabled
      />
    </CommonStyled.HorizontalList>
  )
}

ModifiedList.defaultProps = {
  items: [],
}

ModifiedList.propTypes = {
  items: PropTypes.array,
}

export { ModifiedList }
