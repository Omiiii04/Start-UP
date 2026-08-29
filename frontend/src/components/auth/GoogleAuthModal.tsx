import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { X, ShieldAlert, User, Lock, ArrowRight, Info } from 'lucide-react';
import { UserRole } from '../../types';

export const GoogleAuthModal: React.FC<{ onNavigate?: (tab: any) => void }> = ({ onNavigate }) => {
  const { 
    authModal, 
    closeAuthModal, 
    loginWithGoogleCredential, 
    loginAsDemo, 
    hasConfiguredGoogleAuth
  } = useAuth();
  
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>(authModal.targetRole || 'user');

  if (!authModal.isOpen) return null;

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const success = loginWithGoogleCredential(
        credentialResponse.credential,
        activeTab === 'admin' ? 'admin_ceo' : 'client'
      );
      if (success) {
        showToast(
          activeTab === 'admin' 
            ? 'Authenticated with Admin privileges via Google.' 
            : 'Welcome to ProjectBridge Client Portal.',
          'success'
        );
        if (authModal.onSuccessRedirectTab && onNavigate) {
          onNavigate(authModal.onSuccessRedirectTab);
        }
      } else {
        showToast('Unable to verify Google credential token.', 'error');
      }
    }
  };

  const handleGoogleError = () => {
    showToast('Could not complete Google OAuth authentication.', 'error');
  };

  const handleDemoSignIn = (role: UserRole, name?: string, email?: string) => {
    loginAsDemo(role, name, email);
    showToast(
      `Signed in via Google Sandbox (${role === 'client' ? 'Client' : 'Admin: ' + role})`,
      'success'
    );
    if (authModal.onSuccessRedirectTab && onNavigate) {
      onNavigate(authModal.onSuccessRedirectTab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-surface border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Background Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary/30 via-indigo-600/10 to-transparent pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-lg shadow-glow">
              P
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-white">
                {activeTab === 'admin' ? 'Admin Portal Access' : 'Client Sign-In'}
              </h3>
              <p className="text-xs text-zinc-400">
                {activeTab === 'admin' 
                  ? 'Sign in with your authorized Google Admin account' 
                  : 'Access your projects, milestones & submissions'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs: User / Admin */}
        <div className="grid grid-cols-2 p-1.5 bg-black/40 border-b border-white/10 mx-5 sm:mx-6 mt-4 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'user'
                ? 'bg-primary text-white shadow-glow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Client Account
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-glow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin & Core Team
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {authModal.message && (
            <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{authModal.message}</span>
            </div>
          )}

          {/* Primary Google Sign-In Container */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center space-y-4">
            <div className="flex justify-center">
              {/* Google Brand Multi-color SVG */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm">
                {activeTab === 'admin' ? 'Google Admin Authentication' : 'Continue with Google'}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                {activeTab === 'admin' 
                  ? 'Sign in using your authorized company Google account to access operations & engineering.'
                  : 'Fast, secure one-click sign-in to track deliverables and agreements.'}
              </p>
            </div>

            {/* Google OAuth Live Button or Fallback */}
            <div className="flex justify-center pt-1">
              {hasConfiguredGoogleAuth ? (
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_black"
                    shape="pill"
                    size="large"
                    text={activeTab === 'admin' ? 'signin_with' : 'continue_with'}
                    width="280"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'admin') {
                      handleDemoSignIn('admin_ceo', 'Om J. (Lead Architect)', 'om@projectbridge.io');
                    } else {
                      handleDemoSignIn('client', 'Vikram Sharma', 'client.demo@gmail.com');
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-zinc-900 hover:bg-zinc-100 font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-md cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign in with Google OAuth</span>
                </button>
              )}
            </div>

            {!hasConfiguredGoogleAuth && (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <Info className="w-3.5 h-3.5 text-primary" />
                <span>Running in Sandbox Mode (Google Client ID can be added in <code>.env</code>)</span>
              </div>
            )}
          </div>

          {/* Quick Switch Profiles for Testing */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-400 font-semibold">
                {activeTab === 'admin' ? 'Pre-authorized Admin Accounts' : 'Sandbox Demo Accounts'}
              </span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Instant Sign-In
              </span>
            </div>

            {activeTab === 'admin' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_ceo', 'Om J. (Lead Architect)', 'om@projectbridge.io')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                      OJ
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">Om J.</div>
                      <div className="text-[10px] text-zinc-400">om@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Lead/AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_backend', 'Somnath (Backend Lead)', 'somnath@projectbridge.io')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">Somnath</div>
                      <div className="text-[10px] text-zinc-400">somnath@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">DevOps</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_ops', 'Divya (Operations Lead)', 'divya@projectbridge.io')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs">
                      D
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">Divya</div>
                      <div className="text-[10px] text-zinc-400">divya@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">Ops/Finance</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_qa', 'Falguni (QA & Frontend)', 'falguni@projectbridge.io')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs">
                      F
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">Falguni</div>
                      <div className="text-[10px] text-zinc-400">falguni@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">QA/UI</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('client', 'Vikram Sharma', 'vikram.sharma@techsphere.in')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary-light flex items-center justify-center font-bold text-xs">
                      VS
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-primary-light transition-colors">Vikram Sharma</div>
                      <div className="text-[10px] text-zinc-400">TechSphere Solutions</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('client', 'Priya Deshmukh', 'priya.research@iitb.ac.in')}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                      PD
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-teal-300 transition-colors">Priya Deshmukh</div>
                      <div className="text-[10px] text-zinc-400">Academic / Researcher</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 text-center text-[11px] text-zinc-500 flex items-center justify-between px-6">
          <span>Protected with OAuth 2.0 & TLS Encryption</span>
          <span className="font-mono text-zinc-400">ProjectBridge SSO v2.4</span>
        </div>
      </div>
    </div>
  );
};
