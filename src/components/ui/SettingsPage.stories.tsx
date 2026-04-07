import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  SettingsPage,
  SettingsSectionCard,
  SettingsField,
  DEFAULT_SETTINGS_SECTIONS,
} from './SettingsPage';

const meta: Meta<typeof SettingsPage> = {
  title: 'Page Templates/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-page settings layout with a left navigation sidebar and a content area. Use `SettingsSectionCard` to group related settings and `SettingsField` for individual settings rows (supports both stacked and inline layout). Exports `DEFAULT_SETTINGS_SECTIONS` for common enterprise settings categories.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    title:    { control: { type: 'text' } },
    sections: { control: false },
    children: { control: false },
    onSectionChange: { action: 'sectionChanged' },
  },
};
export default meta;
type Story = StoryObj<typeof SettingsPage>;

const inputCls = 'h-9 px-3 rounded-lg border border-[var(--ds-border-base)] bg-[var(--ds-bg-surface)] text-sm text-[var(--ds-text-primary)] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-brand-500)]';

function ProfileSection() {
  return (
    <>
      <SettingsSectionCard title="Personal information" description="Update your name and contact details.">
        <div className="space-y-0 divide-y divide-[var(--ds-border-base)]">
          <SettingsField label="Full name">
            <input type="text" defaultValue="Suraj Naik" className={inputCls} />
          </SettingsField>
          <SettingsField label="Email address">
            <input type="email" defaultValue="suraj@example.com" className={inputCls} />
          </SettingsField>
          <SettingsField label="Job title">
            <input type="text" defaultValue="Risk Manager" className={inputCls} />
          </SettingsField>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-1.5 text-sm rounded-lg bg-[var(--ds-brand-600)] text-white hover:bg-[var(--ds-brand-700)]">
            Save changes
          </button>
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard title="Preferences">
        <div className="divide-y divide-[var(--ds-border-base)]">
          <SettingsField label="Email notifications" description="Receive digests and alerts via email" inline>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-[var(--ds-brand-600)]" />
          </SettingsField>
          <SettingsField label="Two-factor authentication" description="Add an extra layer of security" inline>
            <button className="px-3 py-1 text-xs rounded-lg border border-[var(--ds-border-base)] hover:bg-[var(--ds-bg-subtle)]">
              Enable
            </button>
          </SettingsField>
        </div>
      </SettingsSectionCard>
    </>
  );
}

export const Playground: Story = {
  render: (args) => {
    const [section, setSection] = useState('profile');
    return (
      <SettingsPage
        {...args}
        sections={DEFAULT_SETTINGS_SECTIONS}
        activeSection={section}
        onSectionChange={(id) => { setSection(id); args.onSectionChange?.(id); }}
      >
        <ProfileSection />
      </SettingsPage>
    );
  },
  args: { title: 'Settings' },
};
