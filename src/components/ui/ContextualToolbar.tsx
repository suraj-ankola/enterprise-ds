'use client';
import React, { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToolbarItemVariant = 'default' | 'danger';

export interface ToolbarItem {
  id:       string;
  label:    string;
  icon?:    React.ReactNode;
  variant?: ToolbarItemVariant;
  disabled?: boolean;
  onClick:  () => void;
}

export interface ToolbarDivider {
  type: 'divider';
}

export type ToolbarEntry = ToolbarItem | ToolbarDivider;

export interface ContextualToolbarProps {
  /** Items to show in the toolbar */
  items:    ToolbarEntry[];
  /** When false, toolbar is hidden. When true, toolbar is shown. */
  visible:  boolean;
  /** Position relative to the trigger area. Default: 'top' */
  position?: 'top' | 'bottom';
  /** Pixel offset from viewport edge */
  offset?:  number;
  /** Called when user presses Escape */
  onDismiss?: () => void;
  className?: string;
}

function isDivider(entry: ToolbarEntry): entry is ToolbarDivider {
  return (entry as ToolbarDivider).type === 'divider';
}

// ─── ContextualToolbar ────────────────────────────────────────────────────────

export function ContextualToolbar({
  items,
  visible,
  position  = 'top',
  onDismiss,
  className = '',
}: ContextualToolbarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !onDismiss) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onDismiss!();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label="Contextual actions"
      className={[
        'inline-flex items-center gap-0.5 px-1 py-1',
        'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl',
        'animate-in fade-in duration-150',
        position === 'bottom' ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2',
        className,
      ].join(' ')}
    >
      {items.map((entry, i) => {
        if (isDivider(entry)) {
          return <div key={`div-${i}`} className="w-px h-5 bg-[var(--ds-border-base)] mx-0.5" />;
        }
        const item = entry as ToolbarItem;
        const isDanger = item.variant === 'danger';
        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            disabled={item.disabled}
            title={item.label}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
              isDanger
                ? 'text-[var(--ds-danger-text)] hover:bg-[var(--ds-danger-bg)]'
                : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] hover:text-[var(--ds-text-primary)]',
              item.disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
            ].join(' ')}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            <span className="font-medium text-xs whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── FloatingContextualToolbar ────────────────────────────────────────────────
// Positioned absolutely over selected content (e.g. rich text selection)

export interface FloatingToolbarProps extends ContextualToolbarProps {
  /** Top position in px */
  top:  number;
  /** Left position in px */
  left: number;
}

export function FloatingContextualToolbar({ top, left, ...rest }: FloatingToolbarProps) {
  return (
    <div
      style={{ position: 'absolute', top, left, zIndex: 50 }}
      className="-translate-y-full -translate-x-1/2"
    >
      <ContextualToolbar {...rest} />
    </div>
  );
}
