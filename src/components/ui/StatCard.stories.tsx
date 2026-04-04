import type { Meta, StoryObj } from '@storybook/react';
import {
  ShieldCheckIcon,
  WarningIcon,
  ClockIcon,
  UsersIcon,
  ArrowUpRightIcon,
  CurrencyDollarIcon,
  BugIcon,
  CheckCircleIcon,
  CloudIcon,
  LightningIcon,
} from '@phosphor-icons/react';
import { StatCard, StatCardGroup } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
  parameters: {
    docs: {
      description: {
        component:
          'KPI card for dashboards. Displays a metric value, delta badge with trend icon, optional sparkline, and icon. Supports loading skeleton state and click-to-navigate. Compose multiple cards with `StatCardGroup` for responsive grid layout.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
      <StatCard
        icon={<ShieldCheckIcon size={18} />}
        label="Compliance Score"
        value="91%"
        delta="+4%"
        trend="up"
        period="vs last month"
        sparkline={[72, 74, 71, 76, 79, 82, 80, 84, 87, 85, 89, 91]}
      />
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] space-y-8">

      {/* Compliance product */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          Compliance Risk Platform
        </p>
        <StatCardGroup cols={4}>
          <StatCard
            icon={<ShieldCheckIcon size={18} />}
            label="Compliance Score"
            value="91%"
            delta="+4%"
            trend="up"
            period="vs last month"
            sparkline={[72, 74, 71, 76, 79, 82, 80, 84, 87, 85, 89, 91]}
          />
          <StatCard
            icon={<WarningIcon size={18} />}
            label="Open Incidents"
            value="23"
            delta="-8"
            trend="down"
            period="vs last week"
            annotation="12 critical · 11 high"
            sparkline={[48, 52, 44, 50, 45, 41, 38, 35, 32, 30, 27, 23]}
          />
          <StatCard
            icon={<UsersIcon size={18} />}
            label="Vendors Assessed"
            value="460"
            delta="+14"
            trend="up"
            positiveIsGood={false}
            period="this quarter"
            sparkline={[420, 428, 432, 436, 440, 444, 448, 452, 454, 456, 458, 460]}
          />
          <StatCard
            icon={<ClockIcon size={18} />}
            label="Avg. Audit Duration"
            value="4.2d"
            delta="-0.8d"
            trend="down"
            period="vs Q3"
            sparkline={[6.2, 5.8, 5.4, 5.1, 4.8, 4.6, 4.4, 4.3, 4.2, 4.2, 4.2, 4.2]}
          />
        </StatCardGroup>
      </div>

      {/* IT Ops product */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          IT Ops AI Copilot
        </p>
        <StatCardGroup cols={4}>
          <StatCard
            icon={<CheckCircleIcon size={18} />}
            label="Uptime SLA"
            value="99.94%"
            delta="0.00%"
            trend="neutral"
            period="30-day rolling"
          />
          <StatCard
            icon={<LightningIcon size={18} />}
            label="Alerts Today"
            value="847"
            delta="+12%"
            trend="up"
            positiveIsGood={false}
            period="vs yesterday"
            sparkline={[620, 680, 710, 740, 700, 760, 780, 800, 820, 790, 810, 847]}
          />
          <StatCard
            icon={<BugIcon size={18} />}
            label="MTTR"
            value="3.2h"
            delta="-0.4h"
            trend="down"
            period="vs last week"
            sparkline={[4.8, 4.4, 4.1, 3.8, 3.6, 3.4, 3.3, 3.2, 3.2, 3.2, 3.2, 3.2]}
          />
          <StatCard
            icon={<CloudIcon size={18} />}
            label="CPU Utilisation"
            value="74%"
            delta="+6%"
            trend="up"
            positiveIsGood={false}
            period="peak today"
            sparkline={[58, 62, 60, 65, 68, 71, 70, 73, 72, 74, 74, 74]}
          />
        </StatCardGroup>
      </div>

      {/* Analytics product */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-4">
          Self-Serve Analytics
        </p>
        <StatCardGroup cols={4}>
          <StatCard
            icon={<CurrencyDollarIcon size={18} />}
            label="Revenue ARR"
            value="$4.2M"
            delta="+18%"
            trend="up"
            period="YoY"
            sparkline={[2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.5, 3.6, 3.8, 3.9, 4.0, 4.2]}
          />
          <StatCard
            icon={<UsersIcon size={18} />}
            label="MAU"
            value="3,410"
            delta="+13%"
            trend="up"
            period="vs last month"
            sparkline={[1840, 2120, 2380, 2650, 3020, 3410]}
          />
          <StatCard
            icon={<ArrowUpRightIcon size={18} />}
            label="Query P95"
            value="142ms"
            delta="-22ms"
            trend="down"
            period="vs last week"
            sparkline={[210, 195, 188, 200, 182, 176, 170, 165, 160, 155, 148, 142]}
          />
          <StatCard
            icon={<CheckCircleIcon size={18} />}
            label="Query Success Rate"
            value="99.1%"
            delta="+0.3%"
            trend="up"
            period="last 7 days"
            sparkline={[98.2, 98.4, 98.6, 98.7, 98.9, 99.0, 99.0, 99.1, 99.1, 99.1, 99.1, 99.1]}
          />
        </StatCardGroup>
      </div>

    </div>
  ),
};

// ─── Clickable cards ─────────────────────────────────────────────────────────

export const Clickable: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <p className="text-xs text-[var(--ds-text-muted)] mb-4">Cards with onClick become interactive — hover, focus ring, keyboard support</p>
      <StatCardGroup cols={3}>
        <StatCard
          icon={<ShieldCheckIcon size={18} />}
          label="Compliance Score"
          value="91%"
          delta="+4%"
          trend="up"
          period="vs last month"
          onClick={() => alert('Navigate to compliance details')}
        />
        <StatCard
          icon={<WarningIcon size={18} />}
          label="Open Incidents"
          value="23"
          delta="-8"
          trend="down"
          period="vs last week"
          onClick={() => alert('Navigate to incidents')}
        />
        <StatCard
          icon={<UsersIcon size={18} />}
          label="Vendors"
          value="460"
          delta="+14"
          trend="up"
          period="this quarter"
          positiveIsGood={false}
          onClick={() => alert('Navigate to vendors')}
        />
      </StatCardGroup>
    </div>
  ),
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const LoadingState: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <StatCardGroup cols={4}>
        <StatCard label="" value="" loading />
        <StatCard label="" value="" loading />
        <StatCard label="" value="" loading />
        <StatCard label="" value="" loading />
      </StatCardGroup>
    </div>
  ),
};

// ─── No sparkline / no delta ──────────────────────────────────────────────────

export const Minimal: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <StatCardGroup cols={3}>
        <StatCard
          label="Compliance Score"
          value="91%"
        />
        <StatCard
          label="Open Incidents"
          value="23"
          delta="-8"
          trend="down"
        />
        <StatCard
          label="Uptime"
          value="99.94%"
          annotation="30-day rolling average"
        />
      </StatCardGroup>
    </div>
  ),
};
