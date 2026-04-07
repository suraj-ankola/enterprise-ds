import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Semantic colour and icon for the alert',
    },
    title: {
      control: 'text',
      description: 'Bold heading displayed above the body text',
    },
    children: {
      control: 'text',
      description: 'Body content — supporting text below the title',
    },
    icon: {
      control: false,
      description: 'Custom icon node — pass `null` to hide the icon entirely',
    },
    onDismiss: {
      control: false,
      description: 'Callback that renders a dismiss × button when provided',
    },
    action: {
      control: false,
      description: 'Action slot — render a Button or link below the body text',
    },
  },
  args: {
    variant:  'info',
    title:    'Framework update available',
    children: 'ISO 27001:2022 mapping has been updated. Review the changes before your next audit.',
  },
  parameters: {
    docs: {
      description: {
        component: 'Inline feedback banner for persistent messages. 4 variants. `title` + `children` for heading + body. `onDismiss` adds a close button. `action` slot for CTAs. `icon={null}` hides the icon. Unlike Toast, Alert stays in the document flow.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const InfoVariant: Story = {
  name: 'Variant — Info',
  args: {
    variant:  'info',
    title:    'Framework update available',
    children: 'ISO 27001:2022 mapping has been updated. Review the changes before your next audit.',
  },
};

export const SuccessVariant: Story = {
  name: 'Variant — Success',
  args: {
    variant:  'success',
    title:    'Vendor onboarded',
    children: 'Acme Corp has been added to monitoring and is now active.',
  },
};

export const WarningVariant: Story = {
  name: 'Variant — Warning',
  args: {
    variant:  'warning',
    title:    'Audit overdue',
    children: 'Beta Systems SOC 2 audit is 14 days past due.',
  },
};

export const DangerVariant: Story = {
  name: 'Variant — Danger',
  args: {
    variant:  'danger',
    title:    'Integration failed',
    children: 'Slack webhook returned 401 Unauthorized. Check your API credentials.',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

export const TitleOnly: Story = {
  args: {
    variant: 'info',
    title:   'Your session will expire in 5 minutes.',
  },
};

export const BodyOnly: Story = {
  args: {
    variant:  'info',
    children: 'Your session will expire in 5 minutes. Save your work to avoid losing changes.',
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="max-w-xl flex flex-col gap-3">
        {visible ? (
          <Alert
            variant="warning"
            title="Audit overdue"
            onDismiss={() => setVisible(false)}
          >
            Beta Systems SOC 2 audit is 14 days past due. Unresolved audits affect your risk score.
          </Alert>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>Reset</Button>
        )}
      </div>
    );
  },
};

export const WithAction: Story = {
  args: {
    variant:  'danger',
    title:    '3 vendors at critical risk',
    children: 'Immediate remediation required to maintain compliance.',
    action:   <Button size="sm" variant="danger">View vendors</Button>,
  },
};

export const NoIcon: Story = {
  args: {
    variant:  'success',
    title:    'Report exported',
    children: 'Your Q1 compliance report is ready to download.',
    icon:     null,
  },
};

// ─── Showcase ─────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Alert variant="info" title="Framework update available">
        ISO 27001:2022 mapping has been updated. Review the changes before your next audit.
      </Alert>
      <Alert variant="success" title="Vendor onboarded">
        Acme Corp has been added to monitoring and is now active.
      </Alert>
      <Alert variant="warning" title="Audit overdue">
        Beta Systems SOC 2 audit is 14 days past due.
      </Alert>
      <Alert variant="danger" title="Integration failed">
        Slack webhook returned 401 Unauthorized. Check your API credentials.
      </Alert>

      {/* No title — body only */}
      <Alert variant="info">
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
      </Alert>

      {/* With action */}
      <Alert
        variant="danger"
        title="3 vendors at critical risk"
        action={<Button size="sm" variant="danger">View vendors</Button>}
      >
        Immediate remediation required to maintain compliance.
      </Alert>

      {/* No icon */}
      <Alert variant="success" icon={null} title="Report exported">
        Your Q1 compliance report is ready to download.
      </Alert>
    </div>
  ),
};

export const Playground: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="max-w-xl flex flex-col gap-3">
        {visible ? (
          <Alert
            variant="warning"
            title="Audit overdue"
            onDismiss={() => setVisible(false)}
            action={<Button size="sm" variant="secondary">Schedule Audit</Button>}
          >
            Beta Systems SOC 2 audit is 14 days past due. Unresolved audits affect your risk score.
          </Alert>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>Reset</Button>
        )}
      </div>
    );
  },
};
