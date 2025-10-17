import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';
import useCustomerStore from '../../store/customerStore';
import CustomerForm from '../admin/CustomerForm';

export default function ManageCustomers() {
    const { customers, loading, error, fetchCustomers, addCustomer, updateCustomer, deleteCustomer, clearError } = useCustomerStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (error) {
            setNotification(error);
            setTimeout(() => {
                setNotification('');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    const filteredCustomers = customers.filter(customer =>
        (customer.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditingCustomer(null);
        setShowModal(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingCustomer) {
                await updateCustomer(editingCustomer.id, formData);
                setNotification('Customer updated successfully');
            } else {
                await addCustomer(formData);
                setNotification('Customer added successfully');
            }
            setShowModal(false);
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            // Error handled by store
        }
    };

    const handleDelete = async (customerId) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(customerId);
                setNotification('Customer deleted successfully');
                setTimeout(() => setNotification(''), 3000);
            } catch (error) {
                // Error handled by store
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Customers</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>

                {/* Notification */}
                {notification && (
                    <div className="mb-4 p-3 bg-green-600 text-white rounded">
                        {notification}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading customers...</div>
                    </div>
                )}

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

                {!loading && (
                    filteredCustomers.length > 0 ? (
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">Role</th>
                                        <th className="px-6 py-3 text-left">Join Date</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.id} className="border-b border-gray-700">
                                            <td className="px-6 py-4">{customer.name}</td>
                                            <td className="px-6 py-4">{customer.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    customer.role === 'admin' ? 'bg-purple-600' :
                                                    customer.role === 'owner' ? 'bg-yellow-600' :
                                                    customer.role === 'cashier' ? 'bg-blue-600' :
                                                    'bg-green-600'
                                                }`}>
                                                    {customer.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{new Date(customer.created_at).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(customer)}
                                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                                    >
                                                        <Edit className="w-3 h-3" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(customer.id)}
                                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                                    >
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
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">No customers found</p>
                            <button
                                onClick={handleAdd}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                            >
                                Add First Customer
                            </button>
                        </div>
                    )
                )}

                {/* Modal */}
                {showModal && (
                    <CustomerForm
                        customer={editingCustomer}
                        onSave={handleSave}
                        onCancel={() => setShowModal(false)}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}