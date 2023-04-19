import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from '../locales/en.json'
import viTranslations from '../locales/vi.json'
import {store} from '../../src/redux/store'

const resources = {
  en: { translation: enTranslations },
  vi: { translation: viTranslations },

};
i18n.use(initReactI18next) 
.init({
    resources,
    lng: store.getState().language.languageDefault, 
    interpolation: {
      escapeValue: true 
    }
  });

  export default i18n;

  