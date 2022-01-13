import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import { combineProviders } from 'react-combine-providers'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { MuiThemeProvider } from '@material-ui/core'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nextProvider } from 'react-i18next'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import i18n from 'i18n'
import store, { persistor } from 'store'
import { theme } from 'themes'
import { PhotoPreviewProvider } from './PhotoPreviewProvider'
import { SnackbarProvider } from './SnackbarProvider'

const queryClient = new QueryClient()

const AppProviders = ({ children }) => {
  const providers = combineProviders()

  providers.push(QueryClientProvider, { client: queryClient })
  providers.push(StoreProvider, { store })
  providers.push(PersistGate, { persistor, loading: null })
  providers.push(Router)
  providers.push(MuiThemeProvider, { theme })
  providers.push(EmotionThemeProvider, { theme })
  providers.push(I18nextProvider, { i18n })
  providers.push(SnackbarProvider)

  providers.push(PhotoPreviewProvider)

  const MasterProvider = providers.master()

  return <MasterProvider>{children}</MasterProvider>
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AppProviders }
