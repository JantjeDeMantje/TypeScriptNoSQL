interface ModuleFiltersProps {
  filters: {
    q?: string;
    ec?: string;
    level?: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onRefresh: () => void;
  onCreateNew: () => void;
  loading: boolean;
  showCreate: boolean;
}

import { useI18n } from '../lib/i18n';

export default function ModuleFilters({ 
  filters, 
  onFilterChange, 
  onRefresh, 
  onCreateNew,
  loading,
  showCreate 
}: ModuleFiltersProps) {
  const { t } = useI18n();
  return (
    <section style={{ 
      display: 'flex', 
      gap: '1rem', 
      flexWrap: 'wrap', 
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '6px'
    }}>
      <input
        placeholder={t('search_placeholder')}
        value={filters.q || ''}
        onChange={(e) => onFilterChange('q', e.target.value)}
        style={{
          flex: '1 1 300px',
          padding: '0.75rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif"
        }}
      />
      <select
        value={filters.ec || ''}
        onChange={(e) => onFilterChange('ec', e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          backgroundColor: '#fff',
          cursor: 'pointer',
          minWidth: '120px'
        }}
      >
        <option value="">{t('ec')}</option>
        <option value="15">15 EC</option>
        <option value="30">30 EC</option>
      </select>
      <select
        value={filters.level || ''}
        onChange={(e) => onFilterChange('level', e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          backgroundColor: '#fff',
          cursor: 'pointer',
          minWidth: '140px'
        }}
      >
        <option value="">{t('level')}</option>
        <option value="NLQF-5">NLQF-5</option>
        <option value="NLQF-6">NLQF-6</option>
      </select>
      <button 
        onClick={onRefresh} 
        disabled={loading}
        style={{
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          backgroundColor: '#c6002a',
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 500,
          opacity: loading ? 0.6 : 1
        }}
      >
        {t('refresh')}
      </button>
      <button 
        onClick={onCreateNew}
        style={{
          padding: '0.75rem 1.5rem',
          border: '1px solid #c6002a',
          borderRadius: '4px',
          fontSize: '1rem',
          fontFamily: "'Lato', sans-serif",
          backgroundColor: '#fff',
          color: '#c6002a',
          cursor: 'pointer',
          fontWeight: 500,
          minWidth: '160px'
        }}
      >
        {showCreate ? t('cancel') : '+ ' + t('new_module')}
      </button>
    </section>
  );
}
