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
      if (lower.includes('ugc') || lower.includes('compliance')) {
        replyText = "All scopes on ProjectBridge adhere strictly to UGC 2018 Academic Integrity regulations. Deliverables are technical prototypes, mentorship, and code libraries.";
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
    'How does UGC 2018 compliance work?',
    'What are the payment milestones?',
    'How do I access the staging demo?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-sm text-white flex items-center gap-1.5">
                <span>ProjectBridge Support</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[11px] text-gray-300 font-mono">Divya & Om (Online)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 text-xs">
          <div className="text-center">
            <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-[10px] font-mono font-semibold">
              Live Architecture & Operations Desk
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>
              <div>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-black text-white rounded-tr-none'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono mt-1 block px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Quick suggestions */}
          <div className="pt-2">
            <p className="text-[11px] text-gray-500 font-bold mb-2">Suggested Questions:</p>
            <div className="flex flex-col gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                  }}
                  className="text-left p-2 rounded-lg bg-white border border-gray-200 hover:border-black text-[11px] text-gray-700 font-medium transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 h-10 px-3.5 rounded-xl border border-gray-300 text-xs text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-10 px-4 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
