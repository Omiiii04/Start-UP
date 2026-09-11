import { query } from '../../config/database';
import { Errors } from '../../shared/apiResponse';
import { DbInvoice, DbMilestone, DbProject } from '../../shared/types';
import { calculateGST } from '../../shared/gst';
import { sendInvoiceTelegramNotification } from '../notifications/telegram.service';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate the next invoice number: INV-YYYY-NNN (zero-padded to 4 digits)
 */
async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const { rows } = await query<{ count: string }>(
    `SELECT COUNT(*) FROM invoices WHERE EXTRACT(YEAR FROM issued_at) = $1`,
    [year]
  );
  const seq = parseInt(rows[0].count, 10) + 1;
  return `INV-${year}-${String(seq).padStart(4, '0')}`;
}

interface GenerateInvoiceInput {
  projectId: string;
  milestoneId: string;
  clientState: string;   // e.g. 'MH' for Maharashtra
  sacCode: '998314' | '998315';
  issuedBy: string;      // userId of admin who generated it
  clientName: string;
}

export async function generateInvoice(input: GenerateInvoiceInput): Promise<DbInvoice & { gstBreakdown: ReturnType<typeof calculateGST> }> {
  // 1. Fetch milestone details
  const { rows: milestoneRows } = await query<DbMilestone>(
    `SELECT * FROM milestones WHERE milestone_id = $1`,
    [input.milestoneId]
  );
  if (milestoneRows.length === 0) throw Errors.notFound('Milestone');
  const milestone = milestoneRows[0];

  // 2. Verify milestone belongs to specified project
  if (milestone.project_id !== input.projectId) {
    throw Errors.badRequest('Milestone does not belong to the specified project.');
  }

  // 3. Check milestone is in invoiceable state
  if (milestone.status !== 'pending') {
    throw Errors.conflict(`Milestone is already in '${milestone.status}' status. Cannot re-invoice.`);
  }

  // 4. Fetch project for client info
  const { rows: projectRows } = await query<DbProject>(
    `SELECT * FROM projects WHERE project_id = $1 AND deleted_at IS NULL`,
    [input.projectId]
  );
  if (projectRows.length === 0) throw Errors.notFound('Project');
  const project = projectRows[0];

  // 5. Calculate GST (always recalculated server-side)
  const isMaharashtra = input.clientState.toUpperCase() === 'MH';
  const gst = calculateGST(milestone.subtotal_inr, isMaharashtra, input.sacCode);

  // 6. Generate invoice number
  const invoiceNumber = await getNextInvoiceNumber();

  // 7. Create invoice record
  const invoiceId = uuidv4();
  const { rows } = await query<DbInvoice>(
    `INSERT INTO invoices (
      invoice_id, invoice_number, milestone_id, project_id, client_id,
      subtotal_inr, cgst_inr, sgst_inr, igst_inr, total_due_inr,
      sac_code, client_state, issued_by
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`,
    [
      invoiceId, invoiceNumber, input.milestoneId, input.projectId, project.client_id,
      gst.subtotalInr, gst.cgstInr, gst.sgstInr, gst.igstInr, gst.grandTotalInr,
      input.sacCode, input.clientState, input.issuedBy,
    ]
  );

  // 8. Update milestone status to 'invoiced'
  await query(
    `UPDATE milestones SET status = 'invoiced', invoice_number = $1, updated_at = NOW()
     WHERE milestone_id = $2`,
    [invoiceNumber, input.milestoneId]
  );

  // 9. Notify admin via Telegram (non-blocking)
  sendInvoiceTelegramNotification({
    invoiceNumber,
    clientName: input.clientName,
    projectTitle: project.title,
    milestoneLabel: milestone.milestone_name,
    totalDueInr: gst.grandTotalInr,
  }).catch((err) => console.error('[Telegram] Invoice notification failed:', err?.message));

  return { ...rows[0], gstBreakdown: gst };
}

export async function getInvoicesForProject(
  projectId: string,
  userId: string,
  isAdmin: boolean
): Promise<DbInvoice[]> {
  const params: unknown[] = [projectId];
  let ownershipClause = '';

  if (!isAdmin) {
    ownershipClause = 'AND client_id = $2';
    params.push(userId);
  }

  const { rows } = await query<DbInvoice>(
    `SELECT * FROM invoices WHERE project_id = $1 ${ownershipClause} ORDER BY issued_at DESC`,
    params
  );
  return rows;
}

export async function getInvoiceById(
  invoiceId: string,
  userId: string,
  isAdmin: boolean
): Promise<DbInvoice | null> {
  const params: unknown[] = [invoiceId];
  let ownershipClause = '';

  if (!isAdmin) {
    ownershipClause = 'AND client_id = $2';
    params.push(userId);
  }

  const { rows } = await query<DbInvoice>(
    `SELECT * FROM invoices WHERE invoice_id = $1 ${ownershipClause}`,
    params
  );
  return rows[0] || null;
}
