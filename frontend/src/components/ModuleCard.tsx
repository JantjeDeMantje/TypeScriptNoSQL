import { useState } from 'react';
import { ModuleItem, getLocalized } from '../lib/api';
import { useI18n } from '../lib/i18n';

interface ModuleCardProps {
  module: ModuleItem;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

export default function ModuleCard({ module: m, onClick, isFavorite, onToggleFavorite }: ModuleCardProps) {
  const { lang } = useI18n();
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      style={{ 
        border: '1px solid var(--border)', 
        padding: '1.5rem', 
        borderRadius: '8px',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--fg)',
        transition: 'box-shadow 0.2s, transform 0.2s, background 0.3s, color 0.3s',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        boxShadow: hovered ? '0 8px 24px var(--shadow)' : 'none',
        transform: hovered ? 'scale(1.025)' : 'none',
        zIndex: hovered ? 2 : 1
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--fg)',
          flex: 1,
          transition: 'color 0.3s',
        }}>
          {m.name}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(e);
              }}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '0.25rem',
                lineHeight: 1,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title={isFavorite ? 'Verwijder van favorieten' : 'Voeg toe aan favorieten'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          )}
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: 'var(--accent)',
            color: 'var(--button-fg)',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'background 0.3s, color 0.3s',
          }}>
            {m.ec} EC
          </span>
        </div>
      </div>
      <div style={{ 
        fontSize: '0.9rem', 
        color: 'var(--fg)',
        marginBottom: '0.75rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        transition: 'color 0.3s',
      }}>
        <span>{m.level}</span>
        {m.theme && (
          <span style={{ color: 'var(--accent)', fontWeight: 500, transition: 'color 0.3s' }}>
            {m.theme}
          </span>
        )}
      </div>
      {m.description && (
        <p style={{ 
          margin: 0,
          color: 'var(--fg)',
          lineHeight: 1.6,
          transition: 'color 0.3s',
        }}>
          {getLocalized(m.description, lang) || ''}
        </p>
      )}
    </div>
  );
}
