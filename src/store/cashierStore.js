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
      set({ cashiers: response.data?.data || [], loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch cashiers', loading: false });
    }
  },

  addCashier: async (cashierData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/admin/cashiers', cashierData);
      const newCashier = response.data?.data;
      if (newCashier) {
        set(state => ({ 
          cashiers: [...state.cashiers, newCashier], 
          loading: false 
        }));
      } else {
        set({ loading: false });
      }
      return newCashier;
    } catch (error) {
      set({ error: error.message || 'Failed to add cashier', loading: false });
      throw error;
    }
  },

  updateCashier: async (id, cashierData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/cashiers/${id}`, cashierData);
      const updatedCashier = response.data?.data;
      if (updatedCashier) {
        set(state => ({
          cashiers: state.cashiers.map(cashier => 
            cashier.id === id ? updatedCashier : cashier
          ),
          loading: false
        }));
      } else {
        set({ loading: false });
      }
      return updatedCashier;
    } catch (error) {
      set({ error: error.message || 'Failed to update cashier', loading: false });
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
      set({ error: error.message || 'Failed to delete cashier', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useCashierStore;