'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { Locale, TRANSLATIONS, TranslationSchema } from '@/lib/i18n/translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: TranslationSchema;
}

const STORAGE_KEY = 'cw_locale';
const LOCALE_EVENT = 'cw-locale-change';

const LanguageContext = createContextOrDefault();

function createContextOrDefault() {
  return React.createContext<LanguageContextValue>({
    locale: 'en',
    setLocale: () => {},
    t: TRANSLATIONS.en,
  });
}

function subscribeLocale(callback: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  const onCustom = () => callback();
  window.addEventListener('storage', onStorage);
  window.addEventListener(LOCALE_EVENT, onCustom);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(LOCALE_EVENT, onCustom);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'sw') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'en';
}

function getServerLocaleSnapshot(): Locale {
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      window.dispatchEvent(new Event(LOCALE_EVENT));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: TRANSLATIONS[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return React.useContext(LanguageContext);
}
