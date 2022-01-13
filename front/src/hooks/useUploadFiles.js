import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react'

export const FileStatusType = {
  WAITING: 'WAITING',
  UPDATING: 'UPDATING',
  FAILED: 'FAILED',
  OK: 'OK',
}

const useUploadFiles = (isCanUploadFilesRefReinitialized, initFiles) => {
  const [files, setFiles] = useState(initFiles)
  const canUploadFilesRef = useRef(true)

  useEffect(() => {
    setFiles(initFiles)
  }, [initFiles])

  const handleFileInputChange = ({
    target: {
      validity,
      files: inputFiles,
    },
  }) => {
    if (validity.valid && inputFiles) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(inputFiles).map((file) => ({
          file,
          status: FileStatusType.WAITING,
        })),
      ])
    }
  }

  const handleRemoveFile = useCallback(
    (fileToRemove) => {
      const newFiles = files.filter(({ file: { name } }) => name !== fileToRemove)
      setFiles(newFiles)
    },
    [setFiles, files],
  )

  const handleUpdateFile = (index, props) => (
    setFiles((prev) => prev.map((file, i) => (
      index === i
        ? { ...file, ...props }
        : file
    )))
  )

  useEffect(() => {
    if (isCanUploadFilesRefReinitialized) {
      canUploadFilesRef.current = true
    }
  }, [canUploadFilesRef, isCanUploadFilesRefReinitialized])

  return {
    files,
    canUploadFilesRef,
    setFiles,
    handleRemoveFile,
    handleUpdateFile,
    handleFileInputChange,
  }
}

export { useUploadFiles }
