import React, { useState } from 'react';
import { Header, NavTab } from './components/common/Header';
import { BrowseProjects, ProjectItem } from './features/browse/BrowseProjects';
import { IntakeWizard } from './features/intake/IntakeWizard';
import { ClientProjectHub } from './features/dashboard/ClientProjectHub';
import { OperationsDashboard } from './features/operations/OperationsDashboard';
import { EngineeringPipeline } from './features/engineering/EngineeringPipeline';
import { ToastProvider } from './components/common/Toast';
import { SupportChatDrawer } from './components/common/SupportChatDrawer';
import { Home, Compass, ClipboardList, User } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectItem | null>(null);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab('browse');
  };

  const handleSelectTemplate = (template: ProjectItem) => {
    setSelectedTemplate(template);
    setActiveTab('submit');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-body selection:bg-black selection:text-white pb-16 md:pb-0">
      {/* Top ProjectBridge Navigation Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onOpenSupport={() => setIsSupportOpen(true)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {(activeTab === 'home' || activeTab === 'dashboard') && (
          <ClientProjectHub 
            onNavigate={setActiveTab} 
            onOpenSupport={() => setIsSupportOpen(true)}
            onSelectTemplate={handleSelectTemplate}
          />
        )}
        {activeTab === 'browse' && (
          <BrowseProjects 
            onNavigate={setActiveTab} 
            initialSearch={searchQuery}
            onSelectProject={handleSelectTemplate}
          />
        )}
        {activeTab === 'submit' && (
          <IntakeWizard 
            onNavigate={setActiveTab} 
            onOpenSupport={() => setIsSupportOpen(true)}
            selectedTemplate={selectedTemplate}
          />
        )}
        {activeTab === 'admin' && (
          <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
            <OperationsDashboard />
            <div className="border-t border-slate-200 pt-8">
              <EngineeringPipeline />
            </div>
          </div>
        )}
      </main>

      {/* Support Chat Modal / Drawer */}
      <SupportChatDrawer
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Modern Clean Footer (Desktop & Tablet) */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4 sm:px-6 mt-16 text-xs text-gray-500 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-headline font-bold text-black text-sm">ProjectBridge</span>
            <span className="text-gray-300">•</span>
            <span>UGC 2018 Academic Integrity & 15-Step Delivery Protocol</span>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-600 font-medium">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-black transition-colors">Dashboard Hub</button>
            <button onClick={() => setActiveTab('browse')} className="hover:text-black transition-colors">Browse Projects</button>
            <button onClick={() => setActiveTab('submit')} className="hover:text-black transition-colors">Submit Requirement</button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-black transition-colors">Admin Control</button>
          </div>

          <p className="font-mono text-[11px] text-gray-400">
            © 2026 ProjectBridge. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-2 md:hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30 border-t border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all ${
            activeTab === 'dashboard' || activeTab === 'home' ? 'text-black font-bold' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all ${
            activeTab === 'browse' ? 'bg-black text-white px-5 font-bold shadow-sm' : 'text-gray-500'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Browse</span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all ${
            activeTab === 'submit' ? 'text-black font-bold' : 'text-gray-500'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Submit</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all ${
            activeTab === 'admin' ? 'text-black font-bold' : 'text-gray-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Admin</span>
        </button>
      </nav>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;
