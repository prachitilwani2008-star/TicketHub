import 'dotenv/config'
import { pool } from '../config/db.js'

try {
  const result = await pool.query('SELECT NOW() AS database_time')
  console.log('PostgreSQL connection successful.')
  console.log(`Database time: ${result.rows[0].database_time}`)
} catch (error) {
  console.error('PostgreSQL connection failed:', error.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
