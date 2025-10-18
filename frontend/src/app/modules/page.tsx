"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchModules, createModule, ModuleItem, setLocalized } from '../../lib/api';
import { isAuthenticated, getUser } from '../../lib/auth';
import { getFavorites, addFavorite, removeFavorite } from '../../lib/favorites';
import Header from '../../components/Header';
import { useI18n } from '../../lib/i18n';
import ModuleCard from '../../components/ModuleCard';
import ModuleFilters from '../../components/ModuleFilters';
import ModuleCreateForm from '../../components/ModuleCreateForm';

type Filters = {
  q?: string;
  ec?: string;
  level?: string;
};

export default function ModulesPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({});
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [form, setForm] = useState({
    code: '',
    name: '',
    ec: 30,
    level: 'NLQF-6',
    theme: '',
    description: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth');
    } else {
      const user = getUser();
      if (user) {
        setUserEmail(user.email);
      }
      loadFavorites();
    }
  }, [router]);

  async function loadFavorites() {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
  }

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchModules(filters);
      setModules(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.ec, filters.level]);

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      // If description is a plain string, set it under current lang
      const payload: any = { ...form, ec: Number(form.ec) };
      if (typeof payload.description === 'string' && payload.description) {
        payload.description = setLocalized(undefined, lang, payload.description);
      }
      await createModule(payload);
      setShowCreate(false);
      await load();
      setForm({ code: '', name: '', ec: 30, level: 'NLQF-6', theme: '', description: '' });
    } catch (e: any) {
      alert(e.message || 'Create failed');
    }
  }

  async function handleToggleFavorite(moduleCode: string) {
    try {
      if (favorites.includes(moduleCode)) {
        await removeFavorite(moduleCode);
        setFavorites(favorites.filter(c => c !== moduleCode));
      } else {
        await addFavorite(moduleCode);
        setFavorites([...favorites, moduleCode]);
      }
    } catch (e: any) {
      alert(e.message || 'Failed to toggle favorite');
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
        backgroundColor: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: 'calc(100vh - 100px)',
        transition: 'background 0.3s, color 0.3s',
      }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--fg)',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 'var(--shadow)',
          transition: 'background 0.3s, color 0.3s',
        }}>
          <h1 style={{ 
            margin: '0 0 1.5rem',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--fg)',
            transition: 'color 0.3s',
          }}>{t('modules')}</h1>

          <ModuleFilters
            filters={filters}
            onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
            onRefresh={load}
            onCreateNew={() => setShowCreate((s) => !s)}
            loading={loading}
            showCreate={showCreate}
          />

          {showCreate && (
            <ModuleCreateForm
              form={form}
              onFormChange={setForm}
              onSubmit={submitCreate}
            />
          )}

          {/* Status Messages */}
          {error && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fee', 
              color: '#c00', 
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #fcc'
            }}>
              {t('error')}: {error}
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
                {t('no_modules')}
              </p>
              <p style={{ fontSize: '0.9rem', margin: 0, color: '#999' }}>
                {t('create_hint')}
              </p>
            </div>
          )}

          {/* Modules List */}
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            display: 'grid', 
            gap: '1rem',
            margin: 0,
            opacity: loading ? 0.5 : 1,
            transition: 'opacity 0.2s ease-in-out'
          }}>
            {modules.map((m) => (
                <li key={m.code}>
                  <a href={`/modules/${m.code}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ModuleCard 
                      module={m}
                      isFavorite={favorites.includes(m.code)}
                      onToggleFavorite={() => handleToggleFavorite(m.code)}
                    />
                  </a>
                </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
