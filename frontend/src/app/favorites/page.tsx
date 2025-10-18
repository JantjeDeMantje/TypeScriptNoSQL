"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchModules, ModuleItem } from '../../lib/api';
import { isAuthenticated, getUser } from '../../lib/auth';
import { getFavorites, removeFavorite } from '../../lib/favorites';
import Header from '../../components/Header';
import { useI18n } from '../../lib/i18n';
import ModuleCard from '../../components/ModuleCard';

export default function FavoritesPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
    } else {
      const user = getUser();
      if (user) {
        setUserEmail(user.email);
      }
      load();
    }
  }, [router]);

  async function load() {
    setLoading(true);
    try {
      const favCodes = await getFavorites();
      setFavorites(favCodes);
      
      if (favCodes.length > 0) {
        const allModules = await fetchModules({});
        const favoriteModules = allModules.filter((m) => favCodes.includes(m.code));
        setModules(favoriteModules);
      } else {
        setModules([]);
      }
    } catch (e: any) {
      console.error('Failed to load favorites:', e);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveFavorite(moduleCode: string) {
    try {
      await removeFavorite(moduleCode);
      setFavorites(favorites.filter(c => c !== moduleCode));
      setModules(modules.filter(m => m.code !== moduleCode));
    } catch (e: any) {
      alert(e.message || 'Failed to remove favorite');
    }
  }

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
  <Header />
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 2rem 4rem',
        fontFamily: "'Lato', sans-serif",
        backgroundColor: '#f8f9fa',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h1 style={{ 
            margin: '0 0 1.5rem',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#333'
          }}>{t('my_favorites')}</h1>

          {loading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem',
              color: '#666'
            }}>
              <p>{t('loading')}</p>
            </div>
          )}

          {!loading && modules.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem',
              color: '#666',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px'
            }}>
              <p style={{ fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
                {t('no_favorites')}
              </p>
              <p style={{ fontSize: '0.9rem', margin: '0 0 1.5rem', color: '#999' }}>
                {t('how_to_favorite')}
              </p>
              <button
                onClick={() => router.push('/modules')}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontFamily: "'Lato', sans-serif",
                  backgroundColor: '#c6002a',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                {t('browse_modules')}
              </button>
            </div>
          )}

          {!loading && modules.length > 0 && (
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              display: 'grid', 
              gap: '1rem',
              margin: 0
            }}>
              {modules.map((m) => (
                <ModuleCard 
                  key={m.code} 
                  module={m}
                  isFavorite={true}
                  onToggleFavorite={() => handleRemoveFavorite(m.code)}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
