import { Router } from 'express';
import { telegramWebhook, telegramInfo } from './telegram.controller';

const router = Router();

/**
 * POST /api/v1/telegram/webhook
 *
 * Telegram pushes updates here. Must be HTTPS in production.
 * Set up via: https://api.telegram.org/bot<TOKEN>/setWebhook?url=<BACKEND_URL>/api/v1/telegram/webhook&secret_token=<WEBHOOK_SECRET>
 *
 * The endpoint must respond within 60 seconds (we respond immediately).
 */
router.post('/webhook', telegramWebhook);

/**
 * GET /api/v1/telegram/info
 *
 * Public endpoint — returns the bot username for frontend deep link construction.
 * Does NOT expose the bot token.
 */
router.get('/info', telegramInfo);

export default router;
