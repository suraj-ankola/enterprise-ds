'use client';

import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  CaretDownIcon,
  CaretRightIcon,
  InfoIcon,
  WarningIcon,
  WarningCircleIcon,
  CalendarBlankIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditActor {
  name: string;
  email: string;
}

export interface AuditEntry {
  id: string | number;
  actor: AuditActor;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  timestamp: string;
  ip?: string;
  severity: AuditSeverity;
}

export interface AuditLogFilters {
  severityFilter: AuditSeverity | '';
  actorFilter: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSeverityChange: (value: AuditSeverity | '') => void;
  onActorChange: (value: string) => void;
}

export interface AuditLogPageProps {
  entries: AuditEntry[];
  loading?: boolean;
  totalCount: number;
  onExport: () => void;
  filters: AuditLogFilters;
}

// ─── Severity config ──────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  AuditSeverity,
  { label: string; dot: string; badge: string; icon: React.ReactNode }
> = {
  info: {
    label: 'Info',
    dot: 'bg-[var(--ds-brand-500)]',
    badge: 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)]',
    icon: <InfoIcon size={13} weight="fill" />,
  },
  warning: {
    label: 'Warning',
    dot: 'bg-[var(--ds-warning-icon)]',
    badge: 'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
    icon: <WarningIcon size={13} weight="fill" />,
  },
  critical: {
    label: 'Critical',
    dot: 'bg-[var(--ds-danger-icon)]',
    badge: 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)]',
    icon: <WarningCircleIcon size={13} weight="fill" />,
  },
};

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--ds-border-base)]">
      <td className="px-4 py-3 w-10">
        <div className="h-2.5 w-2.5 rounded-full bg-[var(--ds-bg-subtle)] animate-pulse mx-auto" />
      </td>
      <td className="px-4 py-3">
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-[var(--ds-bg-subtle)] animate-pulse" />
          <div className="h-2.5 w-36 rounded bg-[var(--ds-bg-subtle)] animate-pulse" />
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-3 w-40 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-24 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-28 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-3 w-20 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
      <td className="px-4 py-3 w-8"><div className="h-4 w-4 rounded bg-[var(--ds-bg-subtle)] animate-pulse" /></td>
    </tr>
  );
}

// ─── Expandable row ───────────────────────────────────────────────────────────

function AuditRow({ entry }: { entry: AuditEntry }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_CONFIG[entry.severity];
  const hasDetails = Boolean(entry.details || entry.resourceId);

  return (
    <>
      <tr
        className={[
          'border-b border-[var(--ds-border-base)] transition-colors',
          hasDetails ? 'cursor-pointer hover:bg-[var(--ds-bg-subtle)]' : 'hover:bg-[var(--ds-bg-subtle)]',
        ].join(' ')}
        onClick={() => hasDetails && setExpanded((v) => !v)}
      >
        {/* Severity dot */}
        <td className="px-4 py-3 w-10">
          <span
            className={['h-2.5 w-2.5 rounded-full block mx-auto', sev.dot].join(' ')}
            aria-label={sev.label}
            title={sev.label}
          />
        </td>

        {/* Actor */}
        <td className="px-4 py-3">
          <p className="text-sm font-medium text-[var(--ds-text-primary)] leading-tight">{entry.actor.name}</p>
          <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">{entry.actor.email}</p>
        </td>

        {/* Action */}
        <td className="px-4 py-3">
          <span className="text-sm text-[var(--ds-text-primary)]">{entry.action}</span>
        </td>

        {/* Resource */}
        <td className="px-4 py-3">
          <span
            className="inline-flex items-center h-5 px-1.5 rounded text-xs font-medium bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-base)] font-mono"
          >
            {entry.resource}
          </span>
        </td>

        {/* Timestamp */}
        <td className="px-4 py-3 text-sm text-[var(--ds-text-muted)] whitespace-nowrap">
          {entry.timestamp}
        </td>

        {/* IP */}
        <td className="px-4 py-3 text-sm text-[var(--ds-text-muted)] font-mono">
          {entry.ip ?? '—'}
        </td>

        {/* Expand toggle */}
        <td className="px-4 py-3 w-8">
          {hasDetails && (
            <CaretRightIcon
              size={14}
              className={[
                'text-[var(--ds-text-muted)] transition-transform duration-150',
                expanded ? 'rotate-90' : '',
              ].join(' ')}
            />
          )}
        </td>
      </tr>

      {/* Expanded details row */}
      {expanded && hasDetails && (
        <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
          <td />
          <td colSpan={6} className="px-4 py-3">
            <div className="flex flex-col gap-1.5">
              {entry.resourceId && (
                <p className="text-xs text-[var(--ds-text-muted)]">
                  <span className="font-medium text-[var(--ds-text-secondary)]">Resource ID:</span>{' '}
                  <span className="font-mono">{entry.resourceId}</span>
                </p>
              )}
              {entry.details && (
                <p className="text-xs text-[var(--ds-text-muted)]">
                  <span className="font-medium text-[var(--ds-text-secondary)]">Details:</span>{' '}
                  {entry.details}
                </p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AuditLogPage({
  entries,
  loading = false,
  totalCount,
  onExport,
  filters,
}: AuditLogPageProps) {
  const {
    severityFilter,
    searchValue,
    onSearchChange,
    onSeverityChange,
  } = filters;

  const severityOptions: { value: AuditSeverity | ''; label: string }[] = [
    { value: '', label: 'All severities' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' },
  ];

  const filtered = entries.filter((e) => {
    const matchSearch =
      !searchValue ||
      e.actor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.actor.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.action.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.resource.toLowerCase().includes(searchValue.toLowerCase());
    const matchSeverity = !severityFilter || e.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="min-h-screen bg-[var(--ds-bg-base)] flex flex-col">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className="bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] sticky top-0 z-[var(--ds-z-sticky)]">
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <ShieldCheckIcon size={22} className="text-[var(--ds-brand-600)] shrink-0" />
            <h1 className="text-xl font-bold text-[var(--ds-text-primary)] leading-tight">
              Audit log
            </h1>
            <span className="inline-flex items-center h-6 px-2 rounded-full text-xs font-semibold bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-base)]">
              {totalCount.toLocaleString()} events
            </span>
          </div>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm font-semibold rounded-lg bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border border-[var(--ds-border-strong)] hover:bg-[var(--ds-bg-subtle)] active:bg-[var(--ds-border-base)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-2"
          >
            <DownloadSimpleIcon size={16} weight="bold" />
            Export CSV
          </button>
        </div>
      </header>

      {/* ── Content ───────────────────────────────────────────────── */}
      <main className="flex-1 px-6 py-6">
        {/* Filter toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
            <MagnifyingGlassIcon
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
            />
            <input
              type="search"
              placeholder="Search actor, action, resource…"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)] hover:border-[var(--ds-border-strong)] focus:outline-none focus:border-[var(--ds-brand-500)] focus:ring-2 focus:ring-[var(--ds-brand-500)]/20 transition-colors"
            />
          </div>

          {/* Severity filter */}
          <div className="relative">
            <select
              value={severityFilter}
              onChange={(e) => onSeverityChange(e.target.value as AuditSeverity | '')}
              className="appearance-none h-9 pl-3 pr-8 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] hover:border-[var(--ds-border-strong)] focus:outline-none focus:border-[var(--ds-brand-500)] focus:ring-2 focus:ring-[var(--ds-brand-500)]/20 transition-colors cursor-pointer"
            >
              {severityOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <CaretDownIcon
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--ds-text-muted)] pointer-events-none"
            />
          </div>

          {/* Date range placeholder */}
          <button
            type="button"
            className="inline-flex items-center gap-2 h-9 px-3 text-sm rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-[var(--ds-text-muted)] hover:border-[var(--ds-border-strong)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          >
            <CalendarBlankIcon size={15} />
            Date range
          </button>
        </div>

        {/* Severity summary chips */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {(['info', 'warning', 'critical'] as AuditSeverity[]).map((sev) => {
            const cfg = SEVERITY_CONFIG[sev];
            const count = entries.filter((e) => e.severity === sev).length;
            return (
              <button
                key={sev}
                type="button"
                onClick={() => onSeverityChange(severityFilter === sev ? '' : sev)}
                className={[
                  'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
                  severityFilter === sev
                    ? cfg.badge + ' border-transparent'
                    : 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] border-[var(--ds-border-base)] hover:border-[var(--ds-border-strong)]',
                ].join(' ')}
              >
                {cfg.icon}
                {cfg.label}
                <span className="font-semibold">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Table card */}
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden shadow-[var(--ds-shadow-sm)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
                  <th className="px-4 py-3 w-10" aria-label="Severity" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Actor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider">
                    IP address
                  </th>
                  <th className="px-4 py-3 w-8" />
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--ds-border-base)]">
                {loading
                  ? Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
                  : filtered.length === 0
                  ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <ShieldCheckIcon size={32} className="text-[var(--ds-text-muted)]" />
                          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">No audit events found</p>
                          <p className="text-xs text-[var(--ds-text-muted)]">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )
                  : filtered.map((entry) => (
                    <AuditRow key={entry.id} entry={entry} />
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {!loading && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
              <p className="text-xs text-[var(--ds-text-muted)]">
                Showing {filtered.length} of {totalCount.toLocaleString()} events
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
