import React from 'react';
import { XIcon, CheckCircleIcon, WarningIcon, XCircleIcon, InfoIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?:     AlertVariant;
  title?:       React.ReactNode;
  children?:    React.ReactNode;
  /** Render custom icon — pass null to hide icon */
  icon?:        React.ReactNode | null;
  /** Show dismiss button */
  onDismiss?:   () => void;
  /** Additional action slot */
  action?:      React.ReactNode;
  className?:   string;
}

// ─── Token maps ───────────────────────────────────────────────────────────────

const BG: Record<AlertVariant, string> = {
  info:    'bg-[var(--ds-info-bg)]    border-[var(--ds-info-border)]',
  success: 'bg-[var(--ds-success-bg)] border-[var(--ds-success-border)]',
  warning: 'bg-[var(--ds-warning-bg)] border-[var(--ds-warning-border)]',
  danger:  'bg-[var(--ds-danger-bg)]  border-[var(--ds-danger-border)]',
};

const TITLE: Record<AlertVariant, string> = {
  info:    'text-[var(--ds-info-text)]',
  success: 'text-[var(--ds-success-text)]',
  warning: 'text-[var(--ds-warning-text)]',
  danger:  'text-[var(--ds-danger-text)]',
};

const ICON_COLOR: Record<AlertVariant, string> = {
  info:    'text-[var(--ds-info-icon)]',
  success: 'text-[var(--ds-success-icon)]',
  warning: 'text-[var(--ds-warning-icon)]',
  danger:  'text-[var(--ds-danger-icon)]',
};

const DEFAULT_ICON: Record<AlertVariant, React.ReactNode> = {
  info:    <InfoIcon    size={18} weight="fill" />,
  success: <CheckCircleIcon size={18} weight="fill" />,
  warning: <WarningIcon size={18} weight="fill" />,
  danger:  <XCircleIcon size={18} weight="fill" />,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Alert({
  variant   = 'info',
  title,
  children,
  icon,
  onDismiss,
  action,
  className = '',
}: AlertProps) {
  const resolvedIcon = icon === null ? null : (icon ?? DEFAULT_ICON[variant]);

  return (
    <div
      role="alert"
      className={[
        'flex gap-3 rounded-xl border px-4 py-3',
        BG[variant],
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Icon */}
      {resolvedIcon && (
        <span className={['shrink-0 mt-0.5', ICON_COLOR[variant]].join(' ')} aria-hidden="true">
          {resolvedIcon}
        </span>
      )}

      {/* Body */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={['text-sm font-semibold leading-snug', TITLE[variant]].join(' ')}>
            {title}
          </p>
        )}
        {children && (
          <div className={[
            'text-sm leading-relaxed text-[var(--ds-text-secondary)]',
            title ? 'mt-1' : '',
          ].join(' ')}>
            {children}
          </div>
        )}
        {action && (
          <div className="mt-3">{action}</div>
        )}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={[
            'shrink-0 -mt-0.5 -mr-1 p-1 rounded-md transition-colors',
            'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
          ].join(' ')}
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
}
