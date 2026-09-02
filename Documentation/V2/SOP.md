# SOP.md

## Standard Operating Procedures (SOP)

---

## 1. Executive Summary & Purpose

This document establishes the Standard Operating Procedures (SOPs) that govern the organization's daily operations, engineering workflows, client management, financial processes, quality assurance, and regulatory compliance.

These procedures ensure:

- Operational consistency
- High-quality service delivery
- Transparent communication
- Legal and regulatory compliance
- Efficient project execution
- Business continuity
- Scalable organizational growth

All team members are expected to understand and follow these procedures.

---

## 2. Daily & Weekly Operational Rhythm

### SOP-01 — Daily Standup Meeting

#### Objective

Maintain team alignment, identify blockers early, and monitor project progress.

---

#### Schedule

- **Days:** Monday – Friday
- **Time:** 09:30 AM IST
- **Duration:** 15 Minutes

---

#### Participants

- Om (CEO)
- Somnath (Lead Systems Engineer)
- Falguni (Lead Full-Stack & QA)
- Divya (Operations)

---

#### Meeting Format

Each participant answers three questions:

1. What was completed yesterday?
2. What will be completed today?
3. Are there any blockers?

---

#### Meeting Outcome

Divya records:

- Action Items
- Risks
- Blockers
- Decisions

All blockers should be assigned within **4 hours**.

---

## 3. Client Onboarding Procedures

---

### SOP-02 — Initial Inquiry & Client Intake

#### Owner

**Divya**

---

#### Service Level Agreement (SLA)

| Activity                | Target Time     |
| ----------------------- | --------------- |
| Initial Acknowledgement | Within 2 Hours  |
| Initial Screening       | Within 24 Hours |

---

#### Procedure

1. Receive project inquiry.
2. Review submitted documents.
3. Identify client category.
4. Execute UGC Compliance Screening.
5. Assign Tracking ID.
6. Forward approved requests to Om and Somnath.

---

#### Possible Outcomes

```text
Approved

Rejected

Requires Restructuring
```

---

## SOP-03 — Quotation & Contract Execution

#### Owners

- Divya
- Om

---

#### Procedure

1. Receive technical feasibility approval.
2. Select service tier.
3. Calculate project pricing.
4. Apply GST.
5. Generate quotation.
6. Deliver quotation.
7. Prepare MSA.
8. Prepare SOW.
9. Collect digital signatures.

---

#### Outputs

- Quotation PDF
- MSA
- SOW
- Project Approval

---

## 4. Engineering Procedures

---

### SOP-04 — Development & Pull Request Workflow

#### Owners

- Somnath
- Falguni

---

#### Development Process

```text
Feature Branch
        │
        ▼
Local Testing
        │
        ▼
Pull Request
        │
        ▼
Technical Review
        │
        ▼
QA Review
        │
        ▼
Merge to Staging
```

---

#### Development Checklist

Before creating a Pull Request:

- Unit Tests Pass
- ESLint Passes
- Prettier Formatting
- Black Formatting (Python)
- Documentation Updated

---

#### Pull Request Requirements

Every Pull Request must include:

- Task Reference
- Description
- Testing Evidence
- Reviewer Assignment

---

#### Code Review Checklist

Reviewers verify:

- Architecture
- Security
- Performance
- Readability
- Naming Standards
- Database Efficiency
- No Hardcoded Secrets

---

## SOP-05 — Quality Assurance & Client Demonstration

#### Owner

**Falguni**

---

#### QA Process

1. Execute unit tests.
2. Execute integration tests.
3. Execute regression tests.
4. Perform UI review.
5. Verify accessibility.
6. Validate acceptance criteria.
7. Prepare QA report.

---

#### Outputs

- QA Pass Certificate
- Staging Approval
- Client Demonstration Request

---

## 5. Financial Procedures

---

### SOP-06 — GST Invoicing & Payment Collection

#### Owners

- Divya
- Om

---

#### Invoice Workflow

```text
Milestone Completed
        │
        ▼
Generate Invoice
        │
        ▼
GST Calculation
        │
        ▼
Payment Link
        │
        ▼
Payment Confirmation
        │
        ▼
Issue Tax Invoice
```

---

#### GST Rules

##### Maharashtra

- CGST — 9%
- SGST — 9%

---

##### Outside Maharashtra

- IGST — 18%

---

#### SAC Codes

| Service              | SAC    |
| -------------------- | ------ |
| Software Development | 998314 |
| Cloud Infrastructure | 998315 |

---

#### Outputs

- Tax Invoice
- Payment Receipt
- Workflow Unlock

---

## 6. Compliance Procedures

---

### SOP-07 — UGC Compliance & Scope Restructuring

#### Owners

- Om
- Divya

---

#### Trigger

Client requests:

- Assignment completion
- Thesis writing
- Proxy work
- Ghostwriting

---

#### Procedure

1. Place request on **COMPLIANCE HOLD**.
2. Notify client.
3. Explain policy.
4. Offer compliant alternatives.
5. Update scope.
6. Obtain Academic Integrity Declaration.

---

#### Permitted Alternatives

- Technical Mentorship
- Code Review
- Debugging
- MLOps
- Infrastructure
- Architecture Guidance
- Open-Source Development

---

#### Rejection Criteria

If the client insists on prohibited work:

- Reject inquiry
- Record decision
- Close request

---

## SOP-08 — Emergency Incident Response

#### Owners

- Om
- Somnath

---

#### Trigger Events

- Production outage
- Security breach
- Credential exposure
- Infrastructure failure
- Critical deployment failure

---

#### Response Workflow

```text
Incident Detected
        │
        ▼
Containment
        │
        ▼
Investigation
        │
        ▼
Resolution
        │
        ▼
Deployment
        │
        ▼
Post-Mortem
```

---

#### Incident Actions

##### Containment

- Revoke credentials
- Isolate affected systems
- Roll back deployment

---

##### Investigation

Review:

- CloudWatch
- Logs
- Monitoring
- Error Reports

---

##### Resolution

- Hotfix Development
- QA Verification
- Production Deployment

---

##### Post-Mortem

Within **24 Hours**

Document:

- Root Cause
- Timeline
- Impact
- Lessons Learned
- Preventive Actions

---

## 7. Internal Meeting Schedule

| Meeting           | Frequency     | Participants     |
| ----------------- | ------------- | ---------------- |
| Daily Standup     | Daily         | Entire Team      |
| Sprint Planning   | Bi-Weekly     | Engineering      |
| Code Review       | Continuous    | Engineering      |
| QA Review         | Every Release | Engineering & QA |
| Operations Review | Weekly        | Om & Divya       |
| Financial Review  | Monthly       | Om & Divya       |
| Strategy Review   | Quarterly     | Leadership       |

---

## 8. Operational Maintenance Matrix

| SOP Domain    | Owner      | Review Frequency | Next Review          |
| ------------- | ---------- | ---------------- | -------------------- |
| Client Intake | Divya      | Monthly          | Last Friday of Month |
| Engineering   | Somnath    | Bi-Weekly        | Sprint End           |
| QA            | Falguni    | Bi-Weekly        | Sprint End           |
| Financial     | Divya & Om | Monthly          | Before GST Filing    |
| Compliance    | Om & Divya | Quarterly        | Academic Quarter End |

---

## 9. Operational Principles

Every team member should follow these principles:

- Documentation First
- Client Transparency
- Security by Default
- Quality Before Delivery
- Compliance Before Execution
- Continuous Communication
- Engineering Excellence
- Accountability
- Continuous Improvement
- Respect for Deadlines

---

## 10. SOP Review & Change Management

Any modification to an SOP requires:

1. Proposal Submission
2. Leadership Review
3. Technical Validation
4. Approval
5. Documentation Update
6. Team Communication

Major operational changes should be reviewed during leadership meetings before implementation.

---

### Document Governance

#### Primary Owner

**Divya**
Head of Operations

#### Secondary Reviewers

- Om (Founder & CEO)
- Somnath (Lead Systems Engineer)
- Falguni (Lead Full-Stack Engineer & QA)

---

### Document Information

| Property                | Value                               |
| ----------------------- | ----------------------------------- |
| **Document Name**       | Standard Operating Procedures (SOP) |
| **Version**             | 1.0                                 |
| **Status**              | Draft                               |
| **Primary Owner**       | Divya                               |
| **Reviewers**           | Om, Somnath, Falguni                |
| **Last Updated**        | August 2026                         |
