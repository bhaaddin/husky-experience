export const locales = ['en', 'cs'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  cs: 'Čeština',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  cs: '🇨🇿',
};

import enTranslations from './en';
import csTranslations from './cs';

const translations = {
  en: enTranslations,
  cs: csTranslations,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}