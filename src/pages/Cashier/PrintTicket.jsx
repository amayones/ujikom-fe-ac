import React from 'react';
import { Printer, Search } from 'lucide-react';
import Layout from '../../components/Layout';

export default function PrintTicket() {
    const tickets = [
        { id: 'TKT-001', customer: 'John Doe', movie: 'Spider-Man', seat: 'A1', status: 'paid' },
        { id: 'TKT-002', customer: 'Jane Smith', movie: 'Batman', seat: 'B2', status: 'pending' }
    ];

    return (
        <Layout>
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900 min-h-screen -m-4 md:-m-6 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-amber-500/20 rounded-xl">
                            <Printer className="w-8 h-8 text-amber-600" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Cetak Tiket</h1>
                            <p className="text-gray-600 mt-1">Kelola dan cetak tiket pelanggan</p>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 shadow-2xl">
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari tiket berdasarkan ID atau nama..."
                                className="w-full bg-gray-50 text-gray-900 pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                            <Search className="w-5 h-5" />
                            Cari
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-amber-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">ID Tiket</th>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Pelanggan</th>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Film</th>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Kursi</th>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Status</th>
                                    <th className="px-4 py-3 text-left text-gray-800 font-semibold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.id} className="border-b border-gray-200 hover:bg-amber-50">
                                        <td className="px-4 py-3">{ticket.id}</td>
                                        <td className="px-4 py-3">{ticket.customer}</td>
                                        <td className="px-4 py-3">{ticket.movie}</td>
                                        <td className="px-4 py-3">{ticket.seat}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs text-white ${
                                                ticket.status === 'paid' ? 'bg-green-600' : 'bg-yellow-600'
                                            }`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm">
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
        </Layout>
    );
}