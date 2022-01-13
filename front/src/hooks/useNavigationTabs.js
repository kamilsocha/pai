import { useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { contains } from 'utils/contains'

const useNavigationTabs = (tabs) => {
  const { pathname } = useLocation()

  return useMemo(
    () =>
      tabs.map((tab) => ({
        ...tab,
        selected: tab.partial
          ? contains(pathname, tab.partial)
          : !!matchPath(pathname, {
            path: tab.to,
            exact: true,
          }),
      })),
    [pathname, tabs],
  )
}

export { useNavigationTabs }
