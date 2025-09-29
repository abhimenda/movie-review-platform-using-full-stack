import dotenv from 'dotenv'
import { connectToDatabase } from '../utils/db.js'
import Movie from '../models/Movie.js'
import movies from './movies.json' assert { type: 'json' }

dotenv.config()

async function run() {
  await connectToDatabase()
  await Movie.deleteMany({})
  const created = await Movie.insertMany(movies)
  console.log(`Seeded ${created.length} movies`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})


