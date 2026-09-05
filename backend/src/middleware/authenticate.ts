import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../shared/jwt';
import { Errors } from '../shared/apiResponse';

/**
 * authenticate — verifies the Bearer JWT in the Authorization header.
 * Attaches decoded payload to req.user.
 * Throws 401 if token is missing, expired, or invalid.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw Errors.unauthorized('No Bearer token provided.');
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix
    const payload = verifyAccessToken(token);

    if (!payload) {
      throw Errors.unauthorized('Invalid or expired access token.');
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * optionalAuthenticate — same as authenticate but does not throw.
 * If a valid token is present, req.user is set. Otherwise, req.user remains undefined.
 */
export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const payload = verifyAccessToken(token);
    if (payload) req.user = payload;
  }
  next();
}
