import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SnackbarProvider as MaterialSnackbarProvider } from 'notistack'
import { Button } from '@material-ui/core'

const SnackbarProvider = ({ children }) => {
  const { t } = useTranslation()
  const snackbarRef = useRef(null)

  const handleDismiss = useCallback((key) => (
    snackbarRef.current?.closeSnackbar(key)
  ), [])

  return (
    <MaterialSnackbarProvider
      disableWindowBlurListener
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      ref={snackbarRef}
      action={(key) => (
        <Button
          color='inherit'
          onClick={() => handleDismiss(key)}
        >
          {t('common.dismiss')}
        </Button>
      )}
    >
      {children}
    </MaterialSnackbarProvider>
  )
}

export { SnackbarProvider }
