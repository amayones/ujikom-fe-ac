import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Plus, Edit, Trash2, Search, Filter, Eye } from 'lucide-react';

export default function ManageMovie() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingFilm, setEditingFilm] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        duration: '',
        director: '',
        description: '',
        poster: '',
        status: 'play_now',
        release_date: ''
    });

    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {
        try {
            const data = await adminService.getFilms();
            setFilms(data);
        } catch (error) {
            console.error('Failed to fetch films:', error);
            // Mock data for demo
            setFilms([
                { id: 1, judul: 'Avengers: Endgame', genre: 'Action, Sci-Fi', durasi: 181, sutradara: 'Russo Brothers', status: 'play_now' },
                { id: 2, judul: 'Oppenheimer', genre: 'Biography, Drama', durasi: 180, sutradara: 'Christopher Nolan', status: 'play_now' },
                { id: 3, judul: 'Spider-Man 4', genre: 'Action, Adventure', durasi: 120, sutradara: 'Jon Watts', status: 'coming_soon' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (editingFilm) {
                await adminService.updateFilm(editingFilm.id, formData);
            } else {
                await adminService.storeFilm(formData);
            }
            
            await fetchFilms();
            setShowModal(false);
            setEditingFilm(null);
            setFormData({
                title: '',
                genre: '',
                duration: '',
                director: '',
                description: '',
                poster: '',
                status: 'play_now',
                release_date: ''
            });
        } catch (error) {
            console.error('Failed to save film:', error);
            alert('Gagal menyimpan film');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (film) => {
        setEditingFilm(film);
        setFormData({
            title: film.title || film.judul || '',
            genre: film.genre || '',
            duration: film.duration || film.durasi || '',
            director: film.director || film.sutradara || '',
            description: film.description || film.sinopsis || '',
            poster: film.poster || '',
            status: film.status || 'play_now',
            release_date: film.release_date || film.tanggal_rilis || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus film ini?')) {
            try {
                await adminService.deleteFilm(id);
                await fetchFilms();
            } catch (error) {
                console.error('Failed to delete film:', error);
                alert('Gagal menghapus film');
            }
        }
    };

    const filteredFilms = films.filter(film => {
        const matchesSearch = (film.title || film.judul || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || film.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Kelola Film</h1>
                        <p className="text-gray-400">Manage semua film di bioskop</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingFilm(null);
                            setFormData({
                                title: '',
                                genre: '',
                                duration: '',
                                director: '',
                                description: '',
                                poster: '',
                                status: 'play_now',
                                release_date: ''
                            });
                            setShowModal(true);
                        }}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Film
                    </button>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari film..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="all">Semua Status</option>
                            <option value="play_now">Sedang Tayang</option>
                            <option value="coming_soon">Coming Soon</option>
                        </select>
                    </div>
                </div>

                {/* Films Table */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Film</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Genre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Durasi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sutradara</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredFilms.map(film => (
                                    <tr key={film.id} className="hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-12 h-16 bg-gray-600 rounded flex items-center justify-center mr-4">
                                                    {film.poster ? (
                                                        <img src={film.poster} alt={film.title || film.judul} className="w-full h-full object-cover rounded" />
                                                    ) : (
                                                        '🎬'
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{film.title || film.judul}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.genre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.duration || film.durasi} min
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.director || film.sutradara || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                film.status === 'play_now' 
                                                    ? 'bg-green-600/20 text-green-400'
                                                    : 'bg-yellow-600/20 text-yellow-400'
                                            }`}>
                                                {film.status === 'play_now' ? 'Sedang Tayang' : 'Coming Soon'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(film)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(film.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4">
                                {editingFilm ? 'Edit Film' : 'Tambah Film Baru'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Judul Film</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Genre</label>
                                        <input
                                            type="text"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Durasi (menit)</label>
                                        <input
                                            type="number"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Sutradara</label>
                                        <input
                                            type="text"
                                            name="director"
                                            value={formData.director}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            <option value="play_now">Sedang Tayang</option>
                                            <option value="coming_soon">Coming Soon</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tanggal Rilis</label>
                                        <input
                                            type="date"
                                            name="release_date"
                                            value={formData.release_date}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">URL Poster</label>
                                    <input
                                        type="url"
                                        name="poster"
                                        value={formData.poster}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">Sinopsis</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition"
                                    >
                                        {loading ? 'Menyimpan...' : (editingFilm ? 'Update Film' : 'Tambah Film')}
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