import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import httpBackend from 'i18next-http-backend';
// import LangDetector from 'i18next-browser-languagedetector';

const options = {
  fallbackLng: 'uz',
  backend: {
    loadPath: '/locales/{{lng}}.json',
    addPath: '/locales/add/{{lng}}',
  },
  react: {
    useSuspense: true,
    bindI18n: 'languageChanged',
  },
  detection: {
    caches: ['localStorage'],
    lookupLocalStorage: 'language',
    order: ["localStorage"],
  }
};

i18n
  .use(httpBackend)
  // .use(LangDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;