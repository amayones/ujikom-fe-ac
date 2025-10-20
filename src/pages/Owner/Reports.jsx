import React from 'react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';

export default function Reports() {
    const reportTypes = [
        { title: 'Laporan Harian', period: 'Daily', icon: Calendar, color: 'bg-blue-500' },
        { title: 'Laporan Mingguan', period: 'Weekly', icon: BarChart3, color: 'bg-green-500' },
        { title: 'Laporan Bulanan', period: 'Monthly', icon: TrendingUp, color: 'bg-purple-500' },
        { title: 'Laporan Tahunan', period: 'Yearly', icon: BarChart3, color: 'bg-red-500' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Laporan Keuangan</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {reportTypes.map((report, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <div className={`${report.color} p-3 rounded-lg mb-4 w-fit`}>
                                <report.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                            <p className="text-gray-400 mb-4">Generate {report.period.toLowerCase()} reports</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                        <p className="text-gray-400">Chart akan ditampilkan di sini</p>
                    </div>
                </div>
            </div>
        </div>
    );
}