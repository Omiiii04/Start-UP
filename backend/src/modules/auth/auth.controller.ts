import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';

/**
 * POST /api/v1/auth/google
 * Receive Google ID token, verify it server-side, return JWT pair.
 */
export async function googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idToken } = req.body as { idToken: string };
    const result = await authService.authenticateWithGoogle(idToken);

    // Set refresh token as HttpOnly cookie
    res.cookie('pb_refresh_token', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth',
    });

    sendSuccess(
      res,
      {
        accessToken: result.tokens.accessToken,
        user: result.user,
      },
      'Authenticated successfully.',
      200
    );
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/auth/refresh
 * Rotate refresh token — accepts from cookie OR body.
 */
export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Prefer HttpOnly cookie, fall back to request body
    const rawToken: string | undefined =
      req.cookies?.pb_refresh_token || req.body?.refreshToken;

    if (!rawToken) throw Errors.unauthorized('Refresh token not provided.');

    const tokens = await authService.rotateRefreshToken(rawToken);

    // Rotate cookie as well
    res.cookie('pb_refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth',
    });

    sendSuccess(res, { accessToken: tokens.accessToken }, 'Token refreshed.');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/auth/logout
 * Revoke the current device's refresh token.
 */
export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const rawToken: string | undefined =
      req.cookies?.pb_refresh_token || req.body?.refreshToken;

    if (rawToken) {
      await authService.revokeToken(rawToken);
    }

    res.clearCookie('pb_refresh_token', { path: '/api/v1/auth' });
    sendSuccess(res, null, 'Logged out successfully.');
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/auth/logout-all
 * Revoke all refresh tokens for the authenticated user (all devices).
 */
export async function logoutAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    await authService.revokeAllTokens(req.user.userId);
    res.clearCookie('pb_refresh_token', { path: '/api/v1/auth' });
    sendSuccess(res, null, 'Logged out from all devices.');
  } catch (err) {
    next(err);
  }
}
