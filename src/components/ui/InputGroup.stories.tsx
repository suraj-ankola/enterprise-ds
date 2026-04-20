import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  MagnifyingGlassIcon,
  GlobeIcon,
  CopyIcon,
  ArrowRightIcon,
  PhoneIcon,
  LinkIcon,
  AtIcon,
  LockIcon,
  CurrencyDollarIcon,
} from '@phosphor-icons/react';
import { InputGroup, AddonButton } from './InputGroup';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof InputGroup> = {
  title: 'Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size:         { control: 'select', options: ['sm', 'md', 'lg'] },
    status:       { control: 'select', options: ['default', 'error', 'success'] },
    label:        { control: 'text' },
    helperText:   { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder:  { control: 'text' },
    disabled:     { control: 'boolean' },
    required:     { control: 'boolean' },
    fullWidth:    { control: 'boolean' },
    prefix:       { control: false },
    suffix:       { control: false },
    addonButton:  { control: false },
    leftIcon:     { control: false },
    rightIcon:    { control: false },
  },
  args: {
    placeholder: 'Placeholder',
    size: 'md',
    status: 'default',
    disabled: false,
    required: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Extends Input with three attachment patterns: **prefix/suffix text addons** (fixed labels outside the input), **icons inside the input**, and **addon buttons** flush to the right edge. All three can be combined. Use `<AddonButton />` for the attached button — pass matching `size` and `status` props.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

// ─── Pattern 1 — Prefix / Suffix text addons ─────────────────────────────────

export const PrefixText: Story = {
  name: 'Prefix — Dollar amount',
  args: {
    label: 'Budget',
    placeholder: '0.00',
    prefix: '$',
    helperText: 'Enter amount in USD',
  },
};

export const SuffixText: Story = {
  name: 'Suffix — Domain',
  args: {
    label: 'Subdomain',
    placeholder: 'your-company',
    suffix: '.acme.com',
  },
};

export const PrefixAndSuffix: Story = {
  name: 'Prefix + Suffix — Currency with unit',
  args: {
    label: 'Amount',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
  },
};

export const UrlPrefix: Story = {
  name: 'Prefix — URL',
  args: {
    label: 'Website',
    placeholder: 'your-company.com',
    prefix: 'https://',
    leftIcon: <GlobeIcon size={16} />,
  },
};

export const PhonePrefix: Story = {
  name: 'Prefix — Country code',
  args: {
    label: 'Phone number',
    type: 'tel',
    placeholder: '98765 43210',
    prefix: '+91',
    leftIcon: <PhoneIcon size={16} />,
  },
};

export const EmailDomain: Story = {
  name: 'Prefix + Suffix — Email with domain lock',
  args: {
    label: 'Work email',
    placeholder: 'john.smith',
    prefix: <AtIcon size={14} />,
    suffix: '@acme.com',
    helperText: 'Your corporate email will be auto-assigned.',
  },
};

// ─── Pattern 2 — Icons inside the input ──────────────────────────────────────

export const LeftIconOnly: Story = {
  name: 'Icon — Left only',
  args: {
    label: 'Search vendors',
    placeholder: 'Search vendors, contracts...',
    leftIcon: <MagnifyingGlassIcon size={16} />,
  },
};

export const BothIcons: Story = {
  name: 'Icon — Left + Right with prefix',
  args: {
    label: 'Secure URL',
    placeholder: 'your-company.com',
    prefix: 'https://',
    leftIcon: <LinkIcon size={16} />,
    rightIcon: <LockIcon size={16} />,
  },
};

// ─── Pattern 3 — Addon button ────────────────────────────────────────────────

export const AddonButtonDefault: Story = {
  name: 'Addon Button — Default (Copy)',
  args: {
    label: 'API Key',
    defaultValue: 'sk-live-abc123xyz456',
    readOnly: true,
    addonButton: (
      <AddonButton size="md" rightIcon={<CopyIcon size={14} />}>
        Copy
      </AddonButton>
    ),
  },
};

export const AddonButtonPrimary: Story = {
  name: 'Addon Button — Primary (Search)',
  args: {
    label: 'Search',
    placeholder: 'Search vendors, contracts...',
    leftIcon: <MagnifyingGlassIcon size={16} />,
    addonButton: (
      <AddonButton size="md" variant="primary">
        Search
      </AddonButton>
    ),
  },
};

export const AddonButtonIconOnly: Story = {
  name: 'Addon Button — Icon only (Go)',
  args: {
    label: 'Navigate to URL',
    placeholder: 'https://',
    addonButton: (
      <AddonButton size="md" variant="primary" aria-label="Go">
        <ArrowRightIcon size={16} />
      </AddonButton>
    ),
  },
};

// ─── All three combined ───────────────────────────────────────────────────────

export const AllThreeCombined: Story = {
  name: 'All three — Prefix + Icon + Addon Button',
  args: {
    label: 'Search with domain filter',
    placeholder: 'vendor name or ID...',
    prefix: 'acme.com /',
    leftIcon: <MagnifyingGlassIcon size={16} />,
    addonButton: (
      <AddonButton size="md" variant="primary">
        Search
      </AddonButton>
    ),
  },
};

export const AllThreeWithSuffix: Story = {
  name: 'All three — Prefix + Suffix + Icon',
  args: {
    label: 'Budget range',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    leftIcon: <CurrencyDollarIcon size={16} />,
    helperText: 'Per vendor contract value',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  name: 'State — Error',
  args: {
    label: 'Website',
    placeholder: 'your-company.com',
    prefix: 'https://',
    defaultValue: 'not a valid url!!',
    errorMessage: 'Enter a valid URL without spaces or special characters.',
    addonButton: (
      <AddonButton size="md" status="error" variant="primary">
        Check
      </AddonButton>
    ),
  },
};

export const SuccessState: Story = {
  name: 'State — Success',
  args: {
    label: 'Website',
    placeholder: 'your-company.com',
    prefix: 'https://',
    defaultValue: 'acme.com',
    status: 'success',
    helperText: 'URL is reachable.',
    addonButton: (
      <AddonButton size="md" status="success">
        Verified
      </AddonButton>
    ),
  },
};

export const DisabledState: Story = {
  name: 'State — Disabled',
  args: {
    label: 'Account domain',
    defaultValue: 'acme',
    suffix: '.enterprise.com',
    disabled: true,
    helperText: 'Domain is locked to your enterprise plan.',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size — Small',
  args: {
    label: 'Small',
    placeholder: '0.00',
    prefix: '$',
    size: 'sm',
    addonButton: <AddonButton size="sm">Apply</AddonButton>,
  },
};

export const SizeMedium: Story = {
  name: 'Size — Medium',
  args: {
    label: 'Medium',
    placeholder: '0.00',
    prefix: '$',
    size: 'md',
    addonButton: <AddonButton size="md">Apply</AddonButton>,
  },
};

export const SizeLarge: Story = {
  name: 'Size — Large',
  args: {
    label: 'Large',
    placeholder: '0.00',
    prefix: '$',
    size: 'lg',
    addonButton: <AddonButton size="lg">Apply</AddonButton>,
  },
};

// ─── Full width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  name: 'Full width — Search bar',
  args: {
    label: 'Search',
    placeholder: 'Search across vendors, contracts, incidents...',
    leftIcon: <MagnifyingGlassIcon size={16} />,
    fullWidth: true,
    addonButton: (
      <AddonButton size="md" variant="primary">
        Search
      </AddonButton>
    ),
  },
};
