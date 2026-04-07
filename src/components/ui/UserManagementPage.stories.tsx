import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserManagementPage, User } from './UserManagementPage';

const meta: Meta<typeof UserManagementPage> = {
  title: 'Page Templates/UserManagementPage',
  component: UserManagementPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full enterprise user management page. Supports search, role filtering, inline role assignment, and user actions (suspend / remove). Use the Playground story to interact with all features.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof UserManagementPage>;

// ─── Shared sample data ───────────────────────────────────────────────────────

const ROLES = ['Admin', 'Editor', 'Viewer', 'Billing'];

const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Elena Vasquez',
    email: 'elena.vasquez@company.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2 hours ago',
  },
  {
    id: '2',
    name: 'James Thornton',
    email: 'james.thornton@company.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '1 day ago',
  },
  {
    id: '3',
    name: 'Priya Mehta',
    email: 'priya.mehta@company.com',
    role: 'Viewer',
    status: 'invited',
    lastLogin: undefined,
  },
  {
    id: '4',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@company.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '3 days ago',
  },
  {
    id: '5',
    name: 'Fatima Al-Hassan',
    email: 'fatima.alhassan@company.com',
    role: 'Billing',
    status: 'suspended',
    lastLogin: '14 days ago',
  },
  {
    id: '6',
    name: 'Tom Nakamura',
    email: 'tom.nakamura@company.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '5 hours ago',
  },
  {
    id: '7',
    name: 'Sophie Dubois',
    email: 'sophie.dubois@company.com',
    role: 'Editor',
    status: 'invited',
    lastLogin: undefined,
  },
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [users, setUsers] = useState<User[]>(SAMPLE_USERS);

    const handleRoleChange = (userId: string | number, newRole: string) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    };

    const handleSuspend = (userId: string | number) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: 'suspended' as const } : u
        )
      );
    };

    const handleRemove = (userId: string | number) => {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    const handleInvite = () => {
      alert('Invite member dialog would open here');
    };

    return (
      <UserManagementPage
        users={users}
        roles={ROLES}
        onInvite={handleInvite}
        onRoleChange={handleRoleChange}
        onSuspend={handleSuspend}
        onRemove={handleRemove}
        loading={false}
      />
    );
  },
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <UserManagementPage
      users={[]}
      roles={ROLES}
      onInvite={() => {}}
      onRoleChange={() => {}}
      onSuspend={() => {}}
      onRemove={() => {}}
      loading={true}
    />
  ),
};

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <UserManagementPage
      users={[]}
      roles={ROLES}
      onInvite={() => alert('Invite member')}
      onRoleChange={() => {}}
      onSuspend={() => {}}
      onRemove={() => {}}
      loading={false}
    />
  ),
};
