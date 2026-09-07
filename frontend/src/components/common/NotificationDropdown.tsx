import React from 'react';
import { CheckCircle2, X, Bell } from 'lucide-react';
import { NavTab } from './Header';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  // No backend endpoint exists yet for live notifications — no hardcoded/dummy entries
  const notifications: {
    id: string;
    title: string;
    desc: string;
    time: string;
    icon: typeof CheckCircle2;
    iconColor: string;
    actionTab: NavTab;
  }[] = [];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 sm:right-0 top-14 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white dark:bg-zinc-950/85 dark:backdrop-blur-2xl rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/15 p-4 z-50 animate-fade-in-up md:animate-scale-in text-zinc-900 dark:text-zinc-100">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
            </div>
            <h3 className="font-headline font-bold text-sm text-zinc-900 dark:text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-0.5">
          {notifications.length === 0 ? (
            <p className="text-xs text-zinc-400 dark:text-zinc-500 italic text-center py-8">No notifications yet.</p>
          ) : notifications.map((n, idx) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigate(n.actionTab);
                onClose();
              }}
              style={{ animationDelay: `${idx * 75}ms` }}
              className="p-3 rounded-xl bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer border border-zinc-200 dark:border-white/10 hover:border-zinc-400 flex items-start gap-3 hover-lift group animate-fade-in-up"
            >
              <div className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors shrink-0 mt-0.5">
                <n.icon className={`w-4 h-4 ${n.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-900 group-hover:text-black transition-colors">{n.title}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] font-mono text-zinc-400 mt-1 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-zinc-100 mt-2 text-center">
          <button
            onClick={() => {
              onNavigate('dashboard');
              onClose();
            }}
            className="text-xs font-bold text-zinc-800 hover:text-black transition-colors flex items-center justify-center gap-1 mx-auto hover:underline cursor-pointer"
          >
            View all in Dashboard →
          </button>
        </div>
      </div>
    </>
  );
};
