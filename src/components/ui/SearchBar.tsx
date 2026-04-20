'use client';

import React, { useState, useCallback, useRef } from 'react';
import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import { Spinner } from './Spinner';
import type { InputSize } from './Input';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchBarProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'onKeyDown' | 'onFocus' | 'onBlur'
  > {
  value?:        string;
  defaultValue?: string;
  onChange?:     (value: string) => void;
  /** Fires on Enter key press */
  onSearch?:     (value: string) => void;
  onClear?:      () => void;
  size?:         InputSize;
  /** Replace the search icon with a spinner */
  loading?:      boolean;
  fullWidth?:    boolean;
  /**
   * Keyboard shortcut hint shown when the field is empty and unfocused.
   * e.g. '⌘K', '/', '⌘F'
   */
  shortcut?:     string;
  // passthrough events
  onKeyDown?:    React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?:      React.FocusEventHandler<HTMLInputElement>;
  onBlur?:       React.FocusEventHandler<HTMLInputElement>;
}

// ─── Size maps (mirror Input.tsx) ─────────────────────────────────────────────

const HEIGHT: Record<InputSize, string> = {
  sm: 'h-8  text-xs',
  md: 'h-10 text-sm',
  lg: 'h-11 text-sm',
};

const RADIUS: Record<InputSize, string> = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-lg',
};

const ICON_W: Record<InputSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4   w-4',
  lg: 'h-4   w-4',
};

const PAD_L:    Record<InputSize, string> = { sm: 'pl-8',  md: 'pl-9',  lg: 'pl-10' };
const PAD_R:    Record<InputSize, string> = { sm: 'pr-8',  md: 'pr-9',  lg: 'pr-10' };
const PAD_R_SM: Record<InputSize, string> = { sm: 'pr-3',  md: 'pr-3',  lg: 'pr-4'  };

const SPINNER_SIZE: Record<InputSize, 'xs' | 'sm'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
};

// Shortcut badge right offset — clears enough room for the badge
const SHORTCUT_PAD_R: Record<InputSize, string> = {
  sm: 'pr-12',
  md: 'pr-14',
  lg: 'pr-14',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchBar({
  value,
  defaultValue   = '',
  onChange,
  onSearch,
  onClear,
  size           = 'md',
  loading        = false,
  fullWidth      = false,
  shortcut,
  placeholder    = 'Search…',
  disabled,
  className      = '',
  onKeyDown,
  onFocus,
  onBlur,
  ...props
}: SearchBarProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused]             = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue  = isControlled ? (value ?? '') : internalValue;
  const hasText       = currentValue.length > 0;
  const showClear     = hasText && !disabled;
  const showShortcut  = !!shortcut && !hasText && !focused && !disabled;

  // Determine right padding based on what's visible on the right
  const rightPad = showClear || showShortcut
    ? showShortcut ? SHORTCUT_PAD_R[size] : PAD_R[size]
    : PAD_R_SM[size];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  }, [isControlled, onChange, onClear]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') onSearch?.(currentValue);
      if (e.key === 'Escape' && hasText) {
        e.preventDefault();
        handleClear();
      }
      onKeyDown?.(e);
    },
    [currentValue, hasText, onSearch, handleClear, onKeyDown],
  );

  const inputClasses = [
    'block w-full border outline-none transition-colors',
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'placeholder-[var(--ds-text-muted)]',
    'border-[var(--ds-border-strong)]',
    'focus:border-[var(--ds-brand-600)] focus:ring-2 focus:ring-[var(--ds-brand-500)] focus:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--ds-bg-subtle)]',
    HEIGHT[size],
    RADIUS[size],
    PAD_L[size],
    rightPad,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={[
        'relative flex items-center',
        fullWidth ? 'w-full' : 'inline-flex',
      ].join(' ')}
    >
      {/* Left icon: spinner while loading, search icon otherwise */}
      <span
        className={[
          'pointer-events-none absolute left-3 flex items-center shrink-0',
          ICON_W[size],
          loading ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]',
        ].join(' ')}
        aria-hidden="true"
      >
        {loading
          ? <Spinner size={SPINNER_SIZE[size]} variant="brand" label="Searching…" />
          : <MagnifyingGlassIcon />
        }
      </span>

      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={props['aria-label'] ?? placeholder}
        className={inputClasses}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => { setFocused(true);  onFocus?.(e); }}
        onBlur={(e)  => { setFocused(false); onBlur?.(e);  }}
        {...props}
      />

      {/* Clear button — visible when there is text */}
      {showClear && (
        <button
          type="button"
          tabIndex={-1}
          onClick={handleClear}
          aria-label="Clear search"
          className={[
            'absolute right-3 flex items-center justify-center shrink-0',
            'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
            'transition-colors cursor-pointer rounded-sm',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ds-brand-500)]',
            ICON_W[size],
          ].join(' ')}
        >
          <XIcon />
        </button>
      )}

      {/* Keyboard shortcut hint — visible when field is empty and unfocused */}
      {showShortcut && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute right-3 inline-flex items-center',
            'px-1.5 rounded border font-medium leading-none tracking-wide',
            'text-[var(--ds-text-muted)] border-[var(--ds-border-strong)] bg-[var(--ds-bg-subtle)]',
            size === 'sm' ? 'text-[9px] py-0.5' : 'text-[10px] py-1',
          ].join(' ')}
        >
          {shortcut}
        </span>
      )}
    </div>
  );
}
