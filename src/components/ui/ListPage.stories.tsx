import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ListPage } from './ListPage';
import { PlusIcon, FunnelIcon } from '@phosphor-icons/react';

const meta: Meta<typeof ListPage> = {
  title: 'Page Templates/ListPage',
  component: ListPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-page list/table layout with integrated search bar, filter area, sort control, bulk actions bar slot, and pagination. The main content area wraps children in a card. Supports a loading skeleton state. Designed for resource index pages (vendors, users, transactions, etc.).',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title:             { control: { type: 'text' } },
    subtitle:          { control: { type: 'text' } },
    totalCount:        { control: { type: 'number' } },
    loading:           { control: { type: 'boolean' } },
    searchPlaceholder: { control: { type: 'text' } },
    children:          { control: false },
    primaryAction:     { control: false },
    actions:           { control: false },
    filters:           { control: false },
    pagination:        { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof ListPage>;

const ROWS = [
  { name: 'Acme Corp',         tier: 'Critical', score: 92, region: 'US'   },
  { name: 'Globex Inc',        tier: 'High',     score: 78, region: 'EU'   },
  { name: 'Initech Solutions', tier: 'Medium',   score: 55, region: 'APAC' },
  { name: 'Umbrella Corp',     tier: 'High',     score: 74, region: 'EU'   },
  { name: 'Stark Industries',  tier: 'Low',      score: 22, region: 'US'   },
];

const TIER_CLS: Record<string, string> = {
  Critical: 'bg-[var(--ds-danger-bg)]  text-[var(--ds-danger-text)]',
  High:     'bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)]',
  Medium:   'bg-[var(--ds-info-bg)]    text-[var(--ds-info-text)]',
  Low:      'bg-[var(--ds-success-bg)] text-[var(--ds-success-text)]',
};

function VendorTable({ rows }: { rows: typeof ROWS }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-[var(--ds-border-base)] bg-[var(--ds-bg-subtle)]">
          {['Vendor', 'Risk tier', 'Score', 'Region'].map(h => (
            <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[var(--ds-text-muted)]">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.name} className="border-b border-[var(--ds-border-base)] last:border-0 hover:bg-[var(--ds-bg-subtle)]">
            <td className="px-5 py-3 font-medium text-[var(--ds-text-primary)]">{row.name}</td>
            <td className="px-5 py-3">
              <span className={['text-xs px-2 py-0.5 rounded-full font-medium', TIER_CLS[row.tier]].join(' ')}>{row.tier}</span>
            </td>
            <td className="px-5 py-3 text-[var(--ds-text-secondary)] tabular-nums">{row.score}</td>
            <td className="px-5 py-3 text-[var(--ds-text-muted)]">{row.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const Playground: Story = {
  render: (args) => {
    const [search, setSearch] = useState('');
    const filtered = ROWS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    return (
      <ListPage
        {...args}
        title="Vendors"
        totalCount={1284}
        subtitle="Manage and monitor your vendor risk register"
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search vendors…"
        primaryAction={
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]">
            <PlusIcon size={14} /> Add vendor
          </button>
        }
        filters={
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
            <FunnelIcon size={12} /> Filter
          </button>
        }
      >
        <VendorTable rows={filtered} />
      </ListPage>
    );
  },
  args: { loading: false },
};

export const Loading: Story = {
  name: 'Loading skeleton',
  render: () => (
    <ListPage title="Vendors" loading>
      <div />
    </ListPage>
  ),
};
