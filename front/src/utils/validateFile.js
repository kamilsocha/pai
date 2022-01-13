const validFileTypes = ['image/jpeg']

const validateFile = (file) => (
  validFileTypes.indexOf(file.type) !== -1
)

export { validateFile }
