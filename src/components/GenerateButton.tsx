import React, { useState } from 'react';
import { BillFormData } from '../types/bill.types';
import { generateBill } from '../services/billApiService';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  formData: BillFormData;
}

/** Download an object as a .json file to the user's device */
function downloadJson(data: BillFormData, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const GenerateButton: React.FC<Props> = ({ formData }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      // 1. Generate and download the Excel bill
      await generateBill(formData);

      // 2. Also download the form data as a JSON backup file
      //    Filename uses the client name + invoice number for easy identification
      const clientName = formData.clientDetails?.clientName?.trim() || 'Client';
      const invoiceNo = formData.invoiceHeader?.invoiceNumber?.trim() || 'Invoice';
      // Sanitise: replace any characters that are invalid in filenames
      const safeName = `${clientName} - ${invoiceNo}`.replace(/[\\/:*?"<>|]/g, '_');
      downloadJson(formData, `${safeName}.json`);

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to generate bill');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="btn btn-primary w-full max-w-md py-4 text-lg"
        onClick={handleGenerate}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <><div className="spinner"></div> Generating Invoice...</>
        ) : status === 'success' ? (
          <><CheckCircle /> Generated & JSON Saved!</>
        ) : (
          <><FileText /> Generate Excel Bill</>
        )}
      </button>

      {status === 'success' && (
        <p style={{
          marginTop: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--success)',
          textAlign: 'center',
        }}>
          ✓ Excel downloaded &nbsp;·&nbsp; ✓ JSON backup downloaded
        </p>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 text-error bg-error/10 px-4 py-2 rounded-md border border-error/20">
          <AlertCircle size={18} /> {errorMessage}
        </div>
      )}
    </div>
  );
};
