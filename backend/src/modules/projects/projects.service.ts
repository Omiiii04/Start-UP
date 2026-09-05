import * as projectsRepo from './projects.repository';
import { Errors } from '../../shared/apiResponse';
import { UserRole, WorkflowStep, TechFeasibility, ALL_ADMIN_ROLES } from '../../shared/types';

const isAdminRole = (role: UserRole) => ALL_ADMIN_ROLES.includes(role);

export async function listProjects(userId: string, role: UserRole, filters = {}) {
  return projectsRepo.listProjects(userId, isAdminRole(role), filters);
}

export async function getProject(projectId: string, userId: string, role: UserRole) {
  const project = await projectsRepo.getProjectById(projectId, userId, isAdminRole(role));
  if (!project) throw Errors.notFound('Project');
  return project;
}

export async function advanceWorkflow(
  projectId: string,
  newStep: WorkflowStep,
  userId: string,
  role: UserRole
) {
  if (!isAdminRole(role)) throw Errors.forbidden('Only admin users can advance the workflow.');

  // Validate step is within bounds
  if (newStep < 1 || newStep > 15) {
    throw Errors.badRequest('Workflow step must be between 1 and 15.');
  }

  const project = await projectsRepo.getProjectById(projectId, userId, true);
  if (!project) throw Errors.notFound('Project');

  // Workflow can only advance (never go backwards, unless CEO)
  if (role !== 'admin_ceo' && newStep <= project.workflow_step) {
    throw Errors.badRequest('Workflow step can only advance forward.');
  }

  const updated = await projectsRepo.updateWorkflowStep(projectId, newStep);
  if (!updated) throw Errors.notFound('Project');
  return updated;
}

export async function setFeasibility(
  projectId: string,
  techFeasibility: TechFeasibility,
  notes: string | undefined,
  role: UserRole
) {
  if (!['admin_ceo', 'admin_backend'].includes(role)) {
    throw Errors.forbidden('Only CEO or Backend Lead can update feasibility status.');
  }
  const updated = await projectsRepo.updateTechFeasibility(projectId, techFeasibility, notes);
  if (!updated) throw Errors.notFound('Project');
  return updated;
}

export async function updateLinks(
  projectId: string,
  links: object,
  role: UserRole
) {
  if (!isAdminRole(role)) throw Errors.forbidden();
  const updated = await projectsRepo.updateProjectLinks(projectId, links as any);
  if (!updated) throw Errors.notFound('Project');
  return updated;
}

export async function deleteProject(projectId: string, role: UserRole) {
  if (role !== 'admin_ceo') throw Errors.forbidden('Only CEO can delete projects.');
  const deleted = await projectsRepo.softDeleteProject(projectId);
  if (!deleted) throw Errors.notFound('Project');
}
