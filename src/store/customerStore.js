import { create } from 'zustand';
import api from '../api.js';

const useCustomerStore = create((set) => ({
  customers: [],
  loading: false,
  error: null,

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/admin/users');
      set({ customers: response.data?.data || [], loading: false });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch customers', loading: false });
    }
  },

  getCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/admin/users/${id}`);
      set({ loading: false });
      return response.data?.data;
    } catch (error) {
      set({ error: error.message || 'Failed to fetch customer', loading: false });
      throw error;
    }
  },

  addCustomer: async (customerData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/admin/users', customerData);
      const newCustomer = response.data?.data;
      if (newCustomer) {
        set(state => ({ 
          customers: [...state.customers, newCustomer], 
          loading: false 
        }));
      } else {
        set({ loading: false });
      }
      return newCustomer;
    } catch (error) {
      set({ error: error.message || 'Failed to add customer', loading: false });
      throw error;
    }
  },

  updateCustomer: async (id, customerData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/users/${id}`, customerData);
      const updatedCustomer = response.data?.data;
      if (updatedCustomer) {
        set(state => ({
          customers: state.customers.map(customer => 
            customer.id === id ? updatedCustomer : customer
          ),
          loading: false
        }));
      } else {
        set({ loading: false });
      }
      return updatedCustomer;
    } catch (error) {
      set({ error: error.message || 'Failed to update customer', loading: false });
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/admin/users/${id}`);
      set(state => ({
        customers: state.customers.filter(customer => customer.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message || 'Failed to delete customer', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useCustomerStore;