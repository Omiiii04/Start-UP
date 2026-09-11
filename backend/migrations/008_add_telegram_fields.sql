-- ============================================================
-- Migration 008: Add Telegram integration fields
-- Run: psql $DATABASE_URL -f migrations/008_add_telegram_fields.sql
-- Depends on: 001_create_users.sql
-- ============================================================

-- Add Telegram chat ID and linking timestamp to users
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS telegram_chat_id BIGINT UNIQUE,
  ADD COLUMN IF NOT EXISTS telegram_linked_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_users_telegram_chat_id ON users (telegram_chat_id)
  WHERE telegram_chat_id IS NOT NULL;

-- Telegram account linking tokens table
-- Short-lived, single-use tokens for the website → Telegram linking flow.
-- The raw token is sent to the user only. Only the hash is stored here.
CREATE TABLE IF NOT EXISTS telegram_link_tokens (
  token_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  token_hash  VARCHAR(64) NOT NULL UNIQUE,  -- SHA-256 hex of the raw token
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tlt_user_id     ON telegram_link_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_tlt_token_hash  ON telegram_link_tokens (token_hash);
CREATE INDEX IF NOT EXISTS idx_tlt_expires_at  ON telegram_link_tokens (expires_at);

-- Automatically clean up expired/used tokens (run periodically or via cron)
-- This is a convenience delete; the application also validates expires_at + used on read.
CREATE OR REPLACE FUNCTION cleanup_expired_telegram_tokens()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM telegram_link_tokens
  WHERE expires_at < NOW() - INTERVAL '1 hour' OR used = true;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
