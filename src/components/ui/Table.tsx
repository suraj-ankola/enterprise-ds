import React from 'react';
import { CaretUpIcon, CaretDownIcon } from '@phosphor-icons/react';
import { Checkbox } from './Checkbox';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableColumn<T> {
  key:        string;
  header:     React.ReactNode;
  cell:       (row: T, index: number) => React.ReactNode;
  sortable?:  boolean;
  width?:     string;
  align?:     'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns:            TableColumn<T>[];
  data:               T[];
  rowKey:             (row: T) => string;
  /** Enable row selection with checkboxes */
  selectable?:        boolean;
  selectedKeys?:      Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  /** Controlled sort — column key currently sorted */
  sortKey?:           string;
  sortDir?:           'asc' | 'desc';
  onSort?:            (key: string, dir: 'asc' | 'desc') => void;
  loading?:           boolean;
  /** Number of skeleton rows shown during loading */
  loadingRows?:       number;
  emptyState?:        React.ReactNode;
  onRowClick?:        (row: T) => void;
  className?:         string;
}

// ─── Alignment ────────────────────────────────────────────────────────────────

const ALIGN: Record<'left' | 'center' | 'right', string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Table<T>({
  columns,
  data,
  rowKey,
  selectable         = false,
  selectedKeys,
  onSelectionChange,
  sortKey,
  sortDir,
  onSort,
  loading            = false,
  loadingRows        = 5,
  emptyState,
  onRowClick,
  className          = '',
}: TableProps<T>) {

  // ── Selection helpers ──────────────────────────────────────────────────────
  const allKeys      = data.map(rowKey);
  const selectedCount = selectedKeys
    ? allKeys.filter(k => selectedKeys.has(k)).length
    : 0;
  const allSelected  = selectedCount === data.length && data.length > 0;
  const someSelected = selectedCount > 0 && !allSelected;

  function handleSelectAll() {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? new Set() : new Set(allKeys));
  }

  function handleSelectRow(key: string) {
    if (!onSelectionChange || !selectedKeys) return;
    const next = new Set(selectedKeys);
    next.has(key) ? next.delete(key) : next.add(key);
    onSelectionChange(next);
  }

  // ── Sort helpers ───────────────────────────────────────────────────────────
  function handleSortClick(col: TableColumn<T>) {
    if (!col.sortable || !onSort) return;
    if (sortKey === col.key) {
      onSort(col.key, sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(col.key, 'asc');
    }
  }

  const totalCols = columns.length + (selectable ? 1 : 0);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={['w-full overflow-x-auto rounded-lg border border-[var(--ds-border-base)]', className].filter(Boolean).join(' ')}>
      <table className="w-full border-collapse text-sm">

        {/* Head */}
        <thead>
          <tr className="bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">

            {selectable && (
              <th className="w-10 px-3 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              </th>
            )}

            {columns.map(col => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={[
                  'px-4 py-3 font-semibold text-xs uppercase tracking-wide text-[var(--ds-text-muted)]',
                  ALIGN[col.align ?? 'left'],
                  col.sortable && onSort ? 'cursor-pointer select-none hover:text-[var(--ds-text-primary)] transition-colors' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSortClick(col)}
                aria-sort={
                  sortKey === col.key
                    ? sortDir === 'asc' ? 'ascending' : 'descending'
                    : col.sortable ? 'none' : undefined
                }
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-[var(--ds-border-base)]">

          {loading ? (
            Array.from({ length: loadingRows }).map((_, i) => (
              <tr key={i} className="bg-[var(--ds-bg-surface)]">
                {selectable && <td className="px-3 py-3"><SkeletonCell width="w-4" /></td>}
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3">
                    <SkeletonCell />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr className="bg-[var(--ds-bg-surface)]">
              <td colSpan={totalCols} className="px-4 py-12 text-center text-sm text-[var(--ds-text-muted)]">
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const key        = rowKey(row);
              const isSelected = selectable && (selectedKeys?.has(key) ?? false);
              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  className={[
                    'transition-colors',
                    isSelected
                      ? 'bg-[var(--ds-brand-100)]'
                      : 'bg-[var(--ds-bg-surface)]',
                    onRowClick || selectable
                      ? 'cursor-pointer hover:bg-[var(--ds-bg-subtle)]'
                      : 'hover:bg-[var(--ds-bg-subtle)]',
                  ].filter(Boolean).join(' ')}
                >
                  {selectable && (
                    <td
                      className="w-10 px-3 py-3"
                      onClick={e => { e.stopPropagation(); handleSelectRow(key); }}
                    >
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectRow(key)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={[
                        'px-4 py-3 text-[var(--ds-text-primary)]',
                        ALIGN[col.align ?? 'left'],
                      ].join(' ')}
                    >
                      {col.cell(row, i)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir?: 'asc' | 'desc' }) {
  if (!active) {
    return (
      <span className="inline-flex flex-col opacity-40" aria-hidden="true">
        <CaretUpIcon size={8} />
        <CaretDownIcon size={8} className="-mt-px" />
      </span>
    );
  }
  return dir === 'asc'
    ? <CaretUpIcon   size={12} className="text-[var(--ds-brand-600)]" aria-hidden="true" />
    : <CaretDownIcon size={12} className="text-[var(--ds-brand-600)]" aria-hidden="true" />;
}

// ─── Skeleton cell ────────────────────────────────────────────────────────────

function SkeletonCell({ width = 'w-3/4' }: { width?: string }) {
  return (
    <div className={['h-4 rounded bg-[var(--ds-bg-subtle)] animate-pulse', width].join(' ')} />
  );
}
