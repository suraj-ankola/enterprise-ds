'use client';
import React, { useState } from 'react';
import { DotsSixVerticalIcon, EyeIcon, EyeSlashIcon, PushPinIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColumnDef {
  key:       string;
  label:     string;
  visible:   boolean;
  pinned?:   'left' | 'right' | false;
  /** Cannot be hidden/moved */
  locked?:   boolean;
}

export interface ColumnCustomizerProps {
  columns:   ColumnDef[];
  onChange:  (columns: ColumnDef[]) => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ColumnCustomizer({ columns, onChange, className = '' }: ColumnCustomizerProps) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  function toggleVisible(key: string) {
    onChange(columns.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
  }

  function togglePin(key: string) {
    onChange(columns.map(c =>
      c.key === key
        ? { ...c, pinned: c.pinned === 'left' ? false : 'left' }
        : c,
    ));
  }

  function onDragStart(key: string) { setDragging(key); }
  function onDragEnter(key: string) { setDragOver(key); }

  function onDrop(targetKey: string) {
    if (!dragging || dragging === targetKey) { setDragging(null); setDragOver(null); return; }
    const arr  = [...columns];
    const from = arr.findIndex(c => c.key === dragging);
    const to   = arr.findIndex(c => c.key === targetKey);
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange(arr);
    setDragging(null);
    setDragOver(null);
  }

  const visibleCount = columns.filter(c => c.visible).length;

  return (
    <div className={['select-none', className].join(' ')}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--ds-border-base)]">
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">Columns</p>
        <span className="text-xs text-[var(--ds-text-muted)]">{visibleCount} visible</span>
      </div>

      <ul className="py-1">
        {columns.map(col => (
          <li
            key={col.key}
            draggable={!col.locked}
            onDragStart={() => !col.locked && onDragStart(col.key)}
            onDragEnter={() => onDragEnter(col.key)}
            onDragOver={e => e.preventDefault()}
            onDrop={() => onDrop(col.key)}
            onDragEnd={() => { setDragging(null); setDragOver(null); }}
            className={[
              'flex items-center gap-2 px-3 py-2 transition-colors',
              dragOver === col.key && dragging !== col.key ? 'bg-[var(--ds-brand-50)] border-t-2 border-[var(--ds-brand-400)]' : '',
              col.locked ? 'opacity-60' : 'hover:bg-[var(--ds-bg-subtle)]',
            ].join(' ')}
          >
            {/* Drag handle */}
            <span
              className={['text-[var(--ds-text-muted)]', col.locked ? 'invisible' : 'cursor-grab active:cursor-grabbing'].join(' ')}
              aria-hidden="true"
            >
              <DotsSixVerticalIcon size={16} />
            </span>

            {/* Label */}
            <span className={['flex-1 text-sm', col.visible ? 'text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)] line-through'].join(' ')}>
              {col.label}
              {col.locked && <span className="ml-1 text-[10px] text-[var(--ds-text-muted)]">(required)</span>}
            </span>

            {/* Pin */}
            <button
              type="button"
              aria-label={`${col.pinned === 'left' ? 'Unpin' : 'Pin left'} ${col.label}`}
              disabled={col.locked}
              onClick={() => togglePin(col.key)}
              className={[
                'p-1 rounded transition-colors focus-visible:outline-none',
                col.pinned === 'left'
                  ? 'text-[var(--ds-brand-600)]'
                  : 'text-[var(--ds-text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--ds-text-primary)]',
                col.locked ? 'invisible' : '',
              ].join(' ')}
            >
              <PushPinIcon size={13} weight={col.pinned === 'left' ? 'fill' : 'regular'} />
            </button>

            {/* Show/hide */}
            <button
              type="button"
              aria-label={`${col.visible ? 'Hide' : 'Show'} ${col.label}`}
              disabled={col.locked}
              onClick={() => toggleVisible(col.key)}
              className={[
                'p-1 rounded transition-colors focus-visible:outline-none',
                col.visible ? 'text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)]' : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                col.locked ? 'invisible' : '',
              ].join(' ')}
            >
              {col.visible ? <EyeIcon size={14} /> : <EyeSlashIcon size={14} />}
            </button>
          </li>
        ))}
      </ul>

      <div className="px-3 py-2 border-t border-[var(--ds-border-base)] flex gap-3">
        <button
          type="button"
          onClick={() => onChange(columns.map(c => ({ ...c, visible: true })))}
          className="text-xs text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] transition-colors focus-visible:outline-none"
        >
          Show all
        </button>
        <button
          type="button"
          onClick={() => onChange(columns.map(c => c.locked ? c : { ...c, visible: false }))}
          className="text-xs text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none"
        >
          Hide all
        </button>
      </div>
    </div>
  );
}
