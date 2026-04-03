import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { control: false },
  },
  parameters: {
    docs: {
      description: {
        component: 'Controlled/uncontrolled checkbox. Supports `indeterminate` state (for select-all patterns). Hidden native input + custom visual — focus ring via CSS `peer` variant. 3 sizes. Renders a stable `<CheckIcon>` at all times (opacity toggle) to prevent layout shift.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    label:         'Accept terms and conditions',
    helperText:    'You must agree before proceeding.',
    size:          'md',
    disabled:      false,
    indeterminate: false,
    defaultChecked: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
            {size}
          </p>
          <div className="flex flex-wrap gap-6 items-start">
            <Checkbox size={size} label="Unchecked" />
            <Checkbox size={size} label="Checked" defaultChecked />
            <Checkbox size={size} label="Indeterminate" indeterminate />
            <Checkbox size={size} label="Disabled" disabled />
            <Checkbox size={size} label="Disabled checked" disabled defaultChecked />
            <Checkbox
              size={size}
              label="With error"
              errorMessage="This field is required."
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ds-text-muted)]">
          With helper text
        </p>
        <div className="flex flex-wrap gap-6 items-start">
          <Checkbox
            label="Email notifications"
            helperText="Receive weekly digest and alerts."
            defaultChecked
          />
          <Checkbox
            label="Marketing emails"
            helperText="Product updates and announcements."
          />
          <Checkbox
            label="Audit log export"
            helperText="Requires admin approval."
            disabled
          />
        </div>
      </div>
    </div>
  ),
};
