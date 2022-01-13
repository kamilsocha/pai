import styled from '@emotion/styled'
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from '@material-ui/core'

const HorizontalList = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  > * {
    margin: 0 8px;
  }
`

const VerticalList = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 8px 0;
  }
`

const Button = styled(MuiButton)``

const IconButton = styled(MuiIconButton)`
  padding: 0px;
`

export {
  HorizontalList,
  VerticalList,
  Button,
  IconButton,
}
