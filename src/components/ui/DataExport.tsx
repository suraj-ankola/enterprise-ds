'use client';
import React, { useState } from 'react';
import { DownloadSimpleIcon, FileCsvIcon, FileXlsIcon, FileJsIcon, CheckCircleIcon, CircleNotchIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ExportFormat = 'csv' | 'xlsx' | 'json';

export interface ExportColumn {
  key:    string;
  label:  string;
}

export interface DataExportProps {
  /** Display name for what is being exported, e.g. "vendors" */
  entityName:   string;
  /** Total rows available for export */
  totalRows:    number;
  columns:      ExportColumn[];
  /** Called with selected format and column keys. Return a Promise to show loading state. */
  onExport:     (format: ExportFormat, columns: string[]) => Promise<void> | void;
  defaultFormat?: ExportFormat;
  className?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const FORMAT_META: Record<ExportFormat, { label: string; icon: React.ReactNode; description: string }> = {
  csv:  { label: 'CSV',  icon: <FileCsvIcon  size={20} />, description: 'Comma-separated values, compatible with Excel and Google Sheets' },
  xlsx: { label: 'Excel', icon: <FileXlsIcon size={20} />, description: 'Native Excel format with formatting preserved' },
  json: { label: 'JSON', icon: <FileJsIcon  size={20} />, description: 'Machine-readable format for API integrations' },
};

export function DataExport({
  entityName,
  totalRows,
  columns,
  onExport,
  defaultFormat = 'csv',
  className = '',
}: DataExportProps) {
  const [format,        setFormat]        = useState<ExportFormat>(defaultFormat);
  const [selectedCols,  setSelectedCols]  = useState<string[]>(columns.map(c => c.key));
  const [loading,       setLoading]       = useState(false);
  const [done,          setDone]          = useState(false);

  function toggleCol(key: string) {
    setSelectedCols(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  }

  async function handleExport() {
    if (!selectedCols.length) return;
    setLoading(true);
    setDone(false);
    try {
      await onExport(format, selectedCols);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } finally {
      setLoading(false);
    }
  }

  const allSelected  = selectedCols.length === columns.length;
  const noneSelected = selectedCols.length === 0;

  return (
    <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden', className].join(' ')}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--ds-border-base)]">
        <div className="flex items-center gap-2">
          <DownloadSimpleIcon size={18} className="text-[var(--ds-brand-600)]" />
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Export {entityName}</h3>
        </div>
        <p className="mt-0.5 text-xs text-[var(--ds-text-muted)]">{totalRows.toLocaleString()} records available</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Format picker */}
        <div>
          <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-2">Format</p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(FORMAT_META) as ExportFormat[]).map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={[
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-colors',
                  format === f
                    ? 'border-[var(--ds-brand-500)] bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)]'
                    : 'border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)]',
                ].join(' ')}
              >
                {FORMAT_META[f].icon}
                <span className="text-xs font-semibold">{FORMAT_META[f].label}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-[var(--ds-text-muted)]">{FORMAT_META[format].description}</p>
        </div>

        {/* Column selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Columns</p>
            <button
              type="button"
              onClick={() => setSelectedCols(allSelected ? [] : columns.map(c => c.key))}
              className="text-xs text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] rounded"
            >
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {columns.map(col => (
              <label key={col.key} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--ds-bg-subtle)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCols.includes(col.key)}
                  onChange={() => toggleCol(col.key)}
                  className="h-3.5 w-3.5 rounded accent-[var(--ds-brand-600)]"
                />
                <span className="text-sm text-[var(--ds-text-primary)]">{col.label}</span>
              </label>
            ))}
          </div>
          {noneSelected && (
            <p className="mt-1 text-[11px] text-[var(--ds-danger-text)]">Select at least one column</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[var(--ds-border-base)] flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--ds-text-muted)]">
          {selectedCols.length} of {columns.length} columns
        </span>
        <button
          type="button"
          onClick={handleExport}
          disabled={loading || noneSelected}
          className={[
            'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
            done
              ? 'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)] border border-[var(--ds-success-border)]'
              : 'bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] disabled:opacity-50 disabled:cursor-not-allowed',
          ].join(' ')}
        >
          {loading ? (
            <><CircleNotchIcon size={14} className="animate-spin" /> Exporting…</>
          ) : done ? (
            <><CheckCircleIcon size={14} /> Downloaded</>
          ) : (
            <><DownloadSimpleIcon size={14} /> Export {FORMAT_META[format].label}</>
          )}
        </button>
      </div>
    </div>
  );
}
