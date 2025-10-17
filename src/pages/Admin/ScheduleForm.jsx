import React, { useState, useEffect } from 'react';

export default function ScheduleForm({ schedule, films, prices, onSave, onCancel, loading }) {
  const [formData, setFormData] = useState({
    film_id: '',
    studio_id: '1',
    date: '',
    time: '',
    price_id: ''
  });

  const studios = [
    { id: 1, name: 'Studio 1' },
    { id: 2, name: 'Studio 2' },
    { id: 3, name: 'Studio 3' }
  ];

  useEffect(() => {
    if (schedule) {
      setFormData({
        film_id: schedule.film_id || '',
        studio_id: schedule.studio_id || '1',
        date: schedule.date || '',
        time: schedule.time || '',
        price_id: schedule.price_id || ''
      });
    } else {
      setFormData({
        film_id: '',
        studio_id: '1',
        date: '',
        time: '',
        price_id: ''
      });
    }
  }, [schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">
          {schedule ? 'Edit Schedule' : 'Add New Schedule'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="film_id"
            value={formData.film_id}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="">Select Movie</option>
            {films.map(film => (
              <option key={film.id} value={film.id}>{film.title}</option>
            ))}
          </select>
          
          <select
            name="studio_id"
            value={formData.studio_id}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            {studios.map(studio => (
              <option key={studio.id} value={studio.id}>{studio.name}</option>
            ))}
          </select>
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
          
          <select
            name="price_id"
            value={formData.price_id}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="">Select Price Category</option>
            {prices.map(price => (
              <option key={price.id} value={price.id}>{price.category}</option>
            ))}
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