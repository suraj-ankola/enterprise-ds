import React from 'react';
import { Button } from './Button';

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmptyStateSize    = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'search' | 'error' | 'offline' | 'permissions';

export interface EmptyStateAction {
  label:    string;
  onClick:  () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface EmptyStateProps {
  /** Icon or illustration — any React node */
  icon?:        React.ReactNode;
  title:        string;
  description?: string;
  /** Primary + optional secondary action */
  actions?:     [EmptyStateAction] | [EmptyStateAction, EmptyStateAction];
  /** Extra content below actions (links, tips, etc.) */
  footer?:      React.ReactNode;
  size?:        EmptyStateSize;
  /** Constrains width and centres in the available space */
  centered?:    boolean;
  className?:   string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const ICON_WRAPPER: Record<EmptyStateSize, string> = {
  sm: 'h-10 w-10 rounded-xl text-xl',
  md: 'h-14 w-14 rounded-2xl text-2xl',
  lg: 'h-20 w-20 rounded-3xl text-4xl',
};

const TITLE: Record<EmptyStateSize, string> = {
  sm: 'text-sm  font-semibold',
  md: 'text-base font-semibold',
  lg: 'text-lg   font-semibold',
};

const DESC: Record<EmptyStateSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

const GAP: Record<EmptyStateSize, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
};

const MAX_W: Record<EmptyStateSize, string> = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  actions,
  footer,
  size     = 'md',
  centered = true,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={[
        'flex flex-col items-center text-center py-12 px-6',
        GAP[size],
        centered ? `${MAX_W[size]} mx-auto` : '',
        className,
      ].filter(Boolean).join(' ')}
      role="status"
      aria-label={title}
    >
      {/* Icon wrapper */}
      {icon && (
        <div
          className={[
            ICON_WRAPPER[size],
            'flex items-center justify-center shrink-0',
            'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]',
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <p className={[TITLE[size], 'text-[var(--ds-text-primary)]'].join(' ')}>
          {title}
        </p>
        {description && (
          <p className={[DESC[size], 'text-[var(--ds-text-muted)] leading-relaxed'].join(' ')}>
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant ?? (i === 0 ? 'primary' : 'secondary')}
              size={size === 'sm' ? 'sm' : 'md'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Footer slot */}
      {footer && (
        <div className="mt-1 text-xs text-[var(--ds-text-muted)]">
          {footer}
        </div>
      )}
    </div>
  );
}
