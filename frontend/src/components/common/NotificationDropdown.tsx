import React from 'react';
import { CheckCircle2, Clock, X, Bell } from 'lucide-react';
import { NavTab } from './Header';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Staging Build Passing (v1.2.4)',
      desc: 'Automated 48-point test suite passed on AWS ECS.',
      time: '2 hours ago',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500',
      actionTab: 'admin' as NavTab,
    },
    {
      id: '2',
      title: 'Milestone 2 Invoiced',
      desc: 'Demo & QA Milestone (₹21,240) is ready for clearance.',
      time: '5 hours ago',
      icon: Clock,
      iconColor: 'text-blue-500',
      actionTab: 'dashboard' as NavTab,
    },
    {
      id: '3',
      title: 'Scope Feasibility Verified',
      desc: 'Requirement REQ-8492-X passed technical feasibility review.',
      time: 'Yesterday',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      actionTab: 'dashboard' as NavTab,
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 sm:right-0 top-14 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-surface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4 z-50 animate-fade-in-up md:animate-scale-in text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bell className="w-3.5 h-3.5 text-primary-light" />
            </div>
            <h3 className="font-headline font-bold text-sm text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-0.5">
          {notifications.map((n, idx) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigate(n.actionTab);
                onClose();
              }}
              style={{ animationDelay: `${idx * 75}ms` }}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/5 hover:border-primary/30 flex items-start gap-3 hover-lift group animate-fade-in-up"
            >
              <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors shrink-0 mt-0.5">
                <n.icon className={`w-4 h-4 ${n.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white group-hover:text-primary-light transition-colors">{n.title}</p>
                <p className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] font-mono text-zinc-400 mt-1 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 mt-2 text-center">
          <button
            onClick={() => {
              onNavigate('dashboard');
              onClose();
            }}
            className="text-xs font-bold text-primary-light hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto hover:underline"
          >
            View all in Dashboard →
          </button>
        </div>
      </div>
    </>
  );
};
