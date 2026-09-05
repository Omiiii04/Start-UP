-- ============================================================
-- Migration 001: users table
-- Run: psql $DATABASE_URL -f migrations/001_create_users.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- for gen_random_uuid()

CREATE TYPE user_role AS ENUM (
  'client',
  'admin_ceo',
  'admin_backend',
  'admin_qa',
  'admin_ops'
);

CREATE TYPE client_category AS ENUM (
  'student',
  'researcher',
  'sme',
  'enterprise'
);

CREATE TABLE IF NOT EXISTS users (
  user_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                 VARCHAR(255) NOT NULL UNIQUE,
  password_hash         VARCHAR(255),                        -- NULL for OAuth-only users
  full_name             VARCHAR(150) NOT NULL,
  role                  user_role NOT NULL DEFAULT 'client',
  client_category       client_category,
  institution_or_company VARCHAR(255),
  google_id             VARCHAR(255) UNIQUE,                 -- Google OAuth sub
  picture_url           TEXT,
  phone_number          VARCHAR(20),
  is_active             BOOLEAN NOT NULL DEFAULT true,
  deleted_at            TIMESTAMPTZ,                         -- Soft delete
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email      ON users (email);
CREATE INDEX idx_users_google_id  ON users (google_id);
CREATE INDEX idx_users_role       ON users (role);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
