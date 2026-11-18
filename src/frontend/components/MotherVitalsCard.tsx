import React, { useState } from 'react';
import { Check, AlertTriangle, AlertCircle, Clock, Bell, CheckCircle2 } from 'lucide-react';
import { VitalStatus } from '../types';

interface MotherVitalsCardProps {
  heartRate: number;
  heartRateStatus?: VitalStatus;
  bloodPressure: string;
  bloodPressureStatus?: VitalStatus;
  timeAgo?: string;
  nextStepTitle: string;
  nextStepAction: string;
  nextStepType?: 'remind' | 'safe' | 'done' | 'custom';
  showExtendedMetrics?: boolean; // For Screen 3: sleep and stress
  sleepHours?: number;
  stressLevel?: string;
  onNextStepAction?: (type: string) => void;
  onTileClick?: (metric: string) => void;
}

export const MotherVitalsCard: React.FC<MotherVitalsCardProps> = ({
  heartRate = 88,
  heartRateStatus = 'normal',
  bloodPressure = '128/82',
  bloodPressureStatus = 'normal',
  timeAgo = '5 min ago',
  nextStepTitle = 'Cuff check at 20:00',
  nextStepAction = 'Remind me',
  nextStepType = 'remind',
  showExtendedMetrics = false,
  sleepHours = 7,
  stressLevel = 'Low',
  onNextStepAction,
  onTileClick,
}) => {
  const [actionDone, setActionDone] = useState(false);

  const handleAction = () => {
    setActionDone(prev => !prev);
    if (onNextStepAction) onNextStepAction(nextStepType);
  };

  const isUrgentBP = bloodPressureStatus === 'urgent';
  const isHighHR = heartRateStatus === 'review' || heartRateStatus === 'urgent';

  return (
    <div className="w-full bg-[#FBFDFE] rounded-[20px] p-5 border border-slate-200/80 shadow-xs text-left transition-all">
      {/* Header: Title and Timestamp */}
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="font-['Figtree'] font-bold text-[17px] text-[#0F2733]">
          Your vitals
        </h3>
        <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
          {timeAgo}
        </span>
      </div>

      {/* Metric Tiles Grid (radius 18px) */}
      <div className={`grid ${showExtendedMetrics ? 'grid-cols-2 gap-3' : 'grid-cols-2 gap-3.5'}`}>
        {/* Metric 1: Heart Rate */}
        <div 
          onClick={() => onTileClick && onTileClick('heart_rate')}
          className={`p-3.5 rounded-[18px] transition-all cursor-pointer ${
            isHighHR 
              ? 'bg-[#FEF3C7] border border-[#F2A541]/50' 
              : 'bg-[#F1F6F8] hover:bg-[#e7eef1]'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="font-['Noto_Sans'] text-[13px] text-[#475569] font-medium">
              Heart rate
            </span>
            {isHighHR && (
              <span className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                Watch
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="font-['Figtree'] text-[28px] font-[800] text-[#0F2733] tabular-nums leading-none">
              {heartRate}
            </span>
            <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
              bpm
            </span>
          </div>

          {/* Status Badge */}
          {isHighHR ? (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F2A541] text-[#6E4100] text-[11px] font-bold">
              <span>!</span>
              <span>High</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 text-[#15803D] text-[12px] font-semibold">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Normal</span>
            </div>
          )}
        </div>

        {/* Metric 2: Blood Pressure */}
        <div 
          onClick={() => onTileClick && onTileClick('blood_pressure')}
          className={`p-3.5 rounded-[18px] transition-all cursor-pointer ${
            isUrgentBP 
              ? 'animate-bp-critical border-2 border-[#B3261E]' 
              : 'bg-[#F1F6F8] hover:bg-[#e7eef1]'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="font-['Noto_Sans'] text-[13px] text-[#475569] font-medium">
              Blood pressure
            </span>
            {isUrgentBP && (
              <span className="font-['Noto_Sans'] text-[12px] text-[#475569]">
                Cuff
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className={`font-['Figtree'] text-[24px] sm:text-[26px] font-[800] tabular-nums leading-none ${
              isUrgentBP ? 'text-[#B3261E]' : 'text-[#0F2733]'
            }`}>
              {bloodPressure}
            </span>
          </div>

          {/* Status Badge */}
          {isUrgentBP ? (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B3261E] text-white text-[11px] font-bold shadow-xs animate-pulse">
              <span>!</span>
              <span>Very high</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 text-[#15803D] text-[12px] font-semibold">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Normal</span>
            </div>
          )}
        </div>

        {/* Extended metrics for Screen 3: Sleep & Stress */}
        {showExtendedMetrics && (
          <>
            <div 
              onClick={() => onTileClick && onTileClick('sleep')}
              className="p-3.5 rounded-[18px] bg-[#F1F6F8] hover:bg-[#e7eef1] transition-all cursor-pointer"
            >
              <span className="font-['Noto_Sans'] text-[13px] text-[#475569] block font-medium">
                Sleep
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-['Figtree'] text-[28px] font-[800] text-[#0F2733] tabular-nums leading-none">
                  {sleepHours}
                </span>
                <span className="font-['Noto_Sans'] text-[13px] text-[#475569]">
                  h
                </span>
              </div>
              <div className="inline-flex items-center gap-1 text-[#15803D] text-[12px] font-semibold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Good</span>
              </div>
            </div>

            <div 
              onClick={() => onTileClick && onTileClick('stress')}
              className="p-3.5 rounded-[18px] bg-[#F1F6F8] hover:bg-[#e7eef1] transition-all cursor-pointer"
            >
              <span className="font-['Noto_Sans'] text-[13px] text-[#475569] block font-medium">
                Stress
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="font-['Figtree'] text-[26px] font-[800] text-[#0F2733] leading-none">
                  {stressLevel}
                </span>
              </div>
              <div className="inline-flex items-center gap-1 text-[#15803D] text-[12px] font-semibold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Calm</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* NEXT STEP Section */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="font-['Noto_Sans'] text-[11px] font-bold uppercase tracking-wider text-[#475569] block">
            NEXT STEP
          </span>
          <p className="font-['Noto_Sans'] text-[14px] font-semibold text-[#0F2733] truncate mt-0.5">
            {nextStepTitle}
          </p>
        </div>

        <button
          onClick={handleAction}
          aria-label={nextStepAction}
          className={`min-h-[44px] h-11 px-5 rounded-full font-['Figtree'] font-bold text-[14px] shrink-0 flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs ${
            actionDone
              ? 'bg-[#15803D] text-white hover:bg-[#126b33]'
              : 'bg-[#0B5F73] text-white hover:bg-[#084857]'
          }`}
        >
          {actionDone ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>{nextStepType === 'safe' ? 'Acknowledged' : 'Scheduled'}</span>
            </>
          ) : (
            <span>{nextStepAction}</span>
          )}
        </button>
      </div>
    </div>
  );
};
