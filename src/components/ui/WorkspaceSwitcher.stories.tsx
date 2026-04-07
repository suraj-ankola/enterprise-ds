import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WorkspaceSwitcher, type Workspace } from './WorkspaceSwitcher';

const meta: Meta<typeof WorkspaceSwitcher> = {
  title: 'Navigation/WorkspaceSwitcher',
  component: WorkspaceSwitcher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-workspace / multi-organisation switcher for SaaS sidebars. Supports collapsed (icon-only) mode, custom avatars, plan labels, and an optional "Create workspace" action. The dropdown uses a listbox role with keyboard-accessible options.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    workspaces: {
      description: 'Array of workspace objects to display in the dropdown',
      control: false,
    },
    currentId: {
      description: 'ID of the currently active workspace',
      control: { type: 'text' },
    },
    collapsed: {
      description: 'When true, only the avatar is shown (for narrow sidebars)',
      control: { type: 'boolean' },
    },
    onSwitch: {
      description: 'Callback fired with the new workspace ID when the user switches',
      action: 'switched',
    },
    onCreateNew: {
      description: 'Optional callback for the "Create workspace" footer button. Omit to hide the button.',
      action: 'createNew',
    },
    className: {
      description: 'Additional CSS class names for the root element',
      control: { type: 'text' },
    },
  },
};
export default meta;
type Story = StoryObj<typeof WorkspaceSwitcher>;

const WORKSPACES: Workspace[] = [
  { id: 'ws1', name: 'Acme Corp',       plan: 'Enterprise',  color: '#6366f1' },
  { id: 'ws2', name: 'Globex Inc',       plan: 'Pro',         color: '#0ea5e9' },
  { id: 'ws3', name: 'Initech Solutions', plan: 'Team',       color: '#10b981' },
];

export const Playground: Story = {
  render: (args) => {
    const [currentId, setCurrentId] = useState(args.currentId ?? 'ws1');
    return (
      <div className="w-60 p-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
        <WorkspaceSwitcher
          {...args}
          workspaces={WORKSPACES}
          currentId={currentId}
          onSwitch={(id) => { setCurrentId(id); args.onSwitch?.(id); }}
        />
      </div>
    );
  },
  args: {
    currentId: 'ws1',
    collapsed: false,
  },
};

export const WithCreateNew: Story = {
  name: 'With "Create workspace" action',
  render: () => {
    const [currentId, setCurrentId] = useState('ws1');
    return (
      <div className="w-60 p-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
        <WorkspaceSwitcher
          workspaces={WORKSPACES}
          currentId={currentId}
          onSwitch={setCurrentId}
          onCreateNew={() => alert('Create workspace clicked')}
        />
      </div>
    );
  },
};

export const Collapsed: Story = {
  name: 'Collapsed (icon-only)',
  render: () => {
    const [currentId, setCurrentId] = useState('ws2');
    return (
      <div className="w-12 p-1 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl flex justify-center">
        <WorkspaceSwitcher
          workspaces={WORKSPACES}
          currentId={currentId}
          onSwitch={setCurrentId}
          onCreateNew={() => {}}
          collapsed
        />
      </div>
    );
  },
};

export const SingleWorkspace: Story = {
  name: 'Single workspace',
  render: () => {
    const [currentId, setCurrentId] = useState('ws1');
    return (
      <div className="w-60 p-2 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl">
        <WorkspaceSwitcher
          workspaces={[WORKSPACES[0]]}
          currentId={currentId}
          onSwitch={setCurrentId}
          onCreateNew={() => {}}
        />
      </div>
    );
  },
};

export const InSidebar: Story = {
  name: 'In context — sidebar layout',
  render: () => {
    const [currentId, setCurrentId] = useState('ws1');
    return (
      <div className="flex h-96 w-56 flex-col bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        {/* Sidebar header */}
        <div className="p-3 border-b border-[var(--ds-border-base)]">
          <WorkspaceSwitcher
            workspaces={WORKSPACES}
            currentId={currentId}
            onSwitch={setCurrentId}
            onCreateNew={() => {}}
          />
        </div>
        {/* Nav items placeholder */}
        <nav className="flex-1 p-2 space-y-0.5">
          {['Dashboard', 'Vendors', 'Reports', 'Settings'].map(item => (
            <div
              key={item}
              className="px-3 py-2 rounded-lg text-sm text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-subtle)] cursor-pointer"
            >
              {item}
            </div>
          ))}
        </nav>
      </div>
    );
  },
};
