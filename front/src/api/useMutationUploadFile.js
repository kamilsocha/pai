import { useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { FILES_QUERY_KEY } from './queriesKeys'
import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const uploadFile = async (
  { file },
  props,
) => {
  const formData = new FormData()
  formData.append('file', file)

  return fetchAPI(
    'save', {
      method: 'POST',
      body: formData,
      ...props,
    },
  ).then((response) => parseResponse(response))
}

export const useMutationUploadFile = (
  props,
) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation(
    ({ file }) => uploadFile({ file }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(FILES_QUERY_KEY)
        enqueueSnackbar(
          t('action.success.uploadFile'),
          { variant: 'success' },
        )
      },
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.uploadFile')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      ...props,
    },
  )
}
