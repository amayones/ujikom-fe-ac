import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Booking() {
    const { id } = useParams();
    const movies = [
        { id: 1, title: "Spider-Man: No Way Home", genre: "Action, Adventure", duration: "148 min", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Spider-Man", price: 50000 },
        { id: 2, title: "The Batman", genre: "Action, Crime", duration: "176 min", poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Batman", price: 55000 }
    ];
    const allSchedules = [
        { id: 1, movieId: 1, time: "10:00", studio: "Studio 1", availableSeats: 45 },
        { id: 2, movieId: 1, time: "13:00", studio: "Studio 2", availableSeats: 32 },
        { id: 3, movieId: 2, time: "16:00", studio: "Studio 1", availableSeats: 28 }
    ];
    const movie = movies.find(m => m.id === parseInt(id));
    const schedules = allSchedules.filter(s => s.movieId === parseInt(id));
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const generateSeats = () => {
        const rows = ['A', 'B', 'C', 'D', 'E'];
        const seatsPerRow = 10;
        const seats = [];
        
        rows.forEach(row => {
            for (let i = 1; i <= seatsPerRow; i++) {
                seats.push({
                    id: `${row}${i}`,
                    row,
                    number: i,
                    isAvailable: Math.random() > 0.3 // 70% available
                });
            }
        });
        return seats;
    };

    const seats = generateSeats();

    const handleSeatClick = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const totalPrice = selectedSeats.length * (movie?.price || 0);

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
                        <img src={movie.poster} alt={movie.title} className="w-24 h-36 object-cover rounded" />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-400 mb-1">Genre: {movie.genre}</p>
                            <p className="text-gray-400 mb-1">Duration: {movie.duration}</p>
                            <p className="text-red-500 font-semibold">Price: Rp {movie.price.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Schedule Selection */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Select Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schedules.map(schedule => (
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
                                <p className="text-gray-400">{schedule.studio}</p>
                                <p className="text-green-400">{schedule.availableSeats} seats available</p>
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
                                    onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
                                    disabled={!seat.isAvailable}
                                    className={`w-8 h-8 text-xs rounded ${
                                        !seat.isAvailable 
                                            ? 'bg-red-600 cursor-not-allowed' 
                                            : selectedSeats.includes(seat.id)
                                                ? 'bg-green-600'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                    }`}
                                >
                                    {seat.id}
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
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold">
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}