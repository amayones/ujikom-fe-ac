import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import Toast from '../../components/Toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useFilmsStore } from '../../stores/index.js';

export default function ManageMovie() {
    const [showModal, setShowModal] = useState(false);
    const [editingFilm, setEditingFilm] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { films, loading, fetchFilms, createFilm, updateFilm, deleteFilm } = useFilmsStore();
    const [formData, setFormData] = useState({
        title: '',
        genre: [],
        duration: '',
        director: '',
        description: '',
        poster: '',
        status: 'play_now',
        release_date: ''
    });
    const [showGenreDropdown, setShowGenreDropdown] = useState(false);

    // Comprehensive movie genres list
    const movieGenres = [
        'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
        'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
        'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport',
        'Superhero', 'Thriller', 'War', 'Western'
    ];
    const [toast, setToast] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, filmId: null });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        loadFilms();
    }, []);

    const loadFilms = async () => {
        try {
            await fetchFilms();
        } catch (error) {
            console.error('Failed to fetch films:', error);
            showToast(error.message || 'Gagal memuat data film', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'genre' && type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                genre: checked 
                    ? [...prev.genre, value]
                    : prev.genre.filter(g => g !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const submitData = {
                ...formData,
                genre: Array.isArray(formData.genre) ? formData.genre.join(', ') : formData.genre
            };
            
            if (editingFilm) {
                await updateFilm(editingFilm.id, submitData);
                showToast('Film berhasil diupdate!', 'success');
            } else {
                await createFilm(submitData);
                showToast('Film berhasil ditambahkan!', 'success');
            }
            
            setShowModal(false);
            setEditingFilm(null);
            setFormData({
                title: '',
                genre: [],
                duration: '',
                director: '',
                description: '',
                poster: '',
                status: 'play_now',
                release_date: ''
            });
        } catch (error) {
            console.error('Failed to save film:', error);
            showToast(error.message || 'Gagal menyimpan film', 'error');
        }
    };

    const handleEdit = (film) => {
        setEditingFilm(film);
        const filmGenres = film.genre ? film.genre.split(', ') : [];
        setFormData({
            title: film.title || '',
            genre: filmGenres,
            duration: film.duration || '',
            director: film.director || '',
            description: film.description || '',
            poster: film.poster || '',
            status: film.status || 'play_now',
            release_date: film.release_date || ''
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setConfirmDialog({ isOpen: true, filmId: id });
    };

    const confirmDelete = async () => {
        try {
            await deleteFilm(confirmDialog.filmId);
            showToast('Film berhasil dihapus!', 'success');
        } catch (error) {
            console.error('Failed to delete film:', error);
            showToast(error.message || 'Gagal menghapus film', 'error');
        } finally {
            setConfirmDialog({ isOpen: false, filmId: null });
        }
    };

    const filteredFilms = films.filter(film => {
        const matchesSearch = (film.title || '').toLowerCase().includes(searchTerm.toLowerCase());
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
                                genre: [],
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
                                                        <img src={film.poster} alt={film.title} className="w-full h-full object-cover rounded" />
                                                    ) : (
                                                        '🎬'
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{film.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.genre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.duration} min
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {film.director || 'N/A'}
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
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                                        <div className="relative">
                                            <div
                                                onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                                                className="w-full p-3 bg-gray-700 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-between items-center"
                                            >
                                                <span className="text-gray-300">
                                                    {formData.genre.length > 0 ? formData.genre.join(', ') : 'Pilih genre...'}
                                                </span>
                                                <svg className={`w-5 h-5 transition-transform ${showGenreDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            
                                            {showGenreDropdown && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 rounded-lg border border-gray-600 z-10 max-h-48 overflow-y-auto">
                                                    <div className="grid grid-cols-2 gap-1 p-2">
                                                        {movieGenres.map(genre => (
                                                            <label key={genre} className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-600 p-2 rounded">
                                                                <input
                                                                    type="checkbox"
                                                                    name="genre"
                                                                    value={genre}
                                                                    checked={formData.genre.includes(genre)}
                                                                    onChange={handleInputChange}
                                                                    className="rounded text-red-500 focus:ring-red-500"
                                                                />
                                                                <span>{genre}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
                
                {/* Toast Notifications */}
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
                    title="Hapus Film"
                    message="Apakah Anda yakin ingin menghapus film ini? Tindakan ini tidak dapat dibatalkan."
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmDialog({ isOpen: false, filmId: null })}
                    type="danger"
                />
            </div>
        </div>
    );
}