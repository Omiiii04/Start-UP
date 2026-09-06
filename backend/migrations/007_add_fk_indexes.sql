-- ============================================================
-- Migration 007: Add missing foreign key indexes
-- Fixes "Unindexed Foreign Keys" Supabase advisor warnings
-- ============================================================

-- invoices: index on milestone_id FK
CREATE INDEX IF NOT EXISTS idx_invoices_milestone_id
  ON invoices (milestone_id);

-- project_files: index on uploaded_by FK
CREATE INDEX IF NOT EXISTS idx_project_files_uploaded_by
  ON project_files (uploaded_by);

-- milestones: already has project_id index (from migration 003)
-- invoices: already has project_id, client_id indexes (from migration 004)
