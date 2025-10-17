import React, { useState } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';

export default function ManageCustomers() {
    const [customers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '081234567890', joinDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '081234567891', joinDate: '2024-01-16' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '081234567892', joinDate: '2024-01-17' }
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Customers</h1>
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                        <UserPlus className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Phone</th>
                                <th className="px-6 py-3 text-left">Join Date</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id} className="border-b border-gray-700">
                                    <td className="px-6 py-4">{customer.name}</td>
                                    <td className="px-6 py-4">{customer.email}</td>
                                    <td className="px-6 py-4">{customer.phone}</td>
                                    <td className="px-6 py-4">{customer.joinDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                                                <Edit className="w-3 h-3" />
                                                Edit
                                            </button>
                                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                                                <Trash2 className="w-3 h-3" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}