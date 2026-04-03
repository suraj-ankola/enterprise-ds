import React from 'react';
import { XIcon } from '@phosphor-icons/react';

export type BadgeVariant    = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeAppearance = 'subtle' | 'outline' | 'solid';
export type BadgeSize       = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?:    BadgeVariant;
  appearance?: BadgeAppearance;
  size?:       BadgeSize;
  /** Colored dot indicator (shown only when no icon is provided) */
  dot?:        boolean;
  /** Left icon slot */
  icon?:       React.ReactNode;
  /** Makes badge dismissible — renders an × button */
  onDismiss?:  () => void;
  className?:  string;
  children:    React.ReactNode;
}

// ─── Base ─────────────────────────────────────────────────────────────────────

const BASE = 'inline-flex items-center font-medium whitespace-nowrap leading-none select-none';

// ─── Size → 8pt grid ─────────────────────────────────────────────────────────

const SIZE: Record<BadgeSize, string> = {
  sm: 'h-5  px-1.5 text-[10px] gap-1   rounded',
  md: 'h-6  px-2   text-xs     gap-1.5 rounded-md',
  lg: 'h-7  px-2.5 text-sm     gap-2   rounded-md',
};

const DOT_SIZE: Record<BadgeSize, string> = {
  sm: 'h-1.5 w-1.5 shrink-0 rounded-full',
  md: 'h-2   w-2   shrink-0 rounded-full',
  lg: 'h-2   w-2   shrink-0 rounded-full',
};

const DISMISS_ICON_SIZE: Record<BadgeSize, number> = {
  sm: 10,
  md: 12,
  lg: 12,
};

// ─── Subtle appearance — tinted bg, semantic text ─────────────────────────────

const SUBTLE: Record<BadgeVariant, string> = {
  neutral: 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)]',
  brand:   'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]',
  success: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
  warning: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
  danger:  'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]',
  info:    'bg-[var(--ds-info-bg)]    text-[var(--ds-info-text)]',
};

// ─── Outline appearance — transparent bg, border + text ───────────────────────

const OUTLINE: Record<BadgeVariant, string> = {
  neutral: 'border border-[var(--ds-border-strong)]  text-[var(--ds-text-secondary)]',
  brand:   'border border-[var(--ds-brand-600)]      text-[var(--ds-brand-600)]',
  success: 'border border-[var(--ds-success-border)] text-[var(--ds-success-text)]',
  warning: 'border border-[var(--ds-warning-border)] text-[var(--ds-warning-text)]',
  danger:  'border border-[var(--ds-danger-border)]  text-[var(--ds-danger-text)]',
  info:    'border border-[var(--ds-info-border)]    text-[var(--ds-info-text)]',
};

// ─── Solid appearance — filled bg, WCAG AA verified (see tokens.ts) ───────────

const SOLID: Record<BadgeVariant, string> = {
  neutral: 'bg-[var(--ds-bg-inverse)]         text-[var(--ds-text-inverse)]',
  brand:   'bg-[var(--ds-brand-600)]          text-[var(--ds-brand-text)]',
  success: 'bg-[var(--ds-success-solid-bg)]   text-[var(--ds-success-solid-text)]',
  warning: 'bg-[var(--ds-warning-solid-bg)]   text-[var(--ds-warning-solid-text)]',
  danger:  'bg-[var(--ds-danger-solid-bg)]    text-[var(--ds-danger-solid-text)]',
  info:    'bg-[var(--ds-info-solid-bg)]      text-[var(--ds-info-solid-text)]',
};

const APPEARANCE: Record<BadgeAppearance, Record<BadgeVariant, string>> = {
  subtle:  SUBTLE,
  outline: OUTLINE,
  solid:   SOLID,
};

// ─── Dot color ────────────────────────────────────────────────────────────────

const DOT_COLOR: Record<BadgeVariant, string> = {
  neutral: 'bg-[var(--ds-text-muted)]',
  brand:   'bg-[var(--ds-brand-600)]',
  success: 'bg-[var(--ds-success-icon)]',
  warning: 'bg-[var(--ds-warning-icon)]',
  danger:  'bg-[var(--ds-danger-icon)]',
  info:    'bg-[var(--ds-info-icon)]',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Badge({
  variant    = 'neutral',
  appearance = 'subtle',
  size       = 'md',
  dot        = false,
  icon,
  onDismiss,
  className  = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        BASE,
        SIZE[size],
        APPEARANCE[appearance][variant],
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Dot indicator — only when no icon is provided */}
      {dot && !icon && (
        <span
          className={[DOT_SIZE[size], DOT_COLOR[variant]].join(' ')}
          aria-hidden="true"
        />
      )}

      {/* Left icon */}
      {icon && (
        <span className="shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Label */}
      <span>{children}</span>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          className="-mr-0.5 shrink-0 flex items-center opacity-60 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none rounded-sm transition-opacity duration-[var(--ds-duration-fast)]"
          aria-label="Dismiss"
        >
          <XIcon size={DISMISS_ICON_SIZE[size]} weight="bold" />
        </button>
      )}
    </span>
  );
}
