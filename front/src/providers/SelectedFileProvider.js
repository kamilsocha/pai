import { useState } from 'react'
import constate from 'constate'

const [SelectedFileProvider, useSelectedFile, useSetSelectedFile] = constate(
  () => {
    const [file, setFile] = useState(null)

    return {
      file,
      setFile,
    }
  },
  (value) => value.file,
  (value) => value.setFile,
)

export {
  useSelectedFile,
  useSetSelectedFile,
}

export default SelectedFileProvider
