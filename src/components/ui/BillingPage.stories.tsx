import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BillingPage } from './BillingPage';

const meta: Meta<typeof BillingPage> = {
  title: 'Page Templates/BillingPage',
  component: BillingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Enterprise billing page showing current plan, feature list, usage meters, payment method, and invoice history. Supports upgrade, payment update, and invoice download callbacks.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BillingPage>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <BillingPage
      plan={{
        name: 'Business',
        price: '$299',
        billingCycle: 'month',
        features: [
          'Up to 50 team members',
          'Unlimited audit log history',
          'Advanced role permissions',
          'SSO / SAML integration',
          'Priority support (4h SLA)',
          'Custom data retention policies',
        ],
        nextBillingDate: 'May 7, 2026',
      }}
      usage={[
        { unit: 'Team members', current: 31, limit: 50 },
        { unit: 'API requests (monthly)', current: 840_000, limit: 1_000_000 },
        { unit: 'Storage (GB)', current: 12, limit: 100 },
        { unit: 'Audit log events', current: 48_200, limit: 500_000 },
      ]}
      invoices={[
        { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '$299.00', status: 'paid', downloadUrl: '#' },
        { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '$299.00', status: 'paid', downloadUrl: '#' },
        { id: 'INV-2026-002', date: 'Feb 1, 2026', amount: '$299.00', status: 'paid', downloadUrl: '#' },
        { id: 'INV-2026-001', date: 'Jan 1, 2026', amount: '$249.00', status: 'paid', downloadUrl: '#' },
      ]}
      cardLast4="**** **** **** 4242"
      cardExpiry="09/27"
      cardBrand="Visa"
      onUpgrade={() => alert('Upgrade plan clicked')}
      onDownload={(id) => alert(`Downloading invoice ${id}`)}
      onUpdatePayment={() => alert('Update payment method clicked')}
    />
  ),
};

// ─── Enterprise plan ──────────────────────────────────────────────────────────

export const EnterprisePlan: Story = {
  name: 'Enterprise plan',
  render: () => (
    <BillingPage
      plan={{
        name: 'Enterprise',
        price: 'Custom',
        billingCycle: 'year',
        features: [
          'Unlimited team members',
          'Unlimited audit log & SIEM export',
          'Custom roles & attribute-based access',
          'Dedicated SSO / SAML / SCIM provisioning',
          'Dedicated success manager',
          '99.99% uptime SLA',
          'On-premise deployment option',
          'Custom data residency (EU / US / APAC)',
        ],
        nextBillingDate: 'Jan 1, 2027',
      }}
      usage={[
        { unit: 'Team members', current: 214, limit: 99_999 },
        { unit: 'API requests (monthly)', current: 9_800_000, limit: 100_000_000 },
        { unit: 'Storage (GB)', current: 380, limit: 10_000 },
        { unit: 'Audit log events', current: 2_400_000, limit: 100_000_000 },
      ]}
      invoices={[
        { id: 'INV-ENT-2026-001', date: 'Jan 1, 2026', amount: '$48,000.00', status: 'paid', downloadUrl: '#' },
        { id: 'INV-ENT-2025-001', date: 'Jan 1, 2025', amount: '$36,000.00', status: 'paid', downloadUrl: '#' },
      ]}
      cardLast4="**** **** **** 8888"
      cardExpiry="12/28"
      cardBrand="Mastercard"
      onUpgrade={() => alert('Contact sales')}
      onDownload={(id) => alert(`Downloading invoice ${id}`)}
      onUpdatePayment={() => alert('Update payment method')}
    />
  ),
};

// ─── Payment overdue ──────────────────────────────────────────────────────────

export const PaymentOverdue: Story = {
  name: 'Payment overdue',
  render: () => (
    <BillingPage
      plan={{
        name: 'Business',
        price: '$299',
        billingCycle: 'month',
        features: [
          'Up to 50 team members',
          'Unlimited audit log history',
          'Advanced role permissions',
          'SSO / SAML integration',
          'Priority support (4h SLA)',
        ],
        nextBillingDate: 'Apr 7, 2026',
      }}
      usage={[
        { unit: 'Team members', current: 48, limit: 50 },
        { unit: 'API requests (monthly)', current: 980_000, limit: 1_000_000 },
        { unit: 'Storage (GB)', current: 97, limit: 100 },
      ]}
      invoices={[
        { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '$299.00', status: 'failed', downloadUrl: '#' },
        { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '$299.00', status: 'pending', downloadUrl: '#' },
        { id: 'INV-2026-002', date: 'Feb 1, 2026', amount: '$299.00', status: 'paid', downloadUrl: '#' },
        { id: 'INV-2026-001', date: 'Jan 1, 2026', amount: '$249.00', status: 'paid', downloadUrl: '#' },
      ]}
      cardLast4="**** **** **** 9999"
      cardExpiry="01/25"
      cardBrand="Visa"
      onUpgrade={() => alert('Upgrade plan')}
      onDownload={(id) => alert(`Downloading invoice ${id}`)}
      onUpdatePayment={() => alert('Update payment method — card is expired!')}
    />
  ),
};
