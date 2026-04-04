import type { Meta, StoryObj } from '@storybook/react';
import {
  Chart,
  LineChart,
  BarChart,
  AreaChart,
  DonutChart,
  Sparkline,
  HeatmapChart,
  ScatterChart,
} from './Chart';
import { Badge } from './Badge';
import { Card } from './Card';

const meta: Meta<typeof Chart> = {
  title: 'UI/Chart',
  component: Chart,
  parameters: {
    docs: {
      description: {
        component:
          'ECharts-powered data visualisation components. All charts read DS CSS tokens at render time — colours update automatically with brand theme and dark mode. 7 chart types designed for enterprise dashboards: LineChart, BarChart, AreaChart, DonutChart, Sparkline, HeatmapChart, ScatterChart.',
      },
    },
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof Chart>;

// ─── Shared enterprise data ───────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const QUARTERS = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'];
const WEEKS    = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">Compliance Score Trend</h2>
        <p className="text-sm text-[var(--ds-text-muted)] mb-4">Overall compliance score across all frameworks — last 12 months</p>
        <LineChart
          height={320}
          categories={MONTHS}
          smooth
          zoom
          series={[
            { name: 'Overall',   data: [72, 74, 71, 76, 79, 82, 80, 84, 87, 85, 89, 91] },
            { name: 'ISO 27001', data: [68, 70, 69, 74, 78, 80, 79, 83, 86, 84, 88, 90] },
            { name: 'SOC 2',     data: [75, 77, 73, 78, 80, 84, 82, 86, 88, 87, 90, 92] },
          ]}
        />
      </div>
    </div>
  ),
};

// ─── All Chart Types ──────────────────────────────────────────────────────────

export const LineChartStory: Story = {
  name: 'LineChart — Incident Trends',
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Security Incidents by Severity</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Weekly incident counts — current quarter</p>
        <LineChart
          height={280}
          categories={WEEKS}
          smooth
          series={[
            { name: 'Critical', data: [3, 1, 2, 4, 2, 1, 3, 2, 1, 2, 0, 1] },
            { name: 'High',     data: [8, 6, 9, 7, 10, 8, 7, 9, 6, 8, 7, 5] },
            { name: 'Medium',   data: [18, 21, 17, 22, 19, 24, 20, 18, 22, 19, 17, 15] },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">MTTR by Category (hours)</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Mean time to resolve — last 6 quarters</p>
        <LineChart
          height={280}
          categories={QUARTERS}
          smooth={false}
          yAxisLabel="Hours"
          series={[
            { name: 'Infrastructure', data: [38, 34, 30, 28, 24, 20] },
            { name: 'Application',    data: [52, 48, 44, 40, 36, 31] },
            { name: 'Network',        data: [14, 12, 11, 10, 9, 8] },
          ]}
        />
      </div>
    </div>
  ),
};

export const AreaChartStory: Story = {
  name: 'AreaChart — Resource Utilisation',
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">IT Infrastructure Utilisation (%)</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Average daily utilisation across resource pools</p>
        <AreaChart
          height={280}
          categories={MONTHS}
          yAxisLabel="%"
          series={[
            { name: 'CPU',     data: [62, 58, 65, 71, 68, 75, 72, 78, 74, 80, 77, 82] },
            { name: 'Memory',  data: [55, 52, 60, 64, 62, 70, 66, 72, 69, 74, 71, 76] },
            { name: 'Storage', data: [40, 42, 45, 47, 50, 53, 56, 59, 62, 65, 68, 71] },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Alert Volume Over Time</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Total alerts generated per month — with noise-reduction filter active from July</p>
        <AreaChart
          height={280}
          categories={MONTHS}
          series={[
            { name: 'Raw alerts',     data: [1240, 1380, 1290, 1450, 1520, 1480, 980, 910, 890, 870, 840, 810] },
            { name: 'Actionable',     data: [310, 345, 322, 362, 380, 370, 195, 182, 178, 174, 168, 162] },
          ]}
        />
      </div>
    </div>
  ),
};

export const BarChartStory: Story = {
  name: 'BarChart — Framework Coverage',
  render: () => (
    <div className="p-8 space-y-8">

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Control Coverage by Framework (%)</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Percentage of controls implemented, in review, or planned</p>
        <BarChart
          height={280}
          categories={['ISO 27001', 'SOC 2 Type II', 'NIST CSF', 'PCI DSS', 'GDPR', 'HIPAA']}
          stacked
          series={[
            { name: 'Implemented', data: [82, 78, 74, 68, 71, 65] },
            { name: 'In review',   data: [10, 12, 14, 18, 15, 20] },
            { name: 'Planned',     data: [8,  10, 12, 14, 14, 15] },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Vendor Risk Distribution</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Number of vendors per risk level — horizontal view</p>
        <BarChart
          height={260}
          categories={['Critical', 'High', 'Medium', 'Low', 'Minimal']}
          horizontal
          showLabels
          series={[
            { name: 'Vendors', data: [12, 34, 87, 124, 203] },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Monthly Active Users by Product</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Unique monthly active users — grouped by product</p>
        <BarChart
          height={280}
          categories={QUARTERS}
          series={[
            { name: 'Compliance Platform', data: [1840, 2120, 2380, 2650, 3020, 3410] },
            { name: 'IT Ops Copilot',      data: [920,  1180, 1420, 1710, 2080, 2490] },
            { name: 'Analytics',            data: [480,  620,  810,  1040, 1320, 1680] },
          ]}
        />
      </div>
    </div>
  ),
};

export const DonutChartStory: Story = {
  name: 'DonutChart — Risk & Status Breakdowns',
  render: () => (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Vendor Risk Profile</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">460 vendors assessed</p>
        <DonutChart
          height={260}
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

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Audit Status</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">All scheduled audits — FY 2025</p>
        <DonutChart
          height={260}
          centerLabel="Audits"
          centerValue="148"
          data={[
            { name: 'Passed',      value: 89 },
            { name: 'In progress', value: 31 },
            { name: 'Scheduled',   value: 18 },
            { name: 'Failed',      value: 10 },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Alert Routing</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">Destination by category</p>
        <DonutChart
          height={260}
          data={[
            { name: 'Auto-resolved', value: 42 },
            { name: 'L1 Support',    value: 28 },
            { name: 'L2 Engineering', value: 18 },
            { name: 'Security team', value: 8  },
            { name: 'Escalated',     value: 4  },
          ]}
        />
      </div>

    </div>
  ),
};

export const SparklineStory: Story = {
  name: 'Sparkline — KPI Cards',
  render: () => (
    <div className="p-8">
      <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-4">Key Performance Indicators</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {[
          {
            label: 'Compliance Score',
            value: '91%',
            delta: '+4%',
            positive: true,
            data: [72, 74, 71, 76, 79, 82, 80, 84, 87, 85, 89, 91],
          },
          {
            label: 'Open Incidents',
            value: '23',
            delta: '-8',
            positive: true,
            data: [48, 52, 44, 50, 45, 41, 38, 35, 32, 30, 27, 23],
          },
          {
            label: 'MTTR (hours)',
            value: '3.2h',
            delta: '+0.4h',
            positive: false,
            data: [2.8, 3.1, 2.9, 3.4, 3.2, 3.6, 3.4, 3.2, 3.5, 3.3, 3.0, 3.2],
          },
          {
            label: 'Uptime SLA',
            value: '99.94%',
            delta: '0.00%',
            positive: true,
            data: [99.91, 99.93, 99.90, 99.94, 99.92, 99.95, 99.93, 99.96, 99.94, 99.97, 99.95, 99.94],
          },
          {
            label: 'Critical Vendors',
            value: '12',
            delta: '-3',
            positive: true,
            data: [18, 17, 16, 17, 15, 16, 14, 15, 13, 14, 13, 12],
          },
          {
            label: 'Alerts Today',
            value: '847',
            delta: '+12%',
            positive: false,
            data: [620, 680, 710, 740, 700, 760, 780, 800, 820, 790, 810, 847],
          },
          {
            label: 'Revenue ARR',
            value: '$4.2M',
            delta: '+18%',
            positive: true,
            data: [2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.5, 3.6, 3.8, 3.9, 4.0, 4.2],
          },
          {
            label: 'Query P95 (ms)',
            value: '142ms',
            delta: '-22ms',
            positive: true,
            data: [210, 195, 188, 200, 182, 176, 170, 165, 160, 155, 148, 142],
          },
        ].map(kpi => (
          <div
            key={kpi.label}
            className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4"
          >
            <p className="text-xs text-[var(--ds-text-muted)] mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between mb-2">
              <p className="text-xl font-bold text-[var(--ds-text-primary)]">{kpi.value}</p>
              <Badge
                variant={kpi.positive ? 'success' : 'danger'}
                appearance="subtle"
                size="sm"
              >
                {kpi.delta}
              </Badge>
            </div>
            <Sparkline
              data={kpi.data}
              trend={kpi.positive ? 'positive' : 'negative'}
              width="100%"
              height={44}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const HeatmapChartStory: Story = {
  name: 'HeatmapChart — Control Risk Matrix',
  render: () => {
    const frameworks = ['ISO 27001', 'SOC 2', 'NIST CSF', 'PCI DSS', 'GDPR'];
    const domains    = ['Access Ctrl', 'Encryption', 'Logging', 'Incident', 'Network', 'Physical', 'HR', 'Vendor'];

    // Risk score 0–100 per cell (framework × domain)
    const riskData = [
      // ISO 27001
      { x: 0, y: 0, value: 12 }, { x: 0, y: 1, value: 8  }, { x: 0, y: 2, value: 24 },
      { x: 0, y: 3, value: 18 }, { x: 0, y: 4, value: 31 }, { x: 0, y: 5, value: 6  },
      { x: 0, y: 6, value: 14 }, { x: 0, y: 7, value: 42 },
      // SOC 2
      { x: 1, y: 0, value: 9  }, { x: 1, y: 1, value: 5  }, { x: 1, y: 2, value: 19 },
      { x: 1, y: 3, value: 22 }, { x: 1, y: 4, value: 28 }, { x: 1, y: 5, value: 4  },
      { x: 1, y: 6, value: 11 }, { x: 1, y: 7, value: 35 },
      // NIST CSF
      { x: 2, y: 0, value: 15 }, { x: 2, y: 1, value: 11 }, { x: 2, y: 2, value: 30 },
      { x: 2, y: 3, value: 14 }, { x: 2, y: 4, value: 38 }, { x: 2, y: 5, value: 9  },
      { x: 2, y: 6, value: 17 }, { x: 2, y: 7, value: 48 },
      // PCI DSS
      { x: 3, y: 0, value: 7  }, { x: 3, y: 1, value: 4  }, { x: 3, y: 2, value: 16 },
      { x: 3, y: 3, value: 26 }, { x: 3, y: 4, value: 22 }, { x: 3, y: 5, value: 3  },
      { x: 3, y: 6, value: 8  }, { x: 3, y: 7, value: 31 },
      // GDPR
      { x: 4, y: 0, value: 20 }, { x: 4, y: 1, value: 14 }, { x: 4, y: 2, value: 28 },
      { x: 4, y: 3, value: 10 }, { x: 4, y: 4, value: 18 }, { x: 4, y: 5, value: 7  },
      { x: 4, y: 6, value: 32 }, { x: 4, y: 7, value: 25 },
    ];

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Compliance Risk Heat Map</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">
            Residual risk score (0–100) per control domain × framework. Higher = more exposure.
          </p>
          <HeatmapChart
            height={340}
            xLabels={frameworks}
            yLabels={domains}
            data={riskData}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Infrastructure Alert Density</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">Alert count by service × hour-of-day (24h window)</p>
          <HeatmapChart
            height={300}
            xLabels={['auth-svc', 'api-gw', 'db-primary', 'cache', 'queue', 'cdn', 'search']}
            yLabels={['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']}
            colorRange={['#f0fdf4', '#dc2626']}
            data={[
              { x: 0, y: 0, value: 2  }, { x: 1, y: 0, value: 5  }, { x: 2, y: 0, value: 1  }, { x: 3, y: 0, value: 3  }, { x: 4, y: 0, value: 8  }, { x: 5, y: 0, value: 2  }, { x: 6, y: 0, value: 1  },
              { x: 0, y: 1, value: 1  }, { x: 1, y: 1, value: 3  }, { x: 2, y: 1, value: 0  }, { x: 3, y: 1, value: 2  }, { x: 4, y: 1, value: 5  }, { x: 5, y: 1, value: 1  }, { x: 6, y: 1, value: 0  },
              { x: 0, y: 2, value: 4  }, { x: 1, y: 2, value: 8  }, { x: 2, y: 2, value: 3  }, { x: 3, y: 2, value: 6  }, { x: 4, y: 2, value: 12 }, { x: 5, y: 2, value: 3  }, { x: 6, y: 2, value: 2  },
              { x: 0, y: 3, value: 18 }, { x: 1, y: 3, value: 34 }, { x: 2, y: 3, value: 12 }, { x: 3, y: 3, value: 22 }, { x: 4, y: 3, value: 45 }, { x: 5, y: 3, value: 8  }, { x: 6, y: 3, value: 6  },
              { x: 0, y: 4, value: 22 }, { x: 1, y: 4, value: 48 }, { x: 2, y: 4, value: 18 }, { x: 3, y: 4, value: 31 }, { x: 4, y: 4, value: 62 }, { x: 5, y: 4, value: 11 }, { x: 6, y: 4, value: 9  },
              { x: 0, y: 5, value: 20 }, { x: 1, y: 5, value: 42 }, { x: 2, y: 5, value: 15 }, { x: 3, y: 5, value: 28 }, { x: 4, y: 5, value: 55 }, { x: 5, y: 5, value: 9  }, { x: 6, y: 5, value: 7  },
              { x: 0, y: 6, value: 14 }, { x: 1, y: 6, value: 28 }, { x: 2, y: 6, value: 9  }, { x: 3, y: 6, value: 18 }, { x: 4, y: 6, value: 38 }, { x: 5, y: 6, value: 6  }, { x: 6, y: 6, value: 5  },
              { x: 0, y: 7, value: 6  }, { x: 1, y: 7, value: 12 }, { x: 2, y: 7, value: 4  }, { x: 3, y: 7, value: 8  }, { x: 4, y: 7, value: 18 }, { x: 5, y: 7, value: 3  }, { x: 6, y: 7, value: 2  },
            ]}
          />
        </div>
      </div>
    );
  },
};

export const ScatterChartStory: Story = {
  name: 'ScatterChart — Risk vs Cost Analysis',
  render: () => (
    <div className="p-8 space-y-8">

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Vendor Risk vs Annual Spend</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">
          Each point is a vendor. X = annual spend ($K), Y = composite risk score. Bubble size = number of integrations.
        </p>
        <ScatterChart
          height={320}
          xAxisLabel="Annual Spend ($K)"
          yAxisLabel="Risk Score"
          series={[
            {
              name: 'Critical risk',
              data: [
                { name: 'Acme Corp',      x: 480, y: 88, size: 18 },
                { name: 'GlobalSys',      x: 320, y: 82, size: 12 },
                { name: 'DataVault',      x: 210, y: 79, size: 8  },
              ],
            },
            {
              name: 'High risk',
              data: [
                { name: 'TechPartner A', x: 150, y: 68, size: 10 },
                { name: 'CloudEdge',     x: 280, y: 71, size: 14 },
                { name: 'NexusIO',       x: 190, y: 65, size: 6  },
                { name: 'Streamline',    x: 95,  y: 62, size: 5  },
              ],
            },
            {
              name: 'Medium risk',
              data: [
                { name: 'Supplier B',    x: 80,  y: 45, size: 8  },
                { name: 'Supplier C',    x: 120, y: 52, size: 6  },
                { name: 'FastLogic',     x: 60,  y: 40, size: 4  },
                { name: 'DataSync',      x: 200, y: 48, size: 9  },
                { name: 'OpsCore',       x: 140, y: 55, size: 7  },
              ],
            },
            {
              name: 'Low risk',
              data: [
                { name: 'MicroVend 1',   x: 30,  y: 22, size: 4  },
                { name: 'MicroVend 2',   x: 45,  y: 18, size: 3  },
                { name: 'MicroVend 3',   x: 55,  y: 25, size: 3  },
                { name: 'TrustCo',       x: 90,  y: 28, size: 5  },
              ],
            },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Deployment Frequency vs Change Failure Rate</h3>
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">
          DORA metrics — X = deployments/week, Y = change failure rate (%). Teams plotted by environment.
        </p>
        <ScatterChart
          height={300}
          xAxisLabel="Deployments per week"
          yAxisLabel="Change failure rate (%)"
          series={[
            {
              name: 'Production',
              data: [
                { name: 'Auth',      x: 8,  y: 2.1, size: 12 },
                { name: 'API',       x: 12, y: 1.8, size: 14 },
                { name: 'Frontend',  x: 18, y: 3.2, size: 10 },
                { name: 'Platform',  x: 5,  y: 1.2, size: 16 },
                { name: 'ML-Infra',  x: 3,  y: 0.8, size: 18 },
              ],
            },
            {
              name: 'Staging',
              data: [
                { name: 'Auth-stg',     x: 22, y: 5.4, size: 8 },
                { name: 'API-stg',      x: 35, y: 6.1, size: 8 },
                { name: 'Frontend-stg', x: 48, y: 8.2, size: 6 },
                { name: 'Platform-stg', x: 15, y: 4.0, size: 8 },
              ],
            },
          ]}
        />
      </div>

    </div>
  ),
};

// ─── Dashboard composition ────────────────────────────────────────────────────

export const EnterpriseDashboard: Story = {
  name: 'Composition — Enterprise Dashboard',
  render: () => (
    <div className="p-6 bg-[var(--ds-bg-base)] min-h-screen space-y-6">

      {/* Header KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: '91%',   delta: '+4%',  positive: true,  data: [72,74,71,76,79,82,80,84,87,85,89,91] },
          { label: 'Open Incidents',   value: '23',    delta: '-8',   positive: true,  data: [48,52,44,50,45,41,38,35,32,30,27,23] },
          { label: 'Vendor Count',     value: '460',   delta: '+14',  positive: false, data: [420,428,432,436,440,444,448,452,454,456,458,460] },
          { label: 'Uptime SLA',       value: '99.94%',delta: '0.00%',positive: true,  data: [99.91,99.93,99.90,99.94,99.92,99.95,99.93,99.96,99.94,99.97,99.95,99.94] },
        ].map(kpi => (
          <div key={kpi.label} className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4">
            <p className="text-xs text-[var(--ds-text-muted)]">{kpi.label}</p>
            <div className="flex items-end justify-between mt-1 mb-2">
              <p className="text-2xl font-bold text-[var(--ds-text-primary)]">{kpi.value}</p>
              <Badge variant={kpi.positive ? 'success' : 'warning'} appearance="subtle" size="sm">{kpi.delta}</Badge>
            </div>
            <Sparkline data={kpi.data} trend={kpi.positive ? 'positive' : 'neutral'} width="100%" height={40} />
          </div>
        ))}
      </div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="md:col-span-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Compliance Score Trend</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">By framework — last 12 months</p>
          <LineChart
            height={240}
            categories={MONTHS}
            smooth
            series={[
              { name: 'Overall',   data: [72,74,71,76,79,82,80,84,87,85,89,91] },
              { name: 'ISO 27001', data: [68,70,69,74,78,80,79,83,86,84,88,90] },
              { name: 'SOC 2',     data: [75,77,73,78,80,84,82,86,88,87,90,92] },
            ]}
          />
        </div>

        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Vendor Risk Profile</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">460 assessed</p>
          <DonutChart
            height={240}
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
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Control Coverage by Framework</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">Implemented vs In review vs Planned (%)</p>
          <BarChart
            height={240}
            categories={['ISO 27001', 'SOC 2', 'NIST CSF', 'PCI DSS', 'GDPR', 'HIPAA']}
            stacked
            series={[
              { name: 'Implemented', data: [82, 78, 74, 68, 71, 65] },
              { name: 'In review',   data: [10, 12, 14, 18, 15, 20] },
              { name: 'Planned',     data: [8,  10, 12, 14, 14, 15] },
            ]}
          />
        </div>

        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">Infrastructure Utilisation</h3>
          <p className="text-xs text-[var(--ds-text-muted)] mb-3">CPU / Memory / Storage — monthly average (%)</p>
          <AreaChart
            height={240}
            categories={MONTHS}
            series={[
              { name: 'CPU',     data: [62,58,65,71,68,75,72,78,74,80,77,82] },
              { name: 'Memory',  data: [55,52,60,64,62,70,66,72,69,74,71,76] },
              { name: 'Storage', data: [40,42,45,47,50,53,56,59,62,65,68,71] },
            ]}
          />
        </div>
      </div>

    </div>
  ),
};

export const LoadingState: Story = {
  name: 'Loading States',
  render: () => (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">LineChart loading</p>
        <LineChart
          height={220}
          loading
          categories={MONTHS}
          series={[{ name: 'Score', data: [] }]}
        />
      </div>
      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">BarChart loading</p>
        <BarChart
          height={220}
          loading
          categories={['A', 'B', 'C']}
          series={[{ name: 'Value', data: [] }]}
        />
      </div>
      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">DonutChart loading</p>
        <DonutChart height={220} loading data={[]} />
      </div>
      <div>
        <p className="text-xs text-[var(--ds-text-muted)] mb-2">HeatmapChart loading</p>
        <HeatmapChart height={220} loading xLabels={[]} yLabels={[]} data={[]} />
      </div>
    </div>
  ),
};
