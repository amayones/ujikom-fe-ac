import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFilmStore from '../../store/filmStore';
import useScheduleStore from '../../store/scheduleStore';
import useSeatStore from '../../store/seatStore';
import useOrderStore from '../../store/orderStore';

export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchFilmById, currentFilm: movie, loading: filmLoading } = useFilmStore();
    const { fetchSchedules, schedules, loading: scheduleLoading } = useScheduleStore();
    const { fetchSeats, seats, loading: seatLoading } = useSeatStore();
    const { createOrder } = useOrderStore();
    
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

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



    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const handleProceedToPayment = async () => {
        if (!selectedSchedule || selectedSeats.length === 0) {
            alert('Please select schedule and seats');
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
            alert(result.message || 'Failed to create order');
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
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Book Tickets - {movie.title}</h1>
                
                {/* Movie Info */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="flex gap-4">
                        <img src={movie.poster || 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image'} alt={movie.title} className="w-24 h-36 object-cover rounded" />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-400 mb-1">Genre: {movie.genre}</p>
                            <p className="text-gray-400 mb-1">Duration: {movie.duration} min</p>
                            <p className="text-red-500 font-semibold">Price: Rp 50,000</p>
                        </div>
                    </div>
                </div>

                {/* Schedule Selection */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Select Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filmSchedules.map(schedule => (
                            <div 
                                key={schedule.id}
                                onClick={() => setSelectedSchedule(schedule)}
                                className={`p-4 rounded-lg border cursor-pointer transition ${
                                    selectedSchedule?.id === schedule.id 
                                        ? 'border-red-500 bg-red-900/20' 
                                        : 'border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                <p className="font-semibold">{schedule.time}</p>
                                <p className="text-gray-400">{schedule.studio?.name || 'Studio'}</p>
                                <p className="text-green-400">Available</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seat Selection */}
                {selectedSchedule && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h3 className="text-xl font-semibold mb-4">Select Seats</h3>
                        
                        {/* Screen */}
                        <div className="bg-gray-600 text-center py-2 mb-6 rounded">
                            SCREEN
                        </div>
                        
                        {/* Seats Grid */}
                        <div className="grid grid-cols-10 gap-2 mb-4">
                            {seats.map(seat => (
                                <button
                                    key={seat.id}
                                    onClick={() => seat.status === 'available' && handleSeatClick(seat.id)}
                                    disabled={seat.status !== 'available'}
                                    className={`w-8 h-8 text-xs rounded ${
                                        seat.status !== 'available' 
                                            ? 'bg-red-600 cursor-not-allowed' 
                                            : selectedSeats.includes(seat.id)
                                                ? 'bg-green-600'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                >
                                    {seat.seat_code}
                                </button>
                            ))}
                        </div>
                        
                        {/* Legend */}
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-600 rounded"></div>
                                <span>Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-600 rounded"></div>
                                <span>Occupied</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Summary */}
                {selectedSeats.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                        <div className="space-y-2 mb-4">
                            <p>Movie: {movie.title}</p>
                            <p>Schedule: {selectedSchedule?.time} - {selectedSchedule?.studio}</p>
                            <p>Seats: {selectedSeats.join(', ')}</p>
                            <p className="text-xl font-bold text-red-500">
                                Total: Rp {totalPrice.toLocaleString()}
                            </p>
                        </div>
                        <button 
                            onClick={handleProceedToPayment}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}