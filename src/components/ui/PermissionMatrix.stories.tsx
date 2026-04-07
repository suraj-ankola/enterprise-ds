import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PermissionMatrix, type PermissionRole } from './PermissionMatrix';

const meta: Meta<typeof PermissionMatrix> = {
  title: 'Workflow/PermissionMatrix',
  component: PermissionMatrix,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Role × resource × action permission grid. Each cell cycles through Allowed / Partial / Denied on click. Resources can be grouped. Roles can be marked `locked` to prevent editing. When `onChange` is omitted, the matrix is read-only. Used in RBAC settings screens.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    resources: { control: false },
    actions:   { control: false },
    roles:     { control: false },
    onChange:  { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof PermissionMatrix>;

const ACTIONS = [
  { id: 'view',   label: 'View',   short: 'View'   },
  { id: 'create', label: 'Create', short: 'Create' },
  { id: 'edit',   label: 'Edit',   short: 'Edit'   },
  { id: 'delete', label: 'Delete', short: 'Del'    },
];

const RESOURCES = [
  { id: 'vendors',   label: 'Vendors',       group: 'Vendor management' },
  { id: 'risk',      label: 'Risk register',  group: 'Vendor management' },
  { id: 'audits',    label: 'Audits',         group: 'Vendor management' },
  { id: 'reports',   label: 'Reports',        group: 'Reporting'         },
  { id: 'exports',   label: 'Exports',        group: 'Reporting'         },
  { id: 'users',     label: 'Users',          group: 'Administration'    },
  { id: 'settings',  label: 'Settings',       group: 'Administration'    },
];

const INITIAL_ROLES: PermissionRole[] = [
  {
    id: 'admin', label: 'Admin', locked: true,
    permissions: Object.fromEntries(RESOURCES.map(r => [r.id, Object.fromEntries(ACTIONS.map(a => [a.id, true]))])),
  },
  {
    id: 'manager', label: 'Manager',
    permissions: {
      vendors:  { view: true,  create: true,     edit: true,     delete: 'partial' },
      risk:     { view: true,  create: true,     edit: true,     delete: false     },
      audits:   { view: true,  create: 'partial', edit: 'partial', delete: false   },
      reports:  { view: true,  create: false,    edit: false,    delete: false     },
      exports:  { view: true,  create: true,     edit: false,    delete: false     },
      users:    { view: true,  create: false,    edit: false,    delete: false     },
      settings: { view: false, create: false,    edit: false,    delete: false     },
    },
  },
  {
    id: 'viewer', label: 'Viewer',
    permissions: {
      vendors:  { view: true,  create: false, edit: false, delete: false },
      risk:     { view: true,  create: false, edit: false, delete: false },
      audits:   { view: true,  create: false, edit: false, delete: false },
      reports:  { view: true,  create: false, edit: false, delete: false },
      exports:  { view: false, create: false, edit: false, delete: false },
      users:    { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    },
  },
];

export const Playground: Story = {
  render: (args) => {
    const [roles, setRoles] = useState<PermissionRole[]>(INITIAL_ROLES);
    return (
      <PermissionMatrix
        {...args}
        resources={RESOURCES}
        actions={ACTIONS}
        roles={roles}
        onChange={(r) => { setRoles(r); args.onChange?.(r); }}
      />
    );
  },
};

export const ReadOnly: Story = {
  name: 'Read-only (no onChange)',
  render: () => (
    <PermissionMatrix
      resources={RESOURCES}
      actions={ACTIONS}
      roles={INITIAL_ROLES}
    />
  ),
};

export const SimpleMatrix: Story = {
  name: 'Simple (no groups)',
  render: () => {
    const simpleResources = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'reports',   label: 'Reports'   },
      { id: 'settings',  label: 'Settings'  },
    ];
    const [roles, setRoles] = useState<PermissionRole[]>([
      { id: 'admin',  label: 'Admin',  locked: true, permissions: { dashboard: { view: true, edit: true }, reports: { view: true, edit: true }, settings: { view: true, edit: true } } },
      { id: 'editor', label: 'Editor',              permissions: { dashboard: { view: true, edit: true }, reports: { view: true, edit: false }, settings: { view: false, edit: false } } },
      { id: 'viewer', label: 'Viewer',              permissions: { dashboard: { view: true, edit: false }, reports: { view: true, edit: false }, settings: { view: false, edit: false } } },
    ]);
    return (
      <PermissionMatrix
        resources={simpleResources}
        actions={[{ id: 'view', label: 'View' }, { id: 'edit', label: 'Edit' }]}
        roles={roles}
        onChange={setRoles}
      />
    );
  },
};
