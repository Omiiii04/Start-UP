import React, { useState } from 'react';
import { 
  Plus, 
  LayoutDashboard, 
  ListOrdered, 
  ShoppingBag, 
  BarChart3, 
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
      badgeClass: 'bg-black text-white',
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
      badgeClass: 'bg-gray-200 text-black',
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
        deliverables: ['GitHub Repository Transfer', 'GST Tax Invoice', 'UGC Compliance Report', 'API Documentation']
      });
    } else if (onNavigate) {
      onNavigate('submit');
    }
    showToast(`Scope selected: "${project.title}"`, 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Side Navigation Bar */}
      <aside className="hidden md:flex flex-col h-auto min-h-[calc(100vh-80px)] w-64 bg-black text-white p-6 gap-2 shrink-0">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-sm">
              AJ
            </div>
            <div>
              <h2 className="font-headline text-base font-bold text-white leading-none">Alex Johnson</h2>
              <p className="text-[11px] font-mono text-gray-400">VJTI Mumbai • Comp Eng</p>
            </div>
          </div>
        </div>

        {/* New Project Button */}
        <button 
          onClick={() => {
            if (onNavigate) onNavigate('submit');
          }}
          className="bg-white text-black font-bold text-xs rounded-xl py-3 px-4 mb-4 hover:bg-gray-200 transition-colors w-full flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project Scope</span>
        </button>

        {/* Navigation items */}
        <div className="flex-1 flex flex-col gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'dashboard' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Hub</span>
          </button>

          <button
            onClick={() => setActiveSubTab('requests')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'requests' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>My Projects ({customProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('purchases')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'purchases' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Purchased Assets</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tiers')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'tiers' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Service Tiers & UGC</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('admin');
            }}
            className="flex items-center gap-3 text-gray-400 px-4 py-3 hover:bg-gray-900 hover:text-white transition-all rounded-xl text-left"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Admin Metrics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'settings' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => setActiveSubTab('help')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'help' ? 'bg-gray-800 text-white font-bold' : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & FAQ</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto flex flex-col gap-1 border-t border-gray-800 pt-4 text-xs">
          <button 
            onClick={onOpenSupport}
            className="flex items-center gap-3 text-gray-400 px-4 py-2 hover:bg-gray-900 rounded-xl transition-colors text-left"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Live Chat Support</span>
          </button>

          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 text-gray-400 px-4 py-2 hover:bg-gray-900 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* VIEW 1: COMBINED MAIN DASHBOARD & HOME HUB */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            
            {/* 1. Header & Live KPI Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline text-3xl font-extrabold text-black">
                    Good morning, Alex.
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                    Active Client
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Welcome to your ProjectBridge Command Center. Manage active builds, milestone escrow, and explore new engineering blueprints.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Requirement</span>
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:border-black text-black font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse Projects</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-black shrink-0">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-headline text-black">3</p>
                  <p className="text-[11px] text-gray-500 font-medium">Active Projects</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-headline text-amber-700">1 Due</p>
                  <p className="text-[11px] text-gray-500 font-medium">Milestone Pending</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-headline text-emerald-700">100%</p>
                  <p className="text-[11px] text-gray-500 font-medium">UGC 2018 Compliant</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-headline text-blue-700">AWS ECS</p>
                  <p className="text-[11px] text-gray-500 font-medium">Live Staging URL</p>
                </div>
              </div>
            </div>

            {/* 2. Visual Request Status Tracker & Milestone Ledger */}
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-black bg-gray-100 px-2.5 py-0.5 rounded-full">
                      PRJ-DELTA • LIVE TRACKER
                    </span>
                    <span className="text-xs text-gray-400">• Lead: Om (Lead Architect)</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl text-black mt-1">
                    Project Delta Redesign (AI Vision & AWS ECS Pipeline)
                  </h3>
                </div>

                <a
                  href="https://staging-app.startupsystems.internal/demo-84"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shrink-0 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Staging Preview</span>
                </a>
              </div>

              {/* Progress Steps */}
              <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-black z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-black">1. Discovery</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-sm border-2 border-white">
                    <RotateCw className="w-5 h-5 animate-spin" />
                  </div>
                  <span className="text-xs font-bold text-black">2. Staging QA (65%)</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400">3. Verification</span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-300">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400">4. Handover</span>
                </div>
              </div>

              {/* Milestone Escrow Ledger */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-bold text-gray-500 uppercase">
                    Milestone Escrow (SAC 998314 • 18% GST)
                  </span>
                  <span className="text-xs text-gray-500">Agreed SOW: ₹65,000 + GST</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {milestones.map((m) => {
                    if (m.status === 'PAID') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                            {m.id} • PAID
                          </span>
                          <h4 className="text-xs font-bold text-black">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-black">{formatINR(m.amount)}</p>
                          <p className="text-[10px] text-gray-500 font-mono">Verified Invoice #{m.invoice}</p>
                        </div>
                      );
                    }

                    if (m.status === 'DUE') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border-2 border-black bg-white space-y-2 shadow-sm">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-white font-bold animate-pulse">
                            {m.id} • ACTION REQUIRED
                          </span>
                          <h4 className="text-xs font-bold text-black">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-black">{formatINR(m.amount)}</p>
                          <button 
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="w-full mt-2 py-2 rounded-lg bg-black hover:bg-gray-800 text-white text-xs font-bold transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Milestone ({formatINR(m.amount)})</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div key={m.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50 opacity-60 space-y-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center gap-1 w-fit">
                          <Lock className="w-3 h-3" /> {m.id} • LOCKED
                        </span>
                        <h4 className="text-xs font-bold text-black">{m.title}</h4>
                        <p className="text-base font-mono font-bold text-black">{formatINR(m.amount)}</p>
                        <p className="text-[10px] text-gray-500 font-mono">Unlocks upon M2 Acceptance</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. My Custom Projects & Purchases Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Custom Projects */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-black">My Active Projects</h3>
                    <p className="text-xs text-gray-500">Live repository branches & lead engineer assignments</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('requests')}
                    className="text-xs font-bold text-black hover:underline"
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
                        <div className="w-9 h-9 rounded-xl bg-gray-100 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                          <p.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-black group-hover:text-blue-600 transition-colors">{p.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{p.category} • {p.progress}% Complete</p>
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
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-black">Purchased Deliverables</h3>
                    <p className="text-xs text-gray-500">Download complete code repositories and design assets</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('purchases')}
                    className="text-xs font-bold text-black hover:underline"
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
                        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-bold text-black">{item.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">{item.meta}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadItem(item)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-black hover:text-white text-black transition-colors"
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
                  <h3 className="font-headline text-2xl font-bold text-black">
                    Featured Ready-to-Deploy Blueprints
                  </h3>
                  <p className="text-xs text-gray-500">
                    Production-grade starter architectures with complete documentation and live demos.
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="text-xs font-bold text-black hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:border-black transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-gray-100 text-black text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                          {proj.category}
                        </span>
                        <button
                          onClick={() => toggleBookmark(proj.id, proj.title)}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Bookmark project"
                        >
                          <Bookmark className={`w-4 h-4 transition-colors ${
                            bookmarkedProjects.includes(proj.id) ? 'fill-black text-black' : 'text-gray-400 hover:text-black'
                          }`} />
                        </button>
                      </div>

                      <h4 className="font-headline text-base font-bold text-black mb-1.5 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">
                            {proj.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-black text-[11px] leading-tight">{proj.lead}</p>
                            <p className="text-[10px] text-gray-500">{proj.timeline}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-black text-xs">
                          {formatINR(proj.budget)}
                        </span>
                      </div>

                      <button 
                        onClick={() => handleOrderFeaturedScope(proj)}
                        className="w-full py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span>Order Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Engineering Service Tiers Selection (From Homepage) */}
            <section className="space-y-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-black">
                    Engineering Service Tiers
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Standardized pricing matrix governed by UGC 2018 Academic Integrity regulations.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                >
                  <span>Custom Scope Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tier 1 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-black flex items-center justify-center mb-4">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 1</span>
                    <h4 className="text-base font-headline font-bold text-black mt-1">Micro Consulting</h4>
                    <p className="text-2xl font-bold text-black mt-2 font-headline">₹2k – ₹10k</p>
                    <p className="text-xs text-gray-500 mt-1">Delivery: 1–3 Days</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Script & code optimization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Bug fixing & API debugging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Local environment setup</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-bold transition-all"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 2 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-black flex items-center justify-center mb-4">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 2</span>
                    <h4 className="text-base font-headline font-bold text-black mt-1">Research Support</h4>
                    <p className="text-2xl font-bold text-black mt-2 font-headline">₹10k – ₹30k</p>
                    <p className="text-xs text-gray-500 mt-1">Delivery: 1–2 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Dataset preprocessing pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>PyTorch model training & stats</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Benchmarking & MLOps config</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-bold transition-all"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 3 (Featured) */}
                <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative flex flex-col justify-between">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black text-white text-[10px] font-bold font-mono tracking-wider uppercase">
                    Most Popular
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-4">
                      <Code className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-black uppercase">Tier 3</span>
                    <h4 className="text-base font-headline font-bold text-black mt-1">MVP Development</h4>
                    <p className="text-2xl font-bold text-black mt-2 font-headline">₹25k – ₹60k</p>
                    <p className="text-xs text-gray-500 mt-1">Delivery: 2–4 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Full-Stack React + TypeScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Node.js / Express REST APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>PostgreSQL DB & AWS deployment</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 4 */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-black flex items-center justify-center mb-4">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 4</span>
                    <h4 className="text-base font-headline font-bold text-black mt-1">Enterprise AI</h4>
                    <p className="text-2xl font-bold text-black mt-2 font-headline">₹60k – ₹100k+</p>
                    <p className="text-xs text-gray-500 mt-1">Delivery: 1–2 Months</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Distributed LLM pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Kubernetes & automated CI/CD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                        <span>Enterprise security & SLA</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-bold transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </section>

            {/* 6. 15-Step Protocol & Governance Card (From Homepage) */}
            <section className="bg-black text-white rounded-[24px] p-8 sm:p-12 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                      UGC 2018 Academic Integrity Standard
                    </span>
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    The 15-Step Verified Delivery Protocol
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Every ProjectBridge engagement is strictly governed by our five milestone gates, 48-point automated QA check, and live staging demo preview before handover.
                  </p>
                </div>

                <button
                  onClick={onOpenSupport}
                  className="px-5 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors shrink-0 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult Lead Engineer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase I</span>
                  <h4 className="text-xs font-bold text-white">Client Onboarding</h4>
                  <p className="text-[11px] text-gray-400">Requirement intake, UGC compliance check & architecture discovery.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase II</span>
                  <h4 className="text-xs font-bold text-white">Contract & Advance</h4>
                  <p className="text-[11px] text-gray-400">Scope baseline, GST quotation, SOW sign-off & 40% advance.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase III</span>
                  <h4 className="text-xs font-bold text-white">Engineering & QA</h4>
                  <p className="text-[11px] text-gray-400">Sprint planning, full-stack dev & 48-point automated QA suite.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase IV</span>
                  <h4 className="text-xs font-bold text-white">Demo & Payment</h4>
                  <p className="text-[11px] text-gray-400">Staging demo walkthrough & 30% milestone clearance.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase V</span>
                  <h4 className="text-xs font-bold text-white">IP Handover</h4>
                  <p className="text-[11px] text-gray-400">Git repository transfer, final 30% clearance & 30-day bug support.</p>
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
                <h1 className="font-headline text-2xl font-bold text-black">My Requirement Requests</h1>
                <p className="text-xs text-gray-500 mt-1">Track architecture review, technical scoping, and development status.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('submit')}
                className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Submit New Scope</span>
              </button>
            </div>

            <div className="space-y-4">
              {customProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 text-black flex items-center justify-center">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-bold text-black">{p.name}</h3>
                        <span className="text-[11px] text-gray-500 font-mono">{p.category} • Lead: {p.lead}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${p.badgeClass}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl text-xs space-y-2 border border-gray-100">
                    <div className="flex justify-between text-gray-600">
                      <span>Tech Stack: <strong className="text-black">{p.tech}</strong></span>
                      <span>Branch: <strong className="font-mono text-black">{p.branch}</strong></span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px]">
                        <span>Development Progress</span>
                        <span className="font-mono font-bold">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setInspectedProject(p)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold rounded-xl transition-colors"
                    >
                      Inspect Specs
                    </button>
                    <button
                      onClick={onOpenSupport}
                      className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
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
                <h1 className="font-headline text-2xl font-bold text-black">Purchased Templates & Deliverables</h1>
                <p className="text-xs text-gray-500 mt-1">Download production repositories, Figma design tokens, and UGC documentation.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('browse')}
                className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse More Templates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasesList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gray-100 text-black font-bold uppercase">
                        {item.id}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                    </div>
                    <h3 className="font-headline text-base font-bold text-black">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-mono">{item.fileName}</p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Full Commercial & UGC License
                    </span>
                    <button
                      onClick={() => handleDownloadItem(item)}
                      className="px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold flex items-center gap-2 transition-colors"
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
              <h1 className="font-headline text-2xl font-bold text-black">Service Tiers & Governance</h1>
              <p className="text-xs text-gray-500 mt-1">Review standard tier allocations, milestone release schedules, and UGC compliance protocols.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tier 1 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 1</span>
                <h3 className="text-base font-bold text-black font-headline">Micro Consulting</h3>
                <p className="text-2xl font-bold text-black font-headline">₹2k – ₹10k</p>
                <p className="text-xs text-gray-500">1–3 Days Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 2</span>
                <h3 className="text-base font-bold text-black font-headline">Research Support</h3>
                <p className="text-2xl font-bold text-black font-headline">₹10k – ₹30k</p>
                <p className="text-xs text-gray-500">1–2 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 3 */}
              <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-black uppercase">Tier 3 (MVP)</span>
                <h3 className="text-base font-bold text-black font-headline">MVP Development</h3>
                <p className="text-2xl font-bold text-black font-headline">₹25k – ₹60k</p>
                <p className="text-xs text-gray-500">2–4 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 4 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <span className="text-[11px] font-mono font-bold text-gray-500 uppercase">Tier 4</span>
                <h3 className="text-base font-bold text-black font-headline">Enterprise AI</h3>
                <p className="text-2xl font-bold text-black font-headline">₹60k – ₹100k+</p>
                <p className="text-xs text-gray-500">1–2 Months Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl bg-black text-white text-xs font-bold"
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
              <h1 className="font-headline text-2xl font-bold text-black">Account & Workspace Settings</h1>
              <p className="text-xs text-gray-500 mt-1">Manage your contact profile, institution billing details, and notification channels.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
              <div className="space-y-4 text-xs">
                <h3 className="font-headline font-bold text-sm text-black">User Profile</h3>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Johnson"
                    className="w-full h-11 px-4 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.j@vjti.ac.in"
                    className="w-full h-11 px-4 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Institution / University</label>
                  <input
                    type="text"
                    defaultValue="VJTI Mumbai (Computer Engineering)"
                    className="w-full h-11 px-4 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h3 className="font-headline font-bold text-sm text-black">Notification Preferences</h3>
                <label className="flex items-center gap-3 text-xs text-gray-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-black accent-black" />
                  <span>Email notifications for milestone releases and SOW invoices</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-gray-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-black accent-black" />
                  <span>Instant alerts when AWS ECS Staging deployments pass QA</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => showToast('Settings updated successfully!', 'success')}
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
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
              <h1 className="font-headline text-2xl font-bold text-black">Help Center & FAQ</h1>
              <p className="text-xs text-gray-500 mt-1">Frequently asked questions regarding our 15-step delivery and UGC compliance.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              {[
                {
                  q: 'What is the UGC 2018 Academic Integrity policy on ProjectBridge?',
                  a: 'All project scopes provided by ProjectBridge consist strictly of educational mentorship, open-source technical prototypes, and custom engineering infrastructure. We do not provide ghostwritten thesis text or prohibited exam proxies.',
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
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1 text-xs">
                  <h4 className="font-bold text-black font-headline text-sm">{faq.q}</h4>
                  <p className="text-gray-600 leading-relaxed pt-1">{faq.a}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Need personalized guidance from our leads?</span>
                <button
                  onClick={onOpenSupport}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl flex items-center gap-2"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
              {inspectedProject.id} • SPECIFICATIONS
            </span>
            <h2 className="text-xl font-bold font-headline text-black mt-1 mb-4">
              {inspectedProject.name}
            </h2>

            <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned Architect:</span>
                <span className="font-bold text-black">{inspectedProject.lead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Branch:</span>
                <span className="font-mono font-bold text-black">{inspectedProject.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Agreed Scope Budget:</span>
                <span className="font-mono font-bold text-black">{formatINR(inspectedProject.budget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Phase:</span>
                <span className="font-bold text-blue-600">{inspectedProject.status} ({inspectedProject.progress}%)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setInspectedProject(null);
                  if (onOpenSupport) onOpenSupport();
                }}
                className="flex-1 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Discuss Scope with Architect
              </button>
              <button
                onClick={() => setInspectedProject(null)}
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT GATEWAY MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">GST SAC 998314 Escrow</span>
            </div>

            <h2 className="text-2xl font-extrabold font-headline text-black mb-1">
              Milestone Clearance
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Clearing Milestone 2: Staging Demo & QA Acceptance (30%)
            </p>

            <form onSubmit={handlePayMilestoneSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span className="font-mono font-bold text-black">{formatINR(18000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GST (18%):</span>
                  <span className="font-mono font-bold text-black">{formatINR(3240)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-gray-200 font-headline">
                  <span>Total Due:</span>
                  <span>{formatINR(21240)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      paymentMethod === 'upi' ? 'border-2 border-black bg-gray-50 text-black' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      paymentMethod === 'card' ? 'border-2 border-black bg-gray-50 text-black' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    Debit/Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      paymentMethod === 'netbanking' ? 'border-2 border-black bg-gray-50 text-black' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Enter UPI ID</label>
                  <input
                    type="text"
                    defaultValue="alex.johnson@oksbi"
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 8821)"
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-black">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-black">Confirm Logout</h3>
            <p className="text-xs text-gray-500">Are you sure you want to end your current session?</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  showToast('Logged out of workspace session', 'info');
                  if (onNavigate) onNavigate('dashboard');
                }}
                className="flex-1 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black rounded-xl text-xs font-bold transition-colors"
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
