import React, { useState } from 'react';
import { BillFormData } from '../types/bill.types';

interface Props {
  data: BillFormData['invoiceHeader'];
  discountPercentage?: number;
  onChange: (data: Partial<BillFormData['invoiceHeader']>) => void;
  onDiscountChange: (val: number) => void;
}

export const InvoiceHeaderForm: React.FC<Props> = ({ data, discountPercentage, onChange, onDiscountChange }) => {
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(!!discountPercentage && discountPercentage > 0);

  const handleToggleDiscount = (checked: boolean) => {
    setIsDiscountEnabled(checked);
    if (!checked) {
      onDiscountChange(0);
    }
  };

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Invoice Details</h2>
        <div className="flex items-center gap-3">
          <label>Apply Discount?</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isDiscountEnabled} 
              onChange={e => handleToggleDiscount(e.target.checked)} 
            />
            <span className="slider"></span>
          </label>
          {isDiscountEnabled && (
            <div className="flex items-center gap-1">
              <input 
                type="number"
                min="0"
                max="100"
                step="1"
                className="input-field w-20 text-center" 
                value={discountPercentage || ''}
                onChange={e => onDiscountChange(parseFloat(e.target.value) || 0)}
              />
              <span className="text-secondary">%</span>
            </div>
          )}
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Invoice Number</label>
          <input 
            className="input-field" 
            placeholder="ND/ClientRef/KR-1" 
            value={data.invoiceNumber}
            onChange={e => onChange({ invoiceNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Invoice Date</label>
          <input 
            type="date" 
            className="input-field" 
            value={data.invoiceDate}
            onChange={e => onChange({ invoiceDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>VAT Number</label>
          <input 
            className="input-field" 
            placeholder="531020904" 
            value={data.vatNumber}
            onChange={e => onChange({ vatNumber: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Hourly Rate (£)</label>
          <input 
            type="number" 
            step="0.01" 
            min="0"
            className="input-field" 
            value={data.hourlyRate || ''}
            onChange={e => onChange({ hourlyRate: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="form-group">
          <label>Paralegal Rate (£)</label>
          <input 
            type="number" 
            min="0"
            className="input-field" 
            value={data.paralegalRate || ''}
            onChange={e => onChange({ paralegalRate: parseInt(e.target.value, 10) || 0 })}
          />
        </div>
      </div>
    </div>
  );
};
