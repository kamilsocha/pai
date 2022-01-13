import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { RestrictedRoute } from 'components/auth/RestrictedRoute'
import AuthPage from 'pages/AuthPage/AuthPage'
import ExifPanelPage from 'pages/ExifPanelPage/ExifPanelPage'
import MapPage from 'pages/MapPage/MapPage'
import StoragePage from 'pages/StoragePage/StoragePage'
import { PATHS } from './constants'

const Routes = () => (
  <Switch>
    <Route exact path={PATHS.MAP}>
      <MapPage />
    </Route>
    <RestrictedRoute exact path={PATHS.INFO}>
      <ExifPanelPage />
    </RestrictedRoute>
    <RestrictedRoute exact path={PATHS.STORAGE}>
      <StoragePage />
    </RestrictedRoute>
    <Route exact path={PATHS.SIGN_IN}>
      <AuthPage />
    </Route>
    <Route exact path={PATHS.SIGN_UP}>
      <AuthPage />
    </Route>
    <Redirect from='*' to={PATHS.MAP} />
  </Switch>
)

export { Routes, PATHS }
