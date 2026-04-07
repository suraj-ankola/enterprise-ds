import React, { useId, useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CollapsibleProps {
  /** Trigger label or node */
  trigger:       React.ReactNode;
  children:      React.ReactNode;
  defaultOpen?:  boolean;
  /** Controlled open state */
  open?:         boolean;
  onOpenChange?: (open: boolean) => void;
  /** Show a subtle border around the whole block */
  bordered?:     boolean;
  disabled?:     boolean;
  className?:    string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Collapsible({
  trigger,
  children,
  defaultOpen   = false,
  open: controlledOpen,
  onOpenChange,
  bordered      = false,
  disabled      = false,
  className     = '',
}: CollapsibleProps) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  const isControlled             = controlledOpen !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const isOpen                   = isControlled ? controlledOpen : uncontrolled;

  function toggle() {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  }

  return (
    <div
      className={[
        bordered
          ? 'border border-[var(--ds-border-base)] rounded-xl overflow-hidden'
          : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        onClick={toggle}
        className={[
          'w-full flex items-center justify-between gap-2',
          'text-left text-sm font-medium text-[var(--ds-text-primary)]',
          bordered ? 'px-4 py-3' : 'py-2',
          'hover:text-[var(--ds-text-primary)]',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-[var(--ds-brand-500)] focus-visible:ring-offset-1 rounded',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-[var(--ds-duration-base)]',
          bordered && isOpen ? 'border-b border-[var(--ds-border-base)]' : '',
        ].filter(Boolean).join(' ')}
      >
        <span className="flex-1 min-w-0">{trigger}</span>
        <CaretDownIcon
          size={15}
          weight="bold"
          aria-hidden="true"
          className={[
            'shrink-0 text-[var(--ds-text-muted)]',
            'transition-transform duration-[var(--ds-duration-base)]',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
        />
      </button>

      {/* Content */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={bordered ? 'px-4 py-3' : 'pt-2'}
      >
        {children}
      </div>
    </div>
  );
}
