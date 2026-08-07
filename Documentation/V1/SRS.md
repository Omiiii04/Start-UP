
# SRS.md

# Software Requirements Specification (SRS)

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements for the proprietary **Client Portal** and **Internal Operations Management Platform**.

The platform is designed to streamline:

- Customer onboarding
- Project intake
- Milestone tracking
- Real-time project status visibility
- Secure deliverable transmission
- Automated invoicing
- Role-based operational management

The system serves as the centralized digital platform supporting our Pune-based technology consulting services.

---

## 1.2 Scope

The web-based platform serves two primary stakeholder groups.

### External Clients

Including:

- Students
- Academic Researchers
- Early-Stage Founders
- Small & Medium Enterprises (SMEs)

These users can request:

- Custom Software Development
- Artificial Intelligence Solutions
- Machine Learning Services
- MLOps Infrastructure
- Cloud Engineering
- Technical Mentorship

---

### Internal Operations Team

The internal platform supports:

| Team Member       | Responsibility                                 |
| ----------------- | ---------------------------------------------- |
| **Om**      | CEO, Architecture, AI/ML, Technical Approval   |
| **Somnath** | Backend Development, DevOps                    |
| **Falguni** | Frontend Engineering, QA                       |
| **Divya**   | Operations, CRM, Billing, Client Communication |

The platform explicitly excludes any automated academic assignment writing, proxy project execution, or ghostwriting in compliance with **UGC 2018 Regulations**.

---

## 1.3 Definitions, Acronyms & Abbreviations

| Acronym        | Meaning                                       |
| -------------- | --------------------------------------------- |
| **SRS**  | Software Requirements Specification           |
| **UGC**  | University Grants Commission                  |
| **SOW**  | Statement of Work                             |
| **MSA**  | Master Services Agreement                     |
| **RACI** | Responsible, Accountable, Consulted, Informed |
| **RBAC** | Role-Based Access Control                     |
| **MFA**  | Multi-Factor Authentication                   |

---

# 2. Overall Description

## 2.1 Product Perspective

The application functions as a unified platform combining:

- Client Portal
- Internal Operations Dashboard
- Billing System
- Engineering Dashboard
- CRM

### External Integrations

The platform communicates with:

- Razorpay / Cashfree
- WhatsApp Business API
- SendGrid
- AWS S3
- Git Repositories
- AppFlowy
- Internal Engineering Tools

---

## 2.2 User Classes & Personas

| User Class                                     | Responsibilities                                                                                | Access                                |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Client (Student / Researcher)**        | Submit consulting requests, monitor progress, download mentorship resources, milestone payments | Dashboard, File Vault, Chat, Invoices |
| **Client (SME / Founder)**               | Request commercial software, approve contracts, review staging builds                           | Dashboard, Contracts, Payments        |
| **Operations Manager (Divya)**           | CRM, quotations, client communication, GST invoicing                                            | Admin Portal, Billing, CRM            |
| **Lead Architect & CEO (Om)**            | Feasibility analysis, architecture approvals, MLOps approvals                                   | Full System Access                    |
| **Engineering Team (Somnath & Falguni)** | Sprint updates, deployment, QA verification                                                     | Engineering Dashboard, QA             |

---

## 2.3 Operating Environment

### Frontend

- Chrome
- Firefox
- Safari
- Edge

Supports:

- Desktop
- Tablet
- Mobile

---

### Backend

Containerized services running on:

- Node.js
- Python

Hosted on:

- AWS
- Google Cloud Platform (GCP)

---

### Database

- PostgreSQL
- AWS S3 Object Storage

---

## 2.4 Constraints

### Regulatory

- UGC 2018 Anti-Plagiarism Compliance

The platform must **never**:

- Deliver ghostwritten assignments
- Produce academic proxy work
- Store illegal academic submissions

---

### Financial

- Indian GST Compliance
- SAC Codes (998314 / 998315)

---

### Infrastructure

Maintain lean infrastructure costs during early-stage operations.

---

# 3. System Features & Functional Requirements

---

# 3.1 Client Intake & Requirement Submission

## Description

Allows prospective clients to submit project briefs, upload supporting documentation, and schedule technical discussions.

### Functional Requirements

### FR-1.1

The system shall provide an online intake form capturing:

- Client Category
- Project Type
- Budget
- Timeline
- Contact Details

Client Categories:

- Student
- Researcher
- SME
- Individual

---

### FR-1.2

The system shall allow uploads of:

- Requirement Documents
- Research Papers
- Technical Specifications
- Dataset Samples

Maximum file size:

**100 MB per file**

---

### FR-1.3

The platform shall automatically:

- Generate Intake ID
- Send Email Acknowledgement
- Send SMS Confirmation

---

### FR-1.4

Incoming requests shall automatically route to:

| Stage                 | Responsible |
| --------------------- | ----------- |
| Operational Review    | Divya       |
| Technical Feasibility | Om          |
| Architecture Review   | Somnath     |

Maximum review time:

**24 Hours**

---

# 3.2 Quotation & Contract Management

## Description

Generate quotations and legal documentation.

Supported Documents:

- Quotation
- Statement of Work (SOW)
- Master Service Agreement (MSA)

---

### Functional Requirements

### FR-2.1

Generate PDF quotations for:

- Micro Consulting
- Research Support
- MVP Development
- Enterprise AI

---

### FR-2.2

Mandatory Payment Structures

| Tier                       | Milestones                            |
| -------------------------- | ------------------------------------- |
| **Tier 1 (< ₹15K)** | 50% Advance / 50% Delivery            |
| **Tier 2–3**        | 30% Advance / 40% Demo / 30% Delivery |
| **Tier 4**           | 25% / 25% / 25% / 25%                 |

---

### FR-2.3

Support secure digital signatures by:

- Client
- CEO

Before project initiation.

---

# 3.3 Live Project Tracking & Sprint Dashboard

## Description

Provides visibility across the complete project lifecycle.

### Functional Requirements

### FR-3.1

Display project stages including:

- Feasibility
- Architecture
- Sprint Development
- QA
- Staging Demo
- Deployment
- Handover

---

### FR-3.2

Engineering members shall upload:

- Sprint Updates
- Build Logs
- Deployment Notes
- Staging URLs

---

### FR-3.3

Restrict access to source code until final payment while allowing:

- Live Demo
- Staging Server
- Preview Links

---

# 3.4 Payment Processing & Invoicing

## Description

Handles secure online payments and GST-compliant invoicing.

### Functional Requirements

### FR-4.1

Support:

- Razorpay
- Cashfree

Payment Methods:

- UPI
- Credit Card
- Debit Card
- Net Banking
- NEFT
- RTGS

---

### FR-4.2

Automatically apply:

- 18% GST

Include SAC Codes:

- 998314 (Software Services)
- 998315 (Cloud Hosting)

---

### FR-4.3

Automatically:

- Generate Invoice
- Generate Receipt
- Unlock Next Milestone
- Release Deliverables

After payment confirmation.

---

# 3.5 Academic Integrity & UGC Verification

## Description

Ensures all academic engagements comply with institutional policies.

### Functional Requirements

### FR-5.1

Require students and researchers to accept an Academic Integrity Declaration stating:

- Deliverables are for mentorship
- Infrastructure
- Learning
- Open-source reference

---

### FR-5.2

Automatically reject requests containing keywords related to:

- Assignment Writing
- Thesis Writing
- Proxy Submission
- Ghostwriting

---

# 4. Non-Functional Requirements

---

# 4.1 Security & Privacy

### NFR-1.1 — Encryption

- TLS 1.3 (In Transit)
- AES-256 (At Rest)

---

### NFR-1.2 — RBAC

Users may only access:

- Assigned Projects
- Authorized Documents
- Their Own Invoices

---

### NFR-1.3 — Authentication

Administrative users require:

- Multi-Factor Authentication (MFA)

---

# 4.2 Performance & Reliability

### NFR-2.1 — Response Time

Average page load:

**< 2 Seconds**

---

### NFR-2.2 — Availability

Target uptime:

**99.5%**

Excluding scheduled maintenance.

---

# 4.3 Maintainability & Scalability

### NFR-3.1 — Code Quality

Backend services shall maintain:

**Minimum 80% Unit Test Coverage**

---

### NFR-3.2 — Modular Architecture

Services must be independently deployable and horizontally scalable to accommodate increasing demand.

---

# 5. System Interfaces & External Integrations

---

## 5.1 Payment Gateway

Supported Providers:

- Razorpay
- Cashfree

Features:

- Payment Collection
- Webhooks
- Refund APIs

---

## 5.2 Cloud Storage

AWS S3

Capabilities:

- Pre-Signed URLs
- Secure Uploads
- Deliverable Storage
- Versioned Assets

---

## 5.3 Messaging & Notifications

Supported Services:

- WhatsApp Business API
- SendGrid

Used for:

- Status Updates
- OTP Verification
- Invoice Delivery
- Payment Receipts
- Project Notifications

---

# Appendix

## Compliance Standards

- UGC (Promotion of Academic Integrity and Prevention of Plagiarism in Higher Educational Institutions) Regulations, 2018
- Indian GST Compliance
- Role-Based Access Control (RBAC)
- Multi-Factor Authentication (MFA)
- Secure Software Development Lifecycle (SSDLC)

---

## Document Information

| Property                | Value                               |
| ----------------------- | ----------------------------------- |
| **Document Name** | Software Requirements Specification |
| **Version**       | 1.0                                 |
| **Status**        | Draft                               |
| **Owner**         | Om (CEO & Lead Architect)           |
| **Reviewers**     | Somnath, Falguni, Divya             |
| **Approval**      | Executive Leadership Team           |
