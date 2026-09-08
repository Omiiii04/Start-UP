import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Code, 
  Zap, 
  Check, 
  Compass, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Plus, 
  Clock, 
  BookOpen, 
  Database, 
  Monitor, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  MessageSquare
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { ProjectItem } from '../browse/BrowseProjects';
import { getProjects } from '../../api/client';
import { InstantServiceModal, InstantServiceItem } from '../../components/common/InstantServiceModal';
import { ProjectDetailsModal } from '../../components/common/ProjectDetailsModal';

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
  onSelectTemplate?: (template: ProjectItem) => void;
  onOpenSupport?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate, 
  onSelectTemplate,
  onOpenSupport 
}) => {
  const { showToast } = useToast();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);
  const [selectedInstantService, setSelectedInstantService] = useState<InstantServiceItem | null>(null);
  const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);

  const handleStartInstantService = (item: InstantServiceItem) => {
    setSelectedInstantService(item);
    setIsInstantModalOpen(true);
  };

  const toggleBookmark = (projectId: string, title: string) => {
    if (!isAuthenticated) {
      openAuthModal({
        targetRole: 'user',
        message: 'Sign in to save projects to your personal bookmarks.'
      });
      return;
    }

    setBookmarkedProjects(prev => {
      const isSaved = prev.includes(projectId);
      if (isSaved) {
        showToast(`Removed "${title}" from saved projects`, 'info');
        return prev.filter(id => id !== projectId);
      } else {
        showToast(`Saved "${title}" to your bookmarks`, 'success');
        return [...prev, projectId];
      }
    });
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('Hello Project Wallah, I would like to inquire about project consultation and guidance.');
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };


  // Featured Project Blueprints — fetched from the backend (no hardcoded/dummy listings)
  const [featuredProjects, setFeaturedProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) setFeaturedProjects(((data as ProjectItem[]) || []).slice(0, 3));
      })
      .catch(() => {
        if (isMounted) setFeaturedProjects([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full bg-transparent flex flex-col space-y-12 sm:space-y-16 pb-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/10 p-6 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-zinc-200 text-xs font-mono font-semibold backdrop-blur-sm shadow-2xs mx-auto lg:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Enterprise Delivery Standards • 100% Quality Guaranteed</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-[1.15] tracking-tight text-center lg:text-left">
              Turn your ideas into reality
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              Explore 200+ ready-to-submit college projects across Computer Science, Data Science, MBA, BCA, and more. Save time, eliminate submission stress, and focus on what matters — your grades.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 w-full">
              <button
                onClick={() => onNavigate('browse')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Browse Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-white bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={() => setIsProjectDetailsModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-white bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/70 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
                <span>Enter Project Details</span>
              </button>
            </div>

            {/* 4-Stat Metric Row */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center">
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-black font-headline text-slate-900 dark:text-white">200+</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Ready-Made Projects</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-black font-headline text-slate-900 dark:text-white">1,000+</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Happy Students</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-black font-headline text-slate-900 dark:text-white">100%</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Quality Verified</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-black font-headline text-slate-900 dark:text-white">24/7</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Expert Support</p>
              </div>
            </div>
          </div>

          {/* Right Column: Best Selling Projects Hub Showcase (Blank Routing — Zero Dummy Data) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white/40 dark:bg-zinc-950/30 backdrop-blur-xl border border-white/60 dark:border-white/10 p-4 sm:p-6 overflow-hidden shadow-inner">
              {/* Clean Best Selling Card */}
              <div className="bg-white/75 dark:bg-zinc-950/35 backdrop-blur-xl rounded-xl p-5 border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 text-center sm:text-left flex flex-col items-center sm:items-start">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2">
                  <span className="bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-white/15">
                    BEST SELLER • TOP RANKED
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono font-semibold">Verified Blueprints</span>
                  </div>
                </div>

                <div className="space-y-1.5 w-full">
                  <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
                    Best Selling Projects
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Explore curated top-tier student and engineering projects with complete source code, synopsis, IEEE reports, and viva presentations.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs gap-3 w-full">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">Status</span>
                    <span className="font-bold text-slate-900 dark:text-white font-headline text-xs sm:text-sm">Bestseller Hub</span>
                  </div>
                  <button
                    onClick={() => onNavigate('bestseller')}
                    className="w-full sm:w-auto justify-center px-3.5 py-1.5 rounded-lg text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 font-bold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Fast Delivery Badge */}
              <div className="mt-4 p-3 bg-white/75 dark:bg-zinc-950/40 backdrop-blur-xl rounded-xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center text-center sm:text-left gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Instant Delivery Guaranteed</p>
                  <p className="text-[10px] text-slate-600 dark:text-zinc-300">Full source code, synopsis, IEEE report &amp; viva presentation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TRUST BANNER ── */}
      <div className="bg-white/60 dark:bg-zinc-950/30 dark:backdrop-blur-xl rounded-2xl py-4 px-6 border border-white/60 dark:border-white/10 shadow-md transition-all">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Quality Guaranteed</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-zinc-600">•</div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700 dark:text-zinc-200" />
            <span>24/7 Support</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-zinc-600">•</div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-300" />
            <span>Fast Delivery</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-zinc-600">•</div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-700 dark:text-zinc-200" />
            <span>Step-by-Step Guide</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-zinc-600">•</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-700 dark:text-zinc-200" />
            <span>Best Price Guarantee</span>
          </div>
        </div>
      </div>

      {/* ── 3. CATEGORY CATALOG ── */}
      <section id="categories-section" className="bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-center sm:text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left items-center sm:items-start">
          <div>
            <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
              EXPLORE CATEGORIES
            </p>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Find Projects by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 max-w-xl mx-auto sm:mx-0">
              Browse our curated collection across every academic and engineering discipline
            </p>
          </div>

          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline flex items-center gap-1.5 self-center sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Data Science Projects',
              badge: 'Popular',
              desc: 'Machine learning, predictive models, NLP text classifiers, and interactive business intelligence dashboards.',
              icon: Database,
              tags: ['Python', 'Pandas', 'Scikit-learn', 'PyTorch']
            },
            {
              title: 'Web Development',
              badge: 'Trending',
              desc: 'Production-ready full-stack MERN, Next.js, and TypeScript web applications with clean REST APIs.',
              icon: Monitor,
              tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind']
            },
            {
              title: 'Computer Science',
              badge: 'Academic Standard',
              desc: 'Core B.Tech, BCA, and MCA syllabus projects with complete algorithms, database schemas, and documentation.',
              icon: Code,
              tags: ['Java', 'C++', 'Python', 'MySQL']
            },
            {
              title: 'Business Studies',
              badge: 'MBA & BBA',
              desc: 'Financial forecasting models, unit economics analysis, market feasibility analysis, and strategic case studies.',
              icon: Briefcase,
              tags: ['Financial Models', 'Analytics', 'Pro-Formas']
            },
            {
              title: 'Customized Projects',
              badge: 'Enter Project Details',
              desc: 'Tailor-made projects built from your exact college syllabus, custom requirements, and timeline.',
              icon: Sparkles,
              tags: ['1-on-1 Mentorship', 'Custom Tech Stack']
            },
            {
              title: 'View All Projects',
              badge: '200+ Blueprints',
              desc: 'Explore our complete searchable library with instant code downloads, live previews, and report templates.',
              icon: ArrowRight,
              isHighlight: true,
              tags: ['Search All', 'Instant Download']
            }
          ].map((c, i) => (
            <div
              key={i}
              onClick={() => {
                if (c.title === 'Customized Projects') {
                  setIsProjectDetailsModalOpen(true);
                } else {
                  onNavigate('browse');
                }
              }}
              className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between text-center sm:text-left group backdrop-blur-md items-center sm:items-start ${
                c.isHighlight 
                  ? 'bg-zinc-900/85 hover:bg-zinc-900 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border-zinc-700/50 text-white shadow-md hover:shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors mx-auto sm:mx-0 ${
                    c.isHighlight 
                      ? 'bg-white/15 text-white' 
                      : 'bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950'
                  }`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    c.isHighlight 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200/80 dark:border-white/15'
                  }`}>
                    {c.badge}
                  </span>
                </div>

                <h3 className={`font-headline font-bold text-lg mb-1.5 transition-colors ${
                  c.isHighlight 
                    ? 'text-white' 
                    : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                }`}>
                  {c.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${
                  c.isHighlight ? 'text-zinc-300' : 'text-slate-600 dark:text-zinc-300'
                }`}>
                  {c.desc}
                </p>
              </div>

              <div className={`pt-3 border-t flex items-center justify-center sm:justify-between text-xs font-bold w-full ${
                c.isHighlight 
                  ? 'border-white/10 text-zinc-300 group-hover:text-white' 
                  : 'border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-zinc-200 group-hover:underline'
              }`}>
                <span>{c.title === 'Customized Projects' ? 'Enter Project Details' : 'Browse projects'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS SHOWCASE ── */}
      <section className="bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-center sm:text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left items-center sm:items-start">
          <div>
            <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
              POPULAR BLUEPRINTS
            </p>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Featured Project Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 max-w-xl mx-auto sm:mx-0">
              Pre-built, production-tested architectures with full source code and academic reports
            </p>
          </div>

          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white flex items-center gap-1.5 cursor-pointer self-center sm:self-auto"
          >
            <span>View all 200+ Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all group text-center sm:text-left items-center sm:items-start"
            >
              <div className="w-full">
                <div className="flex justify-between items-center mb-3 w-full">
                  <span className="bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-white/15">
                    {project.tier} • {project.subsection || 'ENGINEERING'}
                  </span>
                  <button
                    onClick={() => toggleBookmark(project.id, project.title)}
                    className="p-1 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    title="Bookmark project"
                  >
                    <Bookmark className={`w-4 h-4 transition-colors ${
                      bookmarkedProjects.includes(project.id) 
                        ? 'fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white' 
                        : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-white'
                    }`} />
                  </button>
                </div>

                <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-zinc-300 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6 justify-center sm:justify-start w-full">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100/90 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-xs gap-3 w-full text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">Est. Budget</span>
                  <span className="font-bold text-slate-900 dark:text-white font-headline text-sm">₹{project.budget.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectTemplate) onSelectTemplate(project);
                    onNavigate('submit');
                  }}
                  className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:opacity-95 active:scale-95 cursor-pointer bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100"
                >
                  <span>Order Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. GET OUR INSTANT SERVICES ── */}
      <section id="services-tiers-section" className="bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-center sm:text-left transition-all">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
            TRANSPARENT PRICING
          </p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Get our Instant Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 max-w-xl mx-auto sm:mx-0">
            Instant turnaround academic deliverables starting at just ₹100. Standardized pricing governed by verified SLA delivery guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1: Instant PPT */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center sm:items-start text-center sm:text-left transition-all">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Zap className="w-5 h-5 text-amber-500 dark:text-amber-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 1</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant PPT</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹200</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 4–12 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto sm:mx-0">
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
          <div className="rounded-2xl p-6 border-2 border-cyan-500/70 dark:border-cyan-400/60 bg-white/70 dark:bg-cyan-950/20 backdrop-blur-xl shadow-lg shadow-cyan-900/10 dark:shadow-cyan-950/30 relative flex flex-col justify-between items-center sm:items-start text-center sm:text-left hover:shadow-xl transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white dark:text-zinc-950 text-[10px] font-bold font-mono tracking-wider uppercase bg-cyan-600 dark:bg-cyan-400 shadow-sm">
              Most Popular
            </div>
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="w-10 h-10 rounded-xl text-white dark:text-zinc-950 flex items-center justify-center mb-4 shadow-sm bg-cyan-600 dark:bg-cyan-400 mx-auto sm:mx-0">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300 uppercase">Tier 2</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Mini Project</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹1,000</p>
              <p className="text-xs text-slate-500 dark:text-zinc-300 mt-1">Delivery: 24–48 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-200 text-left w-full max-w-xs mx-auto sm:mx-0">
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
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center sm:items-start text-center sm:text-left transition-all">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Code className="w-5 h-5 text-cyan-600 dark:text-cyan-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 3</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Report</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹100</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 2–6 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto sm:mx-0">
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
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/25 dark:hover:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between items-center sm:items-start text-center sm:text-left transition-all">
            <div className="w-full flex flex-col items-center sm:items-start">
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 4</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Instant Poster</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹400</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 6–12 Hours</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300 text-left w-full max-w-xs mx-auto sm:mx-0">
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

      {/* ── 6. 15-STEP PROTOCOL & GOVERNANCE ── */}
      <section id="protocol-section" className="bg-white/60 dark:bg-zinc-950/30 dark:backdrop-blur-2xl rounded-[24px] p-6 sm:p-12 space-y-8 border border-white/60 dark:border-white/10 shadow-xl text-center md:text-left transition-all">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-center md:text-left">
          <div className="max-w-2xl flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Verified Engineering Delivery Standard
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              The 15-Step Verified Delivery Protocol
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed max-w-xl mx-auto md:mx-0">
              Every Project Wallah engagement is strictly governed by our five milestone gates, 48-point automated QA check, and live staging demo preview before handover.
            </p>
          </div>

          <button
            onClick={onOpenSupport}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all shrink-0 cursor-pointer shadow-xs self-center md:self-auto"
          >
            <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Consult Lead Engineer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { phase: 'Phase I', title: 'Client Onboarding', desc: 'Requirement intake, technical feasibility check & discovery.' },
            { phase: 'Phase II', title: 'Contract & Advance', desc: 'Scope baseline, GST quotation, SOW sign-off & 40% advance.' },
            { phase: 'Phase III', title: 'Engineering & QA', desc: 'Sprint planning, full-stack dev & 48-point automated QA suite.' },
            { phase: 'Phase IV', title: 'Demo & Payment', desc: 'Staging demo walkthrough & 30% milestone clearance.' },
            { phase: 'Phase V', title: 'IP Handover', desc: 'Git repository transfer, final 30% clearance & 30-day bug support.' }
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm space-y-1.5 shadow-xs text-center sm:text-left flex flex-col items-center sm:items-start">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">{item.phase}</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CUSTOMER REVIEWS (BLANK ROUTING & CONTAINER — NO DUMMY CODE) ── */}
      <section id="reviews-section" className="bg-white/40 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-center sm:text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 text-[11px] font-mono font-semibold border border-slate-200/80 dark:border-white/10 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>VERIFIED REVIEWS PROTOCOL</span>
            </div>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Customer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1 max-w-xl mx-auto sm:mx-0">
              Authentic student and client reviews published after verified milestone completion.
            </p>
          </div>

          <button
            onClick={() => onNavigate('reviews')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs self-center sm:self-auto"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Blank Reviews State Card — Zero Dummy Code */}
        <div className="rounded-2xl p-6 sm:p-12 border border-dashed border-slate-300/80 dark:border-white/15 bg-white/30 dark:bg-zinc-900/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white">
              No Customer Reviews Yet
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Verified client testimonials will appear here once project milestones and handovers are completed.
            </p>
          </div>
          <button
            onClick={() => onNavigate('reviews')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 transition-all cursor-pointer shadow-xs"
          >
            Open Reviews Hub
          </button>
        </div>
      </section>

      {/* ── 8. BOTTOM CALL TO ACTION BANNER ── */}
      <section className="bg-zinc-900/90 dark:bg-zinc-950/45 dark:backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-zinc-800 dark:border-white/15 transition-all">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Ready to Ace Your College Submission?
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-white">
            Get Your Complete Project Handover Today
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Choose from 200+ ready blueprints or consult with our lead engineering team for custom syllabus requirements.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => onNavigate('browse')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-zinc-950 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Catalog</span>
          </button>

          <button
            onClick={() => setIsProjectDetailsModalOpen(true)}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Enter Project Details</span>
          </button>
        </div>
      </section>

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
    </div>
  );
};
