import React, { useState, useMemo, useEffect } from 'react';
import { ServiceTier } from '../../types';
import { calculateGST, formatINR } from '../../utils/gst';
import { screenRequirementUGC } from '../../utils/ugcFilter';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  ArrowLeft,
  Headphones,
  FileText,
  Clock,
  ChevronDown
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';
import { ProjectItem } from '../browse/BrowseProjects';

interface IntakeWizardProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenSupport?: () => void;
  selectedTemplate?: ProjectItem | null;
}

export const IntakeWizard: React.FC<IntakeWizardProps> = ({ 
  onNavigate, 
  onOpenSupport,
  selectedTemplate
}) => {
  const { showToast } = useToast();

  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [projectTitle, setProjectTitle] = useState('AI-Powered Inventory & Vision Pipeline');
  const [category, setCategory] = useState('dev');
  const [techPreference, setTechPreference] = useState('React, Python/FastAPI, PyTorch, AWS');
  const [description, setDescription] = useState('Need high-performance object segmentation model deployed on AWS ECS with a React client interface.');
  const [university, setUniversity] = useState('VJTI Mumbai');
  const [semester, setSemester] = useState('senior');
  const [budgetTier, setBudgetTier] = useState<ServiceTier>('mvp_development');
  const [budgetAmount, setBudgetAmount] = useState(45000);
  const [deadline, setDeadline] = useState('2026-09-30');
  const [isMaharashtra, setIsMaharashtra] = useState(true);
  const [ugcConfirmed, setUgcConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setProjectTitle(selectedTemplate.title);
      setDescription(selectedTemplate.description);
      setTechPreference(selectedTemplate.tags.join(', '));
      setBudgetAmount(selectedTemplate.budget);
      if (selectedTemplate.budget >= 60000) {
        setBudgetTier('enterprise_ai');
      } else if (selectedTemplate.budget >= 25000) {
        setBudgetTier('mvp_development');
      } else if (selectedTemplate.budget >= 10000) {
        setBudgetTier('research_support');
      } else {
        setBudgetTier('micro_debug');
      }
    }
  }, [selectedTemplate]);

  const ugcScreening = useMemo(() => {
    return screenRequirementUGC(description + ' ' + projectTitle);
  }, [description, projectTitle]);

  const gstBreakdown = useMemo(() => {
    return calculateGST(budgetAmount, isMaharashtra, '998314');
  }, [budgetAmount, isMaharashtra]);

  const handleBudgetOption = (tier: ServiceTier, amount: number) => {
    setBudgetTier(tier);
    setBudgetAmount(amount);
  };

  const handleSaveDraft = () => {
    try {
      const draft = {
        projectTitle,
        category,
        techPreference,
        description,
        university,
        semester,
        budgetTier,
        budgetAmount,
        deadline,
        isMaharashtra,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('projectbridge_draft_requirement', JSON.stringify(draft));
      showToast('Draft requirement saved successfully to local storage!', 'success');
    } catch {
      showToast('Draft saved in memory', 'info');
    }
  };

  const handleSubmitRequirement = () => {
    setIsSubmitted(true);
    showToast('Requirement submitted! Status tracker activated.', 'success');
  };

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-8 py-12">
      {isSubmitted ? (
        /* Requirement Confirmation View (File 1 Style) */
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
          {/* Header & Success Hero */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
            <h2 className="font-headline text-3xl font-bold text-black">Success!</h2>
            <p className="text-sm text-gray-600">Your requirement has been securely submitted and verified.</p>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 shadow-sm mt-2">
              <span className="text-xs text-gray-500 font-medium">Request ID:</span>
              <span className="text-xs font-mono font-bold text-black ml-2">REQ-8492-X</span>
            </div>
          </div>

          {/* Status Tracker Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-black">Status Tracker</h3>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                UGC 2018 Passed
              </span>
            </div>

            <div className="relative pl-6 space-y-8">
              {/* Connecting vertical Line */}
              <div className="absolute left-[27px] top-[14px] bottom-[14px] w-[2px] bg-gray-200"></div>
              <div className="absolute left-[27px] top-[14px] h-[35%] w-[2px] bg-black"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Submitted & Verified</p>
                  <p className="text-[11px] text-gray-500 font-mono">Today, 10:42 AM</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Pending Admin Approval</p>
                  <p className="text-xs text-gray-500 mt-0.5">Awaiting technical feasibility review from Om & Somnath (24h SLA).</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative z-10 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 border border-gray-300">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Sprint Planning & SOW Generation</p>
                  <p className="text-xs text-gray-500">Formal GST invoice & milestone schedule issuance.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 relative z-10 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 border border-gray-300">
                  <FileText className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-black">Project Kickoff & Staging Deployment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                Open in User Dashboard
              </button>
            )}
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormStep(1);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-300 text-black text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              Submit Another Project
            </button>
          </div>

          {/* Support button */}
          <div className="text-center pt-4">
            <button 
              onClick={onOpenSupport}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-black py-2 px-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Headphones className="w-4 h-4 text-black" />
              <span>Need help? Chat with Support Team</span>
            </button>
          </div>
        </div>
      ) : (
        /* Multi-Step Submit Requirement Form */
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="font-headline text-3xl sm:text-4xl font-bold text-black mb-2">
              Submit New Requirement
            </h1>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Provide the details below to help our architecture team scope, benchmark, and match you with the right engineering squad.
            </p>
          </div>

          {/* Multi-step Form Container */}
          <div className="bg-white rounded-[24px] shadow-[0_12px_32px_rgba(10,25,47,0.08)] border border-gray-200 overflow-hidden">
            {/* Progress Bar Header */}
            <div className="p-8 pb-5 bg-white border-b border-gray-100">
              <div className="flex justify-between items-center mb-2.5 text-xs font-mono font-medium text-gray-500">
                <span>
                  {formStep === 1 && 'Step 1 of 3: Project Basics'}
                  {formStep === 2 && 'Step 2 of 3: Academic & Logistics'}
                  {formStep === 3 && 'Step 3 of 3: Compliance & Review'}
                </span>
                <span className="text-black font-bold">
                  {formStep === 1 && '33%'}
                  {formStep === 2 && '66%'}
                  {formStep === 3 && '100%'}
                </span>
              </div>

              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-black h-full transition-all duration-300 rounded-full" 
                  style={{ width: `${formStep === 1 ? 33 : formStep === 2 ? 66 : 100}%` }}
                ></div>
              </div>

              {/* Visual Step Indicators */}
              <div className="flex justify-between mt-6 relative max-w-md mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                
                {/* Step 1 Pill */}
                <button 
                  type="button"
                  onClick={() => setFormStep(1)}
                  className="flex flex-col items-center gap-1.5 z-10 bg-white px-3 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition-all ${
                    formStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                  }`}>
                    1
                  </div>
                  <span className="text-[10px] font-mono font-bold text-black uppercase tracking-wider">BASICS</span>
                </button>

                {/* Step 2 Pill */}
                <button 
                  type="button"
                  onClick={() => setFormStep(2)}
                  className="flex flex-col items-center gap-1.5 z-10 bg-white px-3 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition-all ${
                    formStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                  }`}>
                    2
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    formStep >= 2 ? 'text-black' : 'text-gray-400'
                  }`}>
                    DETAILS
                  </span>
                </button>

                {/* Step 3 Pill */}
                <button 
                  type="button"
                  onClick={() => setFormStep(3)}
                  className="flex flex-col items-center gap-1.5 z-10 bg-white px-3 cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-4 border-white shadow-sm transition-all ${
                    formStep === 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                  }`}>
                    3
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    formStep === 3 ? 'text-black' : 'text-gray-400'
                  }`}>
                    REVIEW
                  </span>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {formStep === 1 && (
                /* Step 1: Project Basics */
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline text-lg font-bold text-black mb-1">Project Basics</h2>
                    <p className="text-xs text-gray-500">Provide the high-level overview of what you want to build.</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5" htmlFor="project-title">
                        Requirement Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="project-title"
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. AI Vision Segmentation Pipeline"
                        className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1.5">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                          >
                            <option value="data">Data Analysis & Machine Learning</option>
                            <option value="design">UI/UX Design & Frontend</option>
                            <option value="dev">Full-Stack Software Development</option>
                            <option value="research">Academic Research & Benchmarking</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-1.5">Tech Preferences</label>
                        <input
                          type="text"
                          value={techPreference}
                          onChange={(e) => setTechPreference(e.target.value)}
                          placeholder="e.g. React, Node.js, PyTorch, AWS"
                          className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">Detailed Scope Description</label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the core objective, expected APIs, and deliverables..."
                        className="w-full rounded-xl border border-gray-300 p-4 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                /* Step 2: Academic & Logistics */
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline text-lg font-bold text-black mb-1">Academic Context & Logistics</h2>
                    <p className="text-xs text-gray-500">Specify timeline, institution, and budget range.</p>
                  </div>

                  <div className="space-y-5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-1.5">University / Institution</label>
                        <input
                          type="text"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="e.g. VJTI Mumbai / IIT Bombay"
                          className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-1.5">Year Level / Category</label>
                        <div className="relative">
                          <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                          >
                            <option value="senior">Year 4 (Senior Project)</option>
                            <option value="grad">Graduate / Masters</option>
                            <option value="phd">PhD Researcher</option>
                            <option value="sme">Startup Founder / SME</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Budget Radio Pills */}
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Estimated Budget Range (INR)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { tier: 'micro_debug', label: '₹2k – ₹10k', amount: 5000, name: 'Micro' },
                          { tier: 'research_support', label: '₹10k – ₹30k', amount: 20000, name: 'Research' },
                          { tier: 'mvp_development', label: '₹25k – ₹60k', amount: 45000, name: 'MVP' },
                          { tier: 'enterprise_ai', label: '₹60k+', amount: 85000, name: 'Enterprise' },
                        ].map((b) => (
                          <div
                            key={b.tier}
                            onClick={() => handleBudgetOption(b.tier as ServiceTier, b.amount)}
                            className={`h-16 flex flex-col items-center justify-center rounded-xl border cursor-pointer transition-all ${
                              budgetTier === b.tier
                                ? 'border-2 border-black bg-gray-50 font-bold text-black shadow-sm'
                                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                            }`}
                          >
                            <span className="text-xs">{b.label}</span>
                            <span className="text-[10px] text-gray-400 font-mono font-normal">Tier: {b.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-1.5">Target Delivery Deadline</label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full h-12 rounded-xl border border-gray-300 px-4 text-sm text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                /* Step 3: Review, UGC Compliance & GST Summary */
                <div className="space-y-6">
                  <div>
                    <h2 className="font-headline text-lg font-bold text-black mb-1">Compliance & Quotation Review</h2>
                    <p className="text-xs text-gray-500">Verify UGC regulations and review the GST calculation.</p>
                  </div>

                  {/* UGC Real-time check */}
                  {!ugcScreening.passed ? (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs">
                      <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-900">UGC Compliance Notice</p>
                        <p className="text-amber-800 mt-0.5">{ugcScreening.notes}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>UGC 2018 Academic Integrity: <strong>Passed (Standard Technical Scope)</strong></span>
                    </div>
                  )}

                  {/* Live Cost & GST Breakdown Card */}
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="font-bold text-black uppercase font-mono">Invoice Summary</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMaharashtra(!isMaharashtra);
                          showToast(
                            isMaharashtra ? 'Switched to Interstate IGST (18%)' : 'Switched to Maharashtra CGST+SGST (18%)',
                            'info'
                          );
                        }}
                        className="text-[11px] font-mono text-black font-semibold underline hover:text-blue-600 transition-colors"
                      >
                        {isMaharashtra ? 'Maharashtra (CGST+SGST 18%)' : 'Interstate (IGST 18%)'}
                      </button>
                    </div>

                    <div className="space-y-1.5 text-gray-600">
                      <div className="flex justify-between">
                        <span>Scope Base Amount:</span>
                        <span className="font-mono font-bold text-black">{formatINR(gstBreakdown.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (SAC 998314 - 18%):</span>
                        <span className="font-mono">{formatINR(gstBreakdown.totalTax)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-black pt-2 border-t border-gray-200">
                        <span>Total Due (incl. GST):</span>
                        <span className="font-mono">{formatINR(gstBreakdown.grandTotal)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mandatory UGC Checkbox */}
                  <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={ugcConfirmed}
                        onChange={(e) => setUgcConfirmed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                      />
                      <span className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-black">Mandatory Legal Declaration:</strong> I confirm deliverables consist strictly of technical infrastructure, proof-of-concept software, code optimization, or educational mentorship under UGC Regulations 2018. I retain full responsibility for academic submissions.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                {formStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setFormStep((prev) => (prev - 1) as any)}
                    className="px-6 py-3 rounded-xl font-bold text-xs text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-3 rounded-xl font-bold text-xs text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 shadow-sm transition-colors active:scale-95"
                  >
                    Save Draft
                  </button>
                )}

                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!projectTitle.trim()) {
                        showToast('Please enter a requirement title', 'error');
                        return;
                      }
                      setFormStep((prev) => (prev + 1) as any);
                    }}
                    className="px-8 py-3 rounded-xl font-bold text-xs text-white bg-black hover:bg-gray-800 shadow-md flex items-center gap-2 transition-transform active:scale-95"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!ugcConfirmed || !ugcScreening.passed}
                    onClick={handleSubmitRequirement}
                    className={`px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-transform ${
                      ugcConfirmed && ugcScreening.passed
                        ? 'bg-black hover:bg-gray-800 text-white shadow-md active:scale-95 cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit Requirement</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
