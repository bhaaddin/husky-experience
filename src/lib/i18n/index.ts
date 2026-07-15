import { Locale, locales, defaultLocale, getTranslation } from './config';
import enTranslations from './en';
import csTranslations from './cs';

const translations = {
  en: enTranslations,
  cs: csTranslations,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export { enTranslations, csTranslations };