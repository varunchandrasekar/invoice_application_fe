import React from 'react';
import { Discount } from '../types/bill.types';

interface Props {
  data?: Discount;
  onChange: (data: Discount) => void;
}

export const DiscountPanel: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="glass-card border border-accent-gold/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold"></div>
      <div className="section-header border-b-accent-gold/20">
        <h2 className="section-title text-accent-gold">Discount</h2>
      </div>
      
      <div className="form-grid">
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Discount Description</label>
          <input 
            className="input-field" 
            placeholder="e.g. Courtesy Discount"
            value={data?.description || ''}
            onChange={e => onChange({ description: e.target.value, amount: data?.amount || 0 })}
          />
        </div>
        <div className="form-group">
          <label>Discount Amount (£)</label>
          <input 
            type="number" 
            min="0" 
            step="0.01" 
            className="input-field" 
            value={data?.amount || ''}
            onChange={e => onChange({ description: data?.description || '', amount: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>
    </div>
  );
};
