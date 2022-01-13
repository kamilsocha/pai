import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'

import * as Styled from './PhotoPlaceholder.styles'

const PhotoPlaceholder = ({ photo, setPhotoItem }) => {
  const { t } = useTranslation()

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const { id } = JSON.parse(e.dataTransfer.getData('itemInfo'))
    setPhotoItem(id)
  }

  return (
    <Styled.PhotoContainer
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {photo ? (
        <Styled.ImageContainer>
          <Styled.Image src={photo?.image} alt={photo?.name} />
        </Styled.ImageContainer>
      ) : (
        <>
          <Styled.DropIcon />
          <Typography>
            {t('exifPanel.dragUploadedPhoto')}
          </Typography>
        </>
      )}
    </Styled.PhotoContainer>
  )
}

PhotoPlaceholder.defaultProps = {
  photo: null,
}

PhotoPlaceholder.propTypes = {
  photo: PropTypes.object,
  setPhotoItem: PropTypes.func.isRequired,
}

export { PhotoPlaceholder }
