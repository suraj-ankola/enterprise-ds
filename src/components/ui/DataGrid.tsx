'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowsDownUpIcon,
  CheckIcon,
  MinusIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react';
import { Badge } from './Badge';
import { EmptyState } from './EmptyState';
import { Skeleton } from './Skeleton';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';
export type ColumnAlign   = 'left' | 'center' | 'right';
export type ColumnType    = 'text' | 'number' | 'badge' | 'date' | 'custom';

export interface DataGridColumn<T> {
  /** Unique column key — also the default sort field if `sortKey` omitted */
  key:          string;
  header:       string;
  /** Which field on the row object to sort by. Defaults to `key`. */
  sortKey?:     string;
  sortable?:    boolean;
  align?:       ColumnAlign;
  /** Column min-width — e.g. '120px' */
  minWidth?:    string;
  /** Column max-width — e.g. '200px' */
  maxWidth?:    string;
  /** Truncate cell text with ellipsis */
  truncate?:    boolean;
  /** Custom cell renderer — receives the row and the raw value */
  render?:      (row: T, value: unknown) => React.ReactNode;
}

export interface DataGridProps<T extends { id: string | number }> {
  columns:      DataGridColumn<T>[];
  rows:         T[];
  /** Selection */
  selectable?:  boolean;
  selectedIds?: Set<string | number>;
  onSelectionChange?: (ids: Set<string | number>) => void;
  /** Sorting */
  sortKey?:     string;
  sortDir?:     SortDirection;
  onSort?:      (key: string, dir: SortDirection) => void;
  /** Pagination */
  pageSize?:    number;
  /** If provided, DataGrid manages pagination internally */
  pagination?:  boolean;
  /** Row click */
  onRowClick?:  (row: T) => void;
  /** Loading skeleton */
  loading?:     boolean;
  loadingRows?: number;
  /** Empty state */
  emptyTitle?:  string;
  emptyDesc?:   string;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Max height before vertical scroll */
  maxHeight?:   number | string;
  className?:   string;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir?: SortDirection }) {
  if (!active) return <ArrowsDownUpIcon size={12} className="text-[var(--ds-text-muted)] opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden />;
  if (dir === 'asc')  return <ArrowUpIcon   size={12} className="text-[var(--ds-brand-600)]" aria-hidden />;
  return <ArrowDownIcon size={12} className="text-[var(--ds-brand-600)]" aria-hidden />;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function GridCheckbox({
  checked, indeterminate, onChange, label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (next: boolean) => void;
  label:   string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      aria-label={label}
      className={[
        'h-4 w-4 rounded border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)]',
        'checked:bg-[var(--ds-brand-600)] checked:border-[var(--ds-brand-600)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
        'transition-colors cursor-pointer',
      ].join(' ')}
    />
  );
}

// ─── Loading skeleton row ─────────────────────────────────────────────────────

function SkeletonRow({ cols, selectable }: { cols: number; selectable: boolean }) {
  return (
    <tr className="border-b border-[var(--ds-border-base)]">
      {selectable && (
        <td className="px-4 py-3 w-10">
          <Skeleton variant="rect" width={16} height={16} />
        </td>
      )}
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton variant="text" width={`${60 + (i % 3) * 20}%`} />
        </td>
      ))}
    </tr>
  );
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────

export function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  selectable    = false,
  selectedIds   = new Set(),
  onSelectionChange,
  sortKey: externalSortKey,
  sortDir: externalSortDir,
  onSort,
  pageSize      = 20,
  pagination    = false,
  onRowClick,
  loading       = false,
  loadingRows   = 5,
  emptyTitle    = 'No data',
  emptyDesc,
  stickyHeader  = false,
  maxHeight,
  className     = '',
}: DataGridProps<T>) {
  // Internal sort state (used when onSort not provided)
  const [intSortKey, setIntSortKey] = useState<string | undefined>(externalSortKey);
  const [intSortDir, setIntSortDir] = useState<SortDirection>(externalSortDir ?? 'asc');

  // Internal page
  const [page, setPage] = useState(0);

  const sortKey = onSort ? externalSortKey : intSortKey;
  const sortDir = onSort ? (externalSortDir ?? 'asc') : intSortDir;

  // Sort rows internally when no external handler
  const sortedRows = useMemo(() => {
    if (onSort || !sortKey) return rows;
    const col = columns.find(c => (c.sortKey ?? c.key) === sortKey);
    if (!col) return rows;
    const field = col.sortKey ?? col.key;
    return [...rows].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[field];
      const bVal = (b as Record<string, unknown>)[field];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortKey, sortDir, columns, onSort]);

  // Paginate
  const pagedRows = useMemo(() => {
    if (!pagination) return sortedRows;
    return sortedRows.slice(page * pageSize, (page + 1) * pageSize);
  }, [sortedRows, pagination, page, pageSize]);

  const totalPages = Math.ceil(rows.length / pageSize);

  const handleSort = useCallback((key: string) => {
    const col = columns.find(c => c.key === key);
    const sk = col?.sortKey ?? key;
    if (onSort) {
      onSort(sk, sortKey === sk && sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      const next: SortDirection = intSortKey === sk && intSortDir === 'asc' ? 'desc' : 'asc';
      setIntSortKey(sk);
      setIntSortDir(next);
    }
    setPage(0);
  }, [columns, onSort, sortKey, sortDir, intSortKey, intSortDir]);

  const allIds     = rows.map(r => r.id);
  const allChecked = allIds.length > 0 && allIds.every(id => selectedIds.has(id));
  const someChecked = !allChecked && allIds.some(id => selectedIds.has(id));

  function toggleAll(checked: boolean) {
    if (!onSelectionChange) return;
    onSelectionChange(checked ? new Set(allIds) : new Set());
  }

  function toggleRow(id: string | number, checked: boolean) {
    if (!onSelectionChange) return;
    const next = new Set(selectedIds);
    checked ? next.add(id) : next.delete(id);
    onSelectionChange(next);
  }

  const scrollStyle: React.CSSProperties = maxHeight
    ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight, overflowY: 'auto' }
    : {};

  const ALIGN: Record<ColumnAlign, string> = {
    left:   'text-left',
    center: 'text-center',
    right:  'text-right',
  };

  return (
    <div
      className={[
        'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden',
        className,
      ].join(' ')}
    >
      <div style={scrollStyle} className="overflow-x-auto">
        <table
          className="w-full border-collapse text-sm"
          role="grid"
          aria-rowcount={rows.length}
        >
          {/* ── Head ─────────────────────────────────────────────── */}
          <thead>
            <tr className={[
              'border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]',
              stickyHeader ? 'sticky top-0 z-10' : '',
            ].join(' ')}>
              {selectable && (
                <th className="px-4 py-3 w-10" aria-label="Select all">
                  <GridCheckbox
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={toggleAll}
                    label="Select all rows"
                  />
                </th>
              )}
              {columns.map(col => (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={sortKey === (col.sortKey ?? col.key)
                    ? (sortDir === 'asc' ? 'ascending' : 'descending')
                    : col.sortable ? 'none' : undefined
                  }
                  style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                  className={[
                    'px-4 py-3 font-semibold text-xs text-[var(--ds-text-muted)] uppercase tracking-wide whitespace-nowrap',
                    ALIGN[col.align ?? 'left'],
                    col.sortable
                      ? 'cursor-pointer select-none hover:text-[var(--ds-text-primary)] transition-colors group'
                      : '',
                  ].join(' ')}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <SortIcon
                        active={sortKey === (col.sortKey ?? col.key)}
                        dir={sortDir}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ─────────────────────────────────────────────── */}
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} selectable={selectable} />
              ))
            ) : pagedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <EmptyState title={emptyTitle} description={emptyDesc} size="sm" className="py-16" />
                </td>
              </tr>
            ) : (
              pagedRows.map((row, rowIdx) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <tr
                    key={row.id}
                    aria-rowindex={rowIdx + 1}
                    aria-selected={selectable ? isSelected : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={[
                      'border-b border-[var(--ds-border-base)] last:border-0',
                      'transition-colors duration-[var(--ds-duration-fast)]',
                      isSelected ? 'bg-[var(--ds-brand-100)]' : 'hover:bg-[var(--ds-bg-subtle)]',
                      onRowClick ? 'cursor-pointer' : '',
                    ].join(' ')}
                  >
                    {selectable && (
                      <td className="px-4 py-3 w-10" onClick={e => e.stopPropagation()}>
                        <GridCheckbox
                          checked={isSelected}
                          onChange={checked => toggleRow(row.id, checked)}
                          label={`Select row ${rowIdx + 1}`}
                        />
                      </td>
                    )}
                    {columns.map(col => {
                      const rawVal = (row as Record<string, unknown>)[col.key];
                      return (
                        <td
                          key={col.key}
                          style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                          className={[
                            'px-4 py-3 text-[var(--ds-text-secondary)]',
                            ALIGN[col.align ?? 'left'],
                            col.truncate ? 'truncate max-w-[200px]' : '',
                          ].join(' ')}
                        >
                          {col.render
                            ? col.render(row, rawVal)
                            : String(rawVal ?? '—')
                          }
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination footer ─────────────────────────────────────── */}
      {pagination && !loading && rows.length > 0 && (
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
          <p className="text-xs text-[var(--ds-text-muted)]">
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, rows.length)} of {rows.length} rows
            {selectedIds.size > 0 && ` · ${selectedIds.size} selected`}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              aria-label="Previous page"
              className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--ds-border-base)] text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <CaretLeftIcon size={12} weight="bold" />
            </button>
            <span className="text-xs text-[var(--ds-text-secondary)] px-2">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              aria-label="Next page"
              className="h-7 w-7 flex items-center justify-center rounded-md border border-[var(--ds-border-base)] text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <CaretRightIcon size={12} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Re-export Badge for stories convenience ──────────────────────────────────
export { Badge };

// ─── Helper: build a badge cell renderer ─────────────────────────────────────

type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export function badgeCell<T>(
  map: Record<string, BadgeVariant>,
  fallback: BadgeVariant = 'neutral',
) {
  return (_row: T, value: unknown) => (
    <Badge variant={map[String(value)] ?? fallback} size="sm">
      {String(value)}
    </Badge>
  );
}

export function numberCell<T>(
  formatter?: Intl.NumberFormat | ((v: number) => string),
) {
  return (_row: T, value: unknown) => {
    const num = Number(value);
    if (isNaN(num)) return <span className="text-[var(--ds-text-muted)]">—</span>;
    const formatted = formatter
      ? typeof formatter === 'function'
        ? formatter(num)
        : formatter.format(num)
      : String(num);
    return <span className="tabular-nums">{formatted}</span>;
  };
}
