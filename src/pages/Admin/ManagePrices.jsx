import React, { useState, useEffect } from 'react';
import { Edit, Save, DollarSign } from 'lucide-react';
import usePriceStore from '../../store/priceStore';

export default function ManagePrices() {
    const { prices, loading, error, fetchPrices, updatePrice, clearError } = usePriceStore();
    const [editing, setEditing] = useState(null);
    const [editData, setEditData] = useState({});
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchPrices();
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

    const handleEdit = (price) => {
        setEditing(price.id);
        setEditData({ weekday: price.weekday, weekend: price.weekend });
    };

    const handleSave = async (priceId) => {
        try {
            await updatePrice(priceId, editData);
            setEditing(null);
            setNotification('Price updated successfully');
            setTimeout(() => setNotification(''), 3000);
        } catch (error) {
            // Error handled by store
        }
    };

    const handlePriceChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <DollarSign className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-bold">Manage Prices</h1>
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
                        <div className="text-gray-400">Loading prices...</div>
                    </div>
                )}

                {!loading && (
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left">Category</th>
                                    <th className="px-6 py-3 text-left">Weekday Price</th>
                                    <th className="px-6 py-3 text-left">Weekend Price</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prices.map(price => (
                                    <tr key={price.id} className="border-b border-gray-700">
                                        <td className="px-6 py-4 font-semibold">{price.category}</td>
                                        <td className="px-6 py-4">
                                            {editing === price.id ? (
                                                <input
                                                    type="number"
                                                    value={editData.weekday}
                                                    onChange={(e) => handlePriceChange('weekday', e.target.value)}
                                                    className="bg-gray-700 text-white px-3 py-1 rounded w-32"
                                                />
                                            ) : (
                                                `Rp ${price.weekday?.toLocaleString() || '0'}`
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editing === price.id ? (
                                                <input
                                                    type="number"
                                                    value={editData.weekend}
                                                    onChange={(e) => handlePriceChange('weekend', e.target.value)}
                                                    className="bg-gray-700 text-white px-3 py-1 rounded w-32"
                                                />
                                            ) : (
                                                `Rp ${price.weekend?.toLocaleString() || '0'}`
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editing === price.id ? (
                                                <button
                                                    onClick={() => handleSave(price.id)}
                                                    disabled={loading}
                                                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 px-3 py-1 rounded text-sm"
                                                >
                                                    <Save className="w-3 h-3" />
                                                    {loading ? 'Saving...' : 'Save'}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(price)}
                                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                                >
                                                    <Edit className="w-3 h-3" />
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}