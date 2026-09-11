import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validateBody } from '../../middleware/validateBody';
import { z } from 'zod';
import * as usersController from './users.controller';

const router = Router();

const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  institutionOrCompany: z.string().max(255).optional(),
  clientCategory: z.enum(['student', 'researcher', 'sme', 'enterprise']).optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/).optional(),
});

/**
 * GET /api/v1/users/me
 * Returns the authenticated user's profile.
 */
router.get('/me', authenticate, usersController.getMe);

/**
 * PATCH /api/v1/users/me
 * Update the authenticated user's profile.
 */
router.patch('/me', authenticate, validateBody(updateProfileSchema), usersController.updateMe);

/**
 * POST /api/v1/users/me/telegram/link-token
 * Generate a short-lived Telegram account linking token.
 * Returns a deep link the user opens in Telegram.
 */
router.post('/me/telegram/link-token', authenticate, usersController.createTelegramLinkToken);

/**
 * DELETE /api/v1/users/me/telegram/unlink
 * Remove the Telegram account association from the current user.
 */
router.delete('/me/telegram/unlink', authenticate, usersController.unlinkTelegram);

export default router;
