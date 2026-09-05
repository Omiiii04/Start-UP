import { OAuth2Client } from 'google-auth-library';
import { query, getClient } from '../../config/database';
import { env, ADMIN_EMAILS_SET } from '../../config/env';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshTokenExpiry,
} from '../../shared/jwt';
import { AppError, Errors } from '../../shared/apiResponse';
import { UserRole, DbUser, DbRefreshToken } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  tokens: AuthTokens;
  user: {
    userId: string;
    email: string;
    fullName: string;
    role: UserRole;
    picture: string | null;
  };
}

/**
 * Verify a Google ID token using Google's public keys.
 * This is secure — we don't trust the client-decoded payload.
 */
export async function verifyGoogleToken(idToken: string): Promise<{
  sub: string;
  email: string;
  name: string;
  picture: string | null;
  emailVerified: boolean;
}> {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      throw new AppError(401, 'INVALID_TOKEN', 'Invalid Google token payload.');
    }

    if (!payload.email_verified) {
      throw new AppError(401, 'EMAIL_NOT_VERIFIED', 'Google account email is not verified.');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || payload.email.split('@')[0],
      picture: payload.picture || null,
      emailVerified: payload.email_verified ?? false,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(401, 'GOOGLE_AUTH_FAILED', 'Failed to verify Google token.');
  }
}

/**
 * Resolve role from email — backend is authoritative.
 * Admin role map: om → admin_ceo, somnath → admin_backend,
 * falguni → admin_qa, divya → admin_ops
 */
function resolveRoleFromEmail(email: string): UserRole {
  const lower = email.toLowerCase().trim();

  if (!ADMIN_EMAILS_SET.has(lower)) return 'client';

  if (lower.startsWith('om@')) return 'admin_ceo';
  if (lower.startsWith('somnath@')) return 'admin_backend';
  if (lower.startsWith('falguni@')) return 'admin_qa';
  if (lower.startsWith('divya@')) return 'admin_ops';

  // Generic admin fallback for other admin emails
  return 'admin_ceo';
}

/**
 * Find or create a user from Google OAuth data.
 */
async function upsertGoogleUser(googleData: {
  sub: string;
  email: string;
  name: string;
  picture: string | null;
}): Promise<DbUser> {
  const role = resolveRoleFromEmail(googleData.email);

  // Try to find existing user by Google ID
  const { rows: existing } = await query<DbUser>(
    `SELECT * FROM users WHERE google_id = $1 AND deleted_at IS NULL`,
    [googleData.sub]
  );

  if (existing.length > 0) {
    // Update picture and name in case they changed in Google
    const { rows: updated } = await query<DbUser>(
      `UPDATE users
       SET picture_url = $1, full_name = $2, updated_at = NOW()
       WHERE google_id = $3
       RETURNING *`,
      [googleData.picture, googleData.name, googleData.sub]
    );
    return updated[0];
  }

  // Check by email — might have been created before Google link
  const { rows: byEmail } = await query<DbUser>(
    `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
    [googleData.email]
  );

  if (byEmail.length > 0) {
    // Link Google account to existing email
    const { rows: linked } = await query<DbUser>(
      `UPDATE users
       SET google_id = $1, picture_url = $2, role = $3, updated_at = NOW()
       WHERE email = $4
       RETURNING *`,
      [googleData.sub, googleData.picture, role, googleData.email]
    );
    return linked[0];
  }

  // Create new user
  const userId = uuidv4();
  const { rows: created } = await query<DbUser>(
    `INSERT INTO users (user_id, email, full_name, role, google_id, picture_url, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, true)
     RETURNING *`,
    [userId, googleData.email, googleData.name, role, googleData.sub, googleData.picture]
  );
  return created[0];
}

/**
 * Store a refresh token hash in the database.
 */
async function storeRefreshToken(userId: string, rawToken: string): Promise<void> {
  const tokenHash = hashToken(rawToken);
  const expiresAt = getRefreshTokenExpiry();

  await query(
    `INSERT INTO refresh_tokens (token_id, user_id, token_hash, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [uuidv4(), userId, tokenHash, expiresAt]
  );
}

/**
 * Authenticate with Google ID token.
 * Verifies token, upserts user, issues JWT pair.
 */
export async function authenticateWithGoogle(idToken: string): Promise<AuthResult> {
  const googleData = await verifyGoogleToken(idToken);
  const user = await upsertGoogleUser(googleData);

  const tokenPayload = {
    userId: user.user_id,
    email: user.email,
    role: user.role,
  };

  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  await storeRefreshToken(user.user_id, refreshToken);

  return {
    tokens: { accessToken, refreshToken },
    user: {
      userId: user.user_id,
      email: user.email,
      fullName: user.full_name,
      role: user.role,
      picture: user.picture_url,
    },
  };
}

/**
 * Rotate refresh token — verify old token, revoke it, issue new pair.
 */
export async function rotateRefreshToken(rawRefreshToken: string): Promise<AuthTokens> {
  const payload = verifyRefreshToken(rawRefreshToken);
  if (!payload) throw Errors.unauthorized('Invalid or expired refresh token.');

  const tokenHash = hashToken(rawRefreshToken);

  // Check token exists and is not revoked
  const { rows } = await query<DbRefreshToken>(
    `SELECT * FROM refresh_tokens
     WHERE token_hash = $1 AND revoked = false AND expires_at > NOW()`,
    [tokenHash]
  );

  if (rows.length === 0) {
    throw Errors.unauthorized('Refresh token is invalid, expired, or already used.');
  }

  // Revoke the old token
  await query(`UPDATE refresh_tokens SET revoked = true WHERE token_hash = $1`, [tokenHash]);

  // Fetch up-to-date user role from DB
  const { rows: users } = await query<DbUser>(
    `SELECT * FROM users WHERE user_id = $1 AND is_active = true AND deleted_at IS NULL`,
    [payload.userId]
  );

  if (users.length === 0) throw Errors.unauthorized('User account not found or deactivated.');

  const user = users[0];
  const tokenPayload = { userId: user.user_id, email: user.email, role: user.role };

  const newAccessToken = signAccessToken(tokenPayload);
  const newRefreshToken = signRefreshToken(tokenPayload);
  await storeRefreshToken(user.user_id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

/**
 * Revoke all refresh tokens for a user (logout all devices).
 */
export async function revokeAllTokens(userId: string): Promise<void> {
  await query(
    `UPDATE refresh_tokens SET revoked = true
     WHERE user_id = $1 AND revoked = false`,
    [userId]
  );
}

/**
 * Revoke a specific refresh token (single device logout).
 */
export async function revokeToken(rawRefreshToken: string): Promise<void> {
  const tokenHash = hashToken(rawRefreshToken);
  await query(
    `UPDATE refresh_tokens SET revoked = true WHERE token_hash = $1`,
    [tokenHash]
  );
}
