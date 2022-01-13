import styled from '@emotion/styled'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 5%;
`

const ResetForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorText = styled((props) => (
  <Typography variant='h4' color='error' {...props} />
))`
  margin-bottom: 16px;
`

export {
  Container,
  ResetForm,
  ErrorText,
}
