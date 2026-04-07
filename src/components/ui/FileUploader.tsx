import React, { useId, useRef, useState } from 'react';
import { UploadSimpleIcon, FileIcon, XIcon, CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FileEntry {
  id:      string;
  file:    File;
  status:  'idle' | 'uploading' | 'done' | 'error';
  progress?: number;
  error?:  string;
}

export interface FileUploaderProps {
  /** Called when files are added via drop or picker */
  onFilesAdded:  (files: File[]) => void;
  accept?:       string;
  multiple?:     boolean;
  maxSizeMb?:    number;
  /** Pass file entries to render the file list below the drop zone */
  files?:        FileEntry[];
  onRemove?:     (id: string) => void;
  disabled?:     boolean;
  label?:        string;
  hint?:         string;
  className?:    string;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── FileUploader ─────────────────────────────────────────────────────────────

export function FileUploader({
  onFilesAdded,
  accept,
  multiple     = false,
  maxSizeMb,
  files        = [],
  onRemove,
  disabled     = false,
  label        = 'Drop files here or click to browse',
  hint,
  className    = '',
}: FileUploaderProps) {
  const inputId  = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const arr = Array.from(fileList);
    const valid = maxSizeMb
      ? arr.filter(f => f.size <= maxSizeMb * 1024 * 1024)
      : arr;
    if (valid.length) onFilesAdded(valid);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!disabled) setDragging(true);
  }

  function onDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragging(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={['space-y-3', className].join(' ')}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="File upload area"
        aria-disabled={disabled}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        className={[
          'flex flex-col items-center justify-center gap-2',
          'rounded-xl border-2 border-dashed px-6 py-8 text-center',
          'transition-colors duration-[var(--ds-duration-base)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1',
          disabled
            ? 'border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] opacity-50 cursor-not-allowed'
            : dragging
              ? 'border-[var(--ds-brand-400)] bg-[var(--ds-brand-50)] cursor-copy'
              : 'border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] hover:border-[var(--ds-brand-400)] hover:bg-[var(--ds-bg-raised)] cursor-pointer',
        ].join(' ')}
      >
        <UploadSimpleIcon
          size={28}
          className={dragging ? 'text-[var(--ds-brand-500)]' : 'text-[var(--ds-text-muted)]'}
        />
        <p className="text-sm font-medium text-[var(--ds-text-primary)]">{label}</p>
        {hint && <p className="text-xs text-[var(--ds-text-muted)]">{hint}</p>}
        {maxSizeMb && (
          <p className="text-xs text-[var(--ds-text-muted)]">Max file size: {maxSizeMb} MB</p>
        )}
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={e => handleFiles(e.target.files)}
        // Reset input so the same file can be re-added
        onClick={e => { (e.target as HTMLInputElement).value = ''; }}
      />

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Selected files">
          {files.map(entry => (
            <FileRow key={entry.id} entry={entry} onRemove={onRemove} />
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── FileRow ──────────────────────────────────────────────────────────────────

interface FileRowProps {
  entry:    FileEntry;
  onRemove?: (id: string) => void;
}

function FileRow({ entry, onRemove }: FileRowProps) {
  const { id, file, status, progress, error } = entry;

  const statusIcon = status === 'done'
    ? <CheckCircleIcon size={16} className="text-[var(--ds-success-icon)]" />
    : status === 'error'
      ? <WarningCircleIcon size={16} className="text-[var(--ds-danger-icon)]" />
      : <FileIcon size={16} className="text-[var(--ds-text-muted)]" />;

  return (
    <li className="flex items-center gap-3 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] px-3 py-2">
      {statusIcon}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-[var(--ds-text-primary)] truncate">{file.name}</p>
          <span className="text-[10px] text-[var(--ds-text-muted)] shrink-0">{formatBytes(file.size)}</span>
        </div>
        {status === 'uploading' && progress !== undefined && (
          <div className="w-full h-1 rounded-full bg-[var(--ds-bg-raised)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--ds-brand-600)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {status === 'error' && error && (
          <p className="text-[10px] text-[var(--ds-danger-text)]">{error}</p>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${file.name}`}
          onClick={() => onRemove(id)}
          className="shrink-0 text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] focus-visible:outline-none transition-colors"
        >
          <XIcon size={14} weight="bold" />
        </button>
      )}
    </li>
  );
}

// ─── useFileUploader — lightweight state helper ───────────────────────────────

let _id = 0;

export function useFileUploader() {
  const [files, setFiles] = useState<FileEntry[]>([]);

  function addFiles(incoming: File[]) {
    const entries: FileEntry[] = incoming.map(file => ({
      id:     String(++_id),
      file,
      status: 'idle',
    }));
    setFiles(prev => [...prev, ...entries]);
  }

  function remove(id: string) {
    setFiles(prev => prev.filter(f => f.id !== id));
  }

  function setProgress(id: string, progress: number) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading', progress } : f));
  }

  function setDone(id: string) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'done', progress: 100 } : f));
  }

  function setError(id: string, error: string) {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error', error } : f));
  }

  return { files, addFiles, remove, setProgress, setDone, setError };
}
