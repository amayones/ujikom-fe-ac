import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

// Booking store for seat selection and booking management
const useBookingStore = create((set, get) => ({
  selectedSeats: [],
  currentBooking: null,
  loading: false,

  toggleSeat: (seatNumber) => {
    const { selectedSeats } = get();
    const isSelected = selectedSeats.includes(seatNumber);
    
    if (isSelected) {
      set({ selectedSeats: selectedSeats.filter(seat => seat !== seatNumber) });
    } else {
      set({ selectedSeats: [...selectedSeats, seatNumber] });
    }
  },

  clearSelectedSeats: () => set({ selectedSeats: [] }),

  createBooking: async (scheduleId, paymentMethod = 'midtrans') => {
    try {
      const { selectedSeats } = get();
      if (selectedSeats.length === 0) {
        toast.error('Please select at least one seat');
        return { success: false };
      }

      if (selectedSeats.length > 10) {
        toast.error('Maximum 10 seats can be booked at once');
        return { success: false };
      }

      // Validate seat format
      const isValidSeat = (seat) => {
        if (typeof seat !== 'string' || seat.length < 2 || seat.length > 3) return false;
        const row = seat.charAt(0).toUpperCase();
        const col = parseInt(seat.slice(1));
        return ['A', 'B', 'C', 'D', 'E'].includes(row) && col >= 1 && col <= 10;
      };
      
      const invalidSeats = selectedSeats.filter(seat => !isValidSeat(seat));
      if (invalidSeats.length > 0) {
        toast.error(`Invalid seat format: ${invalidSeats.join(', ')}`);
        return { success: false };
      }

      set({ loading: true });
      const response = await axiosClient.post('/bookings', {
        schedule_id: parseInt(scheduleId),
        seats: selectedSeats,
        payment_method: paymentMethod
      });

      if (response.data.status === 'success') {
        set({ currentBooking: response.data.data.booking });
        get().clearSelectedSeats(); // Clear seats after successful booking
        toast.success(response.data.message || 'Booking created successfully');
        return { success: true, booking: response.data.data.booking };
      } else {
        toast.error(response.data.message || 'Failed to create booking');
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      console.error('Booking error:', error);
      let errorMessage = 'Failed to create booking';
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = Object.values(error.response.data.errors).flat();
        errorMessage = errors.join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  getBookings: async () => {
    try {
      set({ loading: true });
      const response = await axiosClient.get('/bookings');
      
      if (response.data.status === 'success') {
        return response.data.data.data || response.data.data;
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      set({ loading: true });
      const response = await axiosClient.patch(`/bookings/${bookingId}/cancel`);
      
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBookingStore;