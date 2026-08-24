import React from 'react';
import { Disbursement } from '../types/bill.types';
import { formatCurrency } from '../utils/calculations';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  data: Disbursement[];
  onChange: (data: Disbursement[]) => void;
}

export const DisbursementsSection: React.FC<Props> = ({ data, onChange }) => {
  const addRow = () => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), description: '', netAmount: 0, vatApplicable: true }
    ]);
  };

  const updateRow = (id: string, updates: Partial<Disbursement>) => {
    onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  let totalNet = 0;
  let totalVat = 0;
  data.forEach(item => {
    totalNet += item.netAmount;
    if(item.vatApplicable) totalVat += (item.netAmount * 0.2);
  });

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Disbursements (B)</h2>
        <button type="button" className="btn btn-secondary" onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style={{minWidth:'120px'}}>Net Amount</th>
              <th style={{minWidth:'80px'}}>VAT</th>
              <th style={{minWidth:'120px'}}>Total (£)</th>
              <th style={{minWidth:'50px'}}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-secondary py-4">No entries added.</td></tr>
            ) : data.map(item => (
                <tr key={item.id}>
                  <td>
                    <input className="input-field" value={item.description} onChange={e => updateRow(item.id, { description: e.target.value })} />
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" className="input-field" value={item.netAmount || ''} onChange={e => updateRow(item.id, { netAmount: parseFloat(e.target.value) || 0, vatApplicable: true })} />
                  </td>
                  <td className="text-center font-medium">
                    {formatCurrency(item.netAmount * 0.2)}
                  </td>
                  <td className="font-medium text-right">{formatCurrency(item.netAmount * 1.2)}</td>
                  <td>
                    <button type="button" className="action-btn danger" onClick={() => removeRow(item.id)}><Trash2 size={16}/></button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="mt-4 flex justify-between items-center bg-black/20 p-4 rounded-md">
          <span className="font-semibold text-secondary">Section B Totals</span>
          <div className="flex gap-4">
            <div className="text-right"><div className="text-xs text-secondary">Net</div><div className="font-semibold">{formatCurrency(totalNet)}</div></div>
            <div className="text-right"><div className="text-xs text-secondary">VAT</div><div className="font-semibold">{formatCurrency(totalVat)}</div></div>
            <div className="text-right"><div className="text-xs text-secondary">Total</div><div className="font-semibold text-accent-blue">{formatCurrency(totalNet + totalVat)}</div></div>
          </div>
        </div>
      )}
    </div>
  );
};
