import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataGrid, badgeCell, numberCell } from './DataGrid';
import type { DataGridColumn } from './DataGrid';
import { Badge } from './Badge';
import { Button } from './Button';
import { FilterBar } from './FilterBar';
import type { FilterValue } from './FilterBar';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  parameters: {
    docs: {
      description: {
        component:
          'Generic `<T>` data grid. Features: sortable columns (built-in or external), multi-row selection with shift/ctrl support, built-in pagination, loading skeleton, empty state, sticky header, custom cell renderers, and row-click navigation. Helper factories `badgeCell()` and `numberCell()` produce typed cell renderers for common patterns.',
      },
    },
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof DataGrid>;

// ─── Vendor data ──────────────────────────────────────────────────────────────

interface Vendor {
  id:          string;
  name:        string;
  location:    string;
  riskLevel:   string;
  riskScore:   number;
  framework:   string;
  lastAudit:   string;
  openGaps:    number;
  status:      string;
}

const VENDORS: Vendor[] = [
  { id: 'v1',  name: 'Acme Corp',        location: 'Mumbai, IN',    riskLevel: 'Critical', riskScore: 78, framework: 'ISO 27001',  lastAudit: 'Nov 14, 2025', openGaps: 3,  status: 'Under review' },
  { id: 'v2',  name: 'GlobalSys',        location: 'Singapore',     riskLevel: 'Critical', riskScore: 82, framework: 'SOC 2',      lastAudit: 'Oct 28, 2025', openGaps: 5,  status: 'Needs remed.' },
  { id: 'v3',  name: 'DataVault',        location: 'Dublin, IE',    riskLevel: 'High',     riskScore: 65, framework: 'ISO 27001',  lastAudit: 'Nov 2, 2025',  openGaps: 2,  status: 'Under review' },
  { id: 'v4',  name: 'CloudEdge',        location: 'Frankfurt, DE', riskLevel: 'High',     riskScore: 60, framework: 'NIST CSF',   lastAudit: 'Oct 15, 2025', openGaps: 1,  status: 'Compliant'    },
  { id: 'v5',  name: 'NexusIO',          location: 'New York, US',  riskLevel: 'High',     riskScore: 58, framework: 'PCI DSS',    lastAudit: 'Sep 30, 2025', openGaps: 4,  status: 'Needs remed.' },
  { id: 'v6',  name: 'TechPartner A',    location: 'London, GB',    riskLevel: 'Medium',   riskScore: 42, framework: 'GDPR',       lastAudit: 'Nov 8, 2025',  openGaps: 0,  status: 'Compliant'    },
  { id: 'v7',  name: 'FastLogic',        location: 'Toronto, CA',   riskLevel: 'Medium',   riskScore: 38, framework: 'SOC 2',      lastAudit: 'Nov 1, 2025',  openGaps: 1,  status: 'Compliant'    },
  { id: 'v8',  name: 'DataSync',         location: 'Sydney, AU',    riskLevel: 'Medium',   riskScore: 45, framework: 'ISO 27001',  lastAudit: 'Oct 22, 2025', openGaps: 1,  status: 'Under review' },
  { id: 'v9',  name: 'OpsCore',          location: 'Mumbai, IN',    riskLevel: 'Medium',   riskScore: 48, framework: 'NIST CSF',   lastAudit: 'Oct 10, 2025', openGaps: 2,  status: 'Under review' },
  { id: 'v10', name: 'TrustCo',          location: 'Berlin, DE',    riskLevel: 'Low',      riskScore: 22, framework: 'ISO 27001',  lastAudit: 'Nov 12, 2025', openGaps: 0,  status: 'Compliant'    },
  { id: 'v11', name: 'MicroVend 1',      location: 'Stockholm, SE', riskLevel: 'Low',      riskScore: 18, framework: 'GDPR',       lastAudit: 'Nov 5, 2025',  openGaps: 0,  status: 'Compliant'    },
  { id: 'v12', name: 'MicroVend 2',      location: 'Warsaw, PL',    riskLevel: 'Minimal',  riskScore: 8,  framework: 'GDPR',       lastAudit: 'Oct 30, 2025', openGaps: 0,  status: 'Compliant'    },
];

// ─── Column definitions ───────────────────────────────────────────────────────

const RISK_BADGE: Record<string, 'danger' | 'warning' | 'info' | 'success' | 'neutral'> = {
  Critical: 'danger', High: 'warning', Medium: 'info', Low: 'success', Minimal: 'neutral',
};

const STATUS_BADGE: Record<string, 'danger' | 'warning' | 'info' | 'success' | 'neutral'> = {
  'Compliant':    'success',
  'Under review': 'info',
  'Needs remed.': 'danger',
};

const VENDOR_COLUMNS: DataGridColumn<Vendor>[] = [
  { key: 'name',      header: 'Vendor',       sortable: true, minWidth: '160px', truncate: true,
    render: row => (
      <span className="font-medium text-[var(--ds-text-primary)]">{row.name}</span>
    ),
  },
  { key: 'location',  header: 'Location',     sortable: true, minWidth: '130px' },
  { key: 'riskLevel', header: 'Risk level',   sortable: true,
    render: badgeCell<Vendor>(RISK_BADGE),
  },
  { key: 'riskScore', header: 'Score', sortable: true, align: 'right', minWidth: '70px',
    render: numberCell<Vendor>(),
  },
  { key: 'framework', header: 'Framework',    sortable: true },
  { key: 'lastAudit', header: 'Last audit',   sortable: true, minWidth: '120px' },
  { key: 'openGaps',  header: 'Open gaps',    sortable: true, align: 'center', minWidth: '80px',
    render: (_row, value) => {
      const n = Number(value);
      return n === 0
        ? <span className="text-[var(--ds-text-muted)]">—</span>
        : <Badge variant="warning" size="sm" appearance={n >= 3 ? 'solid' : 'subtle'}>{n}</Badge>;
    },
  },
  { key: 'status', header: 'Status', sortable: true,
    render: badgeCell<Vendor>(STATUS_BADGE, 'neutral'),
  },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    return (
      <div className="p-6 bg-[var(--ds-bg-base)]">
        <DataGrid
          columns={VENDOR_COLUMNS}
          rows={VENDORS}
          selectable
          selectedIds={selected}
          onSelectionChange={setSelected}
          pagination
          pageSize={8}
          stickyHeader
          emptyTitle="No vendors"
          emptyDesc="Adjust your filters or add a vendor."
        />
      </div>
    );
  },
};

// ─── Full feature demo ────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full-featured — Vendor register',
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());
    const [filters,  setFilters]  = useState<FilterValue>({ riskLevel: [], status: [] });
    const [search,   setSearch]   = useState('');

    const filtered = VENDORS.filter(v => {
      const rl = filters.riskLevel ?? [];
      const st = filters.status ?? [];
      const matchRisk = rl.length === 0 || rl.includes(v.riskLevel.toLowerCase());
      const matchStat = st.length === 0 || st.includes(v.status.toLowerCase().replace(/\s+/g, '_'));
      const matchQ    = !search || v.name.toLowerCase().includes(search.toLowerCase());
      return matchRisk && matchStat && matchQ;
    });

    return (
      <div className="p-6 bg-[var(--ds-bg-base)] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">
            Vendor Register
            <span className="ml-2 text-sm font-normal text-[var(--ds-text-muted)]">{filtered.length} vendors</span>
          </h2>
          {selected.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--ds-text-muted)]">{selected.size} selected</span>
              <Button size="sm" variant="secondary">Export</Button>
              <Button size="sm" variant="danger">Archive</Button>
            </div>
          )}
        </div>

        <FilterBar
          groups={[
            {
              key: 'riskLevel',
              label: 'Risk level',
              options: [
                { value: 'critical', label: 'Critical', count: VENDORS.filter(v => v.riskLevel === 'Critical').length },
                { value: 'high',     label: 'High',     count: VENDORS.filter(v => v.riskLevel === 'High').length     },
                { value: 'medium',   label: 'Medium',   count: VENDORS.filter(v => v.riskLevel === 'Medium').length   },
                { value: 'low',      label: 'Low',      count: VENDORS.filter(v => v.riskLevel === 'Low').length      },
                { value: 'minimal',  label: 'Minimal',  count: VENDORS.filter(v => v.riskLevel === 'Minimal').length  },
              ],
            },
            {
              key: 'status',
              label: 'Status',
              type: 'single' as const,
              options: [
                { value: 'compliant',    label: 'Compliant'    },
                { value: 'under_review', label: 'Under review' },
                { value: 'needs_remed.', label: 'Needs remed.' },
              ],
            },
          ]}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search vendors…"
        />

        <DataGrid
          columns={VENDOR_COLUMNS}
          rows={filtered}
          selectable
          selectedIds={selected}
          onSelectionChange={setSelected}
          pagination
          pageSize={8}
          stickyHeader
          emptyTitle="No vendors match your filters"
          emptyDesc="Try adjusting or clearing your active filters."
          onRowClick={row => alert(`Clicked: ${row.name}`)}
        />
      </div>
    );
  },
};

// ─── Loading state ────────────────────────────────────────────────────────────

export const LoadingState: Story = {
  render: () => (
    <div className="p-6 bg-[var(--ds-bg-base)]">
      <DataGrid
        columns={VENDOR_COLUMNS}
        rows={[]}
        loading
        loadingRows={6}
        selectable
      />
    </div>
  ),
};

// ─── Empty state ──────────────────────────────────────────────────────────────

export const EmptyStateStory: Story = {
  name: 'Empty state',
  render: () => (
    <div className="p-6 bg-[var(--ds-bg-base)]">
      <DataGrid
        columns={VENDOR_COLUMNS}
        rows={[]}
        emptyTitle="No vendors added"
        emptyDesc="Add your first vendor to begin tracking compliance and risk."
      />
    </div>
  ),
};

// ─── Incident grid ────────────────────────────────────────────────────────────

interface Incident {
  id:        string;
  title:     string;
  severity:  string;
  status:    string;
  team:      string;
  opened:    string;
  mttr:      string;
  alerts:    number;
}

const INCIDENTS: Incident[] = [
  { id: 'i1', title: 'Auth service degraded',     severity: 'P1', status: 'Active',      team: 'Platform',  opened: '14 min ago', mttr: '—',    alerts: 48 },
  { id: 'i2', title: 'DB replication lag > 5s',   severity: 'P2', status: 'In progress', team: 'Infra',     opened: '2h ago',     mttr: '—',    alerts: 12 },
  { id: 'i3', title: 'CDN cache miss spike',       severity: 'P3', status: 'Resolved',   team: 'Network',   opened: 'Nov 12',     mttr: '1.2h', alerts: 6  },
  { id: 'i4', title: 'Search index rebuild',       severity: 'P3', status: 'Resolved',   team: 'App',       opened: 'Nov 11',     mttr: '2.8h', alerts: 3  },
  { id: 'i5', title: 'Memory leak — ML pipeline',  severity: 'P2', status: 'Closed',     team: 'ML-Infra',  opened: 'Nov 10',     mttr: '4.1h', alerts: 22 },
];

const INC_SEVERITY: Record<string, 'danger' | 'warning' | 'info' | 'neutral'> = {
  P1: 'danger', P2: 'warning', P3: 'info', P4: 'neutral',
};
const INC_STATUS: Record<string, 'danger' | 'warning' | 'success' | 'neutral'> = {
  Active: 'danger', 'In progress': 'warning', Resolved: 'success', Closed: 'neutral',
};

export const IncidentGrid: Story = {
  name: 'IT Ops — Incident grid',
  render: () => (
    <div className="p-6 bg-[var(--ds-bg-base)]">
      <DataGrid<Incident>
        columns={[
          { key: 'title',    header: 'Incident',  sortable: true, minWidth: '200px', truncate: true,
            render: row => <span className="font-medium text-[var(--ds-text-primary)]">{row.title}</span>,
          },
          { key: 'severity', header: 'Severity', sortable: true, render: badgeCell<Incident>(INC_SEVERITY) },
          { key: 'status',   header: 'Status',   sortable: true, render: badgeCell<Incident>(INC_STATUS)   },
          { key: 'team',     header: 'Team',     sortable: true },
          { key: 'opened',   header: 'Opened',   sortable: false },
          { key: 'mttr',     header: 'MTTR',     sortable: false, align: 'right' },
          { key: 'alerts',   header: 'Alerts',   sortable: true,  align: 'right', render: numberCell<Incident>() },
        ]}
        rows={INCIDENTS}
        onRowClick={row => alert(`Open incident: ${row.title}`)}
        emptyTitle="No incidents"
      />
    </div>
  ),
};
