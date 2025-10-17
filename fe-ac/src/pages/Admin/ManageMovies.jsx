import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function ManageMovies() {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Spider-Man: No Way Home",
            genre: "Action, Adventure",
            duration: "148 min",
            rating: "PG-13",
            poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Spider-Man",
            description: "Peter Parker's secret identity is revealed to the entire world.",
            price: 50000,
            status: "now_playing"
        },
        {
            id: 2,
            title: "The Batman",
            genre: "Action, Crime",
            duration: "176 min", 
            rating: "PG-13",
            poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Batman",
            description: "Batman ventures into Gotham City's underworld.",
            price: 55000,
            status: "now_playing"
        },
        {
            id: 3,
            title: "Doctor Strange 2",
            genre: "Action, Fantasy",
            duration: "126 min",
            rating: "PG-13", 
            poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Dr+Strange",
            description: "Doctor Strange unleashes an unspeakable evil.",
            price: 60000,
            status: "coming_soon"
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        duration: '',
        rating: '',
        price: '',
        status: 'now_playing'
    });

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditingMovie(null);
        setFormData({
            title: '',
            description: '',
            genre: '',
            duration: '',
            rating: '',
            price: '',
            status: 'now_playing'
        });
        setShowModal(true);
    };

    const handleEdit = (movie) => {
        setEditingMovie(movie);
        setFormData({
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            duration: movie.duration,
            rating: movie.rating,
            price: movie.price.toString(),
            status: movie.status
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingMovie) {
            // Update existing movie
            setMovies(movies.map(movie => 
                movie.id === editingMovie.id 
                    ? { ...movie, ...formData, price: parseInt(formData.price) }
                    : movie
            ));
        } else {
            // Add new movie
            const newMovie = {
                id: Math.max(...movies.map(m => m.id)) + 1,
                ...formData,
                price: parseInt(formData.price),
                poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=' + formData.title.replace(' ', '+')
            };
            setMovies([...movies, newMovie]);
        }
        setShowModal(false);
    };

    const handleDelete = (movieId) => {
        if (confirm('Are you sure you want to delete this movie?')) {
            setMovies(movies.filter(movie => movie.id !== movieId));
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

                {/* Movies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMovies.map(movie => (
                        <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{movie.title}</h3>
                                <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                                <p className="text-gray-400 text-sm mb-2">{movie.duration}</p>
                                <p className="text-red-500 font-semibold mb-3">Rp {movie.price.toLocaleString()}</p>
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

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">
                                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                            </h2>
                            
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Movie Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows={3}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Genre"
                                    value={formData.genre}
                                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Duration (e.g., 148 min)"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Rating (e.g., PG-13)"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                />
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                                >
                                    <option value="now_playing">Now Playing</option>
                                    <option value="coming_soon">Coming Soon</option>
                                </select>
                            </div>
                            
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}