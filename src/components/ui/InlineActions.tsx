'use client';
import React, { useRef, useState, useEffect } from 'react';
import { DotsThreeIcon, DotsThreeVerticalIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ActionVariant = 'default' | 'danger';

export interface ActionItem {
  id:        string;
  label:     string;
  icon?:     React.ReactNode;
  variant?:  ActionVariant;
  disabled?: boolean;
  onClick:   () => void;
}

export interface ActionDivider { type: 'divider' }
export type ActionEntry = ActionItem | ActionDivider;

export interface InlineActionsProps {
  actions:      ActionEntry[];
  /** Number of actions to show as icon buttons before collapsing to a menu. Default 0 (all in menu). */
  maxVisible?:  number;
  /** Menu icon direction. Default 'horizontal'. */
  iconVariant?: 'horizontal' | 'vertical';
  /** Placement of the dropdown menu. Default 'bottom-end'. */
  menuPlacement?: 'bottom-start' | 'bottom-end' | 'top-end';
  /** Show action labels alongside icons when visible */
  showLabels?: boolean;
  /** Size of the trigger button */
  size?: 'sm' | 'md';
  className?: string;
}

function isDivider(e: ActionEntry): e is ActionDivider {
  return (e as ActionDivider).type === 'divider';
}

// ─── InlineActions ────────────────────────────────────────────────────────────

export function InlineActions({
  actions,
  maxVisible   = 0,
  iconVariant  = 'horizontal',
  menuPlacement = 'bottom-end',
  showLabels   = false,
  size         = 'sm',
  className    = '',
}: InlineActionsProps) {
  const [open, setOpen]   = useState(false);
  const menuRef           = useRef<HTMLDivElement>(null);
  const btnRef            = useRef<HTMLButtonElement>(null);

  // Split: visible vs overflow
  const realActions     = actions.filter(a => !isDivider(a)) as ActionItem[];
  const visibleActions  = maxVisible > 0 ? realActions.slice(0, maxVisible) : [];
  const overflowEntries = maxVisible > 0 ? actions.slice(maxVisible) : actions;

  const hasOverflow = overflowEntries.filter(a => !isDivider(a)).length > 0;

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          btnRef.current  && !btnRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const btnSize = size === 'sm' ? 'p-1 rounded-md' : 'p-1.5 rounded-lg';
  const baseBtn = `${btnSize} text-[var(--ds-text-muted)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)] transition-colors focus-visible:outline-none`;

  const PLACEMENT_CLS: Record<NonNullable<InlineActionsProps['menuPlacement']>, string> = {
    'bottom-end':   'top-full right-0 mt-1',
    'bottom-start': 'top-full left-0 mt-1',
    'top-end':      'bottom-full right-0 mb-1',
  };

  return (
    <div className={['relative flex items-center gap-0.5', className].join(' ')}>
      {/* Visible quick actions */}
      {visibleActions.map(action => {
        const isDanger = action.variant === 'danger';
        return (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            title={action.label}
            className={[
              baseBtn,
              'flex items-center gap-1',
              isDanger ? 'hover:bg-[var(--ds-danger-bg)] hover:text-[var(--ds-danger-text)]' : '',
              action.disabled ? 'opacity-40 pointer-events-none' : '',
            ].join(' ')}
          >
            {action.icon}
            {showLabels && <span className="text-xs">{action.label}</span>}
          </button>
        );
      })}

      {/* Overflow menu trigger */}
      {hasOverflow && (
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            className={baseBtn}
            title="More actions"
          >
            {iconVariant === 'vertical'
              ? <DotsThreeVerticalIcon size={size === 'sm' ? 15 : 18} weight="bold" />
              : <DotsThreeIcon         size={size === 'sm' ? 15 : 18} weight="bold" />}
          </button>

          {open && (
            <div
              ref={menuRef}
              role="menu"
              className={[
                'absolute z-50 w-44 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl overflow-hidden py-1',
                PLACEMENT_CLS[menuPlacement],
              ].join(' ')}
            >
              {overflowEntries.map((entry, i) => {
                if (isDivider(entry)) {
                  return <div key={`d${i}`} className="my-1 border-t border-[var(--ds-border-base)]" />;
                }
                const item     = entry as ActionItem;
                const isDanger = item.variant === 'danger';
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => { item.onClick(); setOpen(false); }}
                    className={[
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors',
                      isDanger
                        ? 'text-[var(--ds-danger-text)] hover:bg-[var(--ds-danger-bg)]'
                        : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
                      item.disabled ? 'opacity-40 pointer-events-none' : '',
                    ].join(' ')}
                  >
                    {item.icon && <span className="shrink-0 text-current">{item.icon}</span>}
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
