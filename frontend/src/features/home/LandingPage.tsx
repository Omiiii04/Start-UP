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
  Cpu, 
  MessageSquare
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { ProjectItem } from '../browse/BrowseProjects';
import { getProjects } from '../../api/client';

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
    const text = encodeURIComponent('Hello ProjectBridge, I would like to inquire about ready made and customized projects for students.');
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleRequireAuth = (targetTab: NavTab, actionMessage: string, template?: ProjectItem) => {
    if (!isAuthenticated) {
      openAuthModal({
        targetRole: 'user',
        message: actionMessage,
        onSuccessRedirectTab: targetTab
      });
    } else {
      if (template && onSelectTemplate) {
        onSelectTemplate(template);
      }
      onNavigate(targetTab);
    }
  };

  // Featured Project Blueprints — fetched from the backend (no hardcoded/dummy listings)
  const [featuredProjects, setFeaturedProjects] = useState<ProjectItem[]>([]);
  const [totalProjectsCount, setTotalProjectsCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        const projectsList = (data as ProjectItem[]) || [];
        if (isMounted && Array.isArray(projectsList)) {
          setFeaturedProjects(projectsList.slice(0, 3));
          setTotalProjectsCount(projectsList.length);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFeaturedProjects([]);
          setTotalProjectsCount(null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const projectCountDisplay = totalProjectsCount && totalProjectsCount > 0 ? `${totalProjectsCount}+` : '200+';

  return (
    <div className="w-full bg-transparent flex flex-col space-y-8 sm:space-y-12 pb-16 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-white/10 px-6 sm:px-10 lg:px-12 py-5 sm:py-7 lg:py-8 shadow-xl dark:shadow-2xl relative overflow-hidden transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-7 text-left flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-800 dark:text-zinc-200 text-xs font-mono font-semibold backdrop-blur-sm shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Verified Blueprints. Fast Delivery. Zero Deadline Stress</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-headline font-black text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-slate-900 dark:text-white leading-[1.14] tracking-tight">
                Premium Projects, Ready When You Need Them
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-medium">
                Choose from {projectCountDisplay} premium projects across Computer Science, Data Science, MBA, BCA and more. Verified, documented, and delivered ready to submit, so you can focus on your grades while we handle the rest.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('browse')}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleOpenWhatsApp}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-white bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </button>

                <button
                  onClick={() => handleRequireAuth('submit', 'Please sign in with Google to submit custom project requirements.')}
                  className="px-5 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-white bg-white/60 hover:bg-white/80 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/70 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-slate-600 dark:text-zinc-300" />
                  <span>Custom Scope</span>
                </button>
              </div>
            </div>

            {/* Prominent Four Statistics Row */}
            <div className="pt-6 mt-2 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div>
                <p className="text-3xl sm:text-4xl xl:text-5xl font-black font-headline text-slate-900 dark:text-white tracking-tight">
                  {projectCountDisplay}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium mt-1.5">Ready-Made Projects</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl xl:text-5xl font-black font-headline text-slate-900 dark:text-white tracking-tight">1,000+</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium mt-1.5">Happy Students</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl xl:text-5xl font-black font-headline text-slate-900 dark:text-white tracking-tight">500+</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium mt-1.5">Verified Reviews</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl xl:text-5xl font-black font-headline text-slate-900 dark:text-white tracking-tight">24/7</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium mt-1.5">Expert Support</p>
              </div>
            </div>
          </div>

          {/* Right Column: Reference Card Showcase (Cohesive Glass Finish) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl bg-white/20 dark:bg-zinc-900/30 backdrop-blur-md border border-white/40 dark:border-white/10 p-6 sm:p-7 shadow-sm text-left space-y-5">
              
              {/* Top Status Bullet */}
              <div className="flex items-center gap-2 text-[#c2782b] dark:text-[#d97706] text-xs sm:text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#c2782b] dark:bg-[#d97706] animate-pulse"></span>
                <span>Limited build slots open this week</span>
              </div>

              {/* Need a Project Blue Container */}
              <div className="rounded-2xl bg-[#174673] p-6 text-white space-y-2.5 shadow-md">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Need a project?
                </h3>
                <div className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  <p>Get it fully built for you.</p>
                  <p>Submit your requirements today.</p>
                </div>
              </div>

              {/* Middle Subheading */}
              <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight pt-1">
                Students with fully ready projects get
              </h4>

              {/* Enhanced 100% Focal Point Stat Row */}
              <div className="flex items-center gap-4 sm:gap-5 py-1">
                <span className="font-serif italic font-normal text-6xl sm:text-7xl lg:text-[76px] text-[#4281bd] dark:text-[#5ca1e6] tracking-tighter shrink-0 leading-none select-none drop-shadow-xs transition-transform duration-300 hover:scale-[1.02]">
                  100%
                </span>
                <div className="text-[#c5792c] dark:text-[#ea983e] text-xs sm:text-sm font-extrabold leading-snug space-y-1 flex flex-col justify-center">
                  <p>more preference in interviews</p>
                  <p>confidence boost in vivas</p>
                  <p>real practical knowledge</p>
                </div>
              </div>

              <div className="border-t border-slate-200/80 dark:border-zinc-800 my-4" />

              {/* Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Full source code and database schema
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Delivered ready with IEEE report &amp; viva deck
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Complete documentation included
                  </span>
                </div>
              </div>

              {/* View Full Project Button */}
              <button
                onClick={() => onNavigate('browse')}
                className="w-full py-3.5 px-6 rounded-2xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer shadow-md mt-6"
              >
                <span>View full project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. TRUST BANNER ── */}
      <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl py-4 px-6 border border-white/60 dark:border-white/10 shadow-md transition-all">
        <div className="flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
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
      <section id="categories-section" className="scroll-mt-24 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
              EXPLORE CATEGORIES
            </p>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Find Projects by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1">
              Browse our curated collection across every academic and engineering discipline
            </p>
          </div>

          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
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
              badge: 'Custom Scope',
              desc: 'Tailor-made projects built from your exact college syllabus, custom requirements, and timeline.',
              icon: Sparkles,
              tags: ['1-on-1 Mentorship', 'Custom Tech Stack']
            },
            {
              title: 'View All Projects',
              badge: `${projectCountDisplay} Blueprints`,
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
                  handleRequireAuth('submit', 'Please sign in with Google to submit custom project requirements.');
                } else {
                  onNavigate('browse');
                }
              }}
              className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between text-left group backdrop-blur-md ${
                c.isHighlight 
                  ? 'bg-zinc-900/85 hover:bg-zinc-900 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border-zinc-700/50 text-white shadow-md hover:shadow-lg' 
                  : 'bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
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

              <div className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                c.isHighlight 
                  ? 'border-white/10 text-zinc-300 group-hover:text-white' 
                  : 'border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-zinc-200 group-hover:underline'
              }`}>
                <span>{c.title === 'Customized Projects' ? 'Submit Custom Scope' : 'Browse projects'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS SHOWCASE ── */}
      <section className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
              POPULAR BLUEPRINTS
            </p>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Featured Project Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1">
              Pre-built, production-tested architectures with full source code and academic reports
            </p>
          </div>

          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-slate-800 dark:text-zinc-200 hover:text-black dark:hover:text-white flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>View all {projectCountDisplay} Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all group text-left"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
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

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100/90 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">Est. Budget</span>
                  <span className="font-bold text-slate-900 dark:text-white font-headline text-sm">₹{project.budget.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={() => handleRequireAuth('submit', `Please sign in with Google to order or customize "${project.title}".`, project)}
                  className="px-4 py-2 rounded-xl text-white dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:opacity-95 active:scale-95 cursor-pointer bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100"
                >
                  <span>Order Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. SERVICE TIERS & PRICING ── */}
      <section id="services-tiers-section" className="scroll-mt-24 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-left transition-all">
        <div>
          <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
            TRANSPARENT PRICING
          </p>
          <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Student &amp; Engineering Service Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1">
            Standardized pricing matrix governed by rigorous milestone SLAs and verified delivery guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1 */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-amber-500 dark:text-amber-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 1</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Micro Consulting</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹2k – ₹10k</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 1–3 Days</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Script &amp; code optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Bug fixing &amp; API debugging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Local environment setup</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleRequireAuth('submit', 'Sign in with Google to order Tier 1 Micro Consulting.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 2</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Research Support</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹10k – ₹30k</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 1–2 Weeks</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Dataset preprocessing pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>PyTorch model training &amp; stats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Benchmarking &amp; MLOps config</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleRequireAuth('submit', 'Sign in with Google to order Tier 2 Research Support.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs"
            >
              Get Started
            </button>
          </div>

          {/* Tier 3 (Featured) */}
          <div className="rounded-2xl p-6 border-2 border-cyan-500/70 dark:border-cyan-400/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg shadow-cyan-900/10 dark:shadow-cyan-950/30 relative flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white dark:text-zinc-950 text-[10px] font-bold font-mono tracking-wider uppercase bg-cyan-600 dark:bg-cyan-400 shadow-sm">
              Most Popular
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl text-white dark:text-zinc-950 flex items-center justify-center mb-4 shadow-sm bg-cyan-600 dark:bg-cyan-400">
                <Code className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300 uppercase">Tier 3</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">MVP Development</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹25k – ₹60k</p>
              <p className="text-xs text-slate-500 dark:text-zinc-300 mt-1">Delivery: 2–4 Weeks</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-200">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Full-Stack React + TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Node.js / Express REST APIs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>PostgreSQL DB &amp; AWS deployment</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleRequireAuth('submit', 'Sign in with Google to order Tier 3 MVP Development.')}
              className="mt-6 w-full py-2.5 rounded-xl text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Tier 4 */}
          <div className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100/90 dark:bg-white/10 text-slate-800 dark:text-zinc-200 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">Tier 4</span>
              <h4 className="text-base font-headline font-bold text-slate-900 dark:text-white mt-1">Enterprise AI</h4>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 font-headline">₹60k – ₹100k+</p>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Delivery: 1–2 Months</p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Distributed LLM pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Kubernetes &amp; automated CI/CD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Enterprise security &amp; SLA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleRequireAuth('submit', 'Sign in with Google to order Tier 4 Enterprise AI.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all border border-slate-300/80 dark:border-white/15 backdrop-blur-sm cursor-pointer shadow-xs"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. 15-STEP PROTOCOL & GOVERNANCE ── */}
      <section id="protocol-section" className="scroll-mt-24 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[24px] p-8 sm:p-12 space-y-8 border border-white/60 dark:border-white/10 shadow-xl text-left transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Verified Engineering Delivery Standard
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              The 15-Step Verified Delivery Protocol
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-300 mt-2 leading-relaxed">
              Every ProjectBridge engagement is strictly governed by our five milestone gates, 48-point automated QA check, and live staging demo preview before handover.
            </p>
          </div>

          <button
            onClick={onOpenSupport}
            className="px-5 py-3 rounded-xl text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all shrink-0 cursor-pointer shadow-xs"
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
            <div key={i} className="p-4 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm space-y-1.5 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-zinc-400 uppercase">{item.phase}</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-600 dark:text-zinc-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. VERIFIED ENGINEERING GUARANTEES ── */}
      <section id="reviews-section" className="scroll-mt-24 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-left transition-all">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold font-mono tracking-widest text-slate-600 dark:text-zinc-400 uppercase">
              QUALITY ASSURANCE
            </p>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              Engineering Delivery Guarantees
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 mt-1">
              Every project blueprint and custom requirement is backed by our strict delivery standards
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 dark:border-white/10 self-start sm:self-auto shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">100% SOW &amp; IP Protection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'Complete Git Codebase Transfer',
              subtitle: 'Clean, Documented Source Code',
              desc: 'Production-ready React, Node.js, Python, and SQL codebases with clean directory structure, step-by-step setup guides, and environment scripts.',
              tag: '100% Source Code Included'
            },
            {
              title: 'Academic Report & Presentation',
              subtitle: 'IEEE & Scopus Formatted',
              desc: 'Double-column LaTeX manuscript templates, complete system architecture diagrams, database ER schemas, and ready-to-present PowerPoint slides.',
              tag: 'IEEE / Scopus Documentation'
            },
            {
              title: 'Direct Architect Guidance',
              subtitle: 'Viva & Setup Support',
              desc: 'Dedicated 1-on-1 technical support for local environment setup, API key configurations, and expert guidance on project viva defense questions.',
              tag: '24/7 Technical Support'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/50 hover:bg-white/80 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm flex flex-col justify-between space-y-4 transition-all">
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {item.tag}
                </span>
                <h3 className="font-headline font-bold text-base text-slate-900 dark:text-white pt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-white/10">
                <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. BOTTOM CALL TO ACTION BANNER ── */}
      <section className="bg-zinc-900/90 dark:bg-zinc-950/90 backdrop-blur-xl text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-zinc-800 dark:border-white/10 transition-all">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Ready to Ace Your College Submission?
          </span>
          <h2 className="font-headline font-black text-2xl sm:text-4xl text-white">
            Get Your Complete Project Handover Today
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Choose from {projectCountDisplay} ready blueprints or consult with our lead engineering team for custom syllabus requirements.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('browse')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-zinc-950 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Catalog</span>
          </button>

          <button
            onClick={() => handleRequireAuth('submit', 'Please sign in with Google to start your custom project intake.')}
            className="px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Custom Project</span>
          </button>
        </div>
      </section>

    </div>
  );
};
