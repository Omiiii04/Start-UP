import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header, NavTab } from './components/common/Header';
import { LandingPage } from './features/home/LandingPage';
import { BrowseProjects, ProjectItem } from './features/browse/BrowseProjects';
import { IntakeWizard } from './features/intake/IntakeWizard';
import { ClientProjectHub } from './features/dashboard/ClientProjectHub';
import { OperationsDashboard } from './features/operations/OperationsDashboard';
import { EngineeringPipeline } from './features/engineering/EngineeringPipeline';
import { ToastProvider } from './components/common/Toast';
import { SupportChatDrawer } from './components/common/SupportChatDrawer';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { AdminGuard } from './components/auth/AdminGuard';
import { ScrollMotionBackground } from './components/common/ScrollMotionBackground';
import { WorkInProgress } from './features/download/WorkInProgress';
import { Home, Compass, ClipboardList, User, LayoutDashboard, LogIn, Download } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectItem | null>(null);
  const { isAuthenticated, isAdmin, openAuthModal } = useAuth();

  // If user logs out while on a protected tab, reset back to public landing page
  useEffect(() => {
    if (!isAuthenticated && (activeTab === 'dashboard' || activeTab === 'submit' || activeTab === 'admin')) {
      setActiveTab('home');
    }
  }, [isAuthenticated, activeTab]);

  const handleTabChange = (tab: NavTab) => {
    // Gate user-access routing behind OAuth authentication
    if (tab === 'dashboard' && !isAuthenticated) {
      openAuthModal({
        targetRole: 'user',
        message: 'Please sign in with Google to access your ProjectBridge Client Dashboard.',
        onSuccessRedirectTab: 'dashboard'
      });
      return;
    }

    if (tab === 'submit' && !isAuthenticated) {
      openAuthModal({
        targetRole: 'user',
        message: 'Please sign in with Google to submit custom project requirements.',
        onSuccessRedirectTab: 'submit'
      });
      return;
    }

    if (tab === 'admin' && !isAuthenticated) {
      openAuthModal({
        targetRole: 'admin',
        message: 'Please sign in with your authorized Google Admin account.',
        onSuccessRedirectTab: 'admin'
      });
      return;
    }

    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab('browse');
  };

  const handleSelectTemplate = (template: ProjectItem) => {
    setSelectedTemplate(template);
    if (!isAuthenticated) {
      openAuthModal({
        targetRole: 'user',
        message: `Please sign in with Google to order or customize "${template.title}".`,
        onSuccessRedirectTab: 'submit'
      });
    } else {
      setActiveTab('submit');
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-900 dark:text-zinc-100 flex flex-col font-body selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 pb-20 md:pb-0 relative transition-colors duration-300">
      {/* Dynamic Framer Motion Scroll Synced Background */}
      <ScrollMotionBackground enableInteractiveGlow={true} />

      {/* Top ProjectBridge Navigation Header */}
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onOpenSupport={() => setIsSupportOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <LandingPage 
            onNavigate={handleTabChange}
            onSelectTemplate={handleSelectTemplate}
            onOpenSupport={() => setIsSupportOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && isAuthenticated && (
          <ClientProjectHub 
            onNavigate={handleTabChange} 
            onOpenSupport={() => setIsSupportOpen(true)}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {activeTab === 'browse' && (
          <BrowseProjects 
            onNavigate={handleTabChange} 
            initialSearch={searchQuery}
            onSearchChange={handleSearchChange}
            onSelectProject={handleSelectTemplate}
          />
        )}

        {activeTab === 'submit' && isAuthenticated && (
          <IntakeWizard 
            onNavigate={handleTabChange} 
            onOpenSupport={() => setIsSupportOpen(true)}
            selectedTemplate={selectedTemplate}
          />
        )}

        {activeTab === 'admin' && (
          <AdminGuard onNavigateToDashboard={() => setActiveTab('dashboard')}>
            <div className="space-y-8 sm:space-y-12 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
              <OperationsDashboard />
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <EngineeringPipeline />
              </div>
            </div>
          </AdminGuard>
        )}

        {activeTab === 'download' && (
          <WorkInProgress onNavigate={handleTabChange} />
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
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md py-8 px-4 sm:px-6 mt-16 text-xs text-zinc-500 dark:text-zinc-400 hidden md:block relative z-10 transition-colors">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-headline font-bold text-zinc-900 dark:text-white text-sm">ProjectBridge</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">Enterprise Quality Assurance &amp; 15-Step Delivery Protocol</span>
          </div>

          <div className="flex flex-wrap gap-6 text-zinc-500 dark:text-zinc-400 font-medium">
            <button onClick={() => handleTabChange('home')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Home</button>
            <button onClick={() => handleTabChange('browse')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Browse Projects</button>
            {isAuthenticated ? (
              <>
                <button onClick={() => handleTabChange('dashboard')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Dashboard Hub</button>
                <button onClick={() => handleTabChange('submit')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Submit Requirement</button>
                <button onClick={() => handleTabChange('admin')} className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">Admin Control</button>
              </>
            ) : (
              <button 
                onClick={() => openAuthModal({ targetRole: 'user', message: 'Sign in to access your ProjectBridge client workspace.' })} 
                className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Sign In / Client Portal
              </button>
            )}
          </div>

          <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
            © 2026 ProjectBridge. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only with glassmorphism) */}
      <nav className="fixed bottom-0 left-0 right-0 w-full flex justify-around items-center px-2 py-1.5 md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] z-40 border-t border-zinc-200 dark:border-zinc-800 safe-area-bottom transition-colors">
        {/* Home Tab */}
        <button
          onClick={() => handleTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800'
              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'text-zinc-900 dark:text-white' : ''}`} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Browse Projects Tab */}
        <button
          onClick={() => handleTabChange('browse')}
          className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
            activeTab === 'browse'
              ? 'text-white dark:text-zinc-900 font-bold bg-zinc-900 dark:bg-zinc-100'
              : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium">Browse</span>
        </button>

        {isAuthenticated ? (
          /* Authenticated User Mobile Tabs */
          <>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
                activeTab === 'dashboard'
                  ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 mb-0.5 ${activeTab === 'dashboard' ? 'text-zinc-900 dark:text-white' : ''}`} />
              <span className="text-[10px] font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => handleTabChange('submit')}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
                activeTab === 'submit'
                  ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <ClipboardList className={`w-5 h-5 mb-0.5 ${activeTab === 'submit' ? 'text-zinc-900 dark:text-white' : ''}`} />
              <span className="text-[10px] font-medium">Submit</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => handleTabChange('admin')}
                className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all relative ${
                  activeTab === 'admin'
                    ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <User className={`w-5 h-5 mb-0.5 ${activeTab === 'admin' ? 'text-zinc-900 dark:text-white' : ''}`} />
                <span className="text-[10px] font-medium">Admin</span>
              </button>
            )}
          </>
        ) : (
          /* Public Visitor Mobile Tabs */
          <>
            <button
              onClick={() => handleTabChange('download')}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all ${
                activeTab === 'download'
                  ? 'text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Download className={`w-5 h-5 mb-0.5 ${activeTab === 'download' ? 'text-zinc-900 dark:text-white' : ''}`} />
              <span className="text-[10px] font-medium">Download Here</span>
            </button>

            <button
              onClick={() => openAuthModal({ targetRole: 'user', message: 'Sign in with Google to access your student project dashboard.' })}
              className="flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all text-zinc-900 dark:text-white font-bold bg-zinc-100 dark:bg-zinc-800"
            >
              <LogIn className="w-5 h-5 mb-0.5 text-zinc-900 dark:text-white" />
              <span className="text-[10px] font-medium">Sign In</span>
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export const App: React.FC = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'projectbridge-sandbox-auth.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

