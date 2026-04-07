'use client';
import React, { useState } from 'react';
import {
  ChartBarIcon,
  DownloadSimpleIcon,
  ClockIcon,
  CircleNotchIcon,
  CalendarIcon,
  FileTextIcon,
  FileCsvIcon,
  FilePdfIcon,
  FileXlsIcon,
  PlusIcon,
  FolderIcon,
  ArrowClockwiseIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReportStatus = 'ready' | 'generating' | 'error';
export type ReportFormat = 'pdf' | 'csv' | 'xlsx';

export interface Report {
  id:             string;
  title:          string;
  description:    string;
  category:       string;
  lastGenerated?: string;
  schedule?:      string;
  status:         ReportStatus;
  format?:        ReportFormat;
}

export interface ReportsPageProps {
  reports:     Report[];
  onGenerate:  (id: string) => void;
  onDownload:  (id: string) => void;
  onSchedule:  (id: string) => void;
  loading:     boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FORMAT_META: Record<ReportFormat, { label: string; icon: React.ReactNode; bg: string; text: string }> = {
  pdf: {
    label: 'PDF',
    icon:  <FilePdfIcon size={12} />,
    bg:    'bg-[var(--ds-danger-bg)]',
    text:  'text-[var(--ds-danger-text)]',
  },
  csv: {
    label: 'CSV',
    icon:  <FileCsvIcon size={12} />,
    bg:    'bg-[var(--ds-success-bg)]',
    text:  'text-[var(--ds-success-text)]',
  },
  xlsx: {
    label: 'XLSX',
    icon:  <FileXlsIcon size={12} />,
    bg:    'bg-[var(--ds-info-bg)]',
    text:  'text-[var(--ds-info-text)]',
  },
};

const STATUS_META: Record<ReportStatus, { label: string; icon: React.ReactNode; text: string }> = {
  ready: {
    label: 'Ready',
    icon:  <CheckCircleIcon size={13} weight="fill" />,
    text:  'text-[var(--ds-success-text)]',
  },
  generating: {
    label: 'Generating…',
    icon:  <CircleNotchIcon size={13} className="animate-spin" />,
    text:  'text-[var(--ds-text-muted)]',
  },
  error: {
    label: 'Error',
    icon:  <WarningCircleIcon size={13} weight="fill" />,
    text:  'text-[var(--ds-danger-text)]',
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] p-5 animate-pulse space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="h-3.5 w-2/3 rounded bg-[var(--ds-bg-subtle)]" />
        <div className="h-4 w-12 rounded bg-[var(--ds-bg-subtle)]" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-full rounded bg-[var(--ds-bg-subtle)]" />
        <div className="h-2.5 w-4/5 rounded bg-[var(--ds-bg-subtle)]" />
      </div>
      <div className="flex items-center gap-2 pt-1">
        <div className="h-7 w-24 rounded-lg bg-[var(--ds-bg-subtle)]" />
        <div className="h-7 w-24 rounded-lg bg-[var(--ds-bg-subtle)]" />
      </div>
    </div>
  );
}

// ─── Report Card ──────────────────────────────────────────────────────────────

interface ReportCardProps {
  report:     Report;
  onGenerate: (id: string) => void;
  onDownload: (id: string) => void;
  onSchedule: (id: string) => void;
}

function ReportCard({ report, onGenerate, onDownload, onSchedule }: ReportCardProps) {
  const statusMeta = STATUS_META[report.status];
  const formatMeta = report.format ? FORMAT_META[report.format] : null;

  return (
    <div className="flex flex-col rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-subtle)] transition-colors p-5 gap-3">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] flex items-center justify-center shrink-0 text-[var(--ds-text-muted)]">
          <ChartBarIcon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)] leading-snug">
            {report.title}
          </p>
          <p className="text-xs text-[var(--ds-text-secondary)] mt-0.5 leading-relaxed line-clamp-2">
            {report.description}
          </p>
        </div>
      </div>

      {/* Metadata row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Status */}
        <span className={['flex items-center gap-1 text-[11px] font-medium', statusMeta.text].join(' ')}>
          {statusMeta.icon}
          {statusMeta.label}
        </span>

        {/* Format badge */}
        {formatMeta && (
          <span className={['flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-md border border-[var(--ds-border-base)]', formatMeta.bg, formatMeta.text].join(' ')}>
            {formatMeta.icon}
            {formatMeta.label}
          </span>
        )}

        {/* Last generated */}
        {report.lastGenerated && (
          <span className="flex items-center gap-1 text-[11px] text-[var(--ds-text-muted)]">
            <ClockIcon size={11} />
            {report.lastGenerated}
          </span>
        )}

        {/* Schedule */}
        {report.schedule && (
          <span className="flex items-center gap-1 text-[11px] text-[var(--ds-text-muted)]">
            <CalendarIcon size={11} />
            {report.schedule}
          </span>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 pt-1 mt-auto">
        <button
          type="button"
          disabled={report.status === 'generating'}
          onClick={() => onGenerate(report.id)}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors',
            report.status === 'generating'
              ? 'opacity-50 cursor-not-allowed bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)] border-[var(--ds-border-base)]'
              : 'bg-[var(--ds-bg-surface)] text-[var(--ds-text-primary)] border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
          ].join(' ')}
        >
          {report.status === 'generating'
            ? <CircleNotchIcon size={13} className="animate-spin" />
            : <ArrowClockwiseIcon size={13} />
          }
          {report.status === 'generating' ? 'Generating…' : 'Generate'}
        </button>

        {report.status === 'ready' && (
          <button
            type="button"
            onClick={() => onDownload(report.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--ds-brand-600)] bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] hover:border-[var(--ds-brand-700)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          >
            <DownloadSimpleIcon size={13} />
            Download
          </button>
        )}

        <button
          type="button"
          onClick={() => onSchedule(report.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-raised)] transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
        >
          <CalendarIcon size={13} />
          Schedule
        </button>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ category }: { category: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="h-12 w-12 rounded-full bg-[var(--ds-bg-subtle)] flex items-center justify-center mb-4 text-[var(--ds-text-muted)]">
        <FileTextIcon size={24} />
      </div>
      <p className="text-sm font-medium text-[var(--ds-text-primary)]">
        No reports in "{category}"
      </p>
      <p className="text-xs text-[var(--ds-text-muted)] mt-1">
        Reports assigned to this category will appear here.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ReportsPage({
  reports,
  onGenerate,
  onDownload,
  onSchedule,
  loading,
}: ReportsPageProps) {
  // Derive unique categories
  const categories = Array.from(new Set(reports.map(r => r.category)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? 'All');
  const allCategory = 'All';
  const navCategories = [allCategory, ...categories];

  // Resolve effective active category (in case categories change)
  const effectiveCategory = navCategories.includes(activeCategory) ? activeCategory : allCategory;

  const filtered = effectiveCategory === allCategory
    ? reports
    : reports.filter(r => r.category === effectiveCategory);

  return (
    <div className="flex h-full min-h-screen bg-[var(--ds-bg-subtle)]">
      {/* ── Sidebar ── */}
      <aside className="w-52 shrink-0 bg-[var(--ds-bg-surface)] border-r border-[var(--ds-border-base)] flex flex-col">
        <div className="px-4 py-4 border-b border-[var(--ds-border-base)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">
            Categories
          </p>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {navCategories.map(cat => {
            const isActive = effectiveCategory === cat;
            const count    = cat === allCategory ? reports.length : reports.filter(r => r.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={[
                  'w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-inset',
                  isActive
                    ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] font-semibold'
                    : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
                ].join(' ')}
              >
                <span className="flex items-center gap-2 min-w-0 truncate">
                  <FolderIcon size={14} className={isActive ? 'text-[var(--ds-brand-600)]' : 'text-[var(--ds-text-muted)]'} />
                  <span className="truncate">{cat}</span>
                </span>
                <span className={[
                  'shrink-0 text-[11px] px-1.5 py-0.5 rounded-md',
                  isActive
                    ? 'bg-[var(--ds-brand-600)] text-white'
                    : 'bg-[var(--ds-bg-raised)] text-[var(--ds-text-muted)]',
                ].join(' ')}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page header */}
        <header className="flex items-center justify-between px-6 py-4 bg-[var(--ds-bg-surface)] border-b border-[var(--ds-border-base)] shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">Reports</h1>
            <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">
              Generate, download and schedule your organisation's reports.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          >
            <PlusIcon size={15} />
            Schedule new report
          </button>
        </header>

        {/* Grid */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.length === 0 ? (
                <EmptyState category={effectiveCategory} />
              ) : (
                filtered.map(report => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onGenerate={onGenerate}
                    onDownload={onDownload}
                    onSchedule={onSchedule}
                  />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
