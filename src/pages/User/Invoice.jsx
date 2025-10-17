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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <Receipt className="w-8 h-8 text-red-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Invoice</h1>
                            <p className="text-gray-400 mt-1">Detail pembayaran tiket</p>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="border-b border-gray-700 pb-4 mb-4">
                        <h2 className="text-xl font-semibold">Invoice #{invoice.id}</h2>
                        <p className="text-gray-400">Tanggal: {invoice.date}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Receipt className="w-5 h-5 text-red-400" />
                            <div>
                                <label className="text-gray-400 text-sm">Film:</label>
                                <p className="font-semibold text-lg">{invoice.movie}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-red-400" />
                            <div>
                                <label className="text-gray-400 text-sm">Jadwal:</label>
                                <p className="font-semibold">{invoice.schedule}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-red-400" />
                            <div>
                                <label className="text-gray-400 text-sm">Kursi:</label>
                                <p className="font-semibold">{invoice.seats.join(', ')}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-red-400" />
                                    <span className="text-lg">Total:</span>
                                </div>
                                <span className="font-bold text-2xl text-red-400">Rp {invoice.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                            <Download className="w-5 h-5" />
                            Download
                        </button>
                        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
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