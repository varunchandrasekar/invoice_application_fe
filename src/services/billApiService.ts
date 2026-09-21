import axios from 'axios';
import { BillFormData } from '../types/bill.types';

const API_BASE = 'http://localhost:8080';

export const generateBill = async (data: BillFormData): Promise<void> => {
  const response = await axios.post(`${API_BASE}/api/v1/bill/generate`, data, {
    responseType: 'blob',
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Trigger download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  const filename = response.headers['content-disposition']
    ?.split('filename=')[1] ?? `Invoice_${Date.now()}.xlsx`;
  link.setAttribute('download', filename.replace(/"/g, ''));
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
