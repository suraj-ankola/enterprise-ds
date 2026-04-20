'use client';

import React, { useId, useState, useCallback } from 'react';
import { Radio } from './Radio';
import type { RadioSize } from './Radio';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioOption {
  value:       string;
  label:       React.ReactNode;
  helperText?: string;
  disabled?:   boolean;
}

export interface RadioGroupProps {
  options:        RadioOption[];
  /** Controlled selected value */
  value?:         string;
  /** Initial selected value for uncontrolled usage */
  defaultValue?:  string;
  onChange?:      (value: string) => void;
  /** Group label rendered as <legend> */
  label?:         string;
  helperText?:    string;
  errorMessage?:  string;
  required?:      boolean;
  /** Disables every radio in the group */
  disabled?:      boolean;
  size?:          RadioSize;
  orientation?:   'vertical' | 'horizontal';
  /** Shared name attribute — required for native form submission */
  name?:          string;
  className?:     string;
}

// ─── Layout maps ─────────────────────────────────────────────────────────────

const GAP_V: Record<RadioSize, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
};

const GAP_H: Record<RadioSize, string> = {
  sm: 'gap-x-4 gap-y-1.5',
  md: 'gap-x-6 gap-y-2',
  lg: 'gap-x-8 gap-y-3',
};

const LEGEND_SIZE: Record<RadioSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function RadioGroup({
  options,
  value,
  defaultValue   = '',
  onChange,
  label,
  helperText,
  errorMessage,
  required       = false,
  disabled       = false,
  size           = 'md',
  orientation    = 'vertical',
  name: nameProp,
  className      = '',
}: RadioGroupProps) {
  const groupId      = useId();
  const name         = nameProp ?? groupId;
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = isControlled ? (value ?? '') : internalValue;

  const hasError = Boolean(errorMessage);
  const subText  = errorMessage ?? helperText;

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );

  const listClasses = [
    'flex',
    orientation === 'horizontal'
      ? `flex-row flex-wrap ${GAP_H[size]}`
      : `flex-col ${GAP_V[size]}`,
  ].join(' ');

  return (
    <fieldset className={['border-0 p-0 m-0 min-w-0', className].filter(Boolean).join(' ')}>

      {label && (
        <legend
          className={[
            'mb-2 font-medium float-none w-full',
            LEGEND_SIZE[size],
            hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-primary)]',
          ].join(' ')}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-[var(--ds-danger-text)]" aria-hidden="true">*</span>
          )}
        </legend>
      )}

      <div className={listClasses}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            helperText={opt.helperText}
            size={size}
            checked={selected === opt.value}
            disabled={disabled || opt.disabled}
            onChange={handleChange}
          />
        ))}
      </div>

      {subText && (
        <p
          className={[
            'mt-2 text-xs',
            hasError ? 'text-[var(--ds-danger-text)]' : 'text-[var(--ds-text-muted)]',
          ].join(' ')}
          role={hasError ? 'alert' : undefined}
        >
          {subText}
        </p>
      )}
    </fieldset>
  );
}
