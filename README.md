# Tixora: Event Ticketing Platform

> Discover events, reserve free tickets, and check attendees in with unique QR tickets. Built in 15 days as Track A of **ALTA Builder 30**.

| | |
|---|---|
| **Type** | Full-stack web application |
| **Status** | In progress: event discovery UI and authentication are underway |
| **Stack** | React, Node.js/Express, PostgreSQL (`pg`) |
| **Live demo** | _coming on Day 14_ |
| **Demo video** | _coming on Day 15_ |

Event photography credits and license links are in [`client/public/IMAGE-CREDITS.md`](client/public/IMAGE-CREDITS.md).

---

## 1. Why this project exists

**The problem.** College fests and local events often share details across messages, forms, and social posts. Attendees can miss reliable event information, while organizers must maintain reservation lists manually and risk accepting more reservations than their event can hold.

**The solution.** Tixora puts event discovery and reservations in one place. An organizer publishes an event with a limited ticket quantity. An attendee reserves tickets and receives a booking reference and, later in the roadmap, a QR ticket. The booking flow checks availability so reservations respect event capacity.

**What makes it useful.**
- Seats can't be oversold, because stock is reduced in a single atomic database operation.
- Every ticket has its own QR token, so one ticket can be used only once.
- Organizers can review event registrations and check-in status.

---

## 2. Who uses it

| Role | What they can do |
|---|---|
| **Attendee** | Browse and search events, buy tickets, view and download their tickets |
| **Organizer** | Create, edit and delete their own events, define ticket types and prices, view sales and revenue |
| **Admin** _(later)_ | Approve organizers, remove events or users |

---

## 3. Features

### MVP (building in 15 days)
1. Signup and login with hashed passwords and JWT
2. Role-based access (attendee vs organizer)
3. Organizer CRUD for events
4. Ticket types per event (name, price, quantity)
5. Public event list with search, city/date filter and pagination
6. Event detail page with live remaining quantity
7. Booking with oversell protection (atomic stock update)
8. Free-ticket reservation with a booking confirmation and reference
9. "My Tickets" page with a unique QR code per ticket
10. Organizer dashboard: tickets sold and revenue per event

### Planned improvements
- QR check-in screen for organizers (scan, mark used, reject duplicates)
- Attendee waitlist for sold-out events
- Email confirmation with the ticket attached
- Promo codes
- Cancellation and refunds
- Admin panel

---

## 4. How it works (user journey)

1. An organizer signs up, logs in, and creates an event with ticket types.
2. An attendee browses events and opens one to see what is still available.
3. The attendee picks a ticket type and quantity and clicks **Book**.
4. The server checks availability, records the booking, and reduces the remaining ticket quantity.
5. The attendee receives a booking confirmation and reference.
6. The ticket flow creates one ticket record per reserved seat, each with a unique `qr_token`.
7. The attendee opens **My Tickets** and shows the QR code at the gate.
8. The organizer reviews registrations and check-in status on the dashboard.

### Authentication API (Day 4)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create an attendee or organizer account and receive a JWT |
| `POST` | `/api/auth/login` | Public | Verify credentials and receive a JWT |
| `GET` | `/api/auth/me` | Signed-in user | Return the current account profile |
| `GET` | `/api/auth/organizer-check` | Organizer | Demonstrate organizer-only access |
| `GET` | `/api/auth/attendee-check` | Attendee | Demonstrate attendee-only access |

Register with JSON fields `name`, `email`, `password`, and optional `role` (`attendee` by default or `organizer`). Login accepts `email` and `password`. Send the returned token on protected requests as `Authorization: Bearer <token>`. Public registration cannot create admin accounts. Set a random `JWT_SECRET` of at least 32 characters in `server/.env`; keep it private and do not commit `.env`.

### Organizer event API (Day 6)

All event-management routes require an organizer JWT in the `Authorization: Bearer <token>` header. Organizers can only read or change events they own.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/organizer/events` | Create an event and its general-admission ticket capacity |
| `GET` | `/api/organizer/events` | List the signed-in organizer’s events |
| `GET` | `/api/organizer/events/:eventId` | View one event owned by the organizer |
| `PUT` / `PATCH` | `/api/organizer/events/:eventId` | Update event details, capacity, price, or image URL |
| `DELETE` | `/api/organizer/events/:eventId` | Cancel the event without removing booking history |

Create an event with JSON fields `title`, `description`, `venue`, `city`, `startsAt`, and `ticketCapacity`. Optional fields are `ticketPrice` (defaults to free), `imageUrl`, and `status` (`draft` by default; organisers can publish or return it to draft). Updates accept any subset of those fields. Event creation and ticket-capacity setup are saved together in a database transaction.

---

## 5. Architecture

```
Browser (React SPA)
   │  HTTPS + JSON, JWT in Authorization header
   ▼
Express API (Node.js)
   routes → middleware (auth, role check, validation) → controllers → services
   │                                   │
   ▼                                   ▼
   PostgreSQL (node-postgres / pg)
   schema: server/sql/schema.sql
```

- **Frontend** only talks to the API. It never connects directly to PostgreSQL or receives database credentials.
- **Backend** is built with Express. It uses a PostgreSQL connection pool from `pg` and reads the initial schema from `server/sql/schema.sql`.
- **Database** holds all state. Stock updates run inside a single atomic query.

### Database design

| Table | Key fields | Relationships |
|---|---|---|
| `users` | user_id, name, email, password_hash, role | organizes events and makes bookings |
| `events` | event_id, organizer_id, title, description, venue, city, starts_at, status | belongs to an organizer and has ticket types |
| `ticket_types` | ticket_type_id, event_id, name, price, total_quantity, sold_quantity | belongs to an event and sets its capacity |
| `bookings` | booking_id, attendee_id, event_id, ticket_type_id, quantity, booking_reference, status | belongs to an attendee, event, and ticket type |
| `tickets` | ticket_id, booking_id, qr_token, is_used, checked_in_at | belongs to a booking; one row represents one ticket |

### Planned folder structure

```
Tixora/
├── client/                 React and Vite frontend
│   └── src/
├── server/
│   ├── sql/schema.sql      PostgreSQL tables and indexes
│   └── src/
│       ├── config/db.js    PostgreSQL connection pool
│       └── scripts/        database check and setup commands
├── FEATURES.md
└── README.md
```

---

## 6. Tech stack

| Technology | Purpose |
|---|---|
| JavaScript (Node.js) | Backend language |
| Express | REST API framework |
| PostgreSQL | Relational database, with transactions for safe booking |
| node-postgres (`pg`) | PostgreSQL connection pool and SQL queries |
| bcryptjs, jsonwebtoken | Password hashing and signed, expiring access tokens |
| zod | Input validation |
| React (Vite), React Router | Frontend UI and routing |
| axios | API calls from the frontend |
| qrcode | QR generation |
| Jest, Supertest | API tests |
| Vercel, Render, Neon | Hosting for frontend, backend and database |
| Git and GitHub | Version control, one commit every day |

---

## 7. 15-day roadmap

| Day | Focus | Expected outcome |
|---|---|---|
| 1 | README and roadmap | Project overview, problem, objectives, features, stack, and 15-day roadmap |
| 2 | Project structure and setup | React/Vite and Express development servers start |
| 3 | PostgreSQL database | SQL schema, relationships, connection pool, and database health check |
| 4 | Authentication backend | Registration, login, password hashing, JWT, and role checks |
| 5 | Login and registration UI | Users can register, sign in, and reach the correct pages |
| 6 | Organizer event APIs | Organizers can create and manage their own events |
| 7 | Organizer dashboard | Event forms and registration counts use the backend |
| 8 | Public events and search | Visitors can browse events and open event details |
| 9 | Ticket booking backend | Capacity checks and database transactions prevent overbooking |
| 10 | Attendee booking interface | Attendees can reserve tickets and review booking history |
| 11 | QR code ticket generation | Each booked ticket receives its own secure QR token |
| 12 | My Tickets page | Attendees can view their bookings, ticket details, and QR codes |
| 13 | QR ticket check-in | Organizers can verify tickets and prevent duplicate entry |
| 14 | Registration management and UI polish | Organizers can review registrations; layout and error states are refined |
| 15 | Testing, bug fixes, and final documentation | Main attendee and organizer flows are ready to demonstrate |

## 8. Testing strategy

- **API tests (Jest and Supertest):** signup and login, 401 without a token, role restrictions, event CRUD, and booking.
- **Oversell test:** fire parallel booking requests for the last seats and confirm that stock never goes below zero.
- **QR check-in:** a valid ticket can be checked in once; repeat scans are rejected.
- **Validation and edge cases:** empty fields, negative quantity, duplicate email, past event dates, and booking an event that has sold out.
- **Manual checks:** the full flow on desktop and phone before deployment.

## 9. Deployment plan

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon (hosted PostgreSQL)
- All secrets (database URL and JWT secret) live in environment variables, and `.env` is gitignored.
- Final check: open the live link on a different device and complete a test reservation and check-in.

---

## 10. What I'm learning

_Updated as I build, in my own words:_

- Day 1: Turning a vague idea into a problem statement, user roles, and an MVP I can finish in 15 days.

## 11. Progress log

**Day 1: Planning (done)**
- Project selected: Event Ticketing
- Problem statement and proposed solution written
- User roles identified
- MVP features and future improvements listed
- Tech stack chosen
- Initial architecture and database design drafted

**Day 4: Authentication API (implemented)**
- Added attendee and organizer registration with input validation and bcrypt password hashes
- Added login with generic credential errors and one-hour JWT access tokens
- Added current-user, authenticated, and role-restricted API routes
- Kept the JWT signing key in the local, gitignored `server/.env`

**Day 5: Authentication interface (implemented)**
- Built the React sign-up and login screens
- Connected the forms to the authentication API
- Added account-page protection and session restoration

**Day 6: Organizer event API (implemented)**
- Added organizer-only create, list, view, update, and cancel endpoints
- Added ownership checks so organizers cannot access another organizer’s events
- Creates the event and its ticket capacity atomically
- Validates event details, date, capacity, price, and optional image URL
- Prevents capacity from being reduced below tickets already sold

## 12. Goal

Ship a deployed, working ticketing platform that handles event management, free reservations, and QR check-in. By the end I want to understand authentication, relational data modelling, safe concurrent updates, and API development well enough to explain each one in an interview.

---

_Built as part of ALTA Builder 30 (#ALTABuilder30)._
