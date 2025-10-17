import React from 'react';
import { Scan, CheckCircle } from 'lucide-react';

export default function ProcessOnline() {
    const onlineOrders = [
        { id: 'ORD-001', customer: 'Alice Johnson', movie: 'Spider-Man', seats: ['A1', 'A2'], status: 'pending' },
        { id: 'ORD-002', customer: 'Bob Wilson', movie: 'Batman', seats: ['B3'], status: 'confirmed' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900">
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-amber-500/20 rounded-xl">
                            <Scan className="w-8 h-8 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Proses Tiket Online</h1>
                            <p className="text-gray-600 mt-1">Konfirmasi dan validasi pesanan online</p>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID Pesanan</th>
                                    <th className="px-4 py-3 text-left">Pelanggan</th>
                                    <th className="px-4 py-3 text-left">Film</th>
                                    <th className="px-4 py-3 text-left">Kursi</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {onlineOrders.map(order => (
                                    <tr key={order.id} className="border-b border-gray-700">
                                        <td className="px-4 py-3">{order.id}</td>
                                        <td className="px-4 py-3">{order.customer}</td>
                                        <td className="px-4 py-3">{order.movie}</td>
                                        <td className="px-4 py-3">{order.seats.join(', ')}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                order.status === 'confirmed' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {order.status === 'pending' ? (
                                                <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Konfirmasi
                                                </button>
                                            ) : (
                                                <span className="text-green-400 text-sm">Selesai</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}