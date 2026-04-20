import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { KanbanBoard } from './KanbanBoard';
import type { KanbanColumnData } from './KanbanBoard';

// ─── Demo data ────────────────────────────────────────────────────────────────

const INITIAL_COLUMNS: KanbanColumnData[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#94a3b8',
    cards: [
      {
        id: 'c1',
        title: 'Acme Corp — Annual audit due',
        description: 'Prepare documentation for the annual compliance audit.',
        priority: 'medium',
        tags: [{ label: 'Audit', color: '#6366f1' }],
        assignee: { name: 'Sarah Chen', initials: 'SC', color: '#7c3aed' },
        dueDate: '2026-05-15',
      },
      {
        id: 'c2',
        title: 'Update vendor contract — Globex',
        priority: 'low',
        tags: [{ label: 'Contract' }],
        assignee: { name: 'Mike Ross', initials: 'MR', color: '#0891b2' },
      },
    ],
  },
  {
    id: 'in-review',
    title: 'In Review',
    color: '#f59e0b',
    limit: 3,
    cards: [
      {
        id: 'c3',
        title: 'Risk score recalculation — Q1 vendors',
        description: 'AI flagged 3 vendors for unusual activity in Q1 reports.',
        priority: 'high',
        tags: [{ label: 'AI Alert', color: '#dc2626' }, { label: 'Q1' }],
        assignee: { name: 'Priya Nair', initials: 'PN', color: '#059669' },
        dueDate: '2026-04-28',
      },
      {
        id: 'c4',
        title: 'ISO 27001 certification — Initech',
        priority: 'medium',
        tags: [{ label: 'ISO', color: '#2563eb' }],
        dueDate: '2026-04-25',
      },
    ],
  },
  {
    id: 'approved',
    title: 'Approved',
    color: '#10b981',
    cards: [
      {
        id: 'c5',
        title: 'GDPR data processing addendum — Stark',
        priority: 'high',
        tags: [{ label: 'GDPR', color: '#7c3aed' }],
        assignee: { name: 'Sarah Chen', initials: 'SC', color: '#7c3aed' },
      },
    ],
  },
  {
    id: 'closed',
    title: 'Closed',
    color: '#64748b',
    cards: [
      {
        id: 'c6',
        title: 'Vendor onboarding — Massive Dynamic',
        priority: 'low',
        assignee: { name: 'Alex Kim', initials: 'AK', color: '#0891b2' },
        dueDate: '2026-03-01',
      },
    ],
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof KanbanBoard> = {
  title: 'Advanced/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs'],
  argTypes: {
    columns:     { control: false },
    onChange:    { control: false },
    onCardClick: { control: false },
    onAddCard:   { control: false },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Drag-and-drop Kanban board. Cards can be dragged within a column or across columns. Drop zones appear as highlighted areas between cards during drag. Supports: priority indicators, tags, assignee avatars, due dates, WIP limits per column, and add-card callbacks. Fully controlled via `columns` + `onChange`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// ─── Default (interactive) ────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [columns, setColumns] = useState<KanbanColumnData[]>(INITIAL_COLUMNS);
    return (
      <div className="p-6 bg-[var(--ds-bg-base)] min-h-screen">
        <KanbanBoard
          columns={columns}
          onChange={setColumns}
          onCardClick={(card, colId) => alert(`Clicked: ${card.title} (in ${colId})`)}
          onAddCard={(colId) => alert(`Add card to: ${colId}`)}
        />
      </div>
    );
  },
};

// ─── WIP limit exceeded ───────────────────────────────────────────────────────

export const WIPLimitExceeded: Story = {
  name: 'WIP limit exceeded',
  render: () => {
    const cols: KanbanColumnData[] = [
      {
        id: 'todo',
        title: 'To Do',
        color: '#94a3b8',
        cards: [
          { id: 'a1', title: 'Task A', priority: 'low' },
          { id: 'a2', title: 'Task B', priority: 'medium' },
        ],
      },
      {
        id: 'progress',
        title: 'In Progress',
        color: '#f59e0b',
        limit: 2,
        cards: [
          { id: 'b1', title: 'Task C', priority: 'high' },
          { id: 'b2', title: 'Task D', priority: 'medium' },
          { id: 'b3', title: 'Task E — exceeds WIP', priority: 'critical' },
        ],
      },
      { id: 'done', title: 'Done', color: '#10b981', cards: [] },
    ];
    const [columns, setColumns] = useState(cols);
    return (
      <div className="p-6 bg-[var(--ds-bg-base)]">
        <KanbanBoard columns={columns} onChange={setColumns} />
      </div>
    );
  },
};

// ─── Minimal (empty columns) ──────────────────────────────────────────────────

export const EmptyColumns: Story = {
  render: () => (
    <div className="p-6 bg-[var(--ds-bg-base)]">
      <KanbanBoard
        columns={[
          { id: 'todo',       title: 'To Do',       color: '#94a3b8', cards: [] },
          { id: 'in-progress',title: 'In Progress',  color: '#f59e0b', cards: [] },
          { id: 'done',       title: 'Done',         color: '#10b981', cards: [] },
        ]}
        onAddCard={(colId) => alert(`Add card to: ${colId}`)}
      />
    </div>
  ),
};
