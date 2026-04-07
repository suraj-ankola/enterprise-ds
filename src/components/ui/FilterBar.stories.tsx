import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SortAscendingIcon, SquaresFourIcon, ListIcon } from '@phosphor-icons/react';
import { FilterBar } from './FilterBar';
import type { FilterValue } from './FilterBar';
import { Button } from './Button';
import { Badge } from './Badge';

const meta: Meta<typeof FilterBar> = {
  title: 'Forms/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composable filter toolbar for tables, lists, and grids. Supports a search input, multiple dropdown filter groups (multi-select or single-select), active-filter chip row, and a "Clear all" button. The `actions` slot holds sort controls, view toggles, or export buttons. Fully controlled.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

// ─── Shared fixture groups ────────────────────────────────────────────────────

const RISK_GROUPS = [
  {
    key: 'riskLevel',
    label: 'Risk level',
    options: [
      { value: 'critical', label: 'Critical', count: 12 },
      { value: 'high',     label: 'High',     count: 34 },
      { value: 'medium',   label: 'Medium',   count: 87 },
      { value: 'low',      label: 'Low',      count: 124 },
      { value: 'minimal',  label: 'Minimal',  count: 203 },
    ],
  },
  {
    key: 'framework',
    label: 'Framework',
    options: [
      { value: 'iso27001', label: 'ISO 27001' },
      { value: 'soc2',     label: 'SOC 2 Type II' },
      { value: 'nist',     label: 'NIST CSF' },
      { value: 'pcidss',   label: 'PCI DSS' },
      { value: 'gdpr',     label: 'GDPR' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'single' as const,
    options: [
      { value: 'compliant',    label: 'Compliant' },
      { value: 'under_review', label: 'Under review' },
      { value: 'needs_remed',  label: 'Needs remediation' },
      { value: 'inactive',     label: 'Inactive' },
    ],
  },
];

const INCIDENT_GROUPS = [
  {
    key: 'severity',
    label: 'Severity',
    options: [
      { value: 'p1', label: 'P1 – Critical' },
      { value: 'p2', label: 'P2 – High' },
      { value: 'p3', label: 'P3 – Medium' },
      { value: 'p4', label: 'P4 – Low' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'single' as const,
    options: [
      { value: 'open',        label: 'Open' },
      { value: 'in_progress', label: 'In progress' },
      { value: 'resolved',    label: 'Resolved' },
      { value: 'closed',      label: 'Closed' },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    options: [
      { value: 'infra',   label: 'Infrastructure' },
      { value: 'app',     label: 'Application' },
      { value: 'network', label: 'Network' },
      { value: 'security',label: 'Security' },
    ],
  },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterValue>({ riskLevel: [], framework: [], status: [] });
    const [search,  setSearch]  = useState('');

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-4">
        <FilterBar
          groups={RISK_GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search vendors…"
        />
        {/* Preview */}
        <div className="text-xs text-[var(--ds-text-muted)] font-mono p-3 rounded-lg bg-[var(--ds-bg-subtle)]">
          search: {JSON.stringify(search)} | filters: {JSON.stringify(filters)}
        </div>
      </div>
    );
  },
};

// ─── Vendor filter bar ────────────────────────────────────────────────────────

export const VendorFilterBar: Story = {
  name: 'Vendor register — full filter bar',
  render: () => {
    const [filters, setFilters] = useState<FilterValue>({
      riskLevel: ['critical', 'high'],
      framework: [],
      status:    [],
    });
    const [search, setSearch] = useState('');
    const [view,   setView]   = useState<'grid' | 'list'>('list');

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-4">
        <FilterBar
          groups={RISK_GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search vendors…"
          actions={
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setView('list')}
                className={[
                  'p-1.5 rounded-md text-sm transition-colors',
                  view === 'list'
                    ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]'
                    : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                ].join(' ')}
                aria-pressed={view === 'list'}
                aria-label="List view"
              >
                <ListIcon size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView('grid')}
                className={[
                  'p-1.5 rounded-md text-sm transition-colors',
                  view === 'grid'
                    ? 'bg-[var(--ds-bg-subtle)] text-[var(--ds-text-primary)]'
                    : 'text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)]',
                ].join(' ')}
                aria-pressed={view === 'grid'}
                aria-label="Grid view"
              >
                <SquaresFourIcon size={16} />
              </button>
              <div className="w-px h-4 bg-[var(--ds-border-base)] mx-1" />
              <Button size="sm" variant="ghost" leftIcon={<SortAscendingIcon size={14} />}>
                Sort
              </Button>
            </div>
          }
        />

        {/* Fake vendor rows */}
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          {[
            { name: 'Acme Corp',     level: 'Critical', score: 78 },
            { name: 'GlobalSys',     level: 'Critical', score: 82 },
            { name: 'DataVault',     level: 'High',     score: 65 },
          ].map(v => (
            <div key={v.name} className="flex items-center justify-between px-5 py-3 border-b border-[var(--ds-border-base)] last:border-0 hover:bg-[var(--ds-bg-subtle)] transition-colors">
              <p className="text-sm font-medium text-[var(--ds-text-primary)]">{v.name}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--ds-text-muted)]">Score: {v.score}</span>
                <Badge variant={v.level === 'Critical' ? 'danger' : 'warning'} size="sm">{v.level}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// ─── Incident filter bar ──────────────────────────────────────────────────────

export const IncidentFilterBar: Story = {
  name: 'IT Ops — Incident filter bar',
  render: () => {
    const [filters, setFilters] = useState<FilterValue>({ severity: ['p1','p2'], status: [], team: [] });
    const [search, setSearch]   = useState('');

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-4">
        <FilterBar
          groups={INCIDENT_GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search incidents…"
        />
      </div>
    );
  },
};

// ─── No search ────────────────────────────────────────────────────────────────

export const NoSearch: Story = {
  name: 'Filters only — no search input',
  render: () => {
    const [filters, setFilters] = useState<FilterValue>({ riskLevel: [], framework: [], status: [] });

    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <FilterBar
          groups={RISK_GROUPS}
          value={filters}
          onChange={setFilters}
        />
      </div>
    );
  },
};

// ─── Empty / clean state ──────────────────────────────────────────────────────

export const CleanState: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterValue>({ riskLevel: [], framework: [], status: [] });
    const [search,  setSearch]  = useState('');

    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <p className="text-xs text-[var(--ds-text-muted)] mb-3">No active filters — "Clear all" hidden</p>
        <FilterBar
          groups={RISK_GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search…"
        />
      </div>
    );
  },
};
