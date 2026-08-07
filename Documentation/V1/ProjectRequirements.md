
# ProjectRequirements.md

# Project Intake, Technical Feasibility & Requirement Standards

---

# 1. Overview & Document Purpose

This document establishes the **functional**, **non-functional**, **technical**, and **legal** standards governing every project undertaken by the organization.

It serves as the primary reference for:

- Project intake
- Technical feasibility assessment
- Scope definition
- Delivery boundaries
- Quality assurance
- Legal compliance
- Client acceptance criteria

Every engagement—whether for **students**, **academic researchers**, **startups**, or **small-to-medium enterprises (SMEs)**—must satisfy the requirements defined in this document before any quotation, contract, or Statement of Work (SOW) is issued.

---

# 2. Project Classification & Scope Boundaries

Projects are categorized into four service tiers based on technical complexity, engineering effort, expected deliverables, and project duration.

---

## Project Tier Matrix

| Service Tier                              | Target Audience                  | Price Range            | Estimated Timeline |
| ----------------------------------------- | -------------------------------- | ---------------------- | ------------------ |
| **Tier 1 – Micro Consulting**      | Students, Independent Developers | ₹2,000 – ₹10,000    | 1–3 Days          |
| **Tier 2 – Research Support**      | Researchers, PG Students         | ₹10,000 – ₹30,000   | 1–2 Weeks         |
| **Tier 3 – MVP Development**       | Early-Stage Founders, SMEs       | ₹25,000 – ₹60,000   | 2–4 Weeks         |
| **Tier 4 – Enterprise AI & MLOps** | Mid-Sized Businesses, Scale-Ups  | ₹60,000 – ₹100,000+ | 1–2 Months        |

---

## Tier 1 — Micro Consulting & Debugging

### Permitted Scope

- Script optimization
- Bug fixing
- API integration
- Database configuration
- Local environment setup
- Technical documentation review
- Code review
- Dependency management

### Excluded Services

- Assignment completion
- Final-year project proxy work
- Ghostwriting
- Academic submissions

---

## Tier 2 — Research Implementation Support

### Permitted Scope

- Dataset preprocessing
- Machine Learning training
- Benchmarking
- MLOps configuration
- Statistical analysis tooling
- Research infrastructure
- Open-source implementation

### Excluded Services

- Thesis writing
- Research paper authoring
- Fabrication of experimental results
- Synthetic data generation for publication

---

## Tier 3 — MVP & Software Development

### Permitted Scope

- Web Applications
- Mobile Applications
- REST APIs
- Backend Systems
- Database Design
- Authentication
- Cloud Deployment

### Excluded Services

- Unlimited feature requests
- Undefined project scope
- Continuous feature additions without change requests

---

## Tier 4 — Enterprise AI, MLOps & Advanced Systems

### Permitted Scope

- AI Platform Development
- LLM Applications
- MLOps Pipelines
- Kubernetes
- Cloud Infrastructure
- Distributed Systems
- Automated Testing
- Enterprise Integrations

### Excluded Services

- Unverified production deployments
- Credential sharing
- Deployment without security verification
- Infrastructure lacking encrypted secret management

---

# 3. Technical Feasibility & Evaluation Framework

Before issuing a quotation or Statement of Work (SOW), every project undergoes a structured technical evaluation conducted by **Om (Lead Architect)** and **Somnath (Backend Lead)**.

---

## Evaluation Process

```text
Client Requirement
        │
        ▼
Technical Review
        │
        ▼
Stack Compatibility
        │
        ▼
Timeline Review
        │
        ▼
Resource Planning
        │
        ▼
Approved?
    │          │
   YES        NO
    │          │
    ▼          ▼

Quotation    Reject /
Generated    Restructure
```

---

## 3.1 Evaluation Criteria

### 1. Technology Stack Compatibility

Questions

- Does the requested technology align with the approved technology stack?
- Can unsupported technologies be safely containerized or migrated?

Approved Technologies

- Python
- Node.js
- React
- TypeScript
- Docker
- PostgreSQL
- Redis
- AWS
- GCP
- FastAPI
- Express.js

---

### 2. Timeline Feasibility

Assessment includes:

- Development Time
- QA Testing
- Client Demonstration
- Deployment
- Buffer Period

### Rush Requests

Projects requiring delivery within **48 hours** require:

- 25% Urgency Fee
- Reduced Scope
- Explicit Approval

---

### 3. Resource & Capacity Planning

Review Team Availability

| Team Member | Primary Responsibility |
| ----------- | ---------------------- |
| Om          | Architecture & AI      |
| Somnath     | Backend & DevOps       |
| Falguni     | Frontend & QA          |
| Divya       | Operations             |

The project is accepted only if sufficient engineering capacity exists.

---

# 4. UGC Compliance & Legal Guardrails

All academic engagements must comply with:

> **University Grants Commission (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations, 2018**

---

## UGC Compliance Filter

```text
                    UGC COMPLIANCE ENGINE

                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼

    PASSED                              FAILED

Technical Mentorship             Assignment Writing
Code Review                      Thesis Writing
Infrastructure                   Proxy Work
MLOps                            Ghostwriting

        │                                     │
        ▼                                     ▼

Proceed to Quotation         Reject or Restructure
```

---

## Mandatory Client Declaration

Every student and researcher must digitally acknowledge the following statement before project onboarding.

> *"I acknowledge that the deliverables provided consist strictly of technical infrastructure, proof-of-concept software, code optimization, or educational mentorship. I retain full responsibility for my academic submissions and confirm these deliverables will not be submitted as proxy work for graded academic evaluation."*

---

# 5. Standard Non-Functional Project Requirements

Every software deliverable must satisfy the organization's engineering standards before client delivery.

---

## 5.1 Code Quality Standards

### Modularity

Applications should follow clear separation of concerns using layered architecture, including:

- Controller
- Service
- Repository
- Data Access
- Utility Modules

---

### Documentation

Every project must include:

- README
- API Documentation
- Swagger / OpenAPI
- Setup Instructions
- Deployment Guide

---

### Version Control

Mandatory Git Branches

```text
main

staging

feature/*
```

No code is demonstrated to clients unless merged through the defined branching strategy.

---

## 5.2 Security Standards

### Secret Management

Never hardcode:

- Passwords
- API Keys
- JWT Secrets
- Database Credentials
- Cloud Keys

Use:

```text
.env
Environment Variables
Secret Manager
```

---

### Database Security

Requirements

- Parameterized Queries
- ORM
- Input Validation
- SQL Injection Prevention

---

### Secure Communication

All APIs must use:

- HTTPS
- TLS 1.3
- Secure Cookies
- JWT Authentication

---

# 6. Deliverable Sign-Off & Acceptance Criteria

A project reaches **Final Delivery (Step 12)** only after all acceptance conditions are satisfied.

---

## Acceptance Checklist

### 1. Staging Verification

The complete solution must execute successfully in the staging environment without critical defects.

---

### 2. QA Approval

All acceptance criteria defined in the Statement of Work (SOW) must pass functional and quality assurance testing.

---

### 3. Financial Clearance

Before source code or production credentials are transferred:

- Final milestone payment must be completed.
- Outstanding invoices must be cleared.

---

### 4. Documentation Delivery

The client receives:

- Source Code
- Deployment Guide
- API Documentation
- Configuration Files
- User Manual (if applicable)

---

### 5. Support Window

Each completed project includes:

- **30-Day Bug Fix Support**
- Coverage limited to defects within the agreed project scope.
- New features or scope changes require a separate change request and quotation.

---

# 7. Project Approval Checklist

Before project initiation, the following conditions must be satisfied.

| Requirement                             | Status |
| --------------------------------------- | ------ |
| Requirement Gathering Completed         | ☐     |
| Technical Feasibility Approved          | ☐     |
| Scope Finalized                         | ☐     |
| Quotation Issued                        | ☐     |
| Statement of Work Signed                | ☐     |
| Master Service Agreement Signed         | ☐     |
| UGC Compliance Verified (if applicable) | ☐     |
| Initial Payment Received                | ☐     |
| Sprint Planning Completed               | ☐     |
| Development Approved                    | ☐     |

---

# Engineering Principles

Every project undertaken by the organization follows these principles:

- Architecture First
- Security by Design
- Documentation First
- API-First Development
- Cloud-Native Deployment
- Modular Architecture
- Version-Controlled Delivery
- Quality Assurance Before Release
- Legal & UGC Compliance
- Transparent Client Communication

---

## Document Information

| Property                | Value                                                         |
| ----------------------- | ------------------------------------------------------------- |
| **Document Name** | Project Intake, Technical Feasibility & Requirement Standards |
| **Version**       | 1.0                                                           |
| **Status**        | Draft                                                         |
| **Primary Owner** | Om (CEO & Lead Architect)                                     |
| **Reviewers**     | Somnath, Falguni, Divya                                       |
| **Last Updated**  | August 2026                                                   |
