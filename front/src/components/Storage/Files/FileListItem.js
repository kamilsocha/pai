import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { GetApp, Delete } from '@material-ui/icons'

import { useQueryGetMiniature } from 'api/useQueryGetMiniature'
import { useQueryDownloadFile, DOWNLOAD_FILE_QUERY_TYPE } from 'api/useQueryDownloadFile'
import { useMutationDeleteFile } from 'api/useMutationDeleteFile'
import { formatDateWithTime } from 'utils/formatDate'

import { getFileName } from './utils'
import * as Styled from './FileListItem.styled'

const FileListItem = ({
  isSelected,
  onSelect: handleSelect,
  id,
  date,
  path,
}) => {
  const { t } = useTranslation()
  const {
    data: miniatureData,
    isLoading,
    error,
  } = useQueryGetMiniature({ id })

  const name = getFileName(path)

  const {
    refetch: downloadFile,
    isLoading: isDownloading,
  } = useQueryDownloadFile({ id, queryType: DOWNLOAD_FILE_QUERY_TYPE.LIST }, {
    onSuccess: (downloadData) => {
      const link = document.createElement('a')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.setAttribute('download', name)
      link.setAttribute('href', downloadData)
      link.click()
      document.body.removeChild(link)
    },
    enabled: false,
  })

  const {
    mutate: deleteFileMutate,
    isLoading: isDeleting,
  } = useMutationDeleteFile()

  const handleDownloadFile = () => {
    downloadFile()
  }

  const handleDeleteFile = () => {
    deleteFileMutate({ id })
  }

  return (
    <Styled.ListItem
      selected={isSelected}
      onClick={handleSelect}
    >
      {error && <Typography color='error'>{t('action.error.getMiniature')}</Typography>}
      {isLoading ? (
        <Styled.LoadingIndicator />
      ) : (
        <>
          <Styled.ListItemAvatar>
            <Styled.Avatar variant='rounded' src={miniatureData} />
          </Styled.ListItemAvatar>
          <Styled.ListItemText
            primary={name}
            secondary={formatDateWithTime(date)}
          />
          <Styled.ListItemIcon>
            <Styled.IconButton
              onClick={handleDownloadFile}
              disabled={isDownloading}
            >
              {isDownloading && <Styled.IconButtonLoadingIndicator />}
              <GetApp />
            </Styled.IconButton>
          </Styled.ListItemIcon>
          <Styled.ListItemIcon>
            <Styled.IconButton
              onClick={handleDeleteFile}
            >
              {isDeleting && <Styled.IconButtonLoadingIndicator />}
              <Delete />
            </Styled.IconButton>
          </Styled.ListItemIcon>
        </>
      )}
    </Styled.ListItem>
  )
}

export { FileListItem }
