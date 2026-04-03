import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ShieldCheckIcon, BellIcon, ChartBarIcon } from '@phosphor-icons/react';
import { Select } from './Select';

// ─── Sample data ──────────────────────────────────────────────────────────────

const RISK_OPTIONS = [
  { value: 'critical', label: 'Critical Risk' },
  { value: 'high',     label: 'High Risk' },
  { value: 'medium',   label: 'Medium Risk' },
  { value: 'low',      label: 'Low Risk' },
  { value: 'minimal',  label: 'Minimal Risk' },
];

const INCIDENT_PRIORITY = [
  { value: 'p0', label: 'P0 — Production Down' },
  { value: 'p1', label: 'P1 — Critical Impact' },
  { value: 'p2', label: 'P2 — High Impact' },
  { value: 'p3', label: 'P3 — Medium Impact' },
  { value: 'p4', label: 'P4 — Low Impact' },
];

const TIME_RANGES = [
  { value: '1h',     label: 'Last 1 hour',   group: 'Recent' },
  { value: '6h',     label: 'Last 6 hours',  group: 'Recent' },
  { value: '24h',    label: 'Last 24 hours', group: 'Recent' },
  { value: '7d',     label: 'Last 7 days',   group: 'Longer ranges' },
  { value: '30d',    label: 'Last 30 days',  group: 'Longer ranges' },
  { value: '90d',    label: 'Last 90 days',  group: 'Longer ranges' },
  { value: 'custom', label: 'Custom range…', group: 'Longer ranges' },
];

const AGGREGATIONS = [
  { value: 'sum',    label: 'Sum' },
  { value: 'avg',    label: 'Average' },
  { value: 'median', label: 'Median' },
  { value: 'min',    label: 'Min' },
  { value: 'max',    label: 'Max' },
  { value: 'count',  label: 'Count' },
  { value: 'p50',    label: 'p50 (Percentile)' },
  { value: 'p95',    label: 'p95 (Percentile)' },
  { value: 'p99',    label: 'p99 (Percentile)' },
];

// Larger dataset to demonstrate searchable
const COUNTRIES = [
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'ca', label: 'Canada' },
  { value: 'cn', label: 'China' },
  { value: 'dk', label: 'Denmark' },
  { value: 'fi', label: 'Finland' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'id', label: 'Indonesia' },
  { value: 'ie', label: 'Ireland' },
  { value: 'il', label: 'Israel' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'mx', label: 'Mexico' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'no', label: 'Norway' },
  { value: 'pl', label: 'Poland' },
  { value: 'pt', label: 'Portugal' },
  { value: 'sg', label: 'Singapore' },
  { value: 'kr', label: 'South Korea' },
  { value: 'es', label: 'Spain' },
  { value: 'se', label: 'Sweden' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'A fully accessible custom select / dropdown. Supports option groups, search filtering, ' +
          'status states, and controlled + uncontrolled modes. ' +
          'Keyboard: Arrow Up/Down navigates, Enter selects, Escape closes, Home/End jumps to first/last.',
      },
    },
  },
  argTypes: {
    options:      { control: false },
    value:        { control: false },
    defaultValue: { control: false },
    onChange:     { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    options:     RISK_OPTIONS,
    placeholder: 'Select risk level',
    label:       'Risk Level',
    helperText:  'Select the risk classification for this vendor',
    size:        'md',
    disabled:    false,
    searchable:  false,
    fullWidth:   false,
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Select
          key={size}
          options={RISK_OPTIONS}
          size={size}
          label={`Size: ${size}`}
          placeholder={`${size} — select risk level`}
          defaultValue={size === 'md' ? 'medium' : undefined}
        />
      ))}
    </div>
  ),
};

// ─── Status States ────────────────────────────────────────────────────────────

export const StatusStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xs">
      <Select
        options={RISK_OPTIONS}
        label="Default"
        placeholder="Select risk level"
        helperText="This vendor requires a risk classification."
      />
      <Select
        options={RISK_OPTIONS}
        label="Error"
        placeholder="Select risk level"
        errorMessage="Risk level is required before saving."
      />
      <Select
        options={RISK_OPTIONS}
        label="Success"
        defaultValue="low"
        status="success"
        helperText="Risk level looks good."
      />
      <Select
        options={RISK_OPTIONS}
        label="Disabled"
        defaultValue="medium"
        disabled
        helperText="This field is locked for editing."
      />
    </div>
  ),
};

// ─── Searchable ───────────────────────────────────────────────────────────────

export const Searchable: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    return (
      <div className="flex flex-col gap-6 max-w-xs">
        <Select
          options={COUNTRIES}
          label="Country / Region"
          placeholder="Search countries…"
          helperText="Start typing to filter the list of 27 countries."
          searchable
          value={country}
          onChange={setCountry}
        />
        {country && (
          <p className="text-sm text-[var(--ds-text-secondary)]">
            Selected: <span className="font-medium text-[var(--ds-text-primary)]">
              {COUNTRIES.find(c => c.value === country)?.label}
            </span>
          </p>
        )}
      </div>
    );
  },
};

// ─── Option Groups ────────────────────────────────────────────────────────────

export const OptionGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xs">
      <Select
        options={TIME_RANGES}
        label="Time Range"
        placeholder="Select time range"
        helperText="Groups options by recency."
        defaultValue="24h"
      />
      <Select
        options={TIME_RANGES}
        label="Time Range (searchable)"
        placeholder="Search time ranges…"
        searchable
        defaultValue="7d"
      />
    </div>
  ),
};

// ─── With Disabled Options ────────────────────────────────────────────────────

export const DisabledOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xs">
      <Select
        options={[
          { value: 'critical', label: 'Critical Risk' },
          { value: 'high',     label: 'High Risk' },
          { value: 'medium',   label: 'Medium Risk' },
          { value: 'low',      label: 'Low Risk (requires approval)', disabled: true },
          { value: 'minimal',  label: 'Minimal Risk (requires approval)', disabled: true },
        ]}
        label="Risk Level"
        helperText="Lower risk levels require security team approval."
        defaultValue="medium"
      />
    </div>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [priority, setPriority] = useState('p2');
    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <Select
          options={INCIDENT_PRIORITY}
          label="Incident Priority"
          value={priority}
          onChange={setPriority}
          helperText="Controlled — current value shown below."
        />
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[var(--ds-text-muted)]">
            Current value: <code className="font-mono text-[var(--ds-text-primary)]">{priority}</code>
          </p>
          <div className="flex gap-2">
            {['p0', 'p1', 'p2', 'p3', 'p4'].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={[
                  'px-2 py-1 text-xs rounded font-medium transition-colors',
                  priority === p
                    ? 'bg-[var(--ds-brand-600)] text-[var(--ds-brand-text)]'
                    : 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-border-base)]',
                ].join(' ')}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── All Sizes + Status grid ──────────────────────────────────────────────────

export const SizesAndStatus: Story = {
  name: 'All Sizes × Status',
  render: () => (
    <div className="grid grid-cols-3 gap-x-8 gap-y-6 items-start">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-5">
          <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide">
            {size}
          </p>
          <Select options={RISK_OPTIONS} size={size} placeholder="Default" />
          <Select
            options={RISK_OPTIONS}
            size={size}
            defaultValue="high"
            placeholder="With value"
          />
          <Select
            options={RISK_OPTIONS}
            size={size}
            placeholder="Error state"
            errorMessage="Required field"
          />
          <Select
            options={RISK_OPTIONS}
            size={size}
            defaultValue="low"
            status="success"
            placeholder="Success"
          />
          <Select
            options={RISK_OPTIONS}
            size={size}
            defaultValue="medium"
            disabled
            placeholder="Disabled"
          />
        </div>
      ))}
    </div>
  ),
};

// ─── Project Patterns ─────────────────────────────────────────────────────────
// Real-world usage across all 3 portfolio products.

export const ProjectPatterns: Story = {
  render: () => (
    <div className="flex flex-col gap-10">

      {/* ── Project 1: Compliance Risk Platform ───────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon size={16} className="text-[var(--ds-brand-600)]" />
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
            Compliance Risk Platform
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
          <p className="text-xs font-medium text-[var(--ds-text-muted)] mb-4 uppercase tracking-wide">
            Vendor Filter Bar
          </p>
          <div className="flex flex-wrap gap-4">
            <Select
              options={RISK_OPTIONS}
              label="Risk Level"
              placeholder="All risk levels"
              size="sm"
              defaultValue="high"
            />
            <Select
              options={[
                { value: 'all',       label: 'All frameworks' },
                { value: 'soc2',      label: 'SOC 2 Type II' },
                { value: 'iso27001',  label: 'ISO 27001' },
                { value: 'pci-dss',   label: 'PCI DSS' },
                { value: 'hipaa',     label: 'HIPAA' },
                { value: 'gdpr',      label: 'GDPR' },
              ]}
              label="Framework"
              placeholder="All frameworks"
              size="sm"
              defaultValue="soc2"
            />
            <Select
              options={[
                { value: 'all',        label: 'All statuses' },
                { value: 'compliant',  label: 'Compliant' },
                { value: 'review',     label: 'Under Review' },
                { value: 'overdue',    label: 'Audit Overdue' },
                { value: 'remediate',  label: 'Needs Remediation' },
              ]}
              label="Audit Status"
              placeholder="All statuses"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* ── Project 2: IT Ops AI Copilot ──────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <BellIcon size={16} className="text-[var(--ds-brand-600)]" />
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
            IT Ops AI Copilot
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
          <p className="text-xs font-medium text-[var(--ds-text-muted)] mb-4 uppercase tracking-wide">
            Incident Assignment Form
          </p>
          <div className="flex flex-col gap-4 max-w-sm">
            <Select
              options={INCIDENT_PRIORITY}
              label="Priority"
              defaultValue="p1"
              helperText="P0 triggers immediate on-call alert."
              errorMessage=""
            />
            <Select
              options={[
                { value: 'network',  label: 'Network & Connectivity', group: 'Infrastructure' },
                { value: 'compute',  label: 'Compute / VM',           group: 'Infrastructure' },
                { value: 'storage',  label: 'Storage',                group: 'Infrastructure' },
                { value: 'auth',     label: 'Auth & Identity',        group: 'Platform' },
                { value: 'api',      label: 'API Gateway',            group: 'Platform' },
                { value: 'database', label: 'Database',               group: 'Platform' },
                { value: 'app',      label: 'Application Logic',      group: 'Application' },
                { value: 'frontend', label: 'Frontend / UI',          group: 'Application' },
              ]}
              label="Category"
              placeholder="Select category"
              helperText="Affects which team is auto-assigned."
              defaultValue="api"
            />
            <Select
              options={[
                { value: 'alice',  label: 'Alice Chen — Platform SRE' },
                { value: 'bob',    label: 'Bob Kumar — Network Ops' },
                { value: 'carol',  label: 'Carol White — Security' },
                { value: 'dave',   label: 'Dave Park — On-Call (auto)' },
              ]}
              label="Assign To"
              placeholder="Search engineers…"
              searchable
              defaultValue="dave"
            />
          </div>
        </div>
      </div>

      {/* ── Project 3: Self-Serve Analytics ───────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ChartBarIcon size={16} className="text-[var(--ds-brand-600)]" />
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">
            Self-Serve Analytics
          </p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)]">
          <p className="text-xs font-medium text-[var(--ds-text-muted)] mb-4 uppercase tracking-wide">
            Query Builder Controls
          </p>
          <div className="flex flex-wrap gap-4 items-end">
            <Select
              options={TIME_RANGES}
              label="Time Range"
              defaultValue="30d"
              size="md"
            />
            <Select
              options={AGGREGATIONS}
              label="Aggregation"
              defaultValue="avg"
              size="md"
            />
            <Select
              options={[
                { value: 'day',   label: 'By Day' },
                { value: 'week',  label: 'By Week' },
                { value: 'month', label: 'By Month' },
                { value: 'raw',   label: 'Raw (no grouping)' },
              ]}
              label="Group By"
              defaultValue="week"
              size="md"
            />
            <Select
              options={[
                { value: 'asc',  label: 'Ascending' },
                { value: 'desc', label: 'Descending' },
              ]}
              label="Sort"
              defaultValue="desc"
              size="md"
            />
          </div>
        </div>
      </div>

    </div>
  ),
};
