import { create } from 'zustand';
import api from '../api.js';

const useCashierStore = create((set) => ({
  cashiers: [],
  loading: false,
  error: null,

  fetchCashiers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/cashiers');
      set({ cashiers: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch cashiers', loading: false });
    }
  },

  addCashier: async (cashierData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/admin/cashiers', cashierData);
      set(state => ({ 
        cashiers: [...state.cashiers, response.data.data || cashierData], 
        loading: false 
      }));
      return response.data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add cashier', loading: false });
      throw error;
    }
  },

  updateCashier: async (id, cashierData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/cashiers/${id}`, cashierData);
      set(state => ({
        cashiers: state.cashiers.map(cashier => 
          cashier.id === id ? { ...cashier, ...cashierData } : cashier
        ),
        loading: false
      }));
      return response.data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update cashier', loading: false });
      throw error;
    }
  },

  deleteCashier: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/admin/cashiers/${id}`);
      set(state => ({
        cashiers: state.cashiers.filter(cashier => cashier.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete cashier', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useCashierStore;