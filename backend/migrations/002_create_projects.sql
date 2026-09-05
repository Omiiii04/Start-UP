-- ============================================================
-- Migration 002: projects table
-- Depends on: 001_create_users.sql
-- ============================================================

CREATE TYPE service_tier AS ENUM (
  'micro_debug',
  'research_support',
  'mvp_development',
  'enterprise_ai'
);

CREATE TYPE tech_feasibility AS ENUM (
  'approved',
  'under_review',
  'rejected'
);

CREATE TABLE IF NOT EXISTS projects (
  project_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code            VARCHAR(20) NOT NULL UNIQUE,     -- e.g. PB-2026-A1B2C3
  client_id                UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  title                    VARCHAR(255) NOT NULL,
  description              TEXT NOT NULL,
  service_tier             service_tier NOT NULL,
  client_category          client_category NOT NULL,
  institution_or_company   VARCHAR(255) NOT NULL,
  workflow_step            SMALLINT NOT NULL DEFAULT 1 CHECK (workflow_step BETWEEN 1 AND 15),
  agreed_budget_inr        NUMERIC(12, 2) NOT NULL DEFAULT 0,
  sac_code                 CHAR(6) NOT NULL DEFAULT '998314',
  is_maharashtra_client    BOOLEAN NOT NULL DEFAULT true,
  ugc_compliance_checked   BOOLEAN NOT NULL DEFAULT false,
  ugc_flagged_keywords     TEXT[] NOT NULL DEFAULT '{}',
  tech_feasibility         tech_feasibility NOT NULL DEFAULT 'under_review',
  staging_url              TEXT,
  repository_url           TEXT,
  git_branch               VARCHAR(150),
  git_commit_hash          VARCHAR(40),
  tests_passing_count      INTEGER,
  tests_total_count        INTEGER,
  assigned_engineers       JSONB NOT NULL DEFAULT '[]',
  notes                    TEXT,
  deleted_at               TIMESTAMPTZ,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_client_id      ON projects (client_id);
CREATE INDEX idx_projects_tracking_code  ON projects (tracking_code);
CREATE INDEX idx_projects_workflow_step  ON projects (workflow_step);
CREATE INDEX idx_projects_feasibility    ON projects (tech_feasibility);
CREATE INDEX idx_projects_deleted_at     ON projects (deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
