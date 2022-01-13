import React from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { AppProviders } from 'providers/AppProviders'
import { Content } from 'content/Content'
import ErrorBoundary from 'ErrorBoundary/ErrorBoundary'

const App = () => (
  <StylesProvider injectFirst>
    <AppProviders>
      <ErrorBoundary>
        <CssBaseline />
        <Content />
      </ErrorBoundary>
    </AppProviders>
  </StylesProvider>
)

export default App
