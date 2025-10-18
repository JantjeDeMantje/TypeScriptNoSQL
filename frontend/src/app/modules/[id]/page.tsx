"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getModule, updateModule, deleteModule, getLocalized, setLocalized } from '../../../lib/api';
import { getUser } from '../../../lib/auth';
import Header from '../../../components/Header';
import { useI18n } from '../../../lib/i18n';

export default function ModuleDetailPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [module, setModule] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getUser();
    if (user) {
      setUserEmail(user.email);
    }
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
      const { _id, code, createdAt, updatedAt, __v, ...updateData } = form;
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
        textAlign: 'center'
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
        backgroundColor: '#f8f9fa',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <div style={{ 
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {/* Back Button */}
          <button 
            onClick={() => router.push('/modules')}
            style={{
              marginBottom: '1.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← {t('back_to_modules')}
          </button>

          <h1 style={{ 
            margin: '0 0 1.5rem',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#333'
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
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('code')}:</strong>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.code}</div>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('name')}:</strong>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.name}</div>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('description')}:</strong>
                <div style={{ marginTop: '0.25rem' }}>{getLocalized(module.description, lang) || ''}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('ec')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.ec}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('level')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.level}</div>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong style={{ color: '#666', fontSize: '0.9rem' }}>{t('theme')}:</strong>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '0.25rem' }}>{module.theme || 'N/A'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleEdit}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
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
                    backgroundColor: '#dc3545',
                    color: '#fff',
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
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      backgroundColor: '#f0f0f0',
                      cursor: 'not-allowed'
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
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem'
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
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: "'Lato', sans-serif"
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
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
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
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
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
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem'
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
                    backgroundColor: loading ? '#ccc' : '#28a745',
                    color: '#fff',
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
                    backgroundColor: '#6c757d',
                    color: '#fff',
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
