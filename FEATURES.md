# TicketHub — Day 1 Feature Plan

This document defines the first version of TicketHub and keeps the 15-day build focused. The MVP is a working event discovery and free-ticket reservation app. Payments, QR check-in, and email are stretch features because they add extra services and security work.

## Problem

College and community event details are often shared across messages, forms, and social posts. Attendees can struggle to find reliable event information, while organizers need a clear way to publish events and track reservations without maintaining scattered lists.

## MVP users

### Guest

- Browse published upcoming events.
- Open an event and see its date, time, venue, description, and ticket availability.
- Sign up or sign in to reserve tickets.

### Attendee

- Reserve one or more free tickets while tickets remain available.
- See a confirmation and a unique booking reference.
- View their reservations in “My Tickets.”

### Organizer

- Create an event and its ticket quantity.
- Edit or cancel events they created.
- View reservations for their own events.

## Must-have features

1. Account registration, login, and logout.
2. Attendee and organizer roles.
3. Public list of upcoming published events.
4. Event detail page with date, venue, description, and availability.
5. Organizer event create, edit, and cancel actions.
6. One free ticket type per event for the first release.
7. Reservation flow that rejects invalid quantities and sold-out events.
8. “My Tickets” page showing the signed-in attendee’s reservations.
9. Organizer view of reservations for their own events.
10. Form validation, loading feedback, and clear error/empty states.
11. Deployed app and README with setup and learning notes.

## Out of scope for the 15-day MVP

- Real-money payments or refunds.
- QR code generation or scanning at the venue.
- Email or SMS notifications.
- Promo codes, seat maps, multiple ticket tiers, and waitlists.
- Admin moderation dashboard.

These can be added after the attendee and organizer flows work end to end.

## Completion checklist

- [ ] A guest can browse events and open event details.
- [ ] An attendee can register, log in, reserve tickets, and view their bookings.
- [ ] An organizer can create, edit, and cancel their own events.
- [ ] Organizers cannot edit another organizer’s events.
- [ ] A reservation cannot exceed the available ticket quantity.
- [ ] The app is deployed and the main flows work on desktop and mobile.
- [ ] README explains the app, setup, features, and what I learned.

## Day 1 learning note

Today I turned the event-ticketing idea into specific users, MVP features, and a clear list of later improvements. This gives the remaining 14 days a manageable target.
