import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SteppedProgressBarSize    = 'xs' | 'sm' | 'md';
export type SteppedProgressBarVariant = 'brand' | 'success' | 'warning' | 'danger';

export interface SteppedProgressBarProps {
  /** Total number of steps */
  steps:         number;
  /** Current step (1-based). Steps < currentStep are complete, currentStep is active. */
  currentStep:   number;
  /** Optional labels for each step — array length must equal `steps` */
  labels?:       string[];
  variant?:      SteppedProgressBarVariant;
  size?:         SteppedProgressBarSize;
  /** Show "Step X of Y" counter above the bar */
  showCounter?:  boolean;
  className?:    string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const BAR_H: Record<SteppedProgressBarSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
};

const LABEL_SIZE: Record<SteppedProgressBarSize, string> = {
  xs: 'text-[10px]',
  sm: 'text-xs',
  md: 'text-xs',
};

// ─── Colour maps → DS tokens ──────────────────────────────────────────────────

const FILL: Record<SteppedProgressBarVariant, string> = {
  brand:   'bg-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-icon)]',
  warning: 'bg-[var(--ds-warning-icon)]',
  danger:  'bg-[var(--ds-danger-icon)]',
};

const ACTIVE: Record<SteppedProgressBarVariant, string> = {
  brand:   'bg-[var(--ds-brand-400,#93c5fd)]',
  success: 'bg-[var(--ds-success-border)]',
  warning: 'bg-[var(--ds-warning-border)]',
  danger:  'bg-[var(--ds-danger-border)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function SteppedProgressBar({
  steps,
  currentStep,
  labels,
  variant     = 'brand',
  size        = 'sm',
  showCounter = false,
  className   = '',
}: SteppedProgressBarProps) {
  const clamped = Math.max(1, Math.min(currentStep, steps));

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>

      {showCounter && (
        <p className={['font-medium text-[var(--ds-text-secondary)]', LABEL_SIZE[size]].join(' ')}>
          Step {clamped} of {steps}
        </p>
      )}

      {/* Segments */}
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={1}
        aria-valuemax={steps}
        aria-label={`Step ${clamped} of ${steps}`}
      >
        {Array.from({ length: steps }, (_, i) => {
          const stepNum  = i + 1;
          const complete = stepNum < clamped;
          const active   = stepNum === clamped;

          return (
            <div
              key={i}
              className={[
                'flex-1 rounded-full transition-colors duration-300',
                BAR_H[size],
                complete ? FILL[variant]
                  : active   ? ACTIVE[variant]
                  : 'bg-[var(--ds-border-strong)]',
              ].join(' ')}
            />
          );
        })}
      </div>

      {/* Labels */}
      {labels && labels.length === steps && (
        <div className="flex">
          {labels.map((lbl, i) => {
            const stepNum  = i + 1;
            const complete = stepNum < clamped;
            const active   = stepNum === clamped;
            return (
              <span
                key={i}
                className={[
                  'flex-1 truncate',
                  LABEL_SIZE[size],
                  active   ? 'font-semibold text-[var(--ds-text-primary)]'
                    : complete ? 'text-[var(--ds-text-secondary)]'
                    : 'text-[var(--ds-text-muted)]',
                ].join(' ')}
              >
                {lbl}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
