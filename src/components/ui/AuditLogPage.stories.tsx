import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AuditLogPage, AuditEntry, AuditSeverity } from './AuditLogPage';

const meta: Meta<typeof AuditLogPage> = {
  title: 'Page Templates/AuditLogPage',
  component: AuditLogPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Enterprise audit log page with severity filtering, full-text search, expandable row details, and CSV export. Use the Playground story to interact with filtering.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AuditLogPage>;

// ─── Sample data ──────────────────────────────────────────────────────────────

const SAMPLE_ENTRIES: AuditEntry[] = [
  {
    id: '1',
    actor: { name: 'Elena Vasquez', email: 'elena.vasquez@company.com' },
    action: 'Updated organisation settings',
    resource: 'Organisation',
    resourceId: 'org_01HXYZ',
    details: 'Changed SSO enforcement to required for all users.',
    timestamp: '2026-04-07 09:14:22 UTC',
    ip: '203.0.113.42',
    severity: 'warning',
  },
  {
    id: '2',
    actor: { name: 'James Thornton', email: 'james.thornton@company.com' },
    action: 'Exported user list',
    resource: 'Users',
    resourceId: undefined,
    details: 'Full member export including emails and roles.',
    timestamp: '2026-04-07 08:55:01 UTC',
    ip: '198.51.100.7',
    severity: 'info',
  },
  {
    id: '3',
    actor: { name: 'System', email: 'system@company.com' },
    action: 'Failed login attempt (5× in 2 min)',
    resource: 'Auth',
    resourceId: 'user_priya',
    details: 'Account temporarily locked after repeated failed password attempts.',
    timestamp: '2026-04-07 08:31:45 UTC',
    ip: '192.0.2.15',
    severity: 'critical',
  },
  {
    id: '4',
    actor: { name: 'Carlos Ruiz', email: 'carlos.ruiz@company.com' },
    action: 'Created API key',
    resource: 'API Keys',
    resourceId: 'key_prod_c8f2',
    details: 'Production API key created with read/write scope.',
    timestamp: '2026-04-07 07:48:33 UTC',
    ip: '203.0.113.88',
    severity: 'warning',
  },
  {
    id: '5',
    actor: { name: 'Elena Vasquez', email: 'elena.vasquez@company.com' },
    action: 'Invited new member',
    resource: 'Users',
    resourceId: 'invite_sophie',
    details: 'Invitation sent to sophie.dubois@company.com with Editor role.',
    timestamp: '2026-04-06 17:22:10 UTC',
    ip: '203.0.113.42',
    severity: 'info',
  },
  {
    id: '6',
    actor: { name: 'Fatima Al-Hassan', email: 'fatima.alhassan@company.com' },
    action: 'Updated payment method',
    resource: 'Billing',
    resourceId: 'pm_stripe_4242',
    details: 'Replaced card ending 9999 with card ending 4242.',
    timestamp: '2026-04-06 14:05:57 UTC',
    ip: '198.51.100.99',
    severity: 'info',
  },
  {
    id: '7',
    actor: { name: 'System', email: 'system@company.com' },
    action: 'Deleted audit log retention policy',
    resource: 'Settings',
    resourceId: 'policy_retention',
    details: 'Retention policy removed — logs will now be kept indefinitely.',
    timestamp: '2026-04-06 11:11:00 UTC',
    ip: undefined,
    severity: 'critical',
  },
  {
    id: '8',
    actor: { name: 'Tom Nakamura', email: 'tom.nakamura@company.com' },
    action: 'Viewed sensitive report',
    resource: 'Reports',
    resourceId: 'rpt_q1_2026',
    timestamp: '2026-04-06 09:30:18 UTC',
    ip: '203.0.113.55',
    severity: 'info',
  },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [search, setSearch] = useState('');
    const [severity, setSeverity] = useState<AuditSeverity | ''>('');
    const [actor, setActor] = useState('');

    return (
      <AuditLogPage
        entries={SAMPLE_ENTRIES}
        loading={false}
        totalCount={SAMPLE_ENTRIES.length}
        onExport={() => alert('Exporting CSV…')}
        filters={{
          searchValue: search,
          severityFilter: severity,
          actorFilter: actor,
          onSearchChange: setSearch,
          onSeverityChange: setSeverity,
          onActorChange: setActor,
        }}
      />
    );
  },
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <AuditLogPage
      entries={[]}
      loading={true}
      totalCount={0}
      onExport={() => {}}
      filters={{
        searchValue: '',
        severityFilter: '',
        actorFilter: '',
        onSearchChange: () => {},
        onSeverityChange: () => {},
        onActorChange: () => {},
      }}
    />
  ),
};

// ─── Filtered by severity ─────────────────────────────────────────────────────

export const FilteredByCritical: Story = {
  name: 'Filtered — Critical only',
  render: () => {
    const [search, setSearch] = useState('');
    const [severity, setSeverity] = useState<AuditSeverity | ''>('critical');
    const [actor, setActor] = useState('');

    return (
      <AuditLogPage
        entries={SAMPLE_ENTRIES}
        loading={false}
        totalCount={SAMPLE_ENTRIES.length}
        onExport={() => alert('Exporting CSV…')}
        filters={{
          searchValue: search,
          severityFilter: severity,
          actorFilter: actor,
          onSearchChange: setSearch,
          onSeverityChange: setSeverity,
          onActorChange: setActor,
        }}
      />
    );
  },
};
