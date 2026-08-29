import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ShieldAlert, Lock, LogIn, ArrowLeft, KeyRound, Shield } from 'lucide-react';
import { UserRole } from '../../types';

interface AdminGuardProps {
  children: React.ReactNode;
  onNavigateToDashboard: () => void;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children, onNavigateToDashboard }) => {
  const { user, isAuthenticated, isAdmin, openAuthModal, toggleAdminElevation, switchRole } = useAuth();

  // If fully authenticated as Admin
  if (isAuthenticated && isAdmin && user) {
    const roleTitles: Record<UserRole, string> = {
      'client': 'Client Account',
      'admin_ceo': 'Lead Architect & AI Systems (Om)',
      'admin_backend': 'Backend & Cloud Infrastructure (Somnath)',
      'admin_qa': 'Frontend & Quality Assurance (Falguni)',
      'admin_ops': 'Operations & Finance (Divya)'
    };

    return (
      <div className="space-y-6">
        {/* Admin Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4">
          <div className="bg-gradient-to-r from-amber-500/10 via-surface to-amber-500/5 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.fullName} 
                  className="w-11 h-11 rounded-full border-2 border-amber-400/80 object-cover shadow-glow"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-bold text-base shadow-glow">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-headline font-bold text-white text-base sm:text-lg">
                    {user.fullName}
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    Admin Authorized
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  {user.email} • <span className="text-amber-300/90 font-medium">{roleTitles[user.role] || user.role}</span>
                </p>
              </div>
            </div>

            {/* Quick Admin Role Switching */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-zinc-400 font-medium hidden lg:inline">Active Persona:</span>
              <select
                value={user.role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="bg-black/60 border border-amber-500/30 text-amber-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="admin_ceo">Om (Lead Architect)</option>
                <option value="admin_backend">Somnath (Backend Lead)</option>
                <option value="admin_ops">Divya (Operations Lead)</option>
                <option value="admin_qa">Falguni (QA & UI)</option>
              </select>

              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Client Hub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Protected Admin Content */}
        {children}
      </div>
    );
  }

  // If Authenticated as a non-admin client
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="relative bg-surface/90 border border-red-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500" />
          
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Lock className="w-8 h-8" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            Restricted Admin Portal
          </span>

          <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white tracking-tight mb-3">
            Admin Authentication Required
          </h2>

          <p className="text-sm text-zinc-300 max-w-lg mx-auto mb-6">
            You are signed in as <strong className="text-white">{user?.email}</strong> (Client Role). 
            Access to Operations Dashboard, CRM pipelines, financial milestones, and Engineering management is restricted to authorized ProjectBridge team members.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => openAuthModal({ targetRole: 'admin', message: 'Sign in with an authorized Google Admin email.' })}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign in with Google Admin</span>
            </button>

            <button
              type="button"
              onClick={toggleAdminElevation}
              className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-zinc-200 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Elevate to Admin (Demo)</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="w-full sm:w-auto px-5 py-3 text-zinc-400 hover:text-white font-medium text-sm transition-colors"
            >
              Return to Dashboard
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>Authorized core team emails:</span>
            <span className="font-mono text-zinc-300">om@, somnath@, divya@, falguni@projectbridge.io</span>
          </div>
        </div>
      </div>
    );
  }

  // If Not Authenticated at all
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="relative bg-surface/90 border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary-light border border-primary/30 flex items-center justify-center mx-auto mb-6 shadow-glow">
          <Shield className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/15 text-primary border border-primary/30 mb-4">
          <KeyRound className="w-3.5 h-3.5" />
          Single Sign-On Security
        </span>

        <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-white tracking-tight mb-3">
          Admin Portal Authentication
        </h2>

        <p className="text-sm text-zinc-300 max-w-lg mx-auto mb-8">
          Please authenticate with your authorized Google OAuth account to access internal Operations Management, UGC Compliance screening, and Engineering Pipelines.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openAuthModal({ targetRole: 'admin', message: 'Authenticate to access Admin Portal.' })}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm shadow-glow flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02]"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign in with Google OAuth</span>
          </button>

          <button
            type="button"
            onClick={onNavigateToDashboard}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm transition-all"
          >
            Back to Client Hub
          </button>
        </div>
      </div>
    </div>
  );
};
