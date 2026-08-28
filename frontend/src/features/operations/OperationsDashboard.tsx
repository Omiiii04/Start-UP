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
          <span className="text-[10px] font-mono uppercase font-bold text-gray-400">
            Internal Operations & Governance
          </span>
          <h1 className="font-headline text-3xl font-bold text-black mt-0.5">
            Admin Control Center
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Operations: <strong className="text-black">Divya</strong> | Lead Architect: <strong className="text-black">Om</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 text-black font-bold shadow-sm">
            Pipeline: ₹4.85L (14 Active)
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold">
            Feasibility Rate: 82%
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs text-gray-500 font-medium">Total Active Inquiries</span>
          <p className="text-2xl font-headline font-bold text-black mt-1">14 Leads</p>
          <span className="text-[10px] text-emerald-600 font-mono font-bold">+4 this week</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs text-gray-500 font-medium">Feasibility Approved</span>
          <p className="text-2xl font-headline font-bold text-emerald-600 mt-1">8 SOWs</p>
          <span className="text-[10px] text-gray-400 font-mono">Ready for quotation</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs text-gray-500 font-medium">UGC Flagged Inquiries</span>
          <p className="text-2xl font-headline font-bold text-amber-600 mt-1">2 Flagged</p>
          <span className="text-[10px] text-amber-600 font-mono font-bold">Requires restructuring</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <span className="text-xs text-gray-500 font-medium">Active Staging Demos</span>
          <p className="text-2xl font-headline font-bold text-black mt-1">5 Staged</p>
          <span className="text-[10px] text-black font-mono font-bold">AWS ECS Fargate</span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: CRM Queue Table (65%) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm text-black uppercase">
                Inquiry Intake & Feasibility Queue
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Live Real-time Sync</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-mono text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="p-3.5">Inquiry ID</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Tier</th>
                    <th className="p-3.5">UGC Status</th>
                    <th className="p-3.5">Feasibility</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {inquiriesList.map((inq) => {
                    const isSelected = inq.inquiryId === selectedInquiry;
                    return (
                      <tr
                        key={inq.inquiryId}
                        onClick={() => setSelectedInquiry(inq.inquiryId)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="p-3.5 font-mono font-bold text-black">{inq.inquiryId}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-black">{inq.clientName}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{inq.email}</p>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-black capitalize font-bold">
                          {inq.serviceTier.replace('_', ' ')}
                        </td>
                        <td className="p-3.5">
                          {inq.ugcResult.passed ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                              PASS
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                              FLAGGED
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            inq.techFeasibility === 'approved' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : inq.techFeasibility === 'under_review' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-rose-100 text-rose-800'
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
                            className="px-3 py-1 rounded-lg bg-black hover:bg-gray-800 text-white font-bold text-[11px] shadow-sm transition-colors"
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
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-2 border-black p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-black uppercase">{active.inquiryId} SPECIFICATIONS</span>
                <h3 className="font-headline font-bold text-lg text-black">{active.projectTitle}</h3>
              </div>
              <span className="text-sm font-headline font-bold text-black bg-gray-100 px-3.5 py-1 rounded-full">
                Budget: {formatINR(active.budgetInr)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[10px] uppercase font-mono font-bold">UGC NLP Compliance</span>
                <p className={`font-semibold ${active.ugcResult.passed ? 'text-emerald-700' : 'text-amber-800'}`}>
                  {active.ugcResult.notes}
                </p>
                {active.ugcResult.flaggedKeywords.length > 0 && (
                  <p className="text-[10px] text-gray-500 font-mono">
                    Keywords detected: {active.ugcResult.flaggedKeywords.join(', ')}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <span className="text-gray-500 text-[10px] uppercase font-mono font-bold">Technical Feasibility</span>
                <p className="font-bold text-black">
                  Assigned Architect: <span className="text-black font-semibold">{active.assignedArchitect}</span>
                </p>
                <p className="text-[11px] text-gray-600">
                  Approved stack: Python 3.11, PyTorch, Docker, FastAPI & AWS ECS.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {active.ugcResult.passed ? (
                <button 
                  onClick={() => setIsSowModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95"
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
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-black uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-black" />
              Team Engineering Capacity
            </h3>

            <div className="space-y-4">
              {teamCapacity.map((member) => (
                <div key={member.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-black">{member.name} ({member.role})</span>
                    <span className="font-mono font-bold text-gray-600">{member.load}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        member.load > 80 ? 'bg-black' : member.load > 65 ? 'bg-gray-700' : 'bg-gray-400'
                      }`}
                      style={{ width: `${member.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quotation Engine */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-black uppercase flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-black" />
              Quick Quotation Engine (Divya)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Target Client</label>
                <input
                  type="text"
                  readOnly
                  value={`${active.clientName} (${active.inquiryId})`}
                  className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs text-black font-medium bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Agreed Base Scope</label>
                <input
                  type="text"
                  readOnly
                  value={formatINR(active.budgetInr)}
                  className="w-full h-10 rounded-xl border border-gray-200 px-3 text-xs font-mono font-bold text-black bg-gray-50"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>SAC Code:</span>
                  <span className="font-mono text-black font-bold">998314</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (18%):</span>
                  <span className="font-mono text-black font-bold">{formatINR(active.budgetInr * 0.18)}</span>
                </div>
                <div className="flex justify-between text-black font-extrabold pt-1.5 border-t border-gray-200">
                  <span>Total Payable:</span>
                  <span className="font-mono">{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={handleIssueProforma}
                className="w-full py-3 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSowModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-mono font-bold text-gray-500 uppercase">SOW & Quotation Generator</span>
            </div>

            <h2 className="text-2xl font-bold font-headline text-black mb-1">
              Statement of Work #{active.inquiryId}-SOW
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Client: {active.clientName} • Lead Architect: {active.assignedArchitect}
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <p className="font-bold text-black text-sm">{active.projectTitle}</p>
                <p className="text-gray-600 leading-relaxed">
                  Deliverables include architecture blueprint, containerized backend microservices, complete test coverage, and 30-day post-handover bug support.
                </p>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-mono font-bold text-black">
                  <span>Grand Total (incl. 18% GST):</span>
                  <span>{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Special Terms or Mentorship Notes</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Optional architectural notes or sprint deadline agreements..."
                  className="w-full rounded-xl border border-gray-300 p-3 text-xs text-black focus:outline-none focus:border-black resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 mt-6">
              <button
                onClick={handleSendSow}
                className="flex-1 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send SOW to Client</span>
              </button>
              <button
                onClick={() => {
                  showToast('Downloaded SOW Draft PDF', 'success');
                }}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRestructureModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-mono font-bold text-amber-700 uppercase">UGC 2018 Academic Policy Notice</span>
            </div>

            <h2 className="text-xl font-bold font-headline text-black mb-1">
              Restructure Prohibited Request
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Inquiry {active.inquiryId} for {active.clientName} contains academic proxy terms.
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2 mb-6">
              <p className="font-bold">Restructuring Strategy:</p>
              <p className="leading-relaxed">
                We will inform the client that ProjectBridge provides open-source prototype architecture, technical tutoring, and code optimization. The client retains authorship of their academic papers.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSendRestructure}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
              >
                Dispatch Restructure Brief
              </button>
              <button
                onClick={() => setIsRestructureModalOpen(false)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-black font-bold text-xs rounded-xl transition-colors"
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
