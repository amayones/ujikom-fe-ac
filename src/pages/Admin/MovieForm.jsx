import React, { useState, useEffect } from 'react';

export default function MovieForm({ movie, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    duration: '',
    status: 'now_playing',
    poster: '',
    director: '',
    release_date: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        genre: movie.genre || '',
        duration: movie.duration?.toString() || '',
        status: movie.status || 'now_playing',
        poster: movie.poster || '',
        director: movie.director || '',
        release_date: movie.release_date ? movie.release_date.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        genre: '',
        duration: '',
        status: 'now_playing',
        poster: '',
        director: '',
        release_date: ''
      });
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      duration: parseInt(formData.duration) || 0
    };
    onSave(submitData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">
          {movie ? 'Edit Movie' : 'Add New Movie'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="url"
            name="poster"
            placeholder="Poster URL"
            value={formData.poster}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="now_playing">Now Playing</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
          
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white py-2 rounded"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}