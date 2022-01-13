import { useQuery } from 'react-query'

import { MINIATURE_QUERY_KEY } from './queriesKeys'
import { fetchAPI } from './fetch'
import { parseFileResponse } from './utils'

const getMiniature = async (id, props) => (
  fetchAPI(
    `miniature/${id}`, {
      method: 'GET',
      ...props,
    },
  )
).then((response) => parseFileResponse(response))

export const useQueryGetMiniature = (
  { id },
  props,
) => (
  useQuery(
    [MINIATURE_QUERY_KEY, id],
    () => getMiniature(id),
    {
      enabled: !!id,
      ...props,
    },
  )
)
