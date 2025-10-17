import React from 'react';
import { Scan, CheckCircle } from 'lucide-react';

export default function ProcessOnline() {
    const onlineOrders = [
        { id: 'ORD-001', customer: 'Alice Johnson', movie: 'Spider-Man', seats: ['A1', 'A2'], status: 'pending' },
        { id: 'ORD-002', customer: 'Bob Wilson', movie: 'Batman', seats: ['B3'], status: 'confirmed' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Scan className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold">Proses Tiket Online</h1>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
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
    );
}