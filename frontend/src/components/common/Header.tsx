import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, MessageSquare, X, Sun, Moon, Download, Clock, Trash2 } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export type NavTab = 'home' | 'browse' | 'submit' | 'dashboard' | 'admin' | 'download';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSupport?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange, 
  onOpenSupport,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const { isAuthenticated, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Sync internal search value when parent searchQuery updates
  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  // Load search history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pb_search_history');
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    } catch {
      setSearchHistory([]);
    }
  }, []);

  // Close search history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearchQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    try {
      const existing: string[] = JSON.parse(localStorage.getItem('pb_search_history') || '[]');
      const updated = [trimmed, ...existing.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      localStorage.setItem('pb_search_history', JSON.stringify(updated));
      setSearchHistory(updated);
    } catch {
      // ignore storage errors
    }
  };

  const handleClearHistoryItem = (e: React.MouseEvent, itemToClear: string) => {
    e.stopPropagation();
    const updated = searchHistory.filter(item => item !== itemToClear);
    try {
      localStorage.setItem('pb_search_history', JSON.stringify(updated));
    } catch {}
    setSearchHistory(updated);
  };

  const handleClearAllHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.removeItem('pb_search_history');
    } catch {}
    setSearchHistory([]);
  };

  const executeSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    saveSearchQuery(trimmed);
    if (onSearchSubmit) {
      onSearchSubmit(trimmed);
    }
    setSearchValue(''); // Clear search box automatically once search session is completed
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    onTabChange('browse');
  };

  const handleScrollToSection = (sectionId: string) => {
    const scrollToElem = () => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        const yOffset = -85; // Account for sticky navbar height
        const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (activeTab !== 'home') {
      onTabChange('home');
      setTimeout(scrollToElem, 120);
    } else {
      scrollToElem();
    }
  };

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      executeSearch(searchValue);
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      executeSearch(searchValue);
    }
  };

  const handleDownloadClick = () => {
    onTabChange('download');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/80 backdrop-blur-xl transition-all duration-300 shadow-xs bg-white/92 dark:bg-[#121620]/90">
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
          <nav className="hidden lg:flex flex-1 items-center justify-start lg:justify-center gap-3.5 xl:gap-6 px-1 ml-2 sm:ml-4 lg:ml-6 xl:ml-8">
            {/* Common Home Link */}
            <button
              onClick={() => onTabChange('home')}
              className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative cursor-pointer ${
                activeTab === 'home'
                  ? 'text-zinc-900 dark:text-white font-bold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
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
                  className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                  }`}
                >
                  Dashboard
                  {activeTab === 'dashboard' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => onTabChange('browse')}
                  className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'browse'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                  }`}
                >
                  Browse Projects
                  {activeTab === 'browse' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => onTabChange('submit')}
                  className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'submit'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                  }`}
                >
                  Submit Requirement
                  {activeTab === 'submit' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                {/* Admin Controls are hidden when logged in from a client-side account */}
                {isAdmin && (
                  <button
                    onClick={() => onTabChange('admin')}
                    className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative inline-flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'admin'
                        ? 'text-zinc-900 dark:text-white font-bold'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>Admin Control</span>
                    {activeTab === 'admin' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                    )}
                  </button>
                )}
              </>
            ) : (
              /* Public Visitor Navigation Links */
              <>
                <button
                  onClick={() => onTabChange('browse')}
                  className={`text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 pb-1 relative cursor-pointer ${
                    activeTab === 'browse'
                      ? 'text-zinc-900 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200'
                  }`}
                >
                  Explore Projects
                  {activeTab === 'browse' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white rounded-full animate-scale-in" />
                  )}
                </button>
                <button
                  onClick={() => handleScrollToSection('categories-section')}
                  className="text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200 transition-all duration-200 pb-1 cursor-pointer"
                >
                  Categories
                </button>
                <button
                  onClick={() => handleScrollToSection('services-tiers-section')}
                  className="text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200 transition-all duration-200 pb-1 cursor-pointer"
                >
                  Services &amp; Tiers
                </button>
                <button
                  onClick={() => handleScrollToSection('protocol-section')}
                  className="text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200 transition-all duration-200 pb-1 cursor-pointer"
                >
                  Delivery Protocol
                </button>
                <button
                  onClick={() => handleScrollToSection('reviews-section')}
                  className="text-[12px] xl:text-[13px] font-semibold tracking-tight whitespace-nowrap text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-slate-200 transition-all duration-200 pb-1 cursor-pointer"
                >
                  Reviews
                </button>
              </>
            )}
          </nav>

          {/* Right action items */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Desktop Search Box with Clear Button & Search History */}
            <div className="relative hidden md:block group" ref={searchContainerRef}>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-100 absolute left-3 pointer-events-none z-10" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search projects..."
                  className={`pl-9 ${searchValue ? 'pr-8' : 'pr-3'} py-1.5 sm:py-2 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-400 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-800/10 dark:focus:ring-zinc-200/10 w-24 sm:w-32 lg:w-36 xl:w-44 focus:w-36 xl:focus:w-48 transition-all duration-300`}
                />
                {/* Clear (cross) button */}
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5 rounded-full transition-colors z-10 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search History Dropdown */}
              {isSearchFocused && searchHistory.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-top-1 duration-150 min-w-[200px]">
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={handleClearAllHistory}
                      className="text-[10px] text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="py-1">
                    {searchHistory.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => executeSearch(item)}
                        className="flex items-center justify-between px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer group/item"
                      >
                        <span className="truncate pr-2">{item}</span>
                        <button
                          type="button"
                          onClick={(e) => handleClearHistoryItem(e, item)}
                          className="opacity-0 group-hover/item:opacity-100 p-0.5 text-zinc-400 hover:text-red-500 transition-opacity"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Download Here Button for Desktop */}
            <button
              onClick={handleDownloadClick}
              className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 group cursor-pointer shrink-0"
              title="Download Here"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>Download Here</span>
            </button>

            {/* Mobile Download Here Icon Button */}
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

            {/* Bell Notifications (Authenticated Users Only) */}
            {isAuthenticated && (
              <div className="relative shrink-0">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-1.5 sm:p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all active:scale-90 relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  placeholder="Search AIML, Web, IoT, Pharmacy..."
                  className="w-full pl-10 pr-8 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-400"
                />
                {searchValue && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
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

