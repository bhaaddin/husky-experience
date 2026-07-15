'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Locale, locales, defaultLocale, getTranslation } from './config';

const I18nContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: (p: string) => string } | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('locale') as 'en' | 'cs' | null;
    if (saved === 'en' || saved === 'cs') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: 'en' | 'cs') => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (path: string): string => {
    const translation = getTranslation(locale);
    const localeObj = translation[locale];
    if (!localeObj) return path;
    return path.split('.').reduce((obj: any, key) => obj?.[key], localeObj) || path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}