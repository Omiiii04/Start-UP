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
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Demo mode guard — NEVER show demo accounts in production
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

  if (!authModal.isOpen) return null;

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setIsSigningIn(true);
      const success = await loginWithGoogleCredential(
        credentialResponse.credential,
        activeTab === 'admin' ? 'admin_ceo' : 'client'
      );
      setIsSigningIn(false);
      if (success) {
        showToast(
          activeTab === 'admin'
            ? 'Authenticated with Admin privileges via Google.'
            : 'Welcome to Project Wallah Client Portal.',
          'success'
        );
        if (authModal.onSuccessRedirectTab && onNavigate) {
          onNavigate(authModal.onSuccessRedirectTab);
        }
      } else {
        showToast('Sign-in failed. Your account may not be authorized or network error.', 'error');
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-950/85 dark:backdrop-blur-2xl border border-zinc-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200 text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-100 dark:border-white/10 relative z-10 bg-zinc-50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-extrabold text-lg shadow-sm">
              P
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-zinc-900 dark:text-white">
                {activeTab === 'admin' ? 'Admin Portal Access' : 'Client Sign-In'}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {activeTab === 'admin' 
                  ? 'Sign in with your authorized Google Admin account' 
                  : 'Access your projects, milestones & submissions'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs: User / Admin */}
        <div className="grid grid-cols-2 p-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 mx-5 sm:mx-6 mt-4 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'user'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Client Account
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-amber-600 text-white shadow-sm font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin &amp; Core Team
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          {authModal.message && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{authModal.message}</span>
            </div>
          )}

          {/* Primary Google Sign-In Container */}
          <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-5 text-center space-y-4">
            <div className="flex justify-center">
              {/* Google Brand Multi-color SVG */}
              <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                {activeTab === 'admin' ? 'Google Admin Authentication' : 'Continue with Google'}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
                {activeTab === 'admin' 
                  ? 'Sign in using your authorized company Google account to access operations & engineering.'
                  : 'Fast, secure one-click sign-in to track deliverables and agreements.'}
              </p>
            </div>

            {/* Google OAuth Live Button or Fallback */}
            <div className="flex justify-center pt-1">
              {isSigningIn ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin" />
                  <span className="text-xs text-zinc-500">Verifying with server...</span>
                </div>
              ) : hasConfiguredGoogleAuth ? (
                <div className="w-full flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
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
                      handleDemoSignIn('client');
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50 font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer"
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
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <Info className="w-3.5 h-3.5 text-zinc-600" />
                <span>Running in Sandbox Mode (Google Client ID can be configured in <code>.env</code>)</span>
              </div>
            )}
          </div>

          {/* Quick Switch Profiles — DEMO MODE ONLY */}
          {isDemoMode ? (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">
                {activeTab === 'admin' ? 'Pre-authorized Admin Accounts' : 'Sandbox Demo Accounts'}
              </span>
              <span className="text-[10px] text-zinc-700 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full font-medium">
                Instant Sign-In
              </span>
            </div>

            {activeTab === 'admin' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_ceo', 'Om J. (Lead Architect)', 'om@projectbridge.io')}
                  className="p-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-amber-400 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      OJ
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 group-hover:text-amber-800 transition-colors">Om J.</div>
                      <div className="text-[10px] text-zinc-500">om@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">Lead/AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_backend', 'Somnath (Backend Lead)', 'somnath@projectbridge.io')}
                  className="p-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-emerald-400 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      S
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 group-hover:text-emerald-800 transition-colors">Somnath</div>
                      <div className="text-[10px] text-zinc-500">somnath@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">DevOps</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoSignIn('admin_qa', 'Falguni (QA & Frontend)', 'falguni@projectbridge.io')}
                  className="p-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-purple-400 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                      F
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 group-hover:text-purple-800 transition-colors">Falguni</div>
                      <div className="text-[10px] text-zinc-500">falguni@projectbridge.io</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">QA/UI</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDemoSignIn('client')}
                  className="p-2.5 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-400 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-xs">
                      DC
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-900 group-hover:text-black transition-colors">Continue as Demo Client</div>
                      <div className="text-[10px] text-zinc-500">Sandbox account — no real data</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </button>
              </div>
            )}
          </div>
          ) : (
            /* Production mode: demo accounts hidden */
            <div className="pt-2 p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-center text-[11px] text-zinc-500">
              <span>Sign in above with your Google account to continue.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 border-t border-zinc-200 text-center text-[11px] text-zinc-500 flex items-center justify-between px-6">
          <span>Protected with OAuth 2.0 &amp; TLS Encryption</span>
          <span className="font-mono text-zinc-600">Project Wallah SSO v2.4</span>
        </div>
      </div>
    </div>
  );
};
