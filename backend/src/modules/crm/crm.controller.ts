import { Request, Response, NextFunction } from 'express';
import * as crmService from './crm.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';

export async function getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await crmService.getCRMStats();
    sendSuccess(res, stats);
  } catch (err) { next(err); }
}

export async function getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const inquiries = await crmService.getInquiries(req.query as any);
    sendSuccess(res, inquiries);
  } catch (err) { next(err); }
}
