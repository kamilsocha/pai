import styled from '@emotion/styled'
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
} from '@material-ui/core'

const AppBar = styled(MuiAppBar)``

const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: space-between;
`

const ItemsContainer = styled.div`
  display: flex;
`

export { AppBar, Toolbar, ItemsContainer }
