import React, { createContext, useContext, useId, useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccordionVariant = 'default' | 'flush' | 'card';

export interface AccordionItemDef {
  id:       string;
  trigger:  React.ReactNode;
  content:  React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items:         AccordionItemDef[];
  variant?:      AccordionVariant;
  allowMultiple?: boolean;
  defaultOpen?:  string[];
  /** Controlled open state */
  open?:         string[];
  onOpenChange?: (openIds: string[]) => void;
  className?:    string;
}

// ─── Internal context ─────────────────────────────────────────────────────────

interface AccordionCtx {
  openIds:  Set<string>;
  toggle:   (id: string) => void;
  variant:  AccordionVariant;
  baseId:   string;
}

const Ctx = createContext<AccordionCtx | null>(null);

function useAccordion() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('AccordionItem must be used inside Accordion');
  return ctx;
}

// ─── Variant styles ───────────────────────────────────────────────────────────

const WRAPPER: Record<AccordionVariant, string> = {
  default: 'divide-y divide-[var(--ds-border-base)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden',
  flush:   'divide-y divide-[var(--ds-border-base)]',
  card:    'space-y-2',
};

const ITEM: Record<AccordionVariant, string> = {
  default: 'bg-[var(--ds-bg-surface)]',
  flush:   'bg-transparent',
  card:    'bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden',
};

// ─── AccordionItem ────────────────────────────────────────────────────────────

interface ItemProps {
  item: AccordionItemDef;
}

function AccordionItem({ item }: ItemProps) {
  const { openIds, toggle, variant, baseId } = useAccordion();
  const isOpen     = openIds.has(item.id);
  const triggerId  = `${baseId}-trigger-${item.id}`;
  const contentId  = `${baseId}-content-${item.id}`;

  return (
    <div className={ITEM[variant]}>
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={item.disabled}
          onClick={() => toggle(item.id)}
          className={[
            'w-full flex items-center justify-between gap-3',
            'px-4 py-3 text-left',
            'text-sm font-medium text-[var(--ds-text-primary)]',
            'hover:bg-[var(--ds-bg-subtle)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
            'focus-visible:ring-[var(--ds-brand-500)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-[var(--ds-duration-base)]',
          ].join(' ')}
        >
          <span className="flex-1 min-w-0">{item.trigger}</span>
          <CaretDownIcon
            size={16}
            weight="bold"
            aria-hidden="true"
            className={[
              'shrink-0 text-[var(--ds-text-muted)]',
              'transition-transform duration-[var(--ds-duration-base)]',
              isOpen ? 'rotate-180' : 'rotate-0',
            ].join(' ')}
          />
        </button>
      </h3>

      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="px-4 pb-4 text-sm text-[var(--ds-text-secondary)] leading-relaxed"
      >
        {item.content}
      </div>
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

export function Accordion({
  items,
  variant       = 'default',
  allowMultiple = false,
  defaultOpen   = [],
  open: controlledOpen,
  onOpenChange,
  className     = '',
}: AccordionProps) {
  const baseId = useId();
  const isControlled = controlledOpen !== undefined;

  const [uncontrolledOpen, setUncontrolledOpen] = useState<Set<string>>(
    () => new Set(defaultOpen),
  );

  const openIds = isControlled ? new Set(controlledOpen) : uncontrolledOpen;

  function toggle(id: string) {
    let next: Set<string>;
    if (openIds.has(id)) {
      next = new Set(openIds);
      next.delete(id);
    } else if (allowMultiple) {
      next = new Set(openIds);
      next.add(id);
    } else {
      next = new Set([id]);
    }
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.([...next]);
  }

  return (
    <Ctx.Provider value={{ openIds, toggle, variant, baseId }}>
      <div className={[WRAPPER[variant], className].filter(Boolean).join(' ')}>
        {items.map(item => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </div>
    </Ctx.Provider>
  );
}
