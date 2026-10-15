import React, { ReactNode } from 'react';

export type BadgeVariant = 'indigo' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'rose';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'indigo',
  children,
  icon,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};
