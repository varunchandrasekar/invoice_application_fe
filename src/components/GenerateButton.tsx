import React, { useState } from 'react';
import { BillFormData } from '../types/bill.types';
import { generateBill } from '../services/billApiService';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  formData: BillFormData;
}

export const GenerateButton: React.FC<Props> = ({ formData }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      
      await generateBill(formData);
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
          <><CheckCircle /> Generated Successfully!</>
        ) : (
          <><FileText /> Generate Excel Bill</>
        )}
      </button>
      
      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 text-error bg-error/10 px-4 py-2 rounded-md border border-error/20">
          <AlertCircle size={18} /> {errorMessage}
        </div>
      )}
    </div>
  );
};
