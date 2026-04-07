import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColumnCustomizer, type ColumnDef } from './ColumnCustomizer';

const meta: Meta<typeof ColumnCustomizer> = {
  title: 'Data Display/ColumnCustomizer',
  component: ColumnCustomizer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop column manager for DataGrids and tables. Supports show/hide toggle, left-pin, and locked (required) columns. Drag rows to reorder. Typically rendered inside a Popover triggered from a toolbar button.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ColumnCustomizer>;

const VENDOR_COLS: ColumnDef[] = [
  { key: 'name',       label: 'Vendor name',    visible: true,  locked: true },
  { key: 'risk_score', label: 'Risk score',      visible: true,  pinned: 'left' },
  { key: 'tier',       label: 'Risk tier',       visible: true  },
  { key: 'framework',  label: 'Framework',       visible: true  },
  { key: 'last_audit', label: 'Last audit',      visible: true  },
  { key: 'contact',    label: 'Contact',         visible: false },
  { key: 'region',     label: 'Region',          visible: false },
  { key: 'created_at', label: 'Date added',      visible: false },
];

export const Playground: Story = {
  render: () => {
    const [cols, setCols] = useState<ColumnDef[]>(VENDOR_COLS);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden shadow-sm">
          <ColumnCustomizer columns={cols} onChange={setCols} />
        </div>
        <p className="mt-3 text-xs text-[var(--ds-text-muted)]">
          Drag rows to reorder · Pin columns · Toggle visibility
        </p>
      </div>
    );
  },
};

export const InPopover: Story = {
  name: 'In context — toolbar trigger',
  render: () => {
    const [cols, setCols] = useState<ColumnDef[]>(VENDOR_COLS);
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
          {/* Toolbar */}
          <div className="px-5 py-3 border-b border-[var(--ds-border-base)] flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendor Register</p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="px-3 py-1.5 text-xs rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] transition-colors"
              >
                Columns ({cols.filter(c => c.visible).length})
              </button>
              {open && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl shadow-xl z-50 overflow-hidden">
                  <ColumnCustomizer columns={cols} onChange={setCols} />
                </div>
              )}
            </div>
          </div>
          {/* Table header preview */}
          <div className="flex items-center gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
            {cols.filter(c => c.visible).map(c => (
              <span key={c.key} className="text-xs font-semibold text-[var(--ds-text-muted)] flex items-center gap-1">
                {c.pinned === 'left' && <span className="text-[var(--ds-brand-500)]">📌</span>}
                {c.label}
              </span>
            ))}
          </div>
          <div className="px-5 py-8 text-center text-xs text-[var(--ds-text-muted)]">
            Table rows would appear here
          </div>
        </div>
      </div>
    );
  },
};
