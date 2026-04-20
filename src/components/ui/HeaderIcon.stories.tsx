import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BellIcon, GearIcon, QuestionIcon, MagnifyingGlassIcon, UserIcon } from '@phosphor-icons/react';
import { HeaderIcon, HeaderIconNotification } from './HeaderIcon';
import { Avatar } from './Avatar';

// ─── HeaderIcon ───────────────────────────────────────────────────────────────

const meta: Meta<typeof HeaderIcon> = {
  title: 'Navigation/HeaderIcon',
  component: HeaderIcon,
  tags: ['autodocs'],
  argTypes: {
    active:   { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    icon:     { control: false },
  },
  args: {
    'aria-label': 'Settings',
    active: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Icon button sized for application top bars. Use for settings, help, search toggles, and other header utilities. Pairs with `HeaderIconNotification` for the notification bell pattern.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderIcon>;

export const Default: Story = {
  args: { icon: <GearIcon size={18} />, 'aria-label': 'Settings' },
};

export const Active: Story = {
  args: { icon: <GearIcon size={18} />, 'aria-label': 'Settings', active: true },
};

export const Help: Story = {
  args: { icon: <QuestionIcon size={18} />, 'aria-label': 'Help' },
};

// ─── HeaderIconNotification ───────────────────────────────────────────────────

export const NotificationWithCount: Story = {
  name: 'Notification — with count',
  render: () => (
    <HeaderIconNotification
      icon={<BellIcon size={18} />}
      aria-label="Notifications"
      count={5}
    />
  ),
};

export const NotificationHighCount: Story = {
  name: 'Notification — 99+',
  render: () => (
    <HeaderIconNotification
      icon={<BellIcon size={18} />}
      aria-label="Notifications"
      count={142}
    />
  ),
};

export const NotificationDotOnly: Story = {
  name: 'Notification — dot only',
  render: () => (
    <HeaderIconNotification
      icon={<BellIcon size={18} />}
      aria-label="Notifications"
      showDot
    />
  ),
};

export const NotificationZero: Story = {
  name: 'Notification — no badge (zero)',
  render: () => (
    <HeaderIconNotification
      icon={<BellIcon size={18} />}
      aria-label="Notifications"
      count={0}
    />
  ),
};

// ─── Full header strip ────────────────────────────────────────────────────────

export const HeaderStrip: Story = {
  name: 'Header strip example',
  render: () => (
    <div className="flex items-center gap-1 px-3 py-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl w-fit">
      <HeaderIcon icon={<MagnifyingGlassIcon size={18} />} aria-label="Search" />
      <HeaderIconNotification icon={<BellIcon size={18} />} aria-label="Notifications" count={7} />
      <HeaderIcon icon={<GearIcon size={18} />} aria-label="Settings" />
      <HeaderIcon icon={<QuestionIcon size={18} />} aria-label="Help" />
      <div className="w-px h-5 bg-[var(--ds-border-base)] mx-1" />
      <Avatar initials="SN" size="sm" />
    </div>
  ),
};
