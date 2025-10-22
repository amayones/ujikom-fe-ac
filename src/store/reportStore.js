import { create } from 'zustand';
import api from '../api';

const useReportStore = create((set) => ({
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
            set({ error: error.response?.data?.message || 'Failed to fetch income report', loading: false });
        }
    },

    fetchExpenseReport: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/owner/expense');
            set({ expenseData: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch expense report', loading: false });
        }
    },

    fetchPerformanceReport: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/owner/performance');
            set({ loading: false });
            return { success: true, data: response.data.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch performance report';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null })
}));

export default useReportStore;