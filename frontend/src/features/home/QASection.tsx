import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Code, 
  FileText, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  Plus, 
  X, 
  Layers,
  Award
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { useConfig } from '../../context/ConfigContext';

export interface QAItem {
  id: string;
  category: 'deliverables' | 'viva' | 'setup' | 'delivery' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const QA_ITEMS: QAItem[] = [
  {
    id: 'qa-package-contents',
    category: 'deliverables',
    categoryLabel: 'Code & Deliverables',
    question: 'What is included in a complete project package?',
    answer: 'Every project deliverable on Project Wallah is an end-to-end, submission-ready engineering package. You do not just get a zip file — you receive a complete academic and technical package verified to run without bugs.',
    highlights: [
      '100% bug-free source code with clean architecture & zero runtime errors',
      'Full database schema, SQL dump scripts, and seed test data',
      'IEEE / University format documentation (Synopsis, SRS, Design & Final Report)',
      'High-impact Presentation (PPT) with architecture, DFD & ER diagrams',
      'Comprehensive Viva Voce guide with anticipated defense questions & answers',
      'Step-by-step video installation guide & environment setup instructions'
    ],
    icon: Code
  },
  {
    id: 'qa-viva-preparation',
    category: 'viva',
    categoryLabel: 'Viva & Presentation',
    question: 'Will I receive Viva Voce preparation and defense guidance?',
    answer: 'Yes, absolutely. We know that code alone does not guarantee a top grade; your viva presentation is critical. Every project includes a dedicated Viva Defense Handbook tailored to the exact algorithms, design patterns, and database decisions used in your build.',
    highlights: [
      '50+ curated Viva Voce questions with model answers',
      'Deep explanation of internal logic, algorithms, and libraries',
      'Database normalization, query execution, and API explanation notes',
      'Ready-to-speak pitch script for your project demonstration'
    ],
    icon: Award
  },
  {
    id: 'qa-customization',
    category: 'deliverables',
    categoryLabel: 'Code & Deliverables',
    question: 'Can the project be customized to match my college syllabus or unique guidelines?',
    answer: 'Yes! Whether your college requires a specific tech stack (e.g., Python FastAPI instead of Flask, React instead of HTML, MongoDB instead of MySQL) or requires specific problem domain adjustments, our lead engineers can adapt any existing blueprint or build custom features to match your exact academic syllabus and professor guidelines.',
    highlights: [
      'Custom tech stack migration upon request',
      'Integration of college-specific modules & unique feature sets',
      'Alignment with IEEE / ABET / NAAC / University-specific documentation rubrics'
    ],
    icon: Layers
  },
  {
    id: 'qa-setup-issues',
    category: 'setup',
    categoryLabel: 'Setup & Support',
    question: 'What if I face issues running or setting up the code on my computer?',
    answer: 'You will never be left stranded. We provide 24/7 dedicated engineering support. If you run into dependency conflicts, environment path errors, or database connection problems, our technical leads will assist you directly.',
    highlights: [
      'Direct 1-on-1 remote assistance via AnyDesk, Google Meet, or TeamViewer',
      'Pre-configured Docker / virtualenv setups for zero-friction runs',
      'Continuous Telegram chat assistance for instant troubleshooting'
    ],
    icon: Laptop
  },
  {
    id: 'qa-delivery-time',
    category: 'delivery',
    categoryLabel: 'Pricing & Delivery',
    question: 'How fast will I receive my project files after ordering?',
    answer: 'We offer instant turnaround options for tight submission deadlines. Turnaround depends on whether you select an Instant Service, ready blueprint, or bespoke engineering sprint.',
    highlights: [
      'Instant Services (PPT, Report, Poster): Delivered in 2 to 12 hours',
      'Ready-Made Blueprints & Mini Projects: Delivered in 4 to 24 hours',
      'Custom Full-Scale Projects: Delivered in 3 to 7 days with milestone staging previews'
    ],
    icon: Clock
  },
  {
    id: 'qa-plagiarism',
    category: 'general',
    categoryLabel: 'Code & Deliverables',
    question: 'Are the reports and source code checked for plagiarism and originality?',
    answer: 'Yes. Academic integrity is our top priority. All project documentation, abstracts, and reports are written by domain specialists and verified through industry-standard plagiarism tools (Turnitin / DrillBit) to keep similarity scores strictly below university thresholds (typically under 10–15%).',
    highlights: [
      'Plagiarism verification certificate provided on request',
      'Clean, modular code comments and original system architecture',
      'Unique database datasets tailored to your topic'
    ],
    icon: ShieldCheck
  },
  {
    id: 'qa-revisions',
    category: 'setup',
    categoryLabel: 'Setup & Support',
    question: 'Can I request revisions if my college mentor or guide asks for modifications?',
    answer: 'Yes! College project guides frequently ask for small adjustments or extra diagrams after reviewing synopsis submissions. We provide complimentary revision support windows to ensure every suggestion from your mentor is addressed until your guide approves.',
    highlights: [
      'Complimentary revision window included with every delivery',
      'Fast modifications for guide feedback, UI tweaks, or report updates',
      'Direct line of communication with our lead developer for rapid turnarounds'
    ],
    icon: FileText
  },
  {
    id: 'qa-tech-stacks',
    category: 'general',
    categoryLabel: 'Code & Deliverables',
    question: 'What technologies, domains, and frameworks do you support?',
    answer: 'We cover an exhaustive range of engineering and management disciplines for B.Tech, B.E., M.Tech, MCA, BCA, and MBA curricula.',
    highlights: [
      'AI / ML & Data Science: Python, PyTorch, TensorFlow, OpenCV, NLP, LLMs',
      'Full-Stack Web: MERN (React/Node), Next.js, Django, Spring Boot, FastAPI',
      'Mobile Apps: Flutter, React Native, Android Studio / Kotlin',
      'Emerging Tech: Blockchain (Solidity), IoT (Arduino / Raspberry Pi), Cloud & DevOps'
    ],
    icon: Sparkles
  },
  {
    id: 'qa-confidentiality',
    category: 'general',
    categoryLabel: 'General & Security',
    question: 'Is my project submission and personal details kept confidential?',
    answer: '100% confidential. We operate under strict privacy protocols. Your student identity, university affiliation, and project code are never shared publicly or resold to other students in your institution.',
    highlights: [
      'Strict non-disclosure commitment for all student project work',
      'Private repository links and encrypted file deliveries',
      'No personal data published or shared with third parties'
    ],
    icon: ShieldCheck
  },
  {
    id: 'qa-payment-security',
    category: 'delivery',
    categoryLabel: 'Pricing & Delivery',
    question: 'How do payments work and is the transaction secure?',
    answer: 'Payments are handled through encrypted Indian payment gateways supporting UPI, Google Pay, PhonePe, Paytm, Debit/Credit Cards, and Net Banking. For custom projects, we follow milestone-based payments (Advance, Demo Staging Verification, and Final Handover).',
    highlights: [
      'Instant GST-compliant tax invoices provided',
      'Transparent pricing with zero hidden fees',
      'Clear refund and revision guarantees backed by milestone verification'
    ],
    icon: CheckCircle2
  }
];

type CategoryFilter = 'all' | 'deliverables' | 'viva' | 'setup' | 'delivery' | 'general';

interface QASectionProps {
  onOpenSupport?: () => void;
  onNavigate?: (tab: NavTab) => void;
}

export const QASection: React.FC<QASectionProps> = ({ onOpenSupport, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItemIds, setOpenItemIds] = useState<string[]>(['qa-package-contents']);
  const { telegramBotUsername } = useConfig();

  const toggleItem = (id: string) => {
    setOpenItemIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenItemIds(QA_ITEMS.map(item => item.id));
  };

  const handleCollapseAll = () => {
    setOpenItemIds([]);
  };

  const filteredItems = useMemo(() => {
    return QA_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleTelegramContact = () => {
    window.open(`https://t.me/${telegramBotUsername}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id="qa-section" 
      aria-label="Frequently Asked Questions and Answers"
      className="w-full bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/10 p-5 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all text-left"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Block */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-zinc-200 text-xs font-mono font-semibold backdrop-blur-sm shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span>Q&amp;A • FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-headline font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
            Have Questions? We Have Answers.
          </h2>

          <p className="text-xs sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our project handovers, source code quality, viva defense preparation, and post-delivery assistance.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            <input
              id="qa-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. viva, report, setup, plagiarism, delivery)..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/15 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all shadow-xs backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips & Expand/Collapse Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'deliverables', label: 'Code & Reports' },
                { id: 'viva', label: 'Viva & Defense' },
                { id: 'setup', label: 'Setup & Support' },
                { id: 'delivery', label: 'Pricing & Timelines' }
              ].map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xs'
                        : 'bg-white/60 dark:bg-white/5 text-slate-600 dark:text-zinc-400 hover:bg-white/90 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleExpandAll}
                className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer py-1 px-1.5"
              >
                Expand all
              </button>
              <span className="text-slate-300 dark:text-zinc-700">•</span>
              <button
                onClick={handleCollapseAll}
                className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer py-1 px-1.5"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* Q&A Accordion Items */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-white/15 bg-white/30 dark:bg-zinc-900/20 space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-400 dark:text-zinc-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                No matching questions found
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                We could not find any FAQ matching "{searchQuery}". You can ask our team directly on Telegram or Live Chat.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  Clear search filter
                </button>
                <button
                  onClick={handleTelegramContact}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask on Telegram</span>
                </button>
              </div>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openItemIds.includes(item.id);
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white/90 dark:bg-zinc-900/80 border-slate-300 dark:border-white/20 shadow-md ring-1 ring-cyan-500/10'
                      : 'bg-white/60 dark:bg-zinc-900/40 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-zinc-900/60 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-3 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen 
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400' 
                          : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-400'
                      }`}>
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-headline font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-zinc-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-white/5 space-y-3.5 animate-in fade-in duration-200">
                      <p>{item.answer}</p>

                      {item.highlights && item.highlights.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-200/70 dark:border-white/10 space-y-2">
                          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                            Key Deliverables &amp; Highlights:
                          </p>
                          <ul className="space-y-1.5">
                            {item.highlights.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-slate-700 dark:text-zinc-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ── Help / Contact Callout Card ── */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-linear-to-r from-zinc-900 to-zinc-950 dark:from-zinc-900/90 dark:to-zinc-950 text-white p-5 sm:p-7 border border-zinc-800 dark:border-white/15 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1 max-w-md">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <h4 className="font-headline font-bold text-sm sm:text-base text-white">
                Still have unanswered questions?
              </h4>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Our academic consultants and engineering leads are available to review your college guidelines, syllabus, and custom deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleTelegramContact}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-105 active:scale-95 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Chat on Telegram</span>
            </button>

            {onOpenSupport && (
              <button
                onClick={onOpenSupport}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Live Support</span>
              </button>
            )}

            {onNavigate && (
              <button
                onClick={() => onNavigate('submit')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-zinc-950 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Details</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
