import React from 'react';
import { BillFormData } from '../types/bill.types';

interface Props {
  data: BillFormData['clientDetails'];
  onChange: (data: Partial<BillFormData['clientDetails']>) => void;
}

export const ClientDetailsForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Client Details</h2>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Client Name</label>
          <input 
            className="input-field" 
            value={data.clientName}
            onChange={e => onChange({ clientName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Address Line 1</label>
          <input 
            className="input-field" 
            value={data.addressLine1}
            onChange={e => onChange({ addressLine1: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email (Optional)</label>
          <input 
            type="email" 
            className="input-field" 
            value={data.email || ''}
            onChange={e => onChange({ email: e.target.value })}
          />
        </div>
      </div>
      <div className="form-group mt-4">
        <label>Matter Reference / RE:</label>
        <textarea 
          className="input-field" 
          rows={3}
          value={data.matterReference}
          onChange={e => onChange({ matterReference: e.target.value })}
        />
      </div>
    </div>
  );
};
