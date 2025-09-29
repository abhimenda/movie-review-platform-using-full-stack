import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret')
    const user = await User.findById(payload.sub)
    if (!user) return res.status(401).json({ message: 'Unauthorized' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export function generateToken(user) {
  const payload = { sub: user._id.toString(), email: user.email }
  return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
}


