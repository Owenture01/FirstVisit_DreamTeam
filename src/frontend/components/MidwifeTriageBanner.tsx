import React from 'react';
import { ChevronRight, Zap, Check } from 'lucide-react';

interface MidwifeTriageBannerProps {
  currentStep?: 'flagged' | 'midwife' | 'doctor' | 'booked' | 'seen';
  isBooked?: boolean;
  onOpenWhyWeFlagged: () => void;
  onOpenWhatToDo: () => void;
}

export const MidwifeTriageBanner: React.FC<MidwifeTriageBannerProps> = ({
  currentStep = 'midwife',
  isBooked = false,
  onOpenWhyWeFlagged,
  onOpenWhatToDo,
}) => {
  const steps = [
    { id: 'flagged', label: 'Flagged' },
    { id: 'midwife', label: 'Midwife' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'booked', label: 'Booked' },
  ];

  const getStepIndex = (s: string) => {
    switch (s) {
      case 'flagged': return 0;
      case 'midwife': return 1;
      case 'doctor': return 2;
      case 'booked': return 3;
      case 'seen': return 4;
      default: return 1;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="w-full flex flex-col space-y-2.5 my-1">
      {/* Midwife checking your BP Banner Card */}
      <div 
        onClick={onOpenWhyWeFlagged}
        className="w-full bg-[#FBFDFE] rounded-[20px] p-4 px-4.5 border border-slate-200/90 shadow-xs cursor-pointer hover:border-[#0B5F73]/50 transition-all text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              isBooked ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#92400E]'
            }`}>
              {isBooked ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : '!'}
            </div>
            <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733]">
              {isBooked ? 'Video check booked' : 'Midwife checking your BP'}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#475569]" />
        </div>

        {/* 4-Step Progress Dots & Labels */}
        <div className="mt-3.5 flex items-center justify-between px-2">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-3 h-3 rounded-full transition-all ${
                    isCompleted 
                      ? 'bg-[#0B5F73] ring-4 ring-[#DDEFF4]' 
                      : 'border-2 border-slate-300 bg-white'
                  }`} 
                />
                <span className={`text-[10px] font-['Noto_Sans'] mt-1.5 ${
                  isCurrent ? 'font-bold text-[#0B5F73]' : 'text-[#475569]'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two ways to act now button/strip */}
      <button
        onClick={onOpenWhatToDo}
        className="w-full bg-[#FBFDFE] rounded-[20px] p-3.5 px-4.5 border border-slate-200/90 shadow-xs flex items-center justify-between hover:bg-[#F1F6F8] active:scale-98 transition-all text-left"
      >
        <div className="flex items-center gap-2 text-[#0F2733]">
          <Zap className="w-4 h-4 text-[#F2A541] fill-[#F2A541]" />
          <span className="font-['Figtree'] font-bold text-[14px]">
            Two ways to act now
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-[#475569]" />
      </button>
    </div>
  );
};
