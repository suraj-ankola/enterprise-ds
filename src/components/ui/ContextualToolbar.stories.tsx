import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContextualToolbar, FloatingContextualToolbar, type ToolbarEntry } from './ContextualToolbar';
import {
  PencilSimpleIcon,
  TrashIcon,
  CopyIcon,
  ArchiveIcon,
  LinkIcon,
  DownloadSimpleIcon,
} from '@phosphor-icons/react';

const meta: Meta<typeof ContextualToolbar> = {
  title: 'Patterns/ContextualToolbar',
  component: ContextualToolbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A compact floating action bar that appears in response to a selection or hover event. Items support icons, labels, a danger variant, and disabled state. A divider entry `{ type: "divider" }` adds a vertical separator. The `FloatingContextualToolbar` variant positions itself absolutely at given `top`/`left` coordinates (e.g. for rich text selection). Presses Escape to dismiss via `onDismiss`.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    visible:   { control: { type: 'boolean' } },
    position:  { control: { type: 'radio' }, options: ['top', 'bottom'] },
    items:     { control: false },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    visible:  true,
    position: 'top',
  },
};
export default meta;
type Story = StoryObj<typeof ContextualToolbar>;

const ITEMS: ToolbarEntry[] = [
  { id: 'edit',    label: 'Edit',    icon: <PencilSimpleIcon size={13} />, onClick: () => alert('edit')    },
  { id: 'copy',    label: 'Copy',    icon: <CopyIcon         size={13} />, onClick: () => alert('copy')    },
  { id: 'link',    label: 'Copy link', icon: <LinkIcon       size={13} />, onClick: () => alert('link')    },
  { type: 'divider' },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon      size={13} />, onClick: () => alert('archive') },
  { id: 'delete',  label: 'Delete',  icon: <TrashIcon        size={13} />, variant: 'danger', onClick: () => alert('delete') },
];

export const Playground: Story = {
  render: (args) => (
    <div className="flex items-center justify-center h-24">
      <ContextualToolbar {...args} items={ITEMS} />
    </div>
  ),
};

export const SelectionTrigger: Story = {
  name: 'Triggered by row selection',
  render: () => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const rows = [
      { id: 'r1', name: 'Acme Corp',  tier: 'Critical' },
      { id: 'r2', name: 'Globex Inc', tier: 'High'     },
      { id: 'r3', name: 'Initech',    tier: 'Medium'   },
    ];

    function toggle(id: string) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }

    const selCount = selectedIds.size;
    const toolbarItems: ToolbarEntry[] = [
      { id: 'export',  label: `Export ${selCount}`, icon: <DownloadSimpleIcon size={13} />, onClick: () => {} },
      { id: 'archive', label: 'Archive',             icon: <ArchiveIcon       size={13} />, onClick: () => {} },
      { type: 'divider' },
      { id: 'delete',  label: 'Delete',              icon: <TrashIcon         size={13} />, variant: 'danger', onClick: () => setSelectedIds(new Set()) },
    ];

    return (
      <div className="space-y-3">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          {rows.map(row => (
            <label key={row.id} className="flex items-center gap-3 px-4 py-3 border-b border-[var(--ds-border-base)] last:border-0 hover:bg-[var(--ds-bg-subtle)] cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.has(row.id)}
                onChange={() => toggle(row.id)}
                className="h-4 w-4 rounded accent-[var(--ds-brand-600)]"
              />
              <span className="text-sm text-[var(--ds-text-primary)]">{row.name}</span>
              <span className="ml-auto text-xs text-[var(--ds-text-muted)]">{row.tier}</span>
            </label>
          ))}
        </div>

        {selCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--ds-text-muted)]">{selCount} selected</span>
            <ContextualToolbar
              visible
              items={toolbarItems}
              onDismiss={() => setSelectedIds(new Set())}
            />
          </div>
        )}
        {selCount === 0 && (
          <p className="text-xs text-[var(--ds-text-muted)]">Select rows to see the toolbar</p>
        )}
      </div>
    );
  },
};

export const WithDividers: Story = {
  name: 'With dividers',
  render: () => (
    <div className="flex items-center justify-center h-20">
      <ContextualToolbar
        visible
        items={[
          { id: 'edit',   label: 'Edit',   icon: <PencilSimpleIcon size={13} />, onClick: () => {} },
          { id: 'copy',   label: 'Copy',   icon: <CopyIcon         size={13} />, onClick: () => {} },
          { type: 'divider' },
          { id: 'export', label: 'Export', icon: <DownloadSimpleIcon size={13} />, onClick: () => {} },
          { type: 'divider' },
          { id: 'delete', label: 'Delete', icon: <TrashIcon size={13} />, variant: 'danger', onClick: () => {} },
        ]}
      />
    </div>
  ),
};
