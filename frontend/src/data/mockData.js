export { default as mockMovies } from './ogMovies.json'

export const mockReviews = [
  {
    id: 1,
    movieId: 1,
    userId: 1,
    userName: "MovieBuff2024",
    rating: 5,
    text: "Absolutely incredible! Heath Ledger's Joker is one of the greatest performances in cinema history. The action sequences are breathtaking and the story keeps you on the edge of your seat.",
    date: "2024-01-15"
  },
  {
    id: 2,
    movieId: 1,
    userId: 2,
    userName: "CinemaLover",
    rating: 4,
    text: "Great movie with amazing performances. The plot is complex but well-executed. Some scenes are a bit long but overall it's a masterpiece.",
    date: "2024-01-10"
  },
  {
    id: 3,
    movieId: 2,
    userId: 3,
    userName: "FilmCritic",
    rating: 5,
    text: "Mind-bending masterpiece! Christopher Nolan outdid himself with this one. The concept is brilliant and the execution is flawless.",
    date: "2024-01-20"
  },
  {
    id: 4,
    movieId: 3,
    userId: 4,
    userName: "ClassicMovieFan",
    rating: 5,
    text: "Tarantino at his finest! The dialogue is sharp, the characters are memorable, and the non-linear storytelling is genius.",
    date: "2024-01-18"
  }
]

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://via.placeholder.com/150?text=JD",
  joinDate: "2023-06-15",
  reviewCount: 25,
  favoriteGenres: ["Action", "Drama", "Sci-Fi"]
}

export const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
  "Romance", "Sci-Fi", "Thriller", "War", "Western"
]
