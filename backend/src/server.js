import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectToDatabase } from './utils/db.js'
import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import reviewRoutes from './routes/review.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/users', userRoutes)


app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({ message: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 4001

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to database', err)
    process.exit(1)
  })



