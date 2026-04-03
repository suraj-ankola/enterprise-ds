import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  loading?:   boolean;
  fullWidth?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  children:   React.ReactNode;
}

// ─── Base classes shared by all variants ─────────────────────────────────────
const BASE = [
  'inline-flex items-center justify-center font-semibold',
  'transition-colors cursor-pointer select-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ');

// ─── Variant → uses --ds-brand-* tokens so theme switching is automatic ──────
const VARIANT: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)]',
    'border border-[var(--ds-brand-600)]',
    'hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)]',
    'active:bg-[var(--ds-brand-800)] active:border-[var(--ds-brand-800)]',
    'shadow-sm',
    'focus-visible:ring-[var(--ds-brand-500)]',
  ].join(' '),

  secondary: [
    'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)]',
    'border border-[var(--ds-border-strong)]',
    'hover:bg-[var(--ds-bg-subtle)] hover:border-[var(--ds-border-strong)]',
    'active:bg-[var(--ds-border-base)]',
    'shadow-sm',
    'focus-visible:ring-[var(--ds-brand-500)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--ds-text-secondary)]',
    'border border-transparent',
    'hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
    'active:bg-[var(--ds-border-base)]',
    'focus-visible:ring-[var(--ds-brand-500)]',
  ].join(' '),

  danger: [
    'bg-[var(--ds-danger-icon)] text-white',
    'border border-[var(--ds-danger-icon)]',
    'hover:bg-red-700 hover:border-red-700',
    'active:bg-red-800 active:border-red-800',
    'shadow-sm',
    'focus-visible:ring-[var(--ds-danger-icon)]',
  ].join(' '),
};

// ─── Size → 8pt grid (h-8=32px, h-9=36px, h-11=44px) ────────────────────────
const SIZE: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-xs  gap-1.5 rounded-md',
  md: 'h-9  px-4   text-sm  gap-2   rounded-lg',
  lg: 'h-11 px-5   text-sm  gap-2   rounded-lg',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    BASE,
    VARIANT[variant],
    SIZE[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading
        ? <Spinner size={size} />
        : leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
      }
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="shrink-0 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const sz = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
  return (
    <svg className={`${sz} animate-spin shrink-0`} xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
