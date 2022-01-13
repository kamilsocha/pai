import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const logout = async (
  props,
) => fetchAPI(
  'logout', {
    method: 'POST',
    ...props,
  },
).then((response) => parseResponse(response))

export const useMutationLogout = (
  props,
) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const { onSuccess } = props || {}

  return useMutation(
    () => logout(),
    {
      onSuccess: () => {
        enqueueSnackbar(
          t('action.success.logout'),
          { variant: 'success' },
        )
        onSuccess?.()
      },
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.logout')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      ...props,
    },
  )
}
