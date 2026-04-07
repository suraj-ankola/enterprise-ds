'use client';
import React from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ListPageProps {
  title:          string;
  subtitle?:      string;
  /** Total count shown in header */
  totalCount?:    number;
  /** Primary CTA, e.g. "Add vendor" */
  primaryAction?: React.ReactNode;
  /** Secondary header actions */
  actions?:       React.ReactNode;
  /** Search input value */
  searchValue?:   string;
  onSearchChange?:(v: string) => void;
  searchPlaceholder?: string;
  /** Filter chips / filter bar below the search row */
  filters?:       React.ReactNode;
  /** Sort control */
  sortControl?:   React.ReactNode;
  /** Main data area — table, data grid, or card grid */
  children:       React.ReactNode;
  /** Shown when children area is empty */
  emptyState?:    React.ReactNode;
  /** Pagination */
  pagination?:    React.ReactNode;
  /** Bulk actions bar — shown above table when rows are selected */
  bulkActionsBar?: React.ReactNode;
  loading?:       boolean;
  className?:     string;
}

// ─── ListPage ─────────────────────────────────────────────────────────────────

export function ListPage({
  title,
  subtitle,
  totalCount,
  primaryAction,
  actions,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filters,
  sortControl,
  children,
  emptyState,
  pagination,
  bulkActionsBar,
  loading = false,
  className = '',
}: ListPageProps) {
  return (
    <div className={['min-h-screen bg-[var(--ds-bg-base)] flex flex-col', className].join(' ')}>
      {/* Page header */}
      <div className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] px-6 py-5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h1>
                {totalCount !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--ds-bg-subtle)] border border-[var(--ds-border-base)] text-[var(--ds-text-muted)] font-medium">
                    {totalCount.toLocaleString()}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-sm text-[var(--ds-text-muted)] mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {actions}
              {primaryAction}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] px-6 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3 flex-wrap">
          {/* Search */}
          {onSearchChange && (
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <MagnifyingGlassIcon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
              />
              <input
                type="search"
                value={searchValue ?? ''}
                onChange={e => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-8 w-full pl-8 pr-3 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
              />
            </div>
          )}
          {/* Filters */}
          {filters && <div className="flex items-center gap-2 flex-wrap">{filters}</div>}
          {/* Sort */}
          {sortControl && <div className="ml-auto">{sortControl}</div>}
        </div>
      </div>

      {/* Bulk actions */}
      {bulkActionsBar}

      {/* Content */}
      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-4">
        {loading ? (
          <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-[var(--ds-border-base)] last:border-0">
                <div className="h-4 w-4 rounded bg-[var(--ds-bg-subtle)]" />
                <div className="h-4 flex-1 rounded bg-[var(--ds-bg-subtle)]" />
                <div className="h-4 w-24 rounded bg-[var(--ds-bg-subtle)]" />
                <div className="h-4 w-16 rounded bg-[var(--ds-bg-subtle)]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
            {children}
          </div>
        )}

        {/* Empty state overlay */}
        {!loading && emptyState}

        {/* Pagination */}
        {pagination && (
          <div className="mt-4 flex justify-end">{pagination}</div>
        )}
      </div>
    </div>
  );
}
