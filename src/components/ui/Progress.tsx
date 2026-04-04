import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressVariant = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
export type ProgressSize   = 'xs' | 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** 0–100 */
  value:       number;
  /** Optional max (defaults to 100) */
  max?:        number;
  variant?:    ProgressVariant;
  size?:       ProgressSize;
  label?:      string;
  /** Show percentage text next to bar */
  showValue?:  boolean;
  /** Animated indeterminate state */
  indeterminate?: boolean;
  className?:  string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const TRACK_H: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

// ─── Fill colour ──────────────────────────────────────────────────────────────

const FILL: Record<ProgressVariant, string> = {
  brand:   'bg-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-icon)]',
  warning: 'bg-[var(--ds-warning-icon)]',
  danger:  'bg-[var(--ds-danger-icon)]',
  neutral: 'bg-[var(--ds-text-muted)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Progress({
  value,
  max         = 100,
  variant     = 'brand',
  size        = 'md',
  label,
  showValue   = false,
  indeterminate = false,
  className   = '',
}: ProgressProps) {
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={['flex flex-col gap-1.5 w-full', className].filter(Boolean).join(' ')}>
      {/* Label row */}
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-[var(--ds-text-secondary)]">{label}</span>
          )}
          {showValue && !indeterminate && (
            <span className="text-xs text-[var(--ds-text-muted)] tabular-nums">{Math.round(pct)}%</span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        aria-busy={indeterminate}
        className={[
          'w-full rounded-full overflow-hidden bg-[var(--ds-bg-subtle)]',
          TRACK_H[size],
        ].join(' ')}
      >
        {indeterminate ? (
          <div
            className={['h-full w-1/3 rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite]', FILL[variant]].join(' ')}
            style={{ animation: 'indeterminate 1.5s ease-in-out infinite' }}
          />
        ) : (
          <div
            className={['h-full rounded-full transition-[width] duration-[var(--ds-duration-slow)]', FILL[variant]].join(' ')}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
    </div>
  );
}
