import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface SupportChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  time: string;
}

export const SupportChatDrawer: React.FC<SupportChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      text: 'Hello! I am Divya from the ProjectBridge Operations Desk. How can I help you today with your project scope or UGC compliance?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');

    setTimeout(() => {
      let replyText = "Thanks for reaching out! Our lead architect (Om) and operations lead (Divya) have received your note and will review it within 2 hours.";
      const lower = currentQuery.toLowerCase();
      if (lower.includes('ip') || lower.includes('policy') || lower.includes('deliverable') || lower.includes('ownership')) {
        replyText = "All scopes on ProjectBridge include 100% full intellectual property transfer upon final milestone clearance. Deliverables consist of production code, documentation, and staging environments.";
      } else if (lower.includes('price') || lower.includes('gst') || lower.includes('quote') || lower.includes('cost')) {
        replyText = "Our engineering service tiers range from Tier 1 (₹2k-10k) to Tier 4 Enterprise (₹60k+), with standard 18% GST (SAC 998314). Formal SOWs are issued on milestone agreements.";
      } else if (lower.includes('status') || lower.includes('order') || lower.includes('project')) {
        replyText = "You can track real-time milestone progress, GitHub commits, and AWS ECS staging links directly in your User Dashboard!";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const quickQuestions = [
    'What is your intellectual property handover policy?',
    'What are the payment milestones?',
    'How do I access the staging demo?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in transition-all duration-300">
      <div 
        className="w-full max-w-md bg-surface h-full shadow-2xl flex flex-col justify-between border-l border-white/10 text-white animate-fade-in-up md:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-surface/90 backdrop-blur-lg border-b border-white/10 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-glow animate-float">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-white flex items-center gap-2">
                <span>ProjectBridge Support</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-radar-ping"></span>
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Divya & Om (Online • Avg reply &lt; 2m)</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background text-xs">
          <div className="text-center animate-fade-in-down">
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-full text-[10px] font-mono font-semibold shadow-sm">
              Live Architecture & Operations Desk
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] animate-fade-in-up ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-primary text-white shadow-glow' : 'bg-white/10 text-zinc-200 border border-white/10'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div>
                <div
                  className={`p-3 rounded-2xl transition-all ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none shadow-glow'
                      : 'bg-surface text-zinc-200 border border-white/10 shadow-sm rounded-tl-none hover:border-white/20'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono mt-1 block px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Quick suggestions */}
          <div className="pt-2">
            <p className="text-[11px] text-zinc-400 font-bold mb-2">Suggested Inquiries:</p>
            <div className="flex flex-col gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-left p-2.5 rounded-xl bg-surface border border-white/10 hover:border-primary hover:bg-white/5 text-[11px] text-zinc-300 font-medium transition-all active:scale-[0.99]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-4 bg-surface/95 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 h-10 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-10 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-glow active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
