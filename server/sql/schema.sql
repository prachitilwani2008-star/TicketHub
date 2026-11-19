-- Tixora initial PostgreSQL schema.
-- Apply this file with: npm run db:init

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'attendee'
    CHECK (role IN ('attendee', 'organizer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  event_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organizer_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'OTHER'
    CHECK (category IN ('MUSIC', 'COMEDY', 'ART & CULTURE', 'FOOD & DRINK', 'NIGHTLIFE', 'WORKSHOPS', 'OTHER')),
  description TEXT NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'OTHER'
    CHECK (category IN ('MUSIC', 'COMEDY', 'ART & CULTURE', 'FOOD & DRINK', 'NIGHTLIFE', 'WORKSHOPS', 'OTHER'));

CREATE TABLE IF NOT EXISTS ticket_types (
  ticket_type_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(event_id) ON DELETE RESTRICT,
  name TEXT NOT NULL DEFAULT 'General Admission',
  price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  total_quantity INTEGER NOT NULL CHECK (total_quantity > 0),
  sold_quantity INTEGER NOT NULL DEFAULT 0 CHECK (sold_quantity >= 0),
  CONSTRAINT sold_quantity_within_capacity
    CHECK (sold_quantity <= total_quantity),
  CONSTRAINT ticket_type_event_pair_unique UNIQUE (ticket_type_id, event_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  attendee_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  event_id INTEGER NOT NULL REFERENCES events(event_id) ON DELETE RESTRICT,
  ticket_type_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  booking_reference TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT booking_ticket_type_matches_event
    FOREIGN KEY (ticket_type_id, event_id)
    REFERENCES ticket_types(ticket_type_id, event_id)
    ON DELETE RESTRICT,
  CONSTRAINT booking_id_event_pair_unique UNIQUE (booking_id, event_id)
);

CREATE TABLE IF NOT EXISTS tickets (
  ticket_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
  qr_token UUID NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_status_starts_at_idx
  ON events(status, starts_at);
CREATE INDEX IF NOT EXISTS events_organizer_id_idx
  ON events(organizer_id);
CREATE INDEX IF NOT EXISTS ticket_types_event_id_idx
  ON ticket_types(event_id);
CREATE INDEX IF NOT EXISTS bookings_attendee_created_at_idx
  ON bookings(attendee_id, created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_event_id_idx
  ON bookings(event_id);
CREATE INDEX IF NOT EXISTS tickets_booking_id_idx
  ON tickets(booking_id);
