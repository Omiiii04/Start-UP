# Google OAuth 2.0 Setup Guide for ProjectBridge

This guide explains how to configure Google OAuth for both Client authentication and Admin portal access.

---

## 1. Environment Variables

Create or edit `frontend/.env`:

```env
# Google OAuth 2.0 Client ID
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Authorized Admin Emails (Comma-separated)
VITE_ADMIN_EMAILS=admin@projectbridge.io,om@projectbridge.io,somnath@projectbridge.io,falguni@projectbridge.io,divya@projectbridge.io
```

---

## 2. Setting up Google Cloud Console

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select your existing project (e.g. `ProjectBridge`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - User Type: **External**
   - App Name: `ProjectBridge`
   - User Support Email: your email
   - Developer contact email: your email
   - Scopes: `email`, `profile`, `openid`
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `ProjectBridge Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:3000`
     - `http://localhost:3001`
     - Your production domain (e.g., `https://your-domain.com`)
   - Click **Create**.
5. Copy the generated **Client ID** into `frontend/.env`.

---

## 3. Role-Based Access Control

- **Client Users**:
  - Sign in using any valid Google account.
  - Can browse projects, submit requirements, view personalized order status, and track invoices.
- **Admin Users**:
  - Sign in with an email listed under `VITE_ADMIN_EMAILS` (or default team emails: `om@`, `somnath@`, `falguni@`, `divya@projectbridge.io`).
  - Automatically receives Admin permissions with access to:
    - **Operations Dashboard**: CRM inquiries, UGC screening review, GST tax ledgers, and milestone invoicing.
    - **Engineering Pipeline**: Kanban sprint tracking, branch commits, CI test suites, and staging deploys.

---

## 4. Sandbox / Development Mode

If `VITE_GOOGLE_CLIENT_ID` is empty or not yet configured:
- The app automatically runs in **Sandbox Mode**.
- You can click on the pre-configured Demo accounts (Client or Admin team members) to test authentication, session persistence, and role protection without needing Google Cloud credentials right away.
