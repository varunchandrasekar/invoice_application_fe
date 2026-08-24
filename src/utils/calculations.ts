import { BillFormData, ComputedTotals } from '../types/bill.types';

const VAT_RATE = 0.20;

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const minutesToDecimal = (minutes: number): number => {
  return minutes / 60;
};

export const computeTimeCost = (
  hours: number,
  minutes: number,
  rate: number,
  vatApplicable: boolean,
  manualOverride?: number
) => {
  const netAmount = manualOverride !== undefined && manualOverride >= 0
    ? manualOverride
    : (hours + minutesToDecimal(minutes)) * rate;
  
  const vatAmount = vatApplicable ? netAmount * VAT_RATE : 0;
  return {
    net: netAmount,
    vat: vatAmount,
    total: netAmount + vatAmount
  };
};

export const computeTotals = (data: BillFormData): ComputedTotals => {
  let totalA_net = 0;
  let totalA_vat = 0;
  
  data.timeCosts.forEach(tc => {
    const cost = computeTimeCost(
      tc.hours || 0,
      tc.minutes || 0,
      data.invoiceHeader.hourlyRate || 0,
      tc.vatApplicable,
      tc.manualNetOverride
    );
    totalA_net += cost.net;
    totalA_vat += cost.vat;
  });

  let totalB_net = 0;
  let totalB_vat = 0;
  data.disbursements.forEach(d => {
    const net = d.netAmount || 0;
    const vat = d.vatApplicable ? net * VAT_RATE : 0;
    totalB_net += net;
    totalB_vat += vat;
  });

  const subtotalC_net = totalA_net + totalB_net;
  const subtotalC_vat = totalA_vat + totalB_vat;
  const subtotalC_total = subtotalC_net + subtotalC_vat;

  let totalDuesD = 0;
  data.outstandingInvoices.forEach(oi => {
    totalDuesD += (oi.amountWithVat || 0);
  });

  const grandTotalF = subtotalC_total + totalDuesD;

  const discountAmount = grandTotalF * ((data.discountPercentage || 0) / 100);
  const netAfterDiscount = grandTotalF - discountAmount;

  let totalMoneyOnAccount = 0;
  data.moneyOnAccount.forEach(m => {
    totalMoneyOnAccount += (m.amountReceived || 0);
  });

  const finalBalanceDue = netAfterDiscount - totalMoneyOnAccount;

  let scheduleTotalCost = 0;
  data.scheduleOfWork.forEach(s => {
    const gradeACost = ((s.gradeAHours || 0) + minutesToDecimal(s.gradeAMinutes || 0)) * (data.invoiceHeader.hourlyRate || 0);
    const paralegalCost = ((s.paralegalHours || 0) + minutesToDecimal(s.paralegalMinutes || 0)) * (data.invoiceHeader.paralegalRate || 0);
    scheduleTotalCost += (gradeACost + paralegalCost);
  });

  return {
    totalA_net,
    totalA_vat,
    totalA_total: totalA_net + totalA_vat,
    totalB_net,
    totalB_vat,
    totalB_total: totalB_net + totalB_vat,
    subtotalC_net,
    subtotalC_vat,
    subtotalC_total,
    totalDuesD,
    grandTotalF,
    discountAmount,
    netAfterDiscount,
    totalMoneyOnAccount,
    finalBalanceDue,
    scheduleTotalCost
  };
};
