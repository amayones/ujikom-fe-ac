import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Building } from 'lucide-react';

export default function Payment() {
    const [selectedMethod, setSelectedMethod] = useState('');
    
    // Mock booking data
    const bookingData = {
        movie: 'Spider-Man: No Way Home',
        date: '2024-01-15',
        time: '19:00',
        studio: 'Studio 1',
        seats: ['A1', 'A2'],
        price: 50000,
        total: 100000
    };

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
        { id: 'qris', name: 'QRIS', icon: Smartphone, description: 'Scan QR code to pay' },
        { id: 'transfer', name: 'Bank Transfer', icon: Building, description: 'Transfer to our account' },
        { id: 'cash', name: 'Cash (At Counter)', icon: Banknote, description: 'Pay at cinema counter' }
    ];

    const handlePayment = () => {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }
        
        alert(`Payment processed with ${selectedMethod}! Redirecting to ticket...`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Payment</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Booking Summary */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Movie:</span>
                                <span>{bookingData.movie}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Date & Time:</span>
                                <span>{bookingData.date} at {bookingData.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Studio:</span>
                                <span>{bookingData.studio}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Seats:</span>
                                <span>{bookingData.seats.join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Price per ticket:</span>
                                <span>Rp {bookingData.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Quantity:</span>
                                <span>{bookingData.seats.length} tickets</span>
                            </div>
                            
                            <hr className="border-gray-600" />
                            
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span className="text-red-500">Rp {bookingData.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
                        
                        <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`p-4 rounded-lg border cursor-pointer transition ${
                                        selectedMethod === method.id
                                            ? 'border-red-500 bg-red-900/20'
                                            : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <method.icon className="w-6 h-6 text-red-500" />
                                        <div>
                                            <h3 className="font-semibold">{method.name}</h3>
                                            <p className="text-gray-400 text-sm">{method.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Details */}
                        {selectedMethod && (
                            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                                {selectedMethod === 'card' && (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Card Number"
                                            className="w-full bg-gray-600 text-white px-4 py-2 rounded"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="bg-gray-600 text-white px-4 py-2 rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="bg-gray-600 text-white px-4 py-2 rounded"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                {selectedMethod === 'qris' && (
                                    <div className="text-center">
                                        <div className="w-48 h-48 bg-white mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-black">QR Code Here</span>
                                        </div>
                                        <p className="text-gray-400">Scan this QR code with your mobile banking app</p>
                                    </div>
                                )}
                                
                                {selectedMethod === 'transfer' && (
                                    <div className="space-y-2">
                                        <p><strong>Bank:</strong> Bank Central Asia (BCA)</p>
                                        <p><strong>Account Number:</strong> 1234567890</p>
                                        <p><strong>Account Name:</strong> Absolute Cinema</p>
                                        <p className="text-yellow-400 text-sm">Please transfer the exact amount and keep the receipt</p>
                                    </div>
                                )}
                                
                                {selectedMethod === 'cash' && (
                                    <div className="text-center">
                                        <p className="text-yellow-400">Please pay at the cinema counter before the show time.</p>
                                        <p className="text-gray-400 text-sm mt-2">Show this booking confirmation to the cashier.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handlePayment}
                            disabled={!selectedMethod}
                            className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold"
                        >
                            {selectedMethod === 'cash' ? 'Confirm Booking' : 'Process Payment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}