import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, Building } from 'lucide-react';
import useOrderStore from '../../store/orderStore';
import usePaymentStore from '../../store/paymentStore';
import useBookingStore from '../../store/bookingStore';
import useUIStore from '../../store/uiStore';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchOrderById, currentOrder, processPayment } = useOrderStore();
    const { fetchPaymentMethods, paymentMethods } = usePaymentStore();
    const { selectedMethod, setSelectedMethod } = useBookingStore();
    const { loading, setLoading } = useUIStore();

    const orderId = location.state?.orderId;

    useEffect(() => {
        if (orderId) {
            fetchOrderById(orderId);
        }
        fetchPaymentMethods();
    }, [orderId, fetchOrderById, fetchPaymentMethods]);

    if (!currentOrder) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-xl">Loading order details...</div>
            </div>
        );
    }

    const defaultPaymentMethods = [
        { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
        { id: 'qris', name: 'QRIS', icon: Smartphone, description: 'Scan QR code to pay' },
        { id: 'bank_transfer', name: 'Bank Transfer', icon: Building, description: 'Transfer to our account' },
        { id: 'cash', name: 'Cash (At Counter)', icon: Banknote, description: 'Pay at cinema counter' }
    ];

    const availableMethods = paymentMethods.length > 0 ? paymentMethods : defaultPaymentMethods;

    const handlePayment = async () => {
        if (!selectedMethod) {
            // Using modern notification instead of alert
            return;
        }

        setLoading(true);
        const paymentData = {
            order_id: currentOrder.id,
            payment_method: selectedMethod,
            amount: currentOrder.total_amount
        };

        const result = await processPayment(paymentData);
        setLoading(false);

        if (result.success) {
            navigate(`/invoice/${currentOrder.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-rose-900 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(244,114,182,0.3),transparent_70%)]" />
                <div className="relative z-10 text-center py-16 px-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-rose-700/30 backdrop-blur-sm rounded-full border border-rose-600/50 mb-6">
                        <CreditCard className="text-rose-400" size={24} />
                        <span className="text-rose-300 font-semibold">SECURE PAYMENT</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-rose-400 to-rose-300 bg-clip-text text-transparent">
                        💳 Complete Your Purchase
                    </h1>
                    <p className="text-xl text-rose-200 max-w-2xl mx-auto">
                        Choose your preferred payment method and secure your cinema experience
                    </p>
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Booking Summary */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">📋</div>
                            <h2 className="text-2xl font-bold text-rose-600">Booking Summary</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-gray-800/60 rounded-xl">
                                <span className="text-gray-300 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-rose-400 rounded-full" />
                                    Movie:
                                </span>
                                <span className="font-semibold text-white">{currentOrder.movie_title}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-800/60 rounded-xl">
                                <span className="text-gray-300 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-pink-400 rounded-full" />
                                    Date & Time:
                                </span>
                                <span className="font-semibold text-white">{currentOrder.schedule_date} at {currentOrder.schedule_time}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-pink-400 rounded-full" />
                                    Studio:
                                </span>
                                <span className="font-semibold text-gray-800">{currentOrder.studio}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                                    Seats:
                                </span>
                                <span className="font-semibold text-gray-800">{Array.isArray(currentOrder.seats) ? currentOrder.seats.join(', ') : currentOrder.seats}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                                    Price per ticket:
                                </span>
                                <span className="font-semibold text-gray-800">Rp 50,000</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full" />
                                    Quantity:
                                </span>
                                <span className="font-semibold text-gray-800">{Array.isArray(currentOrder.seats) ? currentOrder.seats.length : 1} tickets</span>
                            </div>
                            
                            <div className="border-t border-white/20 pt-4 mt-6">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
                                    <span className="text-2xl font-bold text-rose-600">💰 Total:</span>
                                    <span className="text-3xl font-black text-rose-700">Rp {currentOrder.total_amount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-rose-600 to-rose-700 rounded-full flex items-center justify-center text-white font-bold">💳</div>
                            <h2 className="text-2xl font-bold text-rose-400">Payment Method</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {availableMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`group p-6 rounded-2xl border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                        selectedMethod === method.id
                                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 shadow-lg shadow-emerald-400/25'
                                            : 'border-slate-600 hover:border-slate-500 bg-white/5 hover:bg-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            selectedMethod === method.id 
                                                ? 'bg-emerald-500 text-black' 
                                                : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                                        }`}>
                                            <method.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-bold text-lg ${
                                                selectedMethod === method.id ? 'text-emerald-300' : 'text-white'
                                            }`}>{method.name}</h3>
                                            <p className="text-slate-400 text-sm">{method.description}</p>
                                        </div>
                                        {selectedMethod === method.id && (
                                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment Details */}
                        {selectedMethod && (
                            <div className="mt-8 p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl border border-emerald-400/30">
                                {selectedMethod === 'credit_card' && (
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-rose-300 mb-4">💳 Card Details</h4>
                                        <input
                                            type="text"
                                            placeholder="Card Number (1234 5678 9012 3456)"
                                            className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-emerald-400 focus:outline-none transition-colors"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-emerald-400 focus:outline-none transition-colors"
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-emerald-400 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                {selectedMethod === 'qris' && (
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-rose-300 mb-4">📱 QRIS Payment</h4>
                                        <div className="w-56 h-56 bg-white mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg">
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">📱</div>
                                                <span className="text-black font-bold">QR Code</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-300">Scan this QR code with your mobile banking app</p>
                                    </div>
                                )}
                                
                                {selectedMethod === 'bank_transfer' && (
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-bold text-rose-300 mb-4">🏦 Bank Transfer</h4>
                                        <div className="bg-slate-700 rounded-xl p-4 space-y-2">
                                            <p className="flex justify-between"><strong>Bank:</strong> <span>Bank Central Asia (BCA)</span></p>
                                            <p className="flex justify-between"><strong>Account Number:</strong> <span className="font-mono">1234567890</span></p>
                                            <p className="flex justify-between"><strong>Account Name:</strong> <span>Absolute Cinema</span></p>
                                        </div>
                                        <p className="text-yellow-400 text-sm bg-yellow-400/10 p-3 rounded-xl border border-yellow-400/30">⚠️ Please transfer the exact amount and keep the receipt</p>
                                    </div>
                                )}
                                
                                {selectedMethod === 'cash' && (
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-rose-300 mb-4">💵 Cash Payment</h4>
                                        <div className="bg-amber-500/10 p-6 rounded-xl border border-amber-400/30">
                                            <div className="text-4xl mb-3">🏪</div>
                                            <p className="text-amber-300 font-semibold mb-2">Pay at the cinema counter before show time</p>
                                            <p className="text-slate-300 text-sm">Show this booking confirmation to the cashier</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={handlePayment}
                            disabled={!selectedMethod || loading}
                            className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                                !selectedMethod || loading
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-rose-500/25'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                <span>
                                    {selectedMethod === 'cash' ? '✅ Confirm Booking' : '💳 Process Payment'}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}