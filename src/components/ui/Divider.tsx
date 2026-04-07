import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant     = 'base' | 'strong' | 'subtle' | 'brand';
export type DividerLabelAlign  = 'start' | 'center' | 'end';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?:     DividerVariant;
  /** Optional label rendered in the middle of the line */
  label?:       React.ReactNode;
  labelAlign?:  DividerLabelAlign;
  /** Vertical spacing (horizontal) or horizontal spacing (vertical) in Tailwind units */
  spacing?:     number;
  className?:   string;
}

// ─── Variant → DS border token ────────────────────────────────────────────────

const BORDER: Record<DividerVariant, string> = {
  base:   'border-[var(--ds-border-base)]',
  strong: 'border-[var(--ds-border-strong)]',
  subtle: 'border-[var(--ds-bg-subtle)]',
  brand:  'border-[var(--ds-brand-400)]',
};

const LABEL_ALIGN: Record<DividerLabelAlign, string> = {
  start:  'justify-start',
  center: 'justify-center',
  end:    'justify-end',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Divider({
  orientation = 'horizontal',
  variant     = 'base',
  label,
  labelAlign  = 'center',
  className   = '',
}: DividerProps) {
  // ── Vertical ────────────────────────────────────────────────────────────────
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={[
          'inline-block self-stretch w-px shrink-0',
          'border-l',
          BORDER[variant],
          className,
        ].filter(Boolean).join(' ')}
      />
    );
  }

  // ── Horizontal without label ─────────────────────────────────────────────
  if (!label) {
    return (
      <hr
        role="separator"
        aria-orientation="horizontal"
        className={[
          'w-full border-t',
          BORDER[variant],
          className,
        ].filter(Boolean).join(' ')}
      />
    );
  }

  // ── Horizontal with label ────────────────────────────────────────────────
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={[
        'flex items-center gap-3 w-full',
        LABEL_ALIGN[labelAlign],
        className,
      ].join(' ')}
    >
      {labelAlign !== 'start' && (
        <span className={['flex-1 border-t', BORDER[variant]].join(' ')} />
      )}
      <span className="shrink-0 text-xs text-[var(--ds-text-muted)] font-medium px-1 select-none">
        {label}
      </span>
      {labelAlign !== 'end' && (
        <span className={['flex-1 border-t', BORDER[variant]].join(' ')} />
      )}
    </div>
  );
}
