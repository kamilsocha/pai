import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePreviewPhoto, useSetPreviewPhoto } from 'providers/PhotoPreviewProvider'
import { Typography } from '@material-ui/core'

import { getCoordinates } from 'utils/piexifFun'
import * as Styled from './PhotoPreviewPanel.styles'

const PhotoPreviewPanel = () => {
  const { t } = useTranslation()
  const photo = usePreviewPhoto()
  const setPreviewPhoto = useSetPreviewPhoto()
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    if (photo) {
      const c = getCoordinates(photo.image)
      setCoordinates(c)
    } else {
      setCoordinates(null)
    }
  }, [photo])

  return (
    <Styled.Modal
      open={!!photo}
      onClose={() => setPreviewPhoto(null)}
    >
      <Styled.ModalContent>
        <Typography>{photo?.name}</Typography>
        <Styled.CloseButton onClick={() => setPreviewPhoto(null)} />
        <Styled.ImageContainer $image={photo?.image}>
          <Styled.Image src={photo?.image} />
        </Styled.ImageContainer>
        {coordinates?.lat && coordinates?.lng && (
          <Styled.CoordinatesContainer>
            <Styled.CoordinateContainer>
              <Styled.CoordinatesLabel>{t('common.latitude')}:</Styled.CoordinatesLabel>
              <Typography>{coordinates.lat}</Typography>
            </Styled.CoordinateContainer>
            <Styled.CoordinateContainer>
              <Styled.CoordinatesLabel>{t('common.longitude')}:</Styled.CoordinatesLabel>
              <Typography>{coordinates.lng}</Typography>
            </Styled.CoordinateContainer>
          </Styled.CoordinatesContainer>
        )}
      </Styled.ModalContent>
    </Styled.Modal>
  )
}

export { PhotoPreviewPanel }
