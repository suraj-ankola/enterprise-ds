import type { Meta, StoryObj } from '@storybook/react';
import { InlineActions, type ActionEntry } from './InlineActions';
import {
  PencilSimpleIcon,
  TrashIcon,
  ArchiveIcon,
  CopyIcon,
  EyeIcon,
  DownloadSimpleIcon,
  ShareNetworkIcon,
} from '@phosphor-icons/react';

const meta: Meta<typeof InlineActions> = {
  title: 'Patterns/InlineActions',
  component: InlineActions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Row-level action menu for tables and lists. Renders up to `maxVisible` actions as icon buttons and collapses the rest into a three-dot dropdown menu. Supports a `danger` variant for destructive actions and divider entries `{ type: "divider" }`. Two dot icon orientations: horizontal and vertical.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    maxVisible: {
      description: 'Number of quick-action icon buttons shown before collapsing to a menu (0 = all in menu)',
      control: { type: 'number', min: 0, max: 5 },
    },
    iconVariant: {
      description: 'Orientation of the overflow trigger icon',
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    menuPlacement: {
      description: 'Dropdown menu placement',
      control: { type: 'select' },
      options: ['bottom-end', 'bottom-start', 'top-end'],
    },
    showLabels: { control: { type: 'boolean' } },
    size:       { control: { type: 'radio' }, options: ['sm', 'md'] },
    actions:    { control: false },
  },
  args: {
    maxVisible:    0,
    iconVariant:   'horizontal',
    menuPlacement: 'bottom-end',
    showLabels:    false,
    size:          'sm',
  },
};
export default meta;
type Story = StoryObj<typeof InlineActions>;

const ACTIONS: ActionEntry[] = [
  { id: 'view',    label: 'View',    icon: <EyeIcon            size={14} />, onClick: () => alert('view')    },
  { id: 'edit',    label: 'Edit',    icon: <PencilSimpleIcon   size={14} />, onClick: () => alert('edit')    },
  { id: 'copy',    label: 'Duplicate', icon: <CopyIcon         size={14} />, onClick: () => alert('copy')    },
  { id: 'export',  label: 'Export',  icon: <DownloadSimpleIcon size={14} />, onClick: () => alert('export')  },
  { type: 'divider' },
  { id: 'archive', label: 'Archive', icon: <ArchiveIcon        size={14} />, onClick: () => alert('archive') },
  { id: 'delete',  label: 'Delete',  icon: <TrashIcon          size={14} />, variant: 'danger', onClick: () => alert('delete') },
];

export const Playground: Story = {
  args: { actions: ACTIONS },
};

export const AllInMenu: Story = {
  name: 'All actions in menu (default)',
  render: () => (
    <div className="flex justify-center p-4">
      <InlineActions actions={ACTIONS} />
    </div>
  ),
};

export const TwoVisible: Story = {
  name: '2 visible quick actions + overflow',
  render: () => (
    <div className="flex justify-center p-4">
      <InlineActions actions={ACTIONS} maxVisible={2} showLabels />
    </div>
  ),
};

export const InTable: Story = {
  name: 'In context — table rows',
  render: () => {
    const rows = [
      { id: 'r1', name: 'Acme Corp',  tier: 'Critical' },
      { id: 'r2', name: 'Globex Inc', tier: 'High'     },
      { id: 'r3', name: 'Initech',    tier: 'Medium'   },
    ];

    return (
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--ds-text-muted)]">Vendor</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-[var(--ds-text-muted)]">Tier</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-[var(--ds-text-muted)] w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="group border-b border-[var(--ds-border-base)] last:border-0 hover:bg-[var(--ds-bg-subtle)]">
                <td className="px-4 py-2.5 font-medium text-[var(--ds-text-primary)]">{row.name}</td>
                <td className="px-4 py-2.5 text-[var(--ds-text-muted)]">{row.tier}</td>
                <td className="px-4 py-2.5">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <InlineActions
                      actions={[
                        { id: 'edit',    label: 'Edit',    icon: <PencilSimpleIcon size={13} />, onClick: () => alert(`edit ${row.name}`)   },
                        { id: 'share',   label: 'Share',   icon: <ShareNetworkIcon size={13} />, onClick: () => alert(`share ${row.name}`)  },
                        { type: 'divider' },
                        { id: 'delete',  label: 'Delete',  icon: <TrashIcon        size={13} />, variant: 'danger', onClick: () => alert(`delete ${row.name}`) },
                      ]}
                      iconVariant="vertical"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
