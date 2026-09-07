import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, ArrowLeft, Bell, Smartphone } from 'lucide-react';
import type { NavTab } from '../../components/common/Header';

interface WorkInProgressProps {
  onNavigate: (tab: NavTab) => void;
}

export const WorkInProgress: React.FC<WorkInProgressProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg text-center"
      >
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shadow-glow">
          <Hammer className="w-7 h-7" />
        </div>

        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight mb-3">
          The ProjectBridge app is still being built
        </h1>

        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md mx-auto mb-8">
          We're wiring up push notifications, offline milestone tracking, and mobile sign-off before this ships.
          For now, everything you can do in the app already works right here in the browser.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <button
            onClick={() => onNavigate('browse')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            Browse Projects Instead
          </button>
        </div>

        <div className="mt-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-container text-tertiary text-xs font-semibold border border-tertiary/20">
          <Bell className="w-3.5 h-3.5" />
          We'll announce the launch here first
        </div>
      </motion.div>
    </div>
  );
};
