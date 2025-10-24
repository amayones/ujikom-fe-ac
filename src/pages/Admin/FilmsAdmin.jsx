import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Film } from 'lucide-react';
import useFilmStore from '../../store/filmStore';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';

// Admin page for managing films
const FilmsAdmin = () => {
  const [films, setFilms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    duration: '',
    description: '',
    status: 'now_playing',
    director: '',
    release_date: '',
    poster: ''
  });
  const { loading } = useFilmStore();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const nowPlayingResponse = await axiosClient.get('/films?status=now_playing');
      const comingSoonResponse = await axiosClient.get('/films?status=coming_soon');
      
      const nowPlaying = nowPlayingResponse.data.status === 'success' ? nowPlayingResponse.data.data.data || nowPlayingResponse.data.data : [];
      const comingSoon = comingSoonResponse.data.status === 'success' ? comingSoonResponse.data.data.data || comingSoonResponse.data.data : [];
      
      setFilms([...nowPlaying, ...comingSoon]);
    } catch (error) {
      console.error('Failed to fetch films:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const payload = {
        ...formData,
        duration: parseInt(formData.duration)
      };
      
      if (editingFilm) {
        const response = await axiosClient.put(`/films/${editingFilm.id}`, payload);
        if (response.data.status === 'success') {
          toast.success('Film updated successfully');
        }
      } else {
        const response = await axiosClient.post('/films', payload);
        if (response.data.status === 'success') {
          toast.success('Film created successfully');
        }
      }
      
      setShowForm(false);
      resetForm();
      fetchFilms();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save film');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (film) => {
    setEditingFilm(film);
    setFormData({
      title: film.title,
      genre: film.genre,
      duration: film.duration.toString(),
      description: film.description,
      status: film.status,
      director: film.director,
      release_date: film.release_date.split('T')[0],
      poster: film.poster || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (filmId) => {
    if (confirm('Are you sure you want to delete this film?')) {
      try {
        const response = await axiosClient.delete(`/films/${filmId}`);
        if (response.data.status === 'success') {
          toast.success('Film deleted successfully');
          fetchFilms();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete film');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      genre: '',
      duration: '',
      description: '',
      status: 'now_playing',
      director: '',
      release_date: '',
      poster: ''
    });
    setEditingFilm(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Films</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-accent text-primary font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Film
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingFilm ? 'Edit Film' : 'Add New Film'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                >
                  <option value="now_playing">Now Playing</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poster URL
              </label>
              <input
                type="url"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="bg-accent text-primary font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? 'Saving...' : (editingFilm ? 'Update' : 'Create')} Film
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Film
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {films.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No films available. Add some films to get started.
                  </td>
                </tr>
              ) : (
                films.map((film) => (
                  <tr key={film.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={film.poster || '/api/placeholder/50/75'}
                          alt={film.title}
                          className="w-12 h-18 object-cover rounded mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{film.title}</div>
                          <div className="text-sm text-gray-500">{film.director}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {film.genre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {film.duration} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        film.status === 'now_playing' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {film.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(film)}
                        className="text-accent hover:text-yellow-600 mr-3"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(film.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilmsAdmin;