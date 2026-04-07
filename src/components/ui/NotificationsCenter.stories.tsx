'use client';
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  NotificationsCenter,
  type Notification,
  type NotificationFilter,
} from './NotificationsCenter';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof NotificationsCenter> = {
  title: 'Page Templates/NotificationsCenter',
  component: NotificationsCenter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page notifications center with filter tabs, unread state, per-type icons, dismiss, and mark-all-read. Supports loading skeleton and empty states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationsCenter>;

// ─── Fixture data ─────────────────────────────────────────────────────────────

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'SOC 2 audit due in 7 days',
    body: 'Acme Corp SOC 2 Type II audit is approaching. Ensure all evidence is collected.',
    type: 'warning',
    timestamp: '2 hours ago',
    read: false,
    category: 'Audits',
    action: { label: 'View audit', onClick: () => {} },
  },
  {
    id: 'n2',
    title: 'Vendor onboarded successfully',
    body: 'Beta Systems has been added to monitoring and is now active in your vendor register.',
    type: 'success',
    timestamp: '5 hours ago',
    read: false,
    category: 'Vendors',
  },
  {
    id: 'n3',
    title: 'Critical risk detected',
    body: 'Gamma Tech scored 28/100 on the latest risk assessment — immediate review required.',
    type: 'danger',
    timestamp: '1 day ago',
    read: false,
    category: 'Risk',
    action: { label: 'Review vendor', onClick: () => {} },
  },
  {
    id: 'n4',
    title: 'Framework mapping updated',
    body: 'ISO 27001:2022 control mappings have been refreshed. Review before your next audit.',
    type: 'info',
    timestamp: '2 days ago',
    read: true,
    category: 'Compliance',
  },
  {
    id: 'n5',
    title: 'Report export ready',
    body: 'Your Q1 Vendor Risk Summary report is available for download.',
    type: 'success',
    timestamp: '3 days ago',
    read: true,
    category: 'Reports',
    action: { label: 'Download', onClick: () => {} },
  },
  {
    id: 'n6',
    title: 'Slack integration error',
    body: 'Webhook returned 401 Unauthorized. Check your API credentials in Integrations.',
    type: 'danger',
    timestamp: '4 days ago',
    read: true,
    category: 'Integrations',
  },
  {
    id: 'n7',
    title: 'New questionnaire response',
    body: 'Delta Inc has submitted their annual security questionnaire. Review and score it.',
    type: 'info',
    timestamp: '5 days ago',
    read: true,
    category: 'Vendors',
    action: { label: 'Review response', onClick: () => {} },
  },
  {
    id: 'n8',
    title: 'Audit evidence accepted',
    body: 'All uploaded evidence for the PCI DSS audit has been accepted by the auditor.',
    type: 'success',
    timestamp: '1 week ago',
    read: true,
    category: 'Audits',
  },
];

// ─── Interactive wrapper ──────────────────────────────────────────────────────

function InteractiveNotificationsCenter({
  initialNotifications,
  initialFilter = 'all',
}: {
  initialNotifications: Notification[];
  initialFilter?: NotificationFilter;
}) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<NotificationFilter>(initialFilter);

  function handleMarkRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function handleMarkAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleDismiss(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function handleClearAll() {
    setNotifications([]);
  }

  return (
    <div className="h-screen bg-[var(--ds-bg-subtle)] flex items-stretch justify-center">
      <div
        className="w-full max-w-xl bg-[var(--ds-bg-surface)] border-x border-[var(--ds-border-base)] flex flex-col"
        style={{ minHeight: '100vh' }}
      >
        <NotificationsCenter
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onDismiss={handleDismiss}
          onClearAll={handleClearAll}
          filter={filter}
          onFilterChange={setFilter}
          loading={false}
        />
      </div>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <InteractiveNotificationsCenter initialNotifications={SAMPLE_NOTIFICATIONS} />
  ),
};

export const AllRead: Story = {
  name: 'All Read',
  render: () => (
    <InteractiveNotificationsCenter
      initialNotifications={SAMPLE_NOTIFICATIONS.map(n => ({ ...n, read: true }))}
    />
  ),
};

export const Empty: Story = {
  name: 'Empty',
  render: () => (
    <InteractiveNotificationsCenter initialNotifications={[]} />
  ),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <div className="h-screen bg-[var(--ds-bg-subtle)] flex items-stretch justify-center">
      <div className="w-full max-w-xl bg-[var(--ds-bg-surface)] border-x border-[var(--ds-border-base)] flex flex-col" style={{ minHeight: '100vh' }}>
        <NotificationsCenter
          notifications={[]}
          onMarkRead={() => {}}
          onMarkAllRead={() => {}}
          onDismiss={() => {}}
          onClearAll={() => {}}
          filter="all"
          onFilterChange={() => {}}
          loading={true}
        />
      </div>
    </div>
  ),
};
