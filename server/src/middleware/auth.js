import { verifyAccessToken } from '../utils/jwt.js'

export function requireAuth(request, response, next) {
  const authorization = request.get('authorization')
  const [scheme, token] = authorization?.split(' ') ?? []

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({
      error: 'Authentication required. Send a Bearer token in the Authorization header.',
    })
  }

  try {
    const payload = verifyAccessToken(token)
    const userId = Number(payload.sub)

    if (!Number.isInteger(userId) || userId < 1 || !['attendee', 'organizer'].includes(payload.role)) {
      return response.status(401).json({ error: 'Invalid or expired access token.' })
    }

    request.user = {
      userId,
      email: payload.email,
      role: payload.role,
    }
    return next()
  } catch {
    return response.status(401).json({ error: 'Invalid or expired access token.' })
  }
}

export function allowRoles(...roles) {
  return (request, response, next) => {
    if (!request.user || !roles.includes(request.user.role)) {
      return response.status(403).json({ error: 'You do not have permission to access this resource.' })
    }

    return next()
  }
}
