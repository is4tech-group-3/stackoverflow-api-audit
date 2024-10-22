import jwt from 'jsonwebtoken'

export const token = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  const secretKey = Buffer.from(process.env.JWT_SECRET, 'base64')

  if (!token) {
    return res.status(403).json({ message: 'Token is required' })
  }

  try {
    const { roles } = jwt.verify(token, secretKey, { algorithms: ['HS256'] })
    if (!roles.includes('ROLE_AUDIT') && !roles.includes('ROLE_ADMIN')) {
      return res.status(403).json({ message: 'You do not have permission to access this resource' })
    }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(401).send({ message: 'Token expired' })

    if (error.name === 'JsonWebTokenError') return res.status(401).send({ message: 'Token invalid' })

    if (error.name === 'SyntaxError') return res.status(401).send({ message: 'Token malformated' })
    return res.status(500).send({ message: 'Unknown error', error })
  }
}
