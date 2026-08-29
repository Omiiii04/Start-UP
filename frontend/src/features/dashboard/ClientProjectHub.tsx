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
  LogIn,
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
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

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
      badgeClass: 'bg-white/8 text-white/50 border border-white/10',
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
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Side Navigation Bar */}
      <aside className="hidden md:flex flex-col h-auto min-h-[calc(100vh-80px)] w-64 text-white p-6 gap-2 shrink-0" style={{ background: 'rgba(15,13,26,0.95)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mb-6">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3 mb-2 p-2 bg-white/5 border border-white/10 rounded-2xl">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-primary/40 shadow-glow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-sm shadow-glow shrink-0">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-headline text-sm font-bold text-white leading-tight truncate">{user.fullName}</h2>
                <p className="text-[10px] font-mono text-zinc-400 truncate">{user.email}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-emerald-300 font-medium">Google Verified</span>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => openAuthModal({ targetRole: 'user' })}
              className="p-3 bg-gradient-to-br from-primary/20 to-surface border border-primary/30 rounded-2xl cursor-pointer hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/30 text-primary-light flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                  <LogIn className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white group-hover:text-primary-light transition-colors">Sign In with Google</h3>
                  <p className="text-[10px] text-zinc-400">Save scopes & track live orders</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Project Button */}
        <button 
          onClick={() => {
            if (onNavigate) onNavigate('submit');
          }}
          className="font-bold text-xs rounded-xl py-3 px-4 mb-4 transition-all w-full flex items-center justify-center gap-2 active:scale-95 text-white" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project Scope</span>
        </button>

        {/* Navigation items */}
        <div className="flex-1 flex flex-col gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'dashboard' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Hub</span>
          </button>

          <button
            onClick={() => setActiveSubTab('requests')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'requests' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>My Projects ({customProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('purchases')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'purchases' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Purchased Assets</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tiers')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'tiers' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Our Services & Tiers</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('admin');
            }}
            className="flex items-center gap-3 text-white/40 px-4 py-3 hover:bg-white/6 hover:text-white transition-all rounded-xl text-left"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Admin Metrics</span>
          </button>

          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'settings' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => setActiveSubTab('help')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSubTab === 'help' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-white/40 hover:bg-white/6 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & FAQ</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto flex flex-col gap-1 border-t border-white/8 pt-4 text-xs">
          <button 
            onClick={onOpenSupport}
            className="flex items-center gap-3 text-white/40 px-4 py-2 hover:bg-white/6 rounded-xl transition-colors text-left"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Live Chat Support</span>
          </button>

          {isAuthenticated ? (
            <button 
              onClick={() => {
                logout();
                showToast('Signed out of Google session', 'info');
              }}
              className="flex items-center gap-3 text-red-400/80 hover:text-red-300 px-4 py-2 hover:bg-red-500/10 rounded-xl transition-colors text-left font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button 
              onClick={() => openAuthModal({ targetRole: 'user' })}
              className="flex items-center gap-3 text-primary-light px-4 py-2 hover:bg-white/6 rounded-xl transition-colors text-left font-semibold"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-6xl mx-auto w-full space-y-8 sm:space-y-12">
        
        {/* Mobile Sub-Navigation Pills (Shown only on small screens) */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-white/8 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'dashboard'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveSubTab('requests')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'requests'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>My Projects ({customProjects.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('purchases')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'purchases'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Purchases ({purchasesList.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('tiers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'tiers'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services & Tiers</span>
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'settings'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setActiveSubTab('help')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeSubTab === 'help'
                ? 'bg-primary text-white font-bold shadow-glow'
                : 'bg-surface text-white/50 border border-white/10 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & FAQ</span>
          </button>
        </div>

        {/* VIEW 1: COMBINED MAIN DASHBOARD & HOME HUB */}
        {activeSubTab === 'dashboard' && (
          <div className="space-y-8 sm:space-y-12 animate-fade-in-up">

            {/* ── HERO SECTION ── */}
            <section
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(88,56,200,0.35) 0%, rgba(30,18,80,0.55) 40%, #0a0a12 100%)',
                boxShadow: 'inset 0 0 120px 40px rgba(60,30,140,0.18)',
              }}
              className="relative -mx-4 sm:-mx-6 md:-mx-10 -mt-4 sm:-mt-6 md:-mt-10 px-4 sm:px-8 md:px-20 py-14 sm:py-20 md:py-24 flex flex-col items-center justify-center text-center overflow-hidden rounded-b-2xl sm:rounded-b-3xl"
            >
              {/* Ambient glow blobs with organic drifting animation */}
              <div
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(circle, rgba(99,70,255,0.45) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
                className="absolute left-1/4 top-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none animate-blob-drift"
              />
              <div
                aria-hidden="true"
                style={{
                  background: 'radial-gradient(circle, rgba(180,80,255,0.25) 0%, transparent 70%)',
                  filter: 'blur(80px)',
                }}
                className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 pointer-events-none animate-blob-drift delay-300"
              />

              {/* Eyebrow */}
              <p className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.35em] text-primary-light uppercase mb-3 sm:mb-5 relative z-10 animate-fade-in-down">
                ✨ Enterprise Experience &amp; Delivery Protocol
              </p>

              {/* Brand name */}
              <h1
                className="relative z-10 font-black leading-none select-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl animated-gradient-text"
                style={{
                  letterSpacing: '-0.02em',
                  fontFamily: '"Hanken Grotesk", sans-serif',
                }}
              >
                ProjectBridge
              </h1>

              {/* Tagline */}
              <p className="relative z-10 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 font-medium tracking-wide flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-xl animate-fade-in-up delay-100">
                <span>Full-Stack Engineering</span>
                <span className="opacity-50">•</span>
                <span>AI &amp; ML Solutions</span>
                <span className="opacity-50">•</span>
                <span>Cloud Deployment</span>
                <span className="opacity-50">•</span>
                <span className="text-emerald-400 font-semibold">100% Quality Verified</span>
              </p>

              {/* CTA Buttons */}
              <div className="relative z-10 mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-200">
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-glow hover-glow"
                  style={{
                    background: 'linear-gradient(135deg, #6246ea 0%, #a855f7 100%)',
                    boxShadow: '0 8px 32px rgba(99,70,234,0.5)',
                  }}
                >
                  Start a Project
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  View Services
                </button>
              </div>
            </section>

            {/* 1. Sub-header greeting & quick actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6 animate-fade-in-up delay-150">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-white">
                    Good morning, Alex.
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] sm:text-[11px] font-mono font-bold border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-radar-ping"></span>
                    Active Client
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/50">
                  Welcome to your ProjectBridge Command Center. Manage active builds, milestone escrow, and explore new engineering blueprints.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 transition-all hover-lift active:scale-95 shadow-glow" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Requirement</span>
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/8 border border-white/10 hover:bg-white/14 text-white font-bold text-xs flex items-center gap-2 transition-all hover-lift active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>Browse Projects</span>
                </button>
              </div>
            </div>

            {/* Quick KPI Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/8 shadow-card flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <FileCode2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-headline text-white">3</p>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-medium">Active Projects</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/8 shadow-card flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-headline text-amber-400">1 Due</p>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-medium">Milestone Pending</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/8 shadow-card flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-150">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold font-headline text-emerald-400">100%</p>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-medium">Quality Verified</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-white/8 shadow-card flex items-center gap-3 hover-lift transition-all animate-fade-in-up delay-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  <GitBranch className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-extrabold font-headline text-primary truncate flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar-ping"></span>
                    AWS ECS
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-medium">Live Staging URL</p>
                </div>
              </div>
            </div>

            {/* 2. Visual Request Status Tracker & Milestone Ledger */}
            <div className="bg-surface rounded-2xl border border-white/8 shadow-card p-4 sm:p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-primary bg-primary/15 border border-primary/25 px-2.5 py-0.5 rounded-full">
                      PRJ-DELTA • LIVE TRACKER
                    </span>
                    <span className="text-xs text-white/40">• Lead: Om (Lead Architect)</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg sm:text-xl text-white mt-1.5">
                    Project Delta Redesign (AI Vision & AWS ECS Pipeline)
                  </h3>
                </div>

                <a
                  href="https://staging-app.startupsystems.internal/demo-84"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 transition-colors shrink-0 self-start sm:self-auto" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Staging Preview</span>
                </a>
              </div>

              {/* Progress Steps */}
              <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 z-0" style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }}></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white leading-tight">1. Discovery</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-glow border-2 border-white/20" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                    <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white leading-tight">2. Staging QA</span>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/8 flex items-center justify-center text-white/30 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/40 leading-tight">3. Verification</span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-[72px] sm:max-w-none text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/8 flex items-center justify-center text-white/30 border border-white/10">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/40 leading-tight">4. Handover</span>
                </div>
              </div>

              {/* Milestone Escrow Ledger */}
              <div className="pt-4 border-t border-white/8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-bold text-white/40 uppercase">
                    Milestone Escrow (SAC 998314 • 18% GST)
                  </span>
                  <span className="text-xs text-white/30">Agreed SOW: ₹65,000 + GST</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {milestones.map((m) => {
                    if (m.status === 'PAID') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border border-white/8 bg-white/4 space-y-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-bold">
                            {m.id} • PAID
                          </span>
                          <h4 className="text-xs font-bold text-white">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-white">{formatINR(m.amount)}</p>
                          <p className="text-[10px] text-white/30 font-mono">Verified Invoice #{m.invoice}</p>
                        </div>
                      );
                    }

                    if (m.status === 'DUE') {
                      return (
                        <div key={m.id} className="p-4 rounded-xl border-2 border-primary/60 bg-primary/8 space-y-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary text-white font-bold animate-pulse">
                            {m.id} • ACTION REQUIRED
                          </span>
                          <h4 className="text-xs font-bold text-white">{m.title}</h4>
                          <p className="text-base font-mono font-bold text-white">{formatINR(m.amount)}</p>
                          <button 
                            onClick={() => setIsPaymentModalOpen(true)}
                            className="w-full mt-2 py-2 rounded-lg text-white text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Milestone ({formatINR(m.amount)})</span>
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div key={m.id} className="p-4 rounded-xl border border-white/6 bg-white/3 opacity-60 space-y-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/8 text-white/40 font-bold flex items-center gap-1 w-fit">
                          <Lock className="w-3 h-3" /> {m.id} • LOCKED
                        </span>
                        <h4 className="text-xs font-bold text-white">{m.title}</h4>
                        <p className="text-base font-mono font-bold text-white">{formatINR(m.amount)}</p>
                        <p className="text-[10px] text-white/30 font-mono">Unlocks upon M2 Acceptance</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. My Custom Projects & Purchases Bento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Custom Projects */}
              <div className="bg-surface rounded-2xl border border-white/8 shadow-card p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/8 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-white">My Active Projects</h3>
                    <p className="text-xs text-white/40">Live repository branches &amp; lead engineer assignments</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('requests')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View All ({customProjects.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {customProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setInspectedProject(p)}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 border border-white/6 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <p.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-primary transition-colors">{p.name}</p>
                          <p className="text-[10px] text-white/40 font-mono">{p.category} • {p.progress}% Complete</p>
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
              <div className="bg-surface rounded-2xl border border-white/8 shadow-card p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/8 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-white">Purchased Deliverables</h3>
                    <p className="text-xs text-white/40">Download complete code repositories and design assets</p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('purchases')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {purchasesList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 border border-white/6 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-glow">
                          P
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{item.name}</p>
                          <p className="text-[10px] text-white/40 font-mono">{item.meta}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadItem(item)}
                        className="p-2 rounded-lg bg-white/8 hover:bg-primary hover:text-white text-white/60 transition-colors"
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
                  <h3 className="font-headline text-2xl font-bold text-white">
                    Featured Ready-to-Deploy Blueprints
                  </h3>
                  <p className="text-xs text-white/40">
                    Production-grade starter architectures with complete documentation and live demos.
                  </p>
                </div>
                <button 
                  onClick={() => onNavigate && onNavigate('browse')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card flex flex-col justify-between hover:border-primary/40 hover:shadow-cardHover transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-primary/15 text-primary text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-primary/20">
                          {proj.category}
                        </span>
                        <button
                          onClick={() => toggleBookmark(proj.id, proj.title)}
                          className="p-1 rounded-lg hover:bg-white/8 transition-colors"
                          title="Bookmark project"
                        >
                          <Bookmark className={`w-4 h-4 transition-colors ${
                            bookmarkedProjects.includes(proj.id) ? 'fill-primary text-primary' : 'text-white/30 hover:text-primary'
                          }`} />
                        </button>
                      </div>

                      <h4 className="font-headline text-base font-bold text-white mb-1.5 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-white/50 mb-6 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="border-t border-white/8 pt-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] shadow-glow">
                            {proj.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-white text-[11px] leading-tight">{proj.lead}</p>
                            <p className="text-[10px] text-white/40">{proj.timeline}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-primary text-xs">
                          {formatINR(proj.budget)}
                        </span>
                      </div>

                      <button 
                        onClick={() => handleOrderFeaturedScope(proj)}
                        className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}
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
            <section className="space-y-6 pt-4 border-t border-white/8">
              {/* Our Services 6 Categories Overview */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-white">
                      Our Specialized Services
                    </h3>
                    <p className="text-xs text-white/40 mt-1">
                      Choose from our 6 specialized engineering, research, design, and deployment domains.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('browse')}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
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
                      subs: 'Figma UI/UX Systems, Mobile App Flows, Dark SaaS Consoles',
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
                    <div key={idx} className="p-4 bg-surface rounded-xl border border-white/8 hover:border-primary/40 transition-all flex flex-col justify-between">
                      <div>
                        <h4 className="font-headline font-bold text-white text-sm mb-1">{s.title}</h4>
                        <p className="text-[11px] text-white/50 mb-3">{s.subs}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                        <span className="font-bold text-primary font-mono text-[11px]">{s.price} • {s.time}</span>
                        <button
                          onClick={() => onNavigate && onNavigate('browse')}
                          className="text-xs text-white/70 hover:text-white font-semibold flex items-center gap-1"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/8">
                <div>
                  <h3 className="font-headline text-xl font-bold text-white">
                    Engineering Service Tiers
                  </h3>
                  <p className="text-xs text-white/40 mt-1">
                    Standardized pricing matrix governed by verified engineering SLAs and milestone delivery guarantees.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Custom Scope Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tier 1 */}
                <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/8 text-white/60 flex items-center justify-center mb-4">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 1</span>
                    <h4 className="text-base font-headline font-bold text-white mt-1">Micro Consulting</h4>
                    <p className="text-2xl font-bold text-white mt-2 font-headline">₹2k – ₹10k</p>
                    <p className="text-xs text-white/40 mt-1">Delivery: 1–3 Days</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-white/50">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Script &amp; code optimization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Bug fixing &amp; API debugging</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Local environment setup</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-white/8 hover:bg-primary hover:text-white text-white/60 text-xs font-bold transition-all border border-white/10"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 2 */}
                <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/8 text-white/60 flex items-center justify-center mb-4">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 2</span>
                    <h4 className="text-base font-headline font-bold text-white mt-1">Research Support</h4>
                    <p className="text-2xl font-bold text-white mt-2 font-headline">₹10k – ₹30k</p>
                    <p className="text-xs text-white/40 mt-1">Delivery: 1–2 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-white/50">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Dataset preprocessing pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>PyTorch model training &amp; stats</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Benchmarking &amp; MLOps config</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-white/8 hover:bg-primary hover:text-white text-white/60 text-xs font-bold transition-all border border-white/10"
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 3 (Featured) */}
                <div className="rounded-2xl p-6 border-2 border-primary/60 relative flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.08) 100%)' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-white text-[10px] font-bold font-mono tracking-wider uppercase" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                    Most Popular
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-glow">
                      <Code className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase">Tier 3</span>
                    <h4 className="text-base font-headline font-bold text-white mt-1">MVP Development</h4>
                    <p className="text-2xl font-bold text-white mt-2 font-headline">₹25k – ₹60k</p>
                    <p className="text-xs text-white/40 mt-1">Delivery: 2–4 Weeks</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-white/60">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Full-Stack React + TypeScript</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Node.js / Express REST APIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>PostgreSQL DB &amp; AWS deployment</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-glow active:scale-95" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                  >
                    Get Started
                  </button>
                </div>

                {/* Tier 4 */}
                <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white/8 text-white/60 flex items-center justify-center mb-4">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 4</span>
                    <h4 className="text-base font-headline font-bold text-white mt-1">Enterprise AI</h4>
                    <p className="text-2xl font-bold text-white mt-2 font-headline">₹60k – ₹100k+</p>
                    <p className="text-xs text-white/40 mt-1">Delivery: 1–2 Months</p>

                    <ul className="mt-5 space-y-2.5 text-xs text-white/50">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Distributed LLM pipelines</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Kubernetes &amp; automated CI/CD</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Enterprise security &amp; SLA</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onNavigate && onNavigate('submit')}
                    className="mt-6 w-full py-2.5 rounded-xl bg-white/8 hover:bg-primary hover:text-white text-white/60 text-xs font-bold transition-all border border-white/10"
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
                      Verified Engineering Delivery Standard
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
                  className="px-5 py-3 rounded-xl text-white font-bold text-xs flex items-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consult Lead Engineer</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Phase I</span>
                  <h4 className="text-xs font-bold text-white">Client Onboarding</h4>
                  <p className="text-[11px] text-gray-400">Requirement intake, technical feasibility check & discovery.</p>
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
                <h1 className="font-headline text-2xl font-bold text-white">My Requirement Requests</h1>
                <p className="text-xs text-white/40 mt-1">Track architecture review, technical scoping, and development status.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('submit')}
                className="px-4 py-2.5 text-white font-bold text-xs rounded-xl flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
              >
                <Plus className="w-4 h-4" />
                <span>Submit New Scope</span>
              </button>
            </div>

            <div className="space-y-4">
              {customProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-bold text-white">{p.name}</h3>
                        <span className="text-[11px] text-white/40 font-mono">{p.category} • Lead: {p.lead}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${p.badgeClass}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="p-4 bg-white/4 rounded-xl text-xs space-y-2 border border-white/8">
                    <div className="flex justify-between text-white/50">
                      <span>Tech Stack: <strong className="text-white">{p.tech}</strong></span>
                      <span>Branch: <strong className="font-mono text-primary">{p.branch}</strong></span>
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-white/40">
                        <span>Development Progress</span>
                        <span className="font-mono font-bold text-white">{p.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setInspectedProject(p)}
                      className="px-4 py-2 bg-white/8 hover:bg-white/14 border border-white/10 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Inspect Specs
                    </button>
                    <button
                      onClick={onOpenSupport}
                      className="px-4 py-2 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
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
                <h1 className="font-headline text-2xl font-bold text-white">Purchased Templates &amp; Deliverables</h1>
                <p className="text-xs text-white/40 mt-1">Download production repositories, Figma design tokens, and UGC documentation.</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('browse')}
                className="px-4 py-2.5 text-white font-bold text-xs rounded-xl flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse More Templates</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {purchasesList.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold uppercase border border-primary/20">
                        {item.id}
                      </span>
                      <span className="text-xs text-white/30 font-mono">{item.date}</span>
                    </div>
                    <h3 className="font-headline text-base font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-white/40 font-mono">{item.fileName}</p>
                  </div>

                  <div className="pt-6 border-t border-white/8 mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Full Commercial &amp; UGC License
                    </span>
                    <button
                      onClick={() => handleDownloadItem(item)}
                      className="px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 transition-colors" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
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
              <h1 className="font-headline text-2xl font-bold text-white">Service Tiers &amp; Governance</h1>
              <p className="text-xs text-white/40 mt-1">Review standard tier allocations, milestone release schedules, and UGC compliance protocols.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tier 1 */}
              <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-4">
                <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 1</span>
                <h3 className="text-base font-bold text-white font-headline">Micro Consulting</h3>
                <p className="text-2xl font-bold text-white font-headline">₹2k – ₹10k</p>
                <p className="text-xs text-white/40">1–3 Days Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 2 */}
              <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-4">
                <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 2</span>
                <h3 className="text-base font-bold text-white font-headline">Research Support</h3>
                <p className="text-2xl font-bold text-white font-headline">₹10k – ₹30k</p>
                <p className="text-xs text-white/40">1–2 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl p-6 border-2 border-primary/60 shadow-cardHover space-y-4" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))' }}>
                <span className="text-[11px] font-mono font-bold text-primary uppercase">Tier 3 (MVP)</span>
                <h3 className="text-base font-bold text-white font-headline">MVP Development</h3>
                <p className="text-2xl font-bold text-white font-headline">₹25k – ₹60k</p>
                <p className="text-xs text-white/40">2–4 Weeks Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold shadow-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                >
                  Order Scope
                </button>
              </div>

              {/* Tier 4 */}
              <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-4">
                <span className="text-[11px] font-mono font-bold text-white/30 uppercase">Tier 4</span>
                <h3 className="text-base font-bold text-white font-headline">Enterprise AI</h3>
                <p className="text-2xl font-bold text-white font-headline">₹60k – ₹100k+</p>
                <p className="text-xs text-white/40">1–2 Months Turnaround</p>
                <button
                  onClick={() => onNavigate && onNavigate('submit')}
                  className="w-full py-2 rounded-xl text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
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
              <h1 className="font-headline text-2xl font-bold text-white">Account &amp; Workspace Settings</h1>
              <p className="text-xs text-white/40 mt-1">Manage your contact profile, institution billing details, and notification channels.</p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-6">
              <div className="space-y-4 text-xs">
                <h3 className="font-headline font-bold text-sm text-white">User Profile</h3>
                <div>
                  <label className="block text-white/50 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Johnson"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/50 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.j@vjti.ac.in"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-white/50 font-semibold mb-1">Institution / University</label>
                  <input
                    type="text"
                    defaultValue="VJTI Mumbai (Computer Engineering)"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 space-y-3">
                <h3 className="font-headline font-bold text-sm text-white">Notification Preferences</h3>
                <label className="flex items-center gap-3 text-xs text-white/50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                  <span>Email notifications for milestone releases and SOW invoices</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-white/50 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                  <span>Instant alerts when AWS ECS Staging deployments pass QA</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/8 flex justify-end">
                <button
                  onClick={() => showToast('Settings updated successfully!', 'success')}
                  className="px-6 py-2.5 text-white font-bold text-xs rounded-xl transition-colors" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}
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
              <h1 className="font-headline text-2xl font-bold text-white">Help Center &amp; FAQ</h1>
              <p className="text-xs text-white/40 mt-1">Frequently asked questions regarding our 15-step delivery, intellectual property handover, and quality assurance.</p>
            </div>

            <div className="bg-surface rounded-2xl p-6 border border-white/8 shadow-card space-y-4">
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
                <div key={idx} className="p-4 bg-white/4 rounded-xl border border-white/8 space-y-1 text-xs">
                  <h4 className="font-bold text-white font-headline text-sm">{faq.q}</h4>
                  <p className="text-white/50 leading-relaxed pt-1">{faq.a}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs text-white/40">Need personalized guidance from our leads?</span>
                <button
                  onClick={onOpenSupport}
                  className="px-4 py-2 text-white font-bold text-xs rounded-xl flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-lg p-5 sm:p-8 relative border border-white/10 max-h-[90vh] overflow-y-auto" style={{ background: '#1a1628', boxShadow: '0 24px 64px rgba(0,0,0,0.7)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectedProject(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/8 hover:bg-white/14 text-white/60 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <span className="text-[10px] font-mono font-bold text-white/30 uppercase">
              {inspectedProject.id} • SPECIFICATIONS
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-headline text-white mt-1 mb-4">
              {inspectedProject.name}
            </h2>

            <div className="space-y-3 text-xs bg-white/4 p-4 rounded-xl border border-white/8 mb-6">
              <div className="flex justify-between">
                <span className="text-white/40">Assigned Architect:</span>
                <span className="font-bold text-white">{inspectedProject.lead}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Active Branch:</span>
                <span className="font-mono font-bold text-primary">{inspectedProject.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Agreed Scope Budget:</span>
                <span className="font-mono font-bold text-white">{formatINR(inspectedProject.budget)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Current Phase:</span>
                <span className="font-bold text-primary">{inspectedProject.status} ({inspectedProject.progress}%)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setInspectedProject(null);
                  if (onOpenSupport) onOpenSupport();
                }}
                className="flex-1 py-3 text-white rounded-xl font-bold text-xs transition-all" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}
              >
                Discuss Scope with Architect
              </button>
              <button
                onClick={() => setInspectedProject(null)}
                className="px-5 py-3 bg-white/8 hover:bg-white/14 border border-white/10 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT GATEWAY MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-md p-5 sm:p-8 relative border border-white/15 max-h-[90vh] overflow-y-auto animate-scale-in" style={{ background: '#1a1628', boxShadow: '0 24px 64px rgba(0,0,0,0.8), 0 0 32px rgba(124,58,237,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/8 hover:bg-white/14 text-white/60 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 animate-scale-in" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">GST SAC 998314 Escrow</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold font-headline text-white mb-1">
              Milestone Clearance
            </h2>
            <p className="text-xs text-white/40 mb-6">
              Clearing Milestone 2: Staging Demo &amp; QA Acceptance (30%)
            </p>

            <form onSubmit={handlePayMilestoneSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/4 border border-white/8 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40">Subtotal:</span>
                  <span className="font-mono font-bold text-white">{formatINR(18000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">GST (18%):</span>
                  <span className="font-mono font-bold text-white">{formatINR(3240)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-white/10 font-headline">
                  <span>Total Due:</span>
                  <span className="text-primary-light">{formatINR(21240)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-white/50">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'upi' ? 'border-2 border-primary bg-primary/15 text-primary shadow-glow' : 'border-white/10 text-white/40 bg-white/4 hover:text-white'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'card' ? 'border-2 border-primary bg-primary/15 text-primary shadow-glow' : 'border-white/10 text-white/40 bg-white/4 hover:text-white'
                    }`}
                  >
                    Debit/Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 sm:p-3 rounded-xl border text-center font-bold text-xs transition-all active:scale-95 ${
                      paymentMethod === 'netbanking' ? 'border-2 border-primary bg-primary/15 text-primary shadow-glow' : 'border-white/10 text-white/40 bg-white/4 hover:text-white'
                    }`}
                  >
                    NetBanking
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="animate-fade-in-up">
                  <label className="block text-[11px] font-semibold text-white/40 mb-1">Enter UPI ID</label>
                  <input
                    type="text"
                    defaultValue="alex.johnson@oksbi"
                    className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/6 text-xs text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2 text-xs animate-fade-in-up">
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 8821)"
                    className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      className="w-full h-10 px-3 rounded-xl border border-white/10 bg-white/6 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3.5 rounded-xl text-white font-bold text-xs transition-all flex items-center justify-center gap-2 mt-4 active:scale-95 disabled:opacity-50 shadow-glow hover-glow" style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="rounded-2xl sm:rounded-3xl w-[calc(100vw-2rem)] max-w-sm p-5 sm:p-6 text-center border border-white/10 space-y-4 animate-scale-in" style={{ background: '#1a1628', boxShadow: '0 24px 64px rgba(0,0,0,0.8)' }}>
            <div className="w-12 h-12 rounded-full bg-error/15 flex items-center justify-center mx-auto text-error animate-float">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-white">Confirm Logout</h3>
            <p className="text-xs text-white/40">Are you sure you want to end your current session?</p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  showToast('Logged out of workspace session', 'info');
                  if (onNavigate) onNavigate('dashboard');
                }}
                className="flex-1 py-2.5 text-white rounded-xl text-xs font-bold transition-all active:scale-95" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-5 py-2.5 bg-white/8 hover:bg-white/14 border border-white/10 text-white rounded-xl text-xs font-bold transition-colors active:scale-95"
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
