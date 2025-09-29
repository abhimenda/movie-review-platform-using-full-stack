import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import { mockMovies } from '../data/mockData'

const ReviewForm = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const foundMovie = mockMovies.find(m => m.id === parseInt(movieId))
    setMovie(foundMovie)
    setLoading(false)
  }, [movieId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    
    if (!reviewText.trim()) {
      alert('Please write a review')
      return
    }

    setSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would submit to your backend here
    console.log('Review submitted:', {
      movieId: parseInt(movieId),
      rating,
      text: reviewText,
      userId: 1, // This would come from auth context
      date: new Date().toISOString().split('T')[0]
    })
    
    setSubmitting(false)
    navigate(`/movie/${movieId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to={`/movie/${movieId}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movie
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Write a Review</h1>
          <p className="text-gray-600 mb-8">Share your thoughts about "{movie.title}"</p>

          {/* Movie Info */}
          <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
            <img
              src={movie.poster || '/placeholder-movie.jpg'}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded mr-4"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x96?text=No+Image'
              }}
            />
            <div>
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-gray-600">{movie.year} • {movie.genre}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Rating *
              </label>
              <RatingStars
                rating={rating}
                interactive={true}
                onRatingChange={setRating}
                size="lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
              </p>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts about this movie. What did you like or dislike? How did it make you feel?"
                className="input-field h-32 resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {reviewText.length}/1000 characters
              </p>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Review Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about what you liked or didn't like</li>
                <li>• Avoid spoilers or use spoiler tags</li>
                <li>• Be respectful of other opinions</li>
                <li>• Consider the movie's genre and target audience</li>
              </ul>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting || rating === 0 || !reviewText.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Review'
                )}
              </button>
              <Link
                to={`/movie/${movieId}`}
                className="btn-secondary text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm

