import { Request, Response, NextFunction } from 'express';
import * as invoicesService from './invoices.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import { ALL_ADMIN_ROLES } from '../../shared/types';

export async function generateInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();

    const { projectId, milestoneId, clientState, sacCode, clientName } = req.body as {
      projectId: string;
      milestoneId: string;
      clientState: string;
      sacCode: '998314' | '998315';
      clientName: string;
    };

    const invoice = await invoicesService.generateInvoice({
      projectId, milestoneId, clientState, sacCode,
      issuedBy: req.user.userId,
      clientName,
    });

    sendSuccess(res, invoice, 'Invoice generated successfully.', 201);
  } catch (err) { next(err); }
}

export async function getProjectInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const isAdmin = ALL_ADMIN_ROLES.includes(req.user.role);
    const invoices = await invoicesService.getInvoicesForProject(req.params.projectId, req.user.userId, isAdmin);
    sendSuccess(res, invoices);
  } catch (err) { next(err); }
}

export async function getInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const isAdmin = ALL_ADMIN_ROLES.includes(req.user.role);
    const invoice = await invoicesService.getInvoiceById(req.params.id, req.user.userId, isAdmin);
    if (!invoice) throw Errors.notFound('Invoice');
    sendSuccess(res, invoice);
  } catch (err) { next(err); }
}
