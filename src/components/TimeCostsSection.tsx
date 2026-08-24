import React from 'react';
import { TimeCostEntry, ActivityCategory } from '../types/bill.types';
import { ACTIVITY_CATEGORIES } from '../constants/categories';
import { computeTimeCost, formatCurrency } from '../utils/calculations';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  data: TimeCostEntry[];
  hourlyRate: number;
  onChange: (data: TimeCostEntry[]) => void;
}

export const TimeCostsSection: React.FC<Props> = ({ data, hourlyRate, onChange }) => {
  const addRow = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        category: 'PERSONAL_ATTENDANCE',
        description: '',
        hours: 0,
        minutes: 0,
        vatApplicable: true
      }
    ]);
  };

  const updateRow = (id: string, updates: Partial<TimeCostEntry>) => {
    onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  let totalNet = 0;
  let totalVat = 0;
  let totalGross = 0;

  data.forEach(item => {
    const cost = computeTimeCost(item.hours, item.minutes, hourlyRate, item.vatApplicable, item.manualNetOverride);
    totalNet += cost.net;
    totalVat += cost.vat;
    totalGross += cost.total;
  });

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Time Costs (A)</h2>
        <button type="button" className="btn btn-secondary" onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th style={{minWidth:'80px'}}>Hours</th>
              <th style={{minWidth:'80px'}}>Mins</th>
              <th style={{minWidth:'80px'}}>VAT</th>
              <th style={{minWidth:'120px'}}>Total (£)</th>
              <th style={{minWidth:'50px'}}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-secondary py-4">No entries added.</td></tr>
            ) : data.map(item => {
              const cost = computeTimeCost(item.hours, item.minutes, hourlyRate, item.vatApplicable, item.manualNetOverride);
              return (
                <tr key={item.id}>
                  <td>
                    <select 
                      className="input-field"
                      value={item.category}
                      onChange={e => updateRow(item.id, { category: e.target.value as ActivityCategory })}
                    >
                      {ACTIVITY_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </td>
                  <td>
                    <input 
                      className="input-field" 
                      value={item.description}
                      onChange={e => updateRow(item.id, { description: e.target.value })}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" min="0" className="input-field text-center" 
                      value={item.hours === 0 && item.minutes === 0 ? '' : item.hours}
                      onChange={e => updateRow(item.id, { hours: parseInt(e.target.value) || 0 })}
                    />
                  </td>
                  <td>
                    <input 
                      type="number" min="0" max="59" className="input-field text-center" 
                      value={item.hours === 0 && item.minutes === 0 ? '' : item.minutes}
                      onChange={e => updateRow(item.id, { minutes: parseInt(e.target.value) || 0 })}
                    />
                  </td>
                  <td className="text-center">
                    <label className="switch">
                      <input type="checkbox" checked={item.vatApplicable} onChange={e => updateRow(item.id, { vatApplicable: e.target.checked })} />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="font-medium text-right">{formatCurrency(cost.total)}</td>
                  <td>
                    <button type="button" className="action-btn danger" onClick={() => removeRow(item.id)}><Trash2 size={16}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="mt-4 flex justify-between items-center bg-black/20 p-4 rounded-md">
          <span className="font-semibold text-secondary">Section A Totals</span>
          <div className="flex gap-4">
            <div className="text-right"><div className="text-xs text-secondary">Net</div><div className="font-semibold">{formatCurrency(totalNet)}</div></div>
            <div className="text-right"><div className="text-xs text-secondary">VAT</div><div className="font-semibold">{formatCurrency(totalVat)}</div></div>
            <div className="text-right"><div className="text-xs text-secondary">Total</div><div className="font-semibold text-accent-blue">{formatCurrency(totalGross)}</div></div>
          </div>
        </div>
      )}
    </div>
  );
};
