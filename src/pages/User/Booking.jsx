import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFilmStore from '../../store/filmStore';
import useScheduleStore from '../../store/scheduleStore';
import useSeatStore from '../../store/seatStore';
import useOrderStore from '../../store/orderStore';
import Toast from '../../components/Toast';

export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchFilmById, currentFilm: movie, loading: filmLoading } = useFilmStore();
    const { fetchSchedules, schedules, loading: scheduleLoading } = useScheduleStore();
    const { fetchSeats, seats } = useSeatStore();
    const { createOrder } = useOrderStore();
    
    const [selectedStudio, setSelectedStudio] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [toast, setToast] = useState({ show: false, type: 'error', message: '' });

    useEffect(() => {
        fetchFilmById(id);
        fetchSchedules();
    }, [id, fetchFilmById, fetchSchedules]);

    useEffect(() => {
        if (selectedSchedule) {
            fetchSeats(selectedSchedule.studio_id);
        }
    }, [selectedSchedule, fetchSeats]);

    const filmSchedules = schedules.filter(schedule => schedule.film_id === parseInt(id));
    
    // Get unique studios from schedules with proper data
    const studioMap = new Map();
    filmSchedules.forEach(schedule => {
        if (schedule.studio && !studioMap.has(schedule.studio.id)) {
            studioMap.set(schedule.studio.id, schedule.studio);
        }
    });
    const studios = Array.from(studioMap.values());
    
    const studioSchedules = selectedStudio ? filmSchedules.filter(s => s.studio_id === selectedStudio.id) : [];



    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleProceedToPayment = async () => {
        if (!selectedSchedule || selectedSeats.length === 0) {
            setToast({ show: true, type: 'warning', message: 'Please select schedule and seats' });
            return;
        }

        const orderData = {
            schedule_id: selectedSchedule.id,
            seats: selectedSeats,
            total_amount: selectedSeats.length * 50000 // Base price
        };

        const result = await createOrder(orderData);
        if (result.success) {
            navigate('/payment', { state: { orderId: result.data.id } });
        } else {
            setToast({ show: true, type: 'error', message: result.message || 'Failed to create order' });
        }
    };

    const totalPrice = selectedSeats.length * 50000;

    if (filmLoading || scheduleLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p>Movie not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 text-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">Cinema Booking</h1>
                    <p className="text-xl text-rose-700">{movie.title}</p>
                </div>
                
                {/* Movie Info */}
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-rose-200 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="relative group">
                            <img src={movie.poster || 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image'} alt={movie.title} className="w-32 h-48 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-4 text-rose-600">{movie.title}</h2>
                            <div className="space-y-2">
                                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                                    Genre: {movie.genre}
                                </p>
                                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                                    Duration: {movie.duration} min
                                </p>
                                <p className="text-2xl font-bold text-rose-600 flex items-center justify-center md:justify-start gap-2">
                                    <span className="w-2 h-2 bg-rose-400 rounded-full"></span>
                                    Price: Rp 50,000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Studio Selection */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-rose-300/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                        <h3 className="text-2xl font-bold text-rose-600">Choose Your Studio</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {studios.map(studio => (
                            <div 
                                key={studio.id}
                                onClick={() => {
                                    setSelectedStudio(studio);
                                    setSelectedSchedule(null);
                                    setSelectedSeats([]);
                                }}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                    selectedStudio?.id === studio.id 
                                        ? 'bg-gradient-to-br from-rose-500/30 to-pink-500/30 border-2 border-rose-400 shadow-lg shadow-rose-400/25' 
                                        : 'bg-white/40 border border-rose-200 hover:bg-white/60'
                                }`}
                            >
                                <div className="text-center">
                                    <p className="font-bold text-xl text-gray-800 mb-2">{studio.name}</p>
                                    <p className="text-gray-600 mb-3">Capacity: {studio.capacity} seats</p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-400/30">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 text-sm font-medium">Available</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schedule Selection */}
                {selectedStudio && (
                    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-pink-300/50 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                            <h3 className="text-2xl font-bold text-pink-600">Select Showtime - {selectedStudio.name}</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {studioSchedules.map(schedule => (
                                <div 
                                    key={schedule.id}
                                    onClick={() => {
                                        setSelectedSchedule(schedule);
                                        setSelectedSeats([]);
                                    }}
                                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 text-center transform hover:scale-105 ${
                                        selectedSchedule?.id === schedule.id 
                                            ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 shadow-lg shadow-purple-400/25' 
                                            : 'bg-white/40 border border-pink-200 hover:bg-white/60'
                                    }`}
                                >
                                    <p className="font-bold text-lg text-gray-800">{schedule.time}</p>
                                    <p className="text-gray-600 text-sm mb-2">{schedule.date}</p>
                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                        <span className="text-green-600 text-xs">Available</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Seat Selection */}
                {selectedSchedule && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-purple-300/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">3</div>
                            <h3 className="text-2xl font-bold text-purple-700">Choose Your Seats</h3>
                        </div>
                        <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30">
                            <p className="text-center text-purple-700 font-medium">
                                🎬 {selectedStudio.name} • {selectedSchedule.time} • {selectedSchedule.date}
                            </p>
                        </div>
                        
                        {/* Screen */}
                        <div className="relative mb-8">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-center py-3 rounded-2xl font-bold text-lg shadow-lg">
                                🎬 SCREEN 🎬
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-yellow-400"></div>
                        </div>
                        
                        {/* Seats Grid */}
                        <div className="grid grid-cols-10 gap-3 mb-6 justify-center">
                            {seats.map(seat => (
                                <button
                                    key={seat.id}
                                    onClick={() => seat.status === 'available' && handleSeatClick(seat.id)}
                                    disabled={seat.status !== 'available'}
                                    className={`w-10 h-10 text-xs rounded-xl font-bold transition-all duration-300 transform hover:scale-110 ${
                                        seat.status !== 'available' 
                                            ? 'bg-red-500 cursor-not-allowed text-white shadow-lg' 
                                            : selectedSeats.includes(seat.id)
                                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-400/50 scale-110'
                                                : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600 shadow-md'
                                    }`}
                                >
                                    {seat.seat_code}
                                </button>
                            ))}
                        </div>
                        
                        {/* Legend */}
                        <div className="flex justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl"></div>
                                <span className="text-gray-700">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl"></div>
                                <span className="text-green-700">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-red-500 rounded-xl"></div>
                                <span className="text-red-700">Occupied</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Summary */}
                {selectedSeats.length > 0 && (
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-300/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                            <h3 className="text-2xl font-bold text-green-700">Booking Summary</h3>
                        </div>
                        <div className="bg-white/20 rounded-2xl p-6 mb-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Movie:</span>
                                <span className="font-semibold text-gray-800">{movie.title}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Studio:</span>
                                <span className="font-semibold text-gray-800">{selectedStudio?.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Schedule:</span>
                                <span className="font-semibold text-gray-800">{selectedSchedule?.date} at {selectedSchedule?.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Seats:</span>
                                <span className="font-semibold text-gray-800">{selectedSeats.join(', ')}</span>
                            </div>
                            <div className="border-t border-gray-400 pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-green-700">Total:</span>
                                    <span className="text-2xl font-bold text-green-800">
                                        Rp {totalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handleProceedToPayment}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-rose-500/25"
                        >
                            🎫 Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
            
            {/* Toast */}
            <Toast
                type={toast.type}
                message={toast.message}
                isVisible={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}