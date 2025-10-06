import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';

export default function ManageSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [formData, setFormData] = useState({
        film_id: '',
        studio_id: '1',
        tanggal: '',
        jam: '',
        harga: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [schedulesData, filmsData] = await Promise.all([
                adminService.getSchedules(),
                adminService.getFilms()
            ]);
            setSchedules(schedulesData);
            setFilms(filmsData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            // Mock data
            setSchedules([
                { id: 1, film: { judul: 'Avengers: Endgame' }, studio: { nama: 'Studio 1' }, tanggal: '2024-01-15', jam: '19:30', harga: 50000 },
                { id: 2, film: { judul: 'Oppenheimer' }, studio: { nama: 'Studio 2' }, tanggal: '2024-01-15', jam: '21:00', harga: 55000 }
            ]);
            setFilms([
                { id: 1, judul: 'Avengers: Endgame' },
                { id: 2, judul: 'Oppenheimer' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (editingSchedule) {
                await adminService.updateSchedule(editingSchedule.id, formData);
            } else {
                await adminService.storeSchedule(formData);
            }
            
            await fetchData();
            setShowModal(false);
            setEditingSchedule(null);
            setFormData({ film_id: '', studio_id: '1', tanggal: '', jam: '', harga: '' });
        } catch (error) {
            console.error('Failed to save schedule:', error);
            alert('Gagal menyimpan jadwal');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule);
        setFormData({
            film_id: schedule.film_id || '',
            studio_id: schedule.studio_id || '1',
            tanggal: schedule.tanggal || '',
            jam: schedule.jam || '',
            harga: schedule.harga || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus jadwal ini?')) {
            try {
                await adminService.deleteSchedule(id);
                await fetchData();
            } catch (error) {
                console.error('Failed to delete schedule:', error);
                alert('Gagal menghapus jadwal');
            }
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
                            setFormData({ film_id: '', studio_id: '1', tanggal: '', jam: '', harga: '' });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Jadwal
                    </button>
                </div>

                {/* Schedules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schedules.map(schedule => (
                        <div key={schedule.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold">{schedule.film?.judul}</h3>
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
                                    <span>{schedule.tanggal}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-red-400" />
                                    <span>{schedule.jam}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-400" />
                                    <span>{schedule.studio?.nama}</span>
                                </div>
                                <div className="text-green-400 font-bold">
                                    Rp {schedule.harga?.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
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
                                            <option key={film.id} value={film.id}>{film.judul}</option>
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
                                        <option value="1">Studio 1</option>
                                        <option value="2">Studio 2</option>
                                        <option value="3">Studio 3</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        value={formData.tanggal}
                                        onChange={(e) => setFormData(prev => ({ ...prev, tanggal: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Jam</label>
                                    <input
                                        type="time"
                                        name="jam"
                                        value={formData.jam}
                                        onChange={(e) => setFormData(prev => ({ ...prev, jam: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Harga</label>
                                    <input
                                        type="number"
                                        name="harga"
                                        value={formData.harga}
                                        onChange={(e) => setFormData(prev => ({ ...prev, harga: e.target.value }))}
                                        required
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
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
            </div>
        </div>
    );
}