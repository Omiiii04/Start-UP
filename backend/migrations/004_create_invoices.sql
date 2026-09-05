-- ============================================================
-- Migration 004: invoices table
-- Depends on: 003_create_milestones.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS invoices (
  invoice_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number       VARCHAR(30) NOT NULL UNIQUE,     -- e.g. INV-2026-0001
  milestone_id         UUID NOT NULL REFERENCES milestones(milestone_id) ON DELETE RESTRICT,
  project_id           UUID NOT NULL REFERENCES projects(project_id) ON DELETE RESTRICT,
  client_id            UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  subtotal_inr         NUMERIC(12, 2) NOT NULL,
  cgst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  sgst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  igst_inr             NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_due_inr        NUMERIC(12, 2) NOT NULL,
  sac_code             CHAR(6) NOT NULL,
  client_state         CHAR(2) NOT NULL,               -- 'MH' for Maharashtra, 'KA' for Karnataka, etc.
  payment_gateway_ref  VARCHAR(255),                   -- Stub for future payment integration
  pdf_storage_path     TEXT,                           -- Cloudinary URL for invoice PDF (future)
  issued_by            UUID REFERENCES users(user_id), -- Admin who generated the invoice
  issued_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invoices_project_id  ON invoices (project_id);
CREATE INDEX idx_invoices_client_id   ON invoices (client_id);
CREATE INDEX idx_invoices_milestone_id ON invoices (milestone_id);
CREATE INDEX idx_invoices_issued_at   ON invoices (issued_at DESC);

-- ── Project Files Table (Cloudinary uploads)
CREATE TABLE IF NOT EXISTS project_files (
  file_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id            UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
  uploaded_by           UUID NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  original_name         VARCHAR(500) NOT NULL,
  cloudinary_public_id  VARCHAR(500) NOT NULL,
  secure_url            TEXT NOT NULL,
  size_bytes            BIGINT NOT NULL,
  mime_type             VARCHAR(127) NOT NULL,
  deleted_at            TIMESTAMPTZ,
  uploaded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_files_project_id ON project_files (project_id);
