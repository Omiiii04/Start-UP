import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  RotateCw, 
  Package, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const EngineeringPipeline: React.FC = () => {
  const { showToast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [isBuildingBundle, setIsBuildingBundle] = useState(false);

  // Interactive QA Gates state
  const [qaGates, setQaGates] = useState([
    { id: 'gate-1', label: 'UI/UX Design Tokens & 12-column layout (Design.md)', checked: true },
    { id: 'gate-2', label: 'Cross-browser testing (Chrome, Safari, Firefox)', checked: true },
    { id: 'gate-3', label: 'Zero Critical / High defects on Staging build', checked: true },
  ]);

  const sprintTasks = [
    { title: 'Multi-stage Dockerfile container build & ECR push', pts: 5, owner: 'Somnath', status: 'done' },
    { title: 'PostgreSQL schema migrations & Argon2id auth middleware', pts: 8, owner: 'Somnath', status: 'done' },
    { title: 'React 18 + Tailwind UI components & 15-step Stepper', pts: 8, owner: 'Falguni', status: 'done' },
    { title: 'PyTorch UNet inference API latencies benchmark (<250ms)', pts: 5, owner: 'Om & Somnath', status: 'testing' },
    { title: 'Final Staging walkthrough & IP Transfer package bundle', pts: 3, owner: 'Somnath', status: 'todo' },
  ];

  const pipelineStages = [
    { name: 'ESLint & Strict TypeScript Typecheck', status: 'pass', time: '1.4s', details: '0 errors, 0 warnings' },
    { name: 'Snyk & Dependabot Vulnerability Scan', status: 'pass', time: '3.1s', details: '0 high/critical CVEs' },
    { name: 'Automated Test Suite (Jest/Pytest)', status: 'pass', time: '14.2s', details: '48/48 tests passing (100%)' },
    { name: 'Docker Build & Amazon ECR Registry Push', status: 'pass', time: '38.6s', details: 'Image sha256:4f8e91...' },
    { name: 'AWS ECS Fargate Staging Service Update', status: 'deployed', time: '22.0s', details: 'Healthcheck: 200 OK' },
  ];

  const handleTriggerDeploy = () => {
    setIsDeploying(true);
    showToast('Triggering staging re-deployment on AWS ECS...', 'info');
    setTimeout(() => {
      setIsDeploying(false);
      showToast('AWS ECS Fargate Staging deployment live (200 OK)!', 'success');
    }, 2000);
  };

  const handleBuildBundle = () => {
    setIsBuildingBundle(true);
    showToast('Packaging production source code & IP Certificate...', 'info');
    setTimeout(() => {
      setIsBuildingBundle(false);
      showToast('Release package "projectbridge-release-v1.2.4.zip" generated!', 'success');
    }, 2200);
  };

  const toggleQaGate = (id: string) => {
    setQaGates(prev =>
      prev.map(g => (g.id === id ? { ...g, checked: !g.checked } : g))
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">
            Engineering &amp; QA Command Center
          </span>
          <h1 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mt-0.5">
            Sprint 2: Architecture &amp; Staging Pipeline
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-zinc-500 mt-2">
            <span className="flex items-center gap-1.5 font-bold text-zinc-900">
              <GitBranch className="w-3.5 h-3.5 text-zinc-800" /> branch: staging
            </span>
            <span>•</span>
            <span>Commit <strong className="text-zinc-900 font-bold">#8f2a1b9</strong></span>
            <span>•</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ECS Staging Active
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleTriggerDeploy}
            disabled={isDeploying}
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 hover:bg-zinc-200 flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 text-zinc-700 ${isDeploying ? 'animate-spin' : ''}`} />
            <span>{isDeploying ? 'Deploying...' : 'Trigger Re-Deploy'}</span>
          </button>
          <a
            href="https://staging-app.startupsystems.internal/demo-84"
            target="_blank"
            rel="noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-colors active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Staging</span>
          </a>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Sprint Backlog (35%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-700" />
                Sprint Backlog &amp; Tasks
              </h3>
              <span className="text-[10px] font-mono font-bold bg-zinc-100 border border-zinc-200 text-zinc-800 px-2.5 py-0.5 rounded-full">
                29 Story Pts
              </span>
            </div>

            <div className="space-y-3">
              {sprintTasks.map((task, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-zinc-900 leading-snug">{task.title}</p>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800 border border-zinc-300 shrink-0">
                      {task.pts}pt
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-zinc-500 font-mono">Lead: {task.owner}</span>
                    <span
                      className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded-full uppercase border ${
                        task.status === 'done'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : task.status === 'testing'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-zinc-200 text-zinc-700 border-zinc-300'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CI/CD & QA Suite (45%) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-700" />
                GitHub Actions Automated CI/CD
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">Passing (57.3s)</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {pipelineStages.map((stage, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="p-3.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-400 flex items-center justify-between hover-lift transition-all animate-fade-in-up"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 animate-scale-in" />
                    <div>
                      <p className="text-zinc-900 font-bold text-xs flex items-center gap-1.5">
                        <span>{stage.name}</span>
                        {stage.status === 'deployed' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-radar-ping"></span>
                        )}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-sans">{stage.details}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{stage.time}</span>
                </div>
              ))}
            </div>

            {/* QA Signoff Checklist by Falguni */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
              <p className="font-bold text-zinc-900 flex items-center justify-between">
                <span>QA Acceptance Gates (Falguni):</span>
                <span className="font-mono text-emerald-600 text-[11px] font-bold">
                  {qaGates.every(g => g.checked) ? 'Gate 4: PASSED' : 'Gate 4: IN PROGRESS'}
                </span>
              </p>
              <div className="space-y-1.5 text-zinc-700">
                {qaGates.map((g) => (
                  <label key={g.id} className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={g.checked} 
                      onChange={() => toggleQaGate(g.id)}
                      className="w-3.5 h-3.5 rounded border-zinc-300 text-zinc-900 accent-zinc-900 cursor-pointer" 
                    />
                    <span className={g.checked ? 'line-through text-zinc-400' : 'text-zinc-800'}>{g.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Handover & Release (20%) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase flex items-center gap-2">
              <Package className="w-4 h-4 text-zinc-700" />
              IP Handover
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-500 text-[10px] uppercase font-mono font-bold">Delivery Package</span>
                <p className="font-bold text-zinc-900 mt-0.5">Full Source Code ZIP</p>
                <p className="text-[10px] text-zinc-500">Includes Docker Compose &amp; README</p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-500 text-[10px] uppercase font-mono font-bold">IP Certificate</span>
                <p className="font-bold text-zinc-900 mt-0.5">Step 14: Ready</p>
                <p className="text-[10px] text-zinc-500">Pending Final Invoice Clearance</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-700 text-[10px] uppercase font-mono font-bold">30-Day Support</span>
                <p className="font-bold text-emerald-800 mt-0.5">SLA Auto-Activates</p>
                <p className="text-[10px] text-emerald-700">Upon Final Delivery Sign-off</p>
              </div>
            </div>

            <button 
              onClick={handleBuildBundle}
              disabled={isBuildingBundle}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isBuildingBundle ? 'Building Release Archive...' : 'Build Release Bundle'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
