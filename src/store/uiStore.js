import { create } from 'zustand';

const useUIStore = create((set) => ({
    // Modal states
    showModal: false,
    modalType: null,
    modalData: null,
    
    // Toast notifications
    toast: { show: false, type: 'success', message: '' },
    
    // Confirm modal
    confirmModal: { show: false, title: '', message: '', onConfirm: null },
    
    // Loading states
    loading: false,
    
    // Search and filters
    searchTerm: '',
    
    // Form states
    isEditing: false,
    editingItem: null,
    
    // Actions
    setModal: (show, type = null, data = null) => set({ showModal: show, modalType: type, modalData: data }),
    
    setToast: (toast) => set({ toast }),
    hideToast: () => set({ toast: { show: false, type: 'success', message: '' } }),
    
    setConfirmModal: (confirmModal) => set({ confirmModal }),
    hideConfirmModal: () => set({ confirmModal: { show: false, title: '', message: '', onConfirm: null } }),
    
    setLoading: (loading) => set({ loading }),
    
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    
    setEditing: (isEditing, item = null) => set({ isEditing, editingItem: item }),
    
    // Reset all UI state
    resetUI: () => set({
        showModal: false,
        modalType: null,
        modalData: null,
        toast: { show: false, type: 'success', message: '' },
        confirmModal: { show: false, title: '', message: '', onConfirm: null },
        loading: false,
        searchTerm: '',
        isEditing: false,
        editingItem: null,
    }),
}));

export default useUIStore;