import { create } from 'zustand';
import api from '../api.js';

const usePriceStore = create((set) => ({
  prices: [],
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/prices');
      set({ prices: response.data?.data || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch prices', loading: false });
    }
  },

  updatePrice: async (type, priceData) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/admin/prices/${type}`, priceData);
      const pricesResponse = await api.get('/admin/prices');
      set({ prices: pricesResponse.data?.data || [], loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update price', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default usePriceStore;