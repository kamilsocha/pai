import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const register = async (
  body,
  props,
) => fetchAPI(
  'register', {
    method: 'POST',
    body: JSON.stringify(body),
    ...props,
  },
).then((response) => parseResponse(response))

export const useMutationRegister = (
  props,
) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const { onSuccess } = props || {}

  return useMutation(
    ({ username, password }) => register({ username, password }),
    {
      onSuccess: () => {
        enqueueSnackbar(
          t('action.success.register'),
          { variant: 'success' },
        )
        onSuccess?.()
      },
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.register')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      ...props,
    },
  )
}
