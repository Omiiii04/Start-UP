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
  Bookmark
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

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-8 pt-8">
      {/* Welcome Section */}
      <section className="space-y-1.5">
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-black">
          Good morning, Alex.
        </h1>
        <p className="font-body text-sm sm:text-base text-gray-600">
          Here's what's happening with your projects today. Turn your project idea into reality.
        </p>
      </section>

      {/* Quick Actions Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Submit Requirement Quick Action Card */}
        <button 
          onClick={() => onNavigate('submit')}
          className="bg-black text-white p-7 rounded-[22px] flex flex-col justify-between min-h-[170px] shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:scale-[1.01] active:scale-98 transition-all text-left group"
        >
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-mono font-medium text-gray-300 block mb-0.5">Quick Action</span>
            <span className="font-headline text-xl sm:text-2xl font-bold leading-tight flex items-center justify-between">
              <span>Submit Requirement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </button>

        {/* Discover / Browse Projects Card */}
        <button 
          onClick={() => onNavigate('browse')}
          className="bg-white border border-gray-200 text-black p-7 rounded-[22px] flex flex-col justify-between min-h-[170px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-gray-300 hover:scale-[1.01] active:scale-98 transition-all text-left group"
        >
          <div className="w-11 h-11 rounded-full bg-gray-100 text-black flex items-center justify-center">
            <Compass className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-xs font-mono font-medium text-gray-500 block mb-0.5">Discover</span>
            <span className="font-headline text-xl sm:text-2xl font-bold leading-tight flex items-center justify-between">
              <span>Browse Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </button>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-black">Featured Projects</h3>
          <button 
            onClick={() => onNavigate('browse')}
            className="text-xs font-bold text-black hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-gray-100 text-black text-[11px] font-mono font-bold px-2.5 py-1 rounded-full">
                  AI & MACHINE LEARNING
                </span>
                <button
                  onClick={() => toggleBookmark('feat-1', 'Real-Time PyTorch Segmentation Engine')}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Bookmark project"
                >
                  <Bookmark className={`w-4 h-4 transition-colors ${
                    bookmarkedProjects.includes('feat-1') ? 'fill-black text-black' : 'text-gray-400 hover:text-black'
                  }`} />
                </button>
              </div>
              <h4 className="font-headline text-lg font-bold text-black mb-1">
                Real-Time PyTorch Segmentation Engine
              </h4>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                YOLOv8 + UNet pipeline with Dockerized AWS ECS deployment, REST APIs, and live bounding-box visualization client.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  OM
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black leading-tight">Om (Lead Architect)</span>
                  <span className="text-[11px] text-gray-500">Tier 3 (MVP) • 2–4 Weeks</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  showToast('Scope selected: Real-Time PyTorch Segmentation Engine', 'info');
                  onNavigate('submit');
                }}
                className="px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-colors"
              >
                Order Scope
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-gray-100 text-black text-[11px] font-mono font-bold px-2.5 py-1 rounded-full">
                  FULL-STACK DEVELOPMENT
                </span>
                <button
                  onClick={() => toggleBookmark('feat-2', 'Multi-Tenant Organization Management Platform')}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Bookmark project"
                >
                  <Bookmark className={`w-4 h-4 transition-colors ${
                    bookmarkedProjects.includes('feat-2') ? 'fill-black text-black' : 'text-gray-400 hover:text-black'
                  }`} />
                </button>
              </div>
              <h4 className="font-headline text-lg font-bold text-black mb-1">
                Multi-Tenant Organization Management Platform
              </h4>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                React 18 + Node.js portal with RBAC security, PostgreSQL database, automated GST invoicing, and Stripe/Razorpay integrations.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center font-bold text-xs">
                  SOM
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-black leading-tight">Somnath & Falguni</span>
                  <span className="text-[11px] text-gray-500">Tier 3 (MVP) • 3 Weeks</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  showToast('Scope selected: Multi-Tenant Management Platform', 'info');
                  onNavigate('submit');
                }}
                className="px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold transition-colors"
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
          <h3 className="font-headline text-2xl font-bold text-black">
            Engineering Service Tiers
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Standardized pricing matrix governed by UGC 2018 Academic Integrity regulations.
          </p>
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
              onClick={() => onNavigate('submit')}
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
              onClick={() => onNavigate('submit')}
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
              onClick={() => onNavigate('submit')}
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
              onClick={() => onNavigate('submit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-bold transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* 15-Step Protocol Card */}
      <section className="bg-gray-100/70 border border-gray-200 rounded-[24px] p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono font-bold text-black uppercase">Engineering Governance</span>
          <h2 className="font-headline text-3xl font-bold text-black mt-1">
            The 15-Step Delivery Protocol
          </h2>
          <p className="text-xs text-gray-600 mt-2">
            Every engagement follows our 5-phase delivery protocol with QA gates, staging preview, and 30-day bug support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Phase I</span>
            <h4 className="text-xs font-bold text-black">Client Onboarding</h4>
            <p className="text-[11px] text-gray-500">Requirement capture, UGC compliance check & discovery.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Phase II</span>
            <h4 className="text-xs font-bold text-black">Contract & Advance</h4>
            <p className="text-[11px] text-gray-500">Scope baseline, GST quotation, SOW sign-off & advance.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Phase III</span>
            <h4 className="text-xs font-bold text-black">Engineering & QA</h4>
            <p className="text-[11px] text-gray-500">Sprint planning, full-stack dev & 48-point QA suite.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Phase IV</span>
            <h4 className="text-xs font-bold text-black">Demo & Payment</h4>
            <p className="text-[11px] text-gray-500">Staging demo walkthrough & final invoice clearance.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">Phase V</span>
            <h4 className="text-xs font-bold text-black">IP Handover</h4>
            <p className="text-[11px] text-gray-500">Git repository transfer & 30-day bug fix support.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
