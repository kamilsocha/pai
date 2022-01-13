import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`

const DataContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography)`
  margin-bottom: 8px;
  font-weight: bold;
`

const Row = styled.div`
  display: flex;
`

const Value = styled(Typography)`
  margin: 0 4px;
`

export {
  Form,
  DataContainer,
  ButtonContainer,
  Section,
  Title,
  Row,
  Value,
}
