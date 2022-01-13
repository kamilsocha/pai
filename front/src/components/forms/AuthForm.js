import { useTranslation } from 'react-i18next'

import { PATHS } from 'routes/constants'
import * as Styled from './Form.styled'

const AuthForm = ({
  buttonText,
  onSubmit,
  linkText,
  link,
  children,
}) => {
  const { t } = useTranslation()

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.FormTitle>
        {t('title')}
      </Styled.FormTitle>
      {children}
      <Styled.FooterContainer>
        <Styled.SubmitButton type='submit'>
          {buttonText}
        </Styled.SubmitButton>
        <Styled.RedirectLink to={link}>
          {linkText}
        </Styled.RedirectLink>
        <Styled.RedirectLink to={PATHS.MAP}>
          {t('common.backToMainPage')}
        </Styled.RedirectLink>
      </Styled.FooterContainer>
    </Styled.Form>
  )
}

export { AuthForm }
