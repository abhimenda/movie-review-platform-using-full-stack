import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import { mockMovies } from '../data/mockData'

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])

  useEffect(() => {
  
    const featured = mockMovies.slice(0, 3)
    const trending = mockMovies.slice(3, 6)
    setFeaturedMovies(featured)
    setTrendingMovies(trending)
  }, [])

  return (
    <div className="min-h-screen">
      {}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Movies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Read reviews, share your thoughts, and find your next favorite film
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/movies" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Browse Movies
            </a>
            <a href="/profile" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
              Join Community
            </a>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Movies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Trending Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">10,000+</h3>
              <p className="text-primary-100">Movies Reviewed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-primary-100">Community Members</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">1M+</h3>
              <p className="text-primary-100">Reviews Written</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home


