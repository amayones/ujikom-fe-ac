import { create } from 'zustand';

const useBookingStore = create((set, get) => ({
    // Booking flow state
    selectedStudio: null,
    selectedSchedule: null,
    selectedSeats: [],
    selectedMethod: '',
    
    // Video player state
    featuredMovie: null,
    isPlaying: false,
    isMuted: true,
    
    // Profile editing state
    isEditing: false,
    profile: {
        name: '',
        email: '',
        phone: '',
        address: ''
    },
    editData: {},
    
    // Actions
    setSelectedStudio: (studio) => set({ 
        selectedStudio: studio,
        selectedSchedule: null,
        selectedSeats: []
    }),
    
    setSelectedSchedule: (schedule) => set({ 
        selectedSchedule: schedule,
        selectedSeats: []
    }),
    
    setSelectedSeats: (seats) => set({ selectedSeats: seats }),
    
    toggleSeat: (seatId) => set((state) => ({
        selectedSeats: state.selectedSeats.includes(seatId)
            ? state.selectedSeats.filter(id => id !== seatId)
            : [...state.selectedSeats, seatId]
    })),
    
    setSelectedMethod: (method) => set({ selectedMethod: method }),
    
    // Video player actions
    setFeaturedMovie: (movie) => set({ featuredMovie: movie }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setIsMuted: (muted) => set({ isMuted: muted }),
    
    // Profile actions
    setIsEditing: (editing) => set({ isEditing: editing }),
    setProfile: (profile) => set({ profile, editData: { ...profile } }),
    setEditData: (data) => set({ editData: data }),
    
    saveProfile: () => {
        const { editData } = get();
        set({ profile: { ...editData }, isEditing: false });
    },
    
    cancelEdit: () => {
        const { profile } = get();
        set({ editData: { ...profile }, isEditing: false });
    },
    
    // Reset booking flow
    resetBooking: () => set({
        selectedStudio: null,
        selectedSchedule: null,
        selectedSeats: [],
        selectedMethod: ''
    }),
}));

export default useBookingStore;