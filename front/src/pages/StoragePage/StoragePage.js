import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

import { useMutationUploadFile } from 'api/useMutationUploadFile'
import { DetailsPanel } from 'components/Storage/Details/DetailsPanel'
import { UploadFilesDialog } from 'components/Storage/Files/UploadFilesDialog'
import { FileList } from 'components/Storage/Files/FileList'
import { FILES_QUERY_KEY } from 'api/queriesKeys'
import SelectedFileProvider from 'providers/SelectedFileProvider'

import * as Styled from './StoragePage.styled'

const StoragePage = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

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
    <Styled.Container>
      <SelectedFileProvider>
        <Styled.DetailsContainer>
          <DetailsPanel />
        </Styled.DetailsContainer>
        <Styled.FilesContainer>
          <Styled.UploadFilesButton
            variant='contained'
            onClick={() => setOpen(true)}
          >
            {t('storage.uploadFromComputer')}
          </Styled.UploadFilesButton>
          <UploadFilesDialog
            open={open}
            onClose={() => setOpen(false)}
            onUpload={handleUpload}
            isLoading={isLoading}
            onUploadFinished={handleUploadFinished}
            acceptedFileTypes={['.jpg', '.jpeg']}
          />
          <FileList />
        </Styled.FilesContainer>
      </SelectedFileProvider>
    </Styled.Container>
  )
}

export default StoragePage
