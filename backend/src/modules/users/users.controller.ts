import { Request, Response, NextFunction } from 'express';
import * as usersService from './users.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';

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
