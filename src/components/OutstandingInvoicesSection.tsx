import React from 'react';
import { OutstandingInvoice } from '../types/bill.types';
import { formatCurrency } from '../utils/calculations';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  data: OutstandingInvoice[];
  onChange: (data: OutstandingInvoice[]) => void;
}

export const OutstandingInvoicesSection: React.FC<Props> = ({ data, onChange }) => {
  const addRow = () => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), invoiceType: 'INTERIM INVOICE', invoiceRef: '', amountNonVat: 0, amountWithVat: 0 }
    ]);
  };

  const updateRow = (id: string, updates: Partial<OutstandingInvoice>) => {
    onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  let totalDues = 0;
  data.forEach(item => totalDues += item.amountWithVat);

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Outstanding Invoices (D)</h2>
        <button type="button" className="btn btn-secondary" onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th style={{minWidth:'150px'}}>Date</th>
              <th style={{minWidth:'150px'}}>Ref</th>
              <th style={{minWidth:'120px'}}>Non-VAT (£)</th>
              <th style={{minWidth:'120px'}}>With VAT (£)</th>
              <th style={{minWidth:'50px'}}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-secondary py-4">No entries added.</td></tr>
            ) : data.map(item => (
                <tr key={item.id}>
                  <td>
                    <select className="input-field" value={item.invoiceType} onChange={e => updateRow(item.id, { invoiceType: e.target.value })}>
                      <option value="INTERIM INVOICE">INTERIM INVOICE</option>
                      <option value="PREVIOUS INVOICE">PREVIOUS INVOICE</option>
                    </select>
                  </td>
                  <td>
                    <input type="date" className="input-field" value={item.invoiceDate || ''} onChange={e => updateRow(item.id, { invoiceDate: e.target.value })} />
                  </td>
                  <td>
                    <input className="input-field" value={item.invoiceRef} onChange={e => updateRow(item.id, { invoiceRef: e.target.value })} />
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" className="input-field" value={item.amountNonVat === 0 ? '' : item.amountNonVat} onChange={e => updateRow(item.id, { amountNonVat: parseFloat(e.target.value) || 0 })} />
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" className="input-field" value={item.amountWithVat === 0 ? '' : item.amountWithVat} onChange={e => updateRow(item.id, { amountWithVat: parseFloat(e.target.value) || 0 })} />
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
          <span className="font-semibold text-secondary">Total Dues (D)</span>
          <span className="font-bold text-accent-blue">{formatCurrency(totalDues)}</span>
        </div>
      )}
    </div>
  );
};
