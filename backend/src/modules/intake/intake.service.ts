import { query } from '../../config/database';
import { screenRequirementUGC } from '../../shared/ugcFilter';
import { AppError, Errors } from '../../shared/apiResponse';
import { DbProject, ServiceTier, ClientCategory } from '../../shared/types';
import { sendIntakeConfirmationEmail } from '../notifications/email.service';
import { sendWhatsAppNotification } from '../notifications/whatsapp.service';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

interface SubmitIntakeInput {
  userId: string;
  userEmail: string;
  userFullName: string;
  title: string;
  description: string;
  clientCategory: ClientCategory;
  institutionOrCompany: string;
  serviceTierRequested: ServiceTier;
  budgetIndicationInr?: number;
  isMaharashtraClient: boolean;
  phoneNumber?: string;
}

/**
 * Generate a human-readable tracking code: PB-2026-XXXXXX
 */
function generateTrackingCode(): string {
  const year = new Date().getFullYear();
  const suffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `PB-${year}-${suffix}`;
}

/**
 * Determine SAC code based on service tier.
 */
function sacCodeForTier(tier: ServiceTier): string {
  return tier === 'enterprise_ai' ? '998315' : '998314';
}

export async function submitIntake(input: SubmitIntakeInput): Promise<{
  project: DbProject;
  ugcResult: ReturnType<typeof screenRequirementUGC>;
  trackingCode: string;
}> {
  // 1. UGC Compliance screening (server-authoritative — not client-side)
  const ugcResult = screenRequirementUGC(`${input.title} ${input.description}`);

  if (ugcResult.recommendation === 'reject') {
    throw new AppError(
      422,
      'UGC_VIOLATION',
      'Your request contains prohibited academic submission content and cannot be processed.'
    );
  }

  // 2. Create project record (workflow_step 1 = Requirement Submission)
  const projectId = uuidv4();
  const trackingCode = generateTrackingCode();
  const sacCode = sacCodeForTier(input.serviceTierRequested);

  const { rows } = await query<DbProject>(
    `INSERT INTO projects (
      project_id, tracking_code, client_id, title, description,
      service_tier, client_category, institution_or_company,
      workflow_step, agreed_budget_inr, sac_code,
      is_maharashtra_client, ugc_compliance_checked, ugc_flagged_keywords,
      tech_feasibility
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING *`,
    [
      projectId, trackingCode, input.userId, input.title, input.description,
      input.serviceTierRequested, input.clientCategory, input.institutionOrCompany,
      1, // workflow_step = 1
      input.budgetIndicationInr || 0,
      sacCode,
      input.isMaharashtraClient,
      true, // ugc_compliance_checked
      ugcResult.flaggedKeywords,
      'under_review', // tech_feasibility starts as under_review
    ]
  );

  const project = rows[0];

  // 3. Send confirmation email (non-blocking — don't fail intake if email fails)
  sendIntakeConfirmationEmail({
    toEmail: input.userEmail,
    toName: input.userFullName,
    projectTitle: input.title,
    trackingCode,
    ugcPassed: ugcResult.passed,
    ugcNotes: ugcResult.notes,
  }).catch((err) => console.error('[Email] Intake confirmation failed:', err));

  // 4. Send WhatsApp notification to Divya (ops manager)
  if (input.phoneNumber) {
    sendWhatsAppNotification(
      input.phoneNumber,
      `✅ ProjectBridge: Your requirement "${input.title}" has been submitted. Tracking ID: ${trackingCode}. Our team will review within 24 hours.`
    ).catch((err) => console.error('[WhatsApp] Intake notification failed:', err));
  }

  return { project, ugcResult, trackingCode };
}

export async function getIntakeStatus(trackingCode: string): Promise<{
  trackingCode: string;
  workflowStep: number;
  techFeasibility: string;
  title: string;
} | null> {
  const { rows } = await query<{
    tracking_code: string;
    workflow_step: number;
    tech_feasibility: string;
    title: string;
  }>(
    `SELECT tracking_code, workflow_step, tech_feasibility, title
     FROM projects
     WHERE tracking_code = $1 AND deleted_at IS NULL`,
    [trackingCode]
  );

  if (rows.length === 0) return null;

  return {
    trackingCode: rows[0].tracking_code,
    workflowStep: rows[0].workflow_step,
    techFeasibility: rows[0].tech_feasibility,
    title: rows[0].title,
  };
}
