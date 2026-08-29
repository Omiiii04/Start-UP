import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header, NavTab } from './components/common/Header';
import { BrowseProjects, ProjectItem } from './features/browse/BrowseProjects';
import { IntakeWizard } from './features/intake/IntakeWizard';
import { ClientProjectHub } from './features/dashboard/ClientProjectHub';
import { OperationsDashboard } from './features/operations/OperationsDashboard';
import { EngineeringPipeline } from './features/engineering/EngineeringPipeline';
import { ToastProvider } from './components/common/Toast';
import { SupportChatDrawer } from './components/common/SupportChatDrawer';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { AdminGuard } from './components/auth/AdminGuard';
import { Home, Compass, ClipboardList, Lock, User } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectItem | null>(null);
  const { isAdmin } = useAuth();

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab('browse');
  };

  const handleSelectTemplate = (template: ProjectItem) => {
    setSelectedTemplate(template);
    setActiveTab('submit');
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col font-body selection:bg-primary selection:text-white pb-20 md:pb-0">
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
          <AdminGuard onNavigateToDashboard={() => setActiveTab('dashboard')}>
            <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
              <OperationsDashboard />
              <div className="border-t border-white/10 pt-8">
                <EngineeringPipeline />
              </div>
            </div>
          </AdminGuard>
        )}
      </main>

      {/* Google Authentication Modal */}
      <GoogleAuthModal onNavigate={setActiveTab} />

      {/* Support Chat Modal / Drawer */}
      <SupportChatDrawer
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Modern Clean Footer (Desktop & Tablet) */}
      <footer className="border-t border-white/8 bg-surface py-8 px-4 sm:px-6 mt-16 text-xs text-zinc-400 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center font-bold text-xs shadow-glow">
              P
            </div>
            <span className="font-headline font-bold text-white text-sm">ProjectBridge</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Enterprise Quality Assurance & 15-Step Delivery Protocol</span>
          </div>

          <div className="flex flex-wrap gap-6 text-zinc-400 font-medium">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Dashboard Hub</button>
            <button onClick={() => setActiveTab('browse')} className="hover:text-white transition-colors">Browse Projects</button>
            <button onClick={() => setActiveTab('submit')} className="hover:text-white transition-colors">Submit Requirement</button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors">Admin Control</button>
          </div>

          <p className="font-mono text-[11px] text-zinc-500">
            © 2026 ProjectBridge. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only with Glassmorphism) */}
      <nav className="fixed bottom-0 left-0 right-0 w-full flex justify-around items-center px-2 py-1.5 md:hidden bg-surface/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.85)] z-40 border-t border-white/10 safe-area-bottom">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'dashboard' || activeTab === 'home'
              ? 'text-primary-light font-bold bg-white/5'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'dashboard' || activeTab === 'home' ? 'text-primary-light' : ''}`} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('browse')}
          className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'browse'
              ? 'text-white font-bold bg-primary shadow-glow'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Browse</span>
        </button>

        <button
          onClick={() => setActiveTab('submit')}
          className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'submit'
              ? 'text-primary-light font-bold bg-white/5'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ClipboardList className={`w-5 h-5 mb-0.5 ${activeTab === 'submit' ? 'text-primary-light' : ''}`} />
          <span className="text-[10px] font-medium">Submit</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center justify-center min-w-[64px] py-1 px-2 rounded-xl transition-all relative ${
            activeTab === 'admin'
              ? 'text-primary-light font-bold bg-white/5'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {isAdmin ? (
            <User className={`w-5 h-5 mb-0.5 ${activeTab === 'admin' ? 'text-primary-light' : ''}`} />
          ) : (
            <Lock className={`w-5 h-5 mb-0.5 ${activeTab === 'admin' ? 'text-primary-light' : 'text-amber-400/80'}`} />
          )}
          <span className="text-[10px] font-medium">Admin</span>
        </button>
      </nav>
    </div>
  );
};

export const App: React.FC = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'projectbridge-sandbox-auth.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

