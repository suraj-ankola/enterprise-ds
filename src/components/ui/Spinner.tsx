import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SpinnerSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'brand' | 'white' | 'muted' | 'success' | 'warning' | 'danger';

export interface SpinnerProps {
  size?:      SpinnerSize;
  variant?:   SpinnerVariant;
  /** Screen-reader label */
  label?:     string;
  className?: string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIZE: Record<SpinnerSize, { ring: string; border: string }> = {
  xs: { ring: 'h-3   w-3',   border: 'border-[1.5px]' },
  sm: { ring: 'h-4   w-4',   border: 'border-2' },
  md: { ring: 'h-5   w-5',   border: 'border-2' },
  lg: { ring: 'h-7   w-7',   border: 'border-[3px]' },
  xl: { ring: 'h-10  w-10',  border: 'border-4' },
};

// ─── Variant → DS token colours ───────────────────────────────────────────────

const TRACK: Record<SpinnerVariant, string> = {
  brand:   'border-[var(--ds-brand-200)]',
  white:   'border-white/30',
  muted:   'border-[var(--ds-border-strong)]',
  success: 'border-[var(--ds-success-bg)]',
  warning: 'border-[var(--ds-warning-bg)]',
  danger:  'border-[var(--ds-danger-bg)]',
};

const FILL: Record<SpinnerVariant, string> = {
  brand:   'border-t-[var(--ds-brand-600)]',
  white:   'border-t-white',
  muted:   'border-t-[var(--ds-text-muted)]',
  success: 'border-t-[var(--ds-success-icon)]',
  warning: 'border-t-[var(--ds-warning-icon)]',
  danger:  'border-t-[var(--ds-danger-icon)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Spinner({
  size    = 'md',
  variant = 'brand',
  label   = 'Loading…',
  className = '',
}: SpinnerProps) {
  const { ring, border } = SIZE[size];

  return (
    <span
      role="status"
      aria-label={label}
      className={['inline-flex items-center justify-center shrink-0', className].join(' ')}
    >
      <span
        className={[
          'rounded-full animate-spin',
          ring,
          border,
          TRACK[variant],
          FILL[variant],
        ].join(' ')}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

// ─── SpinnerOverlay ───────────────────────────────────────────────────────────
// Full-panel overlay with centred spinner — for page / card loading states

export interface SpinnerOverlayProps {
  label?:     string;
  /** Use 'white' variant for dark backgrounds */
  variant?:   SpinnerVariant;
  size?:      SpinnerSize;
  /** Semi-transparent backdrop */
  backdrop?:  boolean;
  className?: string;
}

export function SpinnerOverlay({
  label   = 'Loading…',
  variant = 'brand',
  size    = 'lg',
  backdrop = true,
  className = '',
}: SpinnerOverlayProps) {
  return (
    <div
      className={[
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-3',
        backdrop ? 'bg-[var(--ds-bg-surface)]/70 backdrop-blur-sm' : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-busy="true"
    >
      <Spinner size={size} variant={variant} label={label} />
      {label && label !== 'Loading…' && (
        <p className="text-sm text-[var(--ds-text-muted)]">{label}</p>
      )}
    </div>
  );
}
