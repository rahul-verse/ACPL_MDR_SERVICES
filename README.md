# ACPL Systems MDR Platform

A production-ready Managed Detection and Response website and operations dashboard for ACPL Systems Pvt. Ltd., designed for secure enquiry intake, threat visibility, and administrative review.

## Project Overview

This repository contains:

- a Next.js 15 frontend for the public MDR experience and admin portal
- a Node.js/Express backend for API services, enquiry handling, and admin authentication
- a MongoDB-backed data layer for storing and managing enquiry records

## Project Structure

```text
frontend/   Next.js 15 App Router, React 19, TypeScript, Tailwind CSS
backend/    Express API, MongoDB, JWT-based admin authentication
README.md
```

## Technology Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Helmet, CORS, rate limiting
- JWT-based admin authentication

## Local Development Setup

### Prerequisites
- Node.js 20 or newer
- MongoDB instance (local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend will run on http://localhost:4000.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The frontend will run on http://localhost:3000.

## Environment Configuration

### Frontend
Create a file at `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend
Create or update `backend/.env` using the values below:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/acpl_mdr_services
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@acplsystems.com
ADMIN_PASSWORD=12345678
TRUST_PROXY=false
```

### Admin Credentials

The default admin login values are:

- Email: `admin@acplsystems.com`
- Password: `12345678`

> For production, replace these values with strong, rotated credentials and store them in a secure secret manager.

### Admin Enquiry Export

The admin dashboard includes an export feature that allows enquiries to be downloaded as a CSV file for reporting and offline review.

## API Endpoints

- `GET /health`
- `POST /contact`
- `GET /services`
- `GET /faq`
- `POST /auth/login`
- `GET /admin/enquiries`
- `PATCH /admin/enquiries/:id/status`

Admin routes require the `Authorization: Bearer <token>` header.

## Verification

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```
