import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon, WarningIcon } from '@phosphor-icons/react';
import { Button } from './Button';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ModalProps {
  open:              boolean;
  onClose:           () => void;
  title?:            React.ReactNode;
  description?:      React.ReactNode;
  size?:             ModalSize;
  /** Footer slot — render your own buttons */
  footer?:           React.ReactNode;
  /** Click backdrop to close. Defaults to true. */
  closeOnBackdrop?:  boolean;
  children?:         React.ReactNode;
  className?:        string;
}

export interface ConfirmModalProps {
  open:           boolean;
  onClose:        () => void;
  onConfirm:      () => void;
  title:          string;
  description?:   string;
  confirmLabel?:  string;
  cancelLabel?:   string;
  /** 'danger' uses red confirm button */
  variant?:       'default' | 'danger';
  loading?:       boolean;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const SIZE: Record<ModalSize, string> = {
  sm:  'max-w-sm',
  md:  'max-w-md',
  lg:  'max-w-lg',
  xl:  'max-w-xl',
  '2xl': 'max-w-2xl',
};

// ─── Modal ────────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  title,
  description,
  size             = 'md',
  footer,
  closeOnBackdrop  = true,
  children,
  className        = '',
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Portal mount guard (SSR safe)
  useEffect(() => { setMounted(true); }, []);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Focus modal content on open
  useEffect(() => {
    if (open) {
      // Small delay so portal has rendered
      requestAnimationFrame(() => contentRef.current?.focus());
    }
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[var(--ds-z-modal)] flex items-center justify-center p-4"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--ds-bg-overlay)]"
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Content */}
      <div
        ref={contentRef}
        tabIndex={-1}
        className={[
          'relative z-10 w-full flex flex-col',
          'bg-[var(--ds-bg-surface)] rounded-xl shadow-xl',
          'outline-none',
          'max-h-[90vh]',
          SIZE[size],
          className,
        ].filter(Boolean).join(' ')}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
            <div className="flex flex-col gap-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-base font-semibold text-[var(--ds-text-primary)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-[var(--ds-text-muted)]">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={[
                'shrink-0 -mt-0.5 p-1 rounded-md',
                'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
                'transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
              ].join(' ')}
            >
              <XIcon size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="flex-1 overflow-y-auto px-6 py-4 text-sm text-[var(--ds-text-primary)]">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 pt-2 shrink-0 border-t border-[var(--ds-border-base)]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── ConfirmModal ─────────────────────────────────────────────────────────────

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  variant      = 'default',
  loading      = false,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        {variant === 'danger' && (
          <span className="shrink-0 mt-0.5 text-[var(--ds-danger-icon)]">
            <WarningIcon size={20} weight="fill" />
          </span>
        )}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-[var(--ds-text-primary)]">{title}</p>
          {description && (
            <p className="text-[var(--ds-text-muted)]">{description}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
