import { useMemo } from 'react'
import { useLocation, matchPath } from 'react-router-dom'

import { PATHS } from 'routes/Routes'

const authPages = [
  PATHS.SIGN_IN,
  PATHS.SIGN_UP,
]

const useIsAuthPage = () => {
  const { pathname } = useLocation()
  const isAuthPage = useMemo(
    () =>
      authPages.some((page) =>
        matchPath(pathname, {
          path: page,
        })),
    [pathname],
  )
  return isAuthPage
}

export { useIsAuthPage }
