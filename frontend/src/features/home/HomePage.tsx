import React, { useState } from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Layers, 
  Code, 
  Zap, 
  Check, 
  PlusCircle,
  Compass,
  Bookmark,
  Pill,
  Briefcase,
  FileText,
  Palette,
  Server,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);

  const toggleBookmark = (projectId: string, title: string) => {
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

  const OUR_SERVICES_DATA = [
    {
      id: 'eng',
      title: 'Engineering Projects',
      categoryQuery: 'Engineering projects',
      description: 'End-to-end software development, intelligent AI models, resilient cloud infrastructure, and real-time telemetry.',
      icon: Code,
      badge: 'Most Popular',
      subsections: [
        'Web development',
        'AIML',
        'Cloud and devops',
        'IOT projects',
        'Data analytics projects'
      ],
      priceRange: '₹25k – ₹95k',
      deliveryTime: '1–4 Weeks'
    },
    {
      id: 'pharm',
      title: 'Pharmacy Thesis & Projects',
      categoryQuery: 'Pharmacy thesis & projects',
      description: 'In-silico molecular docking, ADMET pharmacokinetic profiling, nano-carrier drug release kinetics, and thesis documentation.',
      icon: Pill,
      badge: 'Academic Standard',
      subsections: [
        'Molecular Docking',
        'ADMET Profiling',
        'Nano-Formulations',
        'Thesis Chapters'
      ],
      priceRange: '₹20k – ₹45k',
      deliveryTime: '1–3 Weeks'
    },
    {
      id: 'biz',
      title: 'Business Related Project',
      categoryQuery: 'Business related project',
      description: 'Customer lifetime value modeling, unit economics analysis, TAM/SAM/SOM market sizing, and investor pitch deck pro-formas.',
      icon: Briefcase,
      badge: 'Executive Level',
      subsections: [
        'Revenue Forecasting',
        'Churn Propensity',
        'Unit Economics',
        'Pitch Deck Metrics'
      ],
      priceRange: '₹15k – ₹40k',
      deliveryTime: '1–2 Weeks'
    },
    {
      id: 'res',
      title: 'Research Paper Publish',
      categoryQuery: 'Research paper publish',
      description: 'Complete research paper drafting, IEEE/Scopus double-column LaTeX manuscripts, ablation experiments, and peer review support.',
      icon: FileText,
      badge: 'Scopus / IEEE',
      subsections: [
        'Camera-ready LaTeX',
        'Empirical Benchmarks',
        'PRISMA Reviews',
        'Peer Review QA'
      ],
      priceRange: '₹18k – ₹35k',
      deliveryTime: '1–2 Weeks'
    },
    {
      id: 'ui',
      title: 'UI Designing',
      categoryQuery: 'UI designing',
      description: 'Modern Figma design systems, responsive iOS/Android app screens, dark-mode SaaS interfaces, and interactive micro-prototypes.',
      icon: Palette,
      badge: 'Design System',
      subsections: [
        'Figma Prototypes',
        'Mobile App UX',
        'Dark-Mode SaaS',
        'Design Tokens'
      ],
      priceRange: '₹15k – ₹38k',
      deliveryTime: '5–10 Days'
    },
    {
      id: 'dep',
      title: 'Deployment Services',
      categoryQuery: 'Deployment Services',
      description: 'Production cloud provisioning on AWS/GCP, multi-stage Docker builds, automated GitHub Actions CI/CD, and NGINX SSL setup.',
      icon: Server,
      badge: 'Zero-Downtime',
      subsections: [
        'AWS / GCP Cloud',
        'Docker & K8s',
        'CI/CD Pipelines',
        'SSL & Security'
      ],
      priceRange: '₹8k – ₹28k',
      deliveryTime: '1–5 Days'
    }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-8 pt-8">
      {/* Welcome Section */}
      <section className="space-y-1.5">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white">
          Good morning, Alex.
        </h1>
        <p className="font-body text-sm sm:text-base text-zinc-400">
          Here's what's happening with your projects today. Turn your project idea into reality.
        </p>
      </section>

      {/* Quick Actions Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Submit Requirement Quick Action Card */}
        <button 
          onClick={() => onNavigate('submit')}
          className="bg-primary hover:bg-primary-dark text-white p-7 rounded-[22px] flex flex-col justify-between min-h-[170px] shadow-glow hover:scale-[1.01] active:scale-98 transition-all text-left group"
        >
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-mono font-medium text-white/80 block mb-0.5">Quick Action</span>
            <span className="font-headline text-xl sm:text-2xl font-bold leading-tight flex items-center justify-between">
              <span>Submit Requirement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </button>

        {/* Discover / Browse Projects Card */}
        <button 
          onClick={() => onNavigate('browse')}
          className="bg-surface border border-white/10 text-white p-7 rounded-[22px] flex flex-col justify-between min-h-[170px] shadow-card hover:border-white/20 hover:scale-[1.01] active:scale-98 transition-all text-left group"
        >
          <div className="w-11 h-11 rounded-full bg-white/5 text-primary-light flex items-center justify-center border border-white/10">
            <Compass className="w-6 h-6 text-primary-light" />
          </div>
          <div>
            <span className="text-xs font-mono font-medium text-zinc-400 block mb-0.5">Discover</span>
            <span className="font-headline text-xl sm:text-2xl font-bold leading-tight flex items-center justify-between">
              <span>Browse Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </button>
      </section>

      {/* NEW: Our Services Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white">
              Our Services
            </h2>
            <p className="font-body text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Explore our specialized engineering, research, design, and deployment domains with dedicated architect oversight.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-primary-light hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Explore all catalogs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OUR_SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card hover:border-primary/40 hover:shadow-glow/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary-light flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-headline text-lg font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Subsection Pills */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                      Key Subsections:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.subsections.map(sub => (
                        <span 
                          key={sub}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-zinc-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">Starting from</span>
                    <span className="font-bold text-white font-headline">{service.priceRange}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('browse')}
                    className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow active:scale-95"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-white">Featured Projects</h3>
          <button 
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-primary-light hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/5 text-primary-light text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/10">
                  ENGINEERING • AIML
                </span>
                <button
                  onClick={() => toggleBookmark('feat-1', 'Real-Time PyTorch Segmentation Engine')}
                  className="p-1 rounded-lg hover:bg-white/5 transition-colors"
                  title="Bookmark project"
                >
                  <Bookmark className={`w-4 h-4 transition-colors ${
                    bookmarkedProjects.includes('feat-1') ? 'fill-primary text-primary' : 'text-zinc-500 hover:text-white'
                  }`} />
                </button>
              </div>
              <h4 className="font-headline text-lg font-bold text-white mb-1">
                Real-Time PyTorch Segmentation Engine
              </h4>
              <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
                YOLOv8 + UNet pipeline with Dockerized AWS ECS deployment, REST APIs, and live bounding-box visualization client.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                  OM
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white leading-tight">Om (Lead Architect)</span>
                  <span className="text-[11px] text-zinc-400">Tier 3 (MVP) • 2–4 Weeks</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  showToast('Scope selected: Real-Time PyTorch Segmentation Engine', 'info');
                  onNavigate('submit');
                }}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors shadow-glow"
              >
                Order Scope
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/5 text-primary-light text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/10">
                  ENGINEERING • WEB DEVELOPMENT
                </span>
                <button
                  onClick={() => toggleBookmark('feat-2', 'Multi-Tenant Organization Management Platform')}
                  className="p-1 rounded-lg hover:bg-white/5 transition-colors"
                  title="Bookmark project"
                >
                  <Bookmark className={`w-4 h-4 transition-colors ${
                    bookmarkedProjects.includes('feat-2') ? 'fill-primary text-primary' : 'text-zinc-500 hover:text-white'
                  }`} />
                </button>
              </div>
              <h4 className="font-headline text-lg font-bold text-white mb-1">
                Multi-Tenant Organization Management Platform
              </h4>
              <p className="text-xs text-zinc-300 mb-6 leading-relaxed">
                React 18 + Node.js portal with RBAC security, PostgreSQL database, automated GST invoicing, and Stripe/Razorpay integrations.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">
                  SOM
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white leading-tight">Somnath & Falguni</span>
                  <span className="text-[11px] text-zinc-400">Tier 3 (MVP) • 3 Weeks</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  showToast('Scope selected: Multi-Tenant Management Platform', 'info');
                  onNavigate('submit');
                }}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-colors shadow-glow"
              >
                Order Scope
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers Selection */}
      <section className="space-y-6">
        <div>
          <h3 className="font-headline text-2xl font-bold text-white">
            Engineering Service Tiers
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Standardized pricing matrix governed by rigorous milestone SLAs and verified delivery guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1 */}
          <div className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 text-primary-light flex items-center justify-center mb-4 border border-white/10">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase">Tier 1</span>
              <h4 className="text-base font-headline font-bold text-white mt-1">Micro Consulting</h4>
              <p className="text-2xl font-bold text-white mt-2 font-headline">₹2k – ₹10k</p>
              <p className="text-xs text-zinc-400 mt-1">Delivery: 1–3 Days</p>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Script & code optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bug fixing & API debugging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Local environment setup</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('submit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white text-xs font-bold transition-all border border-white/10"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 text-primary-light flex items-center justify-center mb-4 border border-white/10">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase">Tier 2</span>
              <h4 className="text-base font-headline font-bold text-white mt-1">Research Support</h4>
              <p className="text-2xl font-bold text-white mt-2 font-headline">₹10k – ₹30k</p>
              <p className="text-xs text-zinc-400 mt-1">Delivery: 1–2 Weeks</p>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dataset preprocessing pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PyTorch model training & stats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Benchmarking & MLOps config</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('submit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white text-xs font-bold transition-all border border-white/10"
            >
              Get Started
            </button>
          </div>

          {/* Tier 3 (Featured) */}
          <div className="bg-surface rounded-2xl p-6 border-2 border-primary shadow-glow relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold font-mono tracking-wider uppercase shadow-glow">
              Most Popular
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-glow">
                <Code className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-primary-light uppercase">Tier 3</span>
              <h4 className="text-base font-headline font-bold text-white mt-1">MVP Development</h4>
              <p className="text-2xl font-bold text-white mt-2 font-headline">₹25k – ₹60k</p>
              <p className="text-xs text-zinc-400 mt-1">Delivery: 2–4 Weeks</p>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full-Stack React + TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Node.js / Express REST APIs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>PostgreSQL DB & AWS deployment</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('submit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-glow"
            >
              Get Started
            </button>
          </div>

          {/* Tier 4 */}
          <div className="bg-surface rounded-2xl p-6 border border-white/10 shadow-card flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 text-primary-light flex items-center justify-center mb-4 border border-white/10">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase">Tier 4</span>
              <h4 className="text-base font-headline font-bold text-white mt-1">Enterprise AI</h4>
              <p className="text-2xl font-bold text-white mt-2 font-headline">₹60k – ₹100k+</p>
              <p className="text-xs text-zinc-400 mt-1">Delivery: 1–2 Months</p>

              <ul className="mt-5 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Distributed LLM pipelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Kubernetes & automated CI/CD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Enterprise security & SLA</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onNavigate('submit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary text-white text-xs font-bold transition-all border border-white/10"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* 15-Step Protocol Card */}
      <section className="bg-surface border border-white/10 rounded-[24px] p-8 sm:p-12 shadow-card">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Quality Engineering</span>
          </div>
          <h2 className="font-headline text-3xl font-bold text-white mt-1">
            The 15-Step Delivery Protocol
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Every engagement follows our 5-phase delivery protocol with QA gates, staging preview, and 30-day bug support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-primary-light uppercase">Phase I</span>
            <h4 className="text-xs font-bold text-white">Client Onboarding</h4>
            <p className="text-[11px] text-zinc-400">Requirement capture, feasibility evaluation & discovery.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-primary-light uppercase">Phase II</span>
            <h4 className="text-xs font-bold text-white">Contract & Advance</h4>
            <p className="text-[11px] text-zinc-400">Scope baseline, GST quotation, SOW sign-off & advance.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-primary-light uppercase">Phase III</span>
            <h4 className="text-xs font-bold text-white">Engineering & QA</h4>
            <p className="text-[11px] text-zinc-400">Sprint planning, full-stack dev & 48-point QA suite.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-primary-light uppercase">Phase IV</span>
            <h4 className="text-xs font-bold text-white">Demo & Payment</h4>
            <p className="text-[11px] text-zinc-400">Staging demo walkthrough & final invoice clearance.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold text-primary-light uppercase">Phase V</span>
            <h4 className="text-xs font-bold text-white">IP Handover</h4>
            <p className="text-[11px] text-zinc-400">Git repository transfer & 30-day bug fix support.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
