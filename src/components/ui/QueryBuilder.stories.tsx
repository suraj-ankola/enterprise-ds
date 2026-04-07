import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QueryBuilder, type FilterGroup } from './QueryBuilder';

const meta: Meta<typeof QueryBuilder> = {
  title: 'Data Display/QueryBuilder',
  component: QueryBuilder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-condition filter builder with AND/OR group logic. Supports text, number, date, select, and boolean field types — each with contextually appropriate operators. Groups can be nested with independent logic. Used in analytics, CRM, and reporting screens.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof QueryBuilder>;

const VENDOR_FIELDS = [
  { key: 'name',       label: 'Vendor name',   type: 'text'   as const },
  { key: 'risk_score', label: 'Risk score',     type: 'number' as const },
  { key: 'framework',  label: 'Framework',      type: 'select' as const, options: [
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'soc2',     label: 'SOC 2' },
    { value: 'gdpr',     label: 'GDPR' },
    { value: 'hipaa',    label: 'HIPAA' },
  ]},
  { key: 'risk_tier',  label: 'Risk tier',      type: 'select' as const, options: [
    { value: 'critical', label: 'Critical' },
    { value: 'high',     label: 'High' },
    { value: 'medium',   label: 'Medium' },
    { value: 'low',      label: 'Low' },
  ]},
  { key: 'last_audit', label: 'Last audit date', type: 'date'   as const },
  { key: 'active',     label: 'Is active',        type: 'boolean' as const },
];

const initialGroups = (): FilterGroup[] => [{
  id: 'g1', logic: 'AND', conditions: [
    { id: 'c1', field: 'risk_score', operator: 'gte', value: '50' },
    { id: 'c2', field: 'framework',  operator: 'equals', value: 'iso27001' },
  ],
}];

export const Playground: Story = {
  render: () => {
    const [groups, setGroups] = useState<FilterGroup[]>(initialGroups());
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
        <QueryBuilder fields={VENDOR_FIELDS} value={groups} onChange={setGroups} />
        <pre className="mt-4 text-[10px] text-[var(--ds-text-muted)] bg-[var(--ds-bg-subtle)] p-3 rounded-lg overflow-auto">
          {JSON.stringify(groups, null, 2)}
        </pre>
      </div>
    );
  },
};

export const MultiGroup: Story = {
  name: 'Multiple groups (OR logic)',
  render: () => {
    const [groups, setGroups] = useState<FilterGroup[]>([
      {
        id: 'g1', logic: 'AND', conditions: [
          { id: 'c1', field: 'risk_score', operator: 'gte', value: '75' },
          { id: 'c2', field: 'active',     operator: 'equals', value: 'true' },
        ],
      },
      {
        id: 'g2', logic: 'OR', conditions: [
          { id: 'c3', field: 'risk_tier', operator: 'equals', value: 'critical' },
        ],
      },
    ]);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
        <QueryBuilder fields={VENDOR_FIELDS} value={groups} onChange={setGroups} />
      </div>
    );
  },
};

export const Empty: Story = {
  name: 'Empty state (no groups)',
  render: () => {
    const [groups, setGroups] = useState<FilterGroup[]>([]);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
        <QueryBuilder fields={VENDOR_FIELDS} value={groups} onChange={setGroups} />
      </div>
    );
  },
};

export const InFilterPanel: Story = {
  name: 'In context — filter panel with apply button',
  render: () => {
    const [groups, setGroups] = useState<FilterGroup[]>(initialGroups());
    const [applied, setApplied] = useState(groups);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-2xl">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
          <div className="px-5 py-4 border-b border-[var(--ds-border-base)]">
            <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Advanced filters</p>
          </div>
          <div className="p-5">
            <QueryBuilder fields={VENDOR_FIELDS} value={groups} onChange={setGroups} />
          </div>
          <div className="px-5 py-3 border-t border-[var(--ds-border-base)] flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setGroups([]); setApplied([]); }}
              className="text-sm text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
            >
              Clear all
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={() => setGroups(applied)} className="px-3 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)] transition-colors">
                Cancel
              </button>
              <button type="button" onClick={() => setApplied(groups)} className="px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)] transition-colors">
                Apply filters
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--ds-text-muted)]">
          {applied.length === 0 ? 'No filters applied.' : `${applied.reduce((n, g) => n + g.conditions.length, 0)} conditions applied across ${applied.length} group(s).`}
        </p>
      </div>
    );
  },
};
