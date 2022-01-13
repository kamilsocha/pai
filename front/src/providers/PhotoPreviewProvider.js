import { useState } from 'react'
import constate from 'constate'

const [PhotoPreviewProvider, usePreviewPhoto, useSetPreviewPhoto] = constate(
  () => {
    const [photo, setPhoto] = useState(null)

    return {
      photo,
      setPhoto,
    }
  },
  (value) => value.photo,
  (value) => value.setPhoto,
)

export {
  PhotoPreviewProvider,
  usePreviewPhoto,
  useSetPreviewPhoto,
}
