import React, { useState } from 'react';
import { Receipt, Plus } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Receipt className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold">Pesan Tiket Offline</h1>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Pelanggan</label>
                            <input
                                type="text"
                                value={booking.customerName}
                                onChange={(e) => setBooking({...booking, customerName: e.target.value})}
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">No. Telepon</label>
                            <input
                                type="text"
                                value={booking.phone}
                                onChange={(e) => setBooking({...booking, phone: e.target.value})}
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Film</label>
                            <select
                                value={booking.movie}
                                onChange={(e) => setBooking({...booking, movie: e.target.value})}
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            >
                                <option value="">Pilih Film</option>
                                {movies.map(movie => (
                                    <option key={movie.id} value={movie.title}>{movie.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Jadwal</label>
                            <select
                                value={booking.schedule}
                                onChange={(e) => setBooking({...booking, schedule: e.target.value})}
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            >
                                <option value="">Pilih Jadwal</option>
                                <option value="14:00">14:00</option>
                                <option value="17:00">17:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                        </div>
                    </div>

                    <button className="mt-6 flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded font-semibold">
                        <Plus className="w-5 h-5" />
                        Buat Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
}