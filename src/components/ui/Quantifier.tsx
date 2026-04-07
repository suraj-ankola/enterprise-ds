import React, { useId } from 'react';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type QuantifierSize = 'sm' | 'md';

export interface QuantifierProps {
  value:        number;
  onChange:     (value: number) => void;
  min?:         number;
  max?:         number;
  step?:        number;
  label?:       string;
  disabled?:    boolean;
  size?:        QuantifierSize;
  /** Override the displayed string (e.g., to append a unit) */
  formatValue?: (v: number) => string;
  className?:   string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIZE: Record<QuantifierSize, { btn: string; input: string; icon: number }> = {
  sm: { btn: 'h-7 w-7',   input: 'h-7 w-12 text-xs',  icon: 13 },
  md: { btn: 'h-8 w-8',   input: 'h-8 w-14 text-sm',  icon: 14 },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Quantifier({
  value,
  onChange,
  min          = 0,
  max          = Infinity,
  step         = 1,
  label,
  disabled     = false,
  size         = 'md',
  formatValue,
  className    = '',
}: QuantifierProps) {
  const id = useId();
  const { btn, input, icon } = SIZE[size];

  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  function decrement() {
    if (canDecrement && !disabled) onChange(value - step);
  }

  function increment() {
    if (canIncrement && !disabled) onChange(value + step);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const n = Number(e.target.value);
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
  }

  const btnBase = [
    'inline-flex items-center justify-center rounded-md shrink-0',
    'border border-[var(--ds-border-base)]',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)]',
    'hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
    'active:bg-[var(--ds-bg-raised)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'transition-colors duration-[var(--ds-duration-base)]',
    btn,
  ].join(' ');

  return (
    <div className={['space-y-1', className].join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--ds-text-primary)]">
          {label}
        </label>
      )}
      <div className="inline-flex items-center gap-1" role="group" aria-label={label}>
        <button
          type="button"
          aria-label="Decrement"
          disabled={disabled || !canDecrement}
          onClick={decrement}
          className={btnBase}
        >
          <MinusIcon size={icon} weight="bold" />
        </button>

        <input
          id={id}
          type="number"
          value={formatValue ? formatValue(value) : value}
          min={min}
          max={max === Infinity ? undefined : max}
          step={step}
          disabled={disabled}
          onChange={handleInput}
          aria-label={label ?? 'Quantity'}
          className={[
            'text-center tabular-nums font-medium',
            'rounded-md border border-[var(--ds-border-base)]',
            'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            input,
          ].join(' ')}
        />

        <button
          type="button"
          aria-label="Increment"
          disabled={disabled || !canIncrement}
          onClick={increment}
          className={btnBase}
        >
          <PlusIcon size={icon} weight="bold" />
        </button>
      </div>
    </div>
  );
}
