import React from 'react';
import { ComputedTotals } from '../types/bill.types';
import { formatCurrency } from '../utils/calculations';

interface Props {
  totals: ComputedTotals;
}

export const SummaryPanel: React.FC<Props> = ({ totals }) => {
  return (
    <div className="glass-card summary-panel">
      <h2 className="section-title mb-4">Invoice Summary</h2>
      
      <div>
        <div className="summary-row font-medium">TIME COSTS (A)</div>
        <div className="summary-row sub-row"><span>Net</span> <span>{formatCurrency(totals.totalA_net)}</span></div>
        <div className="summary-row sub-row"><span>VAT</span> <span>{formatCurrency(totals.totalA_vat)}</span></div>
        <div className="summary-row sub-row text-primary"><span>Total A</span> <span>{formatCurrency(totals.totalA_total)}</span></div>
      </div>

      <div className="mt-2">
        <div className="summary-row font-medium">DISBURSEMENTS (B)</div>
        <div className="summary-row sub-row"><span>Net</span> <span>{formatCurrency(totals.totalB_net)}</span></div>
        <div className="summary-row sub-row"><span>VAT</span> <span>{formatCurrency(totals.totalB_vat)}</span></div>
        <div className="summary-row sub-row text-primary"><span>Total B</span> <span>{formatCurrency(totals.totalB_total)}</span></div>
      </div>

      <div className="summary-row total-row">
        <span>SUBTOTAL C (A+B)</span>
        <span>{formatCurrency(totals.subtotalC_total)}</span>
      </div>

      <div className="summary-row total-row">
        <span>OUTSTANDING DUES (D)</span>
        <span>{formatCurrency(totals.totalDuesD)}</span>
      </div>

      <div className="summary-row total-row grand-total">
        <span>GRAND TOTAL (F)</span>
        <span>{formatCurrency(totals.grandTotalF)}</span>
      </div>

      {totals.discountAmount > 0 && (
        <>
          <div className="summary-row total-row text-accent-gold">
            <span>DISCOUNT</span>
            <span>-{formatCurrency(totals.discountAmount)}</span>
          </div>
          <div className="summary-row total-row">
            <span>NET AFTER DISCOUNT</span>
            <span>{formatCurrency(totals.netAfterDiscount)}</span>
          </div>
        </>
      )}

      <div className="summary-row total-row text-error">
        <span>MONEY ON ACCOUNT (M)</span>
        <span>-{formatCurrency(totals.totalMoneyOnAccount)}</span>
      </div>

      <div className="summary-row total-row grand-total mt-4 border-t-2" style={{ borderTopColor: 'var(--accent-blue)', color: 'var(--accent-blue)' }}>
        <span>BALANCE DUE</span>
        <span>{formatCurrency(totals.finalBalanceDue)}</span>
      </div>
    </div>
  );
};
