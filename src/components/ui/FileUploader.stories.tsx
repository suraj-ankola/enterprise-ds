import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUploader, useFileUploader, type FileEntry } from './FileUploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Forms/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop file upload zone with file list, per-file progress bars, and status icons. `useFileUploader` is a convenience state hook for managing file entries without external state. Accepts files via drop or click-to-browse.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Playground: Story = {
  render: () => {
    const { files, addFiles, remove } = useFileUploader();
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
        <FileUploader
          onFilesAdded={addFiles}
          files={files}
          onRemove={remove}
          multiple
          hint="PDF, CSV, XLSX accepted"
          maxSizeMb={10}
        />
      </div>
    );
  },
};

export const SingleFile: Story = {
  name: 'Single file',
  render: () => {
    const { files, addFiles, remove } = useFileUploader();
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
        <FileUploader
          onFilesAdded={f => { addFiles([f[0]]); }}
          files={files.slice(0, 1)}
          onRemove={remove}
          accept=".pdf"
          label="Upload audit report"
          hint="PDF only, max 25 MB"
          maxSizeMb={25}
        />
      </div>
    );
  },
};

export const WithProgress: Story = {
  name: 'Upload progress simulation',
  render: () => {
    const { files, addFiles, remove, setProgress, setDone, setError } = useFileUploader();

    function simulateUpload(incoming: File[]) {
      addFiles(incoming);
      incoming.forEach((_, i) => {
        const id = String(files.length + i + 1);
        let pct = 0;
        const interval = setInterval(() => {
          pct += Math.random() * 20;
          if (pct >= 100) {
            clearInterval(interval);
            // Randomly fail one to show error state
            if (Math.random() > 0.8) {
              setError(id, 'Upload failed — server error');
            } else {
              setDone(id);
            }
          } else {
            setProgress(id, Math.min(pct, 95));
          }
        }, 200);
      });
    }

    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
        <FileUploader
          onFilesAdded={simulateUpload}
          files={files}
          onRemove={remove}
          multiple
          hint="Files will upload with simulated progress"
        />
      </div>
    );
  },
};

export const StaticFileList: Story = {
  name: 'Mixed status file list',
  render: () => {
    const mockFiles: FileEntry[] = [
      { id: '1', file: new File([''], 'acme-audit-report.pdf', { type: 'application/pdf' }), status: 'done' },
      { id: '2', file: new File(['x'.repeat(2 * 1024 * 1024)], 'vendor-questionnaire.xlsx'), status: 'uploading', progress: 62 },
      { id: '3', file: new File([''], 'contract-signed.pdf', { type: 'application/pdf' }), status: 'error', error: 'File exceeds maximum size limit' },
      { id: '4', file: new File([''], 'soc2-report-2025.pdf'), status: 'idle' },
    ];
    const [list, setList] = useState(mockFiles);
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
        <FileUploader
          onFilesAdded={() => {}}
          files={list}
          onRemove={id => setList(prev => prev.filter(f => f.id !== id))}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="p-8 bg-[var(--ds-bg-base)] max-w-md">
      <FileUploader
        onFilesAdded={() => {}}
        disabled
        label="Upload locked during review"
        hint="Contact your admin to enable uploads"
      />
    </div>
  ),
};

export const InVendorForm: Story = {
  name: 'In context — vendor onboarding form',
  render: () => {
    const { files, addFiles, remove } = useFileUploader();
    return (
      <div className="p-8 bg-[var(--ds-bg-base)] max-w-lg">
        <div className="bg-[var(--ds-bg-surface)] border border-[var(--ds-border-base)] rounded-xl p-6 space-y-5">
          <p className="text-sm font-semibold text-[var(--ds-text-primary)]">Compliance documents</p>
          <FileUploader
            onFilesAdded={addFiles}
            files={files}
            onRemove={remove}
            accept=".pdf,.xlsx,.csv"
            multiple
            label="Upload SOC 2 / ISO 27001 reports"
            hint="Accepted: PDF, XLSX, CSV — max 20 MB each"
            maxSizeMb={20}
          />
        </div>
      </div>
    );
  },
};
