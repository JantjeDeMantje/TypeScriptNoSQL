"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useParams } from 'next/navigation';
import { getModule, updateModule, deleteModule, getLocalized, setLocalized, ModuleItem } from '../../../lib/api';
import { getUser } from '../../../lib/auth';
const Header = dynamic(() => import('../../../components/Header'), { ssr: false });
import { useI18n } from '../../../lib/i18n';

export default function ModuleDetailPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [module, setModule] = useState<ModuleItem | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<ModuleItem>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (id) {
      getModule(id as string).then(setModule);
    }
  }, [id]);

  const handleEdit = () => {
    setForm(module || {});
    setEdit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Remove _id, code, and timestamp fields from the update payload
      const { _id, code, createdAt, updatedAt, __v, ...updateData } = form as any;
      // Convert ec to number if it exists
      if (updateData.ec !== undefined) {
        updateData.ec = Number(updateData.ec);
      }
      const updated = await updateModule(id as string, updateData);
      setModule(updated);
      setEdit(false);
    } catch (e: any) {
      setError(e.message || 'Failed to update module');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this module?')) return;
    setLoading(true);
    setError(null);
    try {
      await deleteModule(id as string);
      router.push('/modules');
    } catch (e: any) {
      setError(e.message || 'Failed to delete module');
    }
    setLoading(false);
  };

  if (!mounted) return null;
  if (!module) return (
    <>
  <Header />
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem',
        fontFamily: "'Lato', sans-serif",
        textAlign: 'center',
        color: 'var(--fg)',
        backgroundColor: 'var(--bg)',
        minHeight: 'calc(100vh - 100px)'
      }}>
        {t('loading')}
      </div>
    </>
  );

  return (
    <>
  <Header />
      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem',
        fontFamily: "'Lato', sans-serif",
        backgroundColor: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 'var(--shadow)',
          color: 'var(--fg)'
        }}>
          {/* Back Button */}
          <button 
            onClick={() => router.push('/modules')}
            style={{
              marginBottom: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--dropdown-hover)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: 'var(--fg)'
            }}
          >
            ← {t('back_to_modules')}
          </button>

          <h1 style={{ 
            margin: '0 0 1.5rem',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--fg)'
          }}>{t('module_details')}</h1>

          {error && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#fee', 
              color: '#c00', 
              borderRadius: '4px',
              marginBottom: '1rem',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

          {!edit ? (
            <div style={{ lineHeight: '1.8' }}>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--bg)', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('code')}:</strong>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.code}</div>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--bg)', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('name')}:</strong>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.name}</div>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('description')}:</strong>
                <div style={{ marginTop: '0.25rem' }}>{getLocalized(module.description, lang) || ''}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('ec')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.ec}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('level')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.level}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '4px' }}>
                  <strong style={{ color: 'var(--fg)', fontSize: '0.9rem', opacity: 0.8 }}>{t('theme')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.theme || 'N/A'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleEdit}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--button-bg)',
                    color: 'var(--button-fg)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {t('edit_module')}
                </button>
                <button 
                  onClick={handleDelete}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--button-fg)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {t('delete_module')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {t('code')}:
                  <input 
                    name="code" 
                    value={form.code || ''} 
                    onChange={handleChange} 
                    disabled 
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.25rem',
                      border: '1px solid var(--input-border)',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      backgroundColor: 'var(--bg)',
                      color: 'var(--fg)',
                      cursor: 'not-allowed',
                      opacity: 0.7
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {t('name')}:
                  <input 
                    name="name" 
                    value={form.name || ''} 
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.25rem',
                      border: '1px solid var(--input-border)',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--input-fg)',
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {t('description')}:
                  <textarea 
                    name="description" 
                    value={getLocalized(form.description, lang) || ''}
                    onChange={(e) => setForm({
                      ...form,
                      description: setLocalized(form.description, lang, e.target.value)
                    })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.25rem',
                      border: '1px solid var(--input-border)',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: "'Lato', sans-serif",
                      backgroundColor: 'var(--input-bg)',
                      color: 'var(--input-fg)',
                    }}
                  />
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {t('ec')}:
                    <input 
                      name="ec" 
                      type="number" 
                      value={form.ec || ''} 
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        marginTop: '0.25rem',
                        border: '1px solid var(--input-border)',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--input-fg)',
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {t('level')}:
                    <input 
                      name="level" 
                      value={form.level || ''} 
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        marginTop: '0.25rem',
                        border: '1px solid var(--input-border)',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--input-fg)',
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {t('theme')}:
                    <input 
                      name="theme" 
                      value={form.theme || ''} 
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        marginTop: '0.25rem',
                        border: '1px solid var(--input-border)',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--input-bg)',
                        color: 'var(--input-fg)',
                      }}
                    />
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: loading ? 'var(--input-border)' : 'var(--button-bg)',
                    color: 'var(--button-fg)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {loading ? t('loading') : t('save_changes')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setEdit(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--border)',
                    color: 'var(--fg)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
