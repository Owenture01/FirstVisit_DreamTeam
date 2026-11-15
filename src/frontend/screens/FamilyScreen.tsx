import React, { useState } from 'react';
import { Lock, Plus, Check, Clock, Send } from 'lucide-react';
import { Header } from '../components/Header';

interface FamilyScreenProps {
  onOpenHelp?: () => void;
  onOpenHana?: () => void;
  onOpenProfile?: () => void;
}

interface FamilyRequest {
  id: string;
  title: string;
  status: 'Sent' | 'Accepted';
}

export const FamilyScreen: React.FC<FamilyScreenProps> = ({
  onOpenHelp = () => {},
  onOpenHana = () => {},
  onOpenProfile = () => {},
}) => {
  const [requests, setRequests] = useState<FamilyRequest[]>([
    { id: '1', title: 'Childcare, Thu 9:30', status: 'Sent' },
    { id: '2', title: 'Ride to clinic, Sun', status: 'Accepted' },
  ]);

  const [showAskModal, setShowAskModal] = useState(false);
  const [newRequestText, setNewRequestText] = useState('');

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestText.trim()) return;

    setRequests(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newRequestText.trim(),
        status: 'Sent'
      }
    ]);
    setNewRequestText('');
    setShowAskModal(false);
  };

  const quickRequests = [
    'Pharmacy pickup (Iron & vitamins)',
    'Drive to Ultrasound appointment, Fri 10am',
    'Rest hour · Watch baby nursery',
    'Cook dinner / Hydration support',
  ];

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6 text-left">
      {/* Header */}
      <Header
        gestationalWeek={31}
        gestationalDay={4}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen Title */}
      <div className="px-1 pt-1">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Family
        </h1>
      </div>

      {/* Card 1: Ahmed, husband */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-[#FEF08A] text-[#854D0E] font-['Figtree'] font-extrabold text-[18px] flex items-center justify-center shrink-0">
          A
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] leading-snug">
            Ahmed, husband
          </h2>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6EEF1] text-[#1E293B] text-[11px] font-medium mt-1">
            <Lock className="w-3 h-3 text-[#475569]" />
            <span>Requests only, results private</span>
          </div>
        </div>
      </div>

      {/* Card 2: Requests */}
      <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/90 shadow-xs">
        <h2 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733] mb-3">
          Requests
        </h2>

        <div className="space-y-3">
          {requests.map((req) => (
            <div key={req.id} className="flex items-center justify-between py-1">
              <span className="font-['Noto_Sans'] font-medium text-[15px] text-[#0F2733]">
                {req.title}
              </span>

              <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                req.status === 'Accepted'
                  ? 'bg-[#DCFCE7] text-[#15803D]'
                  : 'bg-[#FEF3C7] text-[#92400E]'
              }`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>

        {/* + Ask for help button */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => setShowAskModal(true)}
            aria-label="Ask for help"
            className="text-[15px] font-['Figtree'] font-bold text-[#0F2733] flex items-center gap-1.5 hover:text-[#0B5F73] transition-colors py-2 px-4 rounded-full hover:bg-slate-50"
          >
            <Plus className="w-4 h-4 text-[#0B5F73]" strokeWidth={2.5} />
            <span>Ask for help</span>
          </button>
        </div>
      </div>

      {/* Interactive Modal to Ask for Help */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-t-[24px] sm:rounded-[20px] p-5 shadow-2xl border border-slate-200">
            <h3 className="font-['Figtree'] font-bold text-base text-[#0F2733] mb-1">
              Ask Ahmed for Support
            </h3>
            <p className="text-xs text-[#475569] mb-3">
              Sends an instant SMS & in-app request to Ahmed. Medical telemetry remains private.
            </p>

            <form onSubmit={handleAddRequest} className="space-y-3">
              <input
                type="text"
                value={newRequestText}
                onChange={(e) => setNewRequestText(e.target.value)}
                placeholder="e.g. Ride to hospital on Wednesday..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B5F73]"
                autoFocus
              />

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#475569]">Quick suggestions:</span>
                {quickRequests.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNewRequestText(suggestion)}
                    className="block w-full text-left text-xs p-2 rounded-lg bg-[#F1F6F8] hover:bg-[#DDEFF4] text-[#0F2733] transition-colors"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="flex-1 py-2 rounded-full bg-slate-100 text-xs font-bold text-[#475569]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-full bg-[#0B5F73] text-white text-xs font-bold hover:bg-[#084857]"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
