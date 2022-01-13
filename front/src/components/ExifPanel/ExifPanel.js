import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { updateModifiedItemsAction } from 'store/appReducer'
import { setCoordinates } from 'utils/piexifFun'
import { PhotoPlaceholder } from './PhotoPlaceholder/PhotoPlaceholder'
import { PhotoExifDetails } from './PhotoExifDetails/PhotoExifDetails'
import * as Styled from './ExifPanel.styles'

const ExifPanel = () => {
  const [chosenPhotoId, setChosenPhotoId] = useState(null)
  const chosenPhoto = useSelector((state) => (
    state.root.app.photoItems.find(({ id }) => id === chosenPhotoId)
  ))
  const dispatch = useDispatch()

  const handleSave = (coordinates) => {
    const updatedImage = setCoordinates(chosenPhoto?.photo?.image, coordinates)
    const modifiedPhotoItem = {
      ...chosenPhoto,
      photo: {
        ...chosenPhoto.photo,
        image: updatedImage,
      },
      coordinates,
    }
    dispatch(updateModifiedItemsAction(modifiedPhotoItem))
  }

  return (
    <Styled.Container>
      <Styled.PhotoContainer>
        <PhotoPlaceholder
          photo={chosenPhoto?.photo}
          setPhotoItem={setChosenPhotoId}
        />
      </Styled.PhotoContainer>
      <Styled.ExifDetailsContainer>
        <PhotoExifDetails
          photo={chosenPhoto?.photo}
          onRemove={() => setChosenPhotoId(null)}
          onSubmit={handleSave}
        />
      </Styled.ExifDetailsContainer>
    </Styled.Container>
  )
}

export { ExifPanel }
