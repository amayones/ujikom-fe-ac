import { create } from 'zustand';
import api from '../api';

const useOrderStore = create((set, get) => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,

    fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/orders');
            set({ orders: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch orders', loading: false });
        }
    },

    fetchOrderById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await api.get(`/orders/${id}`);
            set({ currentOrder: response.data.data, loading: false });
        } catch (error) {
            set({ error: error.message || 'Failed to fetch order', loading: false });
        }
    },

    createOrder: async (orderData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/orders', orderData);
            const newOrder = response.data.data;
            set(state => ({ 
                orders: [newOrder, ...state.orders], 
                currentOrder: newOrder,
                loading: false 
            }));
            return { success: true, data: newOrder };
        } catch (error) {
            const message = error.message || 'Failed to create order';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    processPayment: async (paymentData) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/payment/process', paymentData);
            return { success: true, data: response.data.data };
        } catch (error) {
            const message = error.message || 'Payment failed';
            set({ error: message, loading: false });
            return { success: false, message };
        }
    },

    clearError: () => set({ error: null }),
    clearCurrentOrder: () => set({ currentOrder: null })
}));

export default useOrderStore;