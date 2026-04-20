import React from 'react';
import { Spinner } from './Spinner';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InlineLoaderSize = 'xs' | 'sm' | 'md';

export interface InlineLoaderProps {
  /** Text shown beside the spinner */
  label?:     string;
  size?:      InlineLoaderSize;
  /** Screen-reader announcement text */
  srLabel?:   string;
  className?: string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const TEXT_SIZE: Record<InlineLoaderSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-sm',
};

const SPINNER_SIZE: Record<InlineLoaderSize, 'xs' | 'sm' | 'sm'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Small inline loading indicator — use inside table cells, panels, or anywhere
 * a full Spinner or Skeleton would be too heavy.
 */
export function InlineLoader({
  label     = 'Loading…',
  size      = 'sm',
  srLabel,
  className = '',
}: InlineLoaderProps) {
  return (
    <span
      role="status"
      aria-label={srLabel ?? label}
      className={[
        'inline-flex items-center gap-1.5',
        TEXT_SIZE[size],
        'text-[var(--ds-text-muted)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <Spinner size={SPINNER_SIZE[size]} variant="muted" label="" />
      {label && (
        <span aria-hidden="true">{label}</span>
      )}
    </span>
  );
}
