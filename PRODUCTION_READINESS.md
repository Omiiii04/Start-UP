# Project Wallah - Production Readiness Guide

This document outlines the architecture, configuration, and operational requirements to run Project Wallah in a production environment.

## 1. Architecture Overview

Project Wallah is a modern full-stack web application consisting of:
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion.
- **Backend**: Node.js + Express (TypeScript).
- **Database**: PostgreSQL (pg).
- **Authentication**: Google OAuth 2.0 with JWT (HttpOnly Cookies).
- **Notifications**: Telegram Bot integration.

## 2. Environment Variables

Both the frontend and backend require properly configured environment variables. 
**CRITICAL**: Never commit `.env` files to version control. 

### Backend (`backend/.env`)
The backend is authoritative. It requires the following variables:

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_secure_random_string_min_32_chars
JWT_REFRESH_SECRET=your_secure_refresh_string_min_32_chars
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_BOT_USERNAME=your_bot_username
TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id
# Comma-separated list of admin emails
ADMIN_EMAILS=om@projectbridge.io,somnath@projectbridge.io,falguni@projectbridge.io,divya@projectbridge.io
```

### Frontend (`frontend/.env`)
The frontend is stateless and pulls public configuration (like `GOOGLE_CLIENT_ID` and `TELEGRAM_BOT_USERNAME`) directly from the backend via the `/api/v1/config` endpoint.

```env
# ONLY the backend URL should be here.
VITE_API_URL=https://api.yourdomain.com
```

## 3. Database Migrations

Before starting the production server, ensure the database schema is up-to-date.
Run the migration script to apply all SQL files in the `backend/migrations/` directory:

```bash
cd backend
npm run db:migrate
```

## 4. Security & Authentication

- **Google OAuth**: Ensure that your Google Cloud Console allows the production domain in the "Authorized JavaScript origins" and "Authorized redirect URIs".
- **JWT Cookies**: In production (`NODE_ENV=production`), the backend automatically sets `Secure=true` and `SameSite=None` on cookies to allow cross-origin authentication if the API and Frontend are hosted on different subdomains.
- **Role-Based Access (RBAC)**: Any email specified in `ADMIN_EMAILS` will automatically receive the `admin_ceo` (superuser) role upon login.

## 5. Deployment Checklist

- [ ] **Build Frontend**: Run `npm run build` in the `frontend` directory. Serve the `dist` folder via a static CDN (e.g., Vercel, Netlify, AWS S3 + CloudFront).
- [ ] **Build Backend**: Run `npm run build` in the `backend` directory. Run the compiled `dist/server.js` using a process manager like PM2 or deploy as a Docker container.
- [ ] **Provision PostgreSQL**: Ensure the production database is reachable, secure, and backed up.
- [ ] **Configure Domain & SSL**: Ensure both frontend and backend are served over HTTPS.
- [ ] **Setup Telegram Bot**: Refer to `TELEGRAM_SETUP.md` for configuring the bot and setting up the webhook.

## 6. Known Constraints & Vulnerabilities
- Ensure all NPM packages are regularly audited. Run `npm audit` periodically.
