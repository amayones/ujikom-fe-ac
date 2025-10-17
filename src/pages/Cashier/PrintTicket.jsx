import React from 'react';
import { Printer, Search } from 'lucide-react';

export default function PrintTicket() {
    const tickets = [
        { id: 'TKT-001', customer: 'John Doe', movie: 'Spider-Man', seat: 'A1', status: 'paid' },
        { id: 'TKT-002', customer: 'Jane Smith', movie: 'Batman', seat: 'B2', status: 'pending' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Printer className="w-8 h-8 text-yellow-500" />
                    <h1 className="text-3xl font-bold">Cetak Tiket</h1>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Cari tiket..."
                                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                            <Search className="w-4 h-4" />
                            Cari
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID Tiket</th>
                                    <th className="px-4 py-3 text-left">Pelanggan</th>
                                    <th className="px-4 py-3 text-left">Film</th>
                                    <th className="px-4 py-3 text-left">Kursi</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.id} className="border-b border-gray-700">
                                        <td className="px-4 py-3">{ticket.id}</td>
                                        <td className="px-4 py-3">{ticket.customer}</td>
                                        <td className="px-4 py-3">{ticket.movie}</td>
                                        <td className="px-4 py-3">{ticket.seat}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                ticket.status === 'paid' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm">
                                                <Printer className="w-3 h-3" />
                                                Cetak
                                            </button>
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