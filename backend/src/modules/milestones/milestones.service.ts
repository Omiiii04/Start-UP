import { query } from '../../config/database';
import { Errors } from '../../shared/apiResponse';
import { DbMilestone, MilestoneStatus } from '../../shared/types';
import { calculateGST } from '../../shared/gst';
import { v4 as uuidv4 } from 'uuid';

interface CreateMilestoneInput {
  projectId: string;
  milestoneName: string;
  percentage: number;
  subtotalInr: number;
  isMaharashtraClient: boolean;
  sacCode: '998314' | '998315';
}

export async function createMilestonesForProject(
  projectId: string,
  budget: number,
  isMaharashtra: boolean,
  sacCode: '998314' | '998315',
  structure: { name: string; percentage: number }[]
): Promise<DbMilestone[]> {
  const created: DbMilestone[] = [];

  for (const m of structure) {
    const subtotal = Math.round((m.percentage / 100) * budget);
    const gst = calculateGST(subtotal, isMaharashtra, sacCode);

    const { rows } = await query<DbMilestone>(
      `INSERT INTO milestones (
        milestone_id, project_id, milestone_name, percentage,
        subtotal_inr, cgst_inr, sgst_inr, igst_inr, total_due_inr, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending')
      RETURNING *`,
      [
        uuidv4(), projectId, m.name, m.percentage,
        gst.subtotalInr, gst.cgstInr, gst.sgstInr, gst.igstInr, gst.grandTotalInr,
      ]
    );
    created.push(rows[0]);
  }

  return created;
}

export async function getMilestonesForProject(
  projectId: string,
  userId: string,
  isAdmin: boolean
): Promise<DbMilestone[]> {
  // Verify ownership via project table
  const ownerCheck = isAdmin ? '' : `AND p.client_id = '${userId}'`;
  const { rows: projectCheck } = await query(
    `SELECT project_id FROM projects WHERE project_id = $1 ${isAdmin ? '' : 'AND client_id = $2'} AND deleted_at IS NULL`,
    isAdmin ? [projectId] : [projectId, userId]
  );

  if (projectCheck.length === 0) throw Errors.forbidden('Access denied to this project.');

  const { rows } = await query<DbMilestone>(
    `SELECT * FROM milestones WHERE project_id = $1 ORDER BY percentage ASC`,
    [projectId]
  );
  return rows;
}

export async function updateMilestoneStatus(
  milestoneId: string,
  status: MilestoneStatus,
  paymentGatewayRef?: string
): Promise<DbMilestone> {
  const { rows } = await query<DbMilestone>(
    `UPDATE milestones
     SET status = $1,
         payment_gateway_ref = COALESCE($2, payment_gateway_ref),
         signoff_date = CASE WHEN $1 = 'paid' THEN NOW() ELSE signoff_date END,
         updated_at = NOW()
     WHERE milestone_id = $3
     RETURNING *`,
    [status, paymentGatewayRef || null, milestoneId]
  );

  if (rows.length === 0) throw Errors.notFound('Milestone');
  return rows[0];
}
