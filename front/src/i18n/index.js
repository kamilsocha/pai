import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import pl from './pl'
import en from './en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      caches: [],
    },
    resources: {
      pl,
      en,
    },
    fallbackLng: 'en',
    load: 'languageOnly',

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
