import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const login = async (
  body,
  props,
) => fetchAPI(
  'login', {
    method: 'POST',
    body: JSON.stringify(body),
    ...props,
  },
).then((response) => parseResponse(response))

export const useMutationLogin = (
  props,
) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  return useMutation(
    ({ username, password }) => login({ username, password }),
    {
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.login')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      ...props,
    },
  )
}
