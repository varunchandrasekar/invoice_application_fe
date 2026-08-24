import { useMemo } from 'react';
import { BillFormData, ComputedTotals } from '../types/bill.types';
import { computeTotals } from '../utils/calculations';

export const useBillCalculator = (data: BillFormData): ComputedTotals => {
  return useMemo(() => {
    return computeTotals(data);
  }, [data]);
};
