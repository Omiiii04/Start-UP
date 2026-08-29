import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User, UserRole } from '../types';

export interface GoogleJwtPayload {
  iss?: string;
  nbf?: number;
  aud?: string;
  sub: string;
  email: string;
  email_verified?: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
}

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
  googleClientId: string;
  hasConfiguredGoogleAuth: boolean;
  authModal: AuthModalState;
  adminEmails: string[];
  openAuthModal: (options?: { targetRole?: 'user' | 'admin'; message?: string; onSuccessRedirectTab?: string }) => void;
  closeAuthModal: () => void;
  loginWithGoogleCredential: (credential: string, preferredRole?: UserRole) => boolean;
  loginAsDemo: (role: UserRole, customName?: string, customEmail?: string) => void;
  logout: () => void;
  toggleAdminElevation: () => void;
  switchRole: (newRole: UserRole) => void;
}

const STORAGE_KEY = 'projectbridge_auth_session';

const DEFAULT_ADMIN_EMAILS = [
  'admin@projectbridge.io',
  'om@projectbridge.io',
  'somnath@projectbridge.io',
  'falguni@projectbridge.io',
  'divya@projectbridge.io'
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const envAdminEmails = import.meta.env.VITE_ADMIN_EMAILS 
    ? (import.meta.env.VITE_ADMIN_EMAILS as string).split(',').map((e: string) => e.trim().toLowerCase()).filter(Boolean)
    : [];
  
  const adminEmails = Array.from(new Set([...DEFAULT_ADMIN_EMAILS, ...envAdminEmails]));

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      console.warn('Failed to restore auth session from localStorage');
    }
    return null;
  });

  const [authModal, setAuthModal] = useState<AuthModalState>({
    isOpen: false,
    targetRole: 'user',
    message: undefined,
    onSuccessRedirectTab: undefined
  });

  // Sync session changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const checkIfEmailIsAdmin = (email: string): boolean => {
    const normalized = email.toLowerCase().trim();
    return adminEmails.some(adm => normalized === adm.toLowerCase());
  };

  const loginWithGoogleCredential = (credential: string, preferredRole?: UserRole): boolean => {
    try {
      const decoded = jwtDecode<GoogleJwtPayload>(credential);
      if (!decoded || !decoded.email) {
        console.error('Invalid Google token: missing email claim');
        return false;
      }

      const emailIsAdmin = checkIfEmailIsAdmin(decoded.email);
      let assignedRole: UserRole = 'client';

      if (preferredRole && preferredRole !== 'client') {
        assignedRole = preferredRole;
      } else if (emailIsAdmin) {
        assignedRole = 'admin_ceo';
      }

      const authenticatedUser: User = {
        userId: `usr_g_${decoded.sub.substring(0, 10)}`,
        email: decoded.email,
        fullName: decoded.name || decoded.email.split('@')[0],
        role: assignedRole,
        clientCategory: assignedRole === 'client' ? 'sme' : undefined,
        institutionOrCompany: decoded.email.split('@')[1] === 'gmail.com' ? 'Independent' : decoded.email.split('@')[1],
        picture: decoded.picture,
        googleId: decoded.sub,
        isAdmin: assignedRole !== 'client' || emailIsAdmin,
        createdAt: new Date().toISOString()
      };

      setUser(authenticatedUser);
      closeAuthModal();
      return true;
    } catch (err) {
      console.error('Error decoding Google OAuth token:', err);
      return false;
    }
  };

  const loginAsDemo = (role: UserRole, customName?: string, customEmail?: string) => {
    const isAdm = role !== 'client';
    const demoUser: User = {
      userId: `usr_demo_${Math.random().toString(36).substring(2, 8)}`,
      email: customEmail || (isAdm ? 'om@projectbridge.io' : 'vikram.sharma@techsphere.in'),
      fullName: customName || (isAdm ? 'Om J. (Lead Architect)' : 'Vikram Sharma'),
      role: role,
      clientCategory: role === 'client' ? 'sme' : undefined,
      institutionOrCompany: isAdm ? 'ProjectBridge Core' : 'TechSphere Solutions',
      picture: isAdm 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isAdmin: isAdm,
      createdAt: new Date().toISOString()
    };

    setUser(demoUser);
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const toggleAdminElevation = () => {
    if (!user) return;
    const newIsAdmin = !user.isAdmin;
    const updated: User = {
      ...user,
      isAdmin: newIsAdmin,
      role: newIsAdmin ? 'admin_ceo' : 'client'
    };
    setUser(updated);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    const isAdm = newRole !== 'client';
    const updated: User = {
      ...user,
      role: newRole,
      isAdmin: isAdm
    };
    setUser(updated);
  };

  const openAuthModal = (options?: { targetRole?: 'user' | 'admin'; message?: string; onSuccessRedirectTab?: string }) => {
    setAuthModal({
      isOpen: true,
      targetRole: options?.targetRole || 'user',
      message: options?.message,
      onSuccessRedirectTab: options?.onSuccessRedirectTab
    });
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  const isAuthenticated = !!user;
  const isAdmin = !!user && (user.isAdmin === true || user.role !== 'client' || checkIfEmailIsAdmin(user.email));
  const hasConfiguredGoogleAuth = !!googleClientId && googleClientId.length > 10;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        googleClientId,
        hasConfiguredGoogleAuth,
        authModal,
        adminEmails,
        openAuthModal,
        closeAuthModal,
        loginWithGoogleCredential,
        loginAsDemo,
        logout,
        toggleAdminElevation,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
