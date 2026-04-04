import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrawerSide = 'right' | 'left' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  open:             boolean;
  onClose:          () => void;
  side?:            DrawerSide;
  size?:            DrawerSize;
  title?:           React.ReactNode;
  description?:     React.ReactNode;
  /** Footer slot — render your own buttons */
  footer?:          React.ReactNode;
  closeOnBackdrop?: boolean;
  children?:        React.ReactNode;
  className?:       string;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const SIDE_SIZE: Record<DrawerSide, Record<DrawerSize, string>> = {
  right: {
    sm:   'w-80',
    md:   'w-96',
    lg:   'w-[480px]',
    xl:   'w-[600px]',
    full: 'w-screen',
  },
  left: {
    sm:   'w-80',
    md:   'w-96',
    lg:   'w-[480px]',
    xl:   'w-[600px]',
    full: 'w-screen',
  },
  bottom: {
    sm:   'h-48',
    md:   'h-64',
    lg:   'h-96',
    xl:   'h-[480px]',
    full: 'h-screen',
  },
};

const SIDE_POSITION: Record<DrawerSide, string> = {
  right:  'right-0 top-0 h-full',
  left:   'left-0  top-0 h-full',
  bottom: 'bottom-0 left-0 w-full',
};

const TRANSLATE_CLOSED: Record<DrawerSide, string> = {
  right:  'translate-x-full',
  left:   '-translate-x-full',
  bottom: 'translate-y-full',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Drawer({
  open,
  onClose,
  side             = 'right',
  size             = 'md',
  title,
  description,
  footer,
  closeOnBackdrop  = true,
  children,
  className        = '',
}: DrawerProps) {
  const [mounted, setMounted]   = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Animate in/out
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      // Let CSS transition finish before hiding
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

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

  if (!mounted || (!open && !visible)) return null;

  const isOpen = open && visible;

  return createPortal(
    <div className="fixed inset-0 z-[var(--ds-z-modal)] flex">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        className={[
          'absolute inset-0 bg-[var(--ds-bg-overlay)] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={[
          'absolute flex flex-col bg-[var(--ds-bg-surface)] shadow-xl',
          'transition-transform duration-300 ease-out',
          SIDE_POSITION[side],
          SIDE_SIZE[side][size],
          isOpen ? 'translate-x-0 translate-y-0' : TRANSLATE_CLOSED[side],
          className,
        ].filter(Boolean).join(' ')}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-[var(--ds-border-base)] shrink-0">
            <div className="flex flex-col gap-0.5">
              {title && (
                <h2 id="drawer-title" className="text-base font-semibold text-[var(--ds-text-primary)]">
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
                'shrink-0 -mt-0.5 p-1 rounded-md transition-colors',
                'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]',
              ].join(' ')}
            >
              <XIcon size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-[var(--ds-text-primary)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--ds-border-base)]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
