import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useMUIErrors } from 'hooks/useMuiErrors'
import { useMutationLogin } from 'api/useMutationLogin'
import { PATHS } from 'routes/constants'

import { AuthForm } from './AuthForm'
import * as Styled from './Form.styled'

const SignInFormSchema = yup.object().shape({
  username: yup.string().required('form.field.required'),
  password: yup.string().required('form.field.required'),
})

const SignInForm = ({
  onSuccess: handleSuccess,
}) => {
  const { t } = useTranslation()

  const {
    mutate: loginMutate,
  } = useMutationLogin({
    onSuccess: handleSuccess,
  })

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInFormSchema,
    onSubmit: ({ username, password }) => loginMutate({ username, password }),
  })

  const {
    username: usernameErrors,
    password: passwordErrors,
  } = useMUIErrors(errors, touched)

  return (
    <AuthForm
      buttonText={t('common.signIn')}
      onSubmit={handleSubmit}
      linkText={t('common.dontHaveAnAccount')}
      link={PATHS.SIGN_UP}
    >
      <Styled.TextField
        id='username'
        name='username'
        label={t('form.username')}
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        {...usernameErrors}
      />
      <Styled.PasswordTextField
        id='password'
        name='password'
        label={t('form.password')}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        {...passwordErrors}
      />
    </AuthForm>
  )
}

export { SignInForm }
