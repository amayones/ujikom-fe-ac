import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filmService } from '../../services';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [film, setFilm] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [filmData, schedulesData] = await Promise.all([
                    filmService.getFilmDetail(id),
                    filmService.getSchedules(id)
                ]);
                setFilm(filmData);
                setSchedules(schedulesData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleScheduleSelect = async (schedule) => {
        setSelectedSchedule(schedule);
        try {
            const seatsData = await filmService.getAvailableSeats(schedule.id);
            setSeats(seatsData);
        } catch (error) {
            console.error('Failed to fetch seats:', error);
        }
    };

    const handleSeatSelect = (seat) => {
        if (seat.status === 'booked') return;
        
        setSelectedSeats(prev => {
            const isSelected = prev.find(s => s.id === seat.id);
            if (isSelected) {
                return prev.filter(s => s.id !== seat.id);
            } else {
                if (prev.length >= 6) {
                    alert('Maximum 6 seats can be selected');
                    return prev;
                }
                return [...prev, seat];
            }
        });
    };

    const handleProceedToPayment = () => {
        if (selectedSeats.length === 0 || !selectedSchedule) return;
        
        navigate('/payment', {
            state: {
                film,
                schedule: selectedSchedule,
                seats: selectedSeats,
                totalPrice: selectedSeats.length * (selectedSchedule.price?.harga || 50000)
            }
        });
    };

    if (loading) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Film Info */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-28 bg-gray-700 rounded flex items-center justify-center">
                            {film?.poster ? (
                                <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover rounded" />
                            ) : (
                                '🎬'
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{film?.title || film?.judul}</h1>
                            <p className="text-gray-400">{film?.genre} • {film?.duration || film?.durasi} min</p>
                        </div>
                    </div>
                </div>

                {/* Schedule Selection */}
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" /> Pilih Jadwal
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schedules.map(schedule => (
                            <div
                                key={schedule.id}
                                onClick={() => handleScheduleSelect(schedule)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                                    selectedSchedule?.id === schedule.id
                                        ? 'border-red-500 bg-red-500/20'
                                        : 'border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-semibold">{schedule.jam}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.studio?.nama || 'Studio 1'}</span>
                                </div>
                                <div className="text-green-400 font-bold">
                                    Rp {(schedule.price?.harga || 50000).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seat Selection */}
                {selectedSchedule && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" /> Pilih Kursi
                        </h2>
                        
                        {/* Screen */}
                        <div className="bg-gray-600 h-2 rounded-full mb-8 relative">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
                                LAYAR
                            </div>
                        </div>

                        {/* Seats Grid */}
                        <div className="grid grid-cols-10 gap-2 mb-6">
                            {Array.from({ length: 80 }, (_, i) => {
                                const seatNumber = i + 1;
                                const seat = seats.find(s => s.seat_number === seatNumber || s.nomor_kursi === seatNumber) || {
                                    id: `temp-${seatNumber}`,
                                    seat_number: seatNumber,
                                    nomor_kursi: seatNumber,
                                    status: 'available'
                                };
                                const isSelected = selectedSeats.find(s => s.id === seat.id);
                                
                                return (
                                    <button
                                        key={seatNumber}
                                        onClick={() => handleSeatSelect(seat)}
                                        disabled={seat.status === 'booked'}
                                        className={`w-8 h-8 rounded text-xs font-bold transition ${
                                            seat.status === 'booked'
                                                ? 'bg-red-600 cursor-not-allowed'
                                                : isSelected
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                    >
                                        {seatNumber}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-600 rounded"></div>
                                <span>Tersedia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded"></div>
                                <span>Dipilih</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-600 rounded"></div>
                                <span>Terisi</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary & Proceed */}
                {selectedSeats.length > 0 && (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold">Ringkasan Pemesanan</h3>
                                <p className="text-gray-400">
                                    {selectedSeats.length} kursi: {selectedSeats.map(s => s.nomor_kursi).join(', ')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-400">
                                    Rp {(selectedSeats.length * (selectedSchedule.price?.harga || 50000)).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleProceedToPayment}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition"
                        >
                            Lanjut ke Pembayaran
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}