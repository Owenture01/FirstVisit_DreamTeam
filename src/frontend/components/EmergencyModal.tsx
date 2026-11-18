import React, { useState } from 'react';
import { Phone, X, MapPin, Check, Volume2, VolumeX, AlertTriangle } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName?: string;
  currentBP?: string;
  isCriticalBP?: boolean;
  isAlarmMuted?: boolean;
  onToggleMute?: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentBP = '162/112',
  isCriticalBP = true,
  isAlarmMuted = false,
  onToggleMute,
}) => {
  // Symptom selection state - "Bad headache" is active by default as shown in Screen 14 mockup
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, boolean>>({
    'Bad headache': true,
    'Blurry vision': false,
    'Rib pain': false,
    'Bleeding': false,
    'Fewer kicks': false,
    'Waters broke': false,
  });

  const [callInitiated, setCallInitiated] = useState(false);

  if (!isOpen) return null;

  const toggleSymptom = (name: string) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const symptomsList = [
    'Bad headache',
    'Blurry vision',
    'Rib pain',
    'Bleeding',
    'Fewer kicks',
    'Waters broke',
  ];

  const handleCall998 = () => {
    setCallInitiated(true);
    setTimeout(() => {
      setCallInitiated(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Screen 14 · Help: Dynamic beeping red emergency container */}
      <div className="w-full max-w-[430px] h-full sm:h-auto sm:max-h-[844px] min-h-[640px] animate-emergency-modal text-white rounded-none sm:rounded-[28px] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto relative border border-white/15">
        
        {/* Top bar: Live Critical BP Beeping Status + Sound Mute Toggle + Close */}
        <div className="w-full flex items-center justify-between gap-2 pt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-white/25 text-white text-[12px] font-['Figtree'] font-extrabold tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span className="tabular-nums">
              {isCriticalBP ? `BP ${currentBP} · CRITICAL` : 'EMERGENCY HELP'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleMute && (
              <button
                type="button"
                onClick={onToggleMute}
                aria-label={isAlarmMuted ? 'Unmute emergency alarm beep' : 'Mute emergency alarm beep'}
                title={isAlarmMuted ? 'Unmute emergency beep' : 'Mute emergency beep'}
                className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shadow-xs"
              >
                {isAlarmMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5 animate-pulse" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close emergency screen"
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Top Emergency Actions */}
        <div className="space-y-4 pt-3">
          {/* Call 998 Large White Pill Button */}
          <button
            type="button"
            onClick={handleCall998}
            aria-label="Call 998"
            className="w-full min-h-[54px] h-14 rounded-full bg-white text-[#8B1D16] font-['Figtree'] font-extrabold text-[18px] flex items-center justify-center gap-2.5 shadow-lg active:scale-98 hover:bg-slate-50 transition-all ring-4 ring-white/25"
          >
            <Phone className="w-5 h-5 fill-[#8B1D16]" strokeWidth={0} />
            <span>{callInitiated ? 'Dispatching 998...' : 'Call 998'}</span>
          </button>

          {/* Location estimate text */}
          <div className="flex items-center justify-center gap-1.5 text-white/95 text-[14px] font-['Noto_Sans']">
            <MapPin className="w-4 h-4 fill-white/85" strokeWidth={0} />
            <span>Maternity ER · 12 min</span>
          </div>
        </div>

        {/* Section: What's happening? */}
        <div className="my-6">
          <h2 className="font-['Figtree'] font-bold text-[17px] text-white mb-3 text-left">
            What's happening?
          </h2>

          {/* 2-column symptom pills */}
          <div className="grid grid-cols-2 gap-2.5">
            {symptomsList.map((symptom) => {
              const isSelected = !!selectedSymptoms[symptom];
              return (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`min-h-[46px] h-12 px-4 rounded-full text-center font-['Figtree'] font-bold text-[14px] transition-all flex items-center justify-center shadow-xs ${
                    isSelected
                      ? 'bg-white text-[#8B1D16] shadow-md scale-[1.02]'
                      : 'bg-[#701610]/80 border border-white/20 text-white hover:bg-white/10 active:scale-98'
                  }`}
                >
                  {symptom}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Confirmation Card */}
        <div className="w-full rounded-[20px] bg-black/25 backdrop-blur-xs p-4 border border-white/10 space-y-2 text-left mb-2">
          <div className="flex items-center gap-2.5 text-white text-[14px] font-['Noto_Sans'] font-medium">
            <div className="w-5 h-5 rounded-full bg-[#15803D] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span>Maternity unit alerted</span>
          </div>

          <div className="flex items-center gap-2.5 text-white text-[14px] font-['Noto_Sans'] font-medium">
            <div className="w-5 h-5 rounded-full bg-[#15803D] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span>Ahmed told</span>
          </div>
        </div>

      </div>
    </div>
  );
};
