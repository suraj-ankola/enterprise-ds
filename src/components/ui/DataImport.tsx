'use client';
import React, { useCallback, useRef, useState } from 'react';
import {
  UploadSimpleIcon,
  FileCsvIcon,
  CheckCircleIcon,
  XCircleIcon,
  CircleNotchIcon,
  WarningIcon,
  FileArrowUpIcon,
  XIcon,
} from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ImportColumnMapping {
  /** Source column name from the uploaded file */
  source:   string;
  /** Target field key in the system */
  target:   string | null;
}

export interface ImportField {
  key:       string;
  label:     string;
  required?: boolean;
}

export type ImportStep = 'upload' | 'mapping' | 'preview' | 'done';

export interface ParsedRow {
  [key: string]: string;
}

export interface DataImportProps {
  entityName:    string;
  fields:        ImportField[];
  /** Called with mapped rows. Return a Promise to show loading. */
  onImport:      (rows: ParsedRow[], mappings: ImportColumnMapping[]) => Promise<{ imported: number; errors: number }>;
  acceptFormats?: string;
  maxFileSizeMB?: number;
  className?:    string;
}

// ─── Step indicators ──────────────────────────────────────────────────────────

const STEPS: { id: ImportStep; label: string }[] = [
  { id: 'upload',  label: 'Upload file' },
  { id: 'mapping', label: 'Map columns' },
  { id: 'preview', label: 'Preview' },
  { id: 'done',    label: 'Done' },
];

function StepBar({ current }: { current: ImportStep }) {
  const idx = STEPS.findIndex(s => s.id === current);
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-1.5">
            <div className={[
              'h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold',
              i < idx  ? 'bg-[var(--ds-brand-600)] text-white' :
              i === idx ? 'bg-[var(--ds-brand-100)] text-[var(--ds-brand-700)] border-2 border-[var(--ds-brand-500)]' :
                          'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-muted)]',
            ].join(' ')}>
              {i < idx ? <CheckCircleIcon size={12} weight="fill" /> : i + 1}
            </div>
            <span className={[
              'text-xs hidden sm:block',
              i <= idx ? 'text-[var(--ds-text-primary)] font-medium' : 'text-[var(--ds-text-muted)]',
            ].join(' ')}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={['flex-1 mx-2 h-px', i < idx ? 'bg-[var(--ds-brand-500)]' : 'bg-[var(--ds-border-base)]'].join(' ')} style={{ minWidth: 16 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── DataImport ───────────────────────────────────────────────────────────────

export function DataImport({
  entityName,
  fields,
  onImport,
  acceptFormats = '.csv,.xlsx',
  maxFileSizeMB = 10,
  className = '',
}: DataImportProps) {
  const [step,     setStep]     = useState<ImportStep>('upload');
  const [file,     setFile]     = useState<File | null>(null);
  const [headers,  setHeaders]  = useState<string[]>([]);
  const [rows,     setRows]     = useState<ParsedRow[]>([]);
  const [mappings, setMappings] = useState<ImportColumnMapping[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [result,   setResult]   = useState<{ imported: number; errors: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) processFile(dropped);
  }, []);

  function processFile(f: File) {
    setFileError(null);
    if (f.size > maxFileSizeMB * 1024 * 1024) {
      setFileError(`File exceeds ${maxFileSizeMB} MB limit`);
      return;
    }
    setFile(f);

    // Parse CSV headers (simplified — real impl would use Papa Parse)
    const reader = new FileReader();
    reader.onload = (e) => {
      const text   = e.target?.result as string ?? '';
      const lines  = text.split('\n').filter(Boolean);
      const hdrs   = lines[0]?.split(',').map(h => h.trim().replace(/^"|"$/g, '')) ?? [];
      const parsed = lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        return Object.fromEntries(hdrs.map((h, i) => [h, vals[i] ?? '']));
      });
      setHeaders(hdrs);
      setRows(parsed);
      // Auto-map by fuzzy label match
      const auto: ImportColumnMapping[] = hdrs.map(h => {
        const match = fields.find(f =>
          f.key.toLowerCase() === h.toLowerCase() ||
          f.label.toLowerCase() === h.toLowerCase(),
        );
        return { source: h, target: match?.key ?? null };
      });
      setMappings(auto);
      setStep('mapping');
    };
    reader.readAsText(f);
  }

  function setMapping(source: string, target: string | null) {
    setMappings(prev => prev.map(m => m.source === source ? { ...m, target } : m));
  }

  async function handleImport() {
    setLoading(true);
    try {
      const res = await onImport(rows, mappings);
      setResult(res);
      setStep('done');
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep('upload');
    setFile(null);
    setHeaders([]);
    setRows([]);
    setMappings([]);
    setResult(null);
    setFileError(null);
  }

  const requiredMapped = fields.filter(f => f.required).every(f =>
    mappings.some(m => m.target === f.key),
  );

  return (
    <div className={['bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden', className].join(' ')}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--ds-border-base)]">
        <div className="flex items-center gap-2 mb-3">
          <UploadSimpleIcon size={18} className="text-[var(--ds-brand-600)]" />
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Import {entityName}</h3>
        </div>
        <StepBar current={step} />
      </div>

      {/* Step: Upload */}
      {step === 'upload' && (
        <div className="p-5">
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[var(--ds-border-base)] rounded-xl p-10 cursor-pointer hover:border-[var(--ds-brand-400)] hover:bg-[var(--ds-bg-subtle)] transition-colors text-center"
          >
            <FileArrowUpIcon size={36} className="text-[var(--ds-text-muted)]" />
            <div>
              <p className="text-sm font-medium text-[var(--ds-text-primary)]">Drop your file here, or click to browse</p>
              <p className="text-xs text-[var(--ds-text-muted)] mt-0.5">Supports {acceptFormats} · Max {maxFileSizeMB} MB</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept={acceptFormats}
              className="hidden"
              onChange={e => e.target.files?.[0] && processFile(e.target.files[0])}
            />
          </div>
          {fileError && (
            <p className="mt-2 text-sm text-[var(--ds-danger-text)] flex items-center gap-1">
              <XCircleIcon size={14} /> {fileError}
            </p>
          )}
          <div className="mt-4 p-3 bg-[var(--ds-bg-subtle)] rounded-lg">
            <p className="text-xs font-semibold text-[var(--ds-text-muted)] mb-1">Required columns</p>
            <div className="flex flex-wrap gap-1">
              {fields.filter(f => f.required).map(f => (
                <span key={f.key} className="px-2 py-0.5 text-[11px] bg-[var(--ds-brand-50)] text-[var(--ds-brand-700)] rounded-full">{f.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step: Mapping */}
      {step === 'mapping' && (
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <FileCsvIcon size={16} className="text-[var(--ds-text-muted)]" />
            <span className="text-sm text-[var(--ds-text-primary)] font-medium">{file?.name}</span>
            <span className="text-xs text-[var(--ds-text-muted)]">· {rows.length} rows</span>
            <button type="button" onClick={reset} className="ml-auto p-1 rounded text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]">
              <XIcon size={14} />
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-4 px-2 mb-1">
              <p className="text-[10px] font-semibold text-[var(--ds-text-muted)] uppercase">File column</p>
              <p className="text-[10px] font-semibold text-[var(--ds-text-muted)] uppercase">Maps to field</p>
            </div>
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {mappings.map(m => (
                <div key={m.source} className="grid grid-cols-2 gap-x-4 items-center px-2">
                  <span className="text-sm text-[var(--ds-text-primary)] truncate">{m.source}</span>
                  <select
                    value={m.target ?? ''}
                    onChange={e => setMapping(m.source, e.target.value || null)}
                    className="h-8 px-2 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
                  >
                    <option value="">— Skip —</option>
                    {fields.map(f => (
                      <option key={f.key} value={f.key}>{f.label}{f.required ? ' *' : ''}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {!requiredMapped && (
            <p className="text-xs text-[var(--ds-warning-text)] flex items-center gap-1">
              <WarningIcon size={13} /> Map all required fields before continuing
            </p>
          )}

          <div className="flex justify-between pt-2">
            <button type="button" onClick={reset} className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]">Back</button>
            <button
              type="button"
              onClick={() => setStep('preview')}
              disabled={!requiredMapped}
              className="px-4 py-1.5 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              Preview →
            </button>
          </div>
        </div>
      )}

      {/* Step: Preview */}
      {step === 'preview' && (
        <div className="p-5 space-y-4">
          <p className="text-sm text-[var(--ds-text-muted)]">Previewing first 5 rows of <span className="font-medium text-[var(--ds-text-primary)]">{rows.length}</span> records.</p>
          <div className="overflow-x-auto rounded-lg border border-[var(--ds-border-base)]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
                  {mappings.filter(m => m.target).map(m => {
                    const field = fields.find(f => f.key === m.target);
                    return (
                      <th key={m.source} className="px-3 py-2 text-left font-semibold text-[var(--ds-text-muted)]">
                        {field?.label ?? m.target}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 5).map((row, ri) => (
                  <tr key={ri} className="border-b border-[var(--ds-border-base)] last:border-0">
                    {mappings.filter(m => m.target).map(m => (
                      <td key={m.source} className="px-3 py-2 text-[var(--ds-text-primary)]">{row[m.source]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between pt-1">
            <button type="button" onClick={() => setStep('mapping')} className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]">Back</button>
            <button
              type="button"
              onClick={handleImport}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              {loading ? <><CircleNotchIcon size={14} className="animate-spin" /> Importing…</> : `Import ${rows.length} records`}
            </button>
          </div>
        </div>
      )}

      {/* Step: Done */}
      {step === 'done' && result && (
        <div className="p-8 flex flex-col items-center gap-4 text-center">
          <CheckCircleIcon size={40} weight="fill" className="text-[var(--ds-success-icon)]" />
          <div>
            <p className="text-base font-semibold text-[var(--ds-text-primary)]">Import complete</p>
            <p className="text-sm text-[var(--ds-text-muted)] mt-1">
              {result.imported} records imported
              {result.errors > 0 && <>, <span className="text-[var(--ds-warning-text)]">{result.errors} skipped</span></>}
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="px-4 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
          >
            Import another file
          </button>
        </div>
      )}
    </div>
  );
}
