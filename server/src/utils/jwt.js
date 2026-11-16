import jwt from 'jsonwebtoken'

const JWT_EXPIRES_IN = '1h'

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET

  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set to a random value of at least 32 characters.')
  }

  return secret
}

export function createAccessToken(user) {
  return jwt.sign(
    { role: user.role, email: user.email },
    getJwtSecret(),
    { subject: String(user.user_id), expiresIn: JWT_EXPIRES_IN },
  )
}

export function verifyAccessToken(token) {
  return jwt.verify(token, getJwtSecret())
}
