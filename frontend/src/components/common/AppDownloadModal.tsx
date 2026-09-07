import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Star, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  playStoreUrl?: string;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  playStoreUrl = 'https://play.google.com/store/apps'
}) => {
  const handleOpenPlayStore = () => {
    window.open(playStoreUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-10 p-6 sm:p-7 text-zinc-900"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-zinc-900 leading-tight">
                  Project Wallah Mobile
                </h3>
                <p className="text-xs text-zinc-500">Android Official App on Play Store</p>
              </div>
            </div>

            {/* App Preview Banner */}
            <div className="relative rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black text-white p-5 mb-5 overflow-hidden shadow-inner">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-2 border border-emerald-500/30">
                  <Star className="w-3 h-3 fill-emerald-300 text-emerald-300" />
                  <span>4.9 / 5.0 Rating • v2.4</span>
                </div>
                <h4 className="text-base font-bold mb-1">Track Projects on the Go</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Real-time milestone notifications, direct chat with lead engineers, and 1-click invoice downloads.
                </p>
              </div>

              {/* Background glowing circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Features Checklist */}
            <div className="space-y-2 mb-6">
              {[
                'Instant Push Notifications for milestone sign-offs',
                'Seamless Google OAuth mobile login',
                'Download verified source code & SRS PDFs directly'
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleOpenPlayStore}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-zinc-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Google Play Triangle Logo SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.247 2.247 0 013 20.612V3.388c0-.604.226-1.16.609-1.574z" fill="#00D3FF"/>
                  <path d="M17.18 8.613L13.793 12l3.387 3.387 3.82-2.17a2.227 2.227 0 000-3.874l-3.82-2.17z" fill="#FFCE00"/>
                  <path d="M3.609 1.814l10.184 10.186 3.387-3.387L6.037.892A2.253 2.253 0 003.609 1.814z" fill="#00F076"/>
                  <path d="M17.18 15.387L13.793 12 3.61 22.186c.725.79 1.874.83 2.427.521l11.143-7.32z" fill="#F8485E"/>
                </svg>
                <span>Get it on Google Play</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-zinc-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Google Play Protect Verified • Free Download
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
