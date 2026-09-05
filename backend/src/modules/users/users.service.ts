import * as usersRepo from './users.repository';
import { Errors } from '../../shared/apiResponse';
import { DbUser, ClientCategory } from '../../shared/types';

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
