import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        background: 'rgba(15, 23, 42, 0.4)',
        maxWidth: '560px',
        margin: '32px auto',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#818CF8',
          marginBottom: '18px',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#F8FAFC',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '0.92rem',
          color: '#94A3B8',
          lineHeight: 1.6,
          maxWidth: '420px',
          marginBottom: actionText ? '24px' : '0',
        }}
      >
        {description}
      </p>

      {(actionText || secondaryActionText) && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {actionText && onAction && (
            <Button variant="primary" size="md" onClick={onAction}>
              {actionText}
            </Button>
          )}
          {secondaryActionText && onSecondaryAction && (
            <Button variant="outline" size="md" onClick={onSecondaryAction}>
              {secondaryActionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
