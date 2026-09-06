import sgMail from '@sendgrid/mail';
import { env } from '../../config/env';

const SENDGRID_CONFIGURED = Boolean(env.SENDGRID_API_KEY && env.SENDGRID_API_KEY.startsWith('SG.'));

if (SENDGRID_CONFIGURED) {
  sgMail.setApiKey(env.SENDGRID_API_KEY as string);
} else {
  console.warn('[Email] SendGrid not configured — emails will be skipped in dev mode.');
}

const FROM = { email: env.SENDGRID_FROM_EMAIL, name: env.SENDGRID_FROM_NAME };

// ---- Email Templates ----

function baseLayout(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,.08); }
  .header { background: #18181b; padding: 28px 32px; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; letter-spacing: -0.5px; }
  .header span { color: #a1a1aa; font-size: 13px; }
  .body { padding: 32px; }
  .body p { color: #3f3f46; line-height: 1.6; font-size: 14px; }
  .badge { display: inline-block; background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 6px; padding: 4px 10px; font-family: monospace; font-size: 13px; color: #18181b; }
  .table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .table td { padding: 8px 12px; border-bottom: 1px solid #f4f4f5; font-size: 13px; color: #52525b; }
  .table td:first-child { font-weight: 600; color: #18181b; width: 40%; }
  .total { background: #f4f4f5; font-weight: 700 !important; color: #18181b !important; }
  .footer { background: #fafafa; border-top: 1px solid #f4f4f5; padding: 16px 32px; font-size: 11px; color: #a1a1aa; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>ProjectBridge</h1>
      <span>Enterprise Technology Consulting</span>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ProjectBridge. All rights reserved.<br>
      This is an automated message. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>`;
}

// ---- Intake Confirmation ----

export async function sendIntakeConfirmationEmail(params: {
  toEmail: string;
  toName: string;
  projectTitle: string;
  trackingCode: string;
  ugcPassed: boolean;
  ugcNotes: string;
}): Promise<void> {
  const ugcWarning = !params.ugcPassed
    ? `<div style="background:#fef9c3;border:1px solid #fbbf24;border-radius:8px;padding:12px 16px;margin:16px 0;font-size:13px;color:#92400e;">
        ⚠️ <strong>UGC Advisory:</strong> ${params.ugcNotes}
       </div>`
    : '';

  const html = baseLayout(`
    <p>Hi <strong>${params.toName}</strong>,</p>
    <p>Your project requirement has been successfully submitted to ProjectBridge. Our team will review it within <strong>24 hours</strong>.</p>
    <table class="table">
      <tr><td>Project Title</td><td>${params.projectTitle}</td></tr>
      <tr><td>Tracking ID</td><td><span class="badge">${params.trackingCode}</span></td></tr>
      <tr><td>Status</td><td>Under Review</td></tr>
    </table>
    ${ugcWarning}
    <p>You can track your requirement status at any time using your Tracking ID on the ProjectBridge portal.</p>
    <p>If you have questions, reach out to <a href="mailto:support@projectbridge.io">support@projectbridge.io</a></p>
  `);

  if (!SENDGRID_CONFIGURED) {
    console.log(`[Email:dev] Intake confirmation skipped — to: ${params.toEmail}, tracking: ${params.trackingCode}`);
    return;
  }
  await sgMail.send({
    to: { email: params.toEmail, name: params.toName },
    from: FROM,
    subject: `✅ Requirement Submitted — ${params.trackingCode}`,
    html,
  });
}

// ---- Invoice Email ----

export async function sendInvoiceEmail(params: {
  toEmail: string;
  toName: string;
  invoiceNumber: string;
  projectTitle: string;
  milestoneLabel: string;
  subtotalInr: number;
  cgstInr: number;
  sgstInr: number;
  igstInr: number;
  totalDueInr: number;
  sacCode: string;
  sacDescription: string;
  isMaharashtra: boolean;
}): Promise<void> {
  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const taxRows = params.isMaharashtra
    ? `<tr><td>CGST (9%)</td><td>${formatINR(params.cgstInr)}</td></tr>
       <tr><td>SGST (9%)</td><td>${formatINR(params.sgstInr)}</td></tr>`
    : `<tr><td>IGST (18%)</td><td>${formatINR(params.igstInr)}</td></tr>`;

  const html = baseLayout(`
    <p>Hi <strong>${params.toName}</strong>,</p>
    <p>An invoice has been generated for your project <strong>${params.projectTitle}</strong>.</p>
    <table class="table">
      <tr><td>Invoice Number</td><td><span class="badge">${params.invoiceNumber}</span></td></tr>
      <tr><td>Milestone</td><td>${params.milestoneLabel}</td></tr>
      <tr><td>SAC Code</td><td>${params.sacCode} — ${params.sacDescription}</td></tr>
      <tr><td>Subtotal</td><td>${formatINR(params.subtotalInr)}</td></tr>
      ${taxRows}
      <tr class="total"><td>Total Due</td><td>${formatINR(params.totalDueInr)}</td></tr>
    </table>
    <p>Our operations team will share payment instructions separately. Please reference Invoice <strong>${params.invoiceNumber}</strong> in all communications.</p>
  `);

  if (!SENDGRID_CONFIGURED) {
    console.log(`[Email:dev] Invoice email skipped — to: ${params.toEmail}, invoice: ${params.invoiceNumber}`);
    return;
  }
  await sgMail.send({
    to: { email: params.toEmail, name: params.toName },
    from: FROM,
    subject: `🧾 Invoice ${params.invoiceNumber} — ${params.projectTitle}`,
    html,
  });
}

// ---- Project Status Update ----

export async function sendStatusUpdateEmail(params: {
  toEmail: string;
  toName: string;
  projectTitle: string;
  newStep: number;
  stepName: string;
  message?: string;
}): Promise<void> {
  const html = baseLayout(`
    <p>Hi <strong>${params.toName}</strong>,</p>
    <p>Your project <strong>${params.projectTitle}</strong> has been updated.</p>
    <table class="table">
      <tr><td>Current Stage</td><td>Step ${params.newStep}: ${params.stepName}</td></tr>
      ${params.message ? `<tr><td>Note</td><td>${params.message}</td></tr>` : ''}
    </table>
    <p>Log in to your ProjectBridge dashboard to view the latest updates.</p>
  `);

  if (!SENDGRID_CONFIGURED) {
    console.log(`[Email:dev] Status update email skipped — to: ${params.toEmail}, step: ${params.newStep}`);
    return;
  }
  await sgMail.send({
    to: { email: params.toEmail, name: params.toName },
    from: FROM,
    subject: `📦 Project Update — ${params.projectTitle} (Step ${params.newStep})`,
    html,
  });
}
