import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ShieldCheck, X, Lock } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../context/AuthContext';

export type NavTab = 'home' | 'browse' | 'submit' | 'dashboard' | 'admin';

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
  const { isAdmin } = useAuth();

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

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 backdrop-blur-xl transition-all" style={{ background: 'rgba(5, 5, 5, 0.88)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Desktop Nav links */}
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-10 shrink-0">
          <button 
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-sm sm:text-base shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              P
            </div>
            <div>
              <span className="font-headline font-bold text-lg sm:text-2xl text-white tracking-tight group-hover:text-primary-light transition-colors">
                ProjectBridge
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`text-xs lg:text-sm font-semibold transition-all duration-200 pb-1 relative ${
                activeTab === 'dashboard' || activeTab === 'home'
                  ? 'text-white font-bold'
                  : 'text-white/50 hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              Dashboard
              {(activeTab === 'dashboard' || activeTab === 'home') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow animate-scale-in" />
              )}
            </button>
            <button
              onClick={() => onTabChange('browse')}
              className={`text-xs lg:text-sm font-semibold transition-all duration-200 pb-1 relative ${
                activeTab === 'browse'
                  ? 'text-white font-bold'
                  : 'text-white/50 hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              Browse Projects
              {activeTab === 'browse' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow animate-scale-in" />
              )}
            </button>
            <button
              onClick={() => onTabChange('submit')}
              className={`text-xs lg:text-sm font-semibold transition-all duration-200 pb-1 relative ${
                activeTab === 'submit'
                  ? 'text-white font-bold'
                  : 'text-white/50 hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              Submit Requirement
              {activeTab === 'submit' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow animate-scale-in" />
              )}
            </button>
            <button
              onClick={() => onTabChange('admin')}
              className={`text-xs lg:text-sm font-semibold transition-all duration-200 pb-1 relative inline-flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'text-white font-bold'
                  : 'text-white/50 hover:text-white hover:translate-y-[-1px]'
              }`}
            >
              <span>Admin Control</span>
              {!isAdmin && (
                <Lock className="w-3 h-3 text-amber-400/80" />
              )}
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow animate-scale-in" />
              )}
            </button>
          </nav>
        </div>

        {/* Right action items */}
        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 relative">
          {/* Desktop Search */}
          <div className="relative hidden md:block group">
            <Search className="w-4 h-4 text-white/30 group-focus-within:text-primary-light absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKey}
              placeholder="Search projects (Press Enter)..."
              className="pl-9 pr-4 py-2 bg-white/6 border border-white/10 rounded-full text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20 w-48 lg:w-60 focus:w-64 transition-all duration-300"
            />
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/8 rounded-full transition-all active:scale-95 md:hidden"
            title="Search Projects"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-mono font-semibold animate-float">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>100% Quality Verified</span>
          </div>

          {/* Bell Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-1.5 sm:p-2 text-white/50 hover:text-white hover:bg-white/8 rounded-full transition-all active:scale-90 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-radar-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              onNavigate={onTabChange}
            />
          </div>

          {/* Support Chat */}
          <button 
            onClick={onOpenSupport}
            className="p-1.5 sm:p-2 text-white/50 hover:text-white hover:bg-white/8 rounded-full transition-all active:scale-90 hover:text-primary-light"
            title="Chat with Support"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* User Account Google OAuth Menu */}
          <UserMenu onNavigate={onTabChange} />
        </div>
      </div>

      {/* Collapsible Mobile Search Bar Drawer */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-surface border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleMobileSearchSubmit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search AIML, Web, IoT, Pharmacy..."
                className="w-full pl-9 pr-8 py-2.5 bg-white/8 border border-white/15 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-3.5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-glow"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
