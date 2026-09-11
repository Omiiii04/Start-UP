/**
 * Telegram Bot API service — primary notification and chat channel.
 *
 * Architecture:
 *   Website → Backend → Telegram Bot API → Telegram user/operator
 *
 * The bot token NEVER leaves the backend.
 * The bot username is public and served via GET /api/v1/config.
 *
 * Privacy note:
 *   - Telegram bot conversations are NOT end-to-end encrypted.
 *   - The backend processes incoming webhook updates.
 *   - Only the minimum required data is stored.
 */

import axios, { AxiosError } from 'axios';
import crypto from 'crypto';
import { env, TELEGRAM_CONFIGURED } from '../../config/env';
import { query } from '../../config/database';
import { v4 as uuidv4 } from 'uuid';

// ── Internal logger (never logs the bot token) ────────────────────────────

const log = {
  info: (msg: string, meta?: Record<string, unknown>) =>
    console.log(`[Telegram] ${msg}`, meta ? JSON.stringify(meta) : ''),
  warn: (msg: string, meta?: Record<string, unknown>) =>
    console.warn(`[Telegram:warn] ${msg}`, meta ? JSON.stringify(meta) : ''),
  error: (msg: string, err?: unknown) =>
    console.error(`[Telegram:error] ${msg}`, err instanceof Error ? err.message : err),
};

if (!TELEGRAM_CONFIGURED) {
  log.warn('TELEGRAM_BOT_TOKEN not configured — notifications will be skipped in dev mode.');
}

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;
const LINK_TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

// ── Telegram API types ────────────────────────────────────────────────────

export interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from?: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: 'private' | 'group' | 'supergroup' | 'channel';
    };
    text?: string;
    date: number;
  };
}

// ── Core send method ──────────────────────────────────────────────────────

/**
 * Send a plain text message to a Telegram chat.
 * Uses MarkdownV2 parse mode.
 * @param chatId  - Telegram chat ID (numeric)
 * @param text    - Message text (plain string — do not log full message contents)
 */
export async function sendTelegramMessage(
  chatId: number | string,
  text: string
): Promise<void> {
  if (!TELEGRAM_CONFIGURED) {
    log.info('sendTelegramMessage skipped (not configured)', { chatId });
    return;
  }

  try {
    await axios.post(
      `${TELEGRAM_API_BASE}/sendMessage`,
      {
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      },
      { timeout: 10_000 }
    );
  } catch (err) {
    const axErr = err as AxiosError;
    log.error('sendTelegramMessage failed', {
      chatId,
      status: axErr.response?.status,
      data: axErr.response?.data,
    });
    throw err;
  }
}

/**
 * Send a notification message to the configured admin chat.
 */
export async function sendTelegramAdminNotification(text: string): Promise<void> {
  if (!env.TELEGRAM_ADMIN_CHAT_ID) {
    log.warn('TELEGRAM_ADMIN_CHAT_ID not set — admin notification skipped');
    return;
  }
  await sendTelegramMessage(env.TELEGRAM_ADMIN_CHAT_ID, text);
}

// ── Business notifications ────────────────────────────────────────────────

/**
 * Notify the admin when a new project intake is submitted.
 */
export async function sendIntakeTelegramNotification(params: {
  trackingCode: string;
  clientName: string;
  projectTitle: string;
  serviceTier: string;
  clientCategory: string;
}): Promise<void> {
  const text = [
    `📋 <b>New Project Intake</b>`,
    ``,
    `<b>Tracking ID:</b> <code>${params.trackingCode}</code>`,
    `<b>Client:</b> ${params.clientName}`,
    `<b>Project:</b> ${params.projectTitle}`,
    `<b>Tier:</b> ${params.serviceTier}`,
    `<b>Category:</b> ${params.clientCategory}`,
    ``,
    `🔍 Review in the admin dashboard.`,
  ].join('\n');

  await sendTelegramAdminNotification(text).catch((err) =>
    log.error('Intake admin notification failed', err)
  );
}

/**
 * Notify the admin when an invoice is generated.
 */
export async function sendInvoiceTelegramNotification(params: {
  invoiceNumber: string;
  clientName: string;
  projectTitle: string;
  milestoneLabel: string;
  totalDueInr: number;
}): Promise<void> {
  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n);

  const text = [
    `🧾 <b>Invoice Generated</b>`,
    ``,
    `<b>Invoice:</b> <code>${params.invoiceNumber}</code>`,
    `<b>Client:</b> ${params.clientName}`,
    `<b>Project:</b> ${params.projectTitle}`,
    `<b>Milestone:</b> ${params.milestoneLabel}`,
    `<b>Amount Due:</b> ${formatINR(params.totalDueInr)}`,
  ].join('\n');

  await sendTelegramAdminNotification(text).catch((err) =>
    log.error('Invoice admin notification failed', err)
  );
}

// ── Account linking ───────────────────────────────────────────────────────

/**
 * Create a short-lived, single-use opaque token for Telegram account linking.
 * The token is stored as a hash — the raw token is sent to the user only.
 *
 * Flow:
 *   1. Authenticated user calls POST /api/v1/users/me/telegram/link-token
 *   2. Backend returns a deep link: https://t.me/<BOT_USERNAME>?start=<RAW_TOKEN>
 *   3. User opens Telegram and sends /start <RAW_TOKEN> to the bot
 *   4. Webhook receives the /start message with the raw token
 *   5. Backend verifies and associates Telegram chat_id with the user
 */
export async function createTelegramLinkToken(userId: string): Promise<{
  rawToken: string;
  expiresAt: Date;
}> {
  const rawToken = crypto.randomBytes(24).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + LINK_TOKEN_TTL_MS);

  // Revoke any existing unused tokens for this user first
  await query(
    `DELETE FROM telegram_link_tokens WHERE user_id = $1 AND used = false`,
    [userId]
  );

  await query(
    `INSERT INTO telegram_link_tokens (token_id, user_id, token_hash, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [uuidv4(), userId, tokenHash, expiresAt]
  );

  return { rawToken, expiresAt };
}

/**
 * Verify a link token from a Telegram /start payload.
 * Returns the userId if valid; null otherwise.
 * Marks the token as used (single-use).
 */
export async function verifyAndConsumeLinkToken(rawToken: string): Promise<string | null> {
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const { rows } = await query<{ user_id: string; token_id: string }>(
    `SELECT user_id, token_id FROM telegram_link_tokens
     WHERE token_hash = $1 AND used = false AND expires_at > NOW()`,
    [tokenHash]
  );

  if (rows.length === 0) return null;

  const { user_id, token_id } = rows[0];

  // Mark as used (single-use)
  await query(
    `UPDATE telegram_link_tokens SET used = true WHERE token_id = $1`,
    [token_id]
  );

  return user_id;
}

/**
 * Associate a Telegram chat ID with a user account.
 * Rejects if the chat_id is already linked to a different account.
 */
export async function associateTelegramChat(
  userId: string,
  telegramChatId: number
): Promise<void> {
  // Check for existing association to a different user
  const { rows: existing } = await query<{ user_id: string }>(
    `SELECT user_id FROM users WHERE telegram_chat_id = $1 AND deleted_at IS NULL`,
    [telegramChatId]
  );

  if (existing.length > 0 && existing[0].user_id !== userId) {
    throw new Error('This Telegram account is already linked to a different account.');
  }

  await query(
    `UPDATE users SET telegram_chat_id = $1, telegram_linked_at = NOW(), updated_at = NOW()
     WHERE user_id = $2 AND deleted_at IS NULL`,
    [telegramChatId, userId]
  );
}

/**
 * Remove Telegram association from a user account.
 */
export async function unlinkTelegramChat(userId: string): Promise<void> {
  await query(
    `UPDATE users SET telegram_chat_id = NULL, telegram_linked_at = NULL, updated_at = NOW()
     WHERE user_id = $1 AND deleted_at IS NULL`,
    [userId]
  );
}

// ── Webhook processing ────────────────────────────────────────────────────

/**
 * Validate the Telegram webhook secret token header.
 * Should be called before processing any webhook update.
 *
 * Reference: https://core.telegram.org/bots/api#setwebhook
 * Telegram sends the secret_token in the X-Telegram-Bot-Api-Secret-Token header.
 */
export function verifyWebhookSecret(headerToken: string | undefined): boolean {
  if (!env.TELEGRAM_WEBHOOK_SECRET) {
    // No secret configured — accept all (dev only)
    log.warn('TELEGRAM_WEBHOOK_SECRET not set — webhook requests are not authenticated');
    return true;
  }
  if (!headerToken) return false;
  // Use timingSafeEqual to prevent timing attacks
  try {
    const expected = Buffer.from(env.TELEGRAM_WEBHOOK_SECRET);
    const received = Buffer.from(headerToken);
    if (expected.length !== received.length) return false;
    return crypto.timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}

/**
 * Process an incoming Telegram update.
 * Handles /start <token> for account linking.
 * Keeps response time minimal — heavy work should be done asynchronously.
 */
export async function handleTelegramUpdate(update: TelegramUpdate): Promise<void> {
  const msg = update.message;
  if (!msg?.text || !msg.from || msg.from.is_bot) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  // Handle /start command (with optional linking token)
  if (text.startsWith('/start')) {
    const parts = text.split(' ');
    const payload = parts[1]; // token after /start

    if (payload) {
      // Account linking flow
      await handleLinkingToken(chatId, payload);
    } else {
      // Generic /start — greeting
      await sendTelegramMessage(
        chatId,
        [
          `👋 <b>Welcome to Project Wallah!</b>`,
          ``,
          `I'm the Project Wallah support bot. Here's what I can do:`,
          `• Receive project inquiry notifications`,
          `• Link your account for milestone updates`,
          ``,
          `To link your account, go to your <b>Dashboard → Settings → Link Telegram</b> and follow the instructions.`,
        ].join('\n')
      ).catch((err) => log.error('Welcome message failed', err));
    }
  }
}

async function handleLinkingToken(chatId: number, rawToken: string): Promise<void> {
  try {
    const userId = await verifyAndConsumeLinkToken(rawToken);

    if (!userId) {
      await sendTelegramMessage(
        chatId,
        '❌ This link has expired or is invalid. Please generate a new link from your dashboard.'
      );
      return;
    }

    await associateTelegramChat(userId, chatId);

    await sendTelegramMessage(
      chatId,
      [
        `✅ <b>Telegram account linked successfully!</b>`,
        ``,
        `You will now receive project milestone updates and notifications here.`,
        ``,
        `You can unlink your account at any time from your Project Wallah dashboard.`,
      ].join('\n')
    );

    log.info('Telegram account linked', { userId, chatId });
  } catch (err) {
    log.error('handleLinkingToken failed', err);
    await sendTelegramMessage(
      chatId,
      '❌ Something went wrong while linking your account. Please try again from your dashboard.'
    ).catch(() => {});
  }
}
