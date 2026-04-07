'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircleIcon, XIcon, ArrowCounterClockwiseIcon, WarningIcon, InfoIcon, TrashIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UndoToastVariant = 'success' | 'danger' | 'info' | 'warning';

export interface UndoToastItem {
  id:       string;
  message:  string;
  variant?: UndoToastVariant;
  /** Duration in ms before auto-dismiss. Default 5000. Set 0 to persist. */
  duration?: number;
  onUndo?:  () => void;
  onDismiss?: () => void;
}

export interface UndoToastProps {
  toasts:   UndoToastItem[];
  onRemove: (id: string) => void;
  /** Position on screen. Default 'bottom-center'. */
  position?: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right';
}

// ─── useUndoToast hook ────────────────────────────────────────────────────────

let _counter = 0;
function uid() { return `ut${++_counter}`; }

export function useUndoToast() {
  const [toasts, setToasts] = useState<UndoToastItem[]>([]);

  const add = useCallback((item: Omit<UndoToastItem, 'id'>) => {
    const id = uid();
    setToasts(prev => [...prev, { id, duration: 5000, ...item }]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, add, remove };
}

// ─── Single toast item ────────────────────────────────────────────────────────

const ICONS: Record<UndoToastVariant, React.ReactNode> = {
  success: <CheckCircleIcon size={16} weight="fill" className="text-[var(--ds-success-icon)]" />,
  danger:  <TrashIcon       size={16} weight="fill" className="text-[var(--ds-danger-icon)]"  />,
  info:    <InfoIcon        size={16} weight="fill" className="text-[var(--ds-info-icon)]"    />,
  warning: <WarningIcon     size={16} weight="fill" className="text-[var(--ds-warning-icon)]" />,
};

function ToastItem({ toast, onRemove }: { toast: UndoToastItem; onRemove: (id: string) => void }) {
  const progressRef = useRef<HTMLDivElement>(null);
  const duration    = toast.duration ?? 5000;

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      toast.onDismiss?.();
      onRemove(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, toast, onRemove]);

  // Animate progress bar
  useEffect(() => {
    if (!duration || !progressRef.current) return;
    progressRef.current.style.transition = `width ${duration}ms linear`;
    // Trigger reflow
    void progressRef.current.offsetWidth;
    progressRef.current.style.width = '0%';
  }, [duration]);

  const variant = toast.variant ?? 'success';

  function handleUndo() {
    toast.onUndo?.();
    onRemove(toast.id);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative overflow-hidden flex items-center gap-3 px-4 py-3 bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)] rounded-xl shadow-xl min-w-[280px] max-w-sm animate-in slide-in-from-bottom-2 fade-in duration-200"
    >
      {ICONS[variant]}
      <span className="flex-1 text-sm text-[var(--ds-text-primary)]">{toast.message}</span>
      {toast.onUndo && (
        <button
          type="button"
          onClick={handleUndo}
          className="flex items-center gap-1 text-xs font-semibold text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] shrink-0 transition-colors"
        >
          <ArrowCounterClockwiseIcon size={13} />
          Undo
        </button>
      )}
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
        className="p-0.5 rounded text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors shrink-0"
      >
        <XIcon size={13} />
      </button>
      {/* Progress bar */}
      {!!duration && (
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--ds-border-base)]">
          <div
            ref={progressRef}
            className="h-full w-full bg-[var(--ds-brand-500)] transition-none"
          />
        </div>
      )}
    </div>
  );
}

// ─── UndoToast portal container ───────────────────────────────────────────────

const POSITION_CLS: Record<NonNullable<UndoToastProps['position']>, string> = {
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 items-center',
  'bottom-right':  'bottom-6 right-6 items-end',
  'bottom-left':   'bottom-6 left-6 items-start',
  'top-center':    'top-6 left-1/2 -translate-x-1/2 items-center',
  'top-right':     'top-6 right-6 items-end',
};

export function UndoToast({ toasts, onRemove, position = 'bottom-center' }: UndoToastProps) {
  if (!toasts.length) return null;
  return (
    <div
      className={['fixed z-[9999] flex flex-col gap-2', POSITION_CLS[position]].join(' ')}
    >
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
