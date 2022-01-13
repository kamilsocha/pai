import { Link as RouterLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button, Link, TextField as MuiTextField, Typography } from '@material-ui/core'

import { PasswordField } from './PasswordField'

const Form = styled.form`
  margin: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  flex-direction: column;
`

const FormTitle = styled((props) => (
  <Typography variant='h3' align='center' {...props} />
))``

const TextField = styled((props) => (
  <MuiTextField variant='outlined' {...props} />
))`
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

const PasswordTextField = styled((props) => (
  <PasswordField variant='outlined' {...props} />
))`
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

const SubmitButton = styled((props) => (
  <Button variant='contained' {...props} />
))`
  width: 100%;
  max-width: 400px;
`

const FooterContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RedirectLink = styled((props) => (
  <Link component={RouterLink} {...props} />
))`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export {
  Form,
  FormTitle,
  TextField,
  PasswordTextField,
  SubmitButton,
  FooterContainer,
  RedirectLink,
}
