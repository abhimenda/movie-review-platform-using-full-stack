import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieListing from './pages/MovieListing'
import MovieDetails from './pages/MovieDetails'
import ReviewForm from './pages/ReviewForm'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieListing />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/review/:movieId" element={<ReviewForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

