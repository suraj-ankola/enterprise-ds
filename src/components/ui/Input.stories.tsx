import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  LockIcon,
  EyeIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  BuildingsIcon,
} from '@phosphor-icons/react';
import { Input } from './Input';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size:         { control: 'select', options: ['sm', 'md', 'lg'] },
    status:       { control: 'select', options: ['default', 'error', 'success'] },
    label:        { control: 'text' },
    helperText:   { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder:  { control: 'text' },
    disabled:     { control: 'boolean' },
    readOnly:     { control: 'boolean' },
    required:     { control: 'boolean' },
    fullWidth:    { control: 'boolean' },
  },
  args: {
    placeholder: 'Placeholder text',
    size: 'md',
    status: 'default',
    disabled: false,
    readOnly: false,
    required: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Base ─────────────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Email address', placeholder: 'you@company.com' },
};

export const Required: Story = {
  args: { label: 'Full name', placeholder: 'John Smith', required: true },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_smith',
    helperText: 'Only lowercase letters, numbers, and underscores.',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@company.com',
    defaultValue: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_smith',
    defaultValue: 'john_smith',
    status: 'success',
    helperText: 'Username is available.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-00129',
    disabled: true,
    helperText: 'Contact support to change your account ID.',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'API Key',
    defaultValue: 'sk-live-abc123xyz',
    readOnly: true,
    helperText: 'This key is read-only.',
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search vendors, contracts...',
    leftIcon: <MagnifyingGlassIcon size={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    leftIcon: <LockIcon size={16} />,
    rightIcon: <EyeIcon size={16} />,
  },
};

export const EmailField: Story = {
  args: {
    label: 'Work email',
    type: 'email',
    placeholder: 'you@company.com',
    leftIcon: <EnvelopeIcon size={16} />,
    helperText: "We'll send your invite link here.",
  },
};

export const PhoneField: Story = {
  args: {
    label: 'Phone number',
    type: 'tel',
    placeholder: '+91 98765 43210',
    leftIcon: <PhoneIcon size={16} />,
  },
};

export const CompanyField: Story = {
  args: {
    label: 'Company',
    placeholder: 'Acme Corporation',
    leftIcon: <BuildingsIcon size={16} />,
  },
};

export const BudgetField: Story = {
  args: {
    label: 'Budget',
    type: 'number',
    placeholder: '0.00',
    leftIcon: <CurrencyDollarIcon size={16} />,
    helperText: 'Enter amount in USD',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', label: 'Small', placeholder: 'Small input' },
};

export const Medium: Story = {
  args: { size: 'md', label: 'Medium', placeholder: 'Medium input' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'Large', placeholder: 'Large input' },
};

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  args: {
    label: 'Company name',
    placeholder: 'Acme Corporation',
    fullWidth: true,
  },
};
