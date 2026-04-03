import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  CheckCircleIcon,
  WarningIcon,
  XCircleIcon,
  InfoIcon,
  ShieldCheckIcon,
  ClockIcon,
  LockIcon,
  StarIcon,
  WifiHighIcon,
  WifiNoneIcon,
  CloudCheckIcon,
  SpinnerGapIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { Badge, BadgeVariant, BadgeAppearance, BadgeSize } from './Badge';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'],
    },
    appearance: {
      control: 'select',
      options: ['subtle', 'outline', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dot:       { control: 'boolean' },
    children:  { control: 'text' },
  },
  args: {
    variant:    'neutral',
    appearance: 'subtle',
    size:       'md',
    dot:        false,
    children:   'Badge',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Status label, category tag, and counter pill. 6 variants × 3 appearances (subtle · outline · solid). `dot` prop adds a pulsing status indicator. `onDismiss` makes a badge dismissible. All solid combinations are WCAG AA verified in both light and dark mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--ds-border-base)] last:border-0">
      <span className="w-24 shrink-0 text-xs text-[var(--ds-text-muted)]">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-[var(--ds-text-primary)] mb-1">{title}</h2>
      <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] px-5 divide-y divide-[var(--ds-border-base)]">
        {children}
      </div>
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { variant: 'brand', appearance: 'subtle', children: 'Badge' },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

const ALL_VARIANTS: BadgeVariant[] = ['neutral', 'brand', 'success', 'warning', 'danger', 'info'];

export const AllVariants: Story = {
  name: 'Variants — All',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6 space-y-6">
      <Section title="Subtle (default)">
        <Row label="All variants">
          {ALL_VARIANTS.map(v => (
            <Badge key={v} variant={v} appearance="subtle">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Row>
      </Section>
      <Section title="Outline">
        <Row label="All variants">
          {ALL_VARIANTS.map(v => (
            <Badge key={v} variant={v} appearance="outline">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Row>
      </Section>
      <Section title="Solid">
        <Row label="All variants">
          {ALL_VARIANTS.map(v => (
            <Badge key={v} variant={v} appearance="solid">
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Row>
      </Section>
    </div>
  ),
};

// ─── Appearances ─────────────────────────────────────────────────────────────

const ALL_APPEARANCES: BadgeAppearance[] = ['subtle', 'outline', 'solid'];

export const Appearances: Story = {
  name: 'Appearances × Variants',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6">
      <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[96px_repeat(3,1fr)] gap-4 px-5 py-2.5 bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">Variant</span>
          {ALL_APPEARANCES.map(a => (
            <span key={a} className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ds-text-muted)]">{a}</span>
          ))}
        </div>
        {/* Rows */}
        {ALL_VARIANTS.map(v => (
          <div key={v} className="grid grid-cols-[96px_repeat(3,1fr)] gap-4 items-center px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
            <span className="text-xs text-[var(--ds-text-secondary)] font-medium">{v}</span>
            {ALL_APPEARANCES.map(a => (
              <Badge key={a} variant={v} appearance={a}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6">
      <Section title="Sizes (brand / subtle)">
        {(['sm', 'md', 'lg'] as BadgeSize[]).map(s => (
          <Row key={s} label={s}>
            <Badge size={s} variant="brand">Label</Badge>
            <Badge size={s} variant="success">Success</Badge>
            <Badge size={s} variant="danger">Danger</Badge>
            <Badge size={s} variant="neutral" appearance="outline">Outline</Badge>
            <Badge size={s} variant="brand" appearance="solid">Solid</Badge>
          </Row>
        ))}
      </Section>
    </div>
  ),
};

// ─── With Dot ─────────────────────────────────────────────────────────────────

export const WithDot: Story = {
  name: 'With Dot',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6">
      <Section title="Dot indicator">
        <Row label="Variants">
          {ALL_VARIANTS.map(v => (
            <Badge key={v} variant={v} dot>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Row>
        <Row label="Sizes">
          <Badge size="sm" variant="success" dot>Small</Badge>
          <Badge size="md" variant="success" dot>Medium</Badge>
          <Badge size="lg" variant="success" dot>Large</Badge>
        </Row>
        <Row label="Outline">
          {ALL_VARIANTS.map(v => (
            <Badge key={v} variant={v} appearance="outline" dot>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </Row>
      </Section>
    </div>
  ),
};

// ─── With Icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6">
      <Section title="Left icon">
        <Row label="Status">
          <Badge variant="success" icon={<CheckCircleIcon size={12} weight="fill" />}>Approved</Badge>
          <Badge variant="warning" icon={<WarningIcon size={12} weight="fill" />}>Pending</Badge>
          <Badge variant="danger"  icon={<XCircleIcon size={12} weight="fill" />}>Failed</Badge>
          <Badge variant="info"    icon={<InfoIcon size={12} weight="fill" />}>Info</Badge>
          <Badge variant="brand"   icon={<ShieldCheckIcon size={12} weight="fill" />}>Verified</Badge>
        </Row>
        <Row label="Outline">
          <Badge variant="success" appearance="outline" icon={<CheckCircleIcon size={12} weight="fill" />}>Approved</Badge>
          <Badge variant="warning" appearance="outline" icon={<WarningIcon size={12} weight="fill" />}>Pending</Badge>
          <Badge variant="danger"  appearance="outline" icon={<XCircleIcon size={12} weight="fill" />}>Failed</Badge>
          <Badge variant="info"    appearance="outline" icon={<InfoIcon size={12} weight="fill" />}>Info</Badge>
        </Row>
        <Row label="Solid">
          <Badge variant="success" appearance="solid" icon={<CheckCircleIcon size={12} weight="fill" />}>Approved</Badge>
          <Badge variant="warning" appearance="solid" icon={<WarningIcon size={12} weight="fill" />}>Pending</Badge>
          <Badge variant="danger"  appearance="solid" icon={<XCircleIcon size={12} weight="fill" />}>Failed</Badge>
          <Badge variant="info"    appearance="solid" icon={<InfoIcon size={12} weight="fill" />}>Info</Badge>
        </Row>
      </Section>
    </div>
  ),
};

// ─── Dismissible ─────────────────────────────────────────────────────────────

function DismissibleDemo() {
  const TAGS = [
    { label: 'Risk: High',     variant: 'danger'  as BadgeVariant },
    { label: 'In Review',      variant: 'warning' as BadgeVariant },
    { label: 'SOC 2 Type II',  variant: 'brand'   as BadgeVariant },
    { label: 'ISO 27001',      variant: 'success' as BadgeVariant },
    { label: 'Internal',       variant: 'neutral' as BadgeVariant },
    { label: 'Confidential',   variant: 'info'    as BadgeVariant },
  ];

  const [visible, setVisible] = useState(TAGS.map((_, i) => i));

  return (
    <div className="bg-[var(--ds-bg-base)] p-6">
      <Section title="Dismissible badges (click × to remove)">
        <Row label="Active">
          {visible.length === 0 ? (
            <span className="text-xs text-[var(--ds-text-muted)]">All dismissed —{' '}
              <button
                className="text-[var(--ds-brand-600)] hover:underline text-xs"
                onClick={() => setVisible(TAGS.map((_, i) => i))}
              >reset</button>
            </span>
          ) : (
            visible.map(i => (
              <Badge
                key={i}
                variant={TAGS[i].variant}
                onDismiss={() => setVisible(v => v.filter(x => x !== i))}
              >
                {TAGS[i].label}
              </Badge>
            ))
          )}
        </Row>
        <Row label="Outline">
          {TAGS.slice(0, 3).map(({ label, variant }) => (
            <Badge key={label} variant={variant} appearance="outline" onDismiss={() => {}}>
              {label}
            </Badge>
          ))}
        </Row>
        <Row label="Solid">
          {TAGS.slice(0, 3).map(({ label, variant }) => (
            <Badge key={label} variant={variant} appearance="solid" onDismiss={() => {}}>
              {label}
            </Badge>
          ))}
        </Row>
      </Section>
    </div>
  );
}

export const Dismissible: Story = {
  name: 'Dismissible',
  render: () => <DismissibleDemo />,
};

// ─── Real-world patterns ──────────────────────────────────────────────────────

export const ProjectPatterns: Story = {
  name: '↗ Real-world Patterns',
  render: () => (
    <div className="bg-[var(--ds-bg-base)] p-6 space-y-8">

      {/* Status badges */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider mb-3">
          Compliance Risk Platform — Vendor status
        </p>
        <div className="rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] overflow-hidden">
          {[
            { vendor: 'Tata Logistics Ltd.',     status: 'High Risk',      variant: 'danger'  as BadgeVariant, icon: <WarningIcon size={11} weight="fill" /> },
            { vendor: 'Infosys BPM',             status: 'Under Review',   variant: 'warning' as BadgeVariant, icon: <ClockIcon size={11} weight="fill" /> },
            { vendor: 'Wipro Technologies',      status: 'Approved',       variant: 'success' as BadgeVariant, icon: <CheckCircleIcon size={11} weight="fill" /> },
            { vendor: 'Deloitte Advisory',       status: 'SOC 2 Verified', variant: 'brand'   as BadgeVariant, icon: <ShieldCheckIcon size={11} weight="fill" /> },
            { vendor: 'AWS Infrastructure',      status: 'Locked',         variant: 'neutral' as BadgeVariant, icon: <LockIcon size={11} weight="fill" /> },
          ].map(({ vendor, status, variant, icon }) => (
            <div key={vendor} className="flex items-center justify-between px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0">
              <div className="flex items-center gap-3">
                <UserIcon size={16} className="text-[var(--ds-text-muted)]" />
                <span className="text-sm text-[var(--ds-text-primary)]">{vendor}</span>
              </div>
              <Badge variant={variant} icon={icon} size="sm">{status}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* IT Ops incidents */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider mb-3">
          IT Ops Copilot — Incident severity
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="danger"  appearance="solid" dot>P1 — Critical</Badge>
          <Badge variant="warning" appearance="solid" dot>P2 — High</Badge>
          <Badge variant="info"    appearance="solid" dot>P3 — Medium</Badge>
          <Badge variant="neutral" appearance="solid" dot>P4 — Low</Badge>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="danger"  icon={<WifiNoneIcon size={12} weight="fill" />}>DB Offline</Badge>
          <Badge variant="warning" icon={<WarningIcon size={12} weight="fill" />}>High CPU — 94%</Badge>
          <Badge variant="success" icon={<CloudCheckIcon size={12} weight="fill" />}>Deployed</Badge>
          <Badge variant="info"    icon={<SpinnerGapIcon size={12} className="animate-spin" />}>Healing</Badge>
          <Badge variant="success" icon={<WifiHighIcon size={12} weight="fill" />}>Online</Badge>
        </div>
      </div>

      {/* Analytics filters */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider mb-3">
          Analytics — Active filter chips (dismissible)
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Q4 2025',      variant: 'brand'   as BadgeVariant },
            { label: 'North India',  variant: 'neutral' as BadgeVariant },
            { label: 'B2B Segment',  variant: 'neutral' as BadgeVariant },
            { label: 'Revenue > 1Cr',variant: 'info'    as BadgeVariant },
            { label: 'Verified ✓',   variant: 'success' as BadgeVariant },
          ].map(({ label, variant }) => (
            <Badge key={label} variant={variant} appearance="outline" onDismiss={() => {}}>
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Count / notification */}
      <div>
        <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wider mb-3">
          Notification counts
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-flex">
            <button className="h-9 px-4 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)]">
              Alerts
            </button>
            <Badge variant="danger" appearance="solid" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] justify-center px-1">
              3
            </Badge>
          </div>
          <div className="relative inline-flex">
            <button className="h-9 px-4 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)]">
              Reviews
            </button>
            <Badge variant="brand" appearance="solid" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] justify-center px-1">
              12
            </Badge>
          </div>
          <div className="relative inline-flex">
            <button className="h-9 px-4 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)]">
              Updates
            </button>
            <Badge variant="success" appearance="solid" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] justify-center px-1">
              ✓
            </Badge>
          </div>
          <div className="relative inline-flex">
            <button className="h-9 px-4 rounded-lg border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)]">
              Premium
            </button>
            <Badge variant="warning" appearance="solid" size="sm" className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] justify-center px-1">
              <StarIcon size={9} weight="fill" />
            </Badge>
          </div>
        </div>
      </div>

    </div>
  ),
};
