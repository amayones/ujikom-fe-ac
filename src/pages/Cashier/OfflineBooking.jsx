import React, { useState } from 'react';
import { Receipt, Plus, User, Film, Clock } from 'lucide-react';

export default function OfflineBooking() {
    const [booking, setBooking] = useState({
        customerName: '',
        phone: '',
        movie: '',
        schedule: '',
        seats: []
    });

    const movies = [
        { id: 1, title: 'Spider-Man: No Way Home', schedules: ['14:00', '17:00', '20:00'] },
        { id: 2, title: 'The Batman', schedules: ['15:30', '18:30', '21:30'] }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-amber-500/20 rounded-xl">
                            <Receipt className="w-8 h-8 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Pesan Tiket Offline</h1>
                            <p className="text-gray-600 mt-1">Buat pesanan untuk pelanggan walk-in</p>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nama Pelanggan
                            </label>
                            <input
                                type="text"
                                value={booking.customerName}
                                onChange={(e) => setBooking({...booking, customerName: e.target.value})}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                placeholder="Masukkan nama pelanggan"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                <Receipt className="w-4 h-4" />
                                No. Telepon
                            </label>
                            <input
                                type="text"
                                value={booking.phone}
                                onChange={(e) => setBooking({...booking, phone: e.target.value})}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                <Film className="w-4 h-4" />
                                Film
                            </label>
                            <select
                                value={booking.movie}
                                onChange={(e) => setBooking({...booking, movie: e.target.value})}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                            >
                                <option value="">Pilih Film</option>
                                {movies.map(movie => (
                                    <option key={movie.id} value={movie.title}>{movie.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Jadwal
                            </label>
                            <select
                                value={booking.schedule}
                                onChange={(e) => setBooking({...booking, schedule: e.target.value})}
                                className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                            >
                                <option value="">Pilih Jadwal</option>
                                <option value="14:00">14:00</option>
                                <option value="17:00">17:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                        </div>
                    </div>

                    <button className="mt-8 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Plus className="w-5 h-5" />
                        Buat Pesanan
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}