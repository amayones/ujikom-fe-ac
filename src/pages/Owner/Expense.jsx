import React from 'react';
import { TrendingDown, Calendar, CreditCard } from 'lucide-react';

export default function Expense() {
    const expenseData = [
        { period: 'Hari Ini', amount: 'Rp 500,000', icon: Calendar, color: 'bg-red-500' },
        { period: 'Minggu Ini', amount: 'Rp 3,200,000', icon: TrendingDown, color: 'bg-orange-500' },
        { period: 'Bulan Ini', amount: 'Rp 12,800,000', icon: CreditCard, color: 'bg-yellow-500' },
        { period: 'Tahun Ini', amount: 'Rp 156,000,000', icon: TrendingDown, color: 'bg-pink-500' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Laporan Pengeluaran</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {expenseData.map((item, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <div className={`${item.color} p-3 rounded-lg mb-4 w-fit`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-gray-400 text-sm">{item.period}</p>
                            <p className="text-2xl font-bold">{item.amount}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Grafik Pengeluaran</h3>
                    <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                        <p className="text-gray-400">Chart pengeluaran akan ditampilkan di sini</p>
                    </div>
                </div>
            </div>
        </div>
    );
}