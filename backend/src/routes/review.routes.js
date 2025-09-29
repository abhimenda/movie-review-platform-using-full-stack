import { Router } from 'express'
import Review from '../models/Review.js'
import Movie from '../models/Movie.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/reviews/:movieId
router.get('/:movieId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) { next(err) }
})

// POST /api/reviews/:movieId
router.post('/:movieId', requireAuth, async (req, res, next) => {
  try {
    const { rating, text } = req.body
    const movie = await Movie.findById(req.params.movieId)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })

    const review = await Review.create({
      movie: movie._id,
      user: req.user._id,
      rating,
      text,
    })

    // Update aggregates
    const stats = await Review.aggregate([
      { $match: { movie: movie._id } },
      { $group: { _id: '$movie', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ])
    if (stats.length) {
      movie.rating = Number(stats[0].avgRating.toFixed(1))
      movie.reviewCount = stats[0].count
      await movie.save()
    }

    res.status(201).json(review)
  } catch (err) { next(err) }
})

export default router


