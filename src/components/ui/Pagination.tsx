import React from 'react';
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PaginationSize = 'sm' | 'md';

export interface PaginationProps {
  /** Current page (1-indexed) */
  page:           number;
  /** Total number of pages */
  totalPages:     number;
  onChange:       (page: number) => void;
  /** How many page numbers to show around the current page */
  siblingCount?:  number;
  size?:          PaginationSize;
  /** Show total items count label */
  totalItems?:    number;
  pageSize?:      number;
  className?:     string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const BTN_SIZE: Record<PaginationSize, string> = {
  sm: 'h-7  w-7  text-xs',
  md: 'h-8  w-8  text-sm',
};

// ─── Page range calculation ───────────────────────────────────────────────────

function getRange(page: number, total: number, siblings: number): (number | '…')[] {
  const SHOW_ALL = siblings * 2 + 5; // 1 + … + siblings + current + siblings + … + last
  if (total <= SHOW_ALL) return Array.from({ length: total }, (_, i) => i + 1);

  const leftSibling  = Math.max(page - siblings, 2);
  const rightSibling = Math.min(page + siblings, total - 1);

  const showLeftDots  = leftSibling  > 2;
  const showRightDots = rightSibling < total - 1;

  const range: (number | '…')[] = [1];

  if (showLeftDots)  range.push('…');
  else for (let i = 2; i < leftSibling; i++) range.push(i);

  for (let i = leftSibling; i <= rightSibling; i++) range.push(i);

  if (showRightDots) range.push('…');
  else for (let i = rightSibling + 1; i < total; i++) range.push(i);

  range.push(total);
  return range;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  size         = 'md',
  totalItems,
  pageSize,
  className    = '',
}: PaginationProps) {
  const range = getRange(page, totalPages, siblingCount);
  const btnBase = [
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
    BTN_SIZE[size],
  ].join(' ');

  function PageBtn({ p }: { p: number }) {
    const isActive = p === page;
    return (
      <button
        type="button"
        aria-label={`Page ${p}`}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => !isActive && onChange(p)}
        className={[
          btnBase,
          isActive
            ? 'bg-[var(--ds-brand-600)] text-white cursor-default'
            : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] cursor-pointer',
        ].join(' ')}
      >
        {p}
      </button>
    );
  }

  // Range info
  const from = totalItems !== undefined && pageSize ? (page - 1) * pageSize + 1 : undefined;
  const to   = totalItems !== undefined && pageSize ? Math.min(page * pageSize, totalItems) : undefined;

  return (
    <div className={['flex items-center gap-2 flex-wrap', className].filter(Boolean).join(' ')}>
      {/* Range info */}
      {totalItems !== undefined && from !== undefined && to !== undefined && (
        <span className="text-xs text-[var(--ds-text-muted)] mr-2">
          {from}–{to} of {totalItems}
        </span>
      )}

      <nav aria-label="Pagination" className="flex items-center gap-1">
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className={[
            btnBase,
            page <= 1
              ? 'opacity-40 cursor-not-allowed text-[var(--ds-text-muted)]'
              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] cursor-pointer',
          ].join(' ')}
        >
          <CaretLeftIcon size={14} weight="bold" />
        </button>

        {/* Page numbers */}
        {range.map((r, i) =>
          r === '…' ? (
            <span key={`ellipsis-${i}`} className={['inline-flex items-center justify-center text-[var(--ds-text-muted)]', BTN_SIZE[size]].join(' ')}>
              <DotsThreeIcon size={16} />
            </span>
          ) : (
            <PageBtn key={r} p={r as number} />
          )
        )}

        {/* Next */}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className={[
            btnBase,
            page >= totalPages
              ? 'opacity-40 cursor-not-allowed text-[var(--ds-text-muted)]'
              : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] cursor-pointer',
          ].join(' ')}
        >
          <CaretRightIcon size={14} weight="bold" />
        </button>
      </nav>
    </div>
  );
}
