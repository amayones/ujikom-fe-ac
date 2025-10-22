import React, { useState } from 'react';
import { DollarSign, Save } from 'lucide-react';
import Layout from '../../components/Layout';

export default function UpdatePrices() {
    const [prices, setPrices] = useState([
        { id: 1, type: 'Regular', weekday: 45000, weekend: 55000 },
        { id: 2, type: 'Premium', weekday: 65000, weekend: 75000 },
        { id: 3, type: 'VIP', weekday: 85000, weekend: 100000 }
    ]);

    const handlePriceChange = (id, field, value) => {
        setPrices(prices.map(price => 
            price.id === id ? { ...price, [field]: parseInt(value) } : price
        ));
    };

    return (
        <Layout>
            <div className="text-white max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Update Harga Tiket</h1>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="space-y-6">
                        {prices.map((price) => (
                            <div key={price.id} className="border border-gray-700 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                    <h3 className="text-xl font-semibold">{price.type}</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Harga Weekday</label>
                                        <input
                                            type="number"
                                            value={price.weekday}
                                            onChange={(e) => handlePriceChange(price.id, 'weekday', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Harga Weekend</label>
                                        <input
                                            type="number"
                                            value={price.weekend}
                                            onChange={(e) => handlePriceChange(price.id, 'weekend', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}