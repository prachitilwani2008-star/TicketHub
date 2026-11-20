import { randomBytes, randomUUID } from 'node:crypto'
import { pool } from '../config/db.js'

function parsePositiveInteger(value) {
  const parsed = Number(value)
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null
}

export async function createBooking(request, response) {
  const eventId = parsePositiveInteger(request.body?.eventId)
  const ticketTypeId = parsePositiveInteger(request.body?.ticketTypeId)
  const quantity = request.body?.quantity

  if (!eventId) return response.status(400).json({ error: 'eventId must be a positive whole number.' })
  if (!ticketTypeId) return response.status(400).json({ error: 'ticketTypeId must be a positive whole number.' })
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return response.status(400).json({ error: 'Choose between 1 and 10 tickets per booking.' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Locking the event serializes reservations across all ticket types for it.
    const eventResult = await client.query(
      `SELECT event_id, title, starts_at
       FROM events
       WHERE event_id = $1 AND status = 'published' AND starts_at > NOW()
       FOR UPDATE`,
      [eventId],
    )
    if (eventResult.rowCount === 0) {
      await client.query('ROLLBACK')
      return response.status(404).json({ error: 'This event is unavailable for booking.' })
    }

    const ticketResult = await client.query(
      `SELECT ticket_type_id, name, price, total_quantity, sold_quantity
       FROM ticket_types
       WHERE ticket_type_id = $1 AND event_id = $2
       FOR UPDATE`,
      [ticketTypeId, eventId],
    )
    if (ticketResult.rowCount === 0) {
      await client.query('ROLLBACK')
      return response.status(404).json({ error: 'The selected ticket type was not found for this event.' })
    }

    const ticketType = ticketResult.rows[0]
    const available = ticketType.total_quantity - ticketType.sold_quantity
    if (quantity > available) {
      await client.query('ROLLBACK')
      return response.status(409).json({
        error: available === 0 ? 'This ticket type is sold out.' : `Only ${available} ticket${available === 1 ? '' : 's'} remain.`,
        ticketsAvailable: available,
      })
    }

    const reference = `TIX-${randomBytes(6).toString('hex').toUpperCase()}`
    const bookingResult = await client.query(
      `INSERT INTO bookings (attendee_id, event_id, ticket_type_id, quantity, booking_reference, status)
       VALUES ($1, $2, $3, $4, $5, 'confirmed')
       RETURNING booking_id, booking_reference, status, created_at`,
      [request.user.userId, eventId, ticketTypeId, quantity, reference],
    )
    const booking = bookingResult.rows[0]

    await client.query(
      `UPDATE ticket_types
       SET sold_quantity = sold_quantity + $1
       WHERE ticket_type_id = $2`,
      [quantity, ticketTypeId],
    )

    const qrTokens = Array.from({ length: quantity }, () => randomUUID())
    const ticketResultCreated = await client.query(
      `INSERT INTO tickets (booking_id, qr_token)
       SELECT $1, token::uuid FROM unnest($2::text[]) AS tokens(token)
       RETURNING ticket_id`,
      [booking.booking_id, qrTokens],
    )

    await client.query('COMMIT')
    return response.status(201).json({
      message: 'Tickets reserved successfully.',
      booking: {
        id: booking.booking_id,
        reference: booking.booking_reference,
        status: booking.status,
        eventId,
        eventTitle: eventResult.rows[0].title,
        ticketType: ticketType.name,
        quantity,
        unitPrice: Number(ticketType.price),
        totalPrice: Number(ticketType.price) * quantity,
        createdAt: booking.created_at,
        ticketsCreated: ticketResultCreated.rowCount,
      },
    })
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {})
    if (error.code === '23505') return response.status(409).json({ error: 'Please retry your booking.' })
    throw error
  } finally {
    client.release()
  }
}

export async function listMyBookings(request, response) {
  const result = await pool.query(
    `SELECT b.booking_id, b.booking_reference, b.status, b.quantity, b.created_at,
            e.event_id, e.title AS event_title, e.venue, e.city, e.starts_at,
            tt.name AS ticket_type, tt.price AS unit_price,
            COUNT(t.ticket_id)::int AS ticket_count
     FROM bookings b
     JOIN events e ON e.event_id = b.event_id
     JOIN ticket_types tt ON tt.ticket_type_id = b.ticket_type_id
     LEFT JOIN tickets t ON t.booking_id = b.booking_id
     WHERE b.attendee_id = $1
     GROUP BY b.booking_id, e.event_id, tt.ticket_type_id
     ORDER BY b.created_at DESC`,
    [request.user.userId],
  )

  return response.status(200).json({
    bookings: result.rows.map((booking) => ({
      id: booking.booking_id,
      reference: booking.booking_reference,
      status: booking.status,
      quantity: booking.quantity,
      event: {
        id: booking.event_id,
        title: booking.event_title,
        venue: booking.venue,
        city: booking.city,
        startsAt: booking.starts_at,
      },
      ticketType: booking.ticket_type,
      unitPrice: Number(booking.unit_price),
      ticketCount: booking.ticket_count,
      createdAt: booking.created_at,
    })),
  })
}
