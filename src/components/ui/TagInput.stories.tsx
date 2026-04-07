import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from './TagInput';

// ─── Sample data ──────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  'SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST', 'CIS', 'FedRAMP',
];

const LABELS = [
  'critical', 'high', 'medium', 'low', 'compliance', 'security', 'privacy', 'infrastructure',
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof TagInput> = {
  title: 'Forms/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Controlled array of tag strings',
    },
    defaultValue: {
      control: false,
      description: 'Uncontrolled initial tags',
    },
    onChange: {
      control: false,
      description: 'Callback fired with the updated tags array',
    },
    suggestions: {
      control: false,
      description: 'Array of suggestion strings shown in a dropdown as the user types',
    },
    confirmKeys: {
      control: false,
      description: 'Keys that confirm a new tag — defaults to Enter and comma',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no tags are present',
    },
    label: {
      control: 'text',
      description: 'Label rendered above the tag input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text rendered below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Sets the error state and shows this message below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tag input',
    },
    max: {
      control: 'number',
      description: 'Maximum number of tags allowed',
    },
  },
  args: {
    placeholder: 'Add a tag…',
    disabled:    false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Multi-value tag input. Press Enter or comma to add a tag. Backspace removes the last tag. `suggestions` prop shows a dropdown of options. `max` caps the number of tags. Controlled/uncontrolled.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label:       'Tags',
    placeholder: 'Add a tag…',
    helperText:  'Press Enter or comma to add. Backspace to remove.',
  },
};

// ─── With Suggestions ─────────────────────────────────────────────────────────

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = useState(['SOC 2', 'GDPR']);
    return (
      <div className="max-w-sm flex flex-col gap-4">
        <TagInput
          label="Compliance frameworks"
          value={tags}
          onChange={setTags}
          suggestions={FRAMEWORKS}
          helperText="Press Enter or comma to add. Backspace to remove."
          placeholder="Search frameworks…"
        />
        <p className="text-xs text-[var(--ds-text-muted)]">Selected: {tags.join(', ') || '—'}</p>
      </div>
    );
  },
};

// ─── With Max ─────────────────────────────────────────────────────────────────

export const WithMax: Story = {
  args: {
    label:        'Frameworks (max 3)',
    defaultValue: ['SOC 2', 'GDPR'],
    suggestions:  FRAMEWORKS,
    max:          3,
    placeholder:  'Add framework…',
  },
};

// ─── Status States ────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  args: {
    label:        'Frameworks',
    defaultValue: ['invalid'],
    errorMessage: 'At least one valid framework required',
  },
};

export const DisabledState: Story = {
  args: {
    label:        'Frameworks',
    defaultValue: ['SOC 2', 'ISO 27001'],
    disabled:     true,
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-sm flex flex-col gap-6">

      <TagInput
        label="Labels"
        defaultValue={['security', 'critical']}
        suggestions={LABELS}
        helperText="Type and press Enter to add"
        placeholder="Add labels…"
      />

      <TagInput
        label="Email recipients"
        defaultValue={['admin@acme.com']}
        placeholder="Add email address…"
        helperText="Press Enter to confirm each email"
      />

      <TagInput
        label="Frameworks (max 3)"
        defaultValue={['SOC 2', 'GDPR']}
        suggestions={FRAMEWORKS}
        max={3}
        placeholder="Add framework…"
      />

      <TagInput
        label="With error"
        defaultValue={['invalid']}
        errorMessage="At least one valid framework required"
      />

      <TagInput
        label="Disabled"
        defaultValue={['SOC 2', 'ISO 27001']}
        disabled
      />

    </div>
  ),
};
