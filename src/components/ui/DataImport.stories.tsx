import type { Meta, StoryObj } from '@storybook/react';
import { DataImport, type ImportField } from './DataImport';

const meta: Meta<typeof DataImport> = {
  title: 'Data Display/DataImport',
  component: DataImport,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step CSV/Excel import wizard. Step 1: drag-and-drop file upload. Step 2: map file columns to system fields with auto-detection. Step 3: preview first 5 rows. Step 4: confirmation screen. Required field validation prevents import until all mandatory fields are mapped.',
      },
    },
    layout: 'padded',
  },
  argTypes: {
    entityName: {
      description: 'Human name of the data being imported (e.g. "vendors", "users")',
      control: { type: 'text' },
    },
    maxFileSizeMB: {
      description: 'Maximum upload file size in megabytes',
      control: { type: 'number' },
    },
    acceptFormats: {
      description: 'Accepted file extensions (comma-separated)',
      control: { type: 'text' },
    },
    fields:   { control: false },
    onImport: { action: 'imported' },
  },
  args: {
    entityName:    'vendors',
    maxFileSizeMB: 10,
    acceptFormats: '.csv,.xlsx',
  },
};
export default meta;
type Story = StoryObj<typeof DataImport>;

const VENDOR_FIELDS: ImportField[] = [
  { key: 'name',       label: 'Vendor name',    required: true  },
  { key: 'email',      label: 'Contact email',  required: true  },
  { key: 'risk_score', label: 'Risk score'                      },
  { key: 'region',     label: 'Region'                          },
  { key: 'framework',  label: 'Framework'                       },
  { key: 'last_audit', label: 'Last audit date'                 },
];

export const Playground: Story = {
  render: (args) => (
    <div className="max-w-lg">
      <DataImport
        {...args}
        fields={VENDOR_FIELDS}
        onImport={async (rows, mappings) => {
          args.onImport?.(rows, mappings);
          await new Promise(r => setTimeout(r, 1800));
          return { imported: rows.length, errors: Math.floor(rows.length * 0.05) };
        }}
      />
    </div>
  ),
};

export const UserImport: Story = {
  name: 'User import variant',
  render: () => (
    <div className="max-w-lg">
      <DataImport
        entityName="users"
        fields={[
          { key: 'email',       label: 'Email',        required: true },
          { key: 'first_name',  label: 'First name',   required: true },
          { key: 'last_name',   label: 'Last name'                    },
          { key: 'role',        label: 'Role'                         },
          { key: 'department',  label: 'Department'                   },
        ]}
        onImport={async (rows) => {
          await new Promise(r => setTimeout(r, 1500));
          return { imported: rows.length, errors: 0 };
        }}
      />
    </div>
  ),
};
