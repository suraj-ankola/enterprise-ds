import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from './Textarea';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea on the 8pt grid',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual status state',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'both'],
      description: 'CSS resize behaviour',
    },
    label: {
      control: 'text',
      description: 'Label rendered above the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text rendered below the textarea',
    },
    errorMessage: {
      control: 'text',
      description: 'Sets status to error and shows this message below the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
    showCount: {
      control: 'boolean',
      description: 'Shows a character count — requires maxLength prop',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the textarea read-only',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required with an asterisk',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches the textarea to fill its container',
    },
  },
  args: {
    placeholder: 'Start typing…',
    size:        'md',
    status:      'default',
    resize:      'vertical',
    rows:        4,
    showCount:   false,
    disabled:    false,
    readOnly:    false,
    required:    false,
    fullWidth:   false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input. Same token system and status pattern as Input — label, helper text, error, character count, resize control, and read-only/disabled states. 3 sizes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── With Label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label:       'Audit notes',
    placeholder: 'Describe the audit findings…',
    helperText:  'Include scope, gaps, and next steps.',
  },
};

export const Required: Story = {
  args: {
    label:    'Remediation plan',
    required: true,
    placeholder: 'Describe steps to close this gap…',
  },
};

export const WithHelperText: Story = {
  args: {
    label:      'Description',
    helperText: 'Max 500 characters.',
    maxLength:  500,
    showCount:  true,
    defaultValue: 'Initial value here.',
  },
};

// ─── Status States ────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  args: {
    label:        'Audit notes',
    errorMessage: 'This field is required.',
    defaultValue: 'Too short.',
  },
};

export const SuccessState: Story = {
  args: {
    label:        'Audit notes',
    status:       'success',
    helperText:   'Looks good!',
    defaultValue: 'Detailed compliance notes provided.',
  },
};

export const DisabledState: Story = {
  args: {
    label:        'System notes',
    disabled:     true,
    defaultValue: 'Read from system.',
  },
};

export const ReadOnly: Story = {
  args: {
    label:        'Policy text',
    readOnly:     true,
    defaultValue: 'This value cannot be edited.',
    helperText:   'Contact your admin to update this field.',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = {
  args: { size: 'sm', label: 'sm — comment box', placeholder: 'Add a comment…', rows: 2 },
};

export const Medium: Story = {
  args: { size: 'md', label: 'md — default', placeholder: 'Describe the finding…' },
};

export const Large: Story = {
  args: { size: 'lg', label: 'lg — long-form', placeholder: 'Write the full report…', rows: 6 },
};

// ─── Resize Variants ──────────────────────────────────────────────────────────

export const ResizeVariants: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <Textarea label="resize=vertical (default)" resize="vertical" placeholder="Drag bottom edge…" fullWidth />
      <Textarea label="resize=none" resize="none" placeholder="Fixed height." fullWidth />
      <Textarea label="resize=both" resize="both" placeholder="Drag any corner…" fullWidth />
    </div>
  ),
};

// ─── Character Count ──────────────────────────────────────────────────────────

export const CharacterCount: Story = {
  render: () => {
    const [v, setV] = useState('');
    return (
      <div className="max-w-md space-y-6">
        <Textarea
          label="Remediation plan"
          helperText="Describe the steps to close this gap."
          placeholder="Enter remediation plan…"
          maxLength={250}
          showCount
          value={v}
          onChange={e => setV(e.target.value)}
          fullWidth
        />
        <Textarea
          label="At limit (counter turns red)"
          maxLength={50}
          showCount
          defaultValue="This text is exactly at the fifty character limit!!"
          fullWidth
        />
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <Textarea label="Default" placeholder="Start typing…" fullWidth />
      <Textarea
        label="With helper text"
        helperText="Max 500 characters."
        maxLength={500}
        showCount
        defaultValue="Initial value here."
        fullWidth
      />
      <Textarea
        label="Error state"
        errorMessage="This field is required."
        defaultValue="Too short."
        fullWidth
      />
      <Textarea
        label="Success state"
        status="success"
        helperText="Looks good!"
        defaultValue="Detailed compliance notes provided."
        fullWidth
      />
      <Textarea label="Disabled" disabled defaultValue="Read from system." fullWidth />
      <Textarea label="Read-only" readOnly defaultValue="This value cannot be edited." fullWidth />
    </div>
  ),
};
