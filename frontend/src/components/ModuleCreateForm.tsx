import React from 'react';
import { useI18n } from '../lib/i18n';
import { getLocalized, setLocalized } from '../lib/api';

interface ModuleCreateFormProps {
  form: {
    code: string;
    name: string;
    ec: number;
    level: string;
    theme: string;
  description: any;
  };
  onFormChange: (form: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ModuleCreateForm({ form, onFormChange, onSubmit }: ModuleCreateFormProps) {
  const { t, lang } = useI18n();
  return (
    <form 
      onSubmit={onSubmit} 
      style={{ 
        marginBottom: '2rem', 
        display: 'grid', 
        gap: '1rem', 
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '2px solid #c6002a'
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#333' }}>
        {t('create_module')}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <input 
          required 
          placeholder={`${t('code')}...`} 
          value={form.code} 
          onChange={(e) => onFormChange({ ...form, code: e.target.value })}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: "'Lato', sans-serif"
          }}
        />
        <input 
          required 
          placeholder={`${t('name')}...`} 
          value={form.name} 
          onChange={(e) => onFormChange({ ...form, name: e.target.value })}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: "'Lato', sans-serif"
          }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <input 
          type="number" 
          min={1} 
          placeholder={t('ec')} 
          value={form.ec} 
          onChange={(e) => onFormChange({ ...form, ec: Number(e.target.value) })}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: "'Lato', sans-serif"
          }}
        />
        <select 
          value={form.level} 
          onChange={(e) => onFormChange({ ...form, level: e.target.value })}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: "'Lato', sans-serif",
            backgroundColor: '#fff'
          }}
        >
          <option value="NLQF-5">NLQF-5</option>
          <option value="NLQF-6">NLQF-6</option>
        </select>
        <input 
          placeholder={t('theme')} 
          value={form.theme} 
          onChange={(e) => onFormChange({ ...form, theme: e.target.value })}
          style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
            fontFamily: "'Lato', sans-serif"
          }}
        />
      </div>
      <textarea 
        placeholder={t('description')} 
        value={getLocalized(form.description, lang) || ''} 
        onChange={(e) => onFormChange({ ...form, description: setLocalized(form.description, lang, e.target.value) })}
        rows={3}
        style={{
          padding: '0.75rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          resize: 'vertical'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          backgroundColor: '#c6002a',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 500,
          justifySelf: 'start'
        }}
      >
        {t('save_changes')}
      </button>
    </form>
  );
}
