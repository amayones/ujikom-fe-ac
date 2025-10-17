import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';
import useCashierStore from '../../store/cashierStore';
import CashierForm from '../admin/CashierForm';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';

export default function ManageCashiers() {
    const { cashiers, loading, error, fetchCashiers, addCashier, updateCashier, deleteCashier, clearError } = useCashierStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCashier, setEditingCashier] = useState(null);
    const [toast, setToast] = useState({ show: false, type: 'success', message: '' });
    const [confirmModal, setConfirmModal] = useState({ show: false, cashierId: null });

    useEffect(() => {
        fetchCashiers();
    }, []);

    useEffect(() => {
        if (error) {
            setToast({ show: true, type: 'error', message: error });
            clearError();
        }
    }, [error, clearError]);

    const filteredCashiers = cashiers.filter(cashier =>
        (cashier.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cashier.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditingCashier(null);
        setShowModal(true);
    };

    const handleEdit = (cashier) => {
        setEditingCashier(cashier);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingCashier) {
                await updateCashier(editingCashier.id, formData);
                setToast({ show: true, type: 'success', message: 'Cashier updated successfully' });
            } else {
                await addCashier(formData);
                setToast({ show: true, type: 'success', message: 'Cashier added successfully' });
            }
            setShowModal(false);
        } catch {
            // Error handled by store
        }
    };

    const handleDeleteClick = (cashierId) => {
        setConfirmModal({ show: true, cashierId });
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteCashier(confirmModal.cashierId);
            setToast({ show: true, type: 'success', message: 'Cashier deleted successfully' });
            setConfirmModal({ show: false, cashierId: null });
        } catch {
            // Error handled by store
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Cashiers</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        <UserPlus className="w-4 h-4" />
                        Add Cashier
                    </button>
                </div>



                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading cashiers...</div>
                    </div>
                )}

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search cashiers..."
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
                                <th className="px-6 py-3 text-left">Shift</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCashiers.map(cashier => (
                                <tr key={cashier.id} className="border-b border-gray-700">
                                    <td className="px-6 py-4">{cashier.name}</td>
                                    <td className="px-6 py-4">{cashier.email}</td>
                                    <td className="px-6 py-4">{cashier.phone}</td>
                                    <td className="px-6 py-4">{cashier.shift}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            cashier.status === 'Active' 
                                                ? 'bg-green-600 text-white' 
                                                : 'bg-red-600 text-white'
                                        }`}>
                                            {cashier.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(cashier)}
                                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                            >
                                                <Edit className="w-3 h-3" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(cashier.id)}
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

                {/* Modal */}
                {showModal && (
                    <CashierForm
                        cashier={editingCashier}
                        onSave={handleSave}
                        onCancel={() => setShowModal(false)}
                        loading={loading}
                    />
                )}

                {/* Confirm Modal */}
                <ConfirmModal
                    isOpen={confirmModal.show}
                    title="Delete Cashier"
                    message="Are you sure you want to delete this cashier? This action cannot be undone."
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setConfirmModal({ show: false, cashierId: null })}
                />

                {/* Toast */}
                <Toast
                    type={toast.type}
                    message={toast.message}
                    isVisible={toast.show}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            </div>
        </div>
    );
}