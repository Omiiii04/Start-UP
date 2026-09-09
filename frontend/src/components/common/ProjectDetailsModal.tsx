import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { 
  X, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  MessageCircle, 
  FileText, 
  Building2, 
  Phone
} from 'lucide-react';
import { useToast } from './Toast';
import { NavTab } from './Header';
import { submitIntake } from '../../api/client';
import { useHistoryModal } from '../../utils/useHistoryModal';

export interface ProjectDetailsFormData {
  title: string;
  domain: string;
  projectType: string;
  techStack: string;
  description: string;
  deliverables: string[];
  budgetRange: string;
  deadline: string;
  whatsapp: string;
  college: string;
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

const DOMAINS = [
  'Computer Science & Engineering (B.Tech/BE)',
  'Artificial Intelligence & Machine Learning (AIML)',
  'Data Science & Big Data Analytics',
  'Full Stack Web & Mobile App Development',
  'Cyber Security & Ethical Hacking',
  'Cloud Computing & DevOps',
  'IoT, Robotics & Embedded Systems',
  'MCA / BCA Information Technology',
  'Electrical & Electronics Engineering (EEE/ECE)',
  'MBA & Business Analytics (Management)',
  'Mechanical & Civil Engineering',
  'Other / Interdisciplinary Syllabus'
];

const PROJECT_TYPES = [
  'Final Year Major Project',
  'Mini Project (Semester)',
  'Capstone / Research Project',
  'IEEE Conference Implementation',
  'Internship / Prototype MVP'
];

const DELIVERABLE_OPTIONS = [
  'Full Working Source Code',
  'IEEE / University Format Report',
  'Presentation Slides (PPT)',
  'Video Setup & Demo Guide',
  'Project Synopsis & Abstract',
  'Viva Voce Q&A Preparation'
];

const BUDGET_RANGES = [
  '₹1,500 – ₹3,500 (Mini Project / Basic)',
  '₹3,500 – ₹7,500 (Standard Full-Stack / ML)',
  '₹7,500 – ₹15,000 (Advanced Major / IEEE)',
  '₹15,000+ (Custom Enterprise / Research)',
  'Flexible / Need Quote & Guidance'
];

const DEADLINE_OPTIONS = [
  'Urgent (Within 48–72 Hours)',
  'Express (Within 1 Week)',
  'Standard (1 to 2 Weeks)',
  'Within 1 Month',
  'Flexible / End of Semester'
];

const QUICK_TECH_TAGS = [
  'Python', 'React', 'Node.js', 'FastAPI', 'AIML', 'Flutter', 
  'Django', 'Java', 'MERN', 'PostgreSQL', 'TensorFlow', 'Firebase', 'IoT / Arduino'
];

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const handleClose = useHistoryModal(
    isOpen,
    onClose,
    'project-details-modal'
  );

  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [techStack, setTechStack] = useState('');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Full Working Source Code',
    'IEEE / University Format Report',
    'Presentation Slides (PPT)'
  ]);
  const [budgetRange, setBudgetRange] = useState(BUDGET_RANGES[1]);
  const [deadline, setDeadline] = useState(DEADLINE_OPTIONS[2]);
  const [whatsapp, setWhatsapp] = useState('');
  const [college, setCollege] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<{
    trackingCode: string;
    data: ProjectDetailsFormData;
  } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting, onClose]);

  const toggleDeliverable = (item: string) => {
    setDeliverables(prev =>
      prev.includes(item) ? prev.filter(d => d !== item) : [...prev, item]
    );
  };

  const handleAddTechTag = (tag: string) => {
    setTechStack(prev => {
      if (!prev.trim()) return tag;
      const parts = prev.split(',').map(s => s.trim());
      if (parts.includes(tag)) return prev;
      return `${prev}, ${tag}`;
    });
  };

  const handleCompleteSubmission = async (data: ProjectDetailsFormData) => {
    setIsSubmitting(true);
    const trackingCode = `PRJ-REQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      // Map numeric budget estimate for backend intake
      let numericBudget = 5000;
      if (data.budgetRange.includes('1,500')) numericBudget = 2500;
      else if (data.budgetRange.includes('3,500')) numericBudget = 5500;
      else if (data.budgetRange.includes('7,500')) numericBudget = 10000;
      else if (data.budgetRange.includes('15,000')) numericBudget = 20000;

      // Submit to backend
      await submitIntake({
        title: `[${data.projectType}] ${data.title}`,
        category: data.domain,
        description: `Custom Project Details Submission:\n\nTitle: ${data.title}\nDomain: ${data.domain}\nType: ${data.projectType}\nTech Stack: ${data.techStack || 'Not specified'}\nCollege: ${data.college || 'N/A'}\nWhatsApp: ${data.whatsapp}\nDeadline: ${data.deadline}\nBudget Range: ${data.budgetRange}\nDeliverables: ${data.deliverables.join(', ')}\n\nDetailed Requirements:\n${data.description}`,
        budget: numericBudget,
        tier: 'mvp_development',
        timeline: data.deadline
      });
    } catch {
      // Storage fallback if backend is offline or syncless
      try {
        const stored = JSON.parse(localStorage.getItem('pb_custom_submissions') || '[]');
        stored.push({
          trackingCode,
          ...data,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('pb_custom_submissions', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage fallback error:', err);
      }
    } finally {
      setIsSubmitting(false);
      setSubmittedResult({
        trackingCode,
        data
      });
      showToast(`Project details submitted! Tracking code: ${trackingCode}`, 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please enter your project title or topic.', 'error');
      return;
    }
    if (!description.trim()) {
      showToast('Please describe your project requirements or key features.', 'error');
      return;
    }
    if (!whatsapp.trim()) {
      showToast('Please provide your WhatsApp number for project updates.', 'error');
      return;
    }

    const payload: ProjectDetailsFormData = {
      title: title.trim(),
      domain,
      projectType,
      techStack: techStack.trim(),
      description: description.trim(),
      deliverables,
      budgetRange,
      deadline,
      whatsapp: whatsapp.trim(),
      college: college.trim()
    };

    // Directly submit project details without OAuth authentication requirement
    handleCompleteSubmission(payload);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('Tracking code copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetForm = () => {
    setSubmittedResult(null);
    setTitle('');
    setDescription('');
    setTechStack('');
    setWhatsapp('');
    setCollege('');
  };

  const handleWhatsAppChat = () => {
    if (!submittedResult) return;
    const msg = `Hello Project Wallah, I just entered project details for "${submittedResult.data.title}" (Tracking Code: ${submittedResult.trackingCode}). I would like to discuss development milestones and get a quick demo!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-white dark:bg-zinc-950/95 dark:backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] sm:max-h-[86vh] text-zinc-900 dark:text-zinc-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-100 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 relative z-10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-sm shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-headline font-bold text-base sm:text-xl text-zinc-900 dark:text-white truncate">
                  Enter Project Details
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 shrink-0">
                  <Sparkles className="w-2.5 h-2.5" />
                  Custom Scope
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                Submit your customized project syllabus, algorithms, and deadlines for 100% verified delivery.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="overflow-y-auto overscroll-contain smooth-touch-scroll flex-1 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {submittedResult ? (
            /* ── SUCCESS STATE VIEW ── */
            <div className="space-y-6 py-4 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="font-headline font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  Project Details Submitted!
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Your custom project requirements have been recorded. Our technical leads and domain experts are reviewing your scope.
                </p>
              </div>

              {/* Tracking Code Badge */}
              <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-5 max-w-md mx-auto space-y-2">
                <p className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Your Project Tracking Code
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-widest">
                    {submittedResult.trackingCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(submittedResult.trackingCode)}
                    className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
                    title="Copy Code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Save this code to check real-time progress and deliverables in your Client Dashboard.
                </p>
              </div>

              {/* Submitted Summary Overview */}
              <div className="bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3">
                <div className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-white/10 pb-2">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Project Topic:</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-right max-w-[65%] truncate">
                    {submittedResult.data.title}
                  </span>
                </div>
                <div className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-white/10 pb-2">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Domain:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right">
                    {submittedResult.data.domain}
                  </span>
                </div>
                <div className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-white/10 pb-2">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Type:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right">
                    {submittedResult.data.projectType}
                  </span>
                </div>
                <div className="flex justify-between items-start text-xs border-b border-zinc-100 dark:border-white/10 pb-2">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Target Timeline:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right">
                    {submittedResult.data.deadline}
                  </span>
                </div>
                <div className="flex justify-between items-start text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">Included Deliverables:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right max-w-[65%] truncate">
                    {submittedResult.data.deliverables.join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    onNavigate('dashboard');
                  }}
                  className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl font-bold text-sm bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetForm}
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline cursor-pointer"
                >
                  Submit another project requirement
                </button>
              </div>
            </div>
          ) : (
            /* ── PROJECT DETAILS FORM ── */
            <form onSubmit={handleSubmit} className="space-y-6">
              

              {/* 1. Project Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                  1. Project Title / Topic Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., AI-Powered Early Disease Prediction System using Deep Learning"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm transition-all shadow-inner"
                />
              </div>

              {/* 2. Grid: Domain & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    2. Domain / Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all cursor-pointer"
                  >
                    {DOMAINS.map((d) => (
                      <option key={d} value={d} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    3. Academic Level / Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all cursor-pointer"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. Preferred Tech Stack & Quick Pills */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    4. Preferred Tech Stack &amp; Tools
                  </label>
                  <span className="text-[11px] text-zinc-400">Click tags to add</span>
                </div>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="e.g., Python, OpenCV, TensorFlow, React, FastAPI, MySQL"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm transition-all shadow-inner"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_TECH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTechTag(tag)}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Detailed Scope & Requirements */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    5. Detailed Requirements &amp; Features <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-zinc-400">Be as specific as possible</span>
                </div>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention your core modules, algorithms to implement, college guide guidelines, dataset preferences, or any specific diagrams needed (Architecture, DFD, UML)..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm transition-all shadow-inner resize-y leading-relaxed"
                />
              </div>

              {/* 6. Expected Deliverables (Multi-select) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                  6. Expected Deliverables (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
                  {DELIVERABLE_OPTIONS.map((item) => {
                    const isSelected = deliverables.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDeliverable(item)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs font-semibold'
                            : 'bg-zinc-50/70 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                          isSelected 
                            ? 'bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white border-transparent' 
                            : 'border-zinc-400 dark:border-zinc-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs break-words leading-tight">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Grid: Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    7. Estimated Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all cursor-pointer"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    8. Submission Deadline <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all cursor-pointer"
                  >
                    {DEADLINE_OPTIONS.map((dl) => (
                      <option key={dl} value={dl} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {dl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 9. Grid: WhatsApp & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    9. WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm transition-all shadow-inner"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    For direct mentor coordination &amp; video walkthrough links.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    10. College / University (Optional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g., VTU, Anna University, SPPU Pune"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white text-sm transition-all shadow-inner"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Helps us format documentation to your university standard.
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-zinc-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                  🔒 100% Privacy Guaranteed. NDA &amp; Student Plagiarism-Free SLA.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto justify-center px-5 py-2.5 sm:py-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto justify-center px-6 py-2.5 sm:py-3 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
