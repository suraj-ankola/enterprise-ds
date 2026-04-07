import React from 'react';
import { XIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChipVariant = 'default' | 'brand' | 'success' | 'warning' | 'danger';
export type ChipSize    = 'sm' | 'md';

// ── Display chip (label / tag) ─────────────────────────────────────────────

export interface ChipProps {
  label:      React.ReactNode;
  variant?:   ChipVariant;
  size?:      ChipSize;
  icon?:      React.ReactNode;
  onRemove?:  () => void;
  /** aria-label for the remove button */
  removeLabel?: string;
  className?: string;
}

// ── Selectable chip ────────────────────────────────────────────────────────

export interface SelectableChipProps {
  label:      React.ReactNode;
  selected:   boolean;
  onToggle:   () => void;
  size?:      ChipSize;
  icon?:      React.ReactNode;
  disabled?:  boolean;
  className?: string;
}

// ── Chip group (convenience wrapper) ──────────────────────────────────────

export interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

// ─── Token maps ───────────────────────────────────────────────────────────────

const VARIANT_CHIP: Record<ChipVariant, string> = {
  default: 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-base)]',
  brand:   'bg-[var(--ds-brand-50)]  text-[var(--ds-brand-700)]  border border-[var(--ds-brand-200)]',
  success: 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)] border border-[var(--ds-success-border)]',
  warning: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)] border border-[var(--ds-warning-border)]',
  danger:  'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]  border border-[var(--ds-danger-border)]',
};

const SIZE_CHIP: Record<ChipSize, string> = {
  sm: 'h-5 px-2 text-[11px] gap-1 rounded-full',
  md: 'h-6 px-2.5 text-xs gap-1.5 rounded-full',
};

const SIZE_REMOVE: Record<ChipSize, number> = { sm: 10, md: 12 };

// ─── Chip ─────────────────────────────────────────────────────────────────────

export function Chip({
  label,
  variant   = 'default',
  size      = 'md',
  icon,
  onRemove,
  removeLabel = 'Remove',
  className = '',
}: ChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-medium shrink-0',
        SIZE_CHIP[size],
        VARIANT_CHIP[variant],
        className,
      ].join(' ')}
    >
      {icon && <span aria-hidden="true" className="flex items-center">{icon}</span>}
      {label}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="ml-0.5 flex items-center opacity-60 hover:opacity-100 focus-visible:outline-none transition-opacity"
        >
          <XIcon size={SIZE_REMOVE[size]} weight="bold" />
        </button>
      )}
    </span>
  );
}

// ─── SelectableChip ───────────────────────────────────────────────────────────

export function SelectableChip({
  label,
  selected,
  onToggle,
  size      = 'md',
  icon,
  disabled  = false,
  className = '',
}: SelectableChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onToggle}
      className={[
        'inline-flex items-center font-medium shrink-0 cursor-pointer',
        'border transition-colors duration-[var(--ds-duration-base)]',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        SIZE_CHIP[size],
        selected
          ? 'bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)] hover:bg-[var(--ds-brand-700)]'
          : 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
        className,
      ].join(' ')}
    >
      {icon && <span aria-hidden="true" className="flex items-center">{icon}</span>}
      {label}
    </button>
  );
}

// ─── ChipGroup ────────────────────────────────────────────────────────────────

export function ChipGroup({ children, className = '' }: ChipGroupProps) {
  return (
    <div className={['flex flex-wrap gap-1.5', className].join(' ')}>
      {children}
    </div>
  );
}
