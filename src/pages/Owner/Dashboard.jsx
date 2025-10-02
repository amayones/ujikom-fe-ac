import React, { useState, useEffect } from 'react';
import { ownerService } from '../../services/ownerService';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, Calendar } from 'lucide-react';

export default function OwnerDashboard() {
    const [financialData, setFinancialData] = useState({
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        monthlyGrowth: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFinancialData();
    }, []);

    const fetchFinancialData = async () => {
        try {
            const data = await ownerService.getFinancialReport();
            setFinancialData(data);
        } catch (error) {
            console.error('Failed to fetch financial data:', error);
            // Mock data
            setFinancialData({
                totalRevenue: 250000000,
                totalExpenses: 180000000,
                netProfit: 70000000,
                monthlyGrowth: 15.5
            });
        } finally {
            setLoading(false);
        }
    };

    const kpiCards = [
        {
            title: 'Total Pendapatan',
            value: `Rp ${(financialData.totalRevenue / 1000000).toFixed(1)}M`,
            icon: DollarSign,
            color: 'green',
            change: '+12.5% dari bulan lalu'
        },
        {
            title: 'Total Pengeluaran',
            value: `Rp ${(financialData.totalExpenses / 1000000).toFixed(1)}M`,
            icon: TrendingDown,
            color: 'red',
            change: '+8.2% dari bulan lalu'
        },
        {
            title: 'Keuntungan Bersih',
            value: `Rp ${(financialData.netProfit / 1000000).toFixed(1)}M`,
            icon: TrendingUp,
            color: 'blue',
            change: `+${financialData.monthlyGrowth}% dari bulan lalu`
        },
        {
            title: 'Margin Keuntungan',
            value: `${((financialData.netProfit / financialData.totalRevenue) * 100).toFixed(1)}%`,
            icon: BarChart3,
            color: 'purple',
            change: 'Target: 30%'
        }
    ];

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
                    <p className="text-gray-400">Laporan keuangan dan performa bisnis</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {kpiCards.map((kpi, index) => {
                        const IconComponent = kpi.icon;
                        return (
                            <div key={index} className="bg-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-${kpi.color}-600/20`}>
                                        <IconComponent className={`w-6 h-6 text-${kpi.color}-400`} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <p className="text-2xl font-bold">{kpi.value}</p>
                                    <p className="text-sm text-gray-400">{kpi.title}</p>
                                </div>
                                <p className="text-xs text-green-400">{kpi.change}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Revenue Chart */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Pendapatan Bulanan
                        </h2>
                        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                            <p className="text-gray-400">Chart pendapatan akan ditampilkan di sini</p>
                        </div>
                    </div>

                    {/* Expense Breakdown */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Breakdown Pengeluaran
                        </h2>
                        <div className="space-y-4">
                            {[
                                { category: 'Gaji Karyawan', amount: 80000000, percentage: 44 },
                                { category: 'Sewa Gedung', amount: 45000000, percentage: 25 },
                                { category: 'Utilitas', amount: 25000000, percentage: 14 },
                                { category: 'Marketing', amount: 20000000, percentage: 11 },
                                { category: 'Lainnya', amount: 10000000, percentage: 6 }
                            ].map((expense, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full bg-red-${(index + 3) * 100}`}></div>
                                        <span className="text-sm">{expense.category}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">Rp {(expense.amount / 1000000).toFixed(1)}M</p>
                                        <p className="text-xs text-gray-400">{expense.percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Transaksi Terbaru
                    </h2>
                    <div className="space-y-4">
                        {[
                            { type: 'income', description: 'Penjualan Tiket - Avengers', amount: 2500000, date: '2024-01-15' },
                            { type: 'expense', description: 'Pembayaran Listrik', amount: -850000, date: '2024-01-14' },
                            { type: 'income', description: 'Penjualan Tiket - Oppenheimer', amount: 1800000, date: '2024-01-14' },
                            { type: 'expense', description: 'Gaji Karyawan', amount: -15000000, date: '2024-01-13' }
                        ].map((transaction, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        transaction.type === 'income' ? 'bg-green-600/20' : 'bg-red-600/20'
                                    }`}>
                                        {transaction.type === 'income' ? 
                                            <TrendingUp className="w-5 h-5 text-green-400" /> :
                                            <TrendingDown className="w-5 h-5 text-red-400" />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-semibold">{transaction.description}</p>
                                        <p className="text-sm text-gray-400">{transaction.date}</p>
                                    </div>
                                </div>
                                <p className={`font-bold ${
                                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {transaction.type === 'income' ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}