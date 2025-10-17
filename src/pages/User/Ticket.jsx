import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QrCode, Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function Ticket() {
    const { id } = useParams();
    const location = useLocation();
    const { order, film, schedule, seats, totalPrice } = location.state || {};
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        if (order && film && schedule && seats) {
            setTicketData({ order, film, schedule, seats, totalPrice });
        }
    }, [id, order, film, schedule, seats, totalPrice]);



    if (!ticketData && !id) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Tiket tidak ditemukan</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-2xl mx-auto">
                {/* Success Message */}
                <div className="bg-green-600 rounded-lg p-6 mb-6 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-green-100">Tiket Anda telah berhasil dipesan</p>
                </div>

                {/* Ticket */}
                <div className="bg-white text-black rounded-lg overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="bg-red-600 text-white p-6 text-center">
                        <h2 className="text-2xl font-bold">ABSOLUTE CINEMA</h2>
                        <p className="text-red-100">E-TICKET</p>
                    </div>

                    {/* Movie Info */}
                    <div className="p-6 border-b-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-20 h-28 bg-gray-200 rounded flex items-center justify-center">
                                {film?.poster ? (
                                    <img src={film.poster} alt={film.judul} className="w-full h-full object-cover rounded" />
                                ) : (
                                    <span className="text-4xl">🎬</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-800">{film?.judul || 'Film Title'}</h3>
                                <p className="text-gray-600">{film?.genre || 'Genre'} • {film?.durasi || '120'} min</p>
                                <p className="text-sm text-gray-500 mt-2">Order ID: #{order?.id || id}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-gray-500">Tanggal</p>
                                    <p className="font-semibold">{schedule?.tanggal || new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-gray-500">Waktu</p>
                                    <p className="font-semibold">{schedule?.jam || '19:00'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-gray-500">Studio</p>
                                    <p className="font-semibold">{schedule?.studio?.nama || 'Studio 1'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-red-600" />
                                <div>
                                    <p className="text-gray-500">Kursi</p>
                                    <p className="font-semibold">{seats?.map(s => s.nomor_kursi).join(', ') || '1, 2'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="p-6 text-center">
                        <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                            <QrCode className="w-32 h-32 text-gray-800 mx-auto" />
                            <p className="text-xs text-gray-500 mt-2">Scan QR Code di bioskop</p>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-800 mb-2">
                                Total: Rp {(totalPrice || 100000).toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                                Tunjukkan tiket ini kepada petugas bioskop
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-100 p-4 text-center text-xs text-gray-500">
                        <p>Tiket ini berlaku untuk 1 kali penayangan</p>
                        <p>Harap datang 15 menit sebelum film dimulai</p>
                    </div>
                </div>



                {/* Important Notes */}
                <div className="bg-yellow-600 rounded-lg p-4 mt-6">
                    <h4 className="font-bold mb-2">Penting:</h4>
                    <ul className="text-sm space-y-1">
                        <li>• Tunjukkan QR code ini kepada petugas</li>
                        <li>• Datang 15 menit sebelum film dimulai</li>
                        <li>• Tiket tidak dapat dikembalikan</li>
                        <li>• Simpan tiket hingga selesai menonton</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}