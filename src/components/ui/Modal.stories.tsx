import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Modal, ConfirmModal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  argTypes: { onClose: { control: false } },
  parameters: {
    docs: {
      description: {
        component: 'Portal-based modal with body scroll lock and ESC-to-close. 5 sizes. `footer` slot accepts any content — use `<Button>` from the DS. `ConfirmModal` is an opinionated confirm/cancel wrapper with loading state and optional danger variant.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
          description="A short description of what this modal does."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-[var(--ds-text-secondary)]">
            Modal body content goes here. This can be forms, details, or any other content.
          </p>
        </Modal>
      </>
    );
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [active, setActive] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
    return (
      <>
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => (
            <Button key={s} variant="secondary" onClick={() => setActive(s)}>
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
        {sizes.map(s => (
          <Modal
            key={s}
            open={active === s}
            onClose={() => setActive(null)}
            size={s}
            title={`${s.toUpperCase()} Modal`}
            description="Resize to see how this modal fits within the viewport."
            footer={<Button onClick={() => setActive(null)}>Close</Button>}
          >
            <p className="text-[var(--ds-text-secondary)]">
              This is a <strong>{s}</strong> modal. Max width: {s === 'sm' ? '384px' : s === 'md' ? '448px' : s === 'lg' ? '512px' : s === 'xl' ? '576px' : '672px'}.
            </p>
          </Modal>
        ))}
      </>
    );
  },
};

// ─── With Form ────────────────────────────────────────────────────────────────

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add Vendor</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Add New Vendor"
          description="Fill in the details below to onboard a new vendor."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Add Vendor</Button>
            </>
          }
        >
          <div className="flex flex-col gap-4">
            <Input label="Vendor Name" placeholder="e.g. Acme Corp" fullWidth required />
            <Input label="Contact Email" placeholder="security@vendor.com" fullWidth />
            <Input label="Website" placeholder="https://vendor.com" fullWidth />
          </div>
        </Modal>
      </>
    );
  },
};

// ─── Confirm variants ─────────────────────────────────────────────────────────

export const ConfirmVariants: Story = {
  render: () => {
    const [which, setWhich] = useState<'default' | 'danger' | null>(null);
    return (
      <>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setWhich('default')}>Confirm</Button>
          <Button variant="danger"    onClick={() => setWhich('danger')}>Delete</Button>
        </div>

        <ConfirmModal
          open={which === 'default'}
          onClose={() => setWhich(null)}
          onConfirm={() => setWhich(null)}
          title="Archive vendor?"
          description="This vendor will be archived and removed from active monitoring. You can restore it later."
          confirmLabel="Archive"
        />

        <ConfirmModal
          open={which === 'danger'}
          onClose={() => setWhich(null)}
          onConfirm={() => setWhich(null)}
          variant="danger"
          title="Delete vendor permanently?"
          description="This will delete all vendor data, audit history, and risk assessments. This action cannot be undone."
          confirmLabel="Delete permanently"
        />
      </>
    );
  },
};
