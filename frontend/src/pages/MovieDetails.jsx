import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import { mockMovies, mockReviews } from '../data/mockData'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const foundMovie = mockMovies.find(m => m.id === parseInt(id))
    const movieReviews = mockReviews.filter(r => r.movieId === parseInt(id))
    
    setMovie(foundMovie)
    setReviews(movieReviews)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Movie not found</h1>
          <Link to="/movies" className="btn-primary">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/movies" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </Link>

        {/* Movie Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.poster || '/placeholder-movie.jpg'}
                alt={movie.title}
                className="w-full h-96 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=No+Image'
                }}
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{movie.title}</h1>
              
              <div className="flex items-center mb-4">
                <RatingStars rating={movie.rating} size="lg" />
                <span className="ml-4 text-lg text-gray-600">
                  {movie.rating}/5 ({movie.reviewCount} reviews)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700">Year</h3>
                  <p className="text-gray-600">{movie.year}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Genre</h3>
                  <p className="text-gray-600">{movie.genre}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Director</h3>
                  <p className="text-gray-600">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Reviews</h3>
                  <p className="text-gray-600">{movie.reviewCount}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/review/${movie.id}`}
                  className="btn-primary text-center"
                >
                  Write a Review
                </Link>
                <button className="btn-secondary">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
          <p className="text-gray-700 leading-relaxed">{movie.description}</p>
        </div>

        {/* Cast */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movie.cast.map((actor, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {actor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{actor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trailer */}
        {movie.trailer && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                className="w-full h-64 md:h-96 rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reviews ({reviews.length})
            </h2>
            <Link
              to={`/review/${movie.id}`}
              className="btn-primary"
            >
              Write Review
            </Link>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-600 font-semibold">
                          {review.userName[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No reviews yet. Be the first to review this movie!</p>
              <Link to={`/review/${movie.id}`} className="btn-primary">
                Write the First Review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails

