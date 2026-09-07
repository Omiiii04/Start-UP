import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ShieldCheck, X, Lock, Sun, Moon, Download } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export type NavTab = 'home' | 'browse' | 'submit' | 'dashboard' | 'admin' | 'download';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSupport?: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  onOpenSupport,
  onSearchSubmit
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleScrollToSection = (sectionId: string) => {
    if (activeTab !== 'home') {
      onTabChange('home');
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchValue.trim());
      }
      setIsMobileSearchOpen(false);
      onTabChange('browse');
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchValue.trim());
      }
      setIsMobileSearchOpen(false);
      onTabChange('browse');
    }
  };

  const handleDownloadClick = () => {
    // Route to the "Download Here" work-in-progress page instead of an external app store
    onTabChange('download');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 backdrop-blur-xl transition-all duration-300 shadow-sm bg-white/92 dark:bg-zinc-950/92">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => onTabChange(isAuthenticated ? 'dashboard' : 'home')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-extrabold text-sm sm:text-base shadow-sm group-hover:scale-105 transition-all duration-300">
                P
              </div>
              <div>
                <span className="font-headline font-bold text-lg sm:text-2xl text-zinc-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  ProjectBridge
                </span>
              </div>
            </button>
          </div>

          {/* Centered Desktop Nav links (Public vs Authenticated) */}
          <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-6 px-2">
            {/* Common Home Link */}
            <button
              onClick={() => onTabChange('home')}
              className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative cursor-pointer ${
                activeTab === 'home'
                  ? 'text-zinc-900 dark:text-white font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
              )}
            </button>

            {isAuthenticated ? (
              /* Authenticated User Access Routing */
              <>
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  Dashboard
                  {activeTab === 'dashboard' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => onTabChange('browse')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'browse'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  Browse Projects
                  {activeTab === 'browse' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => onTabChange('submit')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'submit'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  Submit Requirement
                  {activeTab === 'submit' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => onTabChange('admin')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative inline-flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'admin'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  <span>Admin Control</span>
                  {!isAdmin && (
                    <Lock className="w-3 h-3 text-amber-500" />
                  )}
                  {activeTab === 'admin' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
              </>
            ) : (
              /* Public Visitor Navigation Links */
              <>
                <button
                  onClick={() => onTabChange('browse')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'browse'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  Explore Projects
                  {activeTab === 'browse' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => handleScrollToSection('categories-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px] transition-all duration-200 pb-1 cursor-pointer"
                >
                  Categories
                </button>
                <button
                  onClick={() => handleScrollToSection('services-tiers-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px] transition-all duration-200 pb-1 cursor-pointer"
                >
                  Services &amp; Tiers
                </button>
                <button
                  onClick={() => handleScrollToSection('protocol-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px] transition-all duration-200 pb-1 cursor-pointer"
                >
                  Delivery Protocol
                </button>
                <button
                  onClick={() => handleScrollToSection('reviews-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px] transition-all duration-200 pb-1 cursor-pointer"
                >
                  Reviews
                </button>
              </>
            )}
          </nav>

          {/* Right action items */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Desktop Search with Guaranteed No Overlap */}
            <div className="relative hidden md:block group">
              <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none z-10" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search projects..."
                className="pl-9 pr-3 py-1.5 sm:py-2 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-800/10 dark:focus:ring-zinc-200/10 w-28 sm:w-36 lg:w-44 xl:w-52 focus:w-44 xl:focus:w-56 transition-all duration-300"
              />
            </div>

            {/* Download Here Button for Desktop - routes to work-in-progress page */}
            <button
              onClick={handleDownloadClick}
              className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 group cursor-pointer shrink-0"
              title="Download Here"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Download Here</span>
            </button>

            {/* Mobile Download Here Icon Button - routes to work-in-progress page */}
            <button
              type="button"
              onClick={handleDownloadClick}
              className="p-2 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all active:scale-95 sm:hidden flex items-center justify-center relative cursor-pointer shrink-0"
              title="Download Here"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Day / Night Theme Shift Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all duration-300 active:scale-90 relative cursor-pointer shrink-0 shadow-xs"
              title={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
              aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-zinc-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-95 md:hidden cursor-pointer shrink-0"
              title="Search Projects"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
              <span>100% Quality Verified</span>
            </div>

            {/* Bell Notifications (Authenticated Users Only) */}
            {isAuthenticated && (
              <div className="relative shrink-0">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-1.5 sm:p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rounded-full animate-radar-ping"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rounded-full"></span>
                </button>

                <NotificationDropdown
                  isOpen={isNotifOpen}
                  onClose={() => setIsNotifOpen(false)}
                  onNavigate={onTabChange}
                />
              </div>
            )}

            {/* Support Chat (Authenticated Users Only) */}
            {isAuthenticated && (
              <button 
                onClick={onOpenSupport}
                className="p-1.5 sm:p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 cursor-pointer shrink-0"
                title="Chat with Support"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* User Account Google OAuth Menu */}
            <UserMenu onNavigate={onTabChange} />
          </div>
        </div>

        {/* Collapsible Mobile Search Bar Drawer */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleMobileSearchSubmit} className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                <input
                  type="text"
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search AIML, Web, IoT, Pharmacy..."
                  className="w-full pl-10 pr-8 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-400"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={() => setSearchValue('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 z-10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-3.5 py-2.5 bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
};

