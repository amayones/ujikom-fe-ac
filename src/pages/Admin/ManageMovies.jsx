import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import useMovieStore from '../../store/movieStore';
import MovieForm from '../admin/MovieForm';

export default function ManageMovies() {
    const { movies, loading, error, fetchMovies, addMovie, updateMovie, deleteMovie, clearError } = useMovieStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (error) {
            setNotification(error);
            setTimeout(() => {
                setNotification('');
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    const filteredMovies = movies.filter(movie =>
        (movie.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.genre || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditingMovie(null);
        setShowModal(true);
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingMovie) {
                await updateMovie(editingMovie.id, formData);
                setNotification('Movie updated successfully');
            } else {
                await addMovie(formData);
                setNotification('Movie added successfully');
            }
            setShowModal(false);
            setTimeout(() => setNotification(''), 3000);
        } catch {
            // Error handled by store
        }
    };

    const handleDelete = async (movieId) => {
        if (confirm('Are you sure you want to delete this movie?')) {
            try {
                await deleteMovie(movieId);
                setNotification('Movie deleted successfully');
                setTimeout(() => setNotification(''), 3000);
            } catch (error) {
                // Error handled by store
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Movies</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                    >
                        <Plus className="w-4 h-4" />
                        Add Movie
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Notification */}
                {notification && (
                    <div className="mb-4 p-3 bg-green-600 text-white rounded">
                        {notification}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="text-gray-400">Loading movies...</div>
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && (
                    filteredMovies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredMovies.map(movie => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                                <img 
                                    src={movie.poster || 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image'} 
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                                    <p className="text-gray-400 text-sm mb-2">{movie.duration} min</p>
                                    {movie.director && (
                                        <p className="text-gray-400 text-sm mb-2">Dir: {movie.director}</p>
                                    )}
                                    <span className={`inline-block px-2 py-1 rounded text-xs mb-3 ${
                                        movie.status === 'now_playing' 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-yellow-600 text-white'
                                    }`}>
                                        {movie.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
                                    </span>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(movie)}
                                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                                        >
                                            <Edit className="w-3 h-3" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(movie.id)}
                                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">No movies found</p>
                            <button
                                onClick={handleAdd}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                            >
                                Add First Movie
                            </button>
                        </div>
                    )
                )}

                {/* Modal */}
                {showModal && (
                    <MovieForm
                        movie={editingMovie}
                        onSave={handleSave}
                        onCancel={() => setShowModal(false)}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}