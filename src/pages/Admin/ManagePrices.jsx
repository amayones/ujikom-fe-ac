import React, { useState } from 'react';
import { Edit, Save, DollarSign } from 'lucide-react';

export default function ManagePrices() {
    const [prices, setPrices] = useState([
        { id: 1, category: 'Regular', weekday: 45000, weekend: 55000 },
        { id: 2, category: 'VIP', weekday: 75000, weekend: 85000 },
        { id: 3, category: 'Premium', weekday: 65000, weekend: 75000 }
    ]);
    const [editing, setEditing] = useState(null);

    const handleEdit = (id) => {
        setEditing(id);
    };

    const handleSave = (id) => {
        setEditing(null);
    };

    const handlePriceChange = (id, field, value) => {
        setPrices(prices.map(price => 
            price.id === id ? { ...price, [field]: parseInt(value) } : price
        ));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <DollarSign className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-bold">Manage Prices</h1>
                </div>

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
                                                value={price.weekday}
                                                onChange={(e) => handlePriceChange(price.id, 'weekday', e.target.value)}
                                                className="bg-gray-700 text-white px-3 py-1 rounded w-24"
                                            />
                                        ) : (
                                            `Rp ${price.weekday.toLocaleString()}`
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editing === price.id ? (
                                            <input
                                                type="number"
                                                value={price.weekend}
                                                onChange={(e) => handlePriceChange(price.id, 'weekend', e.target.value)}
                                                className="bg-gray-700 text-white px-3 py-1 rounded w-24"
                                            />
                                        ) : (
                                            `Rp ${price.weekend.toLocaleString()}`
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editing === price.id ? (
                                            <button
                                                onClick={() => handleSave(price.id)}
                                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                                            >
                                                <Save className="w-3 h-3" />
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(price.id)}
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
            </div>
        </div>
    );
}