'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext<{ locale: 'en' | 'cs'; setLocale: (l: 'en' | 'cs') => void; t: (p: string) => string } | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<'en' | 'cs'>('en');

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
    return path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(
    (() => {
      const ctx = require('./I18nContext').I18nContext;
      return ctx;
    })()
  );
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}