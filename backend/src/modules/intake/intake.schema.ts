import { z } from 'zod';

export const intakeSubmitSchema = z.object({
  title: z.string().min(5, 'Project title must be at least 5 characters').max(255),
  description: z.string().min(20, 'Please provide a detailed description (min 20 chars)').max(5000),
  clientCategory: z.enum(['student', 'researcher', 'sme', 'enterprise']),
  institutionOrCompany: z.string().min(2).max(255),
  serviceTierRequested: z.enum(['micro_debug', 'research_support', 'mvp_development', 'enterprise_ai']),
  budgetIndicationInr: z.number().positive().optional(),
  timelineWeeks: z.number().int().positive().max(52).optional(),
  agreedToUgcDisclaimer: z.boolean().refine((v) => v === true, {
    message: 'You must agree to the UGC Academic Integrity declaration to proceed.',
  }),
  isMaharashtraClient: z.boolean().default(true),
});

export type IntakeSubmitInput = z.infer<typeof intakeSubmitSchema>;

