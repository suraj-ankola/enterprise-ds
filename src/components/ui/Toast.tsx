import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, CheckCircleIcon, WarningIcon, XCircleIcon, InfoIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  title:        string;
  description?: string;
  variant?:     ToastVariant;
  /** ms before auto-dismiss. Pass 0 to disable. Default: 4000 */
  duration?:    number;
  action?:      { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastCtx {
  toast:   (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastCtx | null>(null);

// ─── Tokens ───────────────────────────────────────────────────────────────────

const VARIANT_ICON: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircleIcon size={18} weight="fill" className="text-[var(--ds-success-icon)]" aria-hidden="true" />,
  warning: <WarningIcon     size={18} weight="fill" className="text-[var(--ds-warning-icon)]" aria-hidden="true" />,
  danger:  <XCircleIcon     size={18} weight="fill" className="text-[var(--ds-danger-icon)]"  aria-hidden="true" />,
  info:    <InfoIcon        size={18} weight="fill" className="text-[var(--ds-info-icon)]"    aria-hidden="true" />,
};

const VARIANT_BORDER: Record<ToastVariant, string> = {
  default: 'border-[var(--ds-border-base)]',
  success: 'border-[var(--ds-success-border)]',
  warning: 'border-[var(--ds-warning-border)]',
  danger:  'border-[var(--ds-danger-border)]',
  info:    'border-[var(--ds-info-border)]',
};

// ─── ToastProvider ────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => { setMounted(true); }, []);

  function dismiss(id: string) {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  function toast(opts: ToastOptions): string {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { ...opts, id }]);
    const duration = opts.duration ?? 4000;
    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    }
    return id;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => { timers.current.forEach(clearTimeout); };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-label="Notifications"
          className="fixed bottom-4 right-4 z-[var(--ds-z-toast)] flex flex-col-reverse gap-2 pointer-events-none w-80"
        >
          {toasts.map(t => (
            <ToastItem key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

// ─── useToast hook ────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

// ─── Toast visual ─────────────────────────────────────────────────────────────

function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const variant = item.variant ?? 'default';
  return (
    <div
      role="status"
      className={[
        'pointer-events-auto flex gap-3 items-start',
        'w-full rounded-lg border px-4 py-3 shadow-lg',
        'bg-[var(--ds-bg-surface)]',
        VARIANT_BORDER[variant],
      ].join(' ')}
    >
      {/* Icon */}
      {VARIANT_ICON[variant] && (
        <span className="shrink-0 mt-0.5">{VARIANT_ICON[variant]}</span>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--ds-text-primary)] leading-snug">
          {item.title}
        </p>
        {item.description && (
          <p className="mt-0.5 text-xs text-[var(--ds-text-muted)] leading-snug">
            {item.description}
          </p>
        )}
        {item.action && (
          <button
            type="button"
            onClick={item.action.onClick}
            className="mt-1.5 text-xs font-semibold text-[var(--ds-brand-600)] hover:text-[var(--ds-brand-700)] transition-colors focus-visible:outline-none"
          >
            {item.action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className={[
          'shrink-0 -mt-0.5 -mr-1 p-1 rounded',
          'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
        ].join(' ')}
      >
        <XIcon size={14} />
      </button>
    </div>
  );
}

// ─── Export standalone Toast for static/Storybook use ────────────────────────
// Use this to preview the visual without needing a provider.

export interface ToastPreviewProps {
  title:        string;
  description?: string;
  variant?:     ToastVariant;
  action?:      { label: string; onClick: () => void };
}

export function Toast({ title, description, variant = 'default', action }: ToastPreviewProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <ToastItem
      item={{ id: 'preview', title, description, variant, action }}
      onDismiss={() => setDismissed(true)}
    />
  );
}
