import { useQuery } from 'react-query'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { FILE_QUERY_KEY } from './queriesKeys'
import { fetchAPI } from './fetch'
import { parseFileResponse } from './utils'

export const DOWNLOAD_FILE_QUERY_TYPE = Object.freeze({
  DETAILS: 'DETAILS',
  LIST: 'LIST',
})

const downloadFile = async (id, props) => (
  fetchAPI(
    `download/${id}`, {
      method: 'GET',
      ...props,
    },
  )
).then((response) => parseFileResponse(response))

export const useQueryDownloadFile = (
  { id, queryType },
  props,
) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  return useQuery(
    [FILE_QUERY_KEY, id, queryType],
    () => downloadFile(id),
    {
      onError: (error) => {
        enqueueSnackbar(
          `${t('action.error.downloadFile')}: ${error.message}`,
          { variant: 'error' },
        )
      },
      enabled: !!id,
      ...props,
    },
  )
}
