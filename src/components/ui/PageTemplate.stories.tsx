import type { Meta, StoryObj } from '@storybook/react';
import {
  ShieldCheckIcon,
  WarningIcon,
  UsersIcon,
  FunnelIcon,
  PlusIcon,
  ArrowsOutIcon,
  BuildingsIcon,
  ChartLineIcon,
  GearIcon,
} from '@phosphor-icons/react';
import {
  Page,
  PageHeader,
  PageContent,
  Section,
  TwoColumnLayout,
  ThreeColumnLayout,
  SplitPane,
  DashboardGrid,
  DashboardWidget,
} from './PageTemplate';
import { Button } from './Button';
import { Badge } from './Badge';
import { StatCard, StatCardGroup } from './StatCard';
import { ActivityFeed } from './Timeline';
import { LineChart, DonutChart, BarChart } from './Chart';
import type { TimelineItem } from './Timeline';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageTemplate',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Layout primitives for building full application pages. `Page` is the root, `PageHeader` provides the sticky title/action bar, `PageContent` wraps the scrollable body. Layout helpers: `TwoColumnLayout`, `ThreeColumnLayout`, `SplitPane` for master-detail, `DashboardGrid`+`DashboardWidget` for responsive widget grids.',
      },
    },
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

// ─── Shared fixture data ──────────────────────────────────────────────────────

const ACTIVITY: TimelineItem[] = [
  { id: '1', variant: 'success', title: 'ISO 27001 audit passed',          description: '114 controls reviewed.', timestamp: '2h ago',   badge: 'Passed',   badgeVariant: 'success' },
  { id: '2', variant: 'danger',  title: 'P1 incident opened',              description: 'Auth service degraded — 18% login failure.', timestamp: '5h ago',   badge: 'Active',   badgeVariant: 'danger'  },
  { id: '3', variant: 'warning', title: 'Acme Corp access review overdue', description: 'Due Nov 1. No response from vendor.',         timestamp: 'Nov 12', badge: 'Overdue',  badgeVariant: 'warning' },
  { id: '4', variant: 'brand',   title: 'Slack integration added',         description: 'Real-time alerts forwarded to #compliance.',   timestamp: 'Nov 11' },
];

// ─── PageHeader only ──────────────────────────────────────────────────────────

export const HeaderOnly: Story = {
  name: 'PageHeader — all slots',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <PageHeader
        title="Vendor Risk Register"
        subtitle="460 vendors · Last updated 2 minutes ago"
        icon={<BuildingsIcon size={22} />}
        meta={<Badge variant="warning" appearance="subtle">12 critical</Badge>}
        actions={
          <>
            <Button variant="secondary" leftIcon={<FunnelIcon size={14} />}>Filters</Button>
            <Button leftIcon={<PlusIcon size={14} />}>Add vendor</Button>
          </>
        }
      />
      <div className="px-6 py-12 text-center text-sm text-[var(--ds-text-muted)]">Page content area</div>
    </div>
  ),
};

export const HeaderWithTabs: Story = {
  name: 'PageHeader — with tabs slot',
  render: () => (
    <div className="bg-[var(--ds-bg-base)]">
      <PageHeader
        title="Compliance Dashboard"
        subtitle="Compliance Risk Platform · FY 2025"
        icon={<ShieldCheckIcon size={22} />}
        actions={
          <>
            <Button variant="ghost" size="sm">Export</Button>
            <Button size="sm" leftIcon={<PlusIcon size={14} />}>New audit</Button>
          </>
        }
        tabs={
          <div className="flex gap-1 -mb-px">
            {['Overview', 'Vendors', 'Audits', 'Gaps', 'Reports'].map((t, i) => (
              <button
                key={t}
                type="button"
                className={[
                  'px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150',
                  i === 0
                    ? 'border-[var(--ds-brand-600)] text-[var(--ds-brand-600)]'
                    : 'border-transparent text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />
      <div className="px-6 py-12 text-center text-sm text-[var(--ds-text-muted)]">Tab content area</div>
    </div>
  ),
};

// ─── Full Dashboard page ──────────────────────────────────────────────────────

export const DashboardPage: Story = {
  name: 'Template — Dashboard',
  render: () => (
    <Page>
      <PageHeader
        title="Compliance Dashboard"
        subtitle="Compliance Risk Platform · FY 2025"
        icon={<ShieldCheckIcon size={22} />}
        actions={
          <>
            <Button variant="ghost" size="sm" leftIcon={<ArrowsOutIcon size={14} />}>Export</Button>
            <Button size="sm" leftIcon={<PlusIcon size={14} />}>New audit</Button>
          </>
        }
      />

      <PageContent>
        {/* KPIs */}
        <Section>
          <StatCardGroup cols={4}>
            <StatCard label="Compliance Score"  value="91%"  delta="+4%"  trend="up"   sparkline={[72,74,71,76,79,82,80,84,87,85,89,91]} />
            <StatCard label="Open Incidents"    value="23"   delta="-8"   trend="down" sparkline={[48,52,44,50,45,41,38,35,32,30,27,23]} />
            <StatCard label="Vendors Assessed"  value="460"  delta="+14"  trend="up"   positiveIsGood={false} />
            <StatCard label="Avg. Audit Time"   value="4.2d" delta="-0.8d" trend="down" />
          </StatCardGroup>
        </Section>

        {/* Charts + feed */}
        <TwoColumnLayout
          main={
            <div className="space-y-5">
              <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
                <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Compliance Score Trend</p>
                <p className="text-xs text-[var(--ds-text-muted)] mb-4">By framework — last 12 months</p>
                <LineChart
                  height={220}
                  categories={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
                  smooth
                  series={[
                    { name: 'Overall',   data: [72,74,71,76,79,82,80,84,87,85,89,91] },
                    { name: 'ISO 27001', data: [68,70,69,74,78,80,79,83,86,84,88,90] },
                    { name: 'SOC 2',     data: [75,77,73,78,80,84,82,86,88,87,90,92] },
                  ]}
                />
              </div>
              <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
                <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Framework Coverage</p>
                <p className="text-xs text-[var(--ds-text-muted)] mb-4">Implemented vs In Review vs Planned (%)</p>
                <BarChart
                  height={200}
                  categories={['ISO 27001','SOC 2','NIST CSF','PCI DSS','GDPR']}
                  stacked
                  series={[
                    { name: 'Implemented', data: [82,78,74,68,71] },
                    { name: 'In review',   data: [10,12,14,18,15] },
                    { name: 'Planned',     data: [8, 10,12,14,14] },
                  ]}
                />
              </div>
            </div>
          }
          aside={
            <div className="space-y-5">
              <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
                <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Vendor Risk Profile</p>
                <p className="text-xs text-[var(--ds-text-muted)] mb-2">460 vendors assessed</p>
                <DonutChart
                  height={220}
                  centerLabel="Vendors"
                  centerValue="460"
                  data={[
                    { name: 'Critical', value: 12  },
                    { name: 'High',     value: 34  },
                    { name: 'Medium',   value: 87  },
                    { name: 'Low',      value: 124 },
                    { name: 'Minimal',  value: 203 },
                  ]}
                />
              </div>
              <ActivityFeed title="Recent Activity" items={ACTIVITY} maxHeight={300} onViewAll={() => {}} />
            </div>
          }
        />
      </PageContent>
    </Page>
  ),
};

// ─── Detail / record page ─────────────────────────────────────────────────────

export const DetailPage: Story = {
  name: 'Template — Record detail (vendor)',
  render: () => (
    <Page>
      <PageHeader
        title="Acme Corp"
        subtitle="VND-00234 · Mumbai, India · Critical risk"
        icon={<BuildingsIcon size={22} />}
        meta={<Badge variant="danger" appearance="solid">Critical</Badge>}
        actions={
          <>
            <Button variant="secondary" size="sm">Edit</Button>
            <Button variant="danger" size="sm">Remediate</Button>
          </>
        }
      />

      <PageContent>
        <TwoColumnLayout
          main={
            <div className="space-y-5">
              <Section title="Risk Overview">
                <StatCardGroup cols={3}>
                  <StatCard label="Risk Score"    value="78"   delta="+6"  trend="up"   positiveIsGood={false} />
                  <StatCard label="Open Gaps"     value="3"    delta="+1"  trend="up"   positiveIsGood={false} />
                  <StatCard label="Last Audit"    value="Nov 14" />
                </StatCardGroup>
              </Section>
              <Section title="Compliance Coverage" description="Controls assessed across frameworks">
                <BarChart
                  height={200}
                  categories={['ISO 27001','SOC 2','NIST CSF','GDPR']}
                  stacked
                  series={[
                    { name: 'Implemented', data: [72,68,64,58] },
                    { name: 'Gap',         data: [18,20,24,28] },
                    { name: 'N/A',         data: [10,12,12,14] },
                  ]}
                />
              </Section>
            </div>
          }
          aside={
            <ActivityFeed
              title="Audit History"
              items={ACTIVITY}
              maxHeight={480}
              onViewAll={() => {}}
            />
          }
        />
      </PageContent>
    </Page>
  ),
};

// ─── Split-pane master-detail ─────────────────────────────────────────────────

export const MasterDetailPage: Story = {
  name: 'Template — Split-pane master/detail',
  render: () => (
    <Page>
      <PageHeader
        title="Vendor Register"
        subtitle="460 vendors"
        icon={<BuildingsIcon size={22} />}
        actions={<Button size="sm" leftIcon={<PlusIcon size={14} />}>Add vendor</Button>}
      />
      <PageContent noPadding className="overflow-hidden" style={{ height: 'calc(100vh - 73px)' }}>
        <SplitPane
          panelWidth={300}
          panel={
            <div>
              <div className="p-3 border-b border-[var(--ds-border-base)] sticky top-0 bg-[var(--ds-bg-surface)]">
                <input
                  type="search"
                  placeholder="Search vendors…"
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)] placeholder:text-[var(--ds-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-brand-500)]"
                />
              </div>
              <ul>
                {['Acme Corp','GlobalSys','DataVault','CloudEdge','NexusIO'].map((name, i) => (
                  <li key={name}>
                    <button
                      type="button"
                      className={[
                        'w-full text-left px-4 py-3 flex items-center justify-between gap-2',
                        'hover:bg-[var(--ds-bg-subtle)] transition-colors',
                        i === 0 ? 'bg-[var(--ds-brand-100)] border-r-2 border-[var(--ds-brand-600)]' : '',
                      ].join(' ')}
                    >
                      <span className="text-sm font-medium text-[var(--ds-text-primary)]">{name}</span>
                      <Badge variant={['danger','danger','info','success','warning'][i] as 'danger'|'info'|'success'|'warning'} size="sm">
                        {['Critical','High','Medium','Low','High'][i]}
                      </Badge>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          }
          content={
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[var(--ds-text-primary)]">Acme Corp</h2>
                <p className="text-sm text-[var(--ds-text-muted)]">VND-00234 · Mumbai · Critical risk</p>
              </div>
              <StatCardGroup cols={3}>
                <StatCard label="Risk Score"  value="78"     delta="+6" trend="up" positiveIsGood={false} />
                <StatCard label="Open Gaps"   value="3"      delta="+1" trend="up" positiveIsGood={false} />
                <StatCard label="Last Audit"  value="Nov 14" />
              </StatCardGroup>
            </div>
          }
        />
      </PageContent>
    </Page>
  ),
};

// ─── Settings page ────────────────────────────────────────────────────────────

export const SettingsPage: Story = {
  name: 'Template — Settings',
  render: () => (
    <Page>
      <PageHeader
        title="Settings"
        subtitle="Workspace configuration"
        icon={<GearIcon size={22} />}
      />

      <PageContent>
        <div className="max-w-2xl space-y-8">

          <Section
            title="Notifications"
            description="Configure when and how you receive alerts."
          >
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl divide-y divide-[var(--ds-border-base)]">
              {[
                { label: 'Critical incidents', desc: 'Immediate Slack + email alert' },
                { label: 'Audit due reminders', desc: '7 days and 1 day before due date' },
                { label: 'Vendor risk changes', desc: 'When risk score changes by ≥10 points' },
                { label: 'Weekly digest',        desc: 'Summary of the week sent every Monday' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between px-5 py-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--ds-text-primary)]">{item.label}</p>
                    <p className="text-xs text-[var(--ds-text-muted)]">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked="true"
                    className="relative h-5 w-9 rounded-full bg-[var(--ds-brand-600)] transition-colors shrink-0"
                  >
                    <span className="absolute left-4 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Integrations" description="Connected data sources and notification channels.">
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl divide-y divide-[var(--ds-border-base)]">
              {[
                { name: 'Slack',     status: 'Connected',    variant: 'success' as const },
                { name: 'Jira',      status: 'Connected',    variant: 'success' as const },
                { name: 'Salesforce', status: 'Auth failed', variant: 'danger'  as const },
                { name: 'ServiceNow', status: 'Not set up',  variant: 'neutral' as const },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between px-5 py-4">
                  <p className="text-sm font-medium text-[var(--ds-text-primary)]">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <Badge variant={item.variant} size="sm">{item.status}</Badge>
                    <Button size="sm" variant="ghost">Configure</Button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </PageContent>
    </Page>
  ),
};

// ─── Analytics page ───────────────────────────────────────────────────────────

export const AnalyticsPage: Story = {
  name: 'Template — Analytics dashboard',
  render: () => (
    <Page>
      <PageHeader
        title="Analytics"
        subtitle="Self-Serve Analytics · Last 30 days"
        icon={<ChartLineIcon size={22} />}
        actions={
          <>
            <Button variant="secondary" size="sm" leftIcon={<FunnelIcon size={14} />}>Date range</Button>
            <Button size="sm" leftIcon={<ArrowsOutIcon size={14} />}>Export</Button>
          </>
        }
      />

      <PageContent>
        {/* KPI row */}
        <Section>
          <StatCardGroup cols={4}>
            <StatCard label="MAU"              value="3,410"  delta="+13%" trend="up" />
            <StatCard label="Queries / day"    value="12,840" delta="+8%"  trend="up" />
            <StatCard label="Query P95"        value="142ms"  delta="-22ms" trend="down" />
            <StatCard label="Success rate"     value="99.1%"  delta="+0.3%" trend="up" />
          </StatCardGroup>
        </Section>

        {/* 3-column charts */}
        <ThreeColumnLayout
          left={
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">MAU Growth</p>
              <LineChart
                height={200}
                categories={['Q1','Q2','Q3','Q4','Q1','Q2']}
                smooth
                series={[{ name: 'MAU', data: [1840,2120,2380,2650,3020,3410] }]}
              />
            </div>
          }
          center={
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Query Volume</p>
              <BarChart
                height={200}
                categories={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']}
                series={[{ name: 'Queries', data: [11200,12800,13100,12600,14200,7400,5100] }]}
              />
            </div>
          }
          right={
            <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
              <p className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Usage by Product</p>
              <DonutChart
                height={200}
                data={[
                  { name: 'Compliance', value: 44 },
                  { name: 'IT Ops',     value: 33 },
                  { name: 'Analytics',  value: 23 },
                ]}
              />
            </div>
          }
        />
      </PageContent>
    </Page>
  ),
};

// ─── Team / People page ───────────────────────────────────────────────────────

export const PeoplePage: Story = {
  name: 'Template — Team / People list',
  render: () => (
    <Page>
      <PageHeader
        title="Team Members"
        subtitle="8 members · 3 roles"
        icon={<UsersIcon size={22} />}
        actions={<Button size="sm" leftIcon={<PlusIcon size={14} />}>Invite member</Button>}
      />

      <PageContent noPadding>
        <div className="border-b border-[var(--ds-border-base)] grid grid-cols-4 px-6 py-2 bg-[var(--ds-bg-subtle)]">
          {['Name', 'Role', 'Last active', 'Status'].map(h => (
            <p key={h} className="text-xs font-semibold text-[var(--ds-text-muted)]">{h}</p>
          ))}
        </div>
        {[
          { name: 'Priya Mehta',    role: 'Admin',         last: '2 min ago',   status: 'Active'    },
          { name: 'Rahul Sharma',   role: 'Analyst',       last: '1h ago',      status: 'Active'    },
          { name: 'Anjali Singh',   role: 'Viewer',        last: '2 days ago',  status: 'Active'    },
          { name: 'Carlos Rivera',  role: 'Analyst',       last: '5 days ago',  status: 'Away'      },
          { name: 'Nina Kapoor',    role: 'Viewer',        last: '3 weeks ago', status: 'Inactive'  },
        ].map(user => (
          <div key={user.name} className="grid grid-cols-4 px-6 py-4 border-b border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)] transition-colors">
            <p className="text-sm font-medium text-[var(--ds-text-primary)]">{user.name}</p>
            <p className="text-sm text-[var(--ds-text-secondary)]">{user.role}</p>
            <p className="text-sm text-[var(--ds-text-muted)]">{user.last}</p>
            <Badge
              variant={user.status === 'Active' ? 'success' : user.status === 'Away' ? 'warning' : 'neutral'}
              size="sm"
            >
              {user.status}
            </Badge>
          </div>
        ))}
      </PageContent>
    </Page>
  ),
};
