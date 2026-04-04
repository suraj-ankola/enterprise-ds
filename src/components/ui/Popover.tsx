import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverSide  = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
  /** The trigger element */
  trigger:   React.ReactElement;
  children:  React.ReactNode;
  side?:     PopoverSide;
  align?:    PopoverAlign;
  /** Width of the popover panel */
  width?:    string;
  className?: string;
}

// ─── Position maps ────────────────────────────────────────────────────────────

const SIDE_CLASS: Record<PopoverSide, string> = {
  bottom: 'top-full mt-2',
  top:    'bottom-full mb-2',
  left:   'right-full mr-2 top-0',
  right:  'left-full ml-2 top-0',
};

const ALIGN_CLASS: Record<PopoverAlign, Record<PopoverSide, string>> = {
  start:  { bottom: 'left-0',        top: 'left-0',        left: '',  right: '' },
  center: { bottom: 'left-1/2 -translate-x-1/2', top: 'left-1/2 -translate-x-1/2', left: '', right: '' },
  end:    { bottom: 'right-0',       top: 'right-0',       left: '',  right: '' },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Popover({
  trigger,
  children,
  side    = 'bottom',
  align   = 'start',
  width   = '280px',
  className = '',
}: PopoverProps) {
  const [open, setOpen]       = useState(false);
  const containerRef          = useRef<HTMLDivElement>(null);
  const triggerRef            = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        (triggerRef.current as HTMLElement | null)?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  type TriggerProps = React.HTMLAttributes<HTMLButtonElement> & { ref?: React.Ref<HTMLButtonElement> };
  const triggerEl = React.cloneElement(trigger as React.ReactElement<TriggerProps>, {
    ref: triggerRef as React.Ref<HTMLButtonElement>,
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': open,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      (trigger as React.ReactElement<TriggerProps>).props.onClick?.(e);
      setOpen(v => !v);
    },
  });

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerEl}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          className={[
            'absolute z-[var(--ds-z-dropdown)]',
            'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)]',
            'rounded-xl shadow-lg outline-none',
            SIDE_CLASS[side],
            ALIGN_CLASS[align][side],
            className,
          ].filter(Boolean).join(' ')}
          style={{ width }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
