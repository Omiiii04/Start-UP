import * as usersRepo from './users.repository';
import { Errors } from '../../shared/apiResponse';
import { DbUser, ClientCategory } from '../../shared/types';
import {
  createTelegramLinkToken as telegramCreateToken,
  unlinkTelegramChat,
} from '../notifications/telegram.service';

function sanitizeUser(user: DbUser) {
  // Strip sensitive fields before sending to client
  const { password_hash, google_id, ...safe } = user;
  return safe;
}

export async function getMyProfile(userId: string) {
  const user = await usersRepo.findById(userId);
  if (!user) throw Errors.notFound('User');
  return sanitizeUser(user);
}

export async function updateMyProfile(
  userId: string,
  data: {
    fullName?: string;
    institutionOrCompany?: string;
    clientCategory?: ClientCategory;
    phoneNumber?: string;
  }
) {
  const updated = await usersRepo.updateProfile(userId, data);
  if (!updated) throw Errors.notFound('User');
  return sanitizeUser(updated);
}

/**
 * Create a Telegram link token for the user.
 * Delegates to the Telegram service for token generation and storage.
 */
export async function createTelegramLinkToken(userId: string) {
  return telegramCreateToken(userId);
}

/**
 * Unlink the Telegram account from the user.
 */
export async function unlinkTelegram(userId: string) {
  await unlinkTelegramChat(userId);
}
