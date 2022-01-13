import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
`

const Label = styled(Typography)`
  margin: 0 8px 4px 0 !important;
  font-weight: bold;
`

const NameText = styled(Typography)`
  margin: 0 !important;
`

const DetailsText = styled(Typography)`
  margin: 4px 0 !important;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    margin: 0 2px;
  }
`

export {
  Container,
  Row,
  Label,
  NameText,
  DetailsText,
  ButtonsContainer,
}
