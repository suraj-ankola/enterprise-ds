import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  FolderIcon, FolderOpenIcon, FileTextIcon,
  ShieldCheckIcon, BuildingsIcon, UsersIcon,
  GearIcon, LockIcon,
} from '@phosphor-icons/react';
import { Tree, type TreeNode } from './Tree';

const meta: Meta<typeof Tree> = {
  title: 'Data Display/Tree',
  component: Tree,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hierarchical tree view with expand/collapse, single selection, and optional icons. Keyboard accessible (role="tree"). Controlled or uncontrolled expanded/selected state.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tree>;

// ─── Shared data ──────────────────────────────────────────────────────────────

const orgNodes: TreeNode[] = [
  {
    id: 'acme',
    label: 'Acme Corp',
    icon: <BuildingsIcon size={14} />,
    children: [
      {
        id: 'acme-infra',
        label: 'Infrastructure',
        icon: <GearIcon size={14} />,
        children: [
          { id: 'acme-infra-aws',   label: 'AWS',   icon: <FileTextIcon size={13} /> },
          { id: 'acme-infra-azure', label: 'Azure', icon: <FileTextIcon size={13} /> },
        ],
      },
      {
        id: 'acme-hr',
        label: 'HR Systems',
        icon: <UsersIcon size={14} />,
        children: [
          { id: 'acme-hr-workday', label: 'Workday', icon: <FileTextIcon size={13} /> },
        ],
      },
    ],
  },
  {
    id: 'globalsys',
    label: 'GlobalSys',
    icon: <BuildingsIcon size={14} />,
    children: [
      { id: 'globalsys-sec', label: 'Security', icon: <ShieldCheckIcon size={14} /> },
      { id: 'globalsys-id',  label: 'Identity',  icon: <LockIcon size={14} />, disabled: true },
    ],
  },
  {
    id: 'datavault',
    label: 'DataVault',
    icon: <BuildingsIcon size={14} />,
  },
];

const frameworkNodes: TreeNode[] = [
  {
    id: 'iso',
    label: 'ISO 27001',
    icon: <FolderIcon size={14} />,
    children: [
      { id: 'iso-a5',  label: 'A.5 Information security policies', icon: <FileTextIcon size={13} /> },
      { id: 'iso-a6',  label: 'A.6 Organisation of information security', icon: <FileTextIcon size={13} /> },
      { id: 'iso-a9',  label: 'A.9 Access control', icon: <FileTextIcon size={13} /> },
      { id: 'iso-a12', label: 'A.12 Operations security', icon: <FileTextIcon size={13} /> },
    ],
  },
  {
    id: 'soc2',
    label: 'SOC 2',
    icon: <FolderIcon size={14} />,
    children: [
      { id: 'soc2-cc1', label: 'CC1 – Control environment', icon: <FileTextIcon size={13} /> },
      { id: 'soc2-cc6', label: 'CC6 – Logical access',      icon: <FileTextIcon size={13} /> },
      { id: 'soc2-cc7', label: 'CC7 – System operations',   icon: <FileTextIcon size={13} /> },
    ],
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    icon: <FolderIcon size={14} />,
  },
];

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <Tree
          nodes={orgNodes}
          selected={selected}
          onSelect={setSelected}
          defaultExpanded={['acme']}
        />
        {selected && (
          <p className="mt-3 text-xs text-[var(--ds-text-muted)]">Selected: {selected}</p>
        )}
      </div>
    );
  },
};

export const FrameworkTree: Story = {
  name: 'Compliance framework navigator',
  render: () => {
    const [selected, setSelected] = useState<string | undefined>('iso-a9');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-4">
          <p className="text-xs font-semibold text-[var(--ds-text-muted)] uppercase tracking-wide mb-3">
            Frameworks
          </p>
          <Tree
            nodes={frameworkNodes}
            selected={selected}
            onSelect={setSelected}
            defaultExpanded={['iso', 'soc2']}
          />
        </div>
        {selected && (
          <p className="mt-3 text-xs text-[var(--ds-text-muted)]">Active control: {selected}</p>
        )}
      </div>
    );
  },
};

export const WithDisabledNodes: Story = {
  name: 'Disabled nodes',
  render: () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <Tree
          nodes={orgNodes}
          selected={selected}
          onSelect={setSelected}
          defaultExpanded={['globalsys']}
        />
        <p className="mt-3 text-xs text-[var(--ds-text-muted)]">
          "Identity" node is disabled — cannot be selected.
        </p>
      </div>
    );
  },
};

export const FlatList: Story = {
  name: 'Flat list (no nesting)',
  render: () => {
    const [selected, setSelected] = useState<string | undefined>('vendor-2');
    const flat: TreeNode[] = [
      { id: 'vendor-1', label: 'Acme Corp',   icon: <BuildingsIcon size={14} /> },
      { id: 'vendor-2', label: 'GlobalSys',   icon: <BuildingsIcon size={14} /> },
      { id: 'vendor-3', label: 'DataVault',   icon: <BuildingsIcon size={14} /> },
      { id: 'vendor-4', label: 'SecureBase',  icon: <BuildingsIcon size={14} /> },
      { id: 'vendor-5', label: 'CloudTrust',  icon: <BuildingsIcon size={14} /> },
    ];
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-xs">
        <Tree nodes={flat} selected={selected} onSelect={setSelected} />
      </div>
    );
  },
};

export const Controlled: Story = {
  name: 'Fully controlled',
  render: () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [expanded, setExpanded] = useState<string[]>(['iso']);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setExpanded(['iso', 'soc2', 'gdpr'])}
            className="px-2.5 py-1 text-xs rounded-md border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => setExpanded([])}
            className="px-2.5 py-1 text-xs rounded-md border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]"
          >
            Collapse all
          </button>
        </div>
        <Tree
          nodes={frameworkNodes}
          selected={selected}
          onSelect={setSelected}
          expanded={expanded}
          onExpandChange={setExpanded}
        />
      </div>
    );
  },
};

export const InSidebar: Story = {
  name: 'In context — sidebar navigation',
  render: () => {
    const [selected, setSelected] = useState<string | undefined>('iso-a9');
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <div className="flex h-80 w-72 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
          <div className="w-full p-3 overflow-y-auto">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ds-text-muted)] px-2 mb-2">
              Control library
            </p>
            <Tree
              nodes={frameworkNodes}
              selected={selected}
              onSelect={setSelected}
              defaultExpanded={['iso']}
            />
          </div>
        </div>
      </div>
    );
  },
};
