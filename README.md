# EventPass: Event Ticketing Platform

> Create events, sell limited tickets, get paid, and check people in with a unique QR code. Built in 15 days as Track A of **ALTA Builder 30**.

| | |
|---|---|
| **Type** | Full-stack web application |
| **Status** | Day 1 of 15: planning complete |
| **Stack** | React, Node.js/Express, PostgreSQL, Razorpay (test mode) |
| **Live demo** | _coming on Day 14_ |
| **Demo video** | _coming on Day 15_ |

---

## 1. Why this project exists

**The problem.** College fests and local events usually sell tickets through Google Forms, UPI screenshots and spreadsheets. Organizers then face oversold seats, fake or duplicated tickets, manual payment checking and no live view of sales. Attendees get no reliable proof of purchase.

**The solution.** EventPass puts the whole flow in one place. An organizer publishes an event with limited ticket types. An attendee pays online. The system confirms payment, issues a ticket with a unique QR code, and guarantees that the last seat can only be sold once.

**What makes it useful.**
- Seats can't be oversold, because stock is reduced in a single atomic database operation.
- Tickets are issued only after the payment signature is verified.
- Every ticket has its own QR token, so one ticket can be used only once.
- Organizers see sales and revenue live.

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
8. Razorpay test-mode payment with server-side signature verification
9. "My Tickets" page with a unique QR code per ticket
10. Organizer dashboard: tickets sold and revenue per event

### Planned improvements
- QR check-in screen for organizers (scan, mark used, reject duplicates)
- Seat hold that expires after 10 minutes without payment
- Email confirmation with the ticket attached
- Promo codes
- Cancellation and refunds
- Admin panel

---

## 4. How it works (user journey)

1. An organizer signs up, logs in, and creates an event with ticket types.
2. An attendee browses events and opens one to see what is still available.
3. The attendee picks a ticket type and quantity and clicks **Book**.
4. The server atomically reserves the seats and creates a `PENDING` booking and a Razorpay order.
5. The attendee pays in the Razorpay checkout.
6. The server verifies the payment signature, marks the booking `PAID`, and generates one ticket per seat, each with a unique `qr_token`.
7. The attendee opens **My Tickets** and shows the QR code at the gate.
8. The organizer watches sales and revenue on the dashboard.

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
PostgreSQL (via Prisma)          Razorpay (test mode)
                                 create order → checkout → verify signature
```

- **Frontend** only talks to the API. It never touches the database or payment secrets.
- **Backend** is layered, with thin routes, logic in services, and all DB access through Prisma.
- **Database** holds all state. Stock updates run inside a single atomic query.
- **Payments** are verified on the server, never trusted from the browser.

### Database design

| Table | Key fields | Relationships |
|---|---|---|
| `users` | id, name, email, password_hash, role | has many events (organizer), has many bookings (attendee) |
| `events` | id, organizer_id, title, description, venue, city, starts_at, image_url | belongs to a user, has many ticket_types |
| `ticket_types` | id, event_id, name, price, total_qty, sold_qty | belongs to an event |
| `bookings` | id, user_id, event_id, status, amount, razorpay_order_id | belongs to a user and an event, has many tickets |
| `tickets` | id, booking_id, ticket_type_id, qr_token, used | belongs to a booking and a ticket type |

### Planned folder structure

```
event-ticketing/
├── docs/                 schema diagram, wireframes
├── server/
│   ├── prisma/           schema.prisma
│   └── src/
│       ├── routes/
│       ├── middleware/   auth, role check, validation
│       ├── controllers/
│       ├── services/     booking, payment, ticket logic
│       └── tests/
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       └── api/          axios calls
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
| Prisma | ORM and migrations |
| bcrypt, jsonwebtoken | Password hashing and authentication |
| zod | Input validation |
| React (Vite), React Router | Frontend UI and routing |
| axios | API calls from the frontend |
| Razorpay (test mode) | Payments |
| qrcode | QR generation |
| Jest, Supertest | API tests |
| Vercel, Render, Neon | Hosting for frontend, backend and database |
| Git and GitHub | Version control, one commit every day |

---

## 7. 15-day roadmap

| Day | Focus | Expected outcome |
|---|---|---|
| 1 | Plan | Repo, `FEATURES.md`, README blueprint |
| 2 | Design | Schema diagram and 4 wireframes in `/docs` |
| 3 | Setup | Server running, DB connected, `/health` returns OK |
| 4 | Signup API | Validation and hashed passwords, tested in Postman |
| 5 | Login and JWT | Protected route returns 401 without a token |
| 6 | Event CRUD | Organizer-only create, read, update, delete |
| 7 | Ticket types and search | Related API plus paginated, filterable event list |
| 8 | Frontend setup | Routing, layout, signup and login screens |
| 9 | List and detail pages | Live data from the API |
| 10 | CRUD screens | Organizer forms with loading and error states |
| 11 | Booking and payment (backend) | Atomic stock update, Razorpay order, signature verification |
| 12 | Booking and payment (UI) | Checkout, ticket generation, My Tickets with QR |
| 13 | Testing | 5+ passing API tests, bug list cleared |
| 14 | Deploy | Live URL that works on another device, secrets in env variables |
| 15 | Ship | Final README, demo video, LinkedIn post |

## 8. Testing strategy

- **API tests (Jest and Supertest):** signup and login, 401 without a token, role restrictions, event CRUD, and booking.
- **Oversell test:** fire parallel booking requests for the last seats and confirm that stock never goes below zero.
- **Payment test:** an invalid signature must not confirm a booking.
- **Validation and edge cases:** empty fields, negative quantity, duplicate email, past event dates, and booking an event that has sold out.
- **Manual checks:** the full flow on desktop and phone before deployment.

## 9. Deployment plan

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon (hosted PostgreSQL)
- All secrets (DB URL, JWT secret, Razorpay keys) live in environment variables, and `.env` is gitignored.
- Final check: open the live link on a different device and complete a test purchase.

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

## 12. Goal

Ship a deployed, working ticketing platform that handles real payment flows and prevents overselling. By the end I want to understand authentication, relational data modelling, safe concurrent updates, and third-party payment integration well enough to explain each one in an interview.

---

_Built as part of ALTA Builder 30 (#ALTABuilder30)._
