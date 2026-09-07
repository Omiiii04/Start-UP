import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import {
  loginWithGoogle,
  logoutFromServer,
  refreshAccessToken,
  tokenStore,
  AuthTokens,
} from '../api/client';

// ── Types ──────────────────────────────────────────────────────────────────

export interface AuthModalState {
  isOpen: boolean;
  targetRole?: 'user' | 'admin';
  message?: string;
  onSuccessRedirectTab?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  googleClientId: string;
  hasConfiguredGoogleAuth: boolean;
  authModal: AuthModalState;
  adminEmails: string[];
  openAuthModal: (options?: { targetRole?: 'user' | 'admin'; message?: string; onSuccessRedirectTab?: string }) => void;
  closeAuthModal: () => void;
  loginWithGoogleCredential: (credential: string, preferredRole?: UserRole) => Promise<boolean>;
  loginAsDemo: (role: UserRole, customName?: string, customEmail?: string) => void;
  logout: () => Promise<void>;
  toggleAdminElevation: () => void;
  switchRole: (newRole: UserRole) => void;
}

// ── Constants ──────────────────────────────────────────────────────────────

const USER_STORAGE_KEY = 'pb_user';

const DEFAULT_ADMIN_EMAILS = [
  'om@projectbridge.io',
  'somnath@projectbridge.io',
  'falguni@projectbridge.io',
];

// ── Helpers ────────────────────────────────────────────────────────────────

function mapApiUserToUser(apiUser: AuthTokens['user']): User {
  const role = apiUser.role as UserRole;
  return {
    userId: apiUser.userId,
    email: apiUser.email,
    fullName: apiUser.fullName,
    role,
    clientCategory: (apiUser.clientCategory as User['clientCategory']) ?? undefined,
    institutionOrCompany: apiUser.institutionOrCompany ?? '',
    picture: apiUser.pictureUrl ?? undefined,
    googleId: apiUser.googleId,
    isAdmin: role !== 'client',
    createdAt: apiUser.createdAt,
  };
}

// ── Context ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const envAdminEmails = import.meta.env.VITE_ADMIN_EMAILS
    ? (import.meta.env.VITE_ADMIN_EMAILS as string).split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)
    : [];
  const adminEmails = Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...envAdminEmails]));

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalState>({ isOpen: false, targetRole: 'user' });

  // Persist user profile (not token) to localStorage for page refresh UX
  useEffect(() => {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

  // On mount: try to silently refresh the access token if we have a stored user
  useEffect(() => {
    if (!user) return;
    refreshAccessToken()
      .then(({ accessToken }) => tokenStore.set(accessToken))
      .catch(() => {
        // Refresh token expired or invalid — log the user out silently
        setUser(null);
        tokenStore.clear();
      });
  }, []); // run once on mount

  // ── Login via Google OAuth (calls backend) ───────────────────────────────
  const loginWithGoogleCredential = useCallback(async (
    credential: string,
    _preferredRole?: UserRole
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await loginWithGoogle(credential);
      tokenStore.set(result.accessToken);
      setUser(mapApiUserToUser(result.user));
      closeAuthModal();
      return true;
    } catch (err) {
      console.error('[Auth] Google login failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Demo login (local only — VITE_DEMO_MODE guard in modal) ─────────────
  const loginAsDemo = useCallback((role: UserRole, customName?: string, customEmail?: string) => {
    const isAdm = role !== 'client';
    const demoUser: User = {
      userId: `usr_demo_${Math.random().toString(36).substring(2, 8)}`,
      email: customEmail || (isAdm ? 'om@projectbridge.io' : 'demo.client@gmail.com'),
      fullName: customName || (isAdm ? 'Om J. (Lead Architect)' : 'Demo Client'),
      role,
      clientCategory: role === 'client' ? 'sme' : undefined,
      institutionOrCompany: isAdm ? 'ProjectBridge Core' : 'Demo Company',
      picture: undefined,
      isAdmin: isAdm,
      createdAt: new Date().toISOString(),
    };
    setUser(demoUser);
    closeAuthModal();
  }, []);

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try { await logoutFromServer(); } catch { /* ignore network errors on logout */ }
    tokenStore.clear();
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  // ── Admin persona switch (UI only — already authenticated admin) ─────────
  const switchRole = useCallback((newRole: UserRole) => {
    if (!user) return;
    setUser({ ...user, role: newRole, isAdmin: newRole !== 'client' });
  }, [user]);

  // ── Legacy: admin elevation toggle (kept for type compat, no-op in prod) ─
  const toggleAdminElevation = useCallback(() => {
    if (!user) return;
    setUser({ ...user, isAdmin: !user.isAdmin, role: !user.isAdmin ? 'admin_ceo' : 'client' });
  }, [user]);

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const openAuthModal = useCallback((options?: { targetRole?: 'user' | 'admin'; message?: string; onSuccessRedirectTab?: string }) => {
    setAuthModal({ isOpen: true, targetRole: options?.targetRole || 'user', message: options?.message, onSuccessRedirectTab: options?.onSuccessRedirectTab });
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role !== 'client';
  const hasConfiguredGoogleAuth = !!googleClientId && googleClientId.length > 10;

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isAdmin, isLoading,
      googleClientId, hasConfiguredGoogleAuth,
      authModal, adminEmails,
      openAuthModal, closeAuthModal,
      loginWithGoogleCredential, loginAsDemo,
      logout, toggleAdminElevation, switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
