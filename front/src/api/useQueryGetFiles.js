import { useQuery } from 'react-query'

import { FILES_QUERY_KEY } from './queriesKeys'
import { fetchAPI } from './fetch'
import { parseResponse } from './utils'

const getFiles = async (props) => (
  fetchAPI(
    'get', {
      method: 'GET',
      ...props,
    },
  )
).then((response) => parseResponse(response))

export const useQueryGetFiles = (
  props,
) => (
  useQuery(
    [FILES_QUERY_KEY],
    () => getFiles(),
    { ...props },
  )
)
