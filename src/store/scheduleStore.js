import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

// Schedule store for admin schedule management
const useScheduleStore = create((set, get) => ({
  schedules: [],
  availableStudios: [],
  loading: false,

  getSchedules: async (filmId = null, date = null) => {
    try {
      set({ loading: true });
      let url = '/schedules';
      const params = new URLSearchParams();
      
      if (filmId) params.append('film_id', filmId);
      if (date) params.append('date', date);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axiosClient.get(url);
      
      if (response.data.status === 'success') {
        set({ schedules: response.data.data });
        return response.data.data;
      }
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  getAvailableStudios: async (filmId, date) => {
    try {
      set({ loading: true });
      const response = await axiosClient.get('/schedules/available-studios', {
        params: { film_id: filmId, date }
      });
      
      if (response.data.status === 'success') {
        set({ availableStudios: response.data.data });
        return response.data.data;
      }
    } catch (error) {
      console.error('Failed to fetch available studios:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  createSchedule: async (scheduleData) => {
    try {
      set({ loading: true });
      const response = await axiosClient.post('/schedules', scheduleData);
      
      if (response.data.status === 'success') {
        toast.success(response.data.message || 'Schedule created successfully');
        // Refresh schedules
        await get().getSchedules();
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create schedule';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  updateSchedule: async (id, scheduleData) => {
    try {
      set({ loading: true });
      const response = await axiosClient.put(`/schedules/${id}`, scheduleData);
      
      if (response.data.status === 'success') {
        toast.success(response.data.message || 'Schedule updated successfully');
        // Refresh schedules
        await get().getSchedules();
        return { success: true, data: response.data.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update schedule';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  deleteSchedule: async (id) => {
    try {
      set({ loading: true });
      const response = await axiosClient.delete(`/schedules/${id}`);
      
      if (response.data.status === 'success') {
        toast.success(response.data.message || 'Schedule deleted successfully');
        // Refresh schedules
        await get().getSchedules();
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete schedule';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  clearAvailableStudios: () => set({ availableStudios: [] }),
}));

export default useScheduleStore;