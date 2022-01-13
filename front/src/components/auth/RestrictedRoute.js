import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { useIsAuthenticated } from 'hooks/useIsAuthenticated'

const RestrictedRoute = ({ accessRoles, children, ...rest }) => {
  const location = useLocation()
  const isLoggedIn = useIsAuthenticated()

  const redirectPath = isLoggedIn ? {
    pathname: '/',
  } : {
    pathname: '/sign-in',
    state: {
      redirectPath: location.pathname,
    },
  }

  return (
    <Route {...rest}>
      {isLoggedIn
        ? children
        : <Redirect to={redirectPath} />}
    </Route>
  )
}

export { RestrictedRoute }
