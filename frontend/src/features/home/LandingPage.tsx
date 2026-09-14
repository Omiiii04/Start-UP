import React, { useState } from 'react';
import {
  ArrowRight, 
  Code, 
  Zap, 
  Check, 
  Compass, 
  Bookmark, 
  Sparkles, 
  Plus, 
  Database, 
  Monitor, 
  Briefcase, 
  Layers, 
  Cpu, 
  Search
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { InstantServiceModal, InstantServiceItem } from '../../components/common/InstantServiceModal';
import { ProjectDetailsModal } from '../../components/common/ProjectDetailsModal';
import { QASection } from './QASection';

const INSTANT_SERVICES: InstantServiceItem[] = [
  {
    tier: 'Tier 1',
    name: 'Instant PPT',
    price: '₹200',
    numericPrice: 200,
    delivery: '4–12 Hours',
    features: [
      '12–15 structured presentation slides',
      'Project architecture & flow diagrams',
      'Speaker notes & viva Q&A guidance'
    ],
    iconType: 'zap'
  },
  {
    tier: 'Tier 2',
    name: 'Instant Mini Project',
    price: '₹1,000',
    numericPrice: 1000,
    delivery: '24–48 Hours',
    features: [
      'Working source code & database scripts',
      'Step-by-step video setup instructions',
      'Complete project synopsis & viva guide'
    ],
    iconType: 'cpu'
  },
  {
    tier: 'Tier 3',
    name: 'Instant Report',
    price: '₹100',
    numericPrice: 100,
    delivery: '2–6 Hours',
    features: [
      'IEEE / university format document',
      'Abstract, methodology & system design',
      'Plagiarism-checked citations & bibliography'
    ],
    iconType: 'code'
  },
  {
    tier: 'Tier 4',
    name: 'Instant Poster',
    price: '₹400',
    numericPrice: 400,
    delivery: '6–12 Hours',
    features: [
      'High-resolution print-ready flex / PDF poster',
      'Modern infographic visual layout',
      'Custom college emblem & team details'
    ],
    iconType: 'layers'
  }
];

interface LandingPageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSupport?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate, 
  onOpenSupport 
}) => {
  const [selectedInstantService, setSelectedInstantService] = useState<InstantServiceItem | null>(null);
  const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);

  const handleStartInstantService = (item: InstantServiceItem) => {
    setSelectedInstantService(item);
    setIsInstantModalOpen(true);
  };

  return (
    <>
      <div className="w-full bg-transparent flex flex-col space-y-12 sm:space-y-16 pb-0 sm:pb-2 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="w-full bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/10 py-5 [@media(max-height:700px)]:py-3 [@media(max-height:600px)]:py-2 px-4 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all text-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-5 [@media(max-height:700px)]:space-y-3 [@media(max-height:600px)]:space-y-2 sm:space-y-6">
          
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-zinc-200 text-[11px] sm:text-xs font-mono font-semibold backdrop-blur-sm shadow-2xs mx-auto max-w-full text-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="text-center">200+ Ready-to-Submit Academic Projects</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline font-black text-2xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.15] tracking-tight text-center max-w-3xl mx-auto">
            Find Your College Project
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto text-center px-1">
            Explore our curated marketplace of ready-to-submit college projects across Computer Science, Data Science, and more. Save time, eliminate stress, and focus on your grades.
          </p>

          {/* Hero Search */}
          <div className="w-full max-w-xl mx-auto relative pt-4 [@media(max-height:700px)]:pt-1 pb-2 [@media(max-height:700px)]:pb-0">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 z-10 mt-1 [@media(max-height:700px)]:mt-0" />
            <input
              type="text"
              placeholder="Search projects by keyword, tech stack, or category..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 rounded-2xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-white/20 shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val.trim()) {
                     onNavigate('browse');
                  }
                }
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1 w-full max-w-md sm:max-w-xl mx-auto">
            <button
              onClick={() => onNavigate('browse')}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Browse Projects</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={() => setIsProjectDetailsModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-700 dark:text-white bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/70 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-slate-600 dark:text-zinc-300 shrink-0" />
              <span>Request Custom Project</span>
            </button>
          </div>

          {/* 3-Stat Metric Row */}
          <div className="pt-5 [@media(max-height:700px)]:pt-3 [@media(max-height:600px)]:pt-2 sm:pt-6 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg sm:text-2xl font-black font-headline text-slate-900 dark:text-white">200+</p>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-medium">Ready-Made Projects</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg sm:text-2xl font-black font-headline text-slate-900 dark:text-white">1,000+</p>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-medium">Happy Students</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-lg sm:text-2xl font-black font-headline text-slate-900 dark:text-white">24/7</p>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-medium">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Removed Best Selling Promo and Trust Banner */}

      {/* ── 3. CATEGORY CATALOG ── */}
      <section id="categories-section" className="scroll-mt-24 sm:scroll-mt-28 bg-white/10 dark:bg-zinc-950/10 rounded-2xl p-5 sm:p-8 border border-slate-200/50 dark:border-white/5 shadow-sm space-y-8 text-center transition-all">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
            EXPLORE CATEGORIES
          </p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
            Find Projects by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-xl mx-auto">
            Browse our curated collection across top engineering and academic disciplines
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate('browse')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline cursor-pointer"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Data Science & AI',
              badge: '50+ Projects',
              desc: 'Machine learning, predictive models, NLP text classifiers, and dashboards.',
              icon: Database,
              tags: ['Python', 'ML', 'Data']
            },
            {
              title: 'Web Development',
              badge: '80+ Projects',
              desc: 'Production-ready MERN, Next.js, and TypeScript web applications.',
              icon: Monitor,
              tags: ['React', 'Node.js', 'Next.js']
            },
            {
              title: 'Core CS / IT',
              badge: '40+ Projects',
              desc: 'Core B.Tech and BCA syllabus projects with complete algorithms.',
              icon: Code,
              tags: ['Java', 'C++', 'Python']
            },
            {
              title: 'Business & Management',
              badge: '30+ Projects',
              desc: 'Financial forecasting models and strategic case studies for MBA/BBA.',
              icon: Briefcase,
              tags: ['Finance', 'Analytics', 'Case Studies']
            },
            {
              title: 'AI / Machine Learning',
              badge: '40+ Projects',
              desc: 'Deep learning, neural networks, and computer vision projects.',
              icon: Cpu,
              tags: ['Deep Learning', 'NLP', 'Computer Vision']
            },
            {
              title: 'IoT / Embedded',
              badge: '20+ Projects',
              desc: 'Arduino, Raspberry Pi, and sensor-based smart systems.',
              icon: Zap,
              tags: ['Arduino', 'Raspberry Pi', 'Sensors']
            }
          ].map((c, i) => (
            <div
              key={i}
              onClick={() => onNavigate('browse')}
              className="rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between items-center text-center group backdrop-blur-md bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-md"
            >
              <div className="w-full flex flex-col items-center text-center">
                <div className="flex flex-col items-center justify-center mb-4 gap-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors mx-auto bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200/80 dark:border-white/15">
                    {c.badge}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-lg mb-1.5 transition-colors text-center text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                  {c.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4 text-center max-w-xs text-slate-600 dark:text-zinc-300">
                  {c.desc}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-center text-xs font-bold w-full gap-1.5 border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-zinc-200 group-hover:underline">
                <span>Browse projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-950/20 backdrop-blur flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-6 shadow-sm">
            <div className="space-y-2 max-w-lg mx-auto sm:mx-0">
              <h3 className="font-headline font-bold text-xl text-slate-900 dark:text-white">Can't find your topic?</h3>
              <p className="text-sm text-slate-600 dark:text-zinc-300">Request a bespoke project built from scratch according to your university syllabus and guidelines.</p>
            </div>
            <button
              onClick={() => setIsProjectDetailsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              Request Custom Project
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS SHOWCASE ── */}
      <section className="bg-white/10 dark:bg-zinc-950/10 rounded-2xl p-5 sm:p-8 border border-slate-200/50 dark:border-white/5 shadow-sm space-y-8 text-center transition-all">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
            STUDENT FAVORITES
          </p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-xl mx-auto">
            Explore our most popular student projects ready for submission.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate('browse')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline cursor-pointer"
            >
              <span>View all 200+ Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 bg-white/30 dark:bg-zinc-900/10 max-w-4xl mx-auto w-full">
          <Bookmark className="w-8 h-8 text-slate-300 dark:text-zinc-600 mb-3" />
          <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">Featured projects will appear here soon.</p>
        </div>
      </section>

      {/* ── 5. GET OUR INSTANT SERVICES ── */}
      <section id="services-tiers-section" className="scroll-mt-24 sm:scroll-mt-28 bg-white/10 dark:bg-zinc-950/10 rounded-2xl p-5 sm:p-8 border border-slate-200/50 dark:border-white/5 shadow-sm space-y-8 text-center transition-all">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
            ACADEMIC SERVICES
          </p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
            Need Something Quickly?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-xl mx-auto">
            Quick and affordable academic deliverables to support your project submission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1: Instant PPT */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center text-center transition-all">
            <div className="w-full flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-3 mx-auto">
                <Zap className="w-5 h-5 text-amber-500 dark:text-amber-300" />
              </div>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant PPT</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹200</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 4–12 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>12–15 structured presentation slides</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Project architecture &amp; flow diagrams</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Speaker notes &amp; viva Q&amp;A guidance</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleStartInstantService(INSTANT_SERVICES[0])}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs text-center justify-center"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2: Instant Mini Project (Most Popular) */}
          <div className="rounded-2xl p-6 border-2 border-cyan-500/70 dark:border-cyan-400/60 bg-white/70 dark:bg-cyan-950/20 backdrop-blur-xl shadow-lg shadow-cyan-900/10 dark:shadow-cyan-950/30 relative flex flex-col justify-between items-center text-center hover:shadow-xl transition-all">
            <div className="w-full flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl text-white dark:text-zinc-950 flex items-center justify-center mb-3 shadow-sm bg-cyan-600 dark:bg-cyan-400 mx-auto">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Mini Project</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹1,000</p>
              <p className="text-xs text-slate-500 dark:text-zinc-300 mt-1">Delivery: 24–48 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-200 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Working source code &amp; DB scripts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Step-by-step video setup instructions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Complete project synopsis &amp; viva guide</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleStartInstantService(INSTANT_SERVICES[1])}
              className="mt-6 w-full py-2.5 rounded-xl text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-xs font-bold transition-all shadow-md cursor-pointer text-center justify-center"
            >
              Get Started
            </button>
          </div>

          {/* Tier 3: Instant Report */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center text-center transition-all">
            <div className="w-full flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-3 mx-auto">
                <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-300" />
              </div>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Report</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹100</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 2–6 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>IEEE / university format document</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Abstract, methodology &amp; system design</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Plagiarism-checked citations &amp; references</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleStartInstantService(INSTANT_SERVICES[2])}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs text-center justify-center"
            >
              Get Started
            </button>
          </div>

          {/* Tier 4: Instant Poster */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center text-center transition-all">
            <div className="w-full flex flex-col items-center">
              <div className="w-11 h-11 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-3 mx-auto">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Poster</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹400</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 6–12 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>High-res print-ready flex / PDF poster</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Modern infographic visual layout</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Custom college logo &amp; team details</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleStartInstantService(INSTANT_SERVICES[3])}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs text-center justify-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ── */}
      <section id="protocol-section" className="scroll-mt-24 sm:scroll-mt-28 bg-white/10 dark:bg-zinc-950/10 rounded-2xl p-5 sm:p-8 border border-slate-200/50 dark:border-white/5 shadow-sm space-y-8 text-center transition-all">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-3">
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-xl mx-auto">
            Get your college project ready in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
           {/* Step 1 */}
           <div className="p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold font-mono mb-4 text-lg">1</div>
              <h4 className="font-bold font-headline text-slate-900 dark:text-white mb-2 text-base">Choose a Project</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">Browse our catalog or request a custom project tailored to your syllabus.</p>
           </div>
           {/* Step 2 */}
           <div className="p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold font-mono mb-4 text-lg">2</div>
              <h4 className="font-bold font-headline text-slate-900 dark:text-white mb-2 text-base">Review Deliverables</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">Check the included source code, DB scripts, and reports before proceeding.</p>
           </div>
           {/* Step 3 */}
           <div className="p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold font-mono mb-4 text-lg">3</div>
              <h4 className="font-bold font-headline text-slate-900 dark:text-white mb-2 text-base">Get Your Project</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">Instantly download the complete project files and setup instructions.</p>
           </div>
           {/* Step 4 */}
           <div className="p-6 bg-white/50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold font-mono mb-4 text-lg">4</div>
              <h4 className="font-bold font-headline text-slate-900 dark:text-white mb-2 text-base">Receive Support</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">Need help running it? Our expert team is available to guide you.</p>
           </div>
        </div>
      </section>



      {/* ── 8. BOTTOM CALL TO ACTION BANNER ── */}
      <section className="bg-zinc-900/90 dark:bg-zinc-950/45 dark:backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-zinc-800 dark:border-white/15 transition-all">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Ready to Find Your Project?
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-white">
            Get Your Complete Project Today
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Choose from 200+ ready projects or consult with our team for custom syllabus requirements.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => onNavigate('browse')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-zinc-950 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Projects</span>
          </button>

          <button
            onClick={() => setIsProjectDetailsModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request Custom Project</span>
          </button>
        </div>
      </section>

      {/* ── 9. Q&A / FREQUENTLY ASKED QUESTIONS (JUST ABOVE FOOTER) ── */}
      <QASection onOpenSupport={onOpenSupport} onNavigate={onNavigate} />
    </div>

      {/* Instant Service Project Details Modal */}
      <InstantServiceModal
        isOpen={isInstantModalOpen}
        onClose={() => setIsInstantModalOpen(false)}
        service={selectedInstantService}
        onNavigate={onNavigate}
      />

      {/* Enter Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isProjectDetailsModalOpen}
        onClose={() => setIsProjectDetailsModalOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
