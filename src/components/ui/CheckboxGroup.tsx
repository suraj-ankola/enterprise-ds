'use client';

import React, { useId, useState, useCallback, useMemo } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxSize } from './Checkbox';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxOption {
  value:       string;
  label:       React.ReactNode;
  helperText?: string;
  disabled?:   boolean;
}

export interface CheckboxGroupProps {
  options:          CheckboxOption[];
  /** Controlled selected values */
  value?:           string[];
  /** Initial selected values for uncontrolled usage */
  defaultValue?:    string[];
  onChange?:        (value: string[]) => void;
  /** Group label rendered as <legend> */
  label?:           string;
  helperText?:      string;
  errorMessage?:    string;
  required?:        boolean;
  /** Disables every checkbox in the group */
  disabled?:        boolean;
  size?:            CheckboxSize;
  orientation?:     'vertical' | 'horizontal';
  /** Renders a "Select all" checkbox above the list. Pass a string to customise the label. */
  selectAllLabel?:  string;
  /** Shared name attribute for all inputs — useful for native form submission */
  name?:            string;
  className?:       string;
}

// ─── Layout maps ─────────────────────────────────────────────────────────────

const GAP_V: Record<CheckboxSize, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-3',
};

const GAP_H: Record<CheckboxSize, string> = {
  sm: 'gap-x-4 gap-y-1.5',
  md: 'gap-x-6 gap-y-2',
  lg: 'gap-x-8 gap-y-3',
};

const LEGEND_SIZE: Record<CheckboxSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CheckboxGroup({
  options,
  value,
  defaultValue    = [],
  onChange,
  label,
  helperText,
  errorMessage,
  required        = false,
  disabled        = false,
  size            = 'md',
  orientation     = 'vertical',
  selectAllLabel,
  name,
  className       = '',
}: CheckboxGroupProps) {
  const groupId      = useId();
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selected = isControlled ? (value ?? []) : internalValue;

  const hasError = Boolean(errorMessage);
  const subText  = errorMessage ?? helperText;

  // Derive select-all state
  const enabledOptions  = useMemo(() => options.filter((o) => !o.disabled), [options]);
  const allSelected     = enabledOptions.length > 0 && enabledOptions.every((o) => selected.includes(o.value));
  const someSelected    = enabledOptions.some((o) => selected.includes(o.value));
  const selectAllIndeterminate = someSelected && !allSelected;

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleOptionChange = useCallback(
    (optValue: string, checked: boolean) => {
      const next = checked
        ? [...selected, optValue]
        : selected.filter((v) => v !== optValue);
      commit(next);
    },
    [selected, commit],
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      // If all are selected → deselect all enabled; otherwise → select all enabled
      const enabledValues = enabledOptions.map((o) => o.value);
      if (checked || selectAllIndeterminate) {
        // Select all enabled (merge with any already-selected disabled ones)
        const disabledSelected = selected.filter(
          (v) => !enabledValues.includes(v),
        );
        commit([...disabledSelected, ...enabledValues]);
      } else {
        // Deselect all enabled, keep disabled-but-selected values intact
        commit(selected.filter((v) => !enabledValues.includes(v)));
      }
    },
    [enabledOptions, selected, selectAllIndeterminate, commit],
  );

  const listClasses = [
    'flex',
    orientation === 'horizontal' ? `flex-row flex-wrap ${GAP_H[size]}` : `flex-col ${GAP_V[size]}`,
  ].join(' ');

  return (
    <fieldset className={['border-0 p-0 m-0 min-w-0', className].filter(Boolean).join(' ')}>

      {/* Legend — group label */}
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

      {/* Select all row */}
      {selectAllLabel !== undefined && enabledOptions.length > 0 && (
        <>
          <Checkbox
            size={size}
            label={selectAllLabel || 'Select all'}
            checked={allSelected}
            indeterminate={selectAllIndeterminate}
            disabled={disabled}
            onChange={handleSelectAll}
            aria-controls={enabledOptions.map((o) => `${groupId}-${o.value}`).join(' ')}
          />
          <div
            className="my-2 border-t border-[var(--ds-border-base)]"
            role="separator"
            aria-hidden="true"
          />
        </>
      )}

      {/* Option list */}
      <div className={listClasses} role="group" aria-labelledby={label ? `${groupId}-legend` : undefined}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            id={`${groupId}-${opt.value}`}
            name={name}
            value={opt.value}
            size={size}
            label={opt.label}
            helperText={opt.helperText}
            checked={selected.includes(opt.value)}
            disabled={disabled || opt.disabled}
            onChange={(checked) => handleOptionChange(opt.value, checked)}
          />
        ))}
      </div>

      {/* Group-level helper / error */}
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
