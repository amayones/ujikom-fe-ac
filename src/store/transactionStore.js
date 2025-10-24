import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

// Transaction store for payment and transaction management
const useTransactionStore = create((set, get) => ({
  transactions: [],
  currentTransaction: null,
  loading: false,

  createTransaction: async (bookingId) => {
    try {
      set({ loading: true });
      const response = await axiosClient.post('/transactions', {
        booking_id: parseInt(bookingId)
      });

      if (response.data.status === 'success') {
        const transaction = {
          ...response.data.data,
          order_id: response.data.data.midtrans_order_id || response.data.data.order_id
        };
        set({ currentTransaction: transaction });
        toast.success(response.data.message || 'Transaction created successfully');
        return { success: true, transaction };
      }
    } catch (error) {
      console.error('Transaction creation failed:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create transaction';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  updatePaymentStatus: async (transactionId, status) => {
    try {
      set({ loading: true });
      const response = await axiosClient.patch(`/transactions/${transactionId}/status`, {
        payment_status: status
      });

      if (response.data.status === 'success') {
        toast.success('Payment status updated successfully');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update payment status';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ loading: false });
    }
  },

  getTransactions: async () => {
    try {
      set({ loading: true });
      const response = await axiosClient.get('/transactions');
      
      if (response.data.status === 'success') {
        set({ transactions: response.data.data.data || response.data.data });
        return response.data.data.data || response.data.data;
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentTransaction: () => set({ currentTransaction: null }),
}));

export default useTransactionStore;