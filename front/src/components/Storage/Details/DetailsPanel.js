import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQueryDownloadFile, DOWNLOAD_FILE_QUERY_TYPE } from 'api/useQueryDownloadFile'
import { useMutationDeleteFile } from 'api/useMutationDeleteFile'
import { useSelectedFile, useSetSelectedFile } from 'providers/SelectedFileProvider'
import { formatDateWithTime } from 'utils/formatDate'
import { getCoordinates } from 'utils/piexifFun'

import * as Styled from './DetailsPanel.styles'

const DetailsPanel = () => {
  const { t } = useTranslation()
  const [coordinates, setCoordinates] = useState(null)
  const selectedFile = useSelectedFile()
  const setSelectedFile = useSetSelectedFile()
  const { id, name, date } = selectedFile || {}

  const {
    data: fileData,
    refetch: downloadFile,
    isLoading: isLoadingFile,
    error,
  } = useQueryDownloadFile({ id, queryType: DOWNLOAD_FILE_QUERY_TYPE.DETAILS }, {
    enabled: false,
    onSuccess: (data) => {
      const c = getCoordinates(data)
      console.log(c)
      setCoordinates(c)
    },
  })

  useEffect(() => {
    if (id) {
      downloadFile({ id })
    }
  }, [id, downloadFile])

  const {
    mutate: deleteFileMutate,
    isLoading: isDeleting,
  } = useMutationDeleteFile()

  const handleDownload = () => {
    const link = document.createElement('a')
    link.style.display = 'none'
    document.body.appendChild(link)
    link.setAttribute('download', name)
    link.setAttribute('href', fileData)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = () => {
    deleteFileMutate({ id }, {
      onSuccess: () => {
        setSelectedFile(null)
        setCoordinates(null)
      },
    })
  }

  return (
    <Styled.Container>
      {selectedFile ? (
        <>
          {error && (
            <Styled.CenteredMessage color='error'>
              {t('action.error.downloadFile')}
            </Styled.CenteredMessage>
          )}
          {isLoadingFile ? (
            <Styled.LoadingIndicator />
          ) : (
            <Styled.ImageContainer>
              <Styled.Image src={fileData} />
            </Styled.ImageContainer>
          )}
          <Styled.ActionsContainer>
            <Styled.DownloadButton onClick={handleDownload}>
              {t('storage.action.download')}
            </Styled.DownloadButton>
            <Styled.DeleteButton onClick={handleDelete} disabled={isDeleting}>
              {t('storage.action.delete')}
            </Styled.DeleteButton>
          </Styled.ActionsContainer>
          <Styled.DetailsContainer>
            <Styled.Row>
              <Styled.Label>{t('storage.fileDetails.name')}</Styled.Label>
              <Styled.Value>{name}</Styled.Value>
            </Styled.Row>
            <Styled.Row>
              <Styled.Label>{t('storage.fileDetails.uploadDate')}</Styled.Label>
              <Styled.Value>{formatDateWithTime(date)}</Styled.Value>
            </Styled.Row>
            <Styled.Row>
              <Styled.Label>{t('storage.fileDetails.latitude')}</Styled.Label>
              <Styled.Value>
                {!coordinates?.error ? coordinates?.lat : t('storage.fileDetails.notAvailable')}
              </Styled.Value>
            </Styled.Row>
            <Styled.Row>
              <Styled.Label>{t('storage.fileDetails.longitude')}</Styled.Label>
              <Styled.Value>
                {!coordinates?.error ? coordinates?.lng : t('storage.fileDetails.notAvailable')}
              </Styled.Value>
            </Styled.Row>
          </Styled.DetailsContainer>
        </>
      ) : (
        <Styled.CenteredMessage>{t('storage.fileDetails.noFileChosen')}</Styled.CenteredMessage>
      )}
    </Styled.Container>
  )
}

export { DetailsPanel }
