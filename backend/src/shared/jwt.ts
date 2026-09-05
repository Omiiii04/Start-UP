import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';
import { JwtPayload } from './types';

/**
 * Sign a short-lived access token (15 min default).
 */
export function signAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    issuer: 'projectbridge-api',
    audience: 'projectbridge-client',
  } as jwt.SignOptions);
}

/**
 * Sign a long-lived refresh token (7 days default).
 * Stored as a SHA-256 hash in the database.
 */
export function signRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    issuer: 'projectbridge-api',
    audience: 'projectbridge-refresh',
  } as jwt.SignOptions);
}

/**
 * Verify and decode an access token. Returns null on failure.
 */
export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: 'projectbridge-api',
      audience: 'projectbridge-client',
    });
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Verify and decode a refresh token. Returns null on failure.
 */
export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: 'projectbridge-api',
      audience: 'projectbridge-refresh',
    });
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Hash a refresh token for secure DB storage.
 * We never store the raw token — only its SHA-256 hash.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Calculate expiry date for a refresh token.
 */
export function getRefreshTokenExpiry(): Date {
  const days = parseInt(env.JWT_REFRESH_EXPIRES_IN.replace('d', ''), 10) || 7;
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry;
}
