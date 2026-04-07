import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CircularProgressVariant = 'brand' | 'success' | 'warning' | 'danger' | 'muted';
export type CircularProgressSize    = 'sm' | 'md' | 'lg' | 'xl';

export interface CircularProgressProps {
  /** 0–100 */
  value:       number;
  variant?:    CircularProgressVariant;
  size?:       CircularProgressSize;
  /** Content rendered in the centre (overrides default value display) */
  label?:      React.ReactNode;
  showValue?:  boolean;
  /** Accessible label for the progress indicator */
  'aria-label'?: string;
  className?:  string;
}

// ─── Maps ─────────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<CircularProgressSize, { px: number; stroke: number; text: string }> = {
  sm: { px: 32,  stroke: 3, text: 'text-[9px]'  },
  md: { px: 48,  stroke: 4, text: 'text-[11px]' },
  lg: { px: 64,  stroke: 5, text: 'text-xs'     },
  xl: { px: 96,  stroke: 6, text: 'text-sm'     },
};

const VARIANT_FILL: Record<CircularProgressVariant, string> = {
  brand:   'var(--ds-brand-600)',
  success: 'var(--ds-success-icon)',
  warning: 'var(--ds-warning-icon)',
  danger:  'var(--ds-danger-icon)',
  muted:   'var(--ds-text-muted)',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CircularProgress({
  value,
  variant      = 'brand',
  size         = 'md',
  label,
  showValue    = true,
  className    = '',
  ...props
}: CircularProgressProps) {
  const { px, stroke, text } = SIZE_MAP[size];
  const clamped = Math.max(0, Math.min(100, value));

  const radius      = (px - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset  = circumference * (1 - clamped / 100);

  const fill = VARIANT_FILL[variant];
  const ariaLabel = props['aria-label'] ?? `${clamped}% complete`;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={['inline-flex items-center justify-center relative shrink-0', className].join(' ')}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        aria-hidden="true"
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          stroke="var(--ds-bg-raised)"
          strokeWidth={stroke}
        />
        {/* Fill */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>

      {/* Centre content */}
      {(label !== undefined || showValue) && (
        <span
          className={[
            'absolute inset-0 flex items-center justify-center',
            'font-semibold tabular-nums',
            text,
            'text-[var(--ds-text-primary)]',
          ].join(' ')}
        >
          {label !== undefined ? label : `${Math.round(clamped)}%`}
        </span>
      )}
    </div>
  );
}
