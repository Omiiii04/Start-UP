-- ============================================================
-- Migration 003: milestones table
-- Depends on: 002_create_projects.sql
-- ============================================================

CREATE TYPE milestone_status AS ENUM (
  'pending',
  'invoiced',
  'paid',
  'released'
);

CREATE TABLE IF NOT EXISTS milestones (
  milestone_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id           UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
  milestone_name       VARCHAR(255) NOT NULL,
  percentage           NUMERIC(5, 2) NOT NULL CHECK (percentage > 0 AND percentage <= 100),
  subtotal_inr         NUMERIC(12, 2) NOT NULL,
  cgst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  sgst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  igst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_due_inr        NUMERIC(12, 2) NOT NULL,
  status               milestone_status NOT NULL DEFAULT 'pending',
  invoice_number       VARCHAR(30) UNIQUE,
  payment_gateway_ref  VARCHAR(255),
  signoff_date         TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_milestones_project_id ON milestones (project_id);
CREATE INDEX idx_milestones_status     ON milestones (status);

CREATE TRIGGER trg_milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
