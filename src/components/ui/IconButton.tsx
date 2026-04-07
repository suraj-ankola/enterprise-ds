import React from 'react';
import { Spinner } from './Spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type IconButtonSize    = 'xs' | 'sm' | 'md' | 'lg';
export type IconButtonShape   = 'square' | 'circle';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to display — required for accessibility, pair with `aria-label` */
  icon:        React.ReactNode;
  variant?:    IconButtonVariant;
  size?:       IconButtonSize;
  shape?:      IconButtonShape;
  loading?:    boolean;
  /** Required for accessibility — describes the action */
  'aria-label': string;
  className?:  string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIZE: Record<IconButtonSize, { btn: string; icon: string; spinner: 'xs' | 'sm' }> = {
  xs: { btn: 'h-6  w-6',  icon: 'text-[14px]', spinner: 'xs' },
  sm: { btn: 'h-7  w-7',  icon: 'text-[15px]', spinner: 'xs' },
  md: { btn: 'h-8  w-8',  icon: 'text-[16px]', spinner: 'sm' },
  lg: { btn: 'h-10 w-10', icon: 'text-[18px]', spinner: 'sm' },
};

const SHAPE: Record<IconButtonShape, string> = {
  square: 'rounded-lg',
  circle: 'rounded-full',
};

// ─── Variant → DS tokens ─────────────────────────────────────────────────────

const VARIANT: Record<IconButtonVariant, string> = {
  primary: [
    'bg-[var(--ds-brand-600)] text-white',
    'hover:bg-[var(--ds-brand-700)]',
    'active:bg-[var(--ds-brand-800)]',
    'disabled:bg-[var(--ds-brand-300)]',
  ].join(' '),
  secondary: [
    'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
    'border border-[var(--ds-border-base)]',
    'hover:bg-[var(--ds-bg-raised)] hover:text-[var(--ds-text-primary)]',
    'active:bg-[var(--ds-bg-subtle)]',
    'disabled:opacity-50',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--ds-text-muted)]',
    'hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
    'active:bg-[var(--ds-bg-subtle)]',
    'disabled:opacity-40',
  ].join(' '),
  outline: [
    'bg-transparent text-[var(--ds-text-secondary)]',
    'border border-[var(--ds-border-strong)]',
    'hover:bg-[var(--ds-bg-subtle)] hover:border-[var(--ds-border-base)]',
    'active:bg-[var(--ds-bg-subtle)]',
    'disabled:opacity-50',
  ].join(' '),
  danger: [
    'bg-transparent text-[var(--ds-danger-icon)]',
    'hover:bg-[var(--ds-danger-bg)]',
    'active:bg-[var(--ds-danger-bg)]',
    'disabled:opacity-40',
  ].join(' '),
};

const BASE = [
  'inline-flex items-center justify-center shrink-0',
  'transition-colors duration-[var(--ds-duration-base)]',
  'focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
  'disabled:cursor-not-allowed',
].join(' ');

// ─── Component ────────────────────────────────────────────────────────────────

export function IconButton({
  icon,
  variant  = 'ghost',
  size     = 'md',
  shape    = 'square',
  loading  = false,
  disabled,
  className = '',
  ...props
}: IconButtonProps) {
  const { btn, icon: iconSize, spinner } = SIZE[size];

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[
        BASE,
        btn,
        SHAPE[shape],
        VARIANT[variant],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <Spinner
          size={spinner}
          variant={variant === 'primary' ? 'white' : 'muted'}
        />
      ) : (
        <span className={['flex items-center justify-center', iconSize].join(' ')} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
