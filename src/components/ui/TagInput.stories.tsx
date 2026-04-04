import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Forms/TagInput',
  component: TagInput,
  parameters: {
    docs: {
      description: {
        component: 'Multi-value tag input. Press Enter or comma to add a tag. Backspace removes the last tag. `suggestions` prop shows a dropdown of options. `max` caps the number of tags. Controlled/uncontrolled.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TagInput>;

const FRAMEWORKS = [
  'SOC 2', 'ISO 27001', 'GDPR', 'HIPAA', 'PCI DSS', 'NIST', 'CIS', 'FedRAMP',
];

const LABELS = [
  'critical', 'high', 'medium', 'low', 'compliance', 'security', 'privacy', 'infrastructure',
];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
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
