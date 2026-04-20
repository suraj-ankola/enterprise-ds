import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  HouseIcon, ChartBarIcon, UsersIcon, ShieldCheckIcon,
  GearIcon, FileTextIcon, BellIcon,
} from '@phosphor-icons/react';
import { NavLinkIcon } from './NavItem';

const meta: Meta<typeof NavLinkIcon> = {
  title: 'Navigation/NavLinkIcon',
  component: NavLinkIcon,
  tags: ['autodocs'],
  argTypes: {
    label:    { control: 'text' },
    active:   { control: 'boolean' },
    disabled: { control: 'boolean' },
    badge:    { control: 'text' },
    icon:     { control: false },
  },
  args: {
    label:    'Vendors',
    active:   false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Icon + label navigation item for expanded sidebars and nav drawers. Supports a notification badge. Active state uses brand colour tokens.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavLinkIcon>;

export const Default: Story = {
  args: { icon: <UsersIcon size={18} /> },
};

export const Active: Story = {
  args: { icon: <UsersIcon size={18} />, active: true },
};

export const WithBadge: Story = {
  args: { icon: <BellIcon size={18} />, label: 'Notifications', badge: 12 },
};

export const ActiveWithBadge: Story = {
  args: { icon: <BellIcon size={18} />, label: 'Notifications', badge: 12, active: true },
};

export const HighCount: Story = {
  name: 'Badge — 99+',
  args: { icon: <BellIcon size={18} />, label: 'Notifications', badge: '99+' },
};

export const Disabled: Story = {
  args: { icon: <UsersIcon size={18} />, disabled: true },
};

export const FullSidebar: Story = {
  name: 'Full sidebar example',
  render: () => {
    const sections = [
      {
        label: 'Main',
        items: [
          { key: 'home',       label: 'Dashboard',  icon: <HouseIcon size={18} />,        active: true },
          { key: 'vendors',    label: 'Vendors',    icon: <UsersIcon size={18} />,         badge: 3 },
          { key: 'compliance', label: 'Compliance', icon: <ShieldCheckIcon size={18} /> },
          { key: 'reports',    label: 'Reports',    icon: <ChartBarIcon size={18} /> },
        ],
      },
      {
        label: 'Resources',
        items: [
          { key: 'docs',       label: 'Documents',  icon: <FileTextIcon size={18} /> },
          { key: 'alerts',     label: 'Alerts',     icon: <BellIcon size={18} />,          badge: 12 },
        ],
      },
    ];

    return (
      <div className="flex flex-col gap-2 w-56 p-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavLinkIcon
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  active={(item as { active?: boolean }).active}
                  badge={(item as { badge?: number }).badge}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="mt-auto pt-2 border-t border-[var(--ds-border-base)]">
          <NavLinkIcon icon={<GearIcon size={18} />} label="Settings" />
        </div>
      </div>
    );
  },
};
