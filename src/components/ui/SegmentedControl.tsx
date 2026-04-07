import React, { useId } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentOption<T extends string = string> {
  value:    T;
  label:    React.ReactNode;
  icon?:    React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options:   SegmentOption<T>[];
  value:     T;
  onChange:  (value: T) => void;
  size?:     SegmentedControlSize;
  fullWidth?: boolean;
  /** Accessible label for the group */
  'aria-label': string;
  className?: string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIZE: Record<SegmentedControlSize, { track: string; seg: string }> = {
  sm: { track: 'p-0.5 gap-0.5', seg: 'h-6  px-2.5 text-[11px]' },
  md: { track: 'p-0.5 gap-0.5', seg: 'h-7  px-3   text-xs'     },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size      = 'md',
  fullWidth = false,
  className = '',
  ...props
}: SegmentedControlProps<T>) {
  const groupId = useId();
  const { track, seg } = SIZE[size];

  return (
    <div
      role="group"
      aria-label={props['aria-label']}
      className={[
        'inline-flex items-center rounded-lg',
        'bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)]',
        track,
        fullWidth ? 'flex w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {options.map(opt => {
        const isSelected = opt.value === value;
        const btnId      = `${groupId}-${opt.value}`;

        return (
          <button
            key={opt.value}
            id={btnId}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={[
              'inline-flex items-center justify-center gap-1.5',
              'font-medium rounded-md',
              'transition-all duration-[var(--ds-duration-base)]',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-0',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              seg,
              fullWidth ? 'flex-1' : '',
              isSelected
                ? 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] shadow-sm border border-[var(--ds-border-base)]'
                : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-secondary)] bg-transparent border border-transparent',
            ].filter(Boolean).join(' ')}
          >
            {opt.icon && (
              <span aria-hidden="true" className="flex items-center">
                {opt.icon}
              </span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
