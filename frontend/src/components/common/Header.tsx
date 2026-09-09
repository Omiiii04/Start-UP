import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ShieldCheck, 
  X, 
  Lock, 
  Sun, 
  Moon, 
  Download, 
  Menu, 
  Home, 
  Compass, 
  Flame, 
  Layers, 
  Zap, 
  Star, 
  LayoutDashboard, 
  ClipboardList, 
  Laptop, 
  ChevronRight
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export type NavTab = 'home' | 'browse' | 'submit' | 'dashboard' | 'admin' | 'download' | 'reviews' | 'bestseller';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, openAuthModal } = useAuth();
  const { isDark, isSystem, toggleTheme, setTheme } = useTheme();

  // Prevent background scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleScrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (activeTab !== 'home') {
      onTabChange('home');
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
      <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 backdrop-blur-xl transition-all duration-300 shadow-sm bg-white/92 dark:bg-zinc-950/40 dark:backdrop-blur-2xl">
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
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
                <span className="font-headline font-bold text-sm sm:text-2xl text-zinc-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-zinc-100 transition-colors">
                  Project Wallah
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
                  onClick={() => onTabChange('bestseller')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'bestseller'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Best Selling</span>
                  {activeTab === 'bestseller' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => handleScrollToSection('categories-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 pb-1 cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Categories</span>
                </button>
                <button
                  onClick={() => handleScrollToSection('services-tiers-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 pb-1 cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant Services</span>
                </button>
                <button
                  onClick={() => handleScrollToSection('protocol-section')}
                  className="text-xs xl:text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 pb-1 cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>15-Step Protocol</span>
                </button>
                <button
                  onClick={() => onTabChange('reviews')}
                  className={`text-xs xl:text-sm font-semibold transition-all duration-200 pb-1 relative flex items-center gap-1 cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:translate-y-[-1px]'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Reviews</span>
                  {activeTab === 'reviews' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
              </>
            )}
          </nav>

          {/* Right action items */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
            {/* Desktop Search with Guaranteed No Overlap */}
            <div className="relative hidden md:block group">
              <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none z-10" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Search projects..."
                className="pl-9 pr-3 py-1.5 sm:py-2 bg-zinc-100 dark:bg-zinc-900/40 dark:backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-full text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-800 dark:focus:border-white/30 focus:bg-white dark:focus:bg-zinc-900/70 focus:ring-2 focus:ring-zinc-800/10 dark:focus:ring-white/10 w-28 sm:w-36 lg:w-44 xl:w-52 focus:w-44 xl:focus:w-56 transition-all duration-300"
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
              className="p-1.5 sm:p-2 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all active:scale-95 sm:hidden flex items-center justify-center relative cursor-pointer shrink-0"
              title="Download Here"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Day / Night Theme Shift Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all duration-300 active:scale-90 relative cursor-pointer shrink-0 shadow-xs"
              title={
                isSystem 
                  ? `Theme: Device Auto (${isDark ? 'Night' : 'Day'}) - Click to switch` 
                  : isDark 
                    ? "Theme: Night Mode - Click to switch" 
                    : "Theme: Day Mode - Click to switch"
              }
              aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-zinc-700 hover:-rotate-12 transition-transform duration-300" />
              )}
              {isSystem && (
                <span 
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-zinc-900" 
                  title="Aligned with device theme" 
                />
              )}
            </button>

            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-1.5 sm:p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-95 md:hidden cursor-pointer shrink-0"
              title="Search Projects"
            >
              <Search className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
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

            {/* Mobile Navigation Drawer Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 sm:p-2 text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all active:scale-95 lg:hidden cursor-pointer shrink-0"
              title={isMobileMenuOpen ? "Close Menu" : "Open Navigation Menu"}
              aria-label="Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900 dark:text-white" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navbar Strip - Centrally aligned with smooth scrolling */}
        <nav 
          aria-label="Mobile Navigation Bar" 
          className="lg:hidden w-full border-t border-zinc-200/80 dark:border-white/10 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-xl py-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="flex items-center gap-1.5 px-3 min-w-max mx-auto justify-center">
          {/* Common Home Link */}
          <button
            onClick={() => onTabChange('home')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          {isAuthenticated ? (
            /* Authenticated User Mobile Links */
            <>
              <button
                onClick={() => onTabChange('dashboard')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => onTabChange('browse')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Browse Projects</span>
              </button>

              <button
                onClick={() => onTabChange('submit')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'submit'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Submit Req</span>
              </button>

              <button
                onClick={() => onTabChange('admin')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Admin Control</span>
              </button>
            </>
          ) : (
            /* Public Visitor Mobile Links */
            <>
              <button
                onClick={() => onTabChange('browse')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore Projects</span>
              </button>

              <button
                onClick={() => onTabChange('bestseller')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'bestseller'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Best Selling</span>
              </button>

              <button
                onClick={() => handleScrollToSection('categories-section')}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Categories</span>
              </button>

              <button
                onClick={() => handleScrollToSection('services-tiers-section')}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Services</span>
              </button>

              <button
                onClick={() => handleScrollToSection('protocol-section')}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Delivery Protocol</span>
              </button>

              <button
                onClick={() => onTabChange('reviews')}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Reviews</span>
              </button>
            </>
          )}
          </div>
        </nav>

        {/* Collapsible Mobile Search Bar Drawer */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-3 sm:px-4 py-3 bg-white dark:bg-zinc-950/70 dark:backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleMobileSearchSubmit} className="relative flex items-center justify-center gap-2 max-w-lg mx-auto">
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

      {/* Full Mobile Navigation Menu Drawer / Sheet (Mounted at document.body via Portal to prevent backdrop-filter containment bugs) */}
      {typeof document !== 'undefined' && isMobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col justify-start animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <div 
            className="w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 max-h-[85vh] overflow-y-auto smooth-touch-scroll p-4 sm:p-6 space-y-5 shadow-2xl animate-in slide-in-from-top-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header inside drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold text-sm shadow-xs">
                  P
                </div>
                <div>
                  <span className="font-headline font-bold text-base text-zinc-900 dark:text-white block leading-tight">
                    Project Wallah
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                    Navigation Menu
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Close Navigation Menu"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Theme Alignment Selector */}
            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Display Theme</span>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  {isSystem ? 'Auto (Device Aligned)' : isDark ? 'Night Mode' : 'Day Mode'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setTheme('system')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSystem
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Auto</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isSystem && !isDark
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Day</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isSystem && isDark
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                      : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Night</span>
                </button>
              </div>
            </div>

            {/* Navigation Links List */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  onTabChange('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onTabChange('browse');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'browse'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span>Explore 200+ Projects</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onTabChange('bestseller');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'bestseller'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Best Selling Projects</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold">
                  Hot
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('categories-section')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  <span>Project Categories</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('services-tiers-section')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Services (24h/48h)</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('protocol-section')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>15-Step Delivery Protocol</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onTabChange('reviews');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Student Reviews (1,000+)</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              {isAuthenticated ? (
                <>
                  <div className="pt-2 pb-1 border-t border-zinc-200/60 dark:border-zinc-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2.5">
                      Client Workspace
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onTabChange('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === 'dashboard'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Client Dashboard</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onTabChange('submit');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === 'submit'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ClipboardList className="w-4 h-4" />
                      <span>Submit Project Requirement</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onTabChange('admin');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      activeTab === 'admin'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Lock className="w-4 h-4 text-amber-500" />
                      <span>Admin Control Hub</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                </>
              ) : (
                <div className="pt-2 pb-1 border-t border-zinc-200/60 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal({ 
                        targetRole: 'user', 
                        message: 'Sign in with Google to access your Project Wallah client workspace and track orders.' 
                      });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold">Sign In with Google</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2 pb-4">
              <button
                type="button"
                onClick={() => {
                  handleDownloadClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-zinc-200 dark:border-zinc-800"
              >
                <Download className="w-4 h-4" />
                <span>Download Project Wallah App</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

