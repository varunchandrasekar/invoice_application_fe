import React from 'react';
import { ScheduleItem } from '../types/bill.types';
import { Trash2, Plus } from 'lucide-react';

interface Props {
  data: ScheduleItem[];
  onChange: (data: ScheduleItem[]) => void;
}

export const ScheduleOfWorkSection: React.FC<Props> = ({ data, onChange }) => {
  const addRow = () => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), workDescription: '', gradeAHours: 0, gradeAMinutes: 0, paralegalHours: 0, paralegalMinutes: 0 }
    ]);
  };

  const updateRow = (id: string, updates: Partial<ScheduleItem>) => {
    onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  return (
    <div className="glass-card">
      <div className="section-header">
        <h2 className="section-title">Schedule of Work</h2>
        <button type="button" className="btn btn-secondary" onClick={addRow}>
          <Plus size={16} /> Add Row
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{minWidth:'40px'}}>#</th>
              <th>Work Description</th>
              <th style={{minWidth:'80px'}}>Grade A Hrs</th>
              <th style={{minWidth:'80px'}}>Grade A Min</th>
              <th style={{minWidth:'80px'}}>Para Hrs</th>
              <th style={{minWidth:'80px'}}>Para Min</th>
              <th style={{minWidth:'50px'}}></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={7} className="text-center text-secondary py-4">No entries added.</td></tr>
            ) : data.map((item, idx) => (
                <tr key={item.id}>
                  <td className="text-secondary">{idx + 1}</td>
                  <td>
                    <input className="input-field" value={item.workDescription} onChange={e => updateRow(item.id, { workDescription: e.target.value })} />
                  </td>
                  <td>
                    <input type="number" min="0" className="input-field text-center" value={item.gradeAHours === 0 && item.gradeAMinutes === 0 ? '' : item.gradeAHours} onChange={e => updateRow(item.id, { gradeAHours: parseInt(e.target.value) || 0 })} />
                  </td>
                  <td>
                    <input type="number" min="0" max="59" className="input-field text-center" value={item.gradeAHours === 0 && item.gradeAMinutes === 0 ? '' : item.gradeAMinutes} onChange={e => updateRow(item.id, { gradeAMinutes: parseInt(e.target.value) || 0 })} />
                  </td>
                  <td>
                    <input type="number" min="0" className="input-field text-center" value={item.paralegalHours === 0 && item.paralegalMinutes === 0 ? '' : item.paralegalHours} onChange={e => updateRow(item.id, { paralegalHours: parseInt(e.target.value) || 0 })} />
                  </td>
                  <td>
                    <input type="number" min="0" max="59" className="input-field text-center" value={item.paralegalHours === 0 && item.paralegalMinutes === 0 ? '' : item.paralegalMinutes} onChange={e => updateRow(item.id, { paralegalMinutes: parseInt(e.target.value) || 0 })} />
                  </td>
                  <td>
                    <button type="button" className="action-btn danger" onClick={() => removeRow(item.id)}><Trash2 size={16}/></button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
