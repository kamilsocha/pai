import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { useUploadFiles, FileStatusType } from 'hooks/useUploadFiles'
import * as Styled from './UploadFilesDialog.styles'

const MAX_RESOURCE_SIZE = 50000000

const toMegaBytesText = (size) => `${(size / 1000000).toFixed(2)}MB`

const UploadFilesDialog = ({
  open,
  onClose,
  onUpload: handleUpload,
  isLoading,
  onUploadFinished: handleUploadFinished,
  acceptedFileTypes,
  initFiles = [],
  addingDisabled = false,
  ...rest
}) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [isUploadingCanceling, setIsUploadingCanceling] = useState(false)
  const {
    files,
    canUploadFilesRef,
    setFiles,
    handleRemoveFile,
    handleUpdateFile,
    handleFileInputChange,
  } = useUploadFiles(open, initFiles)

  const handleSubmit = async () => {
    let failedFiles = 0
    let uploadedFiles = 0
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, { file, status }] of files.entries()) {
      if (!canUploadFilesRef.current) {
        canUploadFilesRef.current = true
        return
      }
      if (status === FileStatusType.OK) {
        // eslint-disable-next-line no-continue
        continue
      }
      handleUpdateFile(index, { status: FileStatusType.UPDATING })
      try {
        // eslint-disable-next-line no-await-in-loop
        await handleUpload(file)
        handleUpdateFile(index, { status: FileStatusType.OK })
        uploadedFiles += 1
      } catch (error) {
        handleUpdateFile(index, { status: FileStatusType.FAILED })
        failedFiles += 1
      }
    }
    handleUploadFinished?.()
    if (failedFiles) {
      enqueueSnackbar(
        failedFiles > 1
          ? t('action.error.uploadFiles', { failedFiles })
          : t('action.error.uploadFile'),
        { variant: 'error' },
      )
    }
    if (uploadedFiles) {
      enqueueSnackbar(
        uploadedFiles > 1
          ? t('action.success.uploadFiles', { uploadedFiles })
          : t('action.success.uploadFile'),
        { variant: 'success' },
      )
    }
  }

  const handleUploadingCancel = () => {
    canUploadFilesRef.current = false
  }

  const handleDismissUploadDialog = useCallback(() => {
    onClose()
    canUploadFilesRef.current = false
    if (files.length) {
      setFiles([])
    }
  }, [
    onClose,
    canUploadFilesRef,
    files,
    setFiles,
  ])

  useEffect(() => {
    if (!isLoading) {
      setIsUploadingCanceling(false)
    }
  }, [isLoading])

  const hasEveryResourceCorrectSize = useMemo(() => (
    files.every(({ file: resource }) => resource.size <= MAX_RESOURCE_SIZE)
  ), [files])

  return (
    <Dialog
      disableBackdropClick
      onClose={handleDismissUploadDialog}
      open={open}
      {...rest}
    >
      <DialogTitle>{t('storage.title')}</DialogTitle>
      <DialogContent>
        {!addingDisabled && (
          <label htmlFor='upload-photos-videos'>
            <Styled.FileInput
              id='upload-photos-videos'
              name='upload-photos-videos'
              type='file'
              accept={acceptedFileTypes?.join()}
              multiple
              onChange={handleFileInputChange}
            />
            <Button
              variant='outlined'
              component='span'
            >
              {t('storage.action.addFromComputer')}
            </Button>
          </label>
        )}
        {!hasEveryResourceCorrectSize && (
          <Styled.Alert severity='error'>
            <Typography variant='caption'>
              {t('storage.action.maxFileSize', { maxSize: MAX_RESOURCE_SIZE / 1_000_000 })}
            </Typography>
          </Styled.Alert>
        )}
        <Styled.List>
          {files.map(({ file: { name, size }, status }) => (
            <div key={name}>
              <Styled.ListItem>
                <ListItemText
                  primaryTypographyProps={{
                    noWrap: true,
                  }}
                  primary={name}
                  secondary={(
                    <>
                      <Styled.SizeSpan isTooBig={size > MAX_RESOURCE_SIZE}>
                        {toMegaBytesText(size)}
                      </Styled.SizeSpan>
                      {status === FileStatusType.FAILED && (
                        <Typography variant='overline' color='error'>
                          {t('common.error')}
                        </Typography>
                      )}
                    </>
                  )}
                />
                <ListItemSecondaryAction>
                  {status === FileStatusType.OK ? (
                    <Styled.CheckIcon color='primary' />
                  ) : (
                    <IconButton
                      onClick={() => handleRemoveFile(name)}
                      disabled={isLoading}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </Styled.ListItem>
              <Styled.LinearProgress
                color='secondary'
                $isUpdating={status === FileStatusType.UPDATING}
              />
            </div>
          ))}
        </Styled.List>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={handleDismissUploadDialog}
        >
          {t('common.cancel')}
        </Button>
        <Button
          disabled={!isLoading}
          variant='outlined'
          onClick={() => {
            setIsUploadingCanceling(true)
            handleUploadingCancel()
          }}
          startIcon={isLoading && isUploadingCanceling && (
            <CircularProgress size={14} />
          )}
        >
          {t('storage.action.stopUploading')}
        </Button>
        <Button
          variant='contained'
          disabled={!files.some(({ status }) => status === FileStatusType.WAITING) || isLoading}
          onClick={handleSubmit}
        >
          {t('common.upload')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { UploadFilesDialog }
