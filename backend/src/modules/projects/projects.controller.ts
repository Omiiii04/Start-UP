import { Request, Response, NextFunction } from 'express';
import * as projectsService from './projects.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import { WorkflowStep, TechFeasibility } from '../../shared/types';

export async function listProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const projects = await projectsService.listProjects(req.user.userId, req.user.role, req.query as any);
    sendSuccess(res, projects);
  } catch (err) { next(err); }
}

export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const project = await projectsService.getProject(req.params.id, req.user.userId, req.user.role);
    sendSuccess(res, project);
  } catch (err) { next(err); }
}

export async function advanceWorkflow(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const { step } = req.body as { step: WorkflowStep };
    const updated = await projectsService.advanceWorkflow(req.params.id, step, req.user.userId, req.user.role);
    sendSuccess(res, updated, 'Workflow step updated.');
  } catch (err) { next(err); }
}

export async function setFeasibility(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const { techFeasibility, notes } = req.body as { techFeasibility: TechFeasibility; notes?: string };
    const updated = await projectsService.setFeasibility(req.params.id, techFeasibility, notes, req.user.role);
    sendSuccess(res, updated, 'Feasibility status updated.');
  } catch (err) { next(err); }
}

export async function updateLinks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    const updated = await projectsService.updateLinks(req.params.id, req.body, req.user.role);
    sendSuccess(res, updated, 'Project links updated.');
  } catch (err) { next(err); }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();
    await projectsService.deleteProject(req.params.id, req.user.role);
    sendSuccess(res, null, 'Project deleted.');
  } catch (err) { next(err); }
}
