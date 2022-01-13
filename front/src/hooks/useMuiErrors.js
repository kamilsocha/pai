import { useTranslation } from 'react-i18next'

const useMUIErrors = (errors, touched) => {
  const { t } = useTranslation()
  const arr = Object.entries(errors)

  return arr.reduce((result, [name, fieldError]) => (touched[name] ? {
    ...result,
    [name]: {
      helperText: t(fieldError),
      error: Boolean(fieldError),
    },
  } : { ...result }), {})
}

export { useMUIErrors }
