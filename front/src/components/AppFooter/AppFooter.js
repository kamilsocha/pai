import { useTranslation } from 'react-i18next'

import * as Styled from './AppFooter.styles'

const AppFooter = () => {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Styled.FooterBar position='static' color='default'>
      <Styled.Toolbar>
        <Styled.Select
          label={t('footer.language.label')}
          value={i18n.language}
          onChange={({ target: { value } }) => handleLanguageChange(value)}
        >
          <Styled.MenuItem value='pl'>{t('footer.language.polish')}</Styled.MenuItem>
          <Styled.MenuItem value='en'>{t('footer.language.english')}</Styled.MenuItem>
        </Styled.Select>
      </Styled.Toolbar>
    </Styled.FooterBar>
  )
}

export { AppFooter }
