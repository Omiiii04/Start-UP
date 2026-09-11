import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import { env } from '../../config/env';

export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const user = await usersService.getMyProfile(req.user.userId);
    sendSuccess(res, user);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const updated = await usersService.updateMyProfile(req.user.userId, req.body);
    sendSuccess(res, updated, 'Profile updated successfully.');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/users/me/telegram/link-token
 *
 * Generates a short-lived, single-use Telegram linking token and returns a
 * deep link the user can open to link their Telegram account.
 *
 * The token expires in 10 minutes and can only be used once.
 */
export async function createTelegramLinkToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();

    const { rawToken, expiresAt } = await usersService.createTelegramLinkToken(req.user.userId);
    const botUsername = env.TELEGRAM_BOT_USERNAME;
    const deepLink = `https://t.me/${botUsername}?start=${rawToken}`;

    sendSuccess(res, {
      deepLink,
      expiresAt: expiresAt.toISOString(),
      instructions: `Open the link in Telegram and press Start. The link expires in 10 minutes.`,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/v1/users/me/telegram/unlink
 *
 * Removes the Telegram account association from the current user.
 */
export async function unlinkTelegram(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    await usersService.unlinkTelegram(req.user.userId);
    sendSuccess(res, null, 'Telegram account unlinked successfully.');
  } catch (err) {
    next(err);
  }
}
