# TutorSpace 2.0 — working plan

Product-focused: work through the milestones in order. No fixed dates. Each
milestone must leave the app working and deployed. Rules and design are in
`CLAUDE.md`.

## 1. Goal

Rebuild TutorSpace as **one Next.js app** with the **Option C (Night)** design,
keeping the main idea: **one record per class, one access check.**

## 2. How booking works

- The tutor creates a class and sets a **room limit** (seats, 1 or more). No
  session type, no one-to-one label, no meeting link.
- The student **books a seat → pays → is confirmed**. No tutor approval.
- The seat is **held for 15 minutes** during payment; an unpaid hold expires and
  the seat goes back.
- A full room shows **Full** and cannot be booked.
- **Who can join the live class:** a confirmed (paid) booking, from 15 minutes
  before start to 15 minutes after end. The class's tutor always; admins any class.
- **Refunds:** student cancels 24 hours or more before → full refund; tutor or
  admin cancels → always refunded. The seat frees itself.
- **A class locks when it starts:** no editing or deleting. A class with bookings
  cannot be deleted until they are cancelled. A class with payment history is
  never deleted.

## 3. Setup (separate from v1)

| Item | v2 |
|---|---|
| Folder | `E:\LEVEL-2\TutorSpace-2` |
| GitHub | new repo `mohtasim22/TutorSpace-2` |
| Database | new Neon database (Singapore) |
| Hosting | one Vercel project |
| Payments | SSLCommerz sandbox store (new; replaces v1's Stripe), BDT |
| Services | same accounts: Daily, tldraw (licence key), Cloudinary, Anthropic, cron-job.org (new job), Google login (new redirect URL) |

v1 (`E:\LEVEL-2\TutorSpace`) stays live and unchanged.

## 4. Data model compared with v1

- **ClassSlot:** keeps `capacity` (the **room limit**). Removed: `session_type`,
  `meeting_link`.
- **Booking:** adds `hold_expires_at`. States: `HELD → CONFIRMED → COMPLETED`, or
  `CANCELLED` / `EXPIRED`. Keeps cancelled time and price. Payment fields are now
  SSLCommerz ones: `tran_id`, `val_id`, `bank_tran_id`, `refund_trans_id`,
  `refund_ref_id` and a refund status (processing / refunded).
- **Carried over:** users, tutor profiles, courses, materials (with stored AI
  summary), homework and submissions, announcements, notifications, reviews (one
  per booking), practice quizzes (student's private or tutor's published).
- **New:** quiz problem reports (student reports a wrong question → tutor sees it).

## 5. Built correctly from the start

| v1 weak point | v2 |
|---|---|
| Two students could take the last seat at the same moment | Seat check + booking in one locked transaction |
| A late payment message could undo a refund | Confirm only moves HELD → CONFIRMED, and only after the SSLCommerz Validation API says the payment is valid |
| Backend deployed as a committed bundle | Gone: one Next.js app |
| No automated tests | A test for every rule, run on every push |
| Whiteboard protected only by a secret room name | Own sync server with real login (M8) |
| Unchecked AI quiz questions | "Report a problem" notifies the tutor |

## 6. Milestones

### M1 — Foundation
Repo, database, Option C theme (Tailwind + shadcn tokens, Onest + JetBrains Mono),
shared UI parts (buttons, inputs, cards, badges, tables, empty states), login with
email and Google, role-based page shells (student / tutor / admin), CI checks
(typecheck, test, build) on GitHub Actions.
**Done when:** you can sign in as each role and see an empty dashboard; it is
deployed on Vercel.

### M2 — Tutors & classes
Tutor profile, admin approval of tutors, courses, classes with room limit, class
lock rules, tutor search with filters, tutor profile page with open classes.
**Done when:** a tutor creates a 5-seat class; a student finds it on the tutor's
profile; editing a started class is refused by the server.

### M3 — Booking & payment
Seat hold, SSLCommerz payment session in BDT (phone asked once), IPN and return
routes that confirm through the Validation API, hold expiry, late-payment handling
(confirm if a seat is free, otherwise automatic refund), cancel with refund
preview, refund at SSLCommerz with status tracking, booking lists for student and
tutor.
**Done when:** book → pay in the SSLCommerz sandbox → confirmed; a full room
blocks booking; an unpaid hold expires; cancel 24 h+ refunds; rule tests pass
(seat race, failed validation and wrong amount do not confirm, IPN + return
confirm only once, IPN for a cancelled booking changes nothing, late payment
confirmed or refunded, refund boundary at exactly 24 h, retry never refunds
twice). Also check in the sandbox whether a reused `refund_trans_id` is rejected.

### M4 — Live class
The one access check, private Daily rooms with personal tokens, tldraw whiteboard
with keyed room id and licence key, one-screen class page (board + video),
save board to course notes.
**Done when:** a paid student joins; an outsider is refused for both video and
board; the saved board appears in materials; access-check tests cover every role,
booking state and time.

### M5 — Coursework
Course materials (Cloudinary upload), homework with submission and grading,
announcements, in-app notifications, reviews (one per booking) with rating
recalculation.
**Done when:** a tutor uploads a PDF, sets and grades homework; the student sees
everything for courses they booked.

### M6 — AI study tools
PDF summary (stored once per material, tutor can regenerate), practice quiz
(student private, tutor can publish to the course), interactive quiz player,
"Report a problem".
**Done when:** a student generates a quiz and reads a summary from a PDF; an
outsider is refused before anything else is checked.

### M7 — Reminders, admin, phone
Reminder emails (class in 30 minutes, homework due in 24 hours) via a protected
cron route, remaining admin pages (reviews, users, courses), phone layouts for
every page, Playwright end-to-end test of the full flow (the SSLCommerz step
is stubbed in CI, because the sandbox page and IPN can't be driven from GitHub
Actions).
**Done when:** every page works at 390px; the end-to-end test passes in CI.

### M8 — Own whiteboard server (optional)
Self-hosted tldraw sync (e.g. Cloudflare) that checks a signed token from the app
before letting anyone into a room.
**Done when:** the board cannot be opened without a valid pass.
If time runs short, skip it: the hosted sync with the keyed room id still works.

### M9 — Report & defence
Update report Chapters 3–6 and the four diagrams (one app instead of two, room
limit instead of session type, seat hold, SSLCommerz instead of Stripe, tests),
note that going live needs a fixed server IP for SSLCommerz refunds, update the
defence page,
re-run Turnitin.
**Done when:** report v2 is ready for the supervisor.

## 7. Rules for every milestone

- Start with a short plan and wait for **approve**.
- End with: tests passing, typecheck and build clean, deployed, and a
  plain-language defence briefing.
- Secrets never in `NEXT_PUBLIC_` variables; never commit `.env`.
- Rules live in `src/server` and are checked on the server.
- Every screen follows the Option C mockups:
  https://claude.ai/artifact/2kNv8VT3z5ixnrwqGAKbsJ

## 8. Copying code from Claude chat

Give the chat: the milestone section above, `CLAUDE.md`, and the files being
changed. Before committing, run `npm run typecheck`, `npm test` and
`npm run build`. If anything fails, paste the error back into the chat.
