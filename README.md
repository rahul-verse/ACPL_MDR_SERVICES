# ACPL Systems MDR Platform

Production-grade Managed Detection and Response website and enquiry operations dashboard for ACPL Systems Pvt. Ltd.

## Project Structure

```
├── frontend/          Next.js 15 App Router (React 19, TypeScript, Tailwind)
├── backend/           Node.js Express API (MongoDB, Mongoose, JWT)
└── README.md
```

## Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, React Hook Form + Zod

**Backend:** Node.js, Express, MongoDB, Mongoose, Helmet, CORS, rate limiting, JWT admin auth

## Local Setup

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API: `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend: `http://localhost:3000`

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Browser-facing API base URL |

### Backend (`backend/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | Express API port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret (minimum 24 characters) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Development admin password |
| `ADMIN_PASSWORD_HASH` | Production bcrypt password hash |
| `CORS_ORIGIN` | Comma-separated frontend origins |
| `TRUST_PROXY` | Set to `true` behind a load balancer |

Production must use a strong `JWT_SECRET` and either `ADMIN_PASSWORD_HASH` or a strong rotated `ADMIN_PASSWORD`.

## API Endpoints

- `GET /health`
- `POST /contact`
- `GET /services`
- `GET /faq`
- `POST /auth/login`
- `GET /admin/enquiries`
- `PATCH /admin/enquiries/:id/status`

Admin routes require `Authorization: Bearer <token>`.

## Verification

```bash
# Frontend
cd frontend && npm run build && npm run lint && npm run typecheck

# Backend
cd backend && npm run build && npm run typecheck
```

## Production Notes

- Configure `CORS_ORIGIN` to the deployed frontend origin only.
- Store secrets in your deployment platform secret manager.
- Run MongoDB with backups, TLS, and least-privilege credentials.
- Protect `/admin` with SSO, VPN, IP allowlisting, or an identity-aware proxy for enterprise deployments.
