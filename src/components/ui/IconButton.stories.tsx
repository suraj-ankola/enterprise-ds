import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  PencilIcon, TrashIcon, CopyIcon, DownloadIcon, ArrowsOutIcon,
  DotsThreeIcon, BellIcon, GearIcon, MagnifyingGlassIcon,
  XIcon, CheckIcon, ShareNetworkIcon, ArrowClockwiseIcon,
} from '@phosphor-icons/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Core/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'outline'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Physical size — controls hit area and icon scale',
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Border radius — square (rounded-lg) or circle (rounded-full)',
    },
    loading: {
      control: 'boolean',
      description: 'Swaps the icon for a Spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    'aria-label': {
      control: 'text',
      description: 'Required accessible label describing the action',
    },
    icon: {
      control: false,
      description: 'The icon to display — any React node',
    },
  },
  args: {
    variant: 'ghost',
    size: 'md',
    shape: 'square',
    loading: false,
    disabled: false,
    'aria-label': 'Edit',
    icon: <PencilIcon size={16} />,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Icon-only button for toolbar actions, table row controls, and inline actions. 5 variants, 4 sizes, square or circle shape. Always requires `aria-label`. Loading state swaps icon for Spinner.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', icon: <ShareNetworkIcon size={16} />, 'aria-label': 'Share' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', icon: <DownloadIcon size={16} />, 'aria-label': 'Download' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', icon: <PencilIcon size={16} />, 'aria-label': 'Edit' },
};

export const Outline: Story = {
  args: { variant: 'outline', icon: <GearIcon size={16} />, 'aria-label': 'Settings' },
};

export const Danger: Story = {
  args: { variant: 'danger', icon: <TrashIcon size={16} />, 'aria-label': 'Delete' },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const ExtraSmall: Story = {
  args: { size: 'xs', icon: <XIcon size={12} weight="bold" />, 'aria-label': 'Close' },
};

export const Small: Story = {
  args: { size: 'sm', icon: <PencilIcon size={14} />, 'aria-label': 'Edit' },
};

export const Medium: Story = {
  args: { size: 'md', icon: <PencilIcon size={16} />, 'aria-label': 'Edit' },
};

export const Large: Story = {
  args: { size: 'lg', icon: <PencilIcon size={18} />, 'aria-label': 'Edit' },
};

// ─── Shapes ───────────────────────────────────────────────────────────────────

export const Square: Story = {
  args: { shape: 'square', variant: 'secondary', icon: <BellIcon size={16} />, 'aria-label': 'Notifications' },
};

export const Circle: Story = {
  args: { shape: 'circle', variant: 'secondary', icon: <BellIcon size={16} />, 'aria-label': 'Notifications' },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, variant: 'primary', 'aria-label': 'Loading' },
};

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Disabled action' },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] space-y-6">
      {(['primary', 'secondary', 'ghost', 'outline', 'danger'] as const).map(v => (
        <div key={v} className="flex items-center gap-4">
          <span className="text-xs text-[var(--ds-text-muted)] w-20 shrink-0">{v}</span>
          <IconButton icon={<PencilIcon size={16} />} aria-label="Edit"     variant={v} />
          <IconButton icon={<TrashIcon  size={16} />} aria-label="Delete"   variant={v} />
          <IconButton icon={<CopyIcon   size={16} />} aria-label="Copy"     variant={v} />
          <IconButton icon={<GearIcon   size={16} />} aria-label="Settings" variant={v} />
          <IconButton icon={<PencilIcon size={16} />} aria-label="Disabled" variant={v} disabled />
          <IconButton icon={<ArrowClockwiseIcon size={16} />} aria-label="Loading" variant={v} loading />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
        <div key={s} className="flex flex-col items-center gap-2">
          <IconButton icon={<PencilIcon />} aria-label="Edit" size={s} variant="secondary" />
          <span className="text-xs text-[var(--ds-text-muted)]">{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <IconButton icon={<BellIcon size={16} />} aria-label="Notifications" shape="square" variant="secondary" />
        <span className="text-xs text-[var(--ds-text-muted)]">square</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton icon={<BellIcon size={16} />} aria-label="Notifications" shape="circle" variant="secondary" />
        <span className="text-xs text-[var(--ds-text-muted)]">circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton icon={<MagnifyingGlassIcon size={16} />} aria-label="Search" shape="circle" variant="primary" />
        <span className="text-xs text-[var(--ds-text-muted)]">circle primary</span>
      </div>
    </div>
  ),
};

export const ToolbarUsage: Story = {
  name: 'Toolbar — DataGrid row actions',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        {['Acme Corp', 'GlobalSys', 'DataVault'].map(name => (
          <div key={name} className="flex items-center justify-between px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0 hover:bg-[var(--ds-bg-subtle)] group">
            <span className="text-sm font-medium text-[var(--ds-text-primary)]">{name}</span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconButton icon={<ArrowsOutIcon   size={14} />} aria-label="View"   size="sm" variant="ghost" />
              <IconButton icon={<PencilIcon       size={14} />} aria-label="Edit"   size="sm" variant="ghost" />
              <IconButton icon={<CopyIcon         size={14} />} aria-label="Copy"   size="sm" variant="ghost" />
              <IconButton icon={<TrashIcon        size={14} />} aria-label="Delete" size="sm" variant="danger" />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--ds-text-muted)]">Hover a row to reveal actions.</p>
    </div>
  ),
};

export const HeaderActions: Story = {
  name: 'Header bar actions',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendor Register</p>
        <div className="flex items-center gap-1">
          <IconButton icon={<MagnifyingGlassIcon size={16} />} aria-label="Search" variant="ghost" />
          <IconButton icon={<DownloadIcon        size={16} />} aria-label="Export" variant="ghost" />
          <IconButton icon={<DotsThreeIcon       size={16} weight="bold" />} aria-label="More options" variant="ghost" />
        </div>
      </div>
    </div>
  ),
};

export const CloseButtons: Story = {
  name: 'Close / dismiss buttons',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] flex gap-4 items-center">
      <IconButton icon={<XIcon size={14} weight="bold" />} aria-label="Close modal"   size="sm" variant="ghost" shape="circle" />
      <IconButton icon={<XIcon size={14} weight="bold" />} aria-label="Close toast"   size="xs" variant="ghost" />
      <IconButton icon={<CheckIcon size={14} weight="bold" />} aria-label="Confirm"   size="sm" variant="primary" shape="circle" />
    </div>
  ),
};
