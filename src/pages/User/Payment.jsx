import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { filmService } from '../../services';
import { CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { film, schedule, seats, totalPrice } = location.state || {};
    
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const paymentMethods = [
        { id: 'credit_card', name: 'Credit Card', icon: CreditCard, color: 'blue' },
        { id: 'debit_card', name: 'Debit Card', icon: CreditCard, color: 'green' },
        { id: 'e_wallet', name: 'E-Wallet (OVO, GoPay, DANA)', icon: Wallet, color: 'purple' },
        { id: 'bank_transfer', name: 'Bank Transfer', icon: Building2, color: 'orange' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        if (!paymentMethod) {
            alert('Pilih metode pembayaran');
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                schedule_id: schedule.id,
                seat_ids: seats.map(seat => seat.id),
                payment_method: paymentMethod,
                total_amount: totalPrice
            };

            const response = await filmService.bookTicket(bookingData);
            
            // Redirect to ticket page
            navigate(`/ticket/${response.order.id}`, {
                state: { 
                    order: response.order,
                    film,
                    schedule,
                    seats,
                    totalPrice
                }
            });
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Pembayaran gagal. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (!film || !schedule || !seats) {
        return (
            <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Data pemesanan tidak ditemukan</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        Kembali ke Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Pembayaran</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-20 bg-gray-700 rounded flex items-center justify-center">
                                    {film.poster ? (
                                        <img src={film.poster} alt={film.judul} className="w-full h-full object-cover rounded" />
                                    ) : (
                                        '🎬'
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold">{film.judul}</h3>
                                    <p className="text-gray-400">{film.genre}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Tanggal & Waktu:</span>
                                    <span>{schedule.tanggal} - {schedule.jam}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Studio:</span>
                                    <span>{schedule.studio?.nama || 'Studio 1'}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Kursi:</span>
                                    <span>{seats.map(s => s.nomor_kursi).join(', ')}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Jumlah Tiket:</span>
                                    <span>{seats.length} tiket</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Harga per tiket:</span>
                                    <span>Rp {(schedule.price?.harga || 50000).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between text-xl font-bold text-green-400">
                                    <span>Total:</span>
                                    <span>Rp {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Metode Pembayaran</h2>
                        
                        <div className="space-y-3 mb-6">
                            {paymentMethods.map(method => {
                                const IconComponent = method.icon;
                                return (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                                            paymentMethod === method.id
                                                ? 'border-red-500 bg-red-500/20'
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <IconComponent className={`w-6 h-6 text-${method.color}-400`} />
                                            <span className="font-semibold">{method.name}</span>
                                            {paymentMethod === method.id && (
                                                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}\n                        </div>

                        {/* Payment Form */}
                        {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nomor Kartu</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tanggal Kadaluarsa</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nama di Kartu</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'e_wallet' && (
                            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                                <p className="text-sm text-gray-300">
                                    Anda akan diarahkan ke aplikasi e-wallet untuk menyelesaikan pembayaran.
                                </p>
                            </div>
                        )}

                        {paymentMethod === 'bank_transfer' && (
                            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                                <p className="text-sm text-gray-300 mb-2">
                                    Transfer ke rekening berikut:
                                </p>
                                <p className="font-mono text-sm">
                                    Bank BCA: 1234567890<br />
                                    A.n. Absolute Cinema
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handlePayment}
                            disabled={!paymentMethod || loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-bold transition"
                        >
                            {loading ? 'Memproses...' : `Bayar Rp ${totalPrice.toLocaleString()}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}