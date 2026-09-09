import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, ShieldCheck, Sparkles, FolderKanban } from 'lucide-react';
import type { NavTab } from '../../components/common/Header';

interface CustomerReviewsProps {
  onNavigate: (tab: NavTab) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ onNavigate }) => {
  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl space-y-8 text-center"
      >
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-zinc-200 text-xs font-mono font-semibold backdrop-blur-md shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Verified Client Feedback System</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="font-headline font-black text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Authentic, transparent reviews from verified clients and students across all engineering and academic domains.
          </p>
        </div>

        {/* Blank / Clean Empty State Card (No Dummy Code) */}
        <div className="bg-white/50 dark:bg-zinc-950/25 dark:backdrop-blur-2xl rounded-3xl p-8 sm:p-14 border border-white/60 dark:border-white/10 shadow-xl dark:shadow-2xl space-y-6 text-center transition-all">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-200 flex items-center justify-center mx-auto shadow-inner border border-slate-200/60 dark:border-white/10">
            <MessageSquare className="w-7 h-7 text-slate-500 dark:text-zinc-400" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              No Customer Reviews Yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Reviews will appear here automatically once clients complete milestone approvals and submit feedback through their Project Hub.
            </p>
          </div>

          {/* Verification Protocol Notice */}
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-900/40 border border-slate-200/60 dark:border-white/10 max-w-lg mx-auto text-center flex flex-col items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <div className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed text-center">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Integrity Guaranteed</span>
              Only registered users with completed, signed-off milestones can post verified ratings and reviews.
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-md mx-auto sm:max-w-none">
            <button
              onClick={() => onNavigate('browse')}
              className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white dark:text-zinc-950 bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <FolderKanban className="w-4 h-4" />
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('submit')}
              className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-800 dark:text-white bg-white/70 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/80 dark:border-white/20 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Submit Custom Requirement</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
