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
      title: 'UGC Compliance Verified',
      desc: 'Requirement REQ-8492-X passed UGC 2018 validation.',
      time: 'Yesterday',
      icon: CheckCircle2,
      iconColor: 'text-black',
      actionTab: 'dashboard' as NavTab,
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-black" />
            <h3 className="font-headline font-bold text-sm text-black">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigate(n.actionTab);
                onClose();
              }}
              className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100 flex items-start gap-3"
            >
              <n.icon className={`w-4 h-4 ${n.iconColor} shrink-0 mt-0.5`} />
              <div className="flex-1">
                <p className="text-xs font-bold text-black">{n.title}</p>
                <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] font-mono text-gray-400 mt-1 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-100 mt-2 text-center">
          <button
            onClick={() => {
              onNavigate('dashboard');
              onClose();
            }}
            className="text-xs font-bold text-black hover:underline"
          >
            View all in Dashboard →
          </button>
        </div>
      </div>
    </>
  );
};
