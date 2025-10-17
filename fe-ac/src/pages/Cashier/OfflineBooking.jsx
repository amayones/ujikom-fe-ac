import React, { useState } from 'react';
import { Search, Plus, Printer } from 'lucide-react';

export default function OfflineBooking() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const movies = [
        { id: 1, title: "Spider-Man: No Way Home", genre: "Action, Adventure", price: 50000, status: "now_playing" },
        { id: 2, title: "The Batman", genre: "Action, Crime", price: 55000, status: "now_playing" }
    ];
    const schedules = [
        { id: 1, movieId: 1, time: "10:00", studio: "Studio 1" },
        { id: 2, movieId: 1, time: "13:00", studio: "Studio 2" },
        { id: 3, movieId: 2, time: "16:00", studio: "Studio 1" }
    ];
    const nowPlayingMovies = movies.filter(movie => movie.status === 'now_playing');
    const movieSchedules = selectedMovie ? schedules.filter(s => s.movieId === selectedMovie.id) : [];

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
                    isAvailable: Math.random() > 0.3
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

    const handleBooking = () => {
        if (!selectedMovie || !selectedSchedule || selectedSeats.length === 0 || !customerInfo.name) {
            alert('Please complete all booking information');
            return;
        }

        const bookingCode = 'OFF' + Date.now().toString().slice(-6);
        const total = selectedSeats.length * selectedMovie.price;

        alert(`Booking created successfully!\nBooking Code: ${bookingCode}\nTotal: Rp ${total.toLocaleString()}`);
        
        // Reset form
        setSelectedMovie(null);
        setSelectedSchedule(null);
        setSelectedSeats([]);
        setCustomerInfo({ name: '', phone: '', email: '' });
    };

    const handlePrintTicket = () => {
        if (!selectedMovie || !selectedSchedule || selectedSeats.length === 0) {
            alert('Please complete booking first');
            return;
        }
        
        alert('Printing ticket...');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Offline Booking</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Movie Selection */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Select Movie</h2>
                        <div className="space-y-4">
                            {nowPlayingMovies.map(movie => (
                                <div
                                    key={movie.id}
                                    onClick={() => setSelectedMovie(movie)}
                                    className={`p-4 rounded-lg border cursor-pointer transition ${
                                        selectedMovie?.id === movie.id
                                            ? 'border-red-500 bg-red-900/20'
                                            : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                >
                                    <h3 className="font-semibold">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm">{movie.genre}</p>
                                    <p className="text-red-500 font-semibold">Rp {movie.price.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule & Seats */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Schedule & Seats</h2>
                        
                        {selectedMovie && (
                            <>
                                {/* Schedule Selection */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Select Schedule</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {movieSchedules.map(schedule => (
                                            <button
                                                key={schedule.id}
                                                onClick={() => setSelectedSchedule(schedule)}
                                                className={`p-2 rounded text-sm ${
                                                    selectedSchedule?.id === schedule.id
                                                        ? 'bg-red-600'
                                                        : 'bg-gray-700 hover:bg-gray-600'
                                                }`}
                                            >
                                                {schedule.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Seat Selection */}
                                {selectedSchedule && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Select Seats</h3>
                                        <div className="bg-gray-600 text-center py-1 mb-4 rounded text-sm">SCREEN</div>
                                        <div className="grid grid-cols-10 gap-1 mb-4">
                                            {seats.map(seat => (
                                                <button
                                                    key={seat.id}
                                                    onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
                                                    disabled={!seat.isAvailable}
                                                    className={`w-6 h-6 text-xs rounded ${
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
                                        <div className="text-xs text-gray-400">
                                            Selected: {selectedSeats.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Customer Info & Summary */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                        
                        <div className="space-y-4 mb-6">
                            <input
                                type="text"
                                placeholder="Customer Name *"
                                value={customerInfo.name}
                                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                            />
                            <input
                                type="email"
                                placeholder="Email (optional)"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                            />
                        </div>

                        {/* Booking Summary */}
                        {selectedMovie && selectedSchedule && selectedSeats.length > 0 && (
                            <div className="bg-gray-700 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold mb-2">Booking Summary</h3>
                                <div className="space-y-1 text-sm">
                                    <p>Movie: {selectedMovie.title}</p>
                                    <p>Time: {selectedSchedule.time}</p>
                                    <p>Seats: {selectedSeats.join(', ')}</p>
                                    <p>Quantity: {selectedSeats.length} tickets</p>
                                    <p className="text-red-500 font-semibold">
                                        Total: Rp {(selectedSeats.length * selectedMovie.price).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleBooking}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
                            >
                                Create Booking
                            </button>
                            <button
                                onClick={handlePrintTicket}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                            >
                                <Printer className="w-4 h-4" />
                                Print Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}