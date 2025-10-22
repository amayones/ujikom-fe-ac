import { create } from 'zustand';

const useSidebarStore = create((set) => ({
    collapsed: false,
    setCollapsed: (collapsed) => set({ collapsed })
}));

export default useSidebarStore;