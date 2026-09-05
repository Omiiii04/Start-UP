-- ============================================================
-- Migration 006: refresh_tokens table
-- Stores hashed refresh tokens for JWT rotation.
-- ============================================================

CREATE TABLE IF NOT EXISTS refresh_tokens (
  token_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  token_hash  VARCHAR(64) NOT NULL UNIQUE,  -- SHA-256 hex (64 chars)
  expires_at  TIMESTAMPTZ NOT NULL,
  revoked     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user_id    ON refresh_tokens (user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens (token_hash);
CREATE INDEX idx_refresh_tokens_expires    ON refresh_tokens (expires_at);

-- Auto-cleanup: delete expired/revoked tokens older than 30 days
-- (Run this periodically as a cron/scheduled task in production)
-- DELETE FROM refresh_tokens WHERE (revoked = true OR expires_at < NOW()) AND created_at < NOW() - INTERVAL '30 days';
