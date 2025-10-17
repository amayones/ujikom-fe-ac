import React from 'react';
import { Receipt, Download, Share } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Receipt className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-bold">Invoice</h1>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="border-b border-gray-700 pb-4 mb-4">
                        <h2 className="text-xl font-semibold">Invoice #{invoice.id}</h2>
                        <p className="text-gray-400">Tanggal: {invoice.date}</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-400">Film:</label>
                            <p className="font-semibold">{invoice.movie}</p>
                        </div>
                        <div>
                            <label className="text-gray-400">Jadwal:</label>
                            <p className="font-semibold">{invoice.schedule}</p>
                        </div>
                        <div>
                            <label className="text-gray-400">Kursi:</label>
                            <p className="font-semibold">{invoice.seats.join(', ')}</p>
                        </div>
                        <div className="border-t border-gray-700 pt-4">
                            <div className="flex justify-between">
                                <span>Total:</span>
                                <span className="font-bold text-xl">Rp {invoice.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                            <Share className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}