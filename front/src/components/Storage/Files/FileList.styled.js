import styled from '@emotion/styled'
import { Card, CircularProgress } from '@material-ui/core'

const ListCard = styled(Card)`
  flex: 1;
  width: 100%;
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  overflow-y: scroll;
`

const LoadingSpinner = styled((props) => (
  <CircularProgress color='secondary' {...props} />
))``

const List = styled.div``

export {
  ListCard,
  LoadingSpinner,
  List,
}
