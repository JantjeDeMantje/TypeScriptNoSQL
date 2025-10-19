"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { removeToken, getUser } from '../lib/auth';
import { useI18n } from '../lib/i18n';
import { useTheme } from '../lib/theme';

export default function Header() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const user = getUser();
    if (user) setUserEmail(user.email);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    removeToken();
    router.push('/auth');
  }

  // Hide logo in dark mode
  const showLogo = theme !== 'dark';

  return (
    <>
      <header
        style={{
          backgroundColor: 'var(--header-bg)',
          color: 'var(--header-fg)',
          padding: '1rem 2rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Lato', sans-serif",
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        {/* Logo on the left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showLogo && (
            <img
              src="/school-logo.png"
              alt="School Logo"
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={() => (window.location.href = '/modules')}
            />
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            paddingLeft: '40%',
          }}
        >
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--header-fg)',
              fontFamily: "'Lato', sans-serif",
              transition: 'color 0.3s',
            }}
            onClick={() => (window.location.href = '/modules')}
          >
            {t('modules')}
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--header-fg)',
              fontFamily: "'Lato', sans-serif",
              transition: 'color 0.3s',
            }}
            onClick={() => (window.location.href = '/favorites')}
          >
            {t('favorites')}
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--header-fg)',
              fontFamily: "'Lato', sans-serif",
              transition: 'color 0.3s',
            }}
            onClick={() => (window.location.href = '/about')}
          >
            {lang === 'en' ? 'About' : 'Over'}
          </button>

          {/* Account dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--header-fg)',
                fontFamily: "'Lato', sans-serif",
                transition: 'color 0.3s',
              }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {t('account')} {showDropdown ? '▲' : '▼'}
            </button>

            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  backgroundColor: 'var(--dropdown-bg)',
                  color: 'var(--dropdown-fg)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  minWidth: '200px',
                  zIndex: 1000,
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                {mounted && userEmail && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid var(--border)',
                      fontSize: '0.9rem',
                      color: 'var(--dropdown-fg)',
                      background: 'transparent',
                      transition: 'color 0.3s',
                    }}
                  >
                    {userEmail}
                  </div>
                )}

                <button
                  onClick={() => setLang(lang === 'en' ? 'nl' : 'en')}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontFamily: "'Lato', sans-serif",
                    color: 'var(--dropdown-fg)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background-color 0.2s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--dropdown-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('switch_lang')}
                </button>

                <button
                  onClick={toggleTheme}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontFamily: "'Lato', sans-serif",
                    color: 'var(--dropdown-fg)',
                    fontWeight: 500,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--dropdown-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontFamily: "'Lato', sans-serif",
                    color: 'var(--accent)',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'background-color 0.2s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--dropdown-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Red separator band */}
      <div
        style={{
          height: '24px',
          backgroundColor: 'var(--separator)',
          width: '100%',
          transition: 'background 0.3s',
        }}
      />
    </>
  );
}
