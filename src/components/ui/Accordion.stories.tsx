import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flush', 'card'],
      description: 'Visual container style — default (bordered), flush (dividers only), card (individual cards)',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow more than one panel open at a time',
    },
    defaultOpen: {
      control: false,
      description: 'Array of item IDs open on initial render (uncontrolled)',
    },
    open: {
      control: false,
      description: 'Controlled open state — array of item IDs',
    },
    onOpenChange: {
      control: false,
      description: 'Called with the new array of open IDs when state changes',
    },
    items: {
      control: false,
      description: 'Array of AccordionItemDef — each has id, trigger, content, and optional disabled',
    },
  },
  args: {
    variant: 'default',
    allowMultiple: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible content sections with animated caret indicator. 3 variants (default, flush, card), single or multi-open, controlled/uncontrolled. Keyboard-accessible with ARIA `aria-expanded` + `aria-controls`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// ─── Shared data ──────────────────────────────────────────────────────────────

const frameworkItems = [
  {
    id: 'iso',
    trigger: 'ISO 27001',
    content:
      'ISO/IEC 27001 is an international standard on how to manage information security. It covers people, processes, and technology across 14 control domains. Annual surveillance audits are required to maintain certification.',
  },
  {
    id: 'soc2',
    trigger: 'SOC 2 Type II',
    content:
      'SOC 2 Type II audits verify that your security controls operated effectively over a minimum 6-month period. The five Trust Services Criteria are Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
  },
  {
    id: 'gdpr',
    trigger: 'GDPR',
    content:
      'The General Data Protection Regulation applies to any organisation processing EU personal data. Key obligations include lawful basis for processing, data subject rights, breach notification within 72 hours, and DPA appointments.',
  },
  {
    id: 'hipaa',
    trigger: 'HIPAA',
    content:
      'HIPAA governs the use and disclosure of Protected Health Information (PHI) in the United States. Covered entities and business associates must implement Administrative, Physical, and Technical safeguards.',
  },
];

const riskItems = [
  {
    id: 'critical',
    trigger: '🔴 Critical risks (3)',
    content: (
      <ul className="space-y-1 text-[var(--ds-danger-text)]">
        <li>Unencrypted PII at rest — Acme Corp</li>
        <li>MFA not enforced — DataVault</li>
        <li>SOC 2 report expired — GlobalSys</li>
      </ul>
    ),
  },
  {
    id: 'high',
    trigger: '🟠 High risks (7)',
    content: (
      <ul className="space-y-1">
        <li>Patch SLA exceeded (&gt;30 days) — 4 vendors</li>
        <li>Missing DPA — 3 vendors</li>
      </ul>
    ),
  },
  {
    id: 'medium',
    trigger: '🟡 Medium risks (12)',
    content: (
      <p>12 findings across vendor questionnaire gaps and pending remediation items. Review in the risk register.</p>
    ),
  },
];

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    items: frameworkItems,
    defaultOpen: ['iso'],
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const DefaultVariant: Story = {
  name: 'Variant — default',
  args: {
    variant: 'default',
    items: frameworkItems.slice(0, 3),
  },
};

export const FlushVariant: Story = {
  name: 'Variant — flush',
  args: {
    variant: 'flush',
    items: frameworkItems.slice(0, 3),
  },
};

export const CardVariant: Story = {
  name: 'Variant — card',
  args: {
    variant: 'card',
    items: frameworkItems.slice(0, 3),
  },
};

// ─── Multi-open ───────────────────────────────────────────────────────────────

export const AllowMultiple: Story = {
  name: 'Allow multiple open',
  args: {
    items: frameworkItems,
    allowMultiple: true,
    defaultOpen: ['iso', 'soc2'],
  },
};

// ─── Disabled items ───────────────────────────────────────────────────────────

export const WithDisabled: Story = {
  name: 'Disabled items',
  args: {
    items: [
      ...frameworkItems.slice(0, 2),
      { ...frameworkItems[2], disabled: true },
      frameworkItems[3],
    ],
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg space-y-10">
      {(['default', 'flush', 'card'] as const).map(v => (
        <div key={v} className="space-y-2">
          <p className="text-xs font-medium text-[var(--ds-text-muted)] uppercase tracking-wide">{v}</p>
          <Accordion variant={v} items={frameworkItems.slice(0, 3)} />
        </div>
      ))}
    </div>
  ),
};

// ─── In context ───────────────────────────────────────────────────────────────

export const RiskSummary: Story = {
  name: 'In context — risk summary panel',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
        <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-4">
          Q4 Risk Summary
        </p>
        <Accordion
          variant="flush"
          items={riskItems}
          allowMultiple
          defaultOpen={['critical']}
        />
      </div>
    </div>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  name: 'Controlled open state',
  render: () => {
    const [open, setOpen] = useState<string[]>(['iso']);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg space-y-4">
        <div className="flex gap-2 flex-wrap">
          {frameworkItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setOpen(prev =>
                  prev.includes(item.id)
                    ? prev.filter(id => id !== item.id)
                    : [...prev, item.id],
                )
              }
              className={[
                'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                open.includes(item.id)
                  ? 'bg-[var(--ds-brand-600)] text-white border-[var(--ds-brand-600)]'
                  : 'text-[var(--ds-text-secondary)] border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]',
              ].join(' ')}
            >
              {item.trigger}
            </button>
          ))}
        </div>
        <Accordion
          items={frameworkItems}
          allowMultiple
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    );
  },
};
