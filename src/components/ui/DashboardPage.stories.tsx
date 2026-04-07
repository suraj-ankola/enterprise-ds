import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPage, type DashboardStat, type DashboardActivity } from './DashboardPage';
import {
  BuildingsIcon,
  ShieldCheckIcon,
  WarningIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ArrowClockwiseIcon,
} from '@phosphor-icons/react';

const meta: Meta<typeof DashboardPage> = {
  title: 'Page Templates/DashboardPage',
  component: DashboardPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-page dashboard layout with optional stat cards row, main chart/content area, side panel, and recent activity feed. Supports a loading skeleton state for async data. Designed for top-level overview pages in enterprise apps.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title:       { control: { type: 'text' } },
    subtitle:    { control: { type: 'text' } },
    loading:     { control: { type: 'boolean' } },
    stats:       { control: false },
    activity:    { control: false },
    mainContent: { control: false },
    sideContent: { control: false },
    actions:     { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof DashboardPage>;

const STATS: DashboardStat[] = [
  { label: 'Total vendors',      value: '1,284', change: +6.2,  icon: <BuildingsIcon   size={16} /> },
  { label: 'High risk',          value: '42',    change: -3.1,  icon: <WarningIcon     size={16} /> },
  { label: 'Audits due',         value: '17',    description: 'Next 30 days', icon: <ClockIcon size={16} /> },
  { label: 'Compliance score',   value: '94%',   change: +1.8,  icon: <ShieldCheckIcon size={16} /> },
];

const ACTIVITY: DashboardActivity[] = [
  { id: 'a1', text: 'Acme Corp approved for renewal',     time: '2 min ago',  type: 'success', icon: <CheckCircleIcon size={13} weight="fill" /> },
  { id: 'a2', text: 'Globex Inc risk score updated to 78', time: '15 min ago', type: 'warning', icon: <WarningIcon size={13} weight="fill" /> },
  { id: 'a3', text: 'DPA for Initech Solutions rejected',  time: '1 hr ago',   type: 'danger',  icon: <XCircleIcon size={13} weight="fill" /> },
  { id: 'a4', text: '3 new vendors added via import',      time: '3 hr ago',   type: 'default', icon: <PlusIcon size={13} /> },
  { id: 'a5', text: 'Quarterly report generated',         time: 'Yesterday',   type: 'success', icon: <CheckCircleIcon size={13} weight="fill" /> },
];

const MainContentPlaceholder = () => (
  <div className="p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Risk distribution over time</h3>
      <select className="text-xs px-2 py-1 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
        <option>Last 6 months</option>
        <option>Last 12 months</option>
      </select>
    </div>
    {/* Chart placeholder */}
    <div className="h-48 rounded-lg bg-[var(--ds-bg-subtle)] flex items-center justify-center">
      <p className="text-xs text-[var(--ds-text-muted)]">Chart component goes here</p>
    </div>
  </div>
);

const SideContentPlaceholder = () => (
  <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4 space-y-3">
    <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Top risks</h3>
    {['Acme Corp — Score 92', 'Globex Inc — Score 78', 'Initech — Score 71'].map(item => (
      <div key={item} className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[var(--ds-danger-icon)]" />
        <span className="text-sm text-[var(--ds-text-secondary)]">{item}</span>
      </div>
    ))}
  </div>
);

export const Playground: Story = {
  args: {
    title:    'Vendor Risk Dashboard',
    subtitle: 'Overview of your third-party risk posture',
    stats:    STATS,
    activity: ACTIVITY,
  },
  render: (args) => (
    <DashboardPage
      {...args}
      mainContent={<MainContentPlaceholder />}
      sideContent={<SideContentPlaceholder />}
      actions={
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
          <ArrowClockwiseIcon size={14} /> Refresh
        </button>
      }
    />
  ),
};

export const Loading: Story = {
  name: 'Loading skeleton',
  render: () => (
    <DashboardPage
      title="Vendor Risk Dashboard"
      subtitle="Loading…"
      loading
    />
  ),
};

export const StatsOnly: Story = {
  name: 'Stats only (no chart)',
  render: () => (
    <DashboardPage
      title="Quick overview"
      stats={STATS}
    />
  ),
};
