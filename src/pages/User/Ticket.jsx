import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { QrCode, Calendar, Clock, MapPin, Users } from 'lucide-react';
import useOrderStore from '../../store/orderStore';

export default function Ticket() {
    const { id } = useParams();
    const location = useLocation();
    const { order, film, schedule, seats, totalPrice } = location.state || {};
    const { fetchOrderById, currentOrder, loading } = useOrderStore();
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        if (id && !order) {
            fetchOrderById(id);
        } else if (order && film && schedule && seats) {
            setTicketData({ order, film, schedule, seats, totalPrice });
        }
    }, [id, order, film, schedule, seats, totalPrice, fetchOrderById]);

    useEffect(() => {
        if (currentOrder && !ticketData) {
            setTicketData({
                order: currentOrder,
                film: { 
                    judul: currentOrder.movie_title,
                    genre: 'Action',
                    durasi: 120,
                    poster: null
                },
                schedule: {
                    tanggal: currentOrder.schedule_date,
                    jam: currentOrder.schedule_time,
                    studio: { nama: currentOrder.studio || 'Studio 1' }
                },
                seats: Array.isArray(currentOrder.seats) ? currentOrder.seats.map(s => ({ nomor_kursi: s })) : [{ nomor_kursi: currentOrder.seats }],
                totalPrice: currentOrder.total_amount
            });
        }
    }, [currentOrder, ticketData]);



    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white flex items-center justify-center">
                <div className="text-xl">Loading ticket...</div>
            </div>
        );
    }

    if (!ticketData && !id) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-rose-400 mb-4">Tiket tidak ditemukan</p>
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                {/* Success Message */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-6 text-center shadow-lg">
                    <div className="text-4xl mb-2">🎉</div>
                    <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-green-50">Tiket Anda telah berhasil dipesan</p>
                </div>

                {/* Ticket */}
                <div className="bg-white text-black rounded-2xl overflow-hidden shadow-2xl border border-rose-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-6 text-center">
                        <h2 className="text-2xl font-bold">ABSOLUTE CINEMA</h2>
                        <p className="text-rose-100">E-TICKET</p>
                    </div>

                    {/* Movie Info */}
                    <div className="p-6 border-b-2 border-dashed border-rose-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-20 h-28 bg-rose-100 rounded flex items-center justify-center">
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
                                <Calendar className="w-4 h-4 text-rose-600" />
                                <div>
                                    <p className="text-rose-500">Tanggal</p>
                                    <p className="font-semibold">{schedule?.tanggal || new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-rose-600" />
                                <div>
                                    <p className="text-rose-500">Waktu</p>
                                    <p className="font-semibold">{schedule?.jam || '19:00'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-600" />
                                <div>
                                    <p className="text-rose-500">Studio</p>
                                    <p className="font-semibold">{schedule?.studio?.nama || 'Studio 1'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-rose-600" />
                                <div>
                                    <p className="text-rose-500">Kursi</p>
                                    <p className="font-semibold">{seats?.map(s => s.nomor_kursi).join(', ') || '1, 2'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="p-6 text-center">
                        <div className="bg-rose-50 p-4 rounded-lg inline-block mb-4 border border-rose-200">
                            <QrCode className="w-32 h-32 text-rose-800 mx-auto" />
                            <p className="text-xs text-rose-600 mt-2">Scan QR Code di bioskop</p>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-800 mb-2">
                                Total: Rp {(totalPrice || 100000).toLocaleString()}
                            </p>
                            <p className="text-xs text-rose-600">
                                Tunjukkan tiket ini kepada petugas bioskop
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-rose-50 p-4 text-center text-xs text-rose-600 border-t border-rose-200">
                        <p>Tiket ini berlaku untuk 1 kali penayangan</p>
                        <p>Harap datang 15 menit sebelum film dimulai</p>
                    </div>
                </div>



                {/* Important Notes */}
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-4 mt-6 shadow-lg">
                    <h4 className="font-bold mb-2">Penting:</h4>
                    <ul className="text-sm space-y-1 text-amber-50">
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