import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ShieldCheckIcon, WarningIcon, CheckCircleIcon,
  XCircleIcon, TagIcon,
} from '@phosphor-icons/react';
import { Chip, SelectableChip, ChipGroup } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Core/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content of the chip',
    },
    variant: {
      control: 'select',
      options: ['default', 'brand', 'success', 'warning', 'danger'],
      description: 'Colour variant — maps to semantic DS tokens',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Physical size of the chip',
    },
    icon: {
      control: false,
      description: 'Optional leading icon node',
    },
    onRemove: {
      control: false,
      description: 'When provided, adds a dismiss button to the chip',
    },
    removeLabel: {
      control: 'text',
      description: 'aria-label for the remove button',
    },
  },
  args: {
    label: 'ISO 27001',
    variant: 'default',
    size: 'md',
    removeLabel: 'Remove',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compact label / tag for status, metadata, and filter selection. `Chip` is a display element; `SelectableChip` is an interactive toggle (role="checkbox"). Wrap either in `ChipGroup` for consistent gap spacing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Brand: Story = {
  args: { label: 'SOC 2', variant: 'brand' },
};

export const Success: Story = {
  args: { label: 'Compliant', variant: 'success', icon: <CheckCircleIcon size={12} /> },
};

export const Warning: Story = {
  args: { label: 'Review needed', variant: 'warning', icon: <WarningIcon size={12} /> },
};

export const Danger: Story = {
  args: { label: 'Non-compliant', variant: 'danger', icon: <XCircleIcon size={12} /> },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { label: 'ISO 27001', size: 'sm', variant: 'brand' },
};

export const Medium: Story = {
  args: { label: 'ISO 27001', size: 'md', variant: 'brand' },
};

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  args: { label: 'Tagged', variant: 'default', icon: <TagIcon size={12} /> },
};

// ─── Removable ────────────────────────────────────────────────────────────────

export const Removable: Story = {
  name: 'Removable chips',
  render: () => {
    const [chips, setChips] = useState(['ISO 27001', 'SOC 2', 'GDPR', 'HIPAA', 'PCI DSS']);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
        <ChipGroup>
          {chips.map(c => (
            <Chip
              key={c}
              label={c}
              variant="brand"
              onRemove={() => setChips(prev => prev.filter(x => x !== c))}
              removeLabel={`Remove ${c}`}
            />
          ))}
        </ChipGroup>
        {chips.length === 0 && (
          <p className="text-xs text-[var(--ds-text-muted)] mt-2">All chips removed.</p>
        )}
      </div>
    );
  },
};

// ─── Selectable Chips ─────────────────────────────────────────────────────────

export const SelectableChips: Story = {
  name: 'Selectable — filter chips',
  render: () => {
    const allFrameworks = ['ISO 27001', 'SOC 2', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST CSF'];
    const [selected, setSelected] = useState<Set<string>>(new Set(['ISO 27001']));

    function toggle(f: string) {
      setSelected(prev => {
        const next = new Set(prev);
        next.has(f) ? next.delete(f) : next.add(f);
        return next;
      });
    }

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md space-y-4">
        <p className="text-xs text-[var(--ds-text-muted)]">Filter by framework</p>
        <ChipGroup>
          {allFrameworks.map(f => (
            <SelectableChip
              key={f}
              label={f}
              selected={selected.has(f)}
              onToggle={() => toggle(f)}
            />
          ))}
        </ChipGroup>
        <p className="text-xs text-[var(--ds-text-muted)]">
          Selected: {selected.size === 0 ? 'none' : [...selected].join(', ')}
        </p>
      </div>
    );
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] space-y-4">
      {(['default', 'brand', 'success', 'warning', 'danger'] as const).map(v => (
        <div key={v} className="flex items-center gap-3">
          <span className="text-xs text-[var(--ds-text-muted)] w-20 shrink-0">{v}</span>
          <Chip label="Label" variant={v} />
          <Chip label="With icon" variant={v} icon={<TagIcon size={12} />} />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex items-center gap-4">
      {(['sm', 'md'] as const).map(s => (
        <div key={s} className="flex flex-col items-start gap-2">
          <Chip label="ISO 27001" size={s} variant="brand" />
          <span className="text-xs text-[var(--ds-text-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── In Context ───────────────────────────────────────────────────────────────

export const InContext: Story = {
  name: 'In context — vendor tags + filters',
  render: () => {
    const riskLevels = ['Critical', 'High', 'Medium', 'Low'];
    const [active, setActive] = useState<Set<string>>(new Set(['Critical', 'High']));
    const toggle = (r: string) =>
      setActive(p => { const n = new Set(p); n.has(r) ? n.delete(r) : n.add(r); return n; });

    const variants: Record<string, 'danger' | 'warning' | 'default' | 'success'> = {
      Critical: 'danger', High: 'warning', Medium: 'default', Low: 'success',
    };

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg space-y-6">
        {/* Selectable risk filter */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--ds-text-muted)]">Risk level filter</p>
          <ChipGroup>
            {riskLevels.map(r => (
              <SelectableChip key={r} label={r} selected={active.has(r)} onToggle={() => toggle(r)} />
            ))}
          </ChipGroup>
        </div>

        {/* Vendor card with display chips */}
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Acme Corp</p>
            <Chip label="Non-compliant" variant="danger" size="sm" icon={<ShieldCheckIcon size={11} />} />
          </div>
          <ChipGroup>
            <Chip label="ISO 27001" variant="brand" size="sm" />
            <Chip label="SOC 2" variant="brand" size="sm" />
            <Chip label="GDPR" variant="default" size="sm" />
          </ChipGroup>
        </div>
      </div>
    );
  },
};
