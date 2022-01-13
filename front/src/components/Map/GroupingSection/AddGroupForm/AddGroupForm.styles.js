import styled from '@emotion/styled'
import { Button as MuiButton, TextField as MuiTextField } from '@material-ui/core'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Button = styled(MuiButton)`
  padding: 12px 24px;
  text-transform: none;
`

const TextField = styled(MuiTextField)`
  /* & .MuiOutlinedInput-input {
    padding: 8px; */
  /* } */
`

export {
  Form,
  FormContentContainer,
  Button,
  TextField,
}
