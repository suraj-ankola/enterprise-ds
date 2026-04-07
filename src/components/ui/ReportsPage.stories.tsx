'use client';
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReportsPage, type Report } from './ReportsPage';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ReportsPage> = {
  title: 'Page Templates/ReportsPage',
  component: ReportsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full enterprise reports page with category sidebar, report cards grid, status indicators, generate/download/schedule actions, loading skeleton, and empty states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReportsPage>;

// ─── Fixture data ─────────────────────────────────────────────────────────────

const BASE_REPORTS: Report[] = [
  {
    id: 'r1',
    title: 'Vendor Risk Summary',
    description: 'Consolidated risk scores for all active vendors, ranked by criticality and exposure.',
    category: 'Risk',
    lastGenerated: '2 hours ago',
    schedule: 'Weekly on Monday',
    status: 'ready',
    format: 'pdf',
  },
  {
    id: 'r2',
    title: 'Inherent Risk Heatmap',
    description: 'Visual risk matrix showing inherent risk distribution across all vendor tiers.',
    category: 'Risk',
    lastGenerated: '1 day ago',
    status: 'ready',
    format: 'pdf',
  },
  {
    id: 'r3',
    title: 'ISO 27001 Compliance Gaps',
    description: 'Identifies controls with missing evidence or non-conformance against ISO 27001:2022.',
    category: 'Compliance',
    lastGenerated: '3 days ago',
    schedule: 'Monthly',
    status: 'ready',
    format: 'xlsx',
  },
  {
    id: 'r4',
    title: 'SOC 2 Readiness',
    description: 'Audit readiness report showing which SOC 2 Trust Services Criteria are met.',
    category: 'Compliance',
    status: 'error',
    format: 'pdf',
  },
  {
    id: 'r5',
    title: 'Vendor Questionnaire Completion',
    description: 'Tracks questionnaire response status across all active vendor onboarding workflows.',
    category: 'Vendors',
    lastGenerated: '5 hours ago',
    status: 'ready',
    format: 'csv',
  },
  {
    id: 'r6',
    title: 'Fourth-Party Exposure',
    description: 'Maps sub-processors and sub-vendors linked to your critical tier-1 vendors.',
    category: 'Vendors',
    status: 'generating',
    format: 'xlsx',
  },
  {
    id: 'r7',
    title: 'Audit Activity Log',
    description: 'Full chronological log of audit actions, evidence uploads, and reviewer comments.',
    category: 'Audits',
    lastGenerated: '1 week ago',
    schedule: 'Quarterly',
    status: 'ready',
    format: 'csv',
  },
  {
    id: 'r8',
    title: 'Control Evidence Summary',
    description: 'Shows which controls have sufficient evidence and which are still outstanding.',
    category: 'Audits',
    lastGenerated: '2 days ago',
    status: 'ready',
    format: 'xlsx',
  },
];

// ─── Interactive wrapper ──────────────────────────────────────────────────────

function InteractiveReportsPage({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState<Report[]>(initialReports);

  function handleGenerate(id: string) {
    // Set to generating immediately
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'generating' } : r)
    );
    // After 2.5 seconds, mark as ready
    setTimeout(() => {
      setReports(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, status: 'ready', lastGenerated: 'just now' }
            : r
        )
      );
    }, 2500);
  }

  function handleDownload(id: string) {
    // In a real app this would trigger a file download
    console.log('Download report:', id);
  }

  function handleSchedule(id: string) {
    console.log('Schedule report:', id);
  }

  return (
    <ReportsPage
      reports={reports}
      onGenerate={handleGenerate}
      onDownload={handleDownload}
      onSchedule={handleSchedule}
      loading={false}
    />
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => <InteractiveReportsPage initialReports={BASE_REPORTS} />,
};

export const Loading: Story = {
  name: 'Loading',
  render: () => (
    <ReportsPage
      reports={[]}
      onGenerate={() => {}}
      onDownload={() => {}}
      onSchedule={() => {}}
      loading={true}
    />
  ),
};

export const EmptyCategory: Story = {
  name: 'Empty Category',
  render: () => (
    // Only include reports from two categories so the others show empty state
    <InteractiveReportsPage
      initialReports={[
        ...BASE_REPORTS.filter(r => r.category === 'Risk'),
        // Include an "Investigations" category with no reports by making the sidebar
        // show it via a dummy placeholder that is immediately filtered out
      ].concat([
        {
          id: 'empty-cat-trigger',
          title: 'Empty Investigations',
          description: 'This category exists but has been filtered to show an empty state. Switch to Investigations in the sidebar.',
          category: 'Investigations',
          status: 'ready' as const,
          format: 'pdf' as const,
        },
      ])}
    />
  ),
};

export const AllGenerating: Story = {
  name: 'All Generating',
  render: () => (
    <ReportsPage
      reports={BASE_REPORTS.map(r => ({ ...r, status: 'generating' }))}
      onGenerate={() => {}}
      onDownload={() => {}}
      onSchedule={() => {}}
      loading={false}
    />
  ),
};

export const AllError: Story = {
  name: 'All Error',
  render: () => (
    <ReportsPage
      reports={BASE_REPORTS.map(r => ({ ...r, status: 'error', lastGenerated: undefined }))}
      onGenerate={() => {}}
      onDownload={() => {}}
      onSchedule={() => {}}
      loading={false}
    />
  ),
};
