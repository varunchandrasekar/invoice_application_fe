import axios from 'axios';
import { BillFormData } from '../types/bill.types';

const API_BASE = 'http://localhost:8080';

/**
 * Fetches the list of all saved session names from the backend.
 */
export const listSessions = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${API_BASE}/api/v1/sessions`);
  return response.data;
};

/**
 * Saves the current form data under the given session name.
 */
export const saveSession = async (name: string, data: BillFormData): Promise<void> => {
  await axios.post(`${API_BASE}/api/v1/sessions/${encodeURIComponent(name)}`, data, {
    headers: { 'Content-Type': 'application/json' }
  });
};

/**
 * Loads a session by name and returns the parsed BillFormData.
 */
export const loadSession = async (name: string): Promise<BillFormData> => {
  const response = await axios.get<BillFormData>(
    `${API_BASE}/api/v1/sessions/${encodeURIComponent(name)}`
  );
  return response.data;
};

/**
 * Deletes a saved session by name.
 */
export const deleteSession = async (name: string): Promise<void> => {
  await axios.delete(`${API_BASE}/api/v1/sessions/${encodeURIComponent(name)}`);
};
