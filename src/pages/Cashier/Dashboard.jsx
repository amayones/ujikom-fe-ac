import React, { useState, useEffect } from 'react';
import { cashierService } from '../../services/cashierService';
import { Ticket, Users, Clock, CheckCircle, AlertCircle, Printer } from 'lucide-react';
import CashierLayout from '../../components/Layout/CashierLayout';

export default function CashierDashboard() {
    const [stats, setStats] = useState({
        todayTickets: 0,
        pendingOrders: 0,
        processedOrders: 0,
        totalRevenue: 0
    });
    const [onlineOrders, setOnlineOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const ordersData = await cashierService.getOnlineOrders();
            setOnlineOrders(ordersData);
            
            setStats({
                todayTickets: 45,
                pendingOrders: ordersData.filter(o => o.status === 'pending').length,
                processedOrders: ordersData.filter(o => o.status === 'processed').length,
                totalRevenue: 2500000
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            setOnlineOrders([
                { id: 1, customer: 'John Doe', film: 'Avengers: Endgame', seats: 'A1, A2', amount: 100000, status: 'pending' },
                { id: 2, customer: 'Jane Smith', film: 'Oppenheimer', seats: 'B5', amount: 50000, status: 'pending' },
                { id: 3, customer: 'Bob Johnson', film: 'Barbie', seats: 'C3, C4', amount: 100000, status: 'processed' }
            ]);
            setStats({
                todayTickets: 45,
                pendingOrders: 2,
                processedOrders: 1,
                totalRevenue: 2500000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProcessOrder = async (orderId, status) => {
        try {
            await cashierService.processOnlineTicket(orderId, status);
            await fetchDashboardData();
        } catch (error) {
            console.error('Failed to process order:', error);
            alert('Gagal memproses pesanan');
        }
    };

    const handlePrintTicket = async (orderId) => {
        try {
            await cashierService.printTicket(orderId);
            alert('Tiket berhasil dicetak');
        } catch (error) {
            console.error('Failed to print ticket:', error);
            alert('Gagal mencetak tiket');
        }
    };

    const statCards = [
        { title: 'Tiket Hari Ini', value: stats.todayTickets, icon: Ticket, color: 'blue' },
        { title: 'Pesanan Pending', value: stats.pendingOrders, icon: Clock, color: 'yellow' },
        { title: 'Pesanan Diproses', value: stats.processedOrders, icon: CheckCircle, color: 'green' },
        { title: 'Pendapatan Hari Ini', value: `Rp ${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: Users, color: 'purple' }
    ];

    return (
        <CashierLayout>
            <div className="text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Kasir Dashboard</h1>
                        <p className="text-gray-400">Kelola penjualan tiket dan pesanan online</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="bg-gray-800 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg bg-${stat.color}-600/20`}>
                                            <IconComponent className={`w-6 h-6 text-${stat.color}-400`} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-gray-400">{stat.title}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Pesanan Online</h2>
                            <div className="space-y-4">
                                {onlineOrders.slice(0, 5).map(order => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                                                <Ticket className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{order.customer}</p>
                                                <p className="text-sm text-gray-400">{order.film} - Kursi {order.seats}</p>
                                                <p className="text-sm text-green-400">Rp {order.amount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'pending' 
                                                    ? 'bg-yellow-600/20 text-yellow-400'
                                                    : 'bg-green-600/20 text-green-400'
                                            }`}>
                                                {order.status === 'pending' ? 'Pending' : 'Processed'}
                                            </span>
                                            {order.status === 'pending' ? (
                                                <button
                                                    onClick={() => handleProcessOrder(order.id, 'processed')}
                                                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition"
                                                >
                                                    Proses
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handlePrintTicket(order.id)}
                                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs transition flex items-center gap-1"
                                                >
                                                    <Printer className="w-3 h-3" />
                                                    Print
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Aksi Cepat</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-center">
                                    <Ticket className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Jual Tiket Offline</p>
                                </button>
                                <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition text-center">
                                    <Printer className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Cetak Tiket</p>
                                </button>
                                <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-center">
                                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Proses Pesanan</p>
                                </button>
                                <button className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition text-center">
                                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm font-medium">Bantuan</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 mt-8">
                        <h2 className="text-xl font-bold mb-4">Ringkasan Penjualan Hari Ini</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-blue-400">45</p>
                                <p className="text-sm text-gray-400">Total Tiket Terjual</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-400">Rp 2.5M</p>
                                <p className="text-sm text-gray-400">Total Pendapatan</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-purple-400">12</p>
                                <p className="text-sm text-gray-400">Film Berbeda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CashierLayout>
    );
}