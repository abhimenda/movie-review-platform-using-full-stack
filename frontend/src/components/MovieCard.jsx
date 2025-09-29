import { Link } from 'react-router-dom'
import RatingStars from './RatingStars'

const MovieCard = ({ movie }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <Link to={`/movie/${movie.id}`}>
        <div className="aspect-w-2 aspect-h-3">
          <img
            src={movie.poster || '/placeholder-movie.jpg'}
            alt={movie.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center justify-between mb-2">
            <RatingStars rating={movie.rating} />
            <span className="text-sm text-gray-500">{movie.year}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{movie.genre}</p>
          {movie.reviewCount && (
            <p className="text-xs text-gray-500 mt-2">
              {movie.reviewCount} review{movie.reviewCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}

export default MovieCard

