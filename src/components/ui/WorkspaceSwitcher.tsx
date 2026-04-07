'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, PlusIcon, CaretUpDownIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Workspace {
  id:      string;
  name:    string;
  plan?:   string;
  avatar?: React.ReactNode;
  /** Colour for auto-generated initials avatar */
  color?:  string;
}

export interface WorkspaceSwitcherProps {
  workspaces:       Workspace[];
  currentId:        string;
  onSwitch:         (id: string) => void;
  onCreateNew?:     () => void;
  collapsed?:       boolean;
  className?:       string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WorkspaceSwitcher({
  workspaces,
  currentId,
  onSwitch,
  onCreateNew,
  collapsed   = false,
  className   = '',
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref              = useRef<HTMLDivElement>(null);

  const current = workspaces.find(w => w.id === currentId) ?? workspaces[0];

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  function Avatar({ ws }: { ws: Workspace }) {
    if (ws.avatar) return <>{ws.avatar}</>;
    return (
      <div
        className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ background: ws.color ?? 'var(--ds-brand-600)' }}
      >
        {ws.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div ref={ref} className={['relative', className].join(' ')}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className={[
          'flex items-center gap-2 rounded-lg transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
          'hover:bg-[var(--ds-bg-subtle)]',
          collapsed ? 'p-1.5 justify-center' : 'px-2.5 py-1.5 w-full',
        ].join(' ')}
      >
        <Avatar ws={current} />
        {!collapsed && (
          <>
            <span className="flex-1 min-w-0 text-left">
              <span className="block text-sm font-semibold text-[var(--ds-text-primary)] truncate">{current.name}</span>
              {current.plan && <span className="block text-[10px] text-[var(--ds-text-muted)] truncate">{current.plan}</span>}
            </span>
            <CaretUpDownIcon size={14} className="text-[var(--ds-text-muted)] shrink-0" />
          </>
        )}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Workspaces"
          className={[
            'absolute z-50 mt-1 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl overflow-hidden',
            collapsed ? 'left-full ml-2 top-0' : 'left-0 right-0',
            'min-w-[200px]',
          ].join(' ')}
        >
          <div className="px-3 py-2 border-b border-[var(--ds-border-base)]">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">Workspaces</p>
          </div>

          <ul className="py-1">
            {workspaces.map(ws => (
              <li key={ws.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={ws.id === currentId}
                  onClick={() => { onSwitch(ws.id); setOpen(false); }}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors',
                    ws.id === currentId ? 'bg-[var(--ds-bg-subtle)]' : 'hover:bg-[var(--ds-bg-subtle)]',
                  ].join(' ')}
                >
                  <Avatar ws={ws} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-[var(--ds-text-primary)] truncate">{ws.name}</span>
                    {ws.plan && <span className="block text-[10px] text-[var(--ds-text-muted)]">{ws.plan}</span>}
                  </span>
                  {ws.id === currentId && <CheckIcon size={14} className="text-[var(--ds-brand-600)] shrink-0" />}
                </button>
              </li>
            ))}
          </ul>

          {onCreateNew && (
            <div className="border-t border-[var(--ds-border-base)] py-1">
              <button
                type="button"
                onClick={() => { onCreateNew(); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors"
              >
                <PlusIcon size={14} />
                Create workspace
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
