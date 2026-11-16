import bcrypt from 'bcryptjs'
import { pool } from '../config/db.js'
import { createAccessToken } from '../utils/jwt.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_SIGNUP_ROLES = new Set(['attendee', 'organizer'])
const BCRYPT_ROUNDS = 12

function publicUser(user) {
  return {
    id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
  }
}

export async function register(request, response) {
  const name = typeof request.body?.name === 'string' ? request.body.name.trim() : ''
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const password = typeof request.body?.password === 'string' ? request.body.password : ''
  const requestedRole = typeof request.body?.role === 'string'
    ? request.body.role.trim().toLowerCase()
    : 'attendee'

  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({ error: 'Name must be between 2 and 80 characters.' })
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return response.status(400).json({ error: 'Enter a valid email address.' })
  }

  const passwordBytes = Buffer.byteLength(password, 'utf8')
  if (passwordBytes < 8 || passwordBytes > 72) {
    return response.status(400).json({ error: 'Password must be at least 8 characters and no more than 72 bytes.' })
  }

  if (!ALLOWED_SIGNUP_ROLES.has(requestedRole)) {
    return response.status(400).json({ error: 'Role must be attendee or organizer.' })
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, name, email, role, created_at`,
      [name, email, passwordHash, requestedRole],
    )
    const user = result.rows[0]

    return response.status(201).json({
      message: 'Account created successfully.',
      user: publicUser(user),
      token: createAccessToken(user),
    })
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({ error: 'An account with this email already exists.' })
    }

    throw error
  }
}

export async function login(request, response) {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const password = typeof request.body?.password === 'string' ? request.body.password : ''

  if (!email || !password) {
    return response.status(400).json({ error: 'Email and password are required.' })
  }

  const result = await pool.query(
    `SELECT user_id, name, email, password_hash, role, created_at
     FROM users
     WHERE email = $1`,
    [email],
  )
  const user = result.rows[0]

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return response.status(401).json({ error: 'Email or password is incorrect.' })
  }

  return response.status(200).json({
    message: 'Login successful.',
    user: publicUser(user),
    token: createAccessToken(user),
  })
}

export async function getCurrentUser(request, response) {
  const result = await pool.query(
    `SELECT user_id, name, email, role, created_at
     FROM users
     WHERE user_id = $1`,
    [request.user.userId],
  )
  const user = result.rows[0]

  if (!user) {
    return response.status(404).json({ error: 'Account not found.' })
  }

  return response.status(200).json({ user: publicUser(user) })
}
