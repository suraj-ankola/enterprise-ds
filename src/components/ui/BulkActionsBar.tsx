import React from 'react';
import { XIcon, TrashIcon, DownloadSimpleIcon, ArrowRightIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BulkAction {
  id:        string;
  label:     string;
  icon?:     React.ReactNode;
  variant?:  'default' | 'danger';
  onClick:   (selectedIds: string[]) => void;
}

export interface BulkActionsBarProps {
  /** Number of selected rows */
  selectedCount:  number;
  /** All selected ids */
  selectedIds?:   string[];
  actions:        BulkAction[];
  onClearSelection: () => void;
  /** Total items in the list (for "X of N selected" label) */
  totalCount?:    number;
  className?:     string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BulkActionsBar({
  selectedCount,
  selectedIds   = [],
  actions,
  onClearSelection,
  totalCount,
  className     = '',
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  const label = totalCount
    ? `${selectedCount} of ${totalCount} selected`
    : `${selectedCount} selected`;

  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className={[
        'flex items-center gap-3 px-4 py-2.5 rounded-xl',
        'bg-[var(--ds-brand-600)] text-white shadow-lg',
        'animate-in slide-in-from-bottom-2 duration-200',
        className,
      ].join(' ')}
    >
      {/* Selection count */}
      <span className="text-sm font-semibold text-white/90 shrink-0">{label}</span>

      <div className="w-px h-4 bg-white/20 shrink-0" />

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        {actions.map(action => (
          <button
            key={action.id}
            type="button"
            onClick={() => action.onClick(selectedIds)}
            className={[
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium',
              'transition-colors duration-[var(--ds-duration-base)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
              action.variant === 'danger'
                ? 'bg-white/10 hover:bg-red-500/30 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white',
            ].join(' ')}
          >
            {action.icon && <span aria-hidden="true" className="flex items-center">{action.icon}</span>}
            {action.label}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Clear */}
      <button
        type="button"
        aria-label="Clear selection"
        onClick={onClearSelection}
        className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none"
      >
        <XIcon size={16} weight="bold" />
      </button>
    </div>
  );
}
