import type { Meta, StoryObj } from '@storybook/react';
import {
  PencilSimpleIcon, TrashIcon, CopyIcon, ArrowSquareOutIcon,
  DotsThreeVerticalIcon, CaretDownIcon, DownloadSimpleIcon,
  ArchiveIcon, UserIcon, SignOutIcon,
} from '@phosphor-icons/react';
import { Button } from './Button';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component: 'ARIA `role="menu"` dropdown with full keyboard navigation (Arrow · Home · End · Escape · Tab). Trigger is any `ReactElement` — props injected via `cloneElement`. Items support `separator`, `label`, and `danger` types. `align` and `side` control popup placement.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  render: () => (
    <div className="p-8">
      <DropdownMenu
        trigger={<Button variant="secondary">Actions <CaretDownIcon size={14} /></Button>}
        items={[
          { key: 'edit',   label: 'Edit vendor',  icon: <PencilSimpleIcon size={15} />, onClick: () => alert('edit') },
          { key: 'copy',   label: 'Copy ID',       icon: <CopyIcon size={15} />,          onClick: () => alert('copy') },
          { key: 'view',   label: 'Open in new tab', icon: <ArrowSquareOutIcon size={15} /> },
          { key: 'sep-1',  type: 'separator' },
          { key: 'archive',label: 'Archive',       icon: <ArchiveIcon size={15} />,        onClick: () => alert('archive') },
          { key: 'delete', label: 'Delete vendor', icon: <TrashIcon size={15} />, danger: true, onClick: () => alert('delete') },
        ]}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16 p-10 items-start">

      {/* Kebab / icon trigger */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-[var(--ds-text-muted)]">Icon trigger</p>
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="p-1.5 rounded-md text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
              aria-label="Row actions"
            >
              <DotsThreeVerticalIcon size={18} weight="bold" />
            </button>
          }
          items={[
            { key: 'edit',   label: 'Edit',    icon: <PencilSimpleIcon size={15} /> },
            { key: 'export', label: 'Export',  icon: <DownloadSimpleIcon size={15} /> },
            { key: 'sep',    type: 'separator' },
            { key: 'delete', label: 'Delete',  icon: <TrashIcon size={15} />, danger: true },
          ]}
        />
      </div>

      {/* With section labels */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-[var(--ds-text-muted)]">Section labels</p>
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Options <CaretDownIcon size={12} /></Button>}
          items={[
            { key: 'lbl-1',   type: 'label',     label: 'View' },
            { key: 'view',    label: 'Overview',  icon: <ArrowSquareOutIcon size={15} /> },
            { key: 'export',  label: 'Export CSV', icon: <DownloadSimpleIcon size={15} /> },
            { key: 'sep',     type: 'separator' },
            { key: 'lbl-2',   type: 'label',     label: 'Manage' },
            { key: 'edit',    label: 'Edit',      icon: <PencilSimpleIcon size={15} /> },
            { key: 'archive', label: 'Archive',   icon: <ArchiveIcon size={15} /> },
            { key: 'sep2',    type: 'separator' },
            { key: 'delete',  label: 'Delete',    icon: <TrashIcon size={15} />, danger: true },
          ]}
        />
      </div>

      {/* Align end — user menu pattern */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-[var(--ds-text-muted)]">Align end (user menu)</p>
        <DropdownMenu
          align="end"
          trigger={
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[var(--ds-text-primary)] hover:bg-[var(--ds-bg-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]"
            >
              <span className="h-6 w-6 rounded-full bg-[var(--ds-brand-600)] flex items-center justify-center text-xs text-white font-semibold">S</span>
              Suraj
              <CaretDownIcon size={12} className="text-[var(--ds-text-muted)]" />
            </button>
          }
          items={[
            { key: 'profile',  label: 'Profile',      icon: <UserIcon size={15} /> },
            { key: 'settings', label: 'Settings',     icon: <PencilSimpleIcon size={15} /> },
            { key: 'sep',      type: 'separator' },
            { key: 'signout',  label: 'Sign out',     icon: <SignOutIcon size={15} />, danger: true },
          ]}
        />
      </div>

      {/* Disabled items */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-[var(--ds-text-muted)]">Disabled items</p>
        <DropdownMenu
          trigger={<Button variant="secondary" size="sm">Actions <CaretDownIcon size={12} /></Button>}
          items={[
            { key: 'edit',    label: 'Edit vendor',  icon: <PencilSimpleIcon size={15} /> },
            { key: 'approve', label: 'Approve',      icon: <ArchiveIcon size={15} />, disabled: true },
            { key: 'export',  label: 'Export report', icon: <DownloadSimpleIcon size={15} />, disabled: true },
            { key: 'sep',     type: 'separator' },
            { key: 'delete',  label: 'Delete',       icon: <TrashIcon size={15} />, danger: true },
          ]}
        />
      </div>
    </div>
  ),
};
