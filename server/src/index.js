import express from 'express'
import { pool } from './config/db.js'

const app = express()
const port = process.env.PORT || 5055

app.use(express.json())

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

async function startServer() {
  try {
    await pool.query('SELECT 1')
    app.listen(port, () => {
      console.log(`TicketHub API is running at http://localhost:${port}`)
      console.log('PostgreSQL connection is ready.')
    })
  } catch (error) {
    console.error('Could not connect to PostgreSQL:', error.message)
    console.error('Check DATABASE_URL in server/.env and try again.')
    await pool.end()
    process.exitCode = 1
  }
}

startServer()
