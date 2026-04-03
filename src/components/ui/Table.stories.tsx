import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Badge } from './Badge';
import { Table } from './Table';
import type { TableColumn } from './Table';

const meta: Meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'Generic `Table<T>` — type-safe for any row shape. `TableColumn<T>` uses a `cell` render function for full flexibility. Built-in: column sort (controlled), row selection via `<Checkbox>`, skeleton loading rows, empty state slot.',
      },
    },
  },
};
export default meta;

// ─── Sample data ──────────────────────────────────────────────────────────────

interface VendorRow {
  id:        string;
  name:      string;
  risk:      'critical' | 'high' | 'medium' | 'low';
  status:    string;
  lastAudit: string;
  score:     number;
}

const VENDORS: VendorRow[] = [
  { id: '1', name: 'Acme Corp',       risk: 'critical', status: 'Needs Remediation', lastAudit: '2025-11-01', score: 42 },
  { id: '2', name: 'Beta Systems',    risk: 'high',     status: 'Under Review',      lastAudit: '2026-01-15', score: 61 },
  { id: '3', name: 'Gamma Analytics', risk: 'medium',   status: 'Compliant',         lastAudit: '2026-02-20', score: 77 },
  { id: '4', name: 'Delta Cloud',     risk: 'low',      status: 'Compliant',         lastAudit: '2026-03-05', score: 91 },
  { id: '5', name: 'Epsilon Data',    risk: 'medium',   status: 'Under Review',      lastAudit: '2026-03-18', score: 74 },
];

const RISK_BADGE: Record<VendorRow['risk'], React.ReactElement> = {
  critical: <Badge variant="danger"  size="sm">Critical</Badge>,
  high:     <Badge variant="warning" size="sm">High</Badge>,
  medium:   <Badge variant="info"    size="sm">Medium</Badge>,
  low:      <Badge variant="success" size="sm">Low</Badge>,
};

const COLUMNS: TableColumn<VendorRow>[] = [
  {
    key:      'name',
    header:   'Vendor',
    cell:     row => <span className="font-medium">{row.name}</span>,
    sortable: true,
    width:    '200px',
  },
  {
    key:      'risk',
    header:   'Risk Level',
    cell:     row => RISK_BADGE[row.risk],
    sortable: true,
  },
  {
    key:    'status',
    header: 'Audit Status',
    cell:   row => <span className="text-[var(--ds-text-secondary)]">{row.status}</span>,
  },
  {
    key:    'score',
    header: 'Score',
    cell:   row => (
      <span className={row.score >= 80 ? 'text-[var(--ds-success-text)] font-medium' : row.score >= 60 ? 'text-[var(--ds-warning-text)] font-medium' : 'text-[var(--ds-danger-text)] font-medium'}>
        {row.score}
      </span>
    ),
    align:    'center',
    sortable: true,
  },
  {
    key:    'lastAudit',
    header: 'Last Audit',
    cell:   row => <span className="text-[var(--ds-text-muted)]">{row.lastAudit}</span>,
    align:  'right',
  },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Basic: StoryObj = {
  render: () => (
    <Table<VendorRow>
      columns={COLUMNS}
      data={VENDORS}
      rowKey={r => r.id}
    />
  ),
};

export const WithSortAndSelection: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(['2']));
    const [sortKey, setSortKey]   = useState('name');
    const [sortDir, setSortDir]   = useState<'asc' | 'desc'>('asc');

    const sorted = [...VENDORS].sort((a, b) => {
      const va = a[sortKey as keyof VendorRow];
      const vb = b[sortKey as keyof VendorRow];
      const cmp = String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
      <div className="flex flex-col gap-3">
        <Table<VendorRow>
          columns={COLUMNS}
          data={sorted}
          rowKey={r => r.id}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={(k, d) => { setSortKey(k); setSortDir(d); }}
        />
        <p className="text-xs text-[var(--ds-text-muted)]">
          {selected.size} of {VENDORS.length} selected
        </p>
      </div>
    );
  },
};

export const LoadingState: StoryObj = {
  render: () => (
    <Table<VendorRow>
      columns={COLUMNS}
      data={[]}
      rowKey={r => r.id}
      loading
      loadingRows={5}
    />
  ),
};

export const EmptyState: StoryObj = {
  render: () => (
    <Table<VendorRow>
      columns={COLUMNS}
      data={[]}
      rowKey={r => r.id}
      emptyState="No vendors match the current filters."
    />
  ),
};
