import React, { useState, useEffect } from 'react';
import { ownerService } from '../../services';
import { BarChart3, TrendingUp, Calendar, Download, Filter, Eye } from 'lucide-react';
import OwnerLayout from '../../components/Layout/OwnerLayout';

export default function Report() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [reportType, setReportType] = useState('all');

    useEffect(() => {
        fetchReports();
    }, [selectedPeriod, reportType]);

    const fetchReports = async () => {
        try {
            const data = await ownerService.getMonthlyReport();
            setReports(data.monthly_report || []);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            // Mock data
            setReports([
                { month: 1, year: 2024, total_income: 125000000, total_expense: 85000000, profit: 40000000, tickets_sold: 2500 },
                { month: 2, year: 2024, total_income: 135000000, total_expense: 90000000, profit: 45000000, tickets_sold: 2800 },
                { month: 3, year: 2024, total_income: 145000000, total_expense: 95000000, profit: 50000000, tickets_sold: 3200 }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const totalRevenue = reports.reduce((sum, report) => sum + (report.total_income || 0), 0);
    const totalProfit = reports.reduce((sum, report) => sum + (report.profit || 0), 0);
    const totalTickets = reports.reduce((sum, report) => sum + (report.tickets_sold || 0), 0);

    return (
        <OwnerLayout>
            <div className="text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Laporan Bisnis</h1>
                            <p className="text-gray-400">Analisis performa dan tren bisnis</p>
                        </div>
                        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition">
                            <Download className="w-5 h-5" />
                            Export PDF
                        </button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-lg bg-blue-600/20">
                                    <BarChart3 className="w-6 h-6 text-blue-400" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-400">Rp {(totalRevenue / 1000000).toFixed(1)}M</p>
                                <p className="text-sm text-gray-400">Total Pendapatan</p>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-lg bg-green-600/20">
                                    <TrendingUp className="w-6 h-6 text-green-400" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-400">Rp {(totalProfit / 1000000).toFixed(1)}M</p>
                                <p className="text-sm text-gray-400">Total Keuntungan</p>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-lg bg-purple-600/20">
                                    <Eye className="w-6 h-6 text-purple-400" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-400">{totalTickets.toLocaleString()}</p>
                                <p className="text-sm text-gray-400">Total Tiket Terjual</p>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-lg bg-yellow-600/20">
                                    <Calendar className="w-6 h-6 text-yellow-400" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-400">{reports.length}</p>
                                <p className="text-sm text-gray-400">Periode Laporan</p>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="week">Mingguan</option>
                                <option value="month">Bulanan</option>
                                <option value="quarter">Kuartalan</option>
                                <option value="year">Tahunan</option>
                            </select>
                        </div>
                        <div className="relative">
                            <BarChart3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={reportType}
                                onChange={(e) => setReportType(e.target.value)}
                                className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">Semua Laporan</option>
                                <option value="revenue">Pendapatan</option>
                                <option value="profit">Keuntungan</option>
                                <option value="tickets">Penjualan Tiket</option>
                            </select>
                        </div>
                    </div>

                    {/* Monthly Reports Table */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-bold mb-4">Laporan Bulanan</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="pb-3 text-gray-400">Periode</th>
                                        <th className="pb-3 text-gray-400">Pendapatan</th>
                                        <th className="pb-3 text-gray-400">Pengeluaran</th>
                                        <th className="pb-3 text-gray-400">Keuntungan</th>
                                        <th className="pb-3 text-gray-400">Tiket Terjual</th>
                                        <th className="pb-3 text-gray-400">Margin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((report, index) => {
                                        const margin = ((report.profit / report.total_income) * 100).toFixed(1);
                                        return (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="py-4 font-semibold">
                                                    {monthNames[report.month - 1]} {report.year}
                                                </td>
                                                <td className="py-4 text-green-400">
                                                    Rp {(report.total_income / 1000000).toFixed(1)}M
                                                </td>
                                                <td className="py-4 text-red-400">
                                                    Rp {(report.total_expense / 1000000).toFixed(1)}M
                                                </td>
                                                <td className="py-4 text-blue-400">
                                                    Rp {(report.profit / 1000000).toFixed(1)}M
                                                </td>
                                                <td className="py-4">
                                                    {report.tickets_sold?.toLocaleString() || 0}
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded text-xs ${
                                                        margin > 30 ? 'bg-green-600/20 text-green-400' :
                                                        margin > 20 ? 'bg-yellow-600/20 text-yellow-400' :
                                                        'bg-red-600/20 text-red-400'
                                                    }`}>
                                                        {margin}%
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Insight Performa</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-700 rounded-lg">
                                    <h3 className="font-semibold text-green-400 mb-2">📈 Tren Positif</h3>
                                    <p className="text-sm text-gray-300">
                                        Pendapatan meningkat 15% dibanding bulan lalu dengan margin keuntungan yang stabil di 35%.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-700 rounded-lg">
                                    <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Perhatian</h3>
                                    <p className="text-sm text-gray-300">
                                        Biaya operasional naik 8% perlu evaluasi untuk menjaga profitabilitas.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-700 rounded-lg">
                                    <h3 className="font-semibold text-blue-400 mb-2">💡 Rekomendasi</h3>
                                    <p className="text-sm text-gray-300">
                                        Fokus pada film blockbuster dan optimasi jadwal tayang untuk maksimalkan okupansi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Target vs Realisasi</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Pendapatan Bulanan</span>
                                        <span>85% dari target</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Penjualan Tiket</span>
                                        <span>92% dari target</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '92%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Margin Keuntungan</span>
                                        <span>78% dari target</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-purple-400 h-2 rounded-full" style={{width: '78%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OwnerLayout>
    );
}