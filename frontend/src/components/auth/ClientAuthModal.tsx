import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { X, ShieldAlert, Info, Mail, Lock } from 'lucide-react';
import { useHistoryModal } from '../../utils/useHistoryModal';

export const ClientAuthModal: React.FC<{ onNavigate?: (tab: any) => void }> = ({ onNavigate }) => {
  const { 
    authModal, 
    closeAuthModal, 
    loginWithGoogleCredential, 
    login,
    register,
    hasConfiguredGoogleAuth
  } = useAuth();
  
  const handleClose = useHistoryModal(
    authModal.isOpen,
    closeAuthModal,
    'auth-modal'
  );

  const { showToast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!authModal.isOpen) return null;

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setIsSigningIn(true);
      const success = await loginWithGoogleCredential(
        credentialResponse.credential
      );
      setIsSigningIn(false);
      if (success) {
        showToast('Welcome to Project Wallah Client Portal.', 'success');
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (authMode === 'register' && password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    
    setIsSigningIn(true);
    try {
      if (authMode === 'login') {
        await login({ email, password });
        showToast('Welcome back!', 'success');
      } else {
        await register({ email, password, confirmPassword });
        showToast('Account created successfully!', 'success');
      }
      if (authModal.onSuccessRedirectTab && onNavigate) {
        onNavigate(authModal.onSuccessRedirectTab);
      }
    } catch (err: any) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setIsSigningIn(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSigningIn) {
          handleClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-zinc-950/85 dark:backdrop-blur-2xl border border-zinc-200 dark:border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200 text-zinc-900 dark:text-zinc-100 my-auto"
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
                Client Sign-In
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Access your projects, milestones & submissions
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
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

          {/* Email/Password Auth Form */}
          <div className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-5 space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-zinc-500 dark:focus:border-white/30 transition-colors"
                      placeholder="client@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-zinc-500 dark:focus:border-white/30 transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:border-zinc-500 dark:focus:border-white/30 transition-colors"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full px-6 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold rounded-lg text-sm hover:bg-black dark:hover:bg-zinc-100 transition-colors disabled:opacity-50"
              >
                {isSigningIn ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
              </button>
            </form>
            
            <div className="text-center text-xs text-zinc-500">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-zinc-900 dark:text-white font-semibold hover:underline"
              >
                {authMode === 'login' ? 'Register' : 'Sign In'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
            <span className="text-xs font-medium text-zinc-500">OR</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>

          {/* Primary Google Sign-In Container */}
          <div className="text-center space-y-4">
            {/* Google OAuth Live Button or Fallback */}
            <div className="flex justify-center">
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
                    text="continue_with"
                    width="280"
                  />
                </div>
              ) : (
                <div className="text-xs text-zinc-500">
                  Google Auth not configured.
                </div>
              )}
            </div>

            {!hasConfiguredGoogleAuth && (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
                <Info className="w-3.5 h-3.5 text-zinc-600" />
                <span>Running in Sandbox Mode (Google Client ID can be configured in <code>.env</code>)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
