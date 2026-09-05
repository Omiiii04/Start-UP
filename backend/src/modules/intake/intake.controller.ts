import { Request, Response, NextFunction } from 'express';
import * as intakeService from './intake.service';
import { sendSuccess, Errors } from '../../shared/apiResponse';
import { IntakeSubmitInput } from './intake.schema';

export async function submit(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw Errors.unauthorized();

    const body = req.body as IntakeSubmitInput;

    const result = await intakeService.submitIntake({
      userId: req.user.userId,
      userEmail: req.user.email,
      userFullName: req.user.email, // Service fetches name from DB via auth token
      title: body.title,
      description: body.description,
      clientCategory: body.clientCategory,
      institutionOrCompany: body.institutionOrCompany,
      serviceTierRequested: body.serviceTierRequested,
      budgetIndicationInr: body.budgetIndicationInr,
      isMaharashtraClient: body.isMaharashtraClient,
      phoneNumber: body.phoneNumber,
    });

    sendSuccess(
      res,
      {
        projectId: result.project.project_id,
        trackingCode: result.trackingCode,
        workflowStep: result.project.workflow_step,
        ugcResult: result.ugcResult,
        message: result.ugcResult.passed
          ? 'Requirements submitted successfully. Our team will review within 24 hours.'
          : 'Requirements submitted with UGC advisory. Your request may need to be restructured to mentorship format.',
      },
      'Intake submitted.',
      201
    );
  } catch (err) {
    next(err);
  }
}

export async function getStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { trackingCode } = req.params;
    const status = await intakeService.getIntakeStatus(trackingCode);

    if (!status) throw Errors.notFound('Project with this tracking code');

    sendSuccess(res, status);
  } catch (err) {
    next(err);
  }
}
