"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'en' | 'nl';

type Dict = Record<string, string>;

type I18nContextType = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const en: Dict = {
  modules: 'Modules',
  favorites: 'Favorites',
  account: 'Account',
  logout: 'Logout',
  switch_lang: 'Switch to Dutch (NL)',
  back_to_modules: 'Back to Modules',
  module_details: 'Module Details',
  edit_module: 'Edit Module',
  delete_module: 'Delete Module',
  save_changes: 'Save Changes',
  cancel: 'Cancel',
  create_module: 'Create Module',
  new_module: 'New Module',
  refresh: 'Refresh',
  search_placeholder: 'Search description... ',
  loading: 'Loading...',
  error: 'Error',
  no_modules: 'No modules found.',
  create_hint: 'Click "+ New Module" to add one.',
  code: 'Code',
  name: 'Name',
  description: 'Description',
  ec: 'EC',
  level: 'Level',
  theme: 'Theme',
  na: 'N/A',
  my_favorites: 'My Favorites',
  no_favorites: "You don't have any favorite modules yet.",
  how_to_favorite: 'Click the star on a module to add it to your favorites.',
  browse_modules: 'Browse Modules',
  login_tab: 'Login',
  register_tab: 'Register',
  login_subtitle: 'Log in to your account',
  register_subtitle: 'Create a new account',
  email: 'Email',
  password: 'Password',
  password_hint: 'Min. 8 characters',
  first_name: 'First name',
  last_name: 'Last name',
  login: 'Login',
  logging_in: 'Logging in...',
  register: 'Register',
  registering: 'Registering...'
};

const nl: Dict = {
  modules: 'Modules',
  favorites: 'Favorieten',
  account: 'Account',
  logout: 'Uitloggen',
  switch_lang: 'Wissel naar Engels (EN)',
  back_to_modules: 'Terug naar Modules',
  module_details: 'Module Details',
  edit_module: 'Module Bewerken',
  delete_module: 'Module Verwijderen',
  save_changes: 'Wijzigingen Opslaan',
  cancel: 'Annuleren',
  create_module: 'Module Toevoegen',
  new_module: 'Nieuwe module',
  refresh: 'Vernieuwen',
  search_placeholder: 'Zoek beschrijving... ',
  loading: 'Laden...',
  error: 'Fout',
  no_modules: 'Geen modules gevonden.',
  create_hint: 'Klik op "+ Nieuw Module" om een module toe te voegen.',
  code: 'Code',
  name: 'Naam',
  description: 'Beschrijving',
  ec: 'EC',
  level: 'Niveau',
  theme: 'Thema',
  na: 'N.v.t.',
  my_favorites: 'Mijn Favorieten',
  no_favorites: 'Je hebt nog geen favoriete modules.',
  how_to_favorite: 'Klik op de ster bij een module om deze toe te voegen aan je favorieten.',
  browse_modules: 'Blader door Modules',
  login_tab: 'Inloggen',
  register_tab: 'Registreren',
  login_subtitle: 'Inloggen op je account',
  register_subtitle: 'Maak een nieuw account aan',
  email: 'Email',
  password: 'Wachtwoord',
  password_hint: 'Min. 8 karakters',
  first_name: 'Voornaam',
  last_name: 'Achternaam',
  login: 'Inloggen',
  logging_in: 'Bezig met inloggen...',
  register: 'Registreren',
  registering: 'Bezig met registreren...'
};

const DICTS: Record<Lang, Dict> = { en, nl };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved && (saved === 'en' || saved === 'nl')) {
        setLangState(saved);
      }
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
  };

  // Keep the document language attribute in sync for accessibility
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    const dict = DICTS[lang];
    return (key: string) => dict[key] || key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
