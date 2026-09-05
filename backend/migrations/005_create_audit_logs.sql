-- ============================================================
-- Migration 005: audit_logs table
-- Immutable log of all state-changing operations.
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  log_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id      UUID REFERENCES users(user_id) ON DELETE SET NULL,
  actor_email   VARCHAR(255),        -- Snapshot in case user is deleted
  action        VARCHAR(100) NOT NULL, -- e.g. 'project.workflow_step.updated'
  entity_type   VARCHAR(50) NOT NULL,  -- e.g. 'project', 'milestone', 'invoice'
  entity_id     UUID,
  metadata      JSONB,                 -- Additional context
  ip_address    INET,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_actor_id    ON audit_logs (actor_id);
CREATE INDEX idx_audit_logs_entity      ON audit_logs (entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at  ON audit_logs (created_at DESC);
CREATE INDEX idx_audit_logs_action      ON audit_logs (action);
