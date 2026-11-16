import express from 'express'
import { pool } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import { getJwtSecret } from './utils/jwt.js'

const app = express()
const port = process.env.PORT || 5055

app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/api/health', async (_request, response) => {
  try {
    const result = await pool.query('SELECT NOW() AS database_time')

    response.status(200).json({
      status: 'ok',
      message: 'Database connected',
      databaseTime: result.rows[0].database_time,
    })
  } catch (error) {
    console.error('Database health check failed:', error.message)
    response.status(503).json({
      status: 'error',
      message: 'Database connection failed',
    })
  }
})

app.use((error, _request, response, _next) => {
  console.error('Request failed:', error.message)
  const status = error.status === 400 ? 400 : 500
  response.status(status).json({
    error: status === 400 ? 'The request body must contain valid JSON.' : 'An unexpected server error occurred.',
  })
})

async function startServer() {
  try {
    getJwtSecret()
    await pool.query('SELECT 1')
    app.listen(port, () => {
      console.log(`TIxora API is running at http://localhost:${port}`)
      console.log('PostgreSQL connection is ready.')
    })
  } catch (error) {
    console.error('Could not start TIxora API:', error.message)
    console.error('Check JWT_SECRET and DATABASE_URL in server/.env and try again.')
    await pool.end()
    process.exitCode = 1
  }
}

startServer()
