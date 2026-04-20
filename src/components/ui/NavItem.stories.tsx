import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  HouseIcon, ChartBarIcon, UsersIcon, ShieldCheckIcon,
  GearIcon, FileTextIcon, BellIcon, MagnifyingGlassIcon,
} from '@phosphor-icons/react';
import { NavIcon, NavLinkIcon } from './NavItem';

// ─── NavIcon ──────────────────────────────────────────────────────────────────

const navIconMeta: Meta<typeof NavIcon> = {
  title: 'Navigation/NavIcon',
  component: NavIcon,
  tags: ['autodocs'],
  argTypes: {
    active:   { control: 'boolean' },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
    icon:     { control: false },
  },
  args: {
    label:  'Dashboard',
    active: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Icon-only navigation item for collapsed sidebars or icon rails. Always includes an accessible `label` rendered as `title` attribute. Active state uses brand colour.',
      },
    },
  },
};

export default navIconMeta;
type NavIconStory = StoryObj<typeof NavIcon>;

export const Default: NavIconStory = {
  args: { icon: <HouseIcon size={18} /> },
};

export const Active: NavIconStory = {
  args: { icon: <HouseIcon size={18} />, active: true },
};

export const Disabled: NavIconStory = {
  args: { icon: <HouseIcon size={18} />, disabled: true },
};

export const IconRail: NavIconStory = {
  name: 'Icon rail — collapsed sidebar',
  render: () => {
    const items = [
      { key: 'home',       label: 'Dashboard',  icon: <HouseIcon size={18} />,        active: true },
      { key: 'vendors',    label: 'Vendors',    icon: <UsersIcon size={18} /> },
      { key: 'compliance', label: 'Compliance', icon: <ShieldCheckIcon size={18} /> },
      { key: 'reports',    label: 'Reports',    icon: <ChartBarIcon size={18} /> },
      { key: 'docs',       label: 'Documents',  icon: <FileTextIcon size={18} /> },
    ];
    return (
      <div className="flex flex-col gap-1 w-12 p-1.5 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
        {items.map((item) => (
          <NavIcon key={item.key} icon={item.icon} label={item.label} active={item.active} />
        ))}
        <div className="mt-auto pt-2 border-t border-[var(--ds-border-base)]">
          <NavIcon icon={<GearIcon size={18} />} label="Settings" />
        </div>
      </div>
    );
  },
};
