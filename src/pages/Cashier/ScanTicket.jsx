import React, { useState } from 'react';
import { kasirService } from '../../services/kasirService';
import { QrCode, Camera, CheckCircle, XCircle, Ticket, User, Calendar, Clock } from 'lucide-react';

export default function ScanTicket() {
    const [scanResult, setScanResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [manualCode, setManualCode] = useState('');
    const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'manual'

    const handleScan = async (ticketCode) => {
        setLoading(true);
        try {
            // Simulate ticket validation
            const ticketData = {
                id: 'TKT001',
                customer: 'John Doe',
                film: 'Avengers: Endgame',
                schedule: {
                    tanggal: '2024-01-15',
                    jam: '19:30',
                    studio: { nama: 'Studio 1' }
                },
                seats: ['A1', 'A2'],
                status: 'valid', // 'valid', 'used', 'expired', 'invalid'
                amount: 100000
            };

            setScanResult(ticketData);
        } catch (error) {
            console.error('Failed to validate ticket:', error);
            setScanResult({ status: 'invalid', message: 'Tiket tidak valid' });
        } finally {
            setLoading(false);
        }
    };

    const handleManualScan = () => {
        if (!manualCode.trim()) {
            alert('Masukkan kode tiket');
            return;
        }
        handleScan(manualCode);
    };

    const handleProcessTicket = async () => {
        if (!scanResult || scanResult.status !== 'valid') return;

        try {
            // Mark ticket as used
            await kasirService.processOnlineTicket(scanResult.id, 'used');
            setScanResult(prev => ({ ...prev, status: 'used' }));
            alert('Tiket berhasil diproses');
        } catch (error) {
            console.error('Failed to process ticket:', error);
            alert('Gagal memproses tiket');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'valid': return 'text-green-400';
            case 'used': return 'text-blue-400';
            case 'expired': return 'text-yellow-400';
            case 'invalid': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'valid': return <CheckCircle className="w-8 h-8 text-green-400" />;
            case 'used': return <CheckCircle className="w-8 h-8 text-blue-400" />;
            case 'expired': return <XCircle className="w-8 h-8 text-yellow-400" />;
            case 'invalid': return <XCircle className="w-8 h-8 text-red-400" />;
            default: return <QrCode className="w-8 h-8 text-gray-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'valid': return 'Tiket Valid';
            case 'used': return 'Tiket Sudah Digunakan';
            case 'expired': return 'Tiket Kadaluarsa';
            case 'invalid': return 'Tiket Tidak Valid';
            default: return 'Unknown';
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Scan Tiket</h1>
                    <p className="text-gray-400">Validasi tiket pelanggan</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Scanner Section */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Scanner</h2>
                        
                        {/* Mode Toggle */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setScanMode('camera')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                    scanMode === 'camera' 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                <Camera className="w-4 h-4" />
                                Kamera
                            </button>
                            <button
                                onClick={() => setScanMode('manual')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                    scanMode === 'manual' 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                <QrCode className="w-4 h-4" />
                                Manual
                            </button>
                        </div>

                        {scanMode === 'camera' ? (
                            /* Camera Scanner */
                            <div className="bg-gray-700 rounded-lg p-8 text-center">
                                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-400 mb-4">Arahkan kamera ke QR Code tiket</p>
                                <button
                                    onClick={() => handleScan('DEMO_TICKET_001')}
                                    className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition"
                                >
                                    Simulasi Scan
                                </button>
                            </div>
                        ) : (
                            /* Manual Input */
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kode Tiket</label>
                                    <input
                                        type="text"
                                        value={manualCode}
                                        onChange={(e) => setManualCode(e.target.value)}
                                        placeholder="Masukkan kode tiket"
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <button
                                    onClick={handleManualScan}
                                    disabled={loading}
                                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition"
                                >
                                    {loading ? 'Memvalidasi...' : 'Validasi Tiket'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Result Section */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Hasil Scan</h2>
                        
                        {!scanResult ? (
                            <div className="text-center py-12">
                                <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-400">Belum ada tiket yang discan</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Status */}
                                <div className="text-center">
                                    {getStatusIcon(scanResult.status)}
                                    <p className={`text-xl font-bold mt-2 ${getStatusColor(scanResult.status)}`}>
                                        {getStatusText(scanResult.status)}
                                    </p>
                                </div>

                                {/* Ticket Details */}
                                {scanResult.status !== 'invalid' && (
                                    <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Pelanggan</p>
                                                <p className="font-semibold">{scanResult.customer}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Ticket className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Film</p>
                                                <p className="font-semibold">{scanResult.film}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Tanggal & Waktu</p>
                                                <p className="font-semibold">{scanResult.schedule?.tanggal} - {scanResult.schedule?.jam}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-400">Studio & Kursi</p>
                                                <p className="font-semibold">{scanResult.schedule?.studio?.nama} - {scanResult.seats?.join(', ')}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-gray-600 pt-3">
                                            <p className="text-sm text-gray-400">Total Pembayaran</p>
                                            <p className="text-xl font-bold text-green-400">Rp {scanResult.amount?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {scanResult.status === 'valid' && (
                                        <button
                                            onClick={handleProcessTicket}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                                        >
                                            Proses Masuk
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setScanResult(null)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition"
                                    >
                                        Scan Lagi
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Scans */}
                <div className="bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-xl font-bold mb-4">Scan Terbaru</h2>
                    <div className="space-y-3">
                        {[
                            { customer: 'John Doe', film: 'Avengers: Endgame', time: '14:30', status: 'valid' },
                            { customer: 'Jane Smith', film: 'Oppenheimer', time: '14:25', status: 'used' },
                            { customer: 'Bob Johnson', film: 'Barbie', time: '14:20', status: 'invalid' }
                        ].map((scan, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(scan.status)}
                                    <div>
                                        <p className="font-semibold">{scan.customer}</p>
                                        <p className="text-sm text-gray-400">{scan.film} - {scan.time}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    scan.status === 'valid' ? 'bg-green-600/20 text-green-400' :
                                    scan.status === 'used' ? 'bg-blue-600/20 text-blue-400' :
                                    'bg-red-600/20 text-red-400'
                                }`}>
                                    {getStatusText(scan.status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}