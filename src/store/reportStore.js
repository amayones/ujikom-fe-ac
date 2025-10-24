import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

// Report store for owner reports and analytics
const useReportStore = create((set, get) => ({
  financialData: null,
  transactionData: null,
  summaryData: null,
  loading: false,
  error: null,
  useRealAPI: true, // Toggle between real API and mock data

  getFinancialReport: async (startDate, endDate) => {
    const { useRealAPI } = get();
    
    try {
      set({ loading: true, error: null });
      
      if (useRealAPI) {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        const response = await axiosClient.get(`/reports/financial?${params}`);
        
        if (response.data.status === 'success') {
          set({ financialData: response.data.data, loading: false });
          toast.success('Financial report loaded from API');
          return response.data.data;
        }
      }
    } catch (error) {
      console.error('API failed, using mock data:', error);
      set({ error: error.message });
      toast.info('Using demo data - Real API will be available soon');
    }
    
    // Fallback to mock data
    const mockData = {
      totalRevenue: 45678000,
      totalExpenses: 23456000,
      totalTransactions: 1234,
      monthlyData: [
        { month: 'January', revenue: 15000000, expenses: 8000000 },
        { month: 'February', revenue: 18000000, expenses: 9000000 },
        { month: 'March', revenue: 12678000, expenses: 6456000 }
      ]
    };
    set({ financialData: mockData, loading: false });
    return mockData;
  },

  getTransactionReport: async (startDate, endDate) => {
    const { useRealAPI } = get();
    
    try {
      set({ loading: true, error: null });
      
      if (useRealAPI) {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        const response = await axiosClient.get(`/reports/transactions?${params}`);
        
        if (response.data.status === 'success') {
          set({ transactionData: response.data.data });
          return response.data.data;
        }
      }
    } catch (error) {
      console.error('API failed, using mock data:', error);
      set({ error: error.message });
      toast.warning('Using demo data - API not available');
    }
    
    // Fallback to mock data
    const mockData = {
      transactions: [
        {
          id: 'TXN001',
          customer_name: 'John Doe',
          film_title: 'Spider-Man: No Way Home',
          created_at: '2024-01-15T10:30:00Z',
          total_amount: 50000,
          status: 'completed'
        },
        {
          id: 'TXN002',
          customer_name: 'Jane Smith',
          film_title: 'The Batman',
          created_at: '2024-01-15T14:20:00Z',
          total_amount: 75000,
          status: 'completed'
        },
        {
          id: 'TXN003',
          customer_name: 'Bob Wilson',
          film_title: 'Dune',
          created_at: '2024-01-16T19:45:00Z',
          total_amount: 60000,
          status: 'pending'
        }
      ]
    };
    set({ transactionData: mockData, loading: false });
    return mockData;
  },

  getSummaryReport: async () => {
    const { useRealAPI } = get();
    
    try {
      set({ loading: true, error: null });
      
      if (useRealAPI) {
        const response = await axiosClient.get('/reports/summary');
        
        if (response.data.status === 'success') {
          set({ summaryData: response.data.data });
          return response.data.data;
        }
      }
    } catch (error) {
      console.error('API failed, using mock data:', error);
      set({ error: error.message });
      toast.warning('Using demo data - API not available');
    }
    
    // Fallback to mock data
    const mockData = {
      activeFilms: 12,
      totalCustomers: 1234,
      monthlyRevenue: 45678000,
      occupancyRate: 78,
      customerSatisfaction: 92,
      topFilms: [
        { title: 'Spider-Man: No Way Home', total_bookings: 456, total_revenue: 22800000 },
        { title: 'The Batman', total_bookings: 389, total_revenue: 19450000 },
        { title: 'Dune', total_bookings: 234, total_revenue: 11700000 }
      ]
    };
    set({ summaryData: mockData, loading: false });
    return mockData;
  },

  toggleAPIMode: () => set((state) => ({ useRealAPI: !state.useRealAPI })),
  
  clearReports: () => set({ 
    financialData: null, 
    transactionData: null, 
    summaryData: null,
    error: null
  }),
}));

export default useReportStore;