import { create } from 'zustand';
import api from '../api.js';

const usePriceStore = create((set, get) => ({
  prices: [],
  loading: false,
  error: null,

  fetchPrices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/prices');
      set({ prices: response.data.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch prices', loading: false });
    }
  },

  updatePrice: async (id, priceData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/prices/${id}`, priceData);
      const updatedPrice = response.data.data;
      set(state => ({
        prices: state.prices.map(price => 
          price.id === id ? updatedPrice : price
        ),
        loading: false
      }));
      return updatedPrice;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update price', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default usePriceStore;