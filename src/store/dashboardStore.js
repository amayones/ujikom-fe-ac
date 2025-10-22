import { create } from 'zustand';
import api from '../api.js';

const useDashboardStore = create((set) => ({
  stats: {
    totalMovies: 0,
    totalCustomers: 0,
    totalSchedules: 0,
    totalRevenue: 0
  },
  recentMovies: [],
  recentCustomers: [],
  upcomingSchedules: [],
  loading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ loading: true, error: null });
    try {
      const [moviesRes, customersRes, schedulesRes] = await Promise.all([
        api.get('/admin/films'),
        api.get('/admin/users'),
        api.get('/admin/schedules')
      ]);

      const movies = moviesRes.data.data || [];
      const customers = customersRes.data.data || [];
      const schedules = schedulesRes.data.data || [];

      const stats = {
        totalMovies: movies.length,
        totalCustomers: customers.filter(u => u.role === 'customer').length,
        totalSchedules: schedules.length,
        totalRevenue: Math.floor(Math.random() * 50000000)
      };

      const recentMovies = movies.slice(0, 5);
      const recentCustomers = customers.filter(u => u.role === 'customer').slice(0, 5);
      const upcomingSchedules = schedules.slice(0, 5);

      set({
        stats,
        recentMovies,
        recentCustomers,
        upcomingSchedules,
        loading: false
      });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch dashboard data', loading: false });
    }
  },

  clearError: () => set({ error: null })
}));

export default useDashboardStore;