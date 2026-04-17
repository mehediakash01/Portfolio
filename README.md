# Personal Portfolio + Admin Dashboard

This project now includes a dynamic backend and an admin dashboard.

You can:

- Manage projects from a dashboard (add/delete).
- Manage skills from a dashboard (add/delete).
- Store portfolio data in PostgreSQL via Prisma.
- Track live traffic analytics (page views, unique visitors, active users now).

## Tech Stack

Frontend:

- React
- React Router
- Tailwind CSS
- Framer Motion
- Vite

Backend:

- Node.js + Express
- Prisma ORM
- PostgreSQL

## New Architecture

- `src` contains the public portfolio UI and dashboard UI.
- `backend` contains API routes, Prisma schema, and seed script.
- Frontend calls backend APIs at `/api/*` (proxied by Vite in local dev).

Main API resources:

- `/api/projects`
- `/api/skills`
- `/api/analytics`

## Setup

### 1) Frontend

```bash
npm install
```

### 2) Backend

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Set `DATABASE_URL` in `backend/.env` to your PostgreSQL connection string.

Configure dashboard auth variables in `backend/.env`:

- `ADMIN_JWT_SECRET` (long random secret)
- `ADMIN_PASSWORD_HASH` (bcrypt hash)

Generate a bcrypt password hash:

```bash
cd backend
npm run admin:hash -- "your-strong-password"
```

Then copy the output into `ADMIN_PASSWORD_HASH`.

### 3) Run Prisma migrations + seed

```bash
cd backend
npm run prisma:migrate
npm run prisma:seed
```

### 4) Run app locally

Terminal A (backend):

```bash
cd backend
npm run dev
```

Terminal B (frontend):

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

## Dashboard

Open:

- `/dashboard`

Security behavior:

- Dashboard requires password login.
- Auth uses an `httpOnly` cookie session.
- Admin API routes are protected server-side.
- Public visitors cannot read admin analytics or modify projects/skills.

Capabilities:

- Add project
- Delete project
- Add skill
- Delete skill
- View analytics overview and live metrics

## Analytics

The frontend automatically sends page-view events on route changes.

Dashboard analytics includes:

- Total visits
- Unique visitors
- Active users now
- Today visits
- Top pages
- Last 7 days visits

Live data is streamed to dashboard via Server-Sent Events (SSE).

## Deployment Security Notes

- Serve frontend and backend over HTTPS.
- Set `NODE_ENV=production` so cookie is marked `Secure`.
- Keep `ADMIN_JWT_SECRET` and `ADMIN_PASSWORD_HASH` only in server environment variables.
- Use a strong unique password for dashboard access.



