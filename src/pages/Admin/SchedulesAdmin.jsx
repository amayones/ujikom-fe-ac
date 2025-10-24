import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import useScheduleStore from '../../store/scheduleStore';
import axiosClient from '../../api/axiosClient';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/formatCurrency';

// Admin page for managing schedules with constraints
const SchedulesAdmin = () => {
  const { 
    schedules, 
    availableStudios, 
    loading, 
    getSchedules, 
    getAvailableStudios, 
    createSchedule, 
    updateSchedule, 
    deleteSchedule,
    clearAvailableStudios 
  } = useScheduleStore();
  
  const [films, setFilms] = useState([]);
  const [allStudios, setAllStudios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [formData, setFormData] = useState({
    film_id: '',
    studio_id: '',
    date: '',
    time: '',
    price: '50000'
  });
  const [scheduleCount, setScheduleCount] = useState(0);

  useEffect(() => {
    getSchedules();
    fetchFilms();
    fetchStudios();
  }, []);

  // Watch for film_id and date changes to get available studios
  useEffect(() => {
    if (formData.film_id && formData.date) {
      getAvailableStudios(formData.film_id, formData.date);
      checkScheduleCount(formData.film_id, formData.date);
    } else {
      clearAvailableStudios();
      setScheduleCount(0);
    }
  }, [formData.film_id, formData.date]);

  // Watch for time changes to validate conflicts
  useEffect(() => {
    if (formData.studio_id && formData.date && formData.time) {
      checkTimeConflicts(formData.studio_id, formData.date, formData.time);
    }
  }, [formData.studio_id, formData.date, formData.time]);

  const checkScheduleCount = async (filmId, date) => {
    try {
      const response = await axiosClient.get(`/schedules?film_id=${filmId}&date=${date}`);
      if (response.data.status === 'success') {
        setScheduleCount(response.data.data.length);
      }
    } catch (error) {
      console.error('Failed to check schedule count:', error);
    }
  };

  const checkTimeConflicts = async (studioId, date, time) => {
    try {
      // This will be validated on backend, but we can add frontend preview
      const response = await axiosClient.get(`/schedules?studio_id=${studioId}&date=${date}`);
      if (response.data.status === 'success') {
        const existingSchedules = response.data.data;
        const conflicts = existingSchedules.filter(schedule => {
          const existingTime = schedule.time;
          const timeDiff = Math.abs(
            (parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])) -
            (parseInt(existingTime.split(':')[0]) * 60 + parseInt(existingTime.split(':')[1]))
          );
          return timeDiff < 150; // Less than 2.5 hours
        });
        
        if (conflicts.length > 0) {
          toast.warning(`Peringatan: Jadwal mungkin bentrok dengan ${conflicts[0].film?.title} pada ${conflicts[0].time}`);
        }
      }
    } catch (error) {
      console.error('Failed to check time conflicts:', error);
    }
  };

  const fetchFilms = async () => {
    try {
      const response = await axiosClient.get('/films');
      if (response.data.status === 'success') {
        setFilms(response.data.data.data || response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch films:', error);
    }
  };

  const fetchStudios = async () => {
    try {
      const response = await axiosClient.get('/studios');
      if (response.data.status === 'success') {
        setAllStudios(response.data.data);
      }
    } catch (error) {
      // Fallback data
      setAllStudios([
        { id: 1, name: 'Studio 1' },
        { id: 2, name: 'Studio 2' },
        { id: 3, name: 'Studio 3' }
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      film_id: parseInt(formData.film_id),
      studio_id: parseInt(formData.studio_id),
      price: parseFloat(formData.price)
    };

    let result;
    if (editingSchedule) {
      result = await updateSchedule(editingSchedule.id, payload);
    } else {
      result = await createSchedule(payload);
    }

    if (result.success) {
      setShowForm(false);
      resetForm();
    }
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      film_id: schedule.film_id.toString(),
      studio_id: schedule.studio_id.toString(),
      date: schedule.date.split('T')[0],
      time: schedule.time,
      price: schedule.price.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (scheduleId) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      await deleteSchedule(scheduleId);
    }
  };

  const resetForm = () => {
    setFormData({
      film_id: '',
      studio_id: '',
      date: '',
      time: '',
      price: '50000'
    });
    setEditingSchedule(null);
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Schedules</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-accent text-primary font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Schedule
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Film
                </label>
                <select
                  name="film_id"
                  value={formData.film_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Film</option>
                  {films.map((film) => (
                    <option key={film.id} value={film.id}>
                      {film.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Studio
                </label>
                <select
                  name="studio_id"
                  value={formData.studio_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Studio</option>
                  {availableStudios.map((studio) => (
                    <option key={studio.id} value={studio.id}>
                      {studio.name}
                    </option>
                  ))}
                </select>
                {formData.film_id && formData.date && availableStudios.length === 0 && (
                  <p className="text-sm text-red-600 mt-1">
                    <AlertTriangle size={16} className="inline mr-1" />
                    No available studios for this film on selected date
                  </p>
                )}
                {scheduleCount >= 3 && !editingSchedule && (
                  <p className="text-sm text-orange-600 mt-1">
                    <AlertTriangle size={16} className="inline mr-1" />
                    Maximum 3 schedules per day reached for this film
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">09:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                  <option value="17:00">17:00</option>
                  <option value="19:00">19:00</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
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
                disabled={loading || (scheduleCount >= 3 && !editingSchedule) || (formData.film_id && formData.date && availableStudios.length === 0)}
                className="bg-accent text-primary font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingSchedule ? 'Update' : 'Create')} Schedule
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
                  Studio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No schedules available. Add some schedules to get started.
                  </td>
                </tr>
              ) : (
                schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {schedule.film?.title || 'Unknown Film'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.studio?.name || 'Unknown Studio'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{new Date(schedule.date).toLocaleDateString('id-ID')}</div>
                      <div className="text-gray-500">{schedule.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(schedule.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="text-accent hover:text-yellow-600 mr-3"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
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

export default SchedulesAdmin;