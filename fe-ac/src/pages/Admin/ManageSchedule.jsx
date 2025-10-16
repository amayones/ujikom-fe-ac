import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import Toast from '../../components/Toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useSchedulesStore, useFilmsStore } from '../../stores/index.js';

export default function ManageSchedule() {
    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const { schedules, studios, prices, loading, fetchScheduleData, createSchedule, updateSchedule, deleteSchedule } = useSchedulesStore();
    const { films, fetchFilms } = useFilmsStore();
    const [formData, setFormData] = useState({
        film_id: '',
        studio_id: '',
        date: '',
        time: '',
        price_id: ''
    });
    const [toast, setToast] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, scheduleId: null });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            await Promise.all([
                fetchScheduleData(),
                fetchFilms()
            ]);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingSchedule) {
                await updateSchedule(editingSchedule.id, formData);
            } else {
                await createSchedule(formData);
            }
            
            setShowModal(false);
            setEditingSchedule(null);
            setFormData({ film_id: '', studio_id: '', date: '', time: '', price_id: '' });
            setToast({ message: editingSchedule ? 'Jadwal berhasil diupdate!' : 'Jadwal berhasil ditambahkan!', type: 'success' });
        } catch (error) {
            console.error('Failed to save schedule:', error);
            setToast({ message: error.message || 'Gagal menyimpan jadwal', type: 'error' });
        }
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setFormData({
            film_id: schedule.film_id || '',
            studio_id: schedule.studio_id || '',
            date: schedule.date || '',
            time: schedule.time || '',
            price_id: schedule.price_id || ''
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setConfirmDialog({ isOpen: true, scheduleId: id });
    };

    const confirmDelete = async () => {
        try {
            await deleteSchedule(confirmDialog.scheduleId);
            setToast({ message: 'Jadwal berhasil dihapus!', type: 'success' });
        } catch (error) {
            console.error('Failed to delete schedule:', error);
            setToast({ message: error.message || 'Gagal menghapus jadwal', type: 'error' });
        } finally {
            setConfirmDialog({ isOpen: false, scheduleId: null });
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Kelola Jadwal</h1>
                        <p className="text-gray-400">Manage jadwal tayang film</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingSchedule(null);
                            setFormData({ film_id: '', studio_id: '', date: '', time: '', price_id: '' });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Jadwal
                    </button>
                </div>

                {/* Schedules Grid */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading...</div>
                    </div>
                ) : schedules.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Belum ada jadwal. Klik "Tambah Jadwal" untuk membuat jadwal baru.</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schedules.map(schedule => (
                        <div key={schedule.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">{schedule.film?.title || schedule.film?.judul}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(schedule)}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(schedule.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-red-400" />
                                    <span>{schedule.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-red-400" />
                                    <span>{schedule.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-400" />
                                    <span>{schedule.studio?.name}</span>
                                </div>
                                <div className="text-green-400 font-bold">
                                    Rp {schedule.price?.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {schedule.price_relation?.type}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gray-800/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl">
                            <h2 className="text-xl font-bold mb-4">
                                {editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Film</label>
                                    <select
                                        name="film_id"
                                        value={formData.film_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, film_id: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">Pilih Film</option>
                                        {films.map(film => (
                                            <option key={film.id} value={film.id}>{film.title || film.judul}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Studio</label>
                                    <select
                                        name="studio_id"
                                        value={formData.studio_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, studio_id: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">Pilih Studio</option>
                                        {studios.map(studio => (
                                            <option key={studio.id} value={studio.id}>{studio.name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Jam</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kategori Harga</label>
                                    <select
                                        name="price_id"
                                        value={formData.price_id}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price_id: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">Pilih Kategori Harga</option>
                                        {prices.map(price => (
                                            <option key={price.id} value={price.id}>
                                                {price.type} - Rp {price.price?.toLocaleString()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition"
                                    >
                                        {loading ? 'Menyimpan...' : (editingSchedule ? 'Update' : 'Tambah')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Toast */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

                {/* Confirm Dialog */}
                <ConfirmDialog
                    isOpen={confirmDialog.isOpen}
                    title="Hapus Jadwal"
                    message="Apakah Anda yakin ingin menghapus jadwal ini? Tindakan ini tidak dapat dibatalkan."
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmDialog({ isOpen: false, scheduleId: null })}
                    type="danger"
                />
            </div>
        </div>
    );
}