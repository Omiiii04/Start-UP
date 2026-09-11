import { Request, Response, NextFunction } from 'express';
import { handleTelegramUpdate, verifyWebhookSecret, TelegramUpdate } from '../notifications/telegram.service';
import { sendSuccess } from '../../shared/apiResponse';

/**
 * POST /api/v1/telegram/webhook
 *
 * Receives webhook updates from Telegram.
 * Validates the secret token header before processing.
 * Always responds 200 immediately — processing happens asynchronously.
 *
 * Reference: https://core.telegram.org/bots/api#update
 */
export async function telegramWebhook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const secretToken = req.headers['x-telegram-bot-api-secret-token'] as string | undefined;

    if (!verifyWebhookSecret(secretToken)) {
      // Return 401 silently — don't reveal why it failed
      res.status(401).json({ success: false });
      return;
    }

    // Respond immediately — Telegram requires a fast response
    res.status(200).json({ ok: true });

    // Process the update asynchronously (do not await)
    const update = req.body as TelegramUpdate;
    handleTelegramUpdate(update).catch((err) =>
      console.error('[Telegram:webhook] Update processing error:', err?.message)
    );
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/telegram/info
 *
 * Public endpoint — returns bot username for the frontend to construct deep links.
 * Never exposes the bot token.
 */
export function telegramInfo(_req: Request, res: Response): void {
  sendSuccess(res, {
    botUsername: process.env.TELEGRAM_BOT_USERNAME || 'start_up',
  });
}
