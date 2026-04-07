import type { Meta, StoryObj } from '@storybook/react';
import { FormPage, FormSection, FormRow } from './FormPage';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';

const meta: Meta<typeof FormPage> = {
  title: 'Layout/FormPage',
  component: FormPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-page form layout shell with 3 variants: centered (single-column card), wide (two-column grid), and split (branded aside + form). Use `FormSection` for labelled groups and `FormRow` for side-by-side fields.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FormPage>;

export const Centered: Story = {
  render: () => (
    <FormPage
      title="Add vendor"
      description="Enter the vendor's basic information to begin the onboarding process."
      actions={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save vendor</Button>
        </>
      }
    >
      <FormSection title="Basic information">
        <FormRow>
          <Input label="Company name" placeholder="Acme Corp" required />
          <Input label="Website" placeholder="https://acmecorp.com" />
        </FormRow>
        <FormRow>
          <Select
            label="Risk tier"
            options={[
              { value: 'critical', label: 'Critical' },
              { value: 'high',     label: 'High' },
              { value: 'medium',   label: 'Medium' },
              { value: 'low',      label: 'Low' },
            ]}
          />
          <Select
            label="Region"
            options={[
              { value: 'us', label: 'United States' },
              { value: 'eu', label: 'Europe' },
              { value: 'apac', label: 'APAC' },
            ]}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Contact" description="Primary point of contact at the vendor.">
        <FormRow>
          <Input label="Contact name" placeholder="Jane Smith" />
          <Input label="Contact email" type="email" placeholder="jane@acmecorp.com" />
        </FormRow>
      </FormSection>

      <FormSection title="Notes">
        <Textarea label="Internal notes" placeholder="Add context for the risk team…" rows={3} />
      </FormSection>
    </FormPage>
  ),
};

export const Wide: Story = {
  render: () => (
    <FormPage
      layout="wide"
      title="Vendor risk assessment"
      description="Complete all sections before submitting for review."
      actions={
        <>
          <Button variant="ghost">Save draft</Button>
          <Button variant="secondary">Preview</Button>
          <Button variant="primary">Submit for review</Button>
        </>
      }
    >
      <FormSection title="Organisation" description="Core company data.">
        <FormRow cols={3}>
          <Input label="Company name" placeholder="Acme Corp" required />
          <Input label="Registration number" placeholder="UK 12345678" />
          <Select
            label="Country"
            options={[
              { value: 'gb', label: 'United Kingdom' },
              { value: 'us', label: 'United States' },
              { value: 'de', label: 'Germany' },
            ]}
          />
        </FormRow>
        <FormRow>
          <Input label="Primary domain" placeholder="acmecorp.com" />
          <Select
            label="Industry"
            options={[
              { value: 'saas', label: 'SaaS / Software' },
              { value: 'finance', label: 'Financial services' },
              { value: 'health', label: 'Healthcare' },
              { value: 'logistics', label: 'Logistics' },
            ]}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Compliance frameworks" description="Select all frameworks that apply.">
        <div className="space-y-2">
          {['ISO 27001', 'SOC 2 Type II', 'GDPR', 'HIPAA', 'PCI DSS'].map(f => (
            <Toggle key={f} label={f} defaultChecked={['ISO 27001', 'SOC 2 Type II'].includes(f)} />
          ))}
        </div>
      </FormSection>

      <FormSection title="Risk context">
        <Textarea label="Assessment notes" placeholder="Summarise key findings, open risks, or context for reviewers…" rows={4} />
      </FormSection>
    </FormPage>
  ),
};

export const Split: Story = {
  render: () => (
    <FormPage
      layout="split"
      title="Create your account"
      description="Join the enterprise risk platform trusted by 500+ compliance teams."
      actions={
        <>
          <Button variant="ghost">Sign in instead</Button>
          <Button variant="primary">Create account</Button>
        </>
      }
    >
      <FormSection>
        <FormRow>
          <Input label="First name" placeholder="Jane" required />
          <Input label="Last name" placeholder="Smith" required />
        </FormRow>
        <Input label="Work email" type="email" placeholder="jane@company.com" required />
        <Input label="Password" type="password" placeholder="Min. 12 characters" required />
        <Select
          label="Company size"
          options={[
            { value: '1-50',    label: '1–50 employees' },
            { value: '51-250',  label: '51–250 employees' },
            { value: '251-1k',  label: '251–1,000 employees' },
            { value: '1k+',     label: '1,000+ employees' },
          ]}
        />
      </FormSection>
    </FormPage>
  ),
};
