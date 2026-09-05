// =============================================================================
// Shared TypeScript Types — mirrors frontend/src/types/index.ts
// The backend is the authoritative source of truth for all roles and schemas.
// =============================================================================

export type ServiceTier =
  | 'micro_debug'
  | 'research_support'
  | 'mvp_development'
  | 'enterprise_ai';

export type ClientCategory = 'student' | 'researcher' | 'sme' | 'enterprise';

export type UserRole =
  | 'client'
  | 'admin_ceo'
  | 'admin_backend'
  | 'admin_qa'
  | 'admin_ops';

export const ALL_ADMIN_ROLES: UserRole[] = ['admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops'];

export type MilestoneStatus = 'pending' | 'invoiced' | 'paid' | 'released';

export type WorkflowStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type TechFeasibility = 'approved' | 'under_review' | 'rejected';

// ---- DB row shapes (snake_case, matching PostgreSQL column names) ----

export interface DbUser {
  user_id: string;
  email: string;
  password_hash: string | null;   // null for OAuth-only users
  full_name: string;
  role: UserRole;
  client_category: ClientCategory | null;
  institution_or_company: string | null;
  google_id: string | null;
  picture_url: string | null;
  phone_number: string | null;
  is_active: boolean;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbProject {
  project_id: string;
  tracking_code: string;
  client_id: string;
  title: string;
  description: string;
  service_tier: ServiceTier;
  client_category: ClientCategory;
  institution_or_company: string;
  workflow_step: WorkflowStep;
  agreed_budget_inr: number;
  sac_code: string;
  is_maharashtra_client: boolean;
  ugc_compliance_checked: boolean;
  ugc_flagged_keywords: string[];
  staging_url: string | null;
  repository_url: string | null;
  git_branch: string | null;
  git_commit_hash: string | null;
  tests_passing_count: number | null;
  tests_total_count: number | null;
  tech_feasibility: TechFeasibility;
  assigned_engineers: { name: string; role: string }[];
  notes: string | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbMilestone {
  milestone_id: string;
  project_id: string;
  milestone_name: string;
  percentage: number;
  subtotal_inr: number;
  cgst_inr: number;
  sgst_inr: number;
  igst_inr: number;
  total_due_inr: number;
  status: MilestoneStatus;
  invoice_number: string | null;
  payment_gateway_ref: string | null;
  signoff_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface DbInvoice {
  invoice_id: string;
  invoice_number: string;
  milestone_id: string;
  project_id: string;
  client_id: string;
  subtotal_inr: number;
  cgst_inr: number;
  sgst_inr: number;
  igst_inr: number;
  total_due_inr: number;
  sac_code: string;
  client_state: string;
  payment_gateway_ref: string | null;
  pdf_storage_path: string | null;
  issued_by: string;
  issued_at: Date;
  created_at: Date;
}

export interface DbRefreshToken {
  token_id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
}

export interface DbAuditLog {
  log_id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: Date;
}

// ---- JWT payload shape ----

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// ---- Request augmentation ----

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
