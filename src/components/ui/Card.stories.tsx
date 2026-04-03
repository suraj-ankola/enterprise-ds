import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  ShieldCheckIcon,
  WarningIcon,
  ArrowUpRightIcon,
  DotsThreeIcon,
  TrendUpIcon,
  TrendDownIcon,
  BugIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartLineUpIcon,
  BuildingOfficeIcon,
  CpuIcon,
} from '@phosphor-icons/react';
import { Card, CardHeader, CardBody, CardFooter, CardDivider, CardSkeleton } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    clickable: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    padding: 'md',
    clickable: false,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Compound surface container. Sub-components: `CardHeader`, `CardBody`, `CardFooter`, `CardDivider`, `CardSkeleton`. 4 variants (default · outlined · elevated · ghost). `clickable` prop adds hover affordance and keyboard activation. Skeleton included for loading states.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader title="Card Title" subtitle="Supporting description text" />
      <CardBody>
        This is the card body. It can contain any content — text, lists, metrics, charts, or other components.
      </CardBody>
    </Card>
  ),
};

export const Outlined: Story = {
  render: (args) => (
    <Card {...args} variant="outlined">
      <CardHeader title="Outlined Card" subtitle="Stronger border for emphasis" />
      <CardBody>Use outlined cards to draw attention to important sections.</CardBody>
    </Card>
  ),
};

export const Elevated: Story = {
  render: (args) => (
    <Card {...args} variant="elevated">
      <CardHeader title="Elevated Card" subtitle="Shadow lifts the card off the canvas" />
      <CardBody>Best used for primary content areas or featured items.</CardBody>
    </Card>
  ),
};

export const Clickable: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      {['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'].map((name) => (
        <Card key={name} {...args} clickable onClick={() => alert(`Clicked: ${name}`)}>
          <CardHeader
            title={name}
            subtitle="Click to view details"
            icon={<BuildingOfficeIcon size={18} />}
          />
          <CardBody>
            <span className="text-xs text-[var(--ds-text-muted)]">Risk Score: 82 / 100</span>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

// ─── With Header + Footer ─────────────────────────────────────────────────────

export const WithHeaderAndFooter: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader
        title="Compliance Report"
        subtitle="Last updated 2 hours ago"
        icon={<ShieldCheckIcon size={18} />}
        action={
          <button className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]">
            <DotsThreeIcon size={18} weight="bold" />
          </button>
        }
      />
      <CardBody>
        3 vendors are flagged for compliance review. 1 critical issue requires immediate attention.
      </CardBody>
      <CardFooter divider>
        <span className="text-xs text-[var(--ds-text-muted)]">2 of 12 vendors reviewed</span>
        <Button size="sm" variant="secondary">View Report</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithDivider: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader title="System Health" subtitle="All services" />
      <CardBody>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>API Gateway</span><span className="text-[var(--ds-success-text)] font-medium">Healthy</span></div>
          <div className="flex justify-between"><span>Database</span><span className="text-[var(--ds-success-text)] font-medium">Healthy</span></div>
          <div className="flex justify-between"><span>Auth Service</span><span className="text-[var(--ds-warning-text)] font-medium">Degraded</span></div>
        </div>
      </CardBody>
      <CardDivider />
      <p className="text-xs text-[var(--ds-text-muted)]">Last checked 30s ago</p>
    </Card>
  ),
};

// ─── Loading State ────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-3xl">
      <CardSkeleton />
      <CardSkeleton lines={2} />
      <CardSkeleton showHeader={false} lines={4} />
    </div>
  ),
};

// ─── Real-world examples ──────────────────────────────────────────────────────

export const VendorRiskCard: Story = {
  name: '↗ Project 1 — Vendor Risk Card',
  render: () => (
    <Card variant="default" className="max-w-sm">
      <CardHeader
        title="Tata Logistics Ltd."
        subtitle="Vendor ID: VND-00234 · Mumbai"
        icon={<BuildingOfficeIcon size={18} />}
        action={
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ds-danger-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--ds-danger-text)]">
            <WarningIcon size={12} weight="fill" /> High Risk
          </span>
        }
      />
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ds-text-muted)]">Risk Score</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 rounded-full bg-[var(--ds-bg-subtle)]">
                <div className="h-1.5 w-4/5 rounded-full bg-[var(--ds-danger-icon)]" />
              </div>
              <span className="text-sm font-bold text-[var(--ds-danger-text)]">78/100</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ds-text-muted)]">Compliance</span>
            <span className="text-xs font-medium text-[var(--ds-warning-text)]">3 gaps found</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--ds-text-muted)]">Last Audit</span>
            <span className="text-xs text-[var(--ds-text-secondary)]">Nov 14, 2025</span>
          </div>
        </div>
      </CardBody>
      <CardFooter divider>
        <span className="flex items-center gap-1 text-xs text-[var(--ds-text-muted)]">
          <ClockIcon size={12} /> Updated 1h ago
        </span>
        <Button size="sm" variant="danger">Review Now</Button>
      </CardFooter>
    </Card>
  ),
};

export const ITAlertCard: Story = {
  name: '↗ Project 2 — IT Incident Card',
  render: () => (
    <Card variant="elevated" className="max-w-sm border-l-4 border-l-[var(--ds-warning-icon)]">
      <CardHeader
        title="High CPU Usage Detected"
        subtitle="azure-prod-vm-03 · East US 2"
        icon={<CpuIcon size={18} />}
        action={
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ds-warning-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--ds-warning-text)]">
            Warning
          </span>
        }
      />
      <CardBody>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[var(--ds-text-muted)]">CPU Usage</span>
            <span className="font-semibold text-[var(--ds-warning-text)]">94%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--ds-bg-subtle)]">
            <div className="h-1.5 rounded-full bg-[var(--ds-warning-icon)]" style={{ width: '94%' }} />
          </div>
          <p className="mt-2 text-xs text-[var(--ds-text-muted)]">
            AI prediction: likely caused by scheduled batch job. Auto-resolution suggested.
          </p>
        </div>
      </CardBody>
      <CardFooter divider>
        <span className="flex items-center gap-1 text-xs text-[var(--ds-text-muted)]">
          <ClockIcon size={12} /> 4 min ago
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">Ignore</Button>
          <Button size="sm">Auto-fix</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

export const MetricCard: Story = {
  name: '↗ Project 3 — KPI Metric Card',
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-2xl">
      {[
        { label: 'Total Revenue', value: '₹4.2Cr', change: '+12.4%', up: true, icon: <ChartLineUpIcon size={18} /> },
        { label: 'Active SKUs', value: '1,847', change: '-3.2%', up: false, icon: <BugIcon size={18} /> },
        { label: 'Fill Rate', value: '96.8%', change: '+1.1%', up: true, icon: <CheckCircleIcon size={18} /> },
      ].map(({ label, value, change, up, icon }) => (
        <Card key={label} variant="default">
          <CardHeader
            title={label}
            icon={icon}
            action={
              <ArrowUpRightIcon
                size={14}
                className="text-[var(--ds-text-muted)]"
              />
            }
          />
          <CardBody>
            <p className="text-2xl font-bold text-[var(--ds-text-primary)]">{value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${up ? 'text-[var(--ds-success-text)]' : 'text-[var(--ds-danger-text)]'}`}>
              {up
                ? <TrendUpIcon size={12} weight="bold" />
                : <TrendDownIcon size={12} weight="bold" />
              }
              {change} vs last month
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};

// ─── Padding sizes ────────────────────────────────────────────────────────────

export const PaddingSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-start">
      {(['sm', 'md', 'lg'] as const).map((p) => (
        <Card key={p} padding={p} className="flex-1">
          <CardHeader title={`Padding: ${p}`} subtitle="Content area" />
          <CardBody>Body content here.</CardBody>
        </Card>
      ))}
    </div>
  ),
};
