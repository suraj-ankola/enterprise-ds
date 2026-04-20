import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlusIcon, DownloadSimpleIcon, ArrowsClockwiseIcon, DotsThreeIcon } from '@phosphor-icons/react';
import { AppBar } from './AppBar';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof AppBar> = {
  title: 'Layout/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    title:     { control: 'text' },
    subtitle:  { control: 'text' },
    bordered:  { control: 'boolean' },
    sticky:    { control: 'boolean' },
    actions:   { control: false },
    breadcrumb:{ control: false },
  },
  args: {
    title:    'Vendor Management',
    bordered: true,
    sticky:   false,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top bar for every application page. Left side holds the page title, optional subtitle, optional breadcrumb, and an optional back arrow. Right side is a free `actions` slot for buttons and menus. Use `bordered` (default on) to visually separate from page content, and `sticky` to pin to the viewport top.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithSubtitle: Story = {
  args: {
    title:    'Vendor Management',
    subtitle: 'Manage and monitor all vendor relationships and compliance status.',
  },
};

// ─── With actions ─────────────────────────────────────────────────────────────

export const WithActions: Story = {
  args: {
    title:   'Vendor Management',
    subtitle: '142 vendors · 12 flagged',
    actions: (
      <>
        <IconButton icon={<ArrowsClockwiseIcon size={16} />} aria-label="Refresh" variant="ghost" size="sm" />
        <IconButton icon={<DownloadSimpleIcon size={16} />} aria-label="Export" variant="ghost" size="sm" />
        <Button variant="primary" size="sm" leftIcon={<PlusIcon size={14} />}>
          Add vendor
        </Button>
      </>
    ),
  },
};

// ─── With breadcrumb ─────────────────────────────────────────────────────────

export const WithBreadcrumb: Story = {
  args: {
    title: 'Acme Corp',
    subtitle: 'Risk score: High · Last reviewed 3 days ago',
    breadcrumb: (
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '#' },
          { label: 'Vendors',   href: '#' },
          { label: 'Acme Corp' },
        ]}
      />
    ),
    actions: (
      <>
        <Button variant="secondary" size="sm">Edit</Button>
        <Button variant="danger"    size="sm">Suspend vendor</Button>
      </>
    ),
  },
};

// ─── With back button ────────────────────────────────────────────────────────

export const WithBackButton: Story = {
  name: 'With back button',
  args: {
    title:    'Acme Corp — Contract #2024-089',
    subtitle: 'Reviewed by Sarah Chen · April 15, 2026',
    onBack:   () => {},
    actions: (
      <>
        <Button variant="secondary" size="sm" leftIcon={<DownloadSimpleIcon size={14} />}>
          Export PDF
        </Button>
        <Button variant="primary" size="sm">
          Approve contract
        </Button>
      </>
    ),
  },
};

// ─── No border ───────────────────────────────────────────────────────────────

export const NoBorder: Story = {
  args: {
    title:    'Dashboard',
    subtitle: 'Good morning, Suraj. Here\'s what\'s happening today.',
    bordered: false,
    actions: (
      <Button variant="primary" size="sm" leftIcon={<PlusIcon size={14} />}>
        New report
      </Button>
    ),
  },
};

// ─── Overflow demo ────────────────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Long title truncation',
  args: {
    title:   'Global Vendor Risk & Compliance Monitoring Dashboard — Q2 2026 Annual Review',
    subtitle: 'Aggregated risk signals across 142 vendors in 18 countries.',
    actions: (
      <IconButton icon={<DotsThreeIcon size={16} />} aria-label="More options" variant="secondary" size="sm" />
    ),
  },
};
