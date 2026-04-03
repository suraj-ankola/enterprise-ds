import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  PlusCircleIcon,
  TrashIcon,
  ArrowRightIcon,
  DownloadSimpleIcon,
  FloppyDiskIcon,
} from '@phosphor-icons/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches button to fill its container',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component: 'Primary interactive element. 4 variants (primary · secondary · ghost · danger), 3 sizes on the 8pt grid. Supports loading spinner, disabled, left/right icon slots, and full-width mode. All variants use `--ds-brand-*` tokens — they switch automatically with the product theme.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Variants ────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

// ─── States ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, children: 'Saving...' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full Width Button' },
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  args: {
    children: 'Add Vendor',
    leftIcon: <PlusCircleIcon size={16} weight="bold" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'secondary',
    children: 'Continue',
    rightIcon: <ArrowRightIcon size={16} weight="bold" />,
  },
};

export const SaveButton: Story = {
  args: {
    children: 'Save Changes',
    leftIcon: <FloppyDiskIcon size={16} weight="bold" />,
  },
};

export const ExportButton: Story = {
  args: {
    variant: 'secondary',
    children: 'Export Report',
    leftIcon: <DownloadSimpleIcon size={16} weight="bold" />,
  },
};

export const DangerWithIcon: Story = {
  args: {
    variant: 'danger',
    children: 'Delete Record',
    leftIcon: <TrashIcon size={16} weight="bold" />,
  },
};
