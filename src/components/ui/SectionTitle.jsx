import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';

const SectionTitle = ({ 
  subtitle, 
  title, 
  description, 
  align = 'center',
  light = false 
}) => {
  const titleRef = useRef(null);
  useScrollReveal(titleRef);

  return (
    <div 
      ref={titleRef} 
      className={`section-title text-${align} ${light ? 'text-light' : ''}`}
      style={{ marginBottom: 'var(--spacing-xl)' }}
    >
      {subtitle && (
        <div style={{ 
          fontFamily: 'var(--font-accent)', 
          color: 'var(--color-accent)',
          fontSize: 'var(--text-lg)',
          fontStyle: 'italic',
          marginBottom: 'var(--spacing-xs)'
        }}>
          {subtitle}
        </div>
      )}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: light ? 'var(--color-white)' : 'var(--color-primary)',
        marginBottom: description ? 'var(--spacing-md)' : '0'
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          color: light ? 'var(--color-text-light)' : 'var(--color-text-muted)',
          maxWidth: '600px',
          margin: align === 'center' ? '0 auto' : '0'
        }}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
