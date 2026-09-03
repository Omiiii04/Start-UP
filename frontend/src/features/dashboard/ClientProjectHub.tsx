import React, { useState } from 'react';
import { 
  Plus, 
  LayoutDashboard, 
  ListOrdered, 
  ShoppingBag, 
  Settings, 
  HelpCircle, 
  LogOut, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  Code, 
  Layers, 
  Download, 
  ExternalLink, 
  Lock, 
  RotateCw, 
  X, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Check, 
  Bookmark, 
  ArrowRight, 
  Compass, 
  FileCode2, 
  GitBranch
} from 'lucide-react';
import { formatINR } from '../../utils/gst';
import { NavTab } from '../../components/common/Header';
import { useToast } from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { ProjectItem } from '../browse/BrowseProjects';

interface ClientProjectHubProps {
  onNavigate?: (tab: NavTab) => void;
  onOpenSupport?: () => void;
  onSelectTemplate?: (template: ProjectItem) => void;
}

interface CustomProjectItem {
  id: string;
  name: string;
  category: string;
  status: 'Under Review' | 'In Progress' | 'Planning' | 'Completed';
  badgeClass: string;
  icon: any;
  tech: string;
  lead: string;
  progress: number;
  branch: string;
  budget: number;
}

export const ClientProjectHub: React.FC<ClientProjectHubProps> = ({ 
  onNavigate,
  onOpenSupport,
  onSelectTemplate
}) => {
  const { showToast } = useToast();
  const { user, logout } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<
    'dashboard' | 'requests' | 'purchases' | 'tiers' | 'settings' | 'help'
  >('dashboard');

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

  // Milestone Ledger State (Interactive Payment)
  const [milestones, setMilestones] = useState([
    {
      id: 'M1',
      title: 'Advance Kickoff (40%)',
      amount: 28320,
      invoice: 'INV-084-1',
      status: 'PAID',
    },
    {
      id: 'M2',
      title: 'Staging Demo & QA (30%)',
      amount: 21240,
      invoice: 'INV-084-2',
      status: 'DUE',
    },
    {
      id: 'M3',
      title: 'Final IP Handover (30%)',
      amount: 21240,
      invoice: 'INV-084-3',
      status: 'LOCKED',
    },
  ]);

  // Selected project for inspection modal
  const [inspectedProject, setInspectedProject] = useState<CustomProjectItem | null>(null);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Logout Confirm Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Purchases
  const [purchasesList, setPurchasesList] = useState([
    {
      id: 'PUR-01',
      name: 'Corporate SaaS Design System Template',
      meta: 'Downloaded • V2.1',
      fileName: 'projectbridge-corporate-saas-v2.1.zip',
      actionIcon: Download,
      date: '24 Aug 2026',
    },
    {
      id: 'PUR-02',
      name: 'Analytics Widget & Chart Pack',
      meta: 'Update Available • V1.4',
      fileName: 'analytics-charts-pack-v1.4.zip',
      actionIcon: RotateCw,
      date: '18 Aug 2026',
    },
  ]);

  const customProjects: CustomProjectItem[] = [
    {
      id: 'PRJ-DELTA',
      name: 'Project Delta Redesign (Vision Pipeline)',
      category: 'AI Vision & AWS ECS',
      status: 'Under Review',
      badgeClass: 'bg-zinc-700 text-white font-medium',
      icon: Layers,
      tech: 'Python 3.11, PyTorch, FastAPI, Docker, AWS ECS',
      lead: 'Om (Lead Architect)',
      progress: 65,
      branch: 'staging/vision-v1',
      budget: 65000,
    },
    {
      id: 'PRJ-GAMMA',
      name: 'Project Gamma (FinTech Management Portal)',
      category: 'UI/UX Revamp & React',
      status: 'In Progress',
      badgeClass: 'bg-blue-600 text-white',
      icon: Code,
      tech: 'React 18, TypeScript, TailwindCSS, Vite',
      lead: 'Somnath & Falguni',
      progress: 80,
      branch: 'feature/portal-ui',
      budget: 45000,
    },
    {
      id: 'PRJ-EPSILON',
      name: 'Project Epsilon (Multi-Tenant Auth Microservice)',
      category: 'Backend REST API',
      status: 'Planning',
      badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
      icon: Code,
      tech: 'Node.js, Express, PostgreSQL, Redis',
      lead: 'Somnath',
      progress: 25,
      branch: 'chore/auth-scaffold',
      budget: 35000,
    },
  ];

  // Featured projects list
  const featuredProjects = [
    {
      id: 'feat-1',
      title: 'Real-Time PyTorch Segmentation Engine',
      category: 'AI & MACHINE LEARNING',
      description: 'YOLOv8 + UNet pipeline with Dockerized AWS ECS deployment, REST APIs, and live bounding-box visualization client.',
      lead: 'Om (Lead Architect)',
      tier: 'Tier 3 (MVP)',
      timeline: '2–4 Weeks',
      avatar: 'OM',
      budget: 45000,
    },
    {
      id: 'feat-2',
      title: 'Multi-Tenant Organization Management Platform',
      category: 'FULL-STACK DEVELOPMENT',
      description: 'React 18 + Node.js portal with RBAC security, PostgreSQL database, automated GST invoicing, and Stripe/Razorpay integrations.',
      lead: 'Somnath & Falguni',
      tier: 'Tier 3 (MVP)',
      timeline: '3 Weeks',
      avatar: 'SOM',
      budget: 50000,
    },
    {
      id: 'feat-3',
      title: 'Decentralized Edge Telemetry & IoT Hub',
      category: 'EMBEDDED & CLOUD',
      description: 'MQTT microservice with TimeScaleDB streaming ingestion, Grafana telemetry boards, and firmware OTA update client.',
      lead: 'Om & Somnath',
      tier: 'Tier 4 (Enterprise)',
      timeline: '4 Weeks',
      avatar: 'PB',
      budget: 75000,
    }
  ];

  // Handle Download Purchase
  const handleDownloadItem = (item: typeof purchasesList[0]) => {
    showToast(`Downloading ${item.fileName}...`, 'success');
    setPurchasesList(prev =>
      prev.map(p =>
        p.id === item.id ? { ...p, meta: 'Downloaded • Up to date', actionIcon: Download } : p
      )
    );
  };

  // Handle Pay Milestone
  const handlePayMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentModalOpen(false);

      // Update milestones: M2 becomes PAID, M3 becomes DUE
      setMilestones(prev =>
        prev.map(m => {
          if (m.id === 'M2') return { ...m, status: 'PAID' };
          if (m.id === 'M3') return { ...m, status: 'DUE' };
          return m;
        })
      );

      showToast('Payment of ₹21,240 cleared! Milestone 2 verified.', 'success');
    }, 1200);
  };

  const handleOrderFeaturedScope = (project: typeof featuredProjects[0]) => {
    if (onSelectTemplate) {
      onSelectTemplate({
        id: project.id,
        title: project.title,
        category: project.category,
        tier: project.tier,
        budget: project.budget,
        rating: 4.9,
        deliveryTime: project.timeline,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        description: project.description,
        tags: ['Production Ready', 'Docker', 'FastAPI', 'PostgreSQL'],
        features: ['Full Source Code Handover', 'AWS ECS Staging Environment', '48-Point QA Checklist', '30-Day Bug Support'],
        deliverables: ['GitHub Repository Transfer', 'GST Tax Invoice', 'System Architecture Report', 'API Documentation']
      });
    } else if (onNavigate) {
      onNavigate('submit');
    }
    showToast(`Scope selected: "${project.title}"`, 'info');
  };

  return (
    <div className="w-full bg-transparent flex flex-col">

      {/* Main Content Area - Full Width */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-[1440px] mx-auto w-full space-y-8 sm:space-y-12">
        
        {/* Sub-Navigation Pills */}
        <div className="bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-white/40 shadow-sm flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'requests'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>My Projects ({customProjects.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('purchases')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'purchases'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Purchases ({purchasesList.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tiers')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'tiers'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services & Tiers</span>
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'settings'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setActiveSubTab('help')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'help'
                ? 'bg-zinc-900 text-white font-bold shadow-sm'
                : 'bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/80'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & FAQ</span>
          </button>
        </div>

        {/* VIEW 1: COMBINED MAIN DASHBOARD OVERVIEW */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-8 sm:space-y-12 animate-fade-in-up">

            {/* 1. Sub-header greeting & quick actions card */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6 animate-fade-in-up delay-150">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-gray-900">
                      Welcome back, {user?.fullName || 'Client'}.
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-mono font-bold border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-radar-ping"></span>
                      {user?.institutionOrCompany ? user.institutionOrCompany : 'Active Client'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Your ProjectBridge Command Center. Track active engineering sprints, inspect milestones, release escrow, and download deliverables.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 transition-all hover-lift active:scale-95 bg-zinc-900 hover:bg-black shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit Requirement</span>
                  </button>
                  <button
                    onClick={() => onNavigate && onNavigate('browse')}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center gap-2 transition-all hover-lift active:scale-95 cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Browse Projects</span>
                  </button>
                </div>
              </div>

              {/* Quick KPI Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-50">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
                    <FileCode2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold font-headline text-gray-900">3</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Active Projects</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-100">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold font-headline text-amber-500">1 Due</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Milestone Pending</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-150">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold font-headline text-emerald-600">100%</p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Quality Verified</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-200">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
                    <GitBranch className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-extrabold font-headline text-zinc-800 truncate flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar-ping"></span>
                      AWS ECS
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Live Staging URL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Visual Request Status Tracker & Milestone Ledger */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-800 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full">
                      PRJ-DELTA • LIVE TRACKER
                    </span>
                    <span className="text-xs text-gray-400">• Lead: Om (Lead Architect)</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-gray-900 mt-1.5">
                    Project Delta Redesign (AI Vision & AWS ECS Pipeline)
                  </h3>
                </div>

                <a
                  href="https://staging-app.startupsystems.internal/demo-84"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 transition-colors shrink-0 self-start sm:self-auto bg-zinc-900 hover:bg-black shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Staging Preview</span>
                </a>
              </div>

              {/* Progress Steps */}
              <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 z-0 bg-zinc-800"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-zinc-900">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">1. Discovery</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-zinc-900">
                    <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">2. Staging QA</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400 leading-tight">3. Verification</span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400 leading-tight">4. Handover</span>
                </div>
              </div>

              {/* Milestone Escrow Ledger */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                    Milestone Escrow (SAC 998314 • 18% GST)
                  </span>
                  <span className="text-xs text-gray-400">Agreed SOW: ₹65,000 + GST</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {milestones.map((m) => {
                    if (m.status === 'PAID') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                            {m.id} • PAID
                          </span>
                          <h4 className="text-xs font-bold text-gray-800">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-gray-900">{formatINR(m.amount)}</p>
                          <p className="text-[10px] text-gray-400 font-mono">Verified Invoice #{m.invoice}</p>
                        </div>
                      );
                    }

                    if (m.status === 'DUE') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border-2 border-zinc-300 bg-zinc-50 space-y-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-white font-bold animate-pulse">
                            {m.id} • ACTION REQUIRED
                          </span>
                          <h4 className="text-xs font-bold text-gray-800">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-gray-900">{formatINR(m.amount)}</p>
                          <button 
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="w-full mt-2 py-2 rounded-lg text-white text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-black shadow-sm"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Milestone ({formatINR(m.amount)})</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div key={m.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 opacity-60 space-y-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-200 text-gray-500 font-bold flex items-center gap-1 w-fit">
                          <Lock className="w-3 h-3" /> {m.id} • LOCKED
                        </span>
                        <h4 className="text-xs font-bold text-gray-800">{m.title}</h4>
                        <p className="text-base font-mono font-bold text-gray-900">{formatINR(m.amount)}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Unlocks upon M2 Acceptance</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. My Custom Projects & Purchases Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Custom Projects */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-gray-900">My Active Projects</h3>
                    <p className="text-xs text-gray-400">Live repository branches &amp; lead engineer assignments</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('requests')}
                    className="text-xs font-bold text-zinc-700 hover:text-zinc-900 hover:underline"
                  >
                    View All ({customProjects.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {customProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setInspectedProject(p)}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-all">
                          <p.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 group-hover:text-zinc-700 transition-colors">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{p.category} • {p.progress}% Complete</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${p.badgeClass}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Purchases & Deliverables */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-gray-900">Purchased Deliverables</h3>
                    <p className="text-xs text-gray-400">Download complete code repositories and design assets</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('purchases')}
                    className="text-xs font-bold text-zinc-700 hover:text-zinc-900 hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {purchasesList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{item.meta}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadItem(item)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-zinc-900 hover:text-white text-gray-500 transition-colors"
                        title="Download Asset Bundle"
                      >
                        <item.actionIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* 4. Featured Engineering Projects Catalog (From Homepage) */}
            <section className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-gray-900">
                    Featured Ready-to-Deploy Blueprints
                  </h3>
                  <p className="text-xs text-gray-400">
                    Production-grade starter architectures with complete documentation and live demos.
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="text-xs font-bold text-zinc-700 hover:text-zinc-900 hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-zinc-100 text-zinc-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-zinc-200">
                          {proj.category}
                        </span>
                        <button
                          onClick={() => toggleBookmark(proj.id, proj.title)}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Bookmark project"
                        >
                          <Bookmark className={`w-4 h-4 transition-colors ${
                            bookmarkedProjects.includes(proj.id) ? 'fill-zinc-800 text-zinc-800' : 'text-gray-300 hover:text-zinc-700'
                          }`} />
                        </button>
                      </div>

                      <h4 className="font-headline text-base font-bold text-gray-900 mb-1.5 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px]">
                            {proj.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-[11px] leading-tight">{proj.lead}</p>
                            <p className="text-[10px] text-gray-400">{proj.timeline}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-zinc-800 text-xs">
                          {formatINR(proj.budget)}
                        </span>
                      </div>

                      <button 
                        onClick={() => handleOrderFeaturedScope(proj)}
                        className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1 bg-zinc-900 hover:bg-black shadow-sm"
                      >
                        <span>Order Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Engineering Service Tiers & Our Services Selection */}
            <section className="space-y-6 pt-4 border-t border-gray-200">
              {/* Our Services 6 Categories Overview */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-slate-900">
                      Our Specialized Services
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose from our 6 specialized engineering, research, design, and deployment domains.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('browse')}
                    className="text-xs font-bold text-zinc-900 hover:text-zinc-700 hover:underline flex items-center gap-1"
                  >
                    <span>Explore All in Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      title: '1. Engineering Projects',
                      subs: 'Web development, AIML, Cloud & DevOps, IoT, Data Analytics',
                      price: 'From ₹25k',
                      time: '1–4 Weeks'
                    },
                    {
                      title: '2. Pharmacy Thesis & Projects',
                      subs: 'Molecular Docking, ADMET, Nano-Formulations, Thesis Drafts',
                      price: 'From ₹20k',
                      time: '1–3 Weeks'
                    },
                    {
                      title: '3. Business Related Project',
                      subs: 'Revenue Forecasting, Churn Propensity, Unit Economics, Pro-Formas',
                      price: 'From ₹15k',
                      time: '1–2 Weeks'
                    },
                    {
                      title: '4. Research Paper Publish',
                      subs: 'IEEE/Scopus LaTeX, Ablation Experiments, PRISMA Reviews',
                      price: 'From ₹18k',
                      time: '1–2 Weeks'
                    },
                    {
                      title: '5. UI Designing',
                      subs: 'Figma UI/UX Systems, Mobile App Flows, Clean Web & App Consoles',
                      price: 'From ₹15k',
                      time: '5–10 Days'
                    },
                    {
                      title: '6. Deployment Services',
                      subs: 'AWS/GCP Provisioning, Docker & K8s, GitHub CI/CD, SSL & NGINX',
                      price: 'From ₹8k',
                      time: '1–5 Days'
                    }
                  ].map((s, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-zinc-400 hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <h4 className="font-headline font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                        <p className="text-[11px] text-slate-500 mb-3">{s.subs}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                        <span className="font-bold text-zinc-900 font-mono text-[11px]">{s.price} • {s.time}</span>
                        <button
                          onClick={() => onNavigate && onNavigate('browse')}
                          className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-200">
                <div>
                  <h3 className="font-headline text-xl font-bold text-slate-900">
                    Engineering Service Tiers
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Standardized pricing matrix governed by verified engineering SLAs and milestone delivery guarantees.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="text-xs font-bold text-zinc-900 hover:text-zinc-700 hover:underline flex items-center gap-1"
                >
                  <span>Custom Scope Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tier 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                      <Zap className="w-5 h-5 text-zinc-800" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 1</span>
                    <h4 className="text-base font-headline font-bold text-slate-900 mt-1">Micro Consulting</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-2 font-headline">₹2k – ₹10k</p>
                    <p className="text-xs text-slate-500 mt-1">Delivery: 1–3 Days</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>Script &amp; code optimization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>Bug fixing &amp; API debugging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>Local environment setup</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-zinc-800 hover:text-white text-slate-800 text-xs font-bold transition-all border border-slate-200"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                      <Cpu className="w-5 h-5 text-zinc-800" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 2</span>
                    <h4 className="text-base font-headline font-bold text-slate-900 mt-1">Research Support</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-2 font-headline">₹10k – ₹30k</p>
                    <p className="text-xs text-slate-500 mt-1">Delivery: 1–2 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>Dataset preprocessing pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>PyTorch model training &amp; stats</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                        <span>Benchmarking &amp; MLOps config</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-zinc-800 hover:text-white text-slate-800 text-xs font-bold transition-all border border-slate-200"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 3 (Featured) */}
                <div className="rounded-2xl p-6 border-2 border-zinc-400 bg-zinc-50/50 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[10px] font-bold font-mono tracking-wider uppercase" style={{ background: 'rgba(38, 40, 48, 0.85)' }}>
                    Most Popular
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center mb-4 shadow-sm" style={{ background: 'rgba(38, 40, 48, 0.85)' }}>
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-zinc-700 uppercase">Tier 3</span>
                    <h4 className="text-base font-headline font-bold text-slate-900 mt-1">MVP Development</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-2 font-headline">₹25k – ₹60k</p>
                    <p className="text-xs text-slate-500 mt-1">Delivery: 2–4 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>Full-Stack React + TypeScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>Node.js / Express REST APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>PostgreSQL DB &amp; AWS deployment</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all hover:opacity-95 active:scale-95 shadow-sm"
                    style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 4 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4">
                      <Layers className="w-5 h-5 text-zinc-700" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 4</span>
                    <h4 className="text-base font-headline font-bold text-slate-900 mt-1">Enterprise AI</h4>
                    <p className="text-2xl font-bold text-slate-900 mt-2 font-headline">₹60k – ₹100k+</p>
                    <p className="text-xs text-slate-500 mt-1">Delivery: 1–2 Months</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>Distributed LLM pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>Kubernetes &amp; automated CI/CD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>Enterprise security &amp; SLA</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </section>

            {/* 6. 15-Step Protocol & Governance Card (From Homepage) */}
            <section className="text-white rounded-[24px] p-8 sm:p-12 space-y-8 shadow-sm" style={{ background: 'rgba(34, 36, 44, 0.88)' }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      Verified Engineering Delivery Standard
                    </span>
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    The 15-Step Verified Delivery Protocol
                  </h2>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    Every ProjectBridge engagement is strictly governed by our five milestone gates, 48-point automated QA check, and live staging demo preview before handover.
                  </p>
                </div>

                <button
                  onClick={onOpenSupport}
                  className="px-5 py-3 rounded-xl text-white font-bold text-xs flex items-center gap-2 border border-white/20 hover:bg-white/10 transition-colors shrink-0"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult Lead Engineer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl border border-white/10 space-y-1.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Phase I</span>
                  <h4 className="text-xs font-bold text-white">Client Onboarding</h4>
                  <p className="text-[11px] text-zinc-300">Requirement intake, technical feasibility check & discovery.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 space-y-1.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Phase II</span>
                  <h4 className="text-xs font-bold text-white">Contract & Advance</h4>
                  <p className="text-[11px] text-zinc-300">Scope baseline, GST quotation, SOW sign-off & 40% advance.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 space-y-1.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Phase III</span>
                  <h4 className="text-xs font-bold text-white">Engineering & QA</h4>
                  <p className="text-[11px] text-zinc-300">Sprint planning, full-stack dev & 48-point automated QA suite.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 space-y-1.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Phase IV</span>
                  <h4 className="text-xs font-bold text-white">Demo & Payment</h4>
                  <p className="text-[11px] text-zinc-300">Staging demo walkthrough & 30% milestone clearance.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 space-y-1.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Phase V</span>
                  <h4 className="text-xs font-bold text-white">IP Handover</h4>
                  <p className="text-[11px] text-zinc-300">Git repository transfer, final 30% clearance & 30-day bug support.</p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: MY REQUESTS TAB */}
        {activeSubTab === 'requests' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-headline text-2xl font-bold text-white drop-shadow-sm">My Requirement Requests</h1>
                <p className="text-xs text-zinc-300 mt-1">Track architecture review, technical scoping, and development status.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('submit')}
                className="px-4 py-2.5 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:opacity-95 transition-all"
                style={{ background: 'rgba(38, 40, 48, 0.85)' }}
              >
                <Plus className="w-4 h-4" />
                <span>Submit New Scope</span>
              </button>
            </div>

            <div className="space-y-4">
              {customProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-bold text-slate-900">{p.name}</h3>
                        <span className="text-[11px] text-slate-500 font-mono">{p.category} • Lead: {p.lead}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${p.badgeClass}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2 border border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Tech Stack: <strong className="text-slate-900">{p.tech}</strong></span>
                      <span>Branch: <strong className="font-mono text-zinc-800">{p.branch}</strong></span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Development Progress</span>
                        <span className="font-mono font-bold text-slate-900">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'rgba(38, 40, 48, 0.85)' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setInspectedProject(p)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                    >
                      Inspect Specs
                    </button>
                    <button
                      onClick={onOpenSupport}
                      className="px-4 py-2 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm hover:opacity-95"
                      style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Architect</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: MY PURCHASES TAB */}
        {activeSubTab === 'purchases' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-headline text-2xl font-bold text-white drop-shadow-sm">Purchased Templates &amp; Deliverables</h1>
                <p className="text-xs text-zinc-300 mt-1">Download production repositories, Figma design tokens, and UGC documentation.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('browse')}
                className="px-4 py-2.5 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm hover:opacity-95 transition-all"
                style={{ background: 'rgba(38, 40, 48, 0.85)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse More Templates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasesList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 font-bold uppercase border border-zinc-200">
                        {item.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <h3 className="font-headline text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{item.fileName}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Full Commercial &amp; UGC License
                    </span>
                    <button
                      onClick={() => handleDownloadItem(item)}
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 transition-colors hover:opacity-95"
                      style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: TIERS & UGC PROTOCOL VIEW */}
        {activeSubTab === 'tiers' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h1 className="font-headline text-2xl font-bold text-white drop-shadow-sm">Service Tiers &amp; Governance</h1>
              <p className="text-xs text-zinc-300 mt-1">Review standard tier allocations, milestone release schedules, and UGC compliance protocols.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tier 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 1</span>
                <h3 className="text-base font-bold text-slate-900 font-headline">Micro Consulting</h3>
                <p className="text-2xl font-bold text-slate-900 font-headline">₹2k – ₹10k</p>
                <p className="text-xs text-slate-500">1–3 Days Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 2</span>
                <h3 className="text-base font-bold text-slate-900 font-headline">Research Support</h3>
                <p className="text-2xl font-bold text-slate-900 font-headline">₹10k – ₹30k</p>
                <p className="text-xs text-slate-500">1–2 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl p-6 border-2 border-zinc-400 bg-white shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-zinc-700 uppercase">Tier 3 (MVP)</span>
                <h3 className="text-base font-bold text-slate-900 font-headline">MVP Development</h3>
                <p className="text-2xl font-bold text-slate-900 font-headline">₹25k – ₹60k</p>
                <p className="text-xs text-slate-500">2–4 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 4 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">Tier 4</span>
                <h3 className="text-base font-bold text-slate-900 font-headline">Enterprise AI</h3>
                <p className="text-2xl font-bold text-slate-900 font-headline">₹60k – ₹100k+</p>
                <p className="text-xs text-slate-500">1–2 Months Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  Order Scope
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: SETTINGS TAB */}
        {activeSubTab === 'settings' && (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
            <div>
              <h1 className="font-headline text-2xl font-bold text-white drop-shadow-sm">Account &amp; Workspace Settings</h1>
              <p className="text-xs text-zinc-300 mt-1">Manage your contact profile, institution billing details, and notification channels.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-4 text-xs">
                <h3 className="font-headline font-bold text-sm text-slate-900">User Profile</h3>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Johnson"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.j@vjti.ac.in"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Institution / University</label>
                  <input
                    type="text"
                    defaultValue="VJTI Mumbai (Computer Engineering)"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="font-headline font-bold text-sm text-slate-900">Notification Preferences</h3>
                <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-zinc-700" />
                  <span>Email notifications for milestone releases and SOW invoices</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-zinc-700" />
                  <span>Instant alerts when AWS ECS Staging deployments pass QA</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => showToast('Settings updated successfully!', 'success')}
                  className="px-6 py-2.5 text-white font-bold text-xs rounded-xl transition-colors shadow-sm hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: HELP & FAQ TAB */}
        {activeSubTab === 'help' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
            <div>
              <h1 className="font-headline text-2xl font-bold text-white drop-shadow-sm">Help Center &amp; FAQ</h1>
              <p className="text-xs text-zinc-300 mt-1">Frequently asked questions regarding our 15-step delivery, intellectual property handover, and quality assurance.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              {[
                {
                  q: 'What is the Intellectual Property & Delivery Policy on ProjectBridge?',
                  a: 'All project scopes provided by ProjectBridge include 100% full intellectual property transfer upon final milestone clearance. Deliverables consist strictly of custom engineering, code repositories, architecture designs, or academic thesis research assistance.',
                },
                {
                  q: 'How does milestone payment clearance work?',
                  a: 'Engagements follow a 40% Advance, 30% Staging Demo QA, and 30% Final Delivery schedule with standard 18% GST (SAC 998314). Invoices are verified on clearance.',
                },
                {
                  q: 'How do I test my live project before final payment?',
                  a: 'Our team deploys every build to a secure AWS ECS Fargate staging URL. You will receive an interactive preview link to test all features and APIs.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <h4 className="font-bold text-slate-900 font-headline text-sm">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed pt-1">{faq.a}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need personalized guidance from our leads?</span>
                <button
                  onClick={onOpenSupport}
                  className="px-4 py-2 text-white font-bold text-xs rounded-xl flex items-center gap-2 hover:opacity-95"
                  style={{ background: 'rgba(38, 40, 48, 0.85)' }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PROJECT INSPECTION MODAL */}
      {inspectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-lg p-5 sm:p-8 relative bg-white border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedProject(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              {inspectedProject.id} • SPECIFICATIONS
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-headline text-slate-900 mt-1 mb-4">
              {inspectedProject.name}
            </h2>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Architect:</span>
                <span className="font-bold text-slate-900">{inspectedProject.lead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Branch:</span>
                <span className="font-mono font-bold text-zinc-900">{inspectedProject.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agreed Scope Budget:</span>
                <span className="font-mono font-bold text-slate-900">{formatINR(inspectedProject.budget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Phase:</span>
                <span className="font-bold text-zinc-800">{inspectedProject.status} ({inspectedProject.progress}%)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setInspectedProject(null);
                  if (onOpenSupport) onOpenSupport();
                }}
                className="flex-1 py-3 text-white rounded-xl font-bold text-xs transition-all shadow-sm hover:opacity-95"
                style={{ background: 'rgba(38, 40, 48, 0.85)' }}
              >
                Discuss Scope with Architect
              </button>
              <button
                onClick={() => setInspectedProject(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT GATEWAY MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-md p-5 sm:p-8 relative bg-white border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-scale-in" />
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">GST SAC 998314 Escrow</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold font-headline text-slate-900 mb-1">
              Milestone Clearance
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Clearing Milestone 2: Staging Demo &amp; QA Acceptance (30%)
            </p>

            <form onSubmit={handlePayMilestoneSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">{formatINR(18000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GST (18%):</span>
                  <span className="font-mono font-bold text-slate-900">{formatINR(3240)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200 font-headline">
                  <span>Total Due:</span>
                  <span className="text-zinc-800">{formatINR(21240)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'upi' ? 'border-2 border-zinc-700 bg-zinc-100 text-zinc-900' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'card' ? 'border-2 border-zinc-700 bg-zinc-100 text-zinc-900' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                    }`}
                  >
                    Debit/Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'netbanking' ? 'border-2 border-zinc-700 bg-zinc-100 text-zinc-900' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="animate-fade-in-up">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Enter UPI ID</label>
                  <input
                    type="text"
                    defaultValue="alex.johnson@oksbi"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/10 transition-all"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs animate-fade-in-up">
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 8821)"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/10 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/10 transition-all"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/10 transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-xl text-white font-bold text-xs transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50 shadow-sm hover:opacity-95"
                style={{ background: 'rgba(38, 40, 48, 0.85)' }}
              >
                {isProcessingPayment ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Processing Clearance...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Authorize Payment ({formatINR(21240)})</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-sm p-5 sm:p-6 text-center bg-white border border-slate-200 shadow-2xl space-y-4 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-600">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-slate-900">Confirm Logout</h3>
            <p className="text-xs text-slate-500">Are you sure you want to end your current session?</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  logout();
                  setIsLogoutModalOpen(false);
                  showToast('Logged out of workspace session', 'info');
                  if (onNavigate) onNavigate('dashboard');
                }}
                className="flex-1 py-2.5 text-white rounded-xl text-xs font-bold transition-all active:scale-95 bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors active:scale-95"
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
