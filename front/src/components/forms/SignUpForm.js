import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useMUIErrors } from 'hooks/useMuiErrors'
import { useMutationRegister } from 'api/useMutationRegister'
import { PATHS } from 'routes/constants'

import { AuthForm } from './AuthForm'
import * as Styled from './Form.styled'

const SignUpFormSchema = yup.object().shape({
  username: yup.string().required('form.field.required'),
  password: yup.string().required('form.field.required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'form.field.confirmPasswordMatch')
    .required('form.field.required'),
})

const SignUpForm = ({
  onSuccess: handleSuccess,
}) => {
  const { t } = useTranslation()

  const {
    mutate: registerMutate,
  } = useMutationRegister({
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
      confirmPassword: '',
    },
    validationSchema: SignUpFormSchema,
    onSubmit: ({ username, password }) => registerMutate({ username, password }),
  })

  const {
    username: usernameErrors,
    password: passwordErrors,
    confirmPassword: confirmPasswordErrors,
  } = useMUIErrors(errors, touched)

  return (
    <AuthForm
      buttonText={t('common.signUp')}
      onSubmit={handleSubmit}
      linkText={t('common.alreadyHaveAnAccount')}
      link={PATHS.SIGN_IN}
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
      <Styled.PasswordTextField
        id='confirmPassword'
        name='confirmPassword'
        label={t('form.confirmPassword')}
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        {...confirmPasswordErrors}
      />
    </AuthForm>
  )
}

export { SignUpForm }
