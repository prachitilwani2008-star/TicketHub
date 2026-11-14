import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { pool } from '../config/db.js'

const schemaUrl = new URL('../../sql/schema.sql', import.meta.url)
const schema = await readFile(schemaUrl, 'utf8')
const client = await pool.connect()

try {
  await client.query('BEGIN')
  await client.query(schema)
  await client.query('COMMIT')
  console.log('TicketHub tables and indexes are ready.')
} catch (error) {
  await client.query('ROLLBACK')
  console.error('Could not apply the TicketHub schema:', error.message)
  process.exitCode = 1
} finally {
  client.release()
  await pool.end()
}
