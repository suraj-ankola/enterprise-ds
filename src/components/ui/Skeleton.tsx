import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SkeletonProps {
  /** Visual shape */
  variant?: 'text' | 'rect' | 'circle';
  width?:   string | number;
  height?:  string | number;
  /** Number of text lines (only for variant="text") */
  lines?:   number;
  className?: string;
}

// ─── Base pulse class ─────────────────────────────────────────────────────────

const PULSE = 'animate-pulse rounded bg-[var(--ds-bg-subtle)]';

// ─── Component ────────────────────────────────────────────────────────────────

export function Skeleton({
  variant   = 'rect',
  width,
  height,
  lines     = 3,
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width:  width  !== undefined ? (typeof width  === 'number' ? `${width}px`  : width)  : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (variant === 'circle') {
    return (
      <span
        aria-hidden="true"
        className={[PULSE, 'rounded-full block', className].filter(Boolean).join(' ')}
        style={{ width: style.width ?? '40px', height: style.height ?? style.width ?? '40px' }}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div aria-hidden="true" className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={[PULSE, 'block h-4 rounded-md'].join(' ')}
            style={{ width: i === lines - 1 && lines > 1 ? '60%' : (style.width ?? '100%') }}
          />
        ))}
      </div>
    );
  }

  // rect (default)
  return (
    <span
      aria-hidden="true"
      className={[PULSE, 'block rounded-lg', className].filter(Boolean).join(' ')}
      style={{ width: style.width ?? '100%', height: style.height ?? '16px' }}
    />
  );
}

// ─── SkeletonCard ─────────────────────────────────────────────────────────────
// Pre-composed card skeleton for list/grid loading states

export interface SkeletonCardProps {
  /** Show avatar circle at top */
  avatar?:    boolean;
  lines?:     number;
  className?: string;
}

export function SkeletonCard({ avatar = false, lines = 3, className = '' }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        'rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-4 flex flex-col gap-4',
        className,
      ].filter(Boolean).join(' ')}
    >
      {avatar && (
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" width={36} />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton variant="rect" height={12} width="60%" />
            <Skeleton variant="rect" height={10} width="40%" />
          </div>
        </div>
      )}
      <Skeleton variant="text" lines={lines} />
    </div>
  );
}

// ─── SkeletonTable ────────────────────────────────────────────────────────────
// Pre-composed table row skeleton

export interface SkeletonTableProps {
  rows?:    number;
  cols?:    number;
  className?: string;
}

export function SkeletonTable({ rows = 5, cols = 4, className = '' }: SkeletonTableProps) {
  return (
    <div
      aria-hidden="true"
      className={['rounded-xl border border-[var(--ds-border-base)] overflow-hidden', className].filter(Boolean).join(' ')}
    >
      {/* Header */}
      <div className="flex gap-4 px-4 py-3 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} variant="rect" height={10} width={i === 0 ? '25%' : '15%'} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex gap-4 px-4 py-3 border-b border-[var(--ds-border-base)] last:border-b-0 bg-[var(--ds-bg-surface)]"
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} variant="rect" height={12} width={c === 0 ? '25%' : '15%'} />
          ))}
        </div>
      ))}
    </div>
  );
}
