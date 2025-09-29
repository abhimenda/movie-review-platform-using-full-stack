import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { mockMovies, genres } from '../data/mockData'

const MovieListing = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState(mockMovies)
  const [filteredMovies, setFilteredMovies] = useState(mockMovies)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '')
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || '')
  const [minRating, setMinRating] = useState(searchParams.get('rating') || '')

  useEffect(() => {
    filterMovies()
  }, [searchTerm, selectedGenre, selectedYear, minRating])

  const filterMovies = () => {
    let filtered = movies

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenre) {
      filtered = filtered.filter(movie =>
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      )
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(movie => movie.year.toString() === selectedYear)
    }

    // Rating filter
    if (minRating) {
      filtered = filtered.filter(movie => movie.rating >= parseFloat(minRating))
    }

    setFilteredMovies(filtered)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const newParams = new URLSearchParams()
    if (searchTerm) newParams.set('search', searchTerm)
    if (selectedGenre) newParams.set('genre', selectedGenre)
    if (selectedYear) newParams.set('year', selectedYear)
    if (minRating) newParams.set('rating', minRating)
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedGenre('')
    setSelectedYear('')
    setMinRating('')
    setSearchParams({})
  }

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Movies</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Movies
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or genre..."
                className="input-field"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <select
                  id="genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  id="rating"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="input-field"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="submit" className="btn-primary">
                Apply Filters
              </button>
              <button type="button" onClick={clearFilters} className="btn-secondary">
                Clear All
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or clear the filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieListing

