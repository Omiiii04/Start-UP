import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

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

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchValue.trim());
      }
      onTabChange('browse');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand & Nav links */}
        <div className="flex items-center gap-10">
          <button 
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div>
              <span className="font-headline font-bold text-2xl text-black tracking-tight">
                ProjectBridge
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`text-sm font-semibold transition-all pb-1 ${
                activeTab === 'dashboard' || activeTab === 'home'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('browse')}
              className={`text-sm font-semibold transition-all pb-1 ${
                activeTab === 'browse'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Browse Projects
            </button>
            <button
              onClick={() => onTabChange('submit')}
              className={`text-sm font-semibold transition-all pb-1 ${
                activeTab === 'submit'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Submit Requirement
            </button>
            <button
              onClick={() => onTabChange('admin')}
              className={`text-sm font-semibold transition-all pb-1 ${
                activeTab === 'admin'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Admin Control
            </button>
          </nav>
        </div>

        {/* Right action items */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKey}
              placeholder="Search projects (Press Enter)..."
              className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs text-black focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black w-60 transition-all"
            />
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-black text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>UGC 2018 Verified</span>
          </div>

          {/* Bell Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full animate-pulse"></span>
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
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            title="Chat with Support"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* User Account */}
          <button 
            onClick={() => onTabChange('dashboard')}
            className="flex items-center gap-2 p-1.5 pl-2.5 pr-3.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-black text-xs font-semibold"
          >
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:inline">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};
