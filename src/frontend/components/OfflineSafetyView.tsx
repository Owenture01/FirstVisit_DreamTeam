import React, { useState } from 'react';
import {
  Check,
  Clock,
  MessageSquareMore,
  Phone,
  Pill,
  Plus,
  Timer,
  Wifi,
  WifiOff,
} from 'lucide-react';
import {
  OfflineQueueItem,
  addOfflineKickRecord,
  countWaitingItems,
  createInitialOfflineQueue,
  syncOfflineQueue,
} from '../utils/safetyNetScenarios';

interface OfflineSafetyViewProps {
  onOpenHelp: () => void;
  onNavigateToCare?: () => void;
}

export const OfflineSafetyView: React.FC<OfflineSafetyViewProps> = ({
  onOpenHelp,
  onNavigateToCare,
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [queue, setQueue] = useState<OfflineQueueItem[]>(() => createInitialOfflineQueue());
  const [showKickCounter, setShowKickCounter] = useState(false);
  const [draftKicks, setDraftKicks] = useState(1);

  const waitingCount = countWaitingItems(queue);

  const handleToggleConnection = () => {
    if (!isOnline) {
      setIsOnline(true);
      setQueue((prev) => syncOfflineQueue(prev));
    } else {
      setIsOnline(false);
      setQueue(createInitialOfflineQueue());
    }
  };

  const handleSaveOfflineKicks = () => {
    setQueue((prev) => addOfflineKickRecord(prev, draftKicks, '20:18', isOnline));
    setDraftKicks(1);
    setShowKickCounter(false);
  };

  return (
    <div
      data-testid="offline-safety-view"
      className="w-full flex flex-col space-y-3.5 text-left"
    >
      {/* Page Heading */}
      <div className="px-1 pt-0.5">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Today
        </h1>
      </div>

      {/* Offline / Reconnected Banner */}
      <div
        className={`w-full rounded-[16px] px-4 py-3 text-white flex items-center justify-between gap-2 transition-colors ${
          isOnline ? 'bg-[#15803D]' : 'bg-[#334155]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isOnline ? (
            <Wifi className="w-[18px] h-[18px] shrink-0 text-white" strokeWidth={2.2} />
          ) : (
            <WifiOff className="w-[18px] h-[18px] shrink-0 text-white" strokeWidth={2.2} />
          )}
          <span className="font-['Figtree'] font-bold text-[15px] leading-tight truncate">
            {isOnline ? 'Back online · Synced' : 'No internet'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggleConnection}
          className="font-['Noto_Sans'] text-[13px] font-medium text-white/85 hover:text-white transition-colors shrink-0 cursor-pointer"
        >
          {isOnline ? 'Go offline' : 'Retrying'}
        </button>
      </div>

      {/* Saved on your phone card */}
      <section
        aria-label="Readings saved on your phone"
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
      >
        <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733] pb-2 border-b border-[#E5EEF2]">
          Saved on your phone
        </h2>

        <div className="divide-y divide-[#E5EEF2]">
          {queue.map((item) => {
            const isSent = item.status === 'sent';
            return (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between gap-2"
              >
                <div className="flex items-baseline gap-2.5 min-w-0 flex-wrap">
                  <span className="font-['Figtree'] font-bold text-[14.5px] text-[#0F2733] tabular-nums shrink-0">
                    {item.value}
                  </span>
                  <span className="font-['Noto_Sans'] text-[12.5px] text-[#475569] truncate">
                    {item.detail}
                  </span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full inline-flex items-center gap-1 font-['Figtree'] font-bold text-[12px] shrink-0 ${
                    isSent
                      ? 'bg-[#DCFCE7] text-[#15803D]'
                      : 'bg-[#E3EBEF] text-[#475569]'
                  }`}
                >
                  {isSent ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                  )}
                  <span>{isSent ? 'Sent' : 'Waiting'}</span>
                </span>
              </div>
            );
          })}
        </div>

        <p className="font-['Noto_Sans'] text-[12.5px] text-[#475569] mt-2 pt-1">
          {waitingCount === 0
            ? 'All saved readings sent to your care team.'
            : "They send by themselves when you're back online."}
        </p>
      </section>

      {/* Still works offline card */}
      <section
        aria-label="Features that still work offline"
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
      >
        <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733]">
          Still works offline
        </h2>

        <div className="mt-2.5 space-y-1">
          <button
            type="button"
            onClick={onOpenHelp}
            className="w-full py-1.5 px-1 rounded-xl hover:bg-[#F1F6F8] flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#0F2733] shrink-0" strokeWidth={2.1} />
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733]">
              Help button and 998
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToCare?.()}
            className="w-full py-1.5 px-1 rounded-xl hover:bg-[#F1F6F8] flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <Pill className="w-4 h-4 text-[#0F2733] shrink-0" strokeWidth={2.1} />
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733]">
              Supplement reminders
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowKickCounter((prev) => !prev)}
            aria-expanded={showKickCounter}
            className="w-full py-1.5 px-1 rounded-xl hover:bg-[#F1F6F8] flex items-center gap-3 text-left transition-colors cursor-pointer"
          >
            <Timer className="w-4 h-4 text-[#0F2733] shrink-0" strokeWidth={2.1} />
            <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733]">
              Kick counter
            </span>
          </button>
        </div>

        {showKickCounter && (
          <div
            data-testid="offline-kick-counter"
            className="mt-3 pt-3 border-t border-[#E5EEF2] flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="font-['Figtree'] font-extrabold text-[16px] text-[#0F2733] tabular-nums">
                {draftKicks} {draftKicks === 1 ? 'kick' : 'kicks'}
              </span>
              <button
                type="button"
                onClick={() => setDraftKicks((c) => c + 1)}
                className="h-8 px-2.5 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[12px] inline-flex items-center gap-1 hover:bg-[#cde6ee] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add kick</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveOfflineKicks}
              className="h-8 px-3 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-[12px] hover:bg-[#084958] cursor-pointer"
            >
              Save to phone
            </button>
          </div>
        )}
      </section>

      {/* SMS Fallback Footnote */}
      <div className="px-1 flex items-center gap-2 text-[#475569]">
        <MessageSquareMore className="w-4 h-4 shrink-0 text-[#475569]" strokeWidth={2} />
        <p className="font-['Noto_Sans'] text-[13px] leading-snug">
          Offline for 6 h? We&apos;ll text you instead.
        </p>
      </div>
    </div>
  );
};
