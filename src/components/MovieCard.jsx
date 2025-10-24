import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';

// Movie card component for displaying movie information
const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={movie.poster || '/api/placeholder/300/400'}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            movie.status === 'now_playing' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {movie.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{movie.genre}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Clock size={16} className="mr-1" />
          <span>{movie.duration} min</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar size={16} className="mr-1" />
          <span>{new Date(movie.release_date).toLocaleDateString('id-ID')}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {movie.description}
        </p>
        
        <Link
          to={`/movies/${movie.id}`}
          className="w-full bg-accent text-primary font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;