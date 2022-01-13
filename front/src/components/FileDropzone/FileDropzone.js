import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'

import { validateFile } from 'utils/validateFile'
import { uploadPhotoItemsAction } from 'store/appReducer'
import * as Styled from './FileDropzone.styles'

const FileDropzone = () => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const [isProcessing, setIsProcessing] = useState(false)
  const dispatch = useDispatch()

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const readFileAsync = async (file) => (
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  )

  const ProcessFile = async (file) => {
    try {
      const result = await readFileAsync(file)
      dispatch(uploadPhotoItemsAction({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        fileType: file.type,
        type: file.type,
        image: result,
      }))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error processing file', err)
    }
  }

  const handleFiles = async (files) => {
    const filesArray = [...files]
    setIsProcessing(true)
    const validFiles = filesArray.filter((file) => validateFile(file))
    const promises = validFiles.map((file) => ProcessFile(file))
    await Promise.all(promises)
    setIsProcessing(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (isProcessing) {
      return
    }
    const { dataTransfer: { files } } = e
    if (files.length) {
      handleFiles(files)
    }
  }

  const handleFilesSelect = () => {
    const { current: { files } } = inputRef
    if (files.length) {
      handleFiles(files)
    }
  }

  return (
    <Styled.DropContainer
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <Styled.ContentContainer>
        {isProcessing ? (
          <Styled.CircularProgressContainer>
            <Styled.CircularProgress />
          </Styled.CircularProgressContainer>
        ) : null}
        <Styled.UploadIcon />
        <Typography>
          {t('uploadSection.uploadPhotos')}
        </Typography>
        <Styled.UploadInput
          ref={inputRef}
          type='file'
          multiple
          onChange={handleFilesSelect}
          disabled={isProcessing}
        />
        <Styled.FileFormatText>
          {t('uploadSection.jpegOnly')}
        </Styled.FileFormatText>
      </Styled.ContentContainer>
    </Styled.DropContainer>
  )
}

export { FileDropzone }
