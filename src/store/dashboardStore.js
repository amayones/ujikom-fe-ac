import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

const useDashboardStore = create((set, get) => ({
  customerData: null,
  adminData: null,
  cashierData: null,
  loading: false,
  error: null,

  getCustomerDashboard: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get('/customer/dashboard');
      
      if (response.data.status === 'success') {
        set({ customerData: response.data.data, loading: false });
        return response.data.data;
      }
    } catch (error) {
      console.error('Dashboard API failed:', error);
      set({ error: error.message, loading: false });
      
      // Mock data fallback
      const mockData = {
        totalBookings: 12,
        pendingBookings: 2,
        completedBookings: 10,
        totalSpent: 600000,
        recentBookings: []
      };
      set({ customerData: mockData });
      toast.info('Using demo dashboard data');
      return mockData;
    }
  },

  getAdminDashboard: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get('/admin/dashboard');
      
      if (response.data.status === 'success') {
        set({ adminData: response.data.data, loading: false });
        return response.data.data;
      }
    } catch (error) {
      console.error('Dashboard API failed:', error);
      set({ error: error.message, loading: false });
      
      // Mock data fallback
      const mockData = {
        totalFilms: 25,
        activeFilms: 12,
        totalCustomers: 1234,
        todayBookings: 45,
        monthlyRevenue: 15000000,
        totalSchedules: 150,
        todaySchedules: 8
      };
      set({ adminData: mockData });
      toast.info('Using demo dashboard data');
      return mockData;
    }
  },

  getCashierDashboard: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosClient.get('/cashier/dashboard');
      
      if (response.data.status === 'success') {
        set({ cashierData: response.data.data, loading: false });
        return response.data.data;
      }
    } catch (error) {
      console.error('Dashboard API failed:', error);
      set({ error: error.message, loading: false });
      
      // Mock data fallback
      const mockData = {
        todayBookings: 23,
        todayRevenue: 1150000,
        pendingTransactions: 5,
        cashTransactions: 18,
        todaySchedules: []
      };
      set({ cashierData: mockData });
      toast.info('Using demo dashboard data');
      return mockData;
    }
  },

  clearDashboard: () => set({
    customerData: null,
    adminData: null,
    cashierData: null,
    error: null
  })
}));

export default useDashboardStore;