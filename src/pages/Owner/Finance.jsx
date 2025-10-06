import React, { useState, useEffect } from 'react';
import { ownerService } from '../../services';
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react';

export default function Finance() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [dateRange, setDateRange] = useState('month');
    const [formData, setFormData] = useState({
        type: 'expense',
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await ownerService.getFinancialReport();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            // Mock data
            setTransactions([
                { id: 1, type: 'income', description: 'Penjualan Tiket Film A', amount: 5000000, category: 'Penjualan', date: '2024-01-15' },
                { id: 2, type: 'expense', description: 'Gaji Karyawan', amount: 15000000, category: 'Operasional', date: '2024-01-14' },
                { id: 3, type: 'income', description: 'Penjualan Snack', amount: 2000000, category: 'F&B', date: '2024-01-13' },
                { id: 4, type: 'expense', description: 'Listrik & Air', amount: 3000000, category: 'Utilitas', date: '2024-01-12' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await ownerService.addExpense(formData);
            await fetchTransactions();
            setShowModal(false);
            setFormData({
                type: 'expense',
                description: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Failed to add transaction:', error);
            alert('Gagal menambah transaksi');
        } finally {
            setLoading(false);
        }
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (filterType === 'all') return true;
        return transaction.type === filterType;
    });

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Keuangan</h1>
                        <p className="text-gray-400">Kelola pemasukan dan pengeluaran</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Transaksi
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-green-600/20">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-400">Rp {(totalIncome / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-gray-400">Total Pemasukan</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-red-600/20">
                                <TrendingDown className="w-6 h-6 text-red-400" />
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-red-400">Rp {(totalExpense / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-gray-400">Total Pengeluaran</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-blue-600/20">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-400">Rp {((totalIncome - totalExpense) / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-gray-400">Keuntungan Bersih</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="all">Semua Transaksi</option>
                            <option value="income">Pemasukan</option>
                            <option value="expense">Pengeluaran</option>
                        </select>
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="week">Minggu Ini</option>
                            <option value="month">Bulan Ini</option>
                            <option value="year">Tahun Ini</option>
                        </select>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Riwayat Transaksi</h2>
                    <div className="space-y-4">
                        {filteredTransactions.map(transaction => (
                            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        transaction.type === 'income' ? 'bg-green-600/20' : 'bg-red-600/20'
                                    }`}>
                                        {transaction.type === 'income' ? 
                                            <TrendingUp className="w-6 h-6 text-green-400" /> :
                                            <TrendingDown className="w-6 h-6 text-red-400" />
                                        }
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{transaction.description}</h3>
                                        <p className="text-sm text-gray-400">{transaction.category} • {transaction.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`text-lg font-bold ${
                                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Tambah Transaksi</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tipe</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="income">Pemasukan</option>
                                        <option value="expense">Pengeluaran</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Deskripsi</label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Jumlah</label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        <option value="Penjualan">Penjualan</option>
                                        <option value="F&B">F&B</option>
                                        <option value="Operasional">Operasional</option>
                                        <option value="Utilitas">Utilitas</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition"
                                    >
                                        {loading ? 'Menyimpan...' : 'Tambah'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}