import { create } from 'zustand';
import api from '../api';

const usePaymentStore = create((set) => ({
    paymentMethods: [],
    selectedMethod: null,
    loading: false,
    error: null,

    fetchPaymentMethods: async (type = 'both') => {
        set({ loading: true, error: null });
        try {
            const response = await api.get('/payment-methods');
            const methods = response.data.data.filter(method => 
                method.type === type || method.type === 'both'
            );
            set({ paymentMethods: methods, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch payment methods', loading: false });
        }
    },

    selectPaymentMethod: (method) => {
        set({ selectedMethod: method });
    },

    calculateTotal: (baseAmount, method) => {
        if (!method) return baseAmount;
        
        const feeFixed = method.fee_fixed || 0;
        const feePercentage = method.fee_percentage || 0;
        const percentageFee = baseAmount * (feePercentage / 100);
        
        return baseAmount + feeFixed + percentageFee;
    },

    clearError: () => set({ error: null })
}));

export default usePaymentStore;