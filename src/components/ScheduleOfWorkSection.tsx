import React from 'react';
import { ScheduleItem } from '../types/bill.types';
import { Trash2, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface Props {
  data: ScheduleItem[];
  onChange: (data: ScheduleItem[]) => void;
  hourlyRate?: number;
  paralegalRate?: number;
}

export const ScheduleOfWorkSection: React.FC<Props> = ({
  data,
  onChange,
  hourlyRate = 0,
  paralegalRate = 0,
}) => {
  const addRow = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        workDescription: '',
        gradeAHours: 0,
        gradeAMinutes: 0,
        paralegalHours: 0,
        paralegalMinutes: 0,
      },
    ]);
  };

  const updateRow = (id: string, updates: Partial<ScheduleItem>) => {
    onChange(data.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeRow = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  /** Grade-A cost for a single row */
  const calcGradeACost = (item: ScheduleItem): number =>
    (item.gradeAHours + item.gradeAMinutes / 60) * hourlyRate;

  /** Paralegal cost for a single row */
  const calcParalegalCost = (item: ScheduleItem): number =>
    (item.paralegalHours + item.paralegalMinutes / 60) * paralegalRate;

  /** Combined total for a single row */
  const calcRowTotal = (item: ScheduleItem): number =>
    calcGradeACost(item) + calcParalegalCost(item);

  /** Grand total across all rows */
  const grandTotal = data.reduce((sum, item) => sum + calcRowTotal(item), 0);

  const dash = <span className="text-secondary" style={{ fontSize: '0.8rem' }}>—</span>;

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
            {/* Row 1: Group headers */}
            <tr>
              <th rowSpan={2} style={{ minWidth: '40px', verticalAlign: 'middle' }}>#</th>
              <th rowSpan={2} style={{ verticalAlign: 'middle' }}>Work Description</th>
              <th colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Grade-A</th>
              <th colSpan={2} style={{ textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Paralegal</th>
              <th rowSpan={2} style={{ minWidth: '110px', verticalAlign: 'middle', textAlign: 'right' }}>Grade-A (£)</th>
              <th rowSpan={2} style={{ minWidth: '110px', verticalAlign: 'middle', textAlign: 'right' }}>Para (£)</th>
              <th rowSpan={2} style={{ minWidth: '120px', verticalAlign: 'middle', textAlign: 'right' }}>Total (£)</th>
              <th rowSpan={2} style={{ minWidth: '50px', verticalAlign: 'middle' }}></th>
            </tr>
            {/* Row 2: Sub-headers */}
            <tr>
              <th style={{ minWidth: '75px', textAlign: 'center' }}>Hours</th>
              <th style={{ minWidth: '75px', textAlign: 'center' }}>Mins</th>
              <th style={{ minWidth: '75px', textAlign: 'center' }}>Hours</th>
              <th style={{ minWidth: '75px', textAlign: 'center' }}>Mins</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-secondary py-4">
                  No entries added.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const gradeACost = calcGradeACost(item);
                const paraCost   = calcParalegalCost(item);
                const rowTotal   = gradeACost + paraCost;

                return (
                  <tr key={item.id}>
                    <td className="text-secondary">{idx + 1}</td>

                    {/* Work Description */}
                    <td>
                      <input
                        className="input-field"
                        value={item.workDescription}
                        onChange={e => updateRow(item.id, { workDescription: e.target.value })}
                      />
                    </td>

                    {/* Grade-A Hours */}
                    <td>
                      <input
                        type="number" min="0"
                        className="input-field text-center"
                        value={item.gradeAHours === 0 && item.gradeAMinutes === 0 ? '' : item.gradeAHours}
                        onChange={e => updateRow(item.id, { gradeAHours: parseInt(e.target.value) || 0 })}
                      />
                    </td>

                    {/* Grade-A Mins */}
                    <td>
                      <input
                        type="number" min="0" max="59"
                        className="input-field text-center"
                        value={item.gradeAHours === 0 && item.gradeAMinutes === 0 ? '' : item.gradeAMinutes}
                        onChange={e => updateRow(item.id, { gradeAMinutes: parseInt(e.target.value) || 0 })}
                      />
                    </td>

                    {/* Paralegal Hours */}
                    <td>
                      <input
                        type="number" min="0"
                        className="input-field text-center"
                        value={item.paralegalHours === 0 && item.paralegalMinutes === 0 ? '' : item.paralegalHours}
                        onChange={e => updateRow(item.id, { paralegalHours: parseInt(e.target.value) || 0 })}
                      />
                    </td>

                    {/* Paralegal Mins */}
                    <td>
                      <input
                        type="number" min="0" max="59"
                        className="input-field text-center"
                        value={item.paralegalHours === 0 && item.paralegalMinutes === 0 ? '' : item.paralegalMinutes}
                        onChange={e => updateRow(item.id, { paralegalMinutes: parseInt(e.target.value) || 0 })}
                      />
                    </td>

                    {/* Grade-A Cost */}
                    <td className="font-medium text-right">
                      {hourlyRate > 0 ? formatCurrency(gradeACost) : dash}
                    </td>

                    {/* Paralegal Cost */}
                    <td className="font-medium text-right">
                      {paralegalRate > 0 ? formatCurrency(paraCost) : dash}
                    </td>

                    {/* Row Total */}
                    <td className="font-medium text-right" style={{ color: 'var(--accent-indigo)' }}>
                      {(hourlyRate > 0 || paralegalRate > 0) ? formatCurrency(rowTotal) : dash}
                    </td>

                    {/* Delete */}
                    <td>
                      <button
                        type="button"
                        className="action-btn danger"
                        onClick={() => removeRow(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Grand Total Footer Row */}
          {data.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={6}></td>
                <td
                  colSpan={3}
                  className="text-right font-semibold"
                  style={{
                    paddingTop: '1rem',
                    borderTop: '2px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)', marginRight: '1rem', fontWeight: 500 }}>
                    Grand Total
                  </span>
                  <span style={{ color: 'var(--accent-indigo)' }}>
                    {formatCurrency(grandTotal)}
                  </span>
                </td>
                <td style={{ borderTop: '2px solid var(--border-color)' }}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
