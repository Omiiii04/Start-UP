import React, { useState } from 'react';
import { CRMInquiry } from '../../types';
import { formatINR } from '../../utils/gst';
import { 
  Users, 
  FileCheck, 
  FileText, 
  ShieldAlert, 
  Send,
  X,
  Download,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export const OperationsDashboard: React.FC = () => {
  const { showToast } = useToast();
  const [selectedInquiry, setSelectedInquiry] = useState<string>('INQ-1092');

  // SOW Generation Modal
  const [isSowModalOpen, setIsSowModalOpen] = useState(false);
  const [isRestructureModalOpen, setIsRestructureModalOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  const inquiriesList: CRMInquiry[] = [
    {
      inquiryId: 'INQ-1092',
      clientName: 'Priya Patel',
      email: 'priya.patel@vjti.ac.in',
      category: 'student',
      serviceTier: 'research_support',
      projectTitle: 'Distributed Graph Neural Network Benchmarking',
      budgetInr: 25000,
      ugcResult: {
        passed: true,
        flaggedKeywords: [],
        recommendation: 'proceed',
        notes: 'Technical mentorship & PyTorch benchmarking scope verified.',
      },
      techFeasibility: 'approved',
      assignedArchitect: 'Om (Lead Architect)',
      submittedAt: '2 hours ago',
    },
    {
      inquiryId: 'INQ-1093',
      clientName: 'Apex Logistics Tech',
      email: 'tech@apexlogistics.in',
      category: 'sme',
      serviceTier: 'enterprise_ai',
      projectTitle: 'Automated Route Optimization & Fleet Dispatch Engine',
      budgetInr: 95000,
      ugcResult: {
        passed: true,
        flaggedKeywords: [],
        recommendation: 'proceed',
        notes: 'Commercial enterprise engagement.',
      },
      techFeasibility: 'under_review',
      assignedArchitect: 'Somnath (Backend Lead)',
      submittedAt: '5 hours ago',
    },
    {
      inquiryId: 'INQ-1094',
      clientName: 'Karan Mehta',
      email: 'karan.m@gmail.com',
      category: 'student',
      serviceTier: 'micro_debug',
      projectTitle: 'Need assistance to complete and write assignment codebase',
      budgetInr: 6000,
      ugcResult: {
        passed: false,
        flaggedKeywords: ['write assignment', 'complete assignment'],
        recommendation: 'restructure_to_mentorship',
        notes: 'FLAGGED: Prohibited academic proxy keywords detected. Restructure required.',
      },
      techFeasibility: 'rejected',
      assignedArchitect: 'Divya (Operations Review)',
      submittedAt: '1 day ago',
    },
  ];

  const teamCapacity = [
    { name: 'Om', role: 'Architecture & AI', load: 85, projects: 3 },
    { name: 'Somnath', role: 'Backend & DevOps', load: 70, projects: 2 },
    { name: 'Falguni', role: 'Frontend & QA', load: 90, projects: 4 },
    { name: 'Divya', role: 'Operations & Finance', load: 60, projects: 6 },
  ];

  const active = inquiriesList.find(i => i.inquiryId === selectedInquiry) || inquiriesList[0];

  const handleIssueProforma = () => {
    showToast(`Issued SOW & Proforma PDF for ${active.clientName} (${formatINR(active.budgetInr * 1.18)})`, 'success');
  };

  const handleSendSow = () => {
    setIsSowModalOpen(false);
    showToast(`Statement of Work dispatched to ${active.email}!`, 'success');
  };

  const handleSendRestructure = () => {
    setIsRestructureModalOpen(false);
    showToast(`UGC Mentorship Restructure brief sent to ${active.email}!`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
            Internal Operations & Governance
          </span>
          <h1 className="font-headline text-3xl font-bold text-white mt-0.5">
            Admin Control Center
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Operations: <strong className="text-white">Divya</strong> | Lead Architect: <strong className="text-white">Om</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold shadow-sm">
            Pipeline: ₹4.85L (14 Active)
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Feasibility Rate: 82%
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-2xl p-5 border border-white/10 shadow-card hover-lift transition-all animate-fade-in-up delay-50">
          <span className="text-xs text-zinc-400 font-medium">Total Active Inquiries</span>
          <p className="text-2xl font-headline font-bold text-white mt-1">14 Leads</p>
          <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-radar-ping"></span>
            +4 this week
          </span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/10 shadow-card hover-lift transition-all animate-fade-in-up delay-100">
          <span className="text-xs text-zinc-400 font-medium">Feasibility Approved</span>
          <p className="text-2xl font-headline font-bold text-emerald-400 mt-1">8 SOWs</p>
          <span className="text-[10px] text-zinc-400 font-mono">Ready for quotation</span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/10 shadow-card hover-lift transition-all animate-fade-in-up delay-150">
          <span className="text-xs text-zinc-400 font-medium">Scope Review Inquiries</span>
          <p className="text-2xl font-headline font-bold text-amber-400 mt-1">2 Flagged</p>
          <span className="text-[10px] text-amber-400 font-mono font-bold animate-pulse">Requires restructuring</span>
        </div>
        <div className="bg-surface rounded-2xl p-5 border border-white/10 shadow-card hover-lift transition-all animate-fade-in-up delay-200">
          <span className="text-xs text-zinc-400 font-medium">Active Staging Demos</span>
          <p className="text-2xl font-headline font-bold text-white mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar-ping"></span>
            5 Staged
          </p>
          <span className="text-[10px] text-primary-light font-mono font-bold">AWS ECS Fargate</span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: CRM Queue Table (65%) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-2xl shadow-card border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm text-white uppercase">
                Inquiry Intake & Feasibility Queue
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">Live Real-time Sync</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-zinc-400 uppercase font-mono text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Inquiry ID</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Tier</th>
                    <th className="p-3.5">Scope Status</th>
                    <th className="p-3.5">Feasibility</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-200">
                  {inquiriesList.map((inq) => {
                    const isSelected = inq.inquiryId === selectedInquiry;
                    return (
                      <tr
                        key={inq.inquiryId}
                        onClick={() => setSelectedInquiry(inq.inquiryId)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/10 font-semibold text-white' : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="p-3.5 font-mono font-bold text-white">{inq.inquiryId}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{inq.clientName}</p>
                          <p className="text-[10px] text-zinc-400 font-mono">{inq.email}</p>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-zinc-300 capitalize font-bold">
                          {inq.serviceTier.replace('_', ' ')}
                        </td>
                        <td className="p-3.5">
                          {inq.ugcResult.passed ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                              PASS
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-mono text-[10px] font-bold border border-amber-500/30">
                              FLAGGED
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                            inq.techFeasibility === 'approved' 
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                              : inq.techFeasibility === 'under_review' 
                              ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' 
                              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          }`}>
                            {inq.techFeasibility.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInquiry(inq.inquiryId);
                              showToast(`Inspecting ${inq.inquiryId} specifications`, 'info');
                            }}
                            className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold text-[11px] shadow-glow transition-colors"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Lead Details */}
          <div className="bg-surface rounded-2xl shadow-card border border-primary/40 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-primary-light uppercase">{active.inquiryId} SPECIFICATIONS</span>
                <h3 className="font-headline font-bold text-lg text-white">{active.projectTitle}</h3>
              </div>
              <span className="text-sm font-headline font-bold text-white bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
                Budget: {formatINR(active.budgetInr)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase font-mono font-bold">Scope NLP Engine</span>
                <p className={`font-semibold ${active.ugcResult.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {active.ugcResult.notes}
                </p>
                {active.ugcResult.flaggedKeywords.length > 0 && (
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Keywords detected: {active.ugcResult.flaggedKeywords.join(', ')}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase font-mono font-bold">Technical Feasibility</span>
                <p className="font-bold text-white">
                  Assigned Architect: <span className="text-primary-light font-semibold">{active.assignedArchitect}</span>
                </p>
                <p className="text-[11px] text-zinc-300">
                  Approved stack: Python 3.11, PyTorch, Docker, FastAPI & AWS ECS.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {active.ugcResult.passed ? (
                <button 
                  onClick={() => setIsSowModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow flex items-center gap-2 transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Formal SOW & Quotation</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsRestructureModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Send Mentorship Restructure Brief</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Workload & Generator (35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Workload Progress */}
          <div className="bg-surface rounded-2xl shadow-card border border-white/10 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-white uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-light" />
              Team Engineering Capacity
            </h3>

            <div className="space-y-4">
              {teamCapacity.map((member) => (
                <div key={member.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-white">{member.name} ({member.role})</span>
                    <span className="font-mono font-bold text-zinc-300">{member.load}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        member.load > 80 ? 'bg-rose-500' : member.load > 65 ? 'bg-primary' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${member.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quotation Engine */}
          <div className="bg-surface rounded-2xl shadow-card border border-white/10 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-white uppercase flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-primary-light" />
              Quick Quotation Engine (Divya)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Target Client</label>
                <input
                  type="text"
                  readOnly
                  value={`${active.clientName} (${active.inquiryId})`}
                  className="w-full h-10 rounded-xl border border-white/10 px-3 text-xs text-white font-medium bg-white/5"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Agreed Base Scope</label>
                <input
                  type="text"
                  readOnly
                  value={formatINR(active.budgetInr)}
                  className="w-full h-10 rounded-xl border border-white/10 px-3 text-xs font-mono font-bold text-primary-light bg-white/5"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>SAC Code:</span>
                  <span className="font-mono text-white font-bold">998314</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>GST (18%):</span>
                  <span className="font-mono text-white font-bold">{formatINR(active.budgetInr * 0.18)}</span>
                </div>
                <div className="flex justify-between text-white font-extrabold pt-1.5 border-t border-white/10">
                  <span>Total Payable:</span>
                  <span className="font-mono text-primary-light">{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={handleIssueProforma}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Issue SOW & Proforma PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SOW & QUOTATION PREVIEW MODAL */}
      {isSowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-surface rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-xl p-5 sm:p-8 relative shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSowModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-400 uppercase">SOW & Quotation Generator</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-headline text-white mb-1">
              Statement of Work #{active.inquiryId}-SOW
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              Client: {active.clientName} • Lead Architect: {active.assignedArchitect}
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <p className="font-bold text-white text-sm">{active.projectTitle}</p>
                <p className="text-zinc-300 leading-relaxed">
                  Deliverables include architecture blueprint, containerized backend microservices, complete test coverage, and 30-day post-handover bug support.
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between font-mono font-bold text-white">
                  <span>Grand Total (incl. 18% GST):</span>
                  <span className="text-primary-light">{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Special Terms or Mentorship Notes</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Optional architectural notes or sprint deadline agreements..."
                  className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-6 border-t border-white/10 mt-6">
              <button
                onClick={handleSendSow}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs shadow-glow transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send SOW to Client</span>
              </button>
              <button
                onClick={() => {
                  showToast('Downloaded SOW Draft PDF', 'success');
                }}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-zinc-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESTRUCTURE BRIEF MODAL */}
      {isRestructureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-surface rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-lg p-5 sm:p-8 relative shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRestructureModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase">Technical Scope Policy Notice</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-headline text-white mb-1">
              Restructure Prohibited Request
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Inquiry {active.inquiryId} for {active.clientName} contains academic proxy terms.
            </p>

            <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-xs text-amber-200 space-y-2 mb-6">
              <p className="font-bold text-amber-300">Restructuring Strategy:</p>
              <p className="leading-relaxed">
                We will inform the client that ProjectBridge provides open-source prototype architecture, technical tutoring, and code optimization. The client retains authorship of their academic papers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleSendRestructure}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
              >
                Dispatch Restructure Brief
              </button>
              <button
                onClick={() => setIsRestructureModalOpen(false)}
                className="px-5 py-3 bg-white/10 hover:bg-white/15 text-zinc-200 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
