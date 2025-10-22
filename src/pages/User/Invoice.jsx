import React from 'react';
import { Receipt, Download, Share, Calendar, MapPin, CreditCard } from 'lucide-react';

export default function Invoice() {
    const invoice = {
        id: 'INV-2024-001',
        date: '2024-01-15',
        movie: 'Spider-Man: No Way Home',
        schedule: '2024-01-15 19:30',
        seats: ['A1', 'A2'],
        price: 110000,
        total: 110000
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-red-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-rose-500/20 rounded-xl">
                            <Receipt className="w-8 h-8 text-rose-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Invoice</h1>
                            <p className="text-gray-400 mt-1">Detail pembayaran tiket</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-rose-300/30 shadow-2xl">
                    <div className="border-b border-rose-300/30 pb-4 mb-4">
                        <h2 className="text-xl font-semibold">Invoice #{invoice.id}</h2>
                        <p className="text-rose-200">Tanggal: {invoice.date}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Receipt className="w-5 h-5 text-rose-400" />
                            <div>
                                <label className="text-rose-200 text-sm">Film:</label>
                                <p className="font-semibold text-lg">{invoice.movie}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-rose-400" />
                            <div>
                                <label className="text-rose-200 text-sm">Jadwal:</label>
                                <p className="font-semibold">{invoice.schedule}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-rose-400" />
                            <div>
                                <label className="text-rose-200 text-sm">Kursi:</label>
                                <p className="font-semibold">{invoice.seats.join(', ')}</p>
                            </div>
                        </div>
                        <div className="border-t border-rose-300/30 pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-rose-400" />
                                    <span className="text-lg">Total:</span>
                                </div>
                                <span className="font-bold text-2xl text-rose-400">Rp {invoice.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                            <Download className="w-5 h-5" />
                            Download
                        </button>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                            <Share className="w-5 h-5" />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}