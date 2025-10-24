import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import useFilmStore from '../../store/filmStore';
import useAuthStore from '../../store/authStore';
import { formatCurrency } from '../../utils/formatCurrency';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const { currentMovie, schedules, loading, getMovie, getSchedules } = useFilmStore();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (id) {
      getMovie(id);
      getSchedules(id);
    }
  }, [id, getMovie, getSchedules]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate && id) {
      getSchedules(id, selectedDate);
    }
  }, [selectedDate, id, getSchedules]);

  const handleBooking = (scheduleId) => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${scheduleId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Movie not found</h3>
        <button
          onClick={() => navigate('/movies')}
          className="text-accent hover:text-yellow-600"
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/movies')}
        className="flex items-center text-accent hover:text-yellow-600 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Movies
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={currentMovie.poster || '/api/placeholder/400/600'}
              alt={currentMovie.title}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{currentMovie.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentMovie.status === 'now_playing' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {currentMovie.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-lg text-gray-700">{currentMovie.genre}</p>
              
              <div className="flex items-center text-gray-600">
                <Clock size={20} className="mr-2" />
                <span>{currentMovie.duration} minutes</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar size={20} className="mr-2" />
                <span>Released: {new Date(currentMovie.release_date).toLocaleDateString('id-ID')}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <User size={20} className="mr-2" />
                <span>Director: {currentMovie.director}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed">{currentMovie.description}</p>
            </div>
          </div>
        </div>
      </div>

      {currentMovie.status === 'now_playing' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
          
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-accent focus:border-accent"
            />
          </div>

          {schedules.length === 0 ? (
            <p className="text-gray-600 text-center">No showtimes available for the selected date.</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {schedules.map((schedule) => (
                  <button
                    key={schedule.id}
                    onClick={() => handleBooking(schedule.id)}
                    className="bg-white border border-gray-300 rounded-xl p-3 w-36 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="font-semibold text-lg text-gray-900">{schedule.time}</div>
                    <div className="text-sm text-gray-600 mt-1">{schedule.studio?.name}</div>
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {formatCurrency(schedule.price)}
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;