import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-fade-in-up hover-lift ${
              toast.type === 'success'
                ? 'bg-surface/95 text-white border-emerald-500/30 shadow-[0_4px_24px_rgba(52,211,153,0.15)]'
                : toast.type === 'error'
                ? 'bg-surface/95 text-white border-red-500/30 shadow-[0_4px_24px_rgba(248,113,113,0.15)]'
                : 'bg-surface/95 text-white border-primary/30 shadow-[0_4px_24px_rgba(124,58,237,0.15)]'
            }`}
          >
            {/* Top glowing line */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${
              toast.type === 'success' ? 'bg-emerald-400' : toast.type === 'error' ? 'bg-red-400' : 'bg-primary'
            }`} />

            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-scale-in" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-400 animate-scale-in" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-primary-light animate-scale-in" />
                </div>
              )}
              <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
