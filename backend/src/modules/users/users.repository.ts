import { query } from '../../config/database';
import { DbUser, UserRole, ClientCategory } from '../../shared/types';

export async function findById(userId: string): Promise<DbUser | null> {
  const { rows } = await query<DbUser>(
    `SELECT * FROM users WHERE user_id = $1 AND deleted_at IS NULL`,
    [userId]
  );
  return rows[0] || null;
}

export async function findByEmail(email: string): Promise<DbUser | null> {
  const { rows } = await query<DbUser>(
    `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

export async function updateProfile(
  userId: string,
  data: {
    fullName?: string;
    institutionOrCompany?: string;
    clientCategory?: ClientCategory;
    phoneNumber?: string;
  }
): Promise<DbUser | null> {
  const { rows } = await query<DbUser>(
    `UPDATE users
     SET
       full_name = COALESCE($1, full_name),
       institution_or_company = COALESCE($2, institution_or_company),
       client_category = COALESCE($3, client_category),
       phone_number = COALESCE($4, phone_number),
       updated_at = NOW()
     WHERE user_id = $5 AND deleted_at IS NULL
     RETURNING *`,
    [data.fullName, data.institutionOrCompany, data.clientCategory, data.phoneNumber, userId]
  );
  return rows[0] || null;
}

export async function listAdmins(): Promise<DbUser[]> {
  const { rows } = await query<DbUser>(
    `SELECT * FROM users
     WHERE role != 'client' AND is_active = true AND deleted_at IS NULL
     ORDER BY created_at ASC`
  );
  return rows;
}
