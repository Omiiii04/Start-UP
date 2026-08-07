
# TechStack.md

# Approved Technology Stack, Infrastructure Architecture & Tooling Standards

---

# 1. Executive Summary & Selection Philosophy

To ensure reliability, maintainability, scalability, and rapid software delivery, the organization follows a standardized technology stack across all internal systems and client projects.

Technology selection is guided by four core principles:

- **Developer Productivity** — Mature frameworks with strong ecosystems and long-term support.
- **Type Safety & Reliability** — Strongly typed development to reduce runtime defects.
- **Cloud-Native Architecture** — Containerized, platform-agnostic services deployable across multiple cloud providers.
- **AI & MLOps Readiness** — Native support for modern artificial intelligence and machine learning workflows.

Every production system should adhere to the technologies and standards defined in this document unless formally approved otherwise.

---

# 2. Approved Technology Stack Matrix

| Layer                               | Primary Technology                  | Alternate / Secondary       | Primary Owner     |
| ----------------------------------- | ----------------------------------- | --------------------------- | ----------------- |
| **Frontend Framework**        | React 18 + TypeScript               | Next.js                     | Falguni           |
| **Styling**                   | Tailwind CSS                        | Shadcn/UI, Radix UI         | Falguni           |
| **Build Tool**                | Vite                                | SWC, Webpack                | Somnath           |
| **Backend API**               | Node.js + Express + TypeScript      | FastAPI                     | Somnath           |
| **AI / ML Engine**            | Python 3.11+, PyTorch, Scikit-learn | Hugging Face Transformers   | Om                |
| **Database**                  | PostgreSQL 16+                      | Amazon RDS PostgreSQL       | Somnath           |
| **Cache & Queue**             | Redis                               | BullMQ                      | Somnath           |
| **Containerization**          | Docker & Docker Compose             | Containerd                  | Somnath & Falguni |
| **Cloud Platform**            | AWS                                 | Google Cloud Platform (GCP) | Om                |
| **CI/CD**                     | GitHub Actions                      | AWS CodePipeline            | Somnath           |
| **Workspace & Documentation** | AppFlowy                            | Notion, Jira                | Divya             |

---

# 3. Layer Specifications

---

## 3.1 Frontend Layer

### Primary Technologies

- React 18
- TypeScript
- Tailwind CSS
- Vite

### Engineering Goals

- Component-based architecture
- Strong static typing
- Responsive user interfaces
- High performance
- Accessible design
- Reusable UI components

### Supporting Libraries

- React Router
- TanStack Query
- React Hook Form
- Zod
- Lucide React
- Framer Motion

---

## 3.2 Backend Services

### Primary Stack

- Node.js
- Express.js
- TypeScript

### Responsibilities

- Authentication
- Client Portal
- CRM
- Project Management
- Billing
- GST Invoicing
- Notifications
- Business Logic

---

### Alternate Service Layer

**FastAPI**

Used for:

- AI Services
- ML APIs
- Long-running Jobs
- Data Processing
- Model Inference

---

# 3.3 AI & Machine Learning Stack

Primary Technologies

- Python 3.11+
- PyTorch
- Scikit-learn
- NumPy
- Pandas

Optional Technologies

- Hugging Face Transformers
- ONNX Runtime
- MLflow
- LangChain
- OpenAI SDK

---

## AI Responsibilities

- Model Training
- Dataset Processing
- Model Evaluation
- Inference APIs
- Benchmarking
- AI Agent Development

---

# 3.4 Database Layer

## Primary Database

**PostgreSQL 16+**

Stores:

- Users
- Projects
- Contracts
- Invoices
- Audit Logs
- CRM Records

---

## Cache Layer

**Redis**

Responsibilities

- Session Storage
- Rate Limiting
- Job Queues
- Temporary Cache

---

## Object Storage

**Amazon S3**

Stores:

- Project Files
- Documents
- Deliverables
- Build Artifacts
- Invoice PDFs
- Client Uploads

---

# 4. DevOps & Cloud Architecture

```text
                    CLOUD INFRASTRUCTURE

                           │
     ┌─────────────────────┼─────────────────────┐
     ▼                     ▼                     ▼

 AWS ECS             PostgreSQL RDS          Amazon S3

     │                     │                     │

     └─────────────── CloudWatch ───────────────┘

                           │

                    GitHub Actions

                           │

                  Automated Deployment
```

---

## Infrastructure Components

### Compute

- AWS ECS Fargate
- Docker Containers

---

### Database

- Amazon RDS PostgreSQL
- Automated Backups
- Multi-AZ Deployment

---

### Storage

- Amazon S3
- AES-256 Encryption
- Lifecycle Policies
- Pre-Signed URLs

---

### Monitoring

- CloudWatch
- Sentry
- GitHub Actions Logs

---

# 5. Deployment Environments

---

## Local Development

Purpose

Developer workstation.

Components

- Docker Compose
- PostgreSQL
- Redis
- Backend
- Frontend

---

## Staging

Purpose

Internal QA and client demonstrations.

Infrastructure

- AWS ECS
- Staging Database
- Test Storage
- CI/CD Deployment

---

## Production

Purpose

Live customer workloads.

Infrastructure

- AWS ECS
- Auto Scaling
- SSL
- Multi-AZ Database
- Monitoring
- Daily Backups

---

# 6. Development Tooling

## IDEs

Recommended

- Visual Studio Code
- PyCharm

---

## Version Control

- Git
- GitHub

---

## API Development

- Postman
- Swagger / OpenAPI

---

## Database Management

- pgAdmin
- PostgreSQL CLI

---

## Container Management

- Docker Desktop
- Docker Compose

---

# 7. Security Standards

## Secret Management

Approved methods

- AWS Secrets Manager
- Environment Variables
- GitHub Secrets

Never commit:

- API Keys
- Database Passwords
- JWT Secrets
- Cloud Credentials

---

## Dependency Security

Automated tools

- Dependabot
- Snyk
- npm audit
- pip-audit

---

## Static Analysis

Mandatory

- ESLint
- Prettier
- Black
- Flake8
- TypeScript Strict Mode

---

# 8. CI/CD Pipeline

```text
Developer

    │

    ▼

Feature Branch

    │

    ▼

Pull Request

    │

    ▼

Lint

    │

    ▼

Tests

    │

    ▼

Build

    │

    ▼

Deploy to Staging

    │

    ▼

QA Approval

    │

    ▼

Production
```

---

# 9. Technology Governance

Introducing a new technology requires approval from:

- Om (Architecture)
- Somnath (Engineering)

Evaluation criteria include:

- Security
- Community Support
- Long-Term Maintenance
- Performance
- Documentation
- Licensing
- Integration Complexity

---

# 10. Prohibited Technologies

The following technologies are not approved without formal review:

- Deprecated PHP frameworks for custom portals
- Legacy WordPress implementations for application development
- Unsupported or abandoned libraries
- Packages without active maintenance
- Software with known critical security vulnerabilities
- Local execution of production AI workloads without container isolation

---

# 11. Engineering Principles

Technology decisions should prioritize:

- Maintainability
- Security
- Scalability
- Performance
- Simplicity
- Developer Experience
- Cloud Portability
- Automation
- Documentation
- Reliability

---

# 12. Future Technology Roadmap

The organization may evaluate future adoption of:

- Kubernetes
- Terraform
- ArgoCD
- Kafka
- Temporal
- Vector Databases
- Edge AI
- Multi-Cloud Deployments

Adoption will follow architecture review and technical approval.

---

## Document Governance

### Primary Owner

**Somnath**
Co-Founder & Lead Systems Engineer

### Secondary Reviewer

**Om**
Founder & CEO

---

## Document Information

| Property                | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| **Document Name** | Approved Technology Stack, Infrastructure Architecture & Tooling Standards |
| **Version**       | 1.0                                                                        |
| **Status**        | Draft                                                                      |
| **Primary Owner** | Somnath                                                                    |
| **Reviewer**      | Om                                                                         |
| **Last Updated**  | August 2026                                                                |
