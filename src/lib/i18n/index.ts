import { locales, defaultLocale, type Locale } from './config';

export const translations: Record<Locale, any> = {
  en: (await import('./en')).default,
  cs: (await import('./cs')).default,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function getNestedTranslation(obj: any, path: string): string {
  return path.split('.').reduce((obj, key) => obj?.[key], obj) || path;
}