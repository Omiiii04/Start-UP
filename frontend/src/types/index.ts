export type ServiceTier = 
  | 'micro_debug'        // Tier 1: ₹2,000 – ₹10,000 (1–3 Days)
  | 'research_support'   // Tier 2: ₹10,000 – ₹30,000 (1–2 Weeks)
  | 'mvp_development'    // Tier 3: ₹25,000 – ₹60,000 (2–4 Weeks)
  | 'enterprise_ai';     // Tier 4: ₹60,000 – ₹100,000+ (1–2 Months)

export type ClientCategory = 'student' | 'researcher' | 'sme' | 'enterprise';

export type UserRole = 
  | 'client'
  | 'admin_ceo'      // Om - Architecture & AI
  | 'admin_backend'  // Somnath - Backend & DevOps
  | 'admin_qa'       // Falguni - Frontend & QA
  | 'admin_ops';     // Divya - Operations & Invoicing

export interface User {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  clientCategory?: ClientCategory;
  institutionOrCompany?: string;
  createdAt: string;
}

export type WorkflowStepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export interface WorkflowStepMeta {
  step: WorkflowStepId;
  name: string;
  phase: 'Phase I: Onboarding' | 'Phase II: Contract' | 'Phase III: Engineering' | 'Phase IV: Demo & Payment' | 'Phase V: Handover';
  owner: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStepMeta[] = [
  { step: 1, name: 'Requirement Submission', phase: 'Phase I: Onboarding', owner: 'Divya', description: 'Intake form submission with UGC compliance check' },
  { step: 2, name: 'Technical Feasibility Review', phase: 'Phase I: Onboarding', owner: 'Om & Somnath', description: 'Stack compatibility & resource capacity evaluation' },
  { step: 3, name: 'Requirement Discussion', phase: 'Phase I: Onboarding', owner: 'Divya & Om', description: 'Discovery call to clarify specs & constraints' },
  { step: 4, name: 'Scope Finalization', phase: 'Phase II: Contract', owner: 'Om & Somnath', description: 'Feature checklist & baseline agreement' },
  { step: 5, name: 'Quotation Generation', phase: 'Phase II: Contract', owner: 'Divya', description: 'Formal GST quotation & pricing schedule' },
  { step: 6, name: 'Agreement Sign-Off', phase: 'Phase II: Contract', owner: 'Om & Divya', description: 'Signed MSA & Statement of Work (SOW)' },
  { step: 7, name: 'Advance Payment', phase: 'Phase II: Contract', owner: 'Divya', description: 'Advance milestone receipt & project unlock' },
  { step: 8, name: 'Architecture & Sprint Planning', phase: 'Phase III: Engineering', owner: 'Om & Somnath', description: 'System design, DB schemas & sprint backlog' },
  { step: 9, name: 'Sprint Development', phase: 'Phase III: Engineering', owner: 'Somnath & Falguni', description: 'Active full-stack, AI & API development' },
  { step: 10, name: 'QA & Progress Updates', phase: 'Phase III: Engineering', owner: 'Falguni & Divya', description: 'Unit testing, regression & staging updates' },
  { step: 11, name: 'Client Demonstration', phase: 'Phase IV: Demo & Payment', owner: 'Om, Somnath & Divya', description: 'Staging walkthrough & demo sign-off' },
  { step: 12, name: 'Final Delivery', phase: 'Phase IV: Demo & Payment', owner: 'Om & Somnath', description: 'Production build & complete documentation' },
  { step: 13, name: 'Final Payment', phase: 'Phase IV: Demo & Payment', owner: 'Divya', description: 'Final invoice clearance & tax verification' },
  { step: 14, name: 'Source Code Handover', phase: 'Phase V: Handover', owner: 'Om & Somnath', description: 'Repository transfer & IP certificate issuance' },
  { step: 15, name: 'Support & Project Closure', phase: 'Phase V: Handover', owner: 'Somnath & Falguni', description: '30-Day bug support SLA & project archiving' },
];

export type MilestoneStatus = 'pending' | 'invoiced' | 'paid' | 'released';

export interface Milestone {
  milestoneId: string;
  projectId: string;
  milestoneName: string;
  percentage: number;
  subtotalInr: number;
  cgstInr: number;
  sgstInr: number;
  igstInr: number;
  totalDueInr: number;
  status: MilestoneStatus;
  invoiceNumber?: string;
  paymentGatewayRef?: string;
  signoffDate?: string;
}

export interface Project {
  projectId: string;
  trackingCode: string;
  clientId: string;
  clientName: string;
  clientCategory: ClientCategory;
  institutionOrCompany: string;
  title: string;
  description: string;
  serviceTier: ServiceTier;
  workflowStep: WorkflowStepId;
  agreedBudgetInr: number;
  sacCode: string; // 998314 or 998315
  isMaharashtraClient: boolean;
  stagingUrl?: string;
  repositoryUrl?: string;
  gitBranch?: string;
  gitCommitHash?: string;
  testsPassingCount?: number;
  testsTotalCount?: number;
  ugcComplianceChecked: boolean;
  milestones: Milestone[];
  createdAt: string;
  assignedEngineers: {
    name: string;
    role: string;
  }[];
}

export interface UGCScreeningResult {
  passed: boolean;
  flaggedKeywords: string[];
  recommendation: 'proceed' | 'restructure_to_mentorship' | 'reject';
  notes: string;
}

export interface CRMInquiry {
  inquiryId: string;
  clientName: string;
  email: string;
  category: ClientCategory;
  serviceTier: ServiceTier;
  projectTitle: string;
  budgetInr: number;
  ugcResult: UGCScreeningResult;
  techFeasibility: 'approved' | 'under_review' | 'rejected';
  assignedArchitect: string;
  submittedAt: string;
}
