import { create } from 'zustand';
import api from '../api.js';

const useSeatStore = create((set) => ({
  seats: [],
  loading: false,
  error: null,

  fetchSeats: async (studioId = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/seats/studio/${studioId}`);
      set({ seats: response.data?.data || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch seats', loading: false });
    }
  },

  updateSeat: async (seatId, seatData) => {
    set({ loading: true, error: null });
    try {
      const response = await api.put(`/admin/seats/${seatId}`, seatData);
      const updatedSeat = response.data?.data;
      if (updatedSeat) {
        set(state => ({
          seats: state.seats.map(seat => 
            seat.id === seatId ? updatedSeat : seat
          ),
          loading: false
        }));
      } else {
        set(state => ({
          seats: state.seats.map(seat => 
            seat.id === seatId ? { ...seat, ...seatData } : seat
          ),
          loading: false
        }));
      }
      return updatedSeat || { ...seatData, id: seatId };
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update seat', loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useSeatStore;