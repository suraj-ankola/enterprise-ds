import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TaskPanel, type Task } from './TaskPanel';

const meta: Meta<typeof TaskPanel> = {
  title: 'Workflow/TaskPanel',
  component: TaskPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Lightweight Kanban-style task panel grouped by status (To do / In progress / Done). Supports inline task creation per group, inline editing via a context menu, priority badges, due dates, assignees, and tags. Fully controlled — pass `tasks` and `onChange` to manage state.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    title:   { control: { type: 'text' } },
    tasks:   { control: false },
    onChange: { action: 'changed' },
  },
  args: {
    title: 'Tasks',
  },
};
export default meta;
type Story = StoryObj<typeof TaskPanel>;

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Review SOC 2 certification',   status: 'done',        priority: 'high',     assignee: 'Priya S.',  dueDate: 'Jan 15' },
  { id: 't2', title: 'Sign vendor DPA',               status: 'in_progress', priority: 'critical', assignee: 'Marcus L.', dueDate: 'Jan 22' },
  { id: 't3', title: 'Update risk register',          status: 'in_progress', priority: 'medium',                          tags: ['compliance'] },
  { id: 't4', title: 'Schedule quarterly review',     status: 'todo',        priority: 'low' },
  { id: 't5', title: 'Obtain GDPR data mapping',      status: 'todo',        priority: 'high',     dueDate: 'Jan 30',    tags: ['legal'] },
  { id: 't6', title: 'Verify penetration test report', status: 'todo',       priority: 'medium' },
];

export const Playground: Story = {
  render: (args) => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    return (
      <div className="max-w-lg">
        <TaskPanel {...args} tasks={tasks} onChange={setTasks} />
      </div>
    );
  },
};

export const Empty: Story = {
  name: 'Empty state',
  render: () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    return (
      <div className="max-w-lg">
        <TaskPanel title="Vendor tasks" tasks={tasks} onChange={setTasks} />
      </div>
    );
  },
};

export const AllDone: Story = {
  name: 'All tasks completed',
  render: () => {
    const [tasks, setTasks] = useState<Task[]>(
      INITIAL_TASKS.map(t => ({ ...t, status: 'done' as const })),
    );
    return (
      <div className="max-w-lg">
        <TaskPanel tasks={tasks} onChange={setTasks} />
      </div>
    );
  },
};
