import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number },
    genre: { type: String },
    rating: { type: Number, default: 0 },
    poster: { type: String },
    description: { type: String },
    director: { type: String },
    cast: [{ type: String }],
    trailer: { type: String },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Movie', movieSchema)


