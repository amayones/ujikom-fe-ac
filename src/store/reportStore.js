import { create } from 'zustand';
import api from '../api';

const useReportStore = create((set, get) => ({
    incomeData: {},
    expenseData: {},
    loading: false,
    error: null,

    fetchIncomeReport: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/owner/income');
            set({ incomeData: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch income report', loading: false });
        }
    },

    fetchExpenseReport: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/owner/expense');
            set({ expenseData: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch expense report', loading: false });
        }
    },

    clearError: () => set({ error: null })
}));

export default useReportStore;