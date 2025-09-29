import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import { mockUser, mockReviews, mockMovies } from '../data/mockData'

const Profile = () => {
  const [user, setUser] = useState(mockUser)
  const [userReviews, setUserReviews] = useState([])
  const [likedMovies, setLikedMovies] = useState([])

  useEffect(() => {
    // Simulate getting user data
    const reviews = mockReviews.filter(review => review.userId === user.id)
    const liked = mockMovies.slice(0, 5) // Simulate liked movies
    
    setUserReviews(reviews)
    setLikedMovies(liked)
  }, [user.id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-full h-full rounded-full bg-primary-600 flex items-center justify-center text-white text-4xl font-bold" style={{display: 'none'}}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <p className="text-sm text-gray-500 mb-6">
                Member since {formatDate(user.joinDate)}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{user.reviewCount}</div>
                  <div className="text-sm text-gray-500">Reviews Written</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{likedMovies.length}</div>
                  <div className="text-sm text-gray-500">Movies Liked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{user.favoriteGenres.length}</div>
                  <div className="text-sm text-gray-500">Favorite Genres</div>
                </div>
              </div>

              {/* Favorite Genres */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {user.favoriteGenres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Reviews</h2>
              <Link to="/movies" className="text-primary-600 hover:text-primary-700 text-sm">
                View All
              </Link>
            </div>
            
            {userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.slice(0, 3).map((review) => {
                  const movie = mockMovies.find(m => m.id === review.movieId)
                  return (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start">
                        <img
                          src={movie?.poster || '/placeholder-movie.jpg'}
                          alt={movie?.title}
                          className="w-12 h-16 object-cover rounded mr-3"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48x64?text=No+Image'
                          }}
                        />
                        <div className="flex-1">
                          <Link
                            to={`/movie/${movie?.id}`}
                            className="font-semibold text-gray-900 hover:text-primary-600"
                          >
                            {movie?.title}
                          </Link>
                          <div className="flex items-center mt-1 mb-2">
                            <RatingStars rating={review.rating} size="sm" />
                            <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet</p>
                <Link to="/movies" className="btn-primary">
                  Write Your First Review
                </Link>
              </div>
            )}
          </div>

          {/* Liked Movies */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Liked Movies</h2>
              <Link to="/movies" className="text-primary-600 hover:text-primary-700 text-sm">
                Browse More
              </Link>
            </div>
            
            {likedMovies.length > 0 ? (
              <div className="space-y-4">
                {likedMovies.map((movie) => (
                  <div key={movie.id} className="flex items-center">
                    <Link to={`/movie/${movie.id}`} className="flex items-center flex-1">
                      <img
                        src={movie.poster || '/placeholder-movie.jpg'}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded mr-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x64?text=No+Image'
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 hover:text-primary-600">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-gray-600">{movie.year}</p>
                        <div className="flex items-center mt-1">
                          <RatingStars rating={movie.rating} size="sm" />
                        </div>
                      </div>
                    </Link>
                    <button className="text-red-500 hover:text-red-700 ml-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No liked movies yet</p>
                <Link to="/movies" className="btn-primary">
                  Discover Movies
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 text-center">
          <button className="btn-secondary">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile

