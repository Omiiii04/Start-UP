import axios from 'axios';
import { env } from '../../config/env';

const WHATSAPP_API_BASE = `https://graph.facebook.com/v19.0/${env.WHATSAPP_PHONE_NUMBER_ID}`;

/**
 * Send a plain text WhatsApp message via Meta Cloud API.
 * Phone number must include country code (e.g., 919876543210 for India).
 */
export async function sendWhatsAppNotification(
  to: string,
  message: string
): Promise<void> {
  // Normalize phone: strip non-digits, ensure no leading +
  const phone = to.replace(/\D/g, '');

  await axios.post(
    `${WHATSAPP_API_BASE}/messages`,
    {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'text',
      text: { body: message, preview_url: false },
    },
    {
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }
  );
}

/**
 * Send a template message (for pre-approved WhatsApp templates).
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  components: object[]
): Promise<void> {
  const phone = to.replace(/\D/g, '');

  await axios.post(
    `${WHATSAPP_API_BASE}/messages`,
    {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: templateName,
        language: { code: languageCode },
        components,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }
  );
}

/**
 * Convenience: send intake acknowledgement to client's WhatsApp.
 */
export async function sendIntakeWhatsApp(
  phone: string,
  name: string,
  projectTitle: string,
  trackingCode: string
): Promise<void> {
  const msg = `✅ *ProjectBridge*\n\nHi ${name}!\n\nYour project requirement has been submitted.\n\n📋 *Project:* ${projectTitle}\n🔖 *Tracking ID:* ${trackingCode}\n\nOur team will review within 24 hours. Reply to this message for support.`;
  await sendWhatsAppNotification(phone, msg);
}
