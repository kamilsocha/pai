import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'

import { FileDropzone } from 'components/FileDropzone/FileDropzone'
import { PhotoList } from 'components/List/PhotoList/PhotoList'
import { removePhotoItemAction, resetAllAction } from 'store/appReducer'
import * as Styled from './PhotoUploadSection.styles'

const PhotoUploadSection = () => {
  const { t } = useTranslation()
  const photoItems = useSelector((state) => state.root.app.photoItems)
  const dispatch = useDispatch()

  const handlePhotoRemove = (id) => {
    dispatch(removePhotoItemAction(id))
  }

  return (
    <Styled.Container>
      <Styled.DropzoneContainer>
        <FileDropzone />
        <Button
          type='button'
          variant='contained'
          onClick={() => dispatch(resetAllAction())}
        >
          {t('common.resetAll')}
        </Button>
      </Styled.DropzoneContainer>
      <Styled.PhotoListContainer>
        <PhotoList photoItems={photoItems} onRemove={handlePhotoRemove} />
      </Styled.PhotoListContainer>
    </Styled.Container>
  )
}

export { PhotoUploadSection }
