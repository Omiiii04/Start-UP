import { query } from '../../config/database';
import { DbProject, WorkflowStep, TechFeasibility } from '../../shared/types';

/**
 * List projects — clients only see their own; admins see all.
 */
export async function listProjects(
  userId: string,
  isAdmin: boolean,
  filters: { workflowStep?: number; techFeasibility?: string; serviceTier?: string } = {}
): Promise<DbProject[]> {
  const conditions: string[] = ['p.deleted_at IS NULL'];
  const params: unknown[] = [];
  let paramIdx = 1;

  if (!isAdmin) {
    conditions.push(`p.client_id = $${paramIdx++}`);
    params.push(userId);
  }

  if (filters.workflowStep) {
    conditions.push(`p.workflow_step = $${paramIdx++}`);
    params.push(filters.workflowStep);
  }
  if (filters.techFeasibility) {
    conditions.push(`p.tech_feasibility = $${paramIdx++}`);
    params.push(filters.techFeasibility);
  }
  if (filters.serviceTier) {
    conditions.push(`p.service_tier = $${paramIdx++}`);
    params.push(filters.serviceTier);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const { rows } = await query<DbProject>(
    `SELECT p.*, u.full_name as client_name, u.email as client_email
     FROM projects p
     LEFT JOIN users u ON p.client_id = u.user_id
     ${where}
     ORDER BY p.created_at DESC`,
    params
  );
  return rows;
}

/**
 * Get a single project — clients can only access their own.
 */
export async function getProjectById(
  projectId: string,
  userId: string,
  isAdmin: boolean
): Promise<DbProject | null> {
  const ownershipCondition = isAdmin ? '' : 'AND p.client_id = $2';
  const params = isAdmin ? [projectId] : [projectId, userId];

  const { rows } = await query<DbProject>(
    `SELECT p.*, u.full_name as client_name, u.email as client_email
     FROM projects p
     LEFT JOIN users u ON p.client_id = u.user_id
     WHERE p.project_id = $1 ${ownershipCondition} AND p.deleted_at IS NULL`,
    params
  );
  return rows[0] || null;
}

/**
 * Advance project workflow step — enforces gate validation.
 */
export async function updateWorkflowStep(
  projectId: string,
  newStep: WorkflowStep
): Promise<DbProject | null> {
  const { rows } = await query<DbProject>(
    `UPDATE projects SET workflow_step = $1, updated_at = NOW()
     WHERE project_id = $2 AND deleted_at IS NULL
     RETURNING *`,
    [newStep, projectId]
  );
  return rows[0] || null;
}

/**
 * Update tech feasibility status — admin only.
 */
export async function updateTechFeasibility(
  projectId: string,
  techFeasibility: TechFeasibility,
  notes?: string
): Promise<DbProject | null> {
  const { rows } = await query<DbProject>(
    `UPDATE projects
     SET tech_feasibility = $1, notes = COALESCE($2, notes), updated_at = NOW()
     WHERE project_id = $3 AND deleted_at IS NULL
     RETURNING *`,
    [techFeasibility, notes, projectId]
  );
  return rows[0] || null;
}

/**
 * Update staging URL and repository URL — admin only.
 */
export async function updateProjectLinks(
  projectId: string,
  links: {
    stagingUrl?: string;
    repositoryUrl?: string;
    gitBranch?: string;
    gitCommitHash?: string;
    testsPassingCount?: number;
    testsTotalCount?: number;
  }
): Promise<DbProject | null> {
  const { rows } = await query<DbProject>(
    `UPDATE projects
     SET
       staging_url = COALESCE($1, staging_url),
       repository_url = COALESCE($2, repository_url),
       git_branch = COALESCE($3, git_branch),
       git_commit_hash = COALESCE($4, git_commit_hash),
       tests_passing_count = COALESCE($5, tests_passing_count),
       tests_total_count = COALESCE($6, tests_total_count),
       updated_at = NOW()
     WHERE project_id = $7 AND deleted_at IS NULL
     RETURNING *`,
    [
      links.stagingUrl, links.repositoryUrl, links.gitBranch,
      links.gitCommitHash, links.testsPassingCount, links.testsTotalCount,
      projectId,
    ]
  );
  return rows[0] || null;
}

/**
 * Soft delete — admin_ceo only.
 */
export async function softDeleteProject(projectId: string): Promise<boolean> {
  const { rowCount } = await query(
    `UPDATE projects SET deleted_at = NOW() WHERE project_id = $1 AND deleted_at IS NULL`,
    [projectId]
  );
  return (rowCount ?? 0) > 0;
}
