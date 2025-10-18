"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, login, saveToken, saveUser } from '../../lib/auth';
import { useI18n } from '../../lib/i18n';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useI18n();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(loginForm);
      saveToken(response.token);
      saveUser(response.user);
      router.push('/modules');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await register(registerForm);
      saveToken(response.token);
      saveUser(response.user);
      router.push('/modules');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Lato', sans-serif",
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#c6002a',
          color: '#fff',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0 0 0.5rem',
            fontSize: '1.75rem',
            fontWeight: 600
          }}>
            Avans KeuzeKompas
          </h1>
          <p style={{
            margin: 0,
            fontSize: '0.95rem',
            opacity: 0.9
          }}>
            {isLogin ? t('login_subtitle') : t('register_subtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: isLogin ? '#fff' : '#f8f9fa',
              borderBottom: isLogin ? '3px solid #c6002a' : '3px solid transparent',
              cursor: 'pointer',
              fontFamily: "'Lato', sans-serif",
              fontSize: '1rem',
              fontWeight: isLogin ? 600 : 400,
              color: isLogin ? '#c6002a' : '#666',
              transition: 'all 0.2s'
            }}
          >
            {t('login_tab')}
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: !isLogin ? '#fff' : '#f8f9fa',
              borderBottom: !isLogin ? '3px solid #c6002a' : '3px solid transparent',
              cursor: 'pointer',
              fontFamily: "'Lato', sans-serif",
              fontSize: '1rem',
              fontWeight: !isLogin ? 600 : 400,
              color: !isLogin ? '#c6002a' : '#666',
              transition: 'all 0.2s'
            }}
          >
            {t('register_tab')}
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fee',
              color: '#c00',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              border: '1px solid #fcc',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#333'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="a.lastname@student.avans.nl"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: "'Lato', sans-serif"
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#333'
                }}>
                  Wachtwoord
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min. 8 karakters"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: "'Lato', sans-serif"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.875rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                  backgroundColor: '#c6002a',
                  color: '#fff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1,
                  marginTop: '0.5rem'
                }}
              >
                {loading ? t('logging_in') : t('login')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: 'grid', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#333'
                  }}>
                    Voornaam
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Voornaam"
                    value={registerForm.firstName}
                    onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: "'Lato', sans-serif"
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#333'
                  }}>
                    Achternaam
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Achternaam"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: "'Lato', sans-serif"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#333'
                }}>
                  Avans Email
                </label>
                <input
                  type="email"
                  required
                  pattern=".*@student\.avans\.nl$"
                  placeholder="a.lastname@student.avans.nl"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: "'Lato', sans-serif"
                  }}
                />
                <p style={{
                  margin: '0.5rem 0 0',
                  fontSize: '0.8rem',
                  color: '#666'
                }}>
                  Gebruik je Avans student email
                </p>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#333'
                }}>
                  Wachtwoord
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min. 8 karakters"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    fontFamily: "'Lato', sans-serif"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.875rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                  backgroundColor: '#c6002a',
                  color: '#fff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  opacity: loading ? 0.6 : 1,
                  marginTop: '0.5rem'
                }}
              >
                {loading ? t('registering') : t('register')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
