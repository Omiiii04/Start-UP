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
        className="shrink-0 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900 hover:bg-black text-white rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
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
  const roleColor = isAdmin ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-zinc-100 text-zinc-700 border-zinc-200';

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="shrink-0 flex items-center gap-1.5 sm:gap-2 p-1 pl-1.5 pr-2.5 sm:pr-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full transition-all duration-200 active:scale-95 text-zinc-900 text-xs font-semibold cursor-pointer"
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.fullName}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-zinc-300 shrink-0"
          />
        ) : (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {user.fullName.charAt(0)}
          </div>
        )}

        <span className="max-w-[70px] sm:max-w-[100px] xl:max-w-[130px] truncate hidden sm:inline">
          {user.fullName}
        </span>

        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${roleColor} hidden xl:inline`}>
          {roleLabel}
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-zinc-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Header */}
          <div className="p-4 border-b border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-200 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-sm text-zinc-900 truncate">
                    {user.fullName}
                  </h4>
                  {isAdmin && (
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-zinc-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-zinc-200">
              <span className="text-zinc-500">Account Type:</span>
              <span className={`font-mono font-semibold px-2 py-0.5 rounded border ${roleColor}`}>
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
              className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors text-left cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-500" />
              <span>Client Dashboard Hub</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate('admin');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Admin Operations & Pipeline</span>
              </div>
              {!isAdmin && (
                <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-mono border border-red-200">
                  Restricted
                </span>
              )}
            </button>

            {/* Quick Demo Switcher */}
            <div className="pt-2 pb-1 border-t border-zinc-100 px-3">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-semibold mb-1.5">
                <span>Quick Role Switch</span>
                <Sparkles className="w-3 h-3 text-zinc-500" />
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => switchRole('client')}
                  className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    user.role === 'client'
                      ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => switchRole('admin_ceo')}
                  className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    isAdmin
                      ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  Admin CEO
                </button>
              </div>
            </div>

            {/* Sign Out */}
            <div className="pt-1 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors text-left font-medium cursor-pointer"
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
