import { pool } from '../config/db.js'

const EVENT_SELECT = `
  SELECT e.event_id, e.organizer_id, e.title, e.description, e.venue, e.city,
         e.starts_at, e.image_url, e.status, e.created_at,
         COALESCE(t.ticket_capacity, 0)::int AS ticket_capacity,
         COALESCE(t.tickets_sold, 0)::int AS tickets_sold,
         COALESCE(t.ticket_price, 0)::numeric AS ticket_price
  FROM events e
  LEFT JOIN LATERAL (
    SELECT SUM(total_quantity) AS ticket_capacity,
           SUM(sold_quantity) AS tickets_sold,
           MIN(price) AS ticket_price
    FROM ticket_types
    WHERE event_id = e.event_id
  ) t ON TRUE
`

const EVENT_FIELDS = ['title', 'description', 'venue', 'city', 'startsAt', 'imageUrl', 'ticketCapacity', 'ticketPrice', 'status']

function validateEventInput(body, { partial = false } = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Send event details as a JSON object.' }
  }

  const values = {}
  const errors = []
  const requiredFields = ['title', 'description', 'venue', 'city', 'startsAt', 'ticketCapacity']

  if (partial && !EVENT_FIELDS.some((field) => Object.hasOwn(body, field))) {
    return { error: 'Provide at least one event field to update.' }
  }

  for (const field of requiredFields) {
    if (!partial || Object.hasOwn(body, field)) {
      if (typeof body[field] !== 'string' && field !== 'ticketCapacity') {
        errors.push(`${field} must be a string.`)
      }
    }
  }

  const textRules = [
    ['title', 'Title', 3, 150],
    ['description', 'Description', 1, 5000],
    ['venue', 'Venue', 1, 200],
    ['city', 'City', 1, 100],
  ]
  for (const [field, label, min, max] of textRules) {
    if (partial && !Object.hasOwn(body, field)) continue
    if (typeof body[field] !== 'string') continue
    const value = body[field].trim()
    if (value.length < min || value.length > max) errors.push(`${label} must be ${min === 1 ? 'between 1' : `between ${min}`} and ${max} characters.`)
    else values[field] = value
  }

  if (!partial || Object.hasOwn(body, 'startsAt')) {
    const date = typeof body.startsAt === 'string' ? new Date(body.startsAt) : new Date(Number.NaN)
    if (Number.isNaN(date.getTime())) errors.push('startsAt must be a valid date and time.')
    else values.startsAt = date.toISOString()
  }

  if (!partial || Object.hasOwn(body, 'ticketCapacity')) {
    const capacity = Number(body.ticketCapacity)
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000000) {
      errors.push('ticketCapacity must be a whole number between 1 and 1,000,000.')
    } else {
      values.ticketCapacity = capacity
    }
  }

  if (Object.hasOwn(body, 'ticketPrice')) {
    const price = Number(body.ticketPrice)
    if (!Number.isFinite(price) || price < 0 || price > 10000000) errors.push('ticketPrice must be between 0 and 10,000,000.')
    else values.ticketPrice = price
  }

  if (Object.hasOwn(body, 'status')) {
    if (!['draft', 'published'].includes(body.status)) errors.push('status must be either draft or published.')
    else values.status = body.status
  }

  if (!partial || Object.hasOwn(body, 'imageUrl')) {
    if (body.imageUrl === undefined || body.imageUrl === null || body.imageUrl === '') {
      values.imageUrl = null
    } else if (typeof body.imageUrl !== 'string') {
      errors.push('imageUrl must be a valid HTTP or HTTPS URL.')
    } else {
      try {
        const imageUrl = new URL(body.imageUrl)
        if (!['http:', 'https:'].includes(imageUrl.protocol)) throw new Error('Unsupported protocol')
        values.imageUrl = imageUrl.toString()
      } catch {
        errors.push('imageUrl must be a valid HTTP or HTTPS URL.')
      }
    }
  }

  return errors.length ? { error: errors.join(' ') } : { values }
}

function eventResponse(row) {
  return {
    id: row.event_id,
    organizerId: row.organizer_id,
    title: row.title,
    description: row.description,
    venue: row.venue,
    city: row.city,
    startsAt: row.starts_at,
    imageUrl: row.image_url,
    status: row.status,
    ticketCapacity: row.ticket_capacity,
    ticketsSold: row.tickets_sold,
    ticketsAvailable: Math.max(0, row.ticket_capacity - row.tickets_sold),
    ticketPrice: Number(row.ticket_price),
    createdAt: row.created_at,
  }
}

function parseEventId(value) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

export async function listOrganizerEvents(request, response) {
  const result = await pool.query(
    `${EVENT_SELECT}
     WHERE e.organizer_id = $1
     ORDER BY e.starts_at ASC, e.event_id ASC`,
    [request.user.userId],
  )
  return response.status(200).json({ events: result.rows.map(eventResponse) })
}

export async function getOrganizerEvent(request, response) {
  const eventId = parseEventId(request.params.eventId)
  if (!eventId) return response.status(400).json({ error: 'Event ID must be a positive whole number.' })

  const result = await pool.query(
    `${EVENT_SELECT} WHERE e.event_id = $1 AND e.organizer_id = $2`,
    [eventId, request.user.userId],
  )
  if (result.rowCount === 0) return response.status(404).json({ error: 'Event not found.' })
  return response.status(200).json({ event: eventResponse(result.rows[0]) })
}

export async function createOrganizerEvent(request, response) {
  const validation = validateEventInput(request.body)
  if (validation.error) return response.status(400).json({ error: validation.error })
  const value = validation.values
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const eventResult = await client.query(
      `INSERT INTO events (organizer_id, title, description, venue, city, starts_at, image_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING event_id`,
      [request.user.userId, value.title, value.description, value.venue, value.city, value.startsAt, value.imageUrl, value.status ?? 'draft'],
    )
    const eventId = eventResult.rows[0].event_id
    await client.query(
      `INSERT INTO ticket_types (event_id, name, price, total_quantity)
       VALUES ($1, 'General Admission', $2, $3)`,
      [eventId, value.ticketPrice ?? 0, value.ticketCapacity],
    )
    await client.query('COMMIT')

    const result = await pool.query(`${EVENT_SELECT} WHERE e.event_id = $1`, [eventId])
    return response.status(201).json({ message: 'Event created.', event: eventResponse(result.rows[0]) })
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {})
    throw error
  } finally {
    client.release()
  }
}

export async function updateOrganizerEvent(request, response) {
  const eventId = parseEventId(request.params.eventId)
  if (!eventId) return response.status(400).json({ error: 'Event ID must be a positive whole number.' })
  const validation = validateEventInput(request.body, { partial: true })
  if (validation.error) return response.status(400).json({ error: validation.error })
  const value = validation.values
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const existing = await client.query(
      `SELECT event_id FROM events
       WHERE event_id = $1 AND organizer_id = $2 AND status <> 'cancelled'
       FOR UPDATE`,
      [eventId, request.user.userId],
    )
    if (existing.rowCount === 0) {
      await client.query('ROLLBACK')
      return response.status(404).json({ error: 'Event not found.' })
    }

    const columns = {
      title: 'title', description: 'description', venue: 'venue', city: 'city',
      startsAt: 'starts_at', imageUrl: 'image_url', status: 'status',
    }
    const assignments = []
    const parameters = []
    for (const [field, column] of Object.entries(columns)) {
      if (Object.hasOwn(value, field)) {
        parameters.push(value[field])
        assignments.push(`${column} = $${parameters.length}`)
      }
    }
    if (assignments.length > 0) {
      parameters.push(eventId, request.user.userId)
      await client.query(
        `UPDATE events SET ${assignments.join(', ')}
         WHERE event_id = $${parameters.length - 1} AND organizer_id = $${parameters.length}`,
        parameters,
      )
    }

    if (Object.hasOwn(value, 'ticketCapacity') || Object.hasOwn(value, 'ticketPrice')) {
      const ticketTypes = await client.query(
        `SELECT ticket_type_id, sold_quantity, total_quantity, price
         FROM ticket_types WHERE event_id = $1 FOR UPDATE`,
        [eventId],
      )
      const capacity = value.ticketCapacity ?? ticketTypes.rows.reduce((sum, type) => sum + type.total_quantity, 0)
      const price = value.ticketPrice
      for (const type of ticketTypes.rows) {
        const typeCapacity = ticketTypes.rowCount === 1 ? capacity : type.total_quantity
        if (typeCapacity < type.sold_quantity) {
          await client.query('ROLLBACK')
          return response.status(409).json({ error: 'Ticket capacity cannot be lower than the number already sold.' })
        }
        await client.query(
          `UPDATE ticket_types SET total_quantity = $1, price = COALESCE($2, price)
           WHERE ticket_type_id = $3`,
          [typeCapacity, price ?? null, type.ticket_type_id],
        )
      }
    }

    await client.query('COMMIT')
    const result = await pool.query(`${EVENT_SELECT} WHERE e.event_id = $1 AND e.organizer_id = $2`, [eventId, request.user.userId])
    return response.status(200).json({ message: 'Event updated.', event: eventResponse(result.rows[0]) })
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {})
    throw error
  } finally {
    client.release()
  }
}

export async function cancelOrganizerEvent(request, response) {
  const eventId = parseEventId(request.params.eventId)
  if (!eventId) return response.status(400).json({ error: 'Event ID must be a positive whole number.' })

  const result = await pool.query(
    `UPDATE events SET status = 'cancelled'
     WHERE event_id = $1 AND organizer_id = $2 AND status <> 'cancelled'
     RETURNING event_id`,
    [eventId, request.user.userId],
  )
  if (result.rowCount === 0) return response.status(404).json({ error: 'Event not found or already cancelled.' })
  return response.status(200).json({ message: 'Event cancelled.', eventId: result.rows[0].event_id })
}
