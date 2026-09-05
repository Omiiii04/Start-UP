import { query } from '../../config/database';
import { Errors } from '../../shared/apiResponse';
import { DbProject } from '../../shared/types';

export async function getCRMStats(): Promise<{
  totalProjects: number;
  byStep: Record<number, number>;
  byTier: Record<string, number>;
  byFeasibility: Record<string, number>;
  recentProjects: DbProject[];
}> {
  const [totals, byStep, byTier, byFeasibility, recent] = await Promise.all([
    query<{ total: string }>(`SELECT COUNT(*) as total FROM projects WHERE deleted_at IS NULL`),
    query<{ workflow_step: number; count: string }>(
      `SELECT workflow_step, COUNT(*) as count FROM projects WHERE deleted_at IS NULL GROUP BY workflow_step`
    ),
    query<{ service_tier: string; count: string }>(
      `SELECT service_tier, COUNT(*) as count FROM projects WHERE deleted_at IS NULL GROUP BY service_tier`
    ),
    query<{ tech_feasibility: string; count: string }>(
      `SELECT tech_feasibility, COUNT(*) as count FROM projects WHERE deleted_at IS NULL GROUP BY tech_feasibility`
    ),
    query<DbProject>(
      `SELECT p.*, u.full_name as client_name, u.email as client_email
       FROM projects p
       LEFT JOIN users u ON p.client_id = u.user_id
       WHERE p.deleted_at IS NULL
       ORDER BY p.created_at DESC LIMIT 10`
    ),
  ]);

  const stepMap: Record<number, number> = {};
  byStep.rows.forEach((r) => { stepMap[r.workflow_step] = parseInt(r.count, 10); });

  const tierMap: Record<string, number> = {};
  byTier.rows.forEach((r) => { tierMap[r.service_tier] = parseInt(r.count, 10); });

  const feasMap: Record<string, number> = {};
  byFeasibility.rows.forEach((r) => { feasMap[r.tech_feasibility] = parseInt(r.count, 10); });

  return {
    totalProjects: parseInt(totals.rows[0].total, 10),
    byStep: stepMap,
    byTier: tierMap,
    byFeasibility: feasMap,
    recentProjects: recent.rows,
  };
}

export async function getInquiries(filter?: { techFeasibility?: string }): Promise<DbProject[]> {
  const conditions = ['p.deleted_at IS NULL'];
  const params: unknown[] = [];
  let idx = 1;

  if (filter?.techFeasibility) {
    conditions.push(`p.tech_feasibility = $${idx++}`);
    params.push(filter.techFeasibility);
  }

  const { rows } = await query<DbProject>(
    `SELECT p.*, u.full_name as client_name, u.email as client_email, u.phone_number as client_phone
     FROM projects p
     LEFT JOIN users u ON p.client_id = u.user_id
     WHERE ${conditions.join(' AND ')}
     ORDER BY p.created_at DESC`,
    params
  );
  return rows;
}
