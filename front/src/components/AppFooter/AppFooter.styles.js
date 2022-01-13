import styled from '@emotion/styled'
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  TextField as MuiTextField,
  MenuItem as MuiMenuItem,
} from '@material-ui/core'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const FooterBar = styled(MuiAppBar)`
  top: auto;
  bottom: 0;
`

const Toolbar = styled(MuiToolbar)`
  display: flex;
  justify-content: center;
`

const Select = styled((props) => (
  <MuiTextField select variant='outlined' {...props} />
))`
  min-width: 140px;
  & .MuiInputBase-input {
    padding: 10px;
  }
`

const MenuItem = styled((props) => (
  <MuiMenuItem {...props} />
))``

export {
  Container,
  FooterBar,
  Toolbar,
  Select,
  MenuItem,
}
