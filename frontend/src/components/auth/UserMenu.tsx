import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard, 
  ChevronDown, 
  Sparkles
} from 'lucide-react';

interface UserMenuProps {
  onNavigate: (tab: any) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
  const { 
    user, 
    isAuthenticated, 
    isAdmin, 
    openAuthModal, 
    logout, 
    switchRole 
  } = useAuth();
  
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    showToast('You have been signed out from your Google session.', 'info');
  };

  if (!isAuthenticated || !user) {
    return (
      <button
        type="button"
        onClick={() => openAuthModal({ targetRole: 'user' })}
        className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white rounded-full text-xs sm:text-sm font-semibold shadow-glow transition-all duration-200 transform hover:scale-105 active:scale-95 border border-white/10 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
          <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Sign In</span>
      </button>
    );
  }

  const roleLabel = isAdmin ? 'Admin' : 'Client';
  const roleColor = isAdmin ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-primary/20 text-primary-light border-primary/30';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 sm:pr-3 bg-white/8 hover:bg-white/12 border border-white/10 rounded-full transition-all duration-200 hover:border-primary/40 active:scale-95 text-white text-xs font-semibold cursor-pointer"
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.fullName}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-white/20"
          />
        ) : (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-glow">
            {user.fullName.charAt(0)}
          </div>
        )}

        <span className="max-w-[80px] sm:max-w-[110px] truncate hidden sm:inline">
          {user.fullName}
        </span>

        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${roleColor} hidden md:inline`}>
          {roleLabel}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-surface/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Header */}
          <div className="p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-glow">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-sm text-white truncate">
                    {user.fullName}
                  </h4>
                  {isAdmin && (
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-zinc-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-white/5">
              <span className="text-zinc-400">Account Type:</span>
              <span className={`font-mono font-semibold px-2 py-0.5 rounded ${roleColor}`}>
                {user.role}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2 space-y-1 text-xs">
            <button
              type="button"
              onClick={() => {
                onNavigate('dashboard');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/8 rounded-xl transition-colors text-left cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-primary-light" />
              <span>Client Dashboard Hub</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('admin');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/8 rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Operations & Pipeline</span>
              </div>
              {!isAdmin && (
                <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono">
                  Restricted
                </span>
              )}
            </button>

            {/* Quick Demo Switcher */}
            <div className="pt-2 pb-1 border-t border-white/10 px-3">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider font-mono font-semibold mb-1.5">
                <span>Quick Role Switch</span>
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => switchRole('client')}
                  className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    user.role === 'client'
                      ? 'bg-primary/20 text-primary-light border-primary/40 font-bold'
                      : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('admin_ceo')}
                  className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    isAdmin
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                      : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  Admin CEO
                </button>
              </div>
            </div>

            {/* Sign Out */}
            <div className="pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-left font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
