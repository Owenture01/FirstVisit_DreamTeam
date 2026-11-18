import React, { useEffect, useState } from 'react';
import { Check, Heart, Lock, Unlock } from 'lucide-react';
import { HanaAvatar } from './HanaAvatar';

interface LockScreenNotificationProps {
  isOpen: boolean;
  triggerKey: number;
  onUnlockComplete: () => void;
}

type NotificationPhase = 'waiting' | 'visible' | 'dismissed';
type UnlockPhase = 'locked' | 'face_scanning' | 'face_verified' | 'sliding_up';

export const LockScreenNotification: React.FC<LockScreenNotificationProps> = ({
  isOpen,
  triggerKey,
  onUnlockComplete,
}) => {
  const [notificationPhase, setNotificationPhase] =
    useState<NotificationPhase>('waiting');
  const [unlockPhase, setUnlockPhase] = useState<UnlockPhase>('locked');
  const timersRef = React.useRef<number[]>([]);

  const clearUnlockTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    clearUnlockTimers();

    if (!isOpen) {
      setNotificationPhase('waiting');
      setUnlockPhase('locked');
      return;
    }

    setNotificationPhase('waiting');
    setUnlockPhase('locked');

    const popTimer = window.setTimeout(() => {
      setNotificationPhase('visible');
    }, 2000);

    return () => {
      window.clearTimeout(popTimer);
      clearUnlockTimers();
    };
  }, [isOpen, triggerKey]);

  const handleLater = () => {
    if (unlockPhase !== 'locked') return;
    setNotificationPhase('dismissed');
  };

  const handleReplyOrUnlock = () => {
    if (unlockPhase !== 'locked') return;

    clearUnlockTimers();
    setUnlockPhase('face_scanning');

    const verifyTimer = window.setTimeout(() => {
      setUnlockPhase('face_verified');
    }, 680);

    const slideTimer = window.setTimeout(() => {
      setUnlockPhase('sliding_up');
    }, 1150);

    const completeTimer = window.setTimeout(() => {
      onUnlockComplete();
    }, 1770);

    timersRef.current = [verifyTimer, slideTimer, completeTimer];
  };

  if (!isOpen) return null;

  const isSlidingUp = unlockPhase === 'sliding_up';
  const showNotificationCard =
    notificationPhase === 'visible' || notificationPhase === 'dismissed';
  const isNotificationFadedOut = notificationPhase === 'dismissed';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="iPhone lock screen notification"
      className={`absolute inset-0 z-[35] flex flex-col justify-between px-4 pt-6 pb-3 select-none bg-gradient-to-b from-[#0B5F73] via-[#27778B] to-[#5B9CAE] text-white transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isSlidingUp ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Lock & iPhone Face ID Dynamic Island Pill */}
      <div className="flex flex-col items-center pt-1 min-h-[42px]">
        {unlockPhase === 'locked' ? (
          <div className="flex items-center justify-center h-7 opacity-85">
            <Lock className="w-4 h-4 text-white" strokeWidth={2.2} />
          </div>
        ) : (
          <div className="h-10 px-4 rounded-full bg-[#09151A]/92 backdrop-blur-md border border-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.35)] flex items-center gap-2.5 animate-lock-pop">
            {unlockPhase === 'face_scanning' ? (
              <>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Face ID corner brackets */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-[#6CCBE0]"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 8V5.5C4 4.67 4.67 4 5.5 4H8M16 4H18.5C19.33 4 20 4.67 20 5.5V8M20 16V18.5C20 19.33 19.33 20 18.5 20H16M8 20H5.5C4.67 20 4 19.33 4 18.5V16"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 9.5V10.5M15 9.5V10.5M12 10V13H11M9.2 15.2C10 16 11 16.4 12 16.4C13 16.4 14 16 14.8 15.2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute inset-x-0.5 h-[2px] bg-[#6CCBE0] rounded-full shadow-[0_0_8px_#6CCBE0] animate-faceid-scan" />
                </div>
                <span className="font-['Figtree'] font-bold text-[13px] text-white tracking-tight">
                  Face ID
                </span>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full bg-[#15803D] text-white flex items-center justify-center animate-in zoom-in-75 duration-200">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Unlock className="w-3.5 h-3.5 text-[#6CCBE0]" strokeWidth={2.2} />
                  <span className="font-['Figtree'] font-bold text-[13px] text-white tracking-tight">
                    Unlocked
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main Lock Screen Clock + Pop-up Notification */}
      <div className="flex-1 flex flex-col items-center pt-5">
        {/* Lock Screen Time & Date */}
        <div className="text-center">
          <div className="font-['Figtree'] font-extrabold text-[64px] leading-none tracking-tight text-white tabular-nums">
            07:45
          </div>
          <p className="font-['Noto_Sans'] text-[16px] text-[#E6F2F5] mt-2">
            Thursday, 12 November
          </p>
        </div>

        {/* Notification Slot (appears after 2s; fades into transparent background on Later) */}
        <div className="w-full mt-11">
          {showNotificationCard && (
            <div
              className={`w-full transition-all duration-500 ease-out ${
                isNotificationFadedOut
                  ? 'opacity-0 scale-[0.97] -translate-y-1 pointer-events-none'
                  : 'opacity-100 scale-100 translate-y-0 animate-lock-pop'
              }`}
            >
              {/* Frosted White Notification Card */}
              <div className="w-full rounded-[22px] bg-white/95 backdrop-blur-md p-4 shadow-[0_14px_34px_rgba(6,38,48,0.22)] text-left">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-[22px] h-[22px] rounded-[6px] bg-[#0B5F73] flex items-center justify-center shrink-0">
                      <Heart className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="font-['Figtree'] font-bold text-[13px] text-[#334155]">
                      FirstVisit
                    </span>
                  </div>
                  <span className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                    now
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#DDEFF4]/70 border border-[#DCE5EA] flex items-center justify-center overflow-hidden shrink-0">
                    <HanaAvatar size="sm" animated />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] leading-snug">
                      Hana
                    </h2>
                    <p className="font-['Noto_Sans'] text-[14px] text-[#1E293B] leading-snug mt-0.5">
                      Good morning, Mariam. How did you sleep?
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Reply & Later */}
              <div className="flex items-center justify-center gap-3 mt-4 px-2">
                <button
                  type="button"
                  onClick={handleReplyOrUnlock}
                  disabled={unlockPhase !== 'locked' || isNotificationFadedOut}
                  className="flex-1 max-w-[146px] min-h-[44px] h-11 rounded-full bg-white/95 hover:bg-white text-[#0B5F73] font-['Figtree'] font-bold text-[15px] shadow-[0_6px_18px_rgba(6,38,48,0.14)] active:scale-95 transition-all cursor-pointer disabled:opacity-75"
                >
                  Reply
                </button>

                <button
                  type="button"
                  onClick={handleLater}
                  disabled={unlockPhase !== 'locked' || isNotificationFadedOut}
                  className="flex-1 max-w-[146px] min-h-[44px] h-11 rounded-full bg-white/95 hover:bg-white text-[#0B5F73] font-['Figtree'] font-bold text-[15px] shadow-[0_6px_18px_rgba(6,38,48,0.14)] active:scale-95 transition-all cursor-pointer disabled:opacity-75"
                >
                  Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom iPhone Home Indicator */}
      <div className="flex flex-col items-center pb-1">
        <button
          type="button"
          onClick={handleReplyOrUnlock}
          aria-label="Unlock FirstVisit with Face ID"
          className="min-h-[44px] w-40 flex items-end justify-center pb-1 cursor-pointer group focus:outline-none"
        >
          <span className="w-[124px] h-[4.5px] rounded-full bg-white/75 group-hover:bg-white transition-colors block" />
        </button>
      </div>
    </div>
  );
};
