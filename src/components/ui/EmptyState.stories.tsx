import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MagnifyingGlassIcon,
  FolderOpenIcon,
  ShieldWarningIcon,
  WifiSlashIcon,
  LockIcon,
  BellSlashIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardTextIcon,
  ArrowClockwiseIcon,
} from '@phosphor-icons/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary heading — describes what is absent',
    },
    description: {
      control: 'text',
      description: 'Supporting text with context or next steps',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls icon wrapper, type scale, and max-width',
    },
    centered: {
      control: 'boolean',
      description: 'Constrains width and centres in the available space',
    },
    icon: {
      control: false,
      description: 'Icon or illustration — any React node',
    },
    actions: {
      control: false,
      description: 'Primary + optional secondary action buttons',
    },
    footer: {
      control: false,
      description: 'Extra content below actions (links, tips, etc.)',
    },
  },
  args: {
    title: 'No vendors added yet',
    description: 'Add your first vendor to start tracking compliance status, risk scores, and audit history.',
    size: 'md',
    centered: true,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Zero-data placeholder for lists, tables, search results, and error states. Accepts any icon node, a primary + optional secondary action, and an optional footer slot. 3 sizes. Used wherever content is expected but absent.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── With icon and actions ────────────────────────────────────────────────────

export const WithIconAndActions: Story = {
  args: {
    icon: <FolderOpenIcon size={28} />,
    title: 'No vendors added yet',
    description: 'Add your first vendor to start tracking compliance status, risk scores, and audit history.',
    actions: [
      { label: 'Add vendor', onClick: () => {} },
      { label: 'Import CSV', onClick: () => {}, variant: 'secondary' },
    ],
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: <MagnifyingGlassIcon size={24} />,
    title: 'No results found',
    description: 'No vendors match "Globex Corp". Try a different name or clear your filters.',
    actions: [
      { label: 'Clear filters', onClick: () => {}, variant: 'secondary' },
    ],
  },
};

export const AccessRestricted: Story = {
  args: {
    icon: <LockIcon size={24} />,
    title: 'Access restricted',
    description: "You don't have permission to view this section. Contact your workspace administrator.",
    actions: [
      { label: 'Request access', onClick: () => {} },
    ],
  },
};

export const Offline: Story = {
  args: {
    icon: <WifiSlashIcon size={24} />,
    title: "You're offline",
    description: 'Check your internet connection and try again. Recent data is still available from cache.',
    actions: [
      { label: 'Retry', onClick: () => {}, variant: 'secondary' },
    ],
  },
};

export const Error: Story = {
  args: {
    icon: <ShieldWarningIcon size={24} />,
    title: 'Something went wrong',
    description: "We couldn't load your risk data. The team has been notified. Please try again.",
    actions: [
      { label: 'Retry', onClick: () => {}, variant: 'secondary' },
    ],
  },
};

export const AllCaughtUp: Story = {
  args: {
    icon: <BellSlashIcon size={24} />,
    title: 'All caught up',
    description: "You have no unread notifications. We'll alert you when something needs your attention.",
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: {
    size: 'sm',
    icon: <ChartBarIcon size={18} />,
    title: 'No chart data',
    description: 'Apply a date range to load metrics.',
    actions: [{ label: 'Set range', onClick: () => {} }],
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    icon: <UsersIcon size={24} />,
    title: 'No team members',
    description: 'Invite your team to collaborate on compliance reviews and vendor assessments.',
    actions: [
      { label: 'Invite member', onClick: () => {} },
      { label: 'Learn more', onClick: () => {}, variant: 'ghost' },
    ],
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    icon: <FolderOpenIcon size={36} />,
    title: 'Welcome to Compliance Risk',
    description: 'Get started by adding your first vendor. You can import from a CSV, connect an integration, or add them manually.',
    actions: [
      { label: 'Add vendor', onClick: () => {} },
      { label: 'Import CSV', onClick: () => {}, variant: 'secondary' },
    ],
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--ds-border-base)]">

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<ClipboardTextIcon size={24} />}
          title="No audits scheduled"
          description="Schedule your first audit to begin tracking control compliance across your vendor portfolio."
          actions={[{ label: 'Schedule audit', onClick: () => {} }]}
        />
      </div>

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<MagnifyingGlassIcon size={24} />}
          title="No results found"
          description='No vendors match "Globex Corp". Try a different name or clear your filters.'
          actions={[
            { label: 'Clear filters', onClick: () => {}, variant: 'secondary' },
          ]}
        />
      </div>

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<LockIcon size={24} />}
          title="Access restricted"
          description="You don't have permission to view this section. Contact your workspace administrator."
          actions={[
            { label: 'Request access', onClick: () => {} },
          ]}
        />
      </div>

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<WifiSlashIcon size={24} />}
          title="You're offline"
          description="Check your internet connection and try again. Recent data is still available from cache."
          actions={[
            { label: 'Retry', onClick: () => {}, variant: 'secondary' },
          ]}
          footer={<span>Last synced: 2 minutes ago</span>}
        />
      </div>

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<ShieldWarningIcon size={24} />}
          title="Something went wrong"
          description="We couldn't load your risk data. The team has been notified. Please try again."
          actions={[
            { label: 'Retry', onClick: () => {}, variant: 'secondary' },
          ]}
        />
      </div>

      <div className="bg-[var(--ds-bg-surface)] p-4">
        <EmptyState
          icon={<BellSlashIcon size={24} />}
          title="All caught up"
          description="You have no unread notifications. We'll alert you when something needs your attention."
        />
      </div>

    </div>
  ),
};

// ─── In Table Context ─────────────────────────────────────────────────────────

export const InTable: Story = {
  name: 'In context — Table empty state',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--ds-border-base)] flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Vendors</p>
          <div className="flex gap-2">
            <div className="h-8 w-24 rounded-lg bg-[var(--ds-bg-subtle)] animate-pulse" />
            <div className="h-8 w-20 rounded-lg bg-[var(--ds-brand-100)] animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-4 px-4 py-2 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
          {['Vendor', 'Risk level', 'Last audit', 'Status'].map(h => (
            <p key={h} className="text-xs font-semibold text-[var(--ds-text-muted)]">{h}</p>
          ))}
        </div>
        <EmptyState
          size="sm"
          icon={<MagnifyingGlassIcon size={20} />}
          title="No vendors match your filters"
          description="Try adjusting or clearing your active filters."
          actions={[
            { label: 'Clear filters', onClick: () => {}, variant: 'ghost' },
          ]}
          className="py-16"
        />
      </div>
    </div>
  ),
};

// ─── Without icon ─────────────────────────────────────────────────────────────

export const NoIcon: Story = {
  args: {
    title: 'No activity yet',
    description: 'Events will appear here as your team takes action on vendors, audits, and risk items.',
    icon: undefined,
  },
};

// ─── With refresh action ──────────────────────────────────────────────────────

export const WithRefresh: Story = {
  args: {
    icon: <ArrowClockwiseIcon size={24} />,
    title: 'Data sync failed',
    description: "We couldn't sync your latest compliance data from the integration. Check the connection and retry.",
    actions: [
      { label: 'Retry sync', onClick: () => {} },
      { label: 'View logs', onClick: () => {}, variant: 'ghost' },
    ],
  },
};
