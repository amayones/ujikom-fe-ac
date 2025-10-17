import React from 'react';
import { Ticket, CreditCard, Users, Clock } from 'lucide-react';

export default function CashierDashboard() {
    const todayStats = [
        { title: 'Tickets Sold', value: '45', icon: Ticket, color: 'bg-blue-500' },
        { title: 'Total Sales', value: 'Rp 2.25M', icon: CreditCard, color: 'bg-green-500' },
        { title: 'Customers', value: '38', icon: Users, color: 'bg-purple-500' },
        { title: 'Avg. Time', value: '3.2 min', icon: Clock, color: 'bg-orange-500' }
    ];

    const recentTransactions = [
        { id: 'TXN001', movie: 'Spider-Man', seats: 'A1, A2', amount: 'Rp 100,000', time: '14:30' },
        { id: 'TXN002', movie: 'Batman', seats: 'B5', amount: 'Rp 55,000', time: '14:25' },
        { id: 'TXN003', movie: 'Doctor Strange', seats: 'C3, C4, C5', amount: 'Rp 180,000', time: '14:20' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Cashier Dashboard</h1>
                
                {/* Today's Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {todayStats.map((stat, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.title}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">New Transaction</h3>
                        <p className="text-gray-400 mb-4">Process new ticket purchase</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
                            New Sale
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Scan Ticket</h3>
                        <p className="text-gray-400 mb-4">Validate customer tickets</p>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                            Scan QR Code
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Daily Report</h3>
                        <p className="text-gray-400 mb-4">View today's summary</p>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full">
                            View Report
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-2">Transaction ID</th>
                                    <th className="text-left py-2">Movie</th>
                                    <th className="text-left py-2">Seats</th>
                                    <th className="text-left py-2">Amount</th>
                                    <th className="text-left py-2">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((transaction, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="py-2">{transaction.id}</td>
                                        <td className="py-2">{transaction.movie}</td>
                                        <td className="py-2">{transaction.seats}</td>
                                        <td className="py-2 text-green-400">{transaction.amount}</td>
                                        <td className="py-2">{transaction.time}</td>
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