import { create } from 'zustand';
import api from '../api';

const useCashierStore = create((set) => ({
    cashiers: [],
    stats: {},
    currentBooking: null,
    validatedTicket: null,
    loading: false,
    error: null,

    fetchCashiers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/admin/users');
            const cashiers = response.data.data.filter(user => user.role === 'cashier');
            set({ cashiers, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch cashiers', loading: false });
        }
    },

    addCashier: async (cashierData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/admin/users', { ...cashierData, role: 'cashier' });
            const newCashier = response.data.data;
            set(state => ({ 
                cashiers: [...state.cashiers, newCashier], 
                loading: false 
            }));
            return { success: true, data: newCashier };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add cashier';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    updateCashier: async (id, cashierData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/admin/users/${id}`, cashierData);
            const updatedCashier = response.data.data;
            set(state => ({
                cashiers: state.cashiers.map(cashier => 
                    cashier.id === id ? updatedCashier : cashier
                ),
                loading: false
            }));
            return { success: true, data: updatedCashier };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update cashier';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    deleteCashier: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/admin/users/${id}`);
            set(state => ({
                cashiers: state.cashiers.filter(cashier => cashier.id !== id),
                loading: false
            }));
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete cashier';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    fetchDashboard: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/cashier/dashboard');
            set({ stats: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch dashboard', loading: false });
        }
    },

    createOfflineBooking: async (bookingData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/cashier/offline-booking', bookingData);
            const booking = response.data.data;
            set({ currentBooking: booking, loading: false });
            return { success: true, data: booking };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create booking';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    printTicket: async (ticketId) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/cashier/print-ticket/${ticketId}`);
            const ticket = response.data.data;
            set({ loading: false });
            return { success: true, data: ticket };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to get ticket data';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    validateOnlineTicket: async (validationData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/cashier/process-ticket', validationData);
            const ticket = response.data.data;
            set({ validatedTicket: ticket, loading: false });
            return { success: true, data: ticket };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to validate ticket';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    fetchTransactions: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/cashier/transactions');
            set({ loading: false });
            return { success: true, data: response.data.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch transactions';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null }),
    clearCurrentBooking: () => set({ currentBooking: null }),
    clearValidatedTicket: () => set({ validatedTicket: null })
}));

export default useCashierStore;