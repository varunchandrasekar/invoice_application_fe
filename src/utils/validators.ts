import { z } from 'zod';

export const invoiceHeaderSchema = z.object({
  invoiceNumber: z.string().min(1, 'Required'),
  invoiceDate: z.string().min(1, 'Required'),
  vatNumber: z.string().min(1, 'Required'),
  hourlyRate: z.number().min(0),
  paralegalRate: z.number().min(0),
});

export const clientDetailsSchema = z.object({
  clientName: z.string().min(1, 'Required'),
  addressLine1: z.string().min(1, 'Required'),
  email: z.string().email().optional().or(z.literal('')),
  matterReference: z.string().min(1, 'Required'),
});

export const timeCostSchema = z.object({
  id: z.string(),
  category: z.string(),
  description: z.string().min(1, 'Required'),
  hours: z.number().min(0),
  minutes: z.number().min(0).max(59),
  vatApplicable: z.boolean(),
  manualNetOverride: z.number().optional(),
});

export const disbursementSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Required'),
  invoiceDate: z.string().optional(),
  invoiceRef: z.string().optional(),
  netAmount: z.number().min(0),
  vatApplicable: z.boolean(),
});

export const outstandingInvoiceSchema = z.object({
  id: z.string(),
  invoiceType: z.string().min(1, 'Required'),
  invoiceDate: z.string().optional(),
  invoiceRef: z.string().min(1, 'Required'),
  amountNonVat: z.number().min(0),
  amountWithVat: z.number().min(0),
});

export const moneyOnAccountSchema = z.object({
  id: z.string(),
  paymentDate: z.string().optional(),
  description: z.string().optional(),
  amountReceived: z.number().min(0),
});

export const discountSchema = z.object({
  description: z.string(),
  amount: z.number().min(0),
});

export const scheduleItemSchema = z.object({
  id: z.string(),
  workDescription: z.string().min(1, 'Required'),
  gradeAHours: z.number().min(0),
  gradeAMinutes: z.number().min(0).max(59),
  paralegalHours: z.number().min(0),
  paralegalMinutes: z.number().min(0).max(59),
});

export const fullBillSchema = z.object({
  invoiceHeader: invoiceHeaderSchema,
  clientDetails: clientDetailsSchema,
  timeCosts: z.array(timeCostSchema),
  disbursements: z.array(disbursementSchema),
  outstandingInvoices: z.array(outstandingInvoiceSchema),
  moneyOnAccount: z.array(moneyOnAccountSchema),
  discount: discountSchema.optional(),
  includeDiscount: z.boolean(),
  scheduleOfWork: z.array(scheduleItemSchema),
});
