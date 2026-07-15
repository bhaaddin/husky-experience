'use client';

import { useTranslation } from '@/lib/i18n/I18nContext';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-1.5 px-3 py-1.5"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeFlags[locale]}</span>
        <span className="hidden sm:inline font-medium">{localeNames[locale]}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </Button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-gray-200 focus-out:animate-fade-out animate-fade-in z-50"
          role="listbox"
        >
          {locales.map((loc) => (
            <li key={loc} role="option">
              <button
                onClick={() => {
                  setLocale(loc);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm transition-colors',
                  locale === loc
                    ? 'bg-[#1A365D] text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                aria-selected={locale === loc}
              >
                <span className="flex items-center gap-2">
                  <span>{localeFlags[loc]}</span>
                  <span className="font-medium">{localeNames[loc]}</span>
                  {locale === loc && <span className="ml-auto text-xs text-white/70">✓</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}