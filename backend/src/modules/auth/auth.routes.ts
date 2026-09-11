import { Router } from 'express';
import { authLimiter } from '../../middleware/rateLimiter';
import { authenticate } from '../../middleware/authenticate';
import { validateBody } from '../../middleware/validateBody';
import { googleAuthSchema, refreshTokenSchema, clientRegisterSchema, clientLoginSchema } from './auth.schema';
import * as authController from './auth.controller';

const router = Router();

/**
 * POST /api/v1/auth/google
 * Receive Google id_token from frontend, verify server-side, return JWT.
 * Rate-limited: 10 req/15min per IP.
 */
router.post('/google', authLimiter, validateBody(googleAuthSchema), authController.googleLogin);

/**
 * POST /api/v1/auth/register
 * Client Email/Password registration
 */
router.post('/register', authLimiter, validateBody(clientRegisterSchema), authController.register);

/**
 * POST /api/v1/auth/login
 * Client Email/Password login
 */
router.post('/login', authLimiter, validateBody(clientLoginSchema), authController.login);


/**
 * POST /api/v1/auth/refresh
 * Rotate refresh token. Accepts cookie or body.
 */
router.post('/refresh', authLimiter, authController.refreshToken);

/**
 * POST /api/v1/auth/logout
 * Revoke current device refresh token.
 */
router.post('/logout', authController.logout);

/**
 * POST /api/v1/auth/logout-all
 * Revoke ALL refresh tokens for the authenticated user.
 */
router.post('/logout-all', authenticate, authController.logoutAll);

export default router;
