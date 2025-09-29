import { Router } from 'express'
import Movie from '../models/Movie.js'

const router = Router()

// GET /api/movies
router.get('/', async (req, res, next) => {
  try {
    const { search, genre, year, rating, page = 1, limit = 20 } = req.query
    const query = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ]
    }
    if (genre) query.genre = { $regex: genre, $options: 'i' }
    if (year) query.year = Number(year)
    if (rating) query.rating = { $gte: Number(rating) }

    const skip = (Number(page) - 1) * Number(limit)
    const [items, total] = await Promise.all([
      Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Movie.countDocuments(query),
    ])
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) { next(err) }
})

// GET /api/movies/:id
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ message: 'Not found' })
    res.json(movie)
  } catch (err) { next(err) }
})

export default router


