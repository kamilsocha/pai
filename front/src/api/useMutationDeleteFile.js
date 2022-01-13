import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { FILES_QUERY_KEY } from './queriesKeys'
import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const deleteFile = async (
  { id },
  props,
) => fetchAPI(
  `delete/${id}`, {
    method: 'DELETE',
    ...props,
  },
).then((response) => parseResponse(response))

export const useMutationDeleteFile = (
  props,
) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(
    ({ id }) => deleteFile({ id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FILES_QUERY_KEY)
        enqueueSnackbar(
          t('action.success.deleteFile'),
          { variant: 'success' },
        )
      },
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.deleteFile')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      ...props,
    },
  )
}
