import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BellIcon, GearIcon, QuestionIcon, MagnifyingGlassIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { Navbar } from './Navbar';
import { HeaderIcon, HeaderIconNotification } from './HeaderIcon';
import { SearchBar } from './SearchBar';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

const NAV_ITEMS = [
  { key: 'dashboard',  label: 'Dashboard',  href: '#', active: true },
  { key: 'vendors',    label: 'Vendors',    href: '#' },
  { key: 'compliance', label: 'Compliance', href: '#' },
  { key: 'reports',    label: 'Reports',    href: '#' },
];

const LOGO = (
  <div className="h-7 w-7 rounded-lg bg-[var(--ds-brand-600)] flex items-center justify-center">
    <ShieldCheckIcon size={16} className="text-white" />
  </div>
);

const ACTIONS = (
  <div className="flex items-center gap-1">
    <HeaderIcon icon={<MagnifyingGlassIcon size={18} />} aria-label="Search" />
    <HeaderIconNotification icon={<BellIcon size={18} />} aria-label="Notifications" count={7} />
    <HeaderIcon icon={<GearIcon size={18} />} aria-label="Settings" />
    <div className="w-px h-5 bg-[var(--ds-border-base)] mx-0.5" />
    <Avatar initials="SN" size="sm" />
  </div>
);

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    appName:  { control: 'text' },
    bordered: { control: 'boolean' },
    sticky:   { control: 'boolean' },
    logo:     { control: false },
    navItems: { control: false },
    search:   { control: false },
    actions:  { control: false },
  },
  args: {
    appName:  'ComplianceIQ',
    bordered: true,
    sticky:   false,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top horizontal navigation bar. Slots: `logo` (left), `appName` (left), `navItems` (left-center), `search` (center-right, flexible width), `actions` (right — icon buttons, avatar, etc.). Use `bordered` to separate from content, `sticky` to pin to viewport.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logo:     LOGO,
    navItems: NAV_ITEMS,
    actions:  ACTIONS,
  },
};

export const WithSearch: Story = {
  args: {
    logo:     LOGO,
    navItems: NAV_ITEMS,
    search:   <SearchBar placeholder="Search vendors, contracts…" shortcut="⌘K" fullWidth />,
    actions:  ACTIONS,
  },
};

export const AppNameOnly: Story = {
  name: 'Logo + app name, no nav links',
  args: {
    logo:     LOGO,
    appName:  'ComplianceIQ',
    actions:  ACTIONS,
  },
};

export const MinimalActions: Story = {
  name: 'Minimal — no nav links',
  args: {
    logo:    LOGO,
    appName: 'ComplianceIQ',
    actions: (
      <div className="flex items-center gap-1">
        <HeaderIconNotification icon={<BellIcon size={18} />} aria-label="Notifications" count={3} />
        <Avatar initials="SN" size="sm" />
      </div>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    logo:     LOGO,
    navItems: NAV_ITEMS,
    actions:  ACTIONS,
    bordered: false,
  },
};

export const ManyNavItems: Story = {
  name: 'Many nav items',
  args: {
    logo: LOGO,
    navItems: [
      { key: 'dashboard',  label: 'Dashboard',  href: '#', active: true },
      { key: 'vendors',    label: 'Vendors',    href: '#' },
      { key: 'compliance', label: 'Compliance', href: '#' },
      { key: 'contracts',  label: 'Contracts',  href: '#' },
      { key: 'reports',    label: 'Reports',    href: '#' },
      { key: 'audit',      label: 'Audit log',  href: '#' },
      { key: 'settings',   label: 'Settings',   href: '#', disabled: true },
    ],
    actions: ACTIONS,
  },
};
