import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../shared/types';
import { Errors } from '../shared/apiResponse';

/**
 * authorize — RBAC middleware factory.
 * Must be used after authenticate().
 *
 * @param allowedRoles - Roles that may access this endpoint.
 *   admin_ceo always has access regardless of the specified roles.
 *
 * Usage:
 *   router.get('/crm', authenticate, authorize(['admin_ops', 'admin_ceo']), crmController.list)
 */
export function authorize(allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw Errors.unauthorized('Authentication required.');
      }

      const { role } = req.user;

      // admin_ceo is a superuser — always granted access
      if (role === 'admin_ceo') {
        return next();
      }

      if (!allowedRoles.includes(role)) {
        throw Errors.forbidden(
          `Your role (${role}) does not have access to this resource.`
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * authorizeAdmin — shorthand to require any admin role.
 */
export function authorizeAdmin(req: Request, _res: Response, next: NextFunction): void {
  try {
    if (!req.user) throw Errors.unauthorized();

    const adminRoles: UserRole[] = ['admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops'];
    if (!adminRoles.includes(req.user.role)) {
      throw Errors.forbidden('Admin access required.');
    }

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * authorizeSelf — ensures the requesting user is accessing their own resource.
 * Useful for routes like GET /users/:userId where clients may only view themselves.
 * Admins bypass this check.
 */
export function authorizeSelf(paramName = 'userId') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) throw Errors.unauthorized();

      const adminRoles: UserRole[] = ['admin_ceo', 'admin_backend', 'admin_qa', 'admin_ops'];
      if (adminRoles.includes(req.user.role)) {
        return next(); // Admins bypass ownership check
      }

      const resourceId = req.params[paramName];
      if (req.user.userId !== resourceId) {
        throw Errors.forbidden('You may only access your own data.');
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
