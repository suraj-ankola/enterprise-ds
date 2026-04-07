import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DetailPage, DetailSection, FieldGrid } from './DetailPage';
import {
  PencilSimpleIcon,
  DotsThreeIcon,
  WarningIcon,
  BuildingsIcon,
} from '@phosphor-icons/react';

const meta: Meta<typeof DetailPage> = {
  title: 'Page Templates/DetailPage',
  component: DetailPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-page detail / record view with back navigation, avatar, title, status badge, meta row, action buttons, tab navigation, main content area, and optional right sidebar. Exports `DetailSection` (titled card), `FieldGrid` (label/value grid), for composing content inside.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title:    { control: { type: 'text' } },
    subtitle: { control: { type: 'text' } },
    loading:  { control: { type: 'boolean' } },
    children: { control: false },
    sidebar:  { control: false },
    back:     { control: false },
    actions:  { control: false },
    tabs:     { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof DetailPage>;

const TABS = [
  { id: 'overview',  label: 'Overview'                },
  { id: 'risks',     label: 'Risks',     count: 4     },
  { id: 'audits',    label: 'Audits',    count: 12    },
  { id: 'documents', label: 'Documents', count: 7     },
  { id: 'activity',  label: 'Activity'               },
];

const VendorAvatar = () => (
  <div className="h-12 w-12 rounded-xl bg-[var(--ds-brand-100)] border border-[var(--ds-brand-200)] flex items-center justify-center">
    <BuildingsIcon size={22} className="text-[var(--ds-brand-600)]" />
  </div>
);

const StatusBadge = () => (
  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--ds-warning-bg)] text-[var(--ds-warning-text)] border border-[var(--ds-warning-border)] font-medium flex items-center gap-1">
    <WarningIcon size={11} weight="fill" /> High risk
  </span>
);

const VendorOverview = () => (
  <>
    <DetailSection title="Vendor details">
      <FieldGrid fields={[
        { label: 'Legal name',     value: 'Globex International Ltd.' },
        { label: 'HQ region',      value: 'European Union'            },
        { label: 'Framework',      value: 'ISO 27001, SOC 2 Type II'  },
        { label: 'Contract start', value: 'March 15, 2023'            },
        { label: 'Contract end',   value: 'March 14, 2026'            },
        { label: 'Tier',           value: 'Tier 1 – Critical'         },
      ]} />
    </DetailSection>

    <DetailSection title="Risk summary">
      <div className="space-y-2">
        {[
          { label: 'Data access scope',      score: 72, level: 'High'   },
          { label: 'Compliance gap',          score: 45, level: 'Medium' },
          { label: 'Contractual obligations', score: 88, level: 'Low'    },
        ].map(r => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="text-sm text-[var(--ds-text-secondary)] flex-1">{r.label}</span>
            <div className="w-24 h-1.5 rounded-full bg-[var(--ds-bg-subtle)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--ds-brand-500)]" style={{ width: `${r.score}%` }} />
            </div>
            <span className="text-xs text-[var(--ds-text-muted)] w-12 text-right">{r.score}/100</span>
          </div>
        ))}
      </div>
    </DetailSection>
  </>
);

const VendorSidebar = () => (
  <>
    <DetailSection title="Score">
      <div className="text-center py-2">
        <p className="text-4xl font-bold text-[var(--ds-warning-text)] tabular-nums">78</p>
        <p className="text-xs text-[var(--ds-text-muted)] mt-1">Risk score</p>
      </div>
    </DetailSection>

    <DetailSection title="Owner">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-[var(--ds-brand-100)] flex items-center justify-center text-xs font-bold text-[var(--ds-brand-700)]">P</div>
        <div>
          <p className="text-sm font-medium text-[var(--ds-text-primary)]">Priya Sharma</p>
          <p className="text-[11px] text-[var(--ds-text-muted)]">Risk Manager</p>
        </div>
      </div>
    </DetailSection>
  </>
);

export const Playground: Story = {
  render: (args) => {
    const [tab, setTab] = useState('overview');
    return (
      <DetailPage
        {...args}
        back={{ label: 'Back to Vendors', onClick: () => {} }}
        title="Globex Inc"
        subtitle="Cloud infrastructure provider"
        avatar={<VendorAvatar />}
        status={<StatusBadge />}
        meta={
          <>
            <span className="text-xs text-[var(--ds-text-muted)]">Added Mar 2023</span>
            <span className="text-xs text-[var(--ds-text-muted)]">·</span>
            <span className="text-xs text-[var(--ds-text-muted)]">Last audit: Jan 2025</span>
          </>
        }
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
        actions={
          <>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
              <PencilSimpleIcon size={14} /> Edit
            </button>
            <button className="p-1.5 rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
              <DotsThreeIcon size={16} />
            </button>
          </>
        }
        sidebar={<VendorSidebar />}
      >
        <VendorOverview />
      </DetailPage>
    );
  },
  args: { loading: false },
};

export const Loading: Story = {
  name: 'Loading skeleton',
  render: () => (
    <DetailPage
      title=""
      loading
      back={{ label: 'Back', onClick: () => {} }}
    >
      <div />
    </DetailPage>
  ),
};

export const NoSidebar: Story = {
  name: 'No sidebar (full-width)',
  render: () => {
    const [tab, setTab] = useState('overview');
    return (
      <DetailPage
        back={{ label: 'Back to Vendors', onClick: () => {} }}
        title="Globex Inc"
        subtitle="Cloud infrastructure provider"
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
      >
        <VendorOverview />
      </DetailPage>
    );
  },
};
