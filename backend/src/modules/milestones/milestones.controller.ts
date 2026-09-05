import { Request, Response, NextFunction } from 'express';
import * as milestonesService from './milestones.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import { ALL_ADMIN_ROLES, MilestoneStatus } from '../../shared/types';

export async function getMilestones(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const isAdmin = ALL_ADMIN_ROLES.includes(req.user.role);
    const milestones = await milestonesService.getMilestonesForProject(
      req.params.projectId, req.user.userId, isAdmin
    );
    sendSuccess(res, milestones);
  } catch (err) { next(err); }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const { status, paymentGatewayRef } = req.body as {
      status: MilestoneStatus;
      paymentGatewayRef?: string;
    };
    const updated = await milestonesService.updateMilestoneStatus(
      req.params.milestoneId, status, paymentGatewayRef
    );
    sendSuccess(res, updated, 'Milestone status updated.');
  } catch (err) { next(err); }
}
