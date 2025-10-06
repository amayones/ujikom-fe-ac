import React, { useState, useEffect } from 'react';
import { cashierService } from '../../services';
import { filmService } from '../../services';
import { Plus, Ticket, Users, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

export default function Transaction() {
    const [films, setFilms] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {
        try {
            const data = await filmService.getFilms('play_now');
            setFilms(data);
        } catch (error) {
            console.error('Failed to fetch films:', error);
            // Mock data
            setFilms([
                { id: 1, title: 'Avengers: Endgame', genre: 'Action', duration: 181 },
                { id: 2, title: 'Oppenheimer', genre: 'Drama', duration: 180 }
            ]);
        }
    };

    const handleFilmSelect = async (filmId) => {
        setSelectedFilm(filmId);
        try {
            const schedulesData = await filmService.getSchedules(filmId);
            setSchedules(schedulesData);
        } catch (error) {
            console.error('Failed to fetch schedules:', error);
            // Mock data
            setSchedules([
                { id: 1, time: '14:00', date: '2024-01-15', studio: { name: 'Studio 1' }, price: { price: 50000 } },
                { id: 2, time: '17:00', date: '2024-01-15', studio: { name: 'Studio 2' }, price: { price: 55000 } }
            ]);
        }
    };

    const handleSeatSelect = (seatNumber) => {
        setSelectedSeats(prev => {
            const isSelected = prev.includes(seatNumber);
            if (isSelected) {
                return prev.filter(s => s !== seatNumber);
            } else {
                return [...prev, seatNumber];
            }
        });
    };

    const handleBooking = async () => {
        if (!selectedSchedule || selectedSeats.length === 0 || !customerInfo.name) {
            alert('Mohon lengkapi semua data');
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                schedule_id: selectedSchedule.id,
                seats: selectedSeats,
                customer: customerInfo,
                payment_method: paymentMethod,
                total_amount: selectedSeats.length * selectedSchedule.price.price
            };

            await cashierService.bookOfflineTicket(bookingData);
            alert('Tiket berhasil dipesan!');
            
            // Reset form
            setSelectedFilm('');
            setSelectedSchedule(null);
            setSelectedSeats([]);
            setCustomerInfo({ name: '', phone: '', email: '' });
        } catch (error) {
            console.error('Failed to book ticket:', error);
            alert('Gagal memesan tiket');
        } finally {
            setLoading(false);
        }
    };

    const selectedFilmData = films.find(f => f.id.toString() === selectedFilm);
    const totalPrice = selectedSchedule && selectedSeats.length > 0 
        ? selectedSeats.length * selectedSchedule.price.price 
        : 0;

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Transaksi Offline</h1>
                    <p className="text-gray-400">Penjualan tiket untuk pelanggan walk-in</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Film Selection */}
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Ticket className="w-5 h-5" />
                                Pilih Film
                            </h2>
                            <select
                                value={selectedFilm}
                                onChange={(e) => handleFilmSelect(e.target.value)}
                                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Pilih Film</option>
                                {films.map(film => (
                                    <option key={film.id} value={film.id}>
                                        {film.title} ({film.genre}) - {film.duration} min
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Schedule Selection */}
                        {selectedFilm && (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Pilih Jadwal
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {schedules.map(schedule => (
                                        <div
                                            key={schedule.id}
                                            onClick={() => setSelectedSchedule(schedule)}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                                                selectedSchedule?.id === schedule.id
                                                    ? 'border-red-500 bg-red-500/20'
                                                    : 'border-gray-600 hover:border-gray-500'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-semibold">{schedule.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{schedule.studio.name}</span>
                                            </div>
                                            <div className="text-green-400 font-bold">
                                                Rp {schedule.price.price.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Seat Selection */}
                        {selectedSchedule && (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Pilih Kursi
                                </h2>
                                
                                {/* Screen */}
                                <div className="bg-gray-600 h-2 rounded-full mb-6 relative">
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
                                        LAYAR
                                    </div>
                                </div>

                                {/* Seats Grid */}
                                <div className="grid grid-cols-10 gap-2 mb-4">
                                    {Array.from({ length: 50 }, (_, i) => {
                                        const seatNumber = i + 1;
                                        const isSelected = selectedSeats.includes(seatNumber);
                                        
                                        return (
                                            <button
                                                key={seatNumber}
                                                onClick={() => handleSeatSelect(seatNumber)}
                                                className={`w-8 h-8 rounded text-xs font-bold transition ${
                                                    isSelected
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
                                </div>
                            </div>
                        )}

                        {/* Customer Info */}
                        {selectedSeats.length > 0 && (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Informasi Pelanggan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                                        <input
                                            type="text"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">No HP</label>
                                        <input
                                            type="tel"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={customerInfo.email}
                                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-800 rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
                        
                        {selectedFilmData && (
                            <div className="mb-4">
                                <h3 className="font-semibold">{selectedFilmData.title}</h3>
                                <p className="text-sm text-gray-400">{selectedFilmData.genre}</p>
                            </div>
                        )}

                        {selectedSchedule && (
                            <div className="mb-4 text-sm">
                                <p>Tanggal: {selectedSchedule.date}</p>
                                <p>Waktu: {selectedSchedule.time}</p>
                                <p>Studio: {selectedSchedule.studio.name}</p>
                            </div>
                        )}

                        {selectedSeats.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-400">Kursi:</p>
                                <p className="font-semibold">{selectedSeats.join(', ')}</p>
                            </div>
                        )}

                        {totalPrice > 0 && (
                            <>
                                <div className="border-t border-gray-700 pt-4 mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span>Jumlah Tiket:</span>
                                        <span>{selectedSeats.length}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Harga per tiket:</span>
                                        <span>Rp {selectedSchedule.price.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-green-400">
                                        <span>Total:</span>
                                        <span>Rp {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Metode Pembayaran</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="cash">Tunai</option>
                                        <option value="debit">Kartu Debit</option>
                                        <option value="credit">Kartu Kredit</option>
                                        <option value="qris">QRIS</option>
                                    </select>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    disabled={loading || !customerInfo.name}
                                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                                >
                                    <CreditCard className="w-5 h-5" />
                                    {loading ? 'Memproses...' : 'Proses Pembayaran'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}