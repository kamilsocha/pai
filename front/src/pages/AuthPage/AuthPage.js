import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { SignInForm } from 'components/forms/SignInForm'
import { SignUpForm } from 'components/forms/SignUpForm'
import { signInAction } from 'store/authReducer'
import { PATHS } from 'routes/constants'

import * as Styled from './AuthPage.styled'

const AuthPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.root.auth.loggedIn)

  const handleSignInSuccess = () => {
    dispatch(signInAction())
    history.push(PATHS.MAP)
  }

  const handleSignUpSuccess = () => {
    history.push(PATHS.SIGN_IN)
  }

  if (loggedIn) {
    return <Redirect to={PATHS.MAP} />
  }

  return (
    <Styled.Container>
      <Styled.FormContainer>
        {location.pathname === PATHS.SIGN_IN ? (
          <SignInForm onSuccess={handleSignInSuccess} />
        ) : (
          <SignUpForm onSuccess={handleSignUpSuccess} />
        )}
      </Styled.FormContainer>
    </Styled.Container>
  )
}

export default AuthPage
