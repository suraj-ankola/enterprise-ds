import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MenuItemType = 'item' | 'separator' | 'label';

export interface MenuItem {
  key:       string;
  type?:     MenuItemType;   // default 'item'
  label?:    React.ReactNode;
  icon?:     React.ReactNode;
  onClick?:  () => void;
  disabled?: boolean;
  /** Red color — for destructive actions */
  danger?:   boolean;
}

export type DropdownAlign = 'start' | 'end';
export type DropdownSide  = 'bottom' | 'top';

export interface DropdownMenuProps {
  /** The element that triggers the menu */
  trigger:   React.ReactElement;
  items:     MenuItem[];
  align?:    DropdownAlign;
  side?:     DropdownSide;
  className?: string;
}

// ─── Align map ────────────────────────────────────────────────────────────────

const ALIGN: Record<DropdownAlign, string> = {
  start: 'left-0',
  end:   'right-0',
};

const SIDE: Record<DropdownSide, string> = {
  bottom: 'top-full mt-1',
  top:    'bottom-full mb-1',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function DropdownMenu({
  trigger,
  items,
  align     = 'start',
  side      = 'bottom',
  className = '',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen]           = useState(false);
  const [highlightedIdx, setHlIdx]    = useState(-1);
  const containerRef                  = useRef<HTMLDivElement>(null);
  const triggerRef                    = useRef<HTMLButtonElement>(null);
  const itemRefs                      = useRef<(HTMLButtonElement | null)[]>([]);

  const actionItems = items.filter(i => (i.type ?? 'item') === 'item' && !i.disabled);

  function open() {
    setIsOpen(true);
    setHlIdx(-1);
  }
  function close() {
    setIsOpen(false);
    setHlIdx(-1);
    // Return focus to trigger
    triggerRef.current?.focus();
  }
  function activateItem(item: MenuItem) {
    if (item.disabled) return;
    item.onClick?.();
    close();
  }

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHlIdx(-1);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isOpen]);

  // Focus highlighted item
  useEffect(() => {
    if (highlightedIdx >= 0) {
      const allActionIndices = items
        .map((item, i) => ((item.type ?? 'item') === 'item' && !item.disabled ? i : null))
        .filter((i): i is number => i !== null);
      const flatIdx = allActionIndices[highlightedIdx];
      if (flatIdx !== undefined) itemRefs.current[flatIdx]?.focus();
    }
  }, [highlightedIdx, items]);

  // Focus first item when menu opens via keyboard
  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
      // Will focus first item after state update
      setTimeout(() => setHlIdx(0), 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      open();
      setTimeout(() => setHlIdx(actionItems.length - 1), 0);
    }
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHlIdx(prev => (prev + 1) % actionItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHlIdx(prev => (prev - 1 + actionItems.length) % actionItems.length);
        break;
      case 'Escape':
        close();
        break;
      case 'Tab':
        close();
        break;
      case 'Home':
        e.preventDefault();
        setHlIdx(0);
        break;
      case 'End':
        e.preventDefault();
        setHlIdx(actionItems.length - 1);
        break;
    }
  }

  // Inject trigger props via cloneElement
  type TriggerProps = React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLButtonElement> };
  const triggerEl = React.cloneElement(trigger as React.ReactElement<TriggerProps>, {
    ref: triggerRef,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': isOpen,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      (trigger as React.ReactElement<TriggerProps>).props.onClick?.(e);
      isOpen ? close() : open();
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      (trigger as React.ReactElement<TriggerProps>).props.onKeyDown?.(e);
      handleTriggerKeyDown(e);
    },
  });

  return (
    <div ref={containerRef} className="relative inline-flex">
      {triggerEl}

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={[
            'absolute z-[var(--ds-z-dropdown)] min-w-[160px]',
            'bg-[var(--ds-bg-raised)] border border-[var(--ds-border-base)]',
            'rounded-lg shadow-lg py-1 outline-none',
            SIDE[side],
            ALIGN[align],
            className,
          ].join(' ')}
          onKeyDown={handleMenuKeyDown}
          tabIndex={-1}
        >
          {items.map((item, index) => {
            const type = item.type ?? 'item';

            if (type === 'separator') {
              return (
                <div
                  key={item.key}
                  role="separator"
                  className="my-1 border-t border-[var(--ds-border-base)]"
                />
              );
            }

            if (type === 'label') {
              return (
                <div
                  key={item.key}
                  className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] select-none"
                  aria-hidden="true"
                >
                  {item.label}
                </div>
              );
            }

            // action item
            const isHighlighted = actionItems.indexOf(item) === highlightedIdx;
            return (
              <button
                key={item.key}
                ref={el => { itemRefs.current[index] = el; }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                tabIndex={-1}
                onClick={() => activateItem(item)}
                onMouseEnter={() => setHlIdx(actionItems.indexOf(item))}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                  'transition-colors outline-none',
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed'
                    : item.danger
                      ? isHighlighted
                        ? 'bg-[var(--ds-danger-bg)] text-[var(--ds-danger-text)] cursor-pointer'
                        : 'text-[var(--ds-danger-text)] cursor-pointer hover:bg-[var(--ds-danger-bg)]'
                      : isHighlighted
                        ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] cursor-pointer'
                        : 'text-[var(--ds-text-primary)] cursor-pointer hover:bg-[var(--ds-bg-subtle)]',
                ].filter(Boolean).join(' ')}
              >
                {item.icon && (
                  <span className="shrink-0 flex items-center text-[var(--ds-text-muted)]" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
