import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InlineEdit } from './InlineEdit';

const meta: Meta<typeof InlineEdit> = {
  title: 'Forms/InlineEdit',
  component: InlineEdit,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Click-to-edit field for inline value editing without a separate form. Supports single-line text, multi-line textarea, and number inputs. Two trigger modes: clicking anywhere on the text, or clicking a hover pencil icon. Commits on Enter or the checkmark button; cancels on Escape or the X button.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    value: {
      description: 'Current value of the field',
      control: { type: 'text' },
    },
    variant: {
      description: 'Input type — text, textarea, or number',
      control: { type: 'select' },
      options: ['text', 'textarea', 'number'],
    },
    trigger: {
      description: '"click" activates on any click; "icon" shows a hover pencil button',
      control: { type: 'radio' },
      options: ['click', 'icon'],
    },
    placeholder: {
      description: 'Placeholder shown when value is empty',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Disables editing',
      control: { type: 'boolean' },
    },
    onChange: { action: 'changed' },
    onCancel: { action: 'cancelled' },
  },
  args: {
    value: 'Acme Corp',
    variant: 'text',
    trigger: 'click',
    placeholder: 'Click to edit…',
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof InlineEdit>;

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value ?? 'Acme Corp');
    return (
      <div className="max-w-xs">
        <InlineEdit
          {...args}
          value={val}
          onChange={(v) => { setVal(v); args.onChange?.(v); }}
        />
        <p className="mt-2 text-xs text-[var(--ds-text-muted)]">Value: {val}</p>
      </div>
    );
  },
};

export const IconTrigger: Story = {
  name: 'Icon trigger (hover pencil)',
  render: () => {
    const [val, setVal] = useState('Acme Corp');
    return (
      <div className="max-w-xs">
        <InlineEdit value={val} onChange={setVal} trigger="icon" />
        <p className="mt-2 text-xs text-[var(--ds-text-muted)]">Hover to reveal the edit icon</p>
      </div>
    );
  },
};

export const TextareaVariant: Story = {
  name: 'Textarea variant',
  render: () => {
    const [val, setVal] = useState('This is a longer description that can span multiple lines when edited.');
    return (
      <div className="max-w-sm">
        <InlineEdit value={val} onChange={setVal} variant="textarea" trigger="icon" />
      </div>
    );
  },
};

export const NumberVariant: Story = {
  name: 'Number variant',
  render: () => {
    const [val, setVal] = useState('42');
    return (
      <div className="max-w-xs">
        <p className="text-xs text-[var(--ds-text-muted)] mb-1">Risk score</p>
        <InlineEdit value={val} onChange={setVal} variant="number" />
      </div>
    );
  },
};

export const EmptyState: Story = {
  name: 'Empty (shows placeholder)',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div className="max-w-xs">
        <InlineEdit value={val} onChange={setVal} placeholder="Enter vendor name…" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-xs">
      <InlineEdit value="Read-only value" onChange={() => {}} disabled />
    </div>
  ),
};

export const InTable: Story = {
  name: 'In context — table cell editing',
  render: () => {
    const [rows, setRows] = useState([
      { id: 1, name: 'Acme Corp',        score: '72' },
      { id: 2, name: 'Globex Inc',       score: '45' },
      { id: 3, name: 'Initech Solutions', score: '88' },
    ]);

    function update(id: number, field: 'name' | 'score', value: string) {
      setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
    }

    return (
      <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--ds-bg-subtle)] border-b border-[var(--ds-border-base)]">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--ds-text-muted)]">Vendor</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--ds-text-muted)]">Risk score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id} className="border-b border-[var(--ds-border-base)] last:border-0">
                <td className="px-2 py-1">
                  <InlineEdit
                    value={row.name}
                    onChange={v => update(row.id, 'name', v)}
                    trigger="icon"
                  />
                </td>
                <td className="px-2 py-1">
                  <InlineEdit
                    value={row.score}
                    onChange={v => update(row.id, 'score', v)}
                    variant="number"
                    trigger="icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
