import React, { useEffect, useRef, useState } from 'react';
import { Check, Plus, RotateCw } from 'lucide-react';
import { BAND_TROUBLESHOOT_STEPS } from '../utils/safetyNetScenarios';

interface BandDisconnectedViewProps {
  onOpenHelp: () => void;
  onReconnectBand?: () => void;
}

export const BandDisconnectedView: React.FC<BandDisconnectedViewProps> = ({
  onOpenHelp,
  onReconnectBand,
}) => {
  const [reconnectState, setReconnectState] = useState<'disconnected' | 'reconnecting' | 'connected'>(
    'disconnected'
  );
  const [showKickCounter, setShowKickCounter] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const reconnectTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current !== null) {
        window.clearTimeout(reconnectTimerRef.current);
      }
    };
  }, []);

  const handleReconnect = () => {
    if (reconnectState === 'reconnecting') return;
    if (reconnectState === 'connected') {
      onReconnectBand?.();
      return;
    }

    setReconnectState('reconnecting');
    reconnectTimerRef.current = window.setTimeout(() => {
      setReconnectState('connected');
      reconnectTimerRef.current = null;
    }, 450);
  };

  return (
    <div
      data-testid="band-disconnected-view"
      className="w-full flex flex-col space-y-3.5 text-left"
    >
      {/* Page Heading */}
      <div className="px-1 pt-0.5">
        <h1 className="font-['Figtree'] font-extrabold text-[26px] text-[#0F2733] leading-tight">
          Today
        </h1>
      </div>

      {/* Band Status Card */}
      <section
        aria-label="Bump Band connection status"
        className={`w-full rounded-[24px] p-4.5 sm:p-5 text-white shadow-xs transition-colors ${
          reconnectState === 'connected' ? 'bg-[#0B5F73]' : 'bg-[#4B5B6B]'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            {reconnectState === 'connected' ? (
              <Check className="w-5 h-5 text-white stroke-[2.6]" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
                aria-hidden="true"
              >
                <rect x="3" y="8" width="16" height="8" rx="2.5" />
                <line x1="7" y1="12" x2="15" y2="12" />
                <line x1="21" y1="10.5" x2="21" y2="13.5" />
              </svg>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="font-['Figtree'] font-bold text-[17px] text-white leading-snug">
              {reconnectState === 'connected'
                ? 'Band connected'
                : reconnectState === 'reconnecting'
                ? 'Reconnecting band…'
                : 'Band not connected'}
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-white/75 leading-snug mt-0.5">
              {reconnectState === 'connected'
                ? 'Signal restored · 82% battery'
                : 'Since 7:40 · 2 h ago'}
            </p>
          </div>
        </div>

        <p className="font-['Noto_Sans'] text-[13px] text-white/85 leading-snug mt-3.5">
          {reconnectState === 'connected'
            ? 'Your Bump Band is syncing again. Next 20 min session ready.'
            : 'Clinic informed. Sessions: 20 min twice daily.'}
        </p>
      </section>

      {/* Try this troubleshooting card */}
      <section
        aria-label="Reconnect steps"
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 border border-[#DCE5EA] shadow-2xs"
      >
        <h2 className="font-['Figtree'] font-bold text-[16px] text-[#0F2733]">
          Try this
        </h2>

        <ol className="mt-3 space-y-3">
          {BAND_TROUBLESHOOT_STEPS.map((step) => (
            <li key={step.stepNumber} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-[#DDEFF4] text-[#0B5F73] font-['Figtree'] font-bold text-[13px] flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                {step.stepNumber}
              </span>
              <span className="font-['Noto_Sans'] text-[14px] text-[#0F2733] leading-snug pt-0.5">
                {step.text}
              </span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={handleReconnect}
          disabled={reconnectState === 'reconnecting'}
          className="mt-4 w-full h-[48px] rounded-full bg-[#0B5F73] hover:bg-[#084958] disabled:opacity-75 text-white font-['Figtree'] font-bold text-[15px] flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
        >
          {reconnectState === 'connected' ? (
            <>
              <Check className="w-4 h-4 stroke-[2.6]" />
              <span>Return to live Today view</span>
            </>
          ) : (
            <>
              <RotateCw
                className={`w-4 h-4 ${reconnectState === 'reconnecting' ? 'animate-spin' : ''}`}
                strokeWidth={2.3}
              />
              <span>{reconnectState === 'reconnecting' ? 'Reconnecting…' : 'Reconnect'}</span>
            </>
          )}
        </button>
      </section>

      {/* Fewer kicks than usual safety card */}
      <section
        aria-label="Reduced fetal movements safety notice"
        className="w-full bg-[#FBE3E0] rounded-[20px] p-4"
      >
        <h2 className="font-['Figtree'] font-bold text-[15px] text-[#7A1712] leading-snug">
          Fewer kicks than usual?
        </h2>
        <p className="font-['Noto_Sans'] text-[13.5px] text-[#7A1712] leading-snug mt-1">
          Call your maternity unit now. Don&apos;t wait for a band session.
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setShowKickCounter((prev) => !prev)}
            aria-expanded={showKickCounter}
            className="h-[44px] px-3 rounded-full bg-white hover:bg-white/90 text-[#7A1712] font-['Figtree'] font-bold text-[14px] flex items-center justify-center transition-all active:scale-[0.98] cursor-pointer shadow-2xs"
          >
            Count kicks
          </button>

          <button
            type="button"
            onClick={onOpenHelp}
            className="h-[44px] px-3 rounded-full bg-[#B3261E] hover:bg-[#991f18] text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center transition-all active:scale-[0.98] cursor-pointer shadow-xs"
          >
            Call unit
          </button>
        </div>

        {showKickCounter && (
          <div
            data-testid="band-inline-kick-counter"
            className="mt-3 pt-3 border-t border-[#7A1712]/15 flex items-center justify-between gap-2"
          >
            <div>
              <span className="font-['Figtree'] font-extrabold text-[18px] text-[#7A1712] tabular-nums">
                {kickCount} {kickCount === 1 ? 'kick' : 'kicks'}
              </span>
              <p className="font-['Noto_Sans'] text-[12px] text-[#7A1712]/80">
                Tap each time you feel baby move
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {kickCount > 0 && (
                <button
                  type="button"
                  onClick={() => setKickCount(0)}
                  className="h-9 px-3 rounded-full bg-white/75 text-[#7A1712] font-['Figtree'] font-bold text-[12px] hover:bg-white cursor-pointer"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setKickCount((c) => c + 1)}
                className="h-9 px-3.5 rounded-full bg-[#7A1712] text-white font-['Figtree'] font-bold text-[12.5px] inline-flex items-center gap-1 hover:bg-[#5e110d] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.6]" />
                <span>Log kick</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
