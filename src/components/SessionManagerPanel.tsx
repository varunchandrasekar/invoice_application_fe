import React, { useRef, useState } from 'react';
import { BillFormData } from '../types/bill.types';
import { Upload, FileJson } from 'lucide-react';

interface Props {
  onLoad: (data: BillFormData) => void;
}

type ToastStatus = { type: 'idle' | 'success' | 'error'; message: string };

export const SessionManagerPanel: React.FC<Props> = ({ onLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState<ToastStatus>({ type: 'idle', message: '' });

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: 'idle', message: '' }), 4000);
  };

  /** Parse & validate a JSON file, then call onLoad with the data */
  const processFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      showToast('error', 'Please select a valid .json file exported from this application.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = e.target?.result as string;
        const parsed = JSON.parse(raw) as BillFormData;

        // Basic shape validation — check a few required top-level keys
        if (
          !parsed.invoiceHeader ||
          !parsed.clientDetails ||
          !Array.isArray(parsed.timeCosts)
        ) {
          showToast('error', 'This JSON file does not look like a valid bill data file.');
          return;
        }

        onLoad(parsed);
        showToast('success', `✓ "${file.name}" loaded successfully! The form has been populated.`);
      } catch {
        showToast('error', 'Could not read the file. Make sure it is a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">
          <FileJson size={22} style={{ color: 'var(--accent-gold)' }} />
          Load Previous Bill Data
        </h2>
      </div>

      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginBottom: '1.25rem',
        lineHeight: '1.6',
      }}>
        Every time you generate a bill, a <strong>JSON backup</strong> is automatically downloaded
        alongside the Excel. To restore a previous bill for editing, upload that JSON file here.
      </p>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-indigo)' : 'var(--input-border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging
            ? 'rgba(99, 102, 241, 0.06)'
            : 'rgba(248, 250, 252, 0.5)',
          transition: 'all 0.25s ease',
          userSelect: 'none',
        }}
      >
        <Upload
          size={36}
          style={{
            color: isDragging ? 'var(--accent-indigo)' : 'var(--text-tertiary)',
            margin: '0 auto 0.75rem',
            display: 'block',
            transition: 'color 0.25s ease',
          }}
        />
        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Drag & drop your JSON file here
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          or <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>click to browse</span> your device
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
          Only .json files exported from this application are accepted
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Toast Message */}
      {toast.type !== 'idle' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            background: toast.type === 'success'
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${toast.type === 'success'
              ? 'rgba(16, 185, 129, 0.3)'
              : 'rgba(239, 68, 68, 0.3)'}`,
            color: toast.type === 'success' ? 'var(--success)' : 'var(--error)',
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};
