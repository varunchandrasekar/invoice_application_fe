export type ActivityCategory = 
  | 'PERSONAL_ATTENDANCE' | 'TELEPHONE_ATTENDANCE' | 'EMAILS_LETTERS'
  | 'WORK_ON_DOCUMENTS' | 'OTHER_CHARGEABLE' | 'OTHER_ATTENDANCE'
  | 'OTHER_EXPENSES_NON_VAT';

export interface InvoiceHeader {
  invoiceNumber: string;
  invoiceDate: string; // ISO date
  vatNumber: string;
  hourlyRate: number;
  paralegalRate: number;
}

export interface ClientDetails {
  clientName: string;
  addressLine1: string;
  email?: string;
  matterReference: string;
}

export interface TimeCostEntry {
  id: string; // UI only
  category: ActivityCategory;
  description: string;
  hours: number;
  minutes: number;
  vatApplicable: boolean;
  manualNetOverride?: number;
}

export interface Disbursement {
  id: string;
  description: string;
  invoiceDate?: string;
  invoiceRef?: string;
  netAmount: number;
  vatApplicable: boolean;
}

export interface OutstandingInvoice {
  id: string;
  invoiceType: string;
  invoiceDate?: string;
  invoiceRef: string;
  amountNonVat: number;
  amountWithVat: number;
}

export interface MoneyOnAccount {
  id: string;
  paymentDate?: string;
  description?: string;
  amountReceived: number;
}

export interface Discount {
  description: string;
  amount: number;
}

export interface Discount {
  description: string;
  amount: number;
}

export interface ScheduleItem {
  id: string;
  workDescription: string;
  gradeAHours: number;
  gradeAMinutes: number;
  paralegalHours: number;
  paralegalMinutes: number;
}

export interface BillFormData {
  invoiceHeader: InvoiceHeader;
  clientDetails: ClientDetails;
  timeCosts: TimeCostEntry[];
  disbursements: Disbursement[];
  outstandingInvoices: OutstandingInvoice[];
  moneyOnAccount: MoneyOnAccount[];
  discountPercentage?: number;
  scheduleOfWork: ScheduleItem[];
}

export interface ComputedTotals {
  totalA_net: number;
  totalA_vat: number;
  totalA_total: number;
  totalB_net: number;
  totalB_vat: number;
  totalB_total: number;
  subtotalC_net: number;
  subtotalC_vat: number;
  subtotalC_total: number;
  totalDuesD: number;
  grandTotalF: number;
  discountAmount: number;
  netAfterDiscount: number;
  totalMoneyOnAccount: number;
  finalBalanceDue: number;
  scheduleTotalCost: number;
}
