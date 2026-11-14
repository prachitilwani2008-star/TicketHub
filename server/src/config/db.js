import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is missing. Copy server/.env.example to server/.env and set your PostgreSQL connection URL.',
  )
}

export const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 5000,
})

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error.message)
})
