# Startup Systems — Frontend Architecture & UI Design

This frontend application is built in accordance with the project documentation:
- **[Workflow.md](file:///c:/Users/jamad/Desktop/Start-Up/Start-UP/Documentation/V1/Workflow.md)**: 15-step project lifecycle and governance gates.
- **[TechStack.md](file:///c:/Users/jamad/Desktop/Start-Up/Start-UP/Documentation/V1/TechStack.md)**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React.
- **[SDD.md](file:///c:/Users/jamad/Desktop/Start-Up/Start-UP/Documentation/V1/SDD.md)**: Software design, UGC NLP compliance engine, GST calculation logic.
- **[ProjectRequirements.md](file:///c:/Users/jamad/Desktop/Start-Up/Start-UP/Documentation/V1/ProjectRequirements.md)**: Tiers 1–4 service matrices, SLAs, and acceptance criteria.
- **[Design.md](file:///c:/Users/jamad/Desktop/Start-Up/Start-UP/Documentation/V1/Design.md)**: Synthetic Precision dark-mode design system (`#0F172A`, `#1E293B`, `#3B82F6`, Geist/Inter/JetBrains Mono).

---

## 🎨 Google Stitch Generated UI Screens

Generated within Stitch Project `5207569280006270429`:
1. **Screen 1 — Project Intake & Compliance Wizard (`bf1721c5ebaf4d5cb1a369de032f4c65`)**:
   - Client category switch (Student / SME).
   - Tier 1–4 selection matrix.
   - UGC 2018 Academic Integrity checkbox & NLP feedback.
   - Interactive budget slider & live GST estimator (SAC 998314).
2. **Screen 2 — Client Project Dashboard & 15-Step Stepper (`f6a3673bc8da4fb8aa8a4febe3f59e92`)**:
   - Visual 15-step progress stepper with glowing active ring and completed checkmarks.
   - Staging live status & GitHub commit/test status.
   - Milestone & GST invoice ledger with 'Pay Milestone' action.
   - 30-Day support SLA tracker.
3. **Screen 3 — Internal Operations & CRM Executive Dashboard (`a66a99ddc7034bcba8c6b95c40887084`)**:
   - Intake queue with NLP keyword screening flags.
   - Technical feasibility scorecards.
   - Team capacity breakdown (Om, Somnath, Falguni, Divya).
   - Quick SOW and proforma invoice generator.
4. **Screen 4 — Engineering & QA Control Center (`a70d92d4f6b343e0b0d09add094401b3`)**:
   - Sprint 2 backlog & story points.
   - GitHub Actions automated CI/CD stages.
   - QA acceptance checklists by Falguni.
   - AWS ECS staging controls and IP handover builder.

---

## 📁 Complete Frontend File Structure

```text
frontend/
├── index.html                       # HTML template with Geist, Inter & JetBrains Mono
├── package.json                     # Dependencies & build scripts
├── postcss.config.js                # PostCSS config
├── tailwind.config.js               # Synthetic Precision color tokens & shadows
├── tsconfig.json                    # TypeScript compiler config
├── tsconfig.node.json               # Node TypeScript config
├── vite.config.ts                   # Vite bundler config
└── src/
    ├── App.tsx                      # Top-level view switcher
    ├── main.tsx                     # React DOM bootstrap
    ├── index.css                    # Tailwind imports & glassmorphism classes
    ├── components/
    │   ├── common/
    │   │   └── Header.tsx           # Brand header with UGC status & portal switch
    │   └── stepper/
    │       └── WorkflowStepper.tsx  # 15-Step lifecycle interactive stepper
    ├── features/
    │   ├── intake/
    │   │   └── IntakeWizard.tsx     # Step 1-3 Client intake & estimation
    │   ├── dashboard/
    │   │   └── ClientProjectHub.tsx # Step 4-15 Client project tracking & milestones
    │   ├── operations/
    │   │   └── OperationsDashboard.tsx # Divya & Om CRM & Feasibility Hub
    │   └── engineering/
    │       └── EngineeringPipeline.tsx # Somnath & Falguni Sprint & CI/CD Hub
    ├── types/
    │   └── index.ts                 # Full data models, roles, tiers & step schemas
    └── utils/
        ├── gst.ts                   # GST calculation engine (SAC 998314/998315)
        └── ugcFilter.ts             # UGC Academic Integrity NLP screening engine
```

---

## 🚀 Getting Started

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
