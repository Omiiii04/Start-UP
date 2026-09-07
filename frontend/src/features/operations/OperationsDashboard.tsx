import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Send, 
  FileCheck, 
  ShieldAlert, 
  FileText, 
  Download, 
  X 
} from 'lucide-react';
import { formatINR } from '../../utils/gst';
import { useToast } from '../../components/common/Toast';
import { getCRMInquiries, getCRMStats } from '../../api/client';

interface InquiryItem {
  inquiryId: string;
  clientName: string;
  email: string;
  projectTitle: string;
  serviceTier: string;
  budgetInr: number;
  ugcResult: {
    passed: boolean;
    flaggedKeywords: string[];
    notes: string;
  };
  techFeasibility: 'approved' | 'under_review' | 'rejected';
  assignedArchitect: string;
}

export const OperationsDashboard: React.FC = () => {
  const { showToast } = useToast();


  // CRM inquiries — fetched from the backend (no hardcoded/dummy client data)
  const [inquiriesList, setInquiriesList] = useState<InquiryItem[]>([]);
  const [isInquiriesLoading, setIsInquiriesLoading] = useState<boolean>(true);
  const [selectedInquiry, setSelectedInquiry] = useState<string>('');
  const [isSowModalOpen, setIsSowModalOpen] = useState(false);
  const [isRestructureModalOpen, setIsRestructureModalOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  // Ops stats — fetched from the backend (no hardcoded/dummy KPI numbers)
  const [crmStats, setCrmStats] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsInquiriesLoading(true);
    getCRMInquiries()
      .then((data) => {
        if (!isMounted) return;
        const list = (data as InquiryItem[]) || [];
        setInquiriesList(list);
        if (list.length > 0) setSelectedInquiry(list[0].inquiryId);
      })
      .catch(() => {
        if (isMounted) setInquiriesList([]);
      })
      .finally(() => {
        if (isMounted) setIsInquiriesLoading(false);
      });

    getCRMStats()
      .then((data) => {
        if (isMounted) setCrmStats((data as Record<string, any>) || null);
      })
      .catch(() => {
        if (isMounted) setCrmStats(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const active = inquiriesList.find((i) => i.inquiryId === selectedInquiry) || inquiriesList[0];

  // Team capacity — no backend endpoint exists yet for live workload data
  const teamCapacity: { name: string; role: string; load: number }[] = [];

  const handleIssueProforma = () => {
    if (!active) return;
    showToast(`Proforma Invoice & SOW for ${active.inquiryId} issued to ${active.clientName}!`, 'success');
  };

  const handleSendSow = () => {
    if (!active) return;
    setIsSowModalOpen(false);
    showToast(`Formal SOW dispatched to ${active.email} for e-signature!`, 'success');
  };

  const handleSendRestructure = () => {
    if (!active) return;
    setIsRestructureModalOpen(false);
    showToast(`UGC Mentorship Restructure brief sent to ${active.email}!`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
            Internal Operations &amp; Governance
          </span>
          <h1 className="font-headline text-3xl font-bold text-white drop-shadow-sm mt-0.5">
            Admin Control Center
          </h1>
          <p className="text-xs text-zinc-300 mt-1">
            Internal admin view for the operations & engineering team
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-white/20 text-zinc-900 font-bold shadow-sm backdrop-blur-sm">
            Pipeline: {formatINR(inquiriesList.reduce((sum, i) => sum + i.budgetInr, 0))} ({inquiriesList.length} Active)
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
            Feasibility Rate: {inquiriesList.length > 0
              ? Math.round((inquiriesList.filter(i => i.techFeasibility === 'approved').length / inquiriesList.length) * 100)
              : 0}%
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover-lift transition-all animate-fade-in-up delay-50">
          <span className="text-xs text-zinc-500 font-medium">Total Active Inquiries</span>
          <p className="text-2xl font-headline font-bold text-zinc-900 mt-1">
            {isInquiriesLoading ? '—' : `${inquiriesList.length} Leads`}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover-lift transition-all animate-fade-in-up delay-100">
          <span className="text-xs text-zinc-500 font-medium">Feasibility Approved</span>
          <p className="text-2xl font-headline font-bold text-emerald-600 mt-1">
            {isInquiriesLoading ? '—' : `${inquiriesList.filter(i => i.techFeasibility === 'approved').length} SOWs`}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono">Ready for quotation</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover-lift transition-all animate-fade-in-up delay-150">
          <span className="text-xs text-zinc-500 font-medium">Scope Review Inquiries</span>
          <p className="text-2xl font-headline font-bold text-amber-600 mt-1">
            {isInquiriesLoading ? '—' : `${inquiriesList.filter(i => !i.ugcResult.passed).length} Flagged`}
          </p>
          <span className="text-[10px] text-amber-600 font-mono font-bold">Requires restructuring</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm hover-lift transition-all animate-fade-in-up delay-200">
          <span className="text-xs text-zinc-500 font-medium">Active Staging Demos</span>
          <p className="text-2xl font-headline font-bold text-zinc-900 mt-1 flex items-center gap-1.5">
            {crmStats && typeof crmStats.activeStagingDemos !== 'undefined' ? crmStats.activeStagingDemos : '—'}
          </p>
          <span className="text-[10px] text-zinc-600 font-mono font-bold">AWS ECS Fargate</span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: CRM Queue Table (65%) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase">
                Inquiry Intake &amp; Feasibility Queue
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">Live Real-time Sync</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-600 uppercase font-mono text-[10px] border-b border-zinc-200">
                  <tr>
                    <th className="p-3.5">Inquiry ID</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Tier</th>
                    <th className="p-3.5">Scope Status</th>
                    <th className="p-3.5">Feasibility</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-700">
                  {inquiriesList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-zinc-400 italic">
                        {isInquiriesLoading ? 'Loading inquiries…' : 'No inquiries yet.'}
                      </td>
                    </tr>
                  ) : inquiriesList.map((inq) => {
                    const isSelected = inq.inquiryId === selectedInquiry;
                    return (
                      <tr
                        key={inq.inquiryId}
                        onClick={() => setSelectedInquiry(inq.inquiryId)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-zinc-100 font-semibold text-zinc-900' : 'hover:bg-zinc-50'
                        }`}
                      >
                        <td className="p-3.5 font-mono font-bold text-zinc-900">{inq.inquiryId}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-zinc-900">{inq.clientName}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">{inq.email}</p>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-zinc-700 capitalize font-bold">
                          {inq.serviceTier.replace('_', ' ')}
                        </td>
                        <td className="p-3.5">
                          {inq.ugcResult.passed ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200">
                              PASS
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono text-[10px] font-bold border border-amber-200">
                              FLAGGED
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                            inq.techFeasibility === 'approved' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : inq.techFeasibility === 'under_review' 
                              ? 'bg-blue-50 text-blue-800 border-blue-200' 
                              : 'bg-rose-50 text-rose-800 border-rose-200'
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
                            className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-black text-white font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
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
          {!active ? (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-10 text-center">
              <p className="text-sm text-zinc-400 italic">
                {isInquiriesLoading ? 'Loading inquiries…' : 'No inquiries yet.'}
              </p>
            </div>
          ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{active.inquiryId} SPECIFICATIONS</span>
                <h3 className="font-headline font-bold text-lg text-zinc-900">{active.projectTitle}</h3>
              </div>
              <span className="text-sm font-headline font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-3.5 py-1 rounded-full">
                Budget: {formatINR(active.budgetInr)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-mono font-bold">Scope NLP Engine</span>
                <p className={`font-semibold ${active.ugcResult.passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {active.ugcResult.notes}
                </p>
                {active.ugcResult.flaggedKeywords.length > 0 && (
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Keywords detected: {active.ugcResult.flaggedKeywords.join(', ')}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase font-mono font-bold">Technical Feasibility</span>
                <p className="font-bold text-zinc-900">
                  Assigned Architect: <span className="text-zinc-700 font-semibold">{active.assignedArchitect}</span>
                </p>
                <p className="text-[11px] text-zinc-600">
                  Approved stack: Python 3.11, PyTorch, Docker, FastAPI &amp; AWS ECS.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {active.ugcResult.passed ? (
                <button 
                  onClick={() => setIsSowModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Formal SOW &amp; Quotation</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsRestructureModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Send Mentorship Restructure Brief</span>
                </button>
              )}
            </div>
          </div>
          )}
        </div>

        {/* Right Column: Workload & Generator (35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Workload Progress */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-700" />
              Team Engineering Capacity
            </h3>

            <div className="space-y-4">
              {teamCapacity.length === 0 ? (
                <p className="text-xs text-zinc-400 italic py-2">Workload data isn't connected yet.</p>
              ) : teamCapacity.map((member) => (
                <div key={member.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-zinc-900">{member.name} ({member.role})</span>
                    <span className="font-mono font-bold text-zinc-600">{member.load}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
                    <div
                      className={`h-full rounded-full ${
                        member.load > 80 ? 'bg-rose-500' : member.load > 65 ? 'bg-zinc-800' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${member.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quotation Engine */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 space-y-4">
            <h3 className="font-headline font-bold text-sm text-zinc-900 uppercase flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-zinc-700" />
              Quick Quotation Engine
            </h3>

            {!active ? (
              <p className="text-xs text-zinc-400 italic py-2">Select an inquiry to generate a quotation.</p>
            ) : (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Target Client</label>
                <input
                  type="text"
                  readOnly
                  value={`${active.clientName} (${active.inquiryId})`}
                  className="w-full h-10 rounded-xl border border-zinc-300 px-3 text-xs text-zinc-800 font-medium bg-zinc-50"
                />
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Agreed Base Scope</label>
                <input
                  type="text"
                  readOnly
                  value={formatINR(active.budgetInr)}
                  className="w-full h-10 rounded-xl border border-zinc-300 px-3 text-xs font-mono font-bold text-zinc-900 bg-zinc-50"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-600">
                  <span>SAC Code:</span>
                  <span className="font-mono text-zinc-900 font-bold">998314</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>GST (18%):</span>
                  <span className="font-mono text-zinc-900 font-bold">{formatINR(active.budgetInr * 0.18)}</span>
                </div>
                <div className="flex justify-between text-zinc-900 font-extrabold pt-1.5 border-t border-zinc-200">
                  <span>Total Payable:</span>
                  <span className="font-mono text-zinc-900">{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={handleIssueProforma}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Issue SOW &amp; Proforma PDF</span>
              </button>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* SOW & QUOTATION PREVIEW MODAL */}
      {isSowModalOpen && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-xl p-5 sm:p-8 relative shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSowModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 uppercase">SOW &amp; Quotation Generator</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-headline text-zinc-900 mb-1">
              Statement of Work #{active.inquiryId}-SOW
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              Client: {active.clientName} • Lead Architect: {active.assignedArchitect}
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <p className="font-bold text-zinc-900 text-sm">{active.projectTitle}</p>
                <p className="text-zinc-600 leading-relaxed">
                  Deliverables include architecture blueprint, containerized backend microservices, complete test coverage, and 30-day post-handover bug support.
                </p>
                <div className="pt-2 border-t border-zinc-200 flex justify-between font-mono font-bold text-zinc-900">
                  <span>Grand Total (incl. 18% GST):</span>
                  <span className="text-zinc-900">{formatINR(active.budgetInr * 1.18)}</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 font-semibold mb-1">Special Terms or Mentorship Notes</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Optional architectural notes or sprint deadline agreements..."
                  className="w-full rounded-xl bg-white border border-zinc-300 p-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-6 border-t border-zinc-200 mt-6">
              <button
                onClick={handleSendSow}
                className="flex-1 py-3 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send SOW to Client</span>
              </button>
              <button
                onClick={() => {
                  showToast('Downloaded SOW Draft PDF', 'success');
                }}
                className="px-5 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESTRUCTURE BRIEF MODAL */}
      {isRestructureModalOpen && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-lg p-5 sm:p-8 relative shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRestructureModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-700 uppercase">Technical Scope Policy Notice</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-headline text-zinc-900 mb-1">
              Restructure Prohibited Request
            </h2>
            <p className="text-xs text-zinc-500 mb-4">
              Inquiry {active.inquiryId} for {active.clientName} contains academic proxy terms.
            </p>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-2 mb-6">
              <p className="font-bold text-amber-900">Restructuring Strategy:</p>
              <p className="leading-relaxed">
                We will inform the client that Project Wallah provides open-source prototype architecture, technical tutoring, and code optimization. The client retains authorship of their academic papers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                onClick={handleSendRestructure}
                className="flex-1 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Dispatch Restructure Brief
              </button>
              <button
                onClick={() => setIsRestructureModalOpen(false)}
                className="px-5 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
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
