/** @jsxImportSource @emotion/react */
import { createMuiTheme } from '@material-ui/core/styles'
import { plPL } from '@material-ui/core/locale'
// import { css } from '@emotion/react'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#9e9e9e',
    },
    secondary: {
      main: '#b71c1c',
    },
    action: {
      disabled: 'gray',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  overrides: {},
}, plPL)

export { theme }
