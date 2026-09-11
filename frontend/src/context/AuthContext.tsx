import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import {
  loginWithGoogle,
  registerWithEmail,
  loginWithEmail,
  logoutFromServer,
  refreshAccessToken,
  tokenStore,
  AuthTokens,
} from '../api/client';
import { useConfig } from './ConfigContext';

// ── Types ──────────────────────────────────────────────────────────────────

export interface AuthModalState {
  isOpen: boolean;
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
  openAuthModal: (options?: { message?: string; onSuccessRedirectTab?: string }) => void;
  closeAuthModal: () => void;
  loginWithGoogleCredential: (credential: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  login: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
}

// ── Constants ──────────────────────────────────────────────────────────────

const USER_STORAGE_KEY = 'pb_user';

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
  // Google Client ID comes from the backend config, not a frontend env var
  const { config, hasGoogleAuth } = useConfig();
  const googleClientId = config?.googleClientId || '';

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authModal, setAuthModal] = useState<AuthModalState>({ isOpen: false });

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
    credential: string
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

  // ── Login with Email/Password ───────────────────────────────
  const login = useCallback(async (data: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await loginWithEmail(data);
      tokenStore.set(result.accessToken);
      setUser(mapApiUserToUser(result.user));
      closeAuthModal();
      return true;
    } catch (err: any) {
      console.error('[Auth] Login failed:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Register with Email/Password ───────────────────────────────
  const register = useCallback(async (data: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await registerWithEmail(data);
      tokenStore.set(result.accessToken);
      setUser(mapApiUserToUser(result.user));
      closeAuthModal();
      return true;
    } catch (err: any) {
      console.error('[Auth] Register failed:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);


  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try { await logoutFromServer(); } catch { /* ignore network errors on logout */ }
    tokenStore.clear();
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const openAuthModal = useCallback((options?: { message?: string; onSuccessRedirectTab?: string }) => {
    setAuthModal({ isOpen: true, message: options?.message, onSuccessRedirectTab: options?.onSuccessRedirectTab });
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = !!user && user.role !== 'client';
  const hasConfiguredGoogleAuth = hasGoogleAuth;

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isAdmin, isLoading,
      googleClientId, hasConfiguredGoogleAuth,
      authModal,
      openAuthModal, closeAuthModal,
      loginWithGoogleCredential, register, login,
      logout,
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
