import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TrashIcon, DownloadSimpleIcon, ArrowRightIcon, TagIcon, LockIcon } from '@phosphor-icons/react';
import { BulkActionsBar } from './BulkActionsBar';

const meta: Meta<typeof BulkActionsBar> = {
  title: 'Data Display/BulkActionsBar',
  component: BulkActionsBar,
  tags: ['autodocs'],
  argTypes: {
    selectedCount: { control: 'number', description: 'Number of currently selected rows' },
    totalCount:    { control: 'number', description: 'Total rows in the list for "X of N" label' },
  },
  args: {
    selectedCount: 3,
    totalCount:    24,
    selectedIds:   ['1', '2', '3'],
  },
  parameters: {
    docs: {
      description: {
        component:
          'Floats above a table/list when one or more rows are selected. Displays selection count, contextual bulk actions, and a clear button. Renders `null` when `selectedCount` is 0 — just drop it in your layout and control it with your selection state.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BulkActionsBar>;

const ACTIONS = [
  { id: 'export', label: 'Export', icon: <DownloadSimpleIcon size={14} />, onClick: (ids: string[]) => alert(`Export: ${ids.join(',')}`) },
  { id: 'assign', label: 'Assign', icon: <ArrowRightIcon size={14} />,    onClick: (ids: string[]) => alert(`Assign: ${ids.join(',')}`) },
  { id: 'delete', label: 'Delete', icon: <TrashIcon size={14} />, variant: 'danger' as const, onClick: (ids: string[]) => alert(`Delete: ${ids.join(',')}`) },
];

export const Default: Story = {
  args: { actions: ACTIONS, onClearSelection: () => {} },
};

export const SingleSelected: Story = {
  args: { selectedCount: 1, totalCount: 24, actions: ACTIONS, onClearSelection: () => {} },
};

export const AllSelected: Story = {
  args: { selectedCount: 24, totalCount: 24, actions: ACTIONS, onClearSelection: () => {} },
};

export const WithManyActions: Story = {
  args: {
    selectedCount: 5,
    totalCount: 50,
    actions: [
      { id: 'export',   label: 'Export',     icon: <DownloadSimpleIcon size={14} />, onClick: () => {} },
      { id: 'tag',      label: 'Tag',         icon: <TagIcon size={14} />,             onClick: () => {} },
      { id: 'lock',     label: 'Lock',        icon: <LockIcon size={14} />,            onClick: () => {} },
      { id: 'assign',   label: 'Assign',      icon: <ArrowRightIcon size={14} />,      onClick: () => {} },
      { id: 'delete',   label: 'Delete',      icon: <TrashIcon size={14} />, variant: 'danger' as const, onClick: () => {} },
    ],
    onClearSelection: () => {},
  },
};

export const Interactive: Story = {
  name: 'In context — vendor table with selection',
  render: () => {
    const vendors = ['Acme Corp', 'GlobalSys', 'DataVault', 'SecureBase', 'CloudTrust'];
    const [selected, setSelected] = useState<Set<string>>(new Set());

    function toggle(id: string) {
      setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
    }
    function toggleAll() {
      setSelected(s => s.size === vendors.length ? new Set() : new Set(vendors.map((_, i) => String(i))));
    }

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-3">
        {/* Table */}
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
            <input type="checkbox" checked={selected.size === vendors.length} onChange={toggleAll} className="rounded" aria-label="Select all" />
            <span className="text-xs font-semibold text-[var(--ds-text-muted)]">Vendor</span>
          </div>
          {vendors.map((name, i) => (
            <div key={i} className={['flex items-center gap-3 px-4 py-3 border-b border-[var(--ds-border-base)] last:border-0 transition-colors', selected.has(String(i)) ? 'bg-[var(--ds-brand-50)]' : 'hover:bg-[var(--ds-bg-subtle)]'].join(' ')}>
              <input type="checkbox" checked={selected.has(String(i))} onChange={() => toggle(String(i))} className="rounded" aria-label={`Select ${name}`} />
              <span className="text-sm text-[var(--ds-text-primary)]">{name}</span>
            </div>
          ))}
        </div>

        {/* Bulk bar */}
        <BulkActionsBar
          selectedCount={selected.size}
          selectedIds={[...selected]}
          totalCount={vendors.length}
          onClearSelection={() => setSelected(new Set())}
          actions={ACTIONS}
        />
      </div>
    );
  },
};
