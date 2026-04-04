import type { Meta, StoryObj } from '@storybook/react';
import {
  ShieldCheckIcon,
  WarningIcon,
  UserPlusIcon,
  LinkSimpleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LockIcon,
  BellIcon,
  ClockIcon,
  FileTextIcon,
  GitCommitIcon,
  ArrowsClockwiseIcon,
} from '@phosphor-icons/react';
import { Timeline, ActivityFeed } from './Timeline';
import type { TimelineItem } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    docs: {
      description: {
        component:
          'Vertical event timeline with icon dots, connector lines, variant colours, badges, timestamps, and an extra content slot. `ActivityFeed` wraps `Timeline` in a card with header, scroll container, and loading state — ideal for dashboard sidebars and audit log panels.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

// ─── Shared data ──────────────────────────────────────────────────────────────

const COMPLIANCE_AUDIT: TimelineItem[] = [
  {
    id: '1',
    icon: <CheckCircleIcon size={14} />,
    variant: 'success',
    title: 'ISO 27001 audit passed',
    description: 'All 114 controls reviewed. 3 minor observations raised, none blocking.',
    timestamp: 'Nov 14, 2025',
    badge: 'Passed',
    badgeVariant: 'success',
  },
  {
    id: '2',
    icon: <FileTextIcon size={14} />,
    variant: 'info',
    title: 'Audit report published',
    description: 'Final report uploaded to the evidence vault. Shared with stakeholders.',
    timestamp: 'Nov 13, 2025',
  },
  {
    id: '3',
    icon: <WarningIcon size={14} />,
    variant: 'warning',
    title: 'Control gap identified',
    description: 'A.9.2.3 — Privileged access provisioning process not fully documented.',
    timestamp: 'Nov 11, 2025',
    badge: 'Gap',
    badgeVariant: 'warning',
    content: (
      <div className="mt-1 text-xs text-[var(--ds-text-muted)] bg-[var(--ds-warning-bg)] border border-[var(--ds-warning-border)] rounded-lg px-3 py-2">
        Assigned to: <span className="font-medium text-[var(--ds-text-primary)]">Priya Mehta</span> · Due: Nov 20, 2025
      </div>
    ),
  },
  {
    id: '4',
    icon: <UserPlusIcon size={14} />,
    variant: 'brand',
    title: 'Auditor assigned',
    description: 'DeloitteTech assigned as lead auditor for this cycle.',
    timestamp: 'Nov 7, 2025',
  },
  {
    id: '5',
    icon: <ClockIcon size={14} />,
    variant: 'default',
    title: 'Audit scheduled',
    description: 'Annual ISO 27001 audit scheduled for 2-week window.',
    timestamp: 'Oct 28, 2025',
  },
];

const INCIDENT_FEED: TimelineItem[] = [
  {
    id: 'inc-1',
    icon: <XCircleIcon size={14} />,
    variant: 'danger',
    title: 'P1 incident opened — Auth service degraded',
    description: 'Login failure rate at 18%. Affecting 2,400 active sessions.',
    timestamp: '14 min ago',
    badge: 'P1 · Active',
    badgeVariant: 'danger',
  },
  {
    id: 'inc-2',
    icon: <BellIcon size={14} />,
    variant: 'warning',
    title: 'PagerDuty alert triggered',
    description: 'auth-svc p95 latency exceeded 800ms threshold for 3 consecutive minutes.',
    timestamp: '16 min ago',
  },
  {
    id: 'inc-3',
    icon: <ArrowsClockwiseIcon size={14} />,
    variant: 'info',
    title: 'Auto-rollback initiated',
    description: 'Deployment pipeline rolled back auth-svc to v2.8.4.',
    timestamp: '17 min ago',
  },
  {
    id: 'inc-4',
    icon: <GitCommitIcon size={14} />,
    variant: 'default',
    title: 'Deployment: auth-svc v2.9.0',
    description: 'Deployed by CI pipeline. Commit: feat/oauth-pkce-flow.',
    timestamp: '24 min ago',
  },
];

const VENDOR_ACTIVITY: TimelineItem[] = [
  {
    id: 'v1',
    icon: <ShieldCheckIcon size={14} />,
    variant: 'success',
    title: 'Acme Corp risk score improved',
    description: 'Score dropped from 88 → 72. 3 critical gaps remediated.',
    timestamp: '2h ago',
  },
  {
    id: 'v2',
    icon: <LinkSimpleIcon size={14} />,
    variant: 'brand',
    title: 'Slack webhook integration added',
    description: 'Real-time alerts now forwarded to #compliance-alerts channel.',
    timestamp: '5h ago',
  },
  {
    id: 'v3',
    icon: <LockIcon size={14} />,
    variant: 'warning',
    title: 'DataVault access review overdue',
    description: 'Quarterly access review was due Nov 1. No response from vendor.',
    timestamp: 'Nov 12, 2025',
    badge: 'Overdue',
    badgeVariant: 'warning',
  },
  {
    id: 'v4',
    icon: <UserPlusIcon size={14} />,
    variant: 'default',
    title: 'GlobalSys added to portfolio',
    description: 'New critical vendor onboarded. Initial risk assessment pending.',
    timestamp: 'Nov 10, 2025',
  },
  {
    id: 'v5',
    icon: <CheckCircleIcon size={14} />,
    variant: 'success',
    title: 'SOC 2 report received — CloudEdge',
    description: 'Type II report for period Oct 2024–Sep 2025 added to evidence vault.',
    timestamp: 'Nov 8, 2025',
  },
  {
    id: 'v6',
    icon: <XCircleIcon size={14} />,
    variant: 'danger',
    title: 'NexusIO contract terminated',
    description: 'Vendor removed from portfolio following data handling policy breach.',
    timestamp: 'Nov 5, 2025',
    badge: 'Offboarded',
    badgeVariant: 'danger',
  },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="p-8 max-w-lg bg-[var(--ds-bg-base)]">
      <Timeline items={COMPLIANCE_AUDIT} />
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] grid grid-cols-1 md:grid-cols-3 gap-8">

      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          Compliance audit log
        </p>
        <Timeline items={COMPLIANCE_AUDIT} />
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          Live incident timeline
        </p>
        <Timeline items={INCIDENT_FEED} />
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          Vendor activity
        </p>
        <Timeline items={VENDOR_ACTIVITY} />
      </div>

    </div>
  ),
};

// ─── ActivityFeed ─────────────────────────────────────────────────────────────

export const ActivityFeedStory: Story = {
  name: 'ActivityFeed — Card wrapper',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] grid grid-cols-1 md:grid-cols-2 gap-6">

      <ActivityFeed
        title="Vendor Activity"
        items={VENDOR_ACTIVITY}
        maxHeight={400}
        onViewAll={() => {}}
      />

      <ActivityFeed
        title="Live Incident Feed"
        items={INCIDENT_FEED}
        maxHeight={400}
        onViewAll={() => {}}
      />

    </div>
  ),
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const LoadingState: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <ActivityFeed title="Activity" items={[]} loading />
    </div>
  ),
};

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyFeed: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <ActivityFeed title="Activity" items={[]} />
    </div>
  ),
};

// ─── With content slots ───────────────────────────────────────────────────────

export const WithContentSlots: Story = {
  name: 'With content slots — rich items',
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
      <Timeline
        items={[
          {
            id: '1',
            icon: <XCircleIcon size={14} />,
            variant: 'danger',
            title: 'Integration failure — Salesforce CRM',
            description: 'Webhook delivery failed with 401 Unauthorized.',
            timestamp: '10 min ago',
            badge: 'Action required',
            badgeVariant: 'danger',
            content: (
              <div className="flex gap-2 mt-2">
                <button type="button" className="text-xs px-3 py-1.5 rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors">
                  Reconnect
                </button>
                <button type="button" className="text-xs px-3 py-1.5 rounded-lg border border-[var(--ds-border-base)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] transition-colors">
                  View logs
                </button>
              </div>
            ),
          },
          {
            id: '2',
            icon: <WarningIcon size={14} />,
            variant: 'warning',
            title: 'Compliance gap requires remediation',
            description: 'A.9.2.3 — Privileged access provisioning process not documented.',
            timestamp: '2h ago',
            badge: 'Open',
            badgeVariant: 'warning',
            content: (
              <div className="mt-1 grid grid-cols-2 gap-x-4 text-xs">
                <p className="text-[var(--ds-text-muted)]">Owner</p><p className="text-[var(--ds-text-primary)] font-medium">Priya Mehta</p>
                <p className="text-[var(--ds-text-muted)]">Due date</p><p className="text-[var(--ds-text-primary)] font-medium">Nov 20, 2025</p>
                <p className="text-[var(--ds-text-muted)]">Framework</p><p className="text-[var(--ds-text-primary)] font-medium">ISO 27001</p>
              </div>
            ),
          },
          {
            id: '3',
            icon: <CheckCircleIcon size={14} />,
            variant: 'success',
            title: 'Quarterly vendor review completed',
            description: 'All 12 critical vendors reviewed. 2 escalated for audit.',
            timestamp: 'Nov 14, 2025',
          },
        ]}
      />
    </div>
  ),
};
