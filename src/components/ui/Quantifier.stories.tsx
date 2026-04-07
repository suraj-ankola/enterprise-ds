import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Quantifier } from './Quantifier';

const meta: Meta<typeof Quantifier> = {
  title: 'Forms/Quantifier',
  component: Quantifier,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Numeric stepper with decrement / increment buttons and an editable input. Min/max/step enforcement, disabled state, size variants. Keyboard accessible.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Quantifier>;

export const Playground: Story = {
  render: () => {
    const [n, setN] = useState(5);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <Quantifier label="Vendor limit" value={n} onChange={setN} min={1} max={50} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState(3);
    const [md, setMd] = useState(3);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] flex items-end gap-8">
        <Quantifier size="sm" label="sm" value={sm} onChange={setSm} min={1} max={10} />
        <Quantifier size="md" label="md" value={md} onChange={setMd} min={1} max={10} />
      </div>
    );
  },
};

export const WithBounds: Story = {
  name: 'Min / max bounds',
  render: () => {
    const [n, setN] = useState(1);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] space-y-3">
        <Quantifier label="Seats (1–20)" value={n} onChange={setN} min={1} max={20} />
        <p className="text-xs text-[var(--ds-text-muted)]">
          Buttons disable at bounds — try reaching 1 or 20.
        </p>
      </div>
    );
  },
};

export const CustomStep: Story = {
  name: 'Custom step',
  render: () => {
    const [n, setN] = useState(100);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)]">
        <Quantifier
          label="Budget (× $500)"
          value={n}
          onChange={setN}
          min={0}
          max={10000}
          step={500}
          formatValue={v => `$${v.toLocaleString()}`}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)]">
      <Quantifier label="Locked seat count" value={10} onChange={() => {}} min={1} disabled />
    </div>
  ),
};

export const InForm: Story = {
  name: 'In context — licence form',
  render: () => {
    const [users, setUsers]   = useState(10);
    const [storage, setStorage] = useState(50);
    const pricePerUser   = 29;
    const pricePerGb     = 0.5;
    const total = (users * pricePerUser + storage * pricePerGb).toFixed(2);

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-sm">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-5 space-y-5">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Subscription configuration</p>

          <Quantifier label="User seats" value={users} onChange={setUsers} min={1} max={500} step={1} />
          <Quantifier
            label="Storage (GB)"
            value={storage}
            onChange={setStorage}
            min={10}
            max={1000}
            step={10}
            formatValue={v => `${v} GB`}
          />

          <div className="border-t border-[var(--ds-border-base)] pt-3 flex items-center justify-between">
            <span className="text-xs text-[var(--ds-text-muted)]">Monthly estimate</span>
            <span className="text-sm font-semibold text-[var(--ds-text-primary)]">${total}</span>
          </div>
        </div>
      </div>
    );
  },
};
