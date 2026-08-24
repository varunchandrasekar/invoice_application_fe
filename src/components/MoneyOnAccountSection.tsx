import React from 'react';
import { MoneyOnAccount } from '../types/bill.types';
import { formatCurrency } from '../utils/calculations';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  data: MoneyOnAccount[];
  onChange: (data: MoneyOnAccount[]) => void;
}

export const MoneyOnAccountSection: React.FC<Props> = ({ data, onChange }) => {
  const addRow = () => {
    onChange([...data, { id: crypto.randomUUID(), amountReceived: 0 }]);
  };

  const updateRow = (id: string, updates: Partial<MoneyOnAccount>) => {
    onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  let totalReceived = 0;
  data.forEach(item => totalReceived += item.amountReceived);

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Money on Account (M)</h2>
        <button type="button" className="btn btn-secondary" onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{minWidth:'150px'}}>Payment Date</th>
              <th>Description</th>
              <th style={{minWidth:'150px'}}>Amount (£)</th>
              <th style={{minWidth:'50px'}}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-secondary py-4">No entries added.</td></tr>
            ) : data.map(item => (
                <tr key={item.id}>
                  <td>
                    <input type="date" className="input-field" value={item.paymentDate || ''} onChange={e => updateRow(item.id, { paymentDate: e.target.value })} />
                  </td>
                  <td>
                    <input className="input-field" placeholder="e.g. Bank Transfer" value={item.description || ''} onChange={e => updateRow(item.id, { description: e.target.value })} />
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" className="input-field" value={item.amountReceived === 0 ? '' : item.amountReceived} onChange={e => updateRow(item.id, { amountReceived: parseFloat(e.target.value) || 0 })} />
                  </td>
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
          <span className="font-semibold text-secondary">Total Received (M)</span>
          <span className="font-bold text-accent-blue">{formatCurrency(totalReceived)}</span>
        </div>
      )}
    </div>
  );
};
