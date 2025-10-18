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
      const tempCashier = {
        ...cashierData,
        id: Date.now(),
        status: cashierData.status || 'Active',
        created_at: new Date().toISOString()
      };
      
      set(state => ({ 
        cashiers: [...state.cashiers, tempCashier], 
        loading: false 
      }));
      
      const response = await api.post('/admin/cashiers', cashierData);
      const newCashier = response.data?.data;
      
      if (newCashier && newCashier.id !== tempCashier.id) {
        set(state => ({
          cashiers: state.cashiers.map(cashier => 
            cashier.id === tempCashier.id ? newCashier : cashier
          )
        }));
      }
      
      return newCashier || tempCashier;
    } catch (error) {
      set({ error: error.message || 'Failed to add cashier', loading: false });
      throw error;
    }
  },

  updateCashier: async (id, cashierData) => {
    set({ loading: true, error: null });
    try {
      const updatedCashier = {
        ...cashierData,
        id,
        updated_at: new Date().toISOString()
      };
      
      set(state => ({
        cashiers: state.cashiers.map(cashier => 
          cashier.id === id ? { ...cashier, ...updatedCashier } : cashier
        ),
        loading: false
      }));
      
      const response = await api.put(`/admin/cashiers/${id}`, cashierData);
      const serverCashier = response.data?.data;
      
      if (serverCashier) {
        set(state => ({
          cashiers: state.cashiers.map(cashier => 
            cashier.id === id ? serverCashier : cashier
          )
        }));
      }
      
      return serverCashier || updatedCashier;
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