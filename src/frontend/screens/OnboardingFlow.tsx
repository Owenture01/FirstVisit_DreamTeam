import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Activity, 
  Watch, 
  Check, 
  Scan, 
  Volume2, 
  Type, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  Lock,
  Calendar,
  Smartphone,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export type OnboardingStep = 
  | 'splash' 
  | 'welcome' 
  | 'signup' 
  | 'verify' 
  | 'setup' 
  | 'pair' 
  | 'login';

interface OnboardingFlowProps {
  initialStep?: OnboardingStep;
  onComplete: () => void;
  onGuestSkip: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  initialStep = 'splash',
  onComplete,
  onGuestSkip,
}) => {
  const [step, setStep] = useState<OnboardingStep>(initialStep);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  // Sign up form state (Screen 03)
  const [fullName, setFullName] = useState('Mariam Khalid');
  const [countryCode, setCountryCode] = useState('+971');
  const [mobileNumber, setMobileNumber] = useState('50 123 4821');
  const [dueDate, setDueDate] = useState('2027-01-12');
  const [shareReadings, setShareReadings] = useState(true);
  const [shareHealthRecord, setShareHealthRecord] = useState(true);
  const [shareGenome, setShareGenome] = useState(false);

  // Verification code state (Screen 04)
  const [otp, setOtp] = useState(['4', '8', '2', '', '', '']);
  const [resendTimer, setResendTimer] = useState(24);

  // Setup options (Screen 05)
  const [setupType, setSetupType] = useState<'band_watch' | 'cuff' | 'text'>('band_watch');
  const [readAloud, setReadAloud] = useState(true);
  const [largerText, setLargerText] = useState(false);

  // Login state (Screen 07)
  const [loginPhone, setLoginPhone] = useState('50 123 4821');
  const [loginPassword, setLoginPassword] = useState('••••••••••');
  const [isFaceIdScanning, setIsFaceIdScanning] = useState(false);

  // Auto transition for splash (Screen 01) if left untouched
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('welcome');
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Resend countdown for verify (Screen 04)
  useEffect(() => {
    if (step === 'verify' && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, resendTimer]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      // Auto focus next
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSimulateFaceId = () => {
    setIsFaceIdScanning(true);
    setTimeout(() => {
      setIsFaceIdScanning(false);
      onComplete();
    }, 1200);
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between text-left relative min-h-[580px]">
      {/* Universal Floating Guest Skip Banner for Testers */}
      <div className="absolute top-1 right-1 z-30">
        <button
          onClick={onGuestSkip}
          className="px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-[#0B5F73] dark:text-[#6CCBE0] hover:bg-slate-200 font-['Figtree'] font-extrabold text-[10px] flex items-center gap-1 shadow-xs border border-slate-200 dark:border-slate-700 backdrop-blur-xs transition-all hover:scale-102"
        >
          <UserCheck className="w-3 h-3 text-[#15803D]" />
          <span>Guest Mode · Skip to Home →</span>
        </button>
      </div>

      {/* =========================================================================
          SCREEN 01 · SPLASH
          ========================================================================= */}
      {step === 'splash' && (
        <div 
          onClick={() => setStep('welcome')}
          className="flex-1 -m-4 sm:-m-5 bg-[#0B5F73] text-white flex flex-col items-center justify-between p-8 cursor-pointer select-none animate-in fade-in duration-300"
        >
          <div className="w-full flex justify-end pt-2">
            <span className="text-[11px] text-white/60 font-['Figtree']">Tap to begin</span>
          </div>

          <div className="flex flex-col items-center justify-center my-auto">
            {/* White squircle icon with heartbeat */}
            <div className="w-22 h-22 rounded-[28px] bg-white flex items-center justify-center shadow-2xl mb-6 relative hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <Heart className="w-11 h-11 text-[#F2A541] fill-[#F2A541]" />
                <Activity className="w-6 h-6 text-[#0B5F73] stroke-[3] absolute" />
              </div>
            </div>

            <h1 className="font-['Figtree'] font-black text-[34px] tracking-tight text-white mb-2">
              FirstVisit
            </h1>
            <p className="font-['Noto_Sans'] text-[14px] text-[#DDEFF4] text-center max-w-xs">
              Maternal & fetal continuous monitoring
            </p>
          </div>

          {/* 3 Pagination dots */}
          <div className="flex items-center gap-2 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <div className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 02 · WELCOME
          ========================================================================= */}
      {step === 'welcome' && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-200">
          <div>
            {/* Top brand & Arabic toggle */}
            <div className="flex items-center justify-between px-1 mb-3">
              <span className="font-['Figtree'] font-extrabold text-[17px] text-[#0F2733] dark:text-white">
                FirstVisit
              </span>

              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2733] dark:text-white font-['Noto_Sans_Arabic'] font-bold text-[13px] flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                {language === 'en' ? 'ع' : 'EN'}
              </button>
            </div>

            {/* Radar / Heartbeat Concentric Graphic Card */}
            <div className="w-full bg-[#0B5F73] text-white rounded-[26px] p-6 relative overflow-hidden shadow-sm flex flex-col items-center justify-center min-h-[260px] my-2">
              {/* Concentric radar circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 rounded-full border border-white/10" />
                <div className="absolute w-40 h-40 rounded-full border border-white/15" />
                <div className="absolute w-24 h-24 rounded-full bg-white/10 backdrop-blur-xs" />
              </div>

              {/* Pulsating heart in center */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#F2A541] flex items-center justify-center shadow-lg animate-pulse">
                <Heart className="w-7 h-7 text-[#6E4100] fill-[#6E4100]" />
              </div>

              {/* Orbit Pill 1: Top Left - Heartbeat 138 */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-['Figtree'] font-bold text-[12px] shadow-xs">
                Heartbeat 138
              </div>

              {/* Orbit Pill 2: Right - Kicks 9 */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-['Figtree'] font-bold text-[12px] shadow-xs">
                Kicks 9
              </div>

              {/* Orbit Pill 3: Bottom Left - BP check due */}
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-['Figtree'] font-bold text-[12px] shadow-xs">
                BP check due
              </div>
            </div>

            {/* Headline and Copy */}
            <div className="px-1 mt-4">
              <h2 className="font-['Figtree'] font-extrabold text-[24px] text-[#0F2733] dark:text-white leading-tight">
                Your pregnancy, looked after between visits
              </h2>
              <p className="font-['Noto_Sans'] text-[14px] text-[#475569] dark:text-[#A9B8C0] mt-2 leading-relaxed">
                Band, app and your care team in one place.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4">
            <button
              onClick={() => setStep('signup')}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Create account
            </button>

            <button
              onClick={() => setStep('login')}
              className="w-full min-h-[44px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#0F2733] dark:text-white font-['Figtree'] font-bold text-[15px] rounded-full flex items-center justify-center transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 03 · SIGN UP (Step 1 of 3)
          ========================================================================= */}
      {step === 'signup' && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-200">
          <div>
            {/* Top Bar with back */}
            <button
              onClick={() => setStep('welcome')}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2733] dark:text-white flex items-center justify-center mb-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="font-['Figtree'] font-extrabold text-[24px] text-[#0F2733] dark:text-white leading-tight">
              Create account
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0]">
              Step 1 of 3
            </p>

            {/* Inputs */}
            <div className="space-y-3.5 mt-4">
              <div>
                <label className="block font-['Figtree'] font-bold text-[12px] text-[#0F2733] dark:text-white mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] focus:outline-hidden focus:border-[#0B5F73]"
                />
              </div>

              <div>
                <label className="block font-['Figtree'] font-bold text-[12px] text-[#0F2733] dark:text-white mb-1">
                  Mobile number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-20 px-3 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] text-center"
                  />
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] focus:outline-hidden focus:border-[#0B5F73]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Figtree'] font-bold text-[12px] text-[#0F2733] dark:text-white mb-1">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] focus:outline-hidden focus:border-[#0B5F73]"
                />
              </div>

              {/* Data Sharing Checkboxes */}
              <div className="pt-2">
                <span className="block font-['Figtree'] font-bold text-[13px] text-[#0F2733] dark:text-white mb-2">
                  You choose what is shared
                </span>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBFDFE] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <span className="font-['Noto_Sans'] text-[13px] text-[#0F2733] dark:text-white">
                      Readings with my clinic
                    </span>
                    <input
                      type="checkbox"
                      checked={shareReadings}
                      onChange={(e) => setShareReadings(e.target.checked)}
                      className="w-4 h-4 accent-[#0B5F73]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBFDFE] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <span className="font-['Noto_Sans'] text-[13px] text-[#0F2733] dark:text-white">
                      My health record
                    </span>
                    <input
                      type="checkbox"
                      checked={shareHealthRecord}
                      onChange={(e) => setShareHealthRecord(e.target.checked)}
                      className="w-4 h-4 accent-[#0B5F73]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBFDFE] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <span className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0]">
                      My genome results (optional)
                    </span>
                    <input
                      type="checkbox"
                      checked={shareGenome}
                      onChange={(e) => setShareGenome(e.target.checked)}
                      className="w-4 h-4 accent-[#0B5F73]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <div className="pt-4 space-y-2">
            <button
              onClick={() => setStep('verify')}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Continue
            </button>

            <button
              onClick={() => setStep('login')}
              className="w-full py-2 text-center font-['Figtree'] font-bold text-[13px] text-[#0B5F73] dark:text-[#6CCBE0] hover:underline"
            >
              I already have an account
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 04 · VERIFY CODE
          ========================================================================= */}
      {step === 'verify' && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-200">
          <div>
            <button
              onClick={() => setStep('signup')}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2733] dark:text-white flex items-center justify-center mb-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="font-['Figtree'] font-extrabold text-[24px] text-[#0F2733] dark:text-white leading-tight">
              Enter the code
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0] mt-1">
              Sent by SMS to {countryCode} {mobileNumber}
            </p>

            {/* 6 OTP Boxes */}
            <div className="flex items-center justify-between gap-2 mt-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  placeholder={idx >= 3 ? '•' : ''}
                  className="w-12 h-14 rounded-xl bg-[#F1F6F8] dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-center font-['Figtree'] font-black text-[22px] text-[#0F2733] dark:text-white focus:border-[#0B5F73] focus:outline-hidden"
                />
              ))}
            </div>

            {/* Resend status */}
            <div className="mt-4">
              {resendTimer > 0 ? (
                <span className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0]">
                  Resend in 0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                </span>
              ) : (
                <button
                  onClick={() => setResendTimer(30)}
                  className="font-['Figtree'] font-bold text-[13px] text-[#0B5F73] dark:text-[#6CCBE0] hover:underline"
                >
                  Resend code now
                </button>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep('setup')}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 05 · CHOOSE YOUR SETUP (Step 2 of 3)
          ========================================================================= */}
      {step === 'setup' && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-200">
          <div>
            <button
              onClick={() => setStep('verify')}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2733] dark:text-white flex items-center justify-center mb-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="font-['Figtree'] font-extrabold text-[24px] text-[#0F2733] dark:text-white leading-tight">
              How do you want to check in?
            </h2>
            <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
              Step 2 of 3 · you can change this later
            </p>

            {/* Setup Choice Tiles */}
            <div className="space-y-3 mt-4">
              {/* Option 1: Band, watch and app */}
              <div
                onClick={() => setSetupType('band_watch')}
                className={`p-4 rounded-[18px] border-2 cursor-pointer transition-all ${
                  setupType === 'band_watch'
                    ? 'border-[#0B5F73] bg-[#DDEFF4]/30 dark:bg-[#0B5F73]/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B5F73] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Watch className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] dark:text-white">
                      Band, watch and app
                    </h3>
                    <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                      Most complete. Clinic can lend a band.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 2: Cuff and app */}
              <div
                onClick={() => setSetupType('cuff')}
                className={`p-4 rounded-[18px] border-2 cursor-pointer transition-all ${
                  setupType === 'cuff'
                    ? 'border-[#0B5F73] bg-[#DDEFF4]/30 dark:bg-[#0B5F73]/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F6F8] dark:bg-slate-700 text-[#0B5F73] dark:text-[#6CCBE0] flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] dark:text-white">
                      Cuff and app
                    </h3>
                    <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                      BP checks and kicks, no wearables
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 3: Text messages only */}
              <div
                onClick={() => setSetupType('text')}
                className={`p-4 rounded-[18px] border-2 cursor-pointer transition-all ${
                  setupType === 'text'
                    ? 'border-[#0B5F73] bg-[#DDEFF4]/30 dark:bg-[#0B5F73]/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F6F8] dark:bg-slate-700 text-[#0B5F73] dark:text-[#6CCBE0] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] dark:text-white">
                      Text messages only
                    </h3>
                    <p className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0] mt-0.5">
                      Any phone. Reply with your numbers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Toggles */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-['Figtree'] font-bold text-[13px] text-[#0F2733] dark:text-white">
                  <Volume2 className="w-4 h-4 text-[#0B5F73]" />
                  <span>Read aloud</span>
                </span>
                <button
                  type="button"
                  onClick={() => setReadAloud(!readAloud)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    readAloud ? 'bg-[#0B5F73]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    readAloud ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-['Figtree'] font-bold text-[13px] text-[#0F2733] dark:text-white">
                  <Type className="w-4 h-4 text-[#0B5F73]" />
                  <span>Larger text</span>
                </span>
                <button
                  type="button"
                  onClick={() => setLargerText(!largerText)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    largerText ? 'bg-[#0B5F73]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    largerText ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep('pair')}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 06 · PAIR BAND ... (Step 3 of 3)
          ========================================================================= */}
      {step === 'pair' && (
        <div className="flex-1 flex flex-col justify-between py-2 text-center animate-in fade-in duration-200">
          <div>
            <span className="font-['Noto_Sans'] text-[13px] text-[#475569] dark:text-[#A9B8C0]">
              Step 3 of 3
            </span>

            {/* Giant Teal Connected Check Badge */}
            <div className="w-24 h-24 rounded-full bg-[#0B5F73] text-white flex items-center justify-center mx-auto my-6 shadow-xl animate-in zoom-in-50 duration-300">
              <Check className="w-12 h-12 stroke-[3]" />
            </div>

            <h2 className="font-['Figtree'] font-black text-[26px] text-[#0F2733] dark:text-white leading-tight">
              Band connected
            </h2>
            <p className="font-['Noto_Sans'] text-[14px] text-[#475569] dark:text-[#A9B8C0] mt-1">
              You can wear it now
            </p>

            {/* Hardware Status Rows */}
            <div className="w-full max-w-xs mx-auto space-y-2.5 mt-8 text-left">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] dark:text-white">
                  Bump band
                </span>
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] font-['Figtree'] font-bold text-[12px] flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" /> Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                <span className="font-['Figtree'] font-bold text-[15px] text-[#0F2733] dark:text-white">
                  Watch
                </span>
                <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] font-['Figtree'] font-bold text-[12px] flex items-center gap-1">
                  <Check className="w-3 h-3 stroke-[3]" /> Connected
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onComplete}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Start
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN 07 · LOG IN
          ========================================================================= */}
      {step === 'login' && (
        <div className="flex-1 flex flex-col justify-between py-2 animate-in fade-in duration-200">
          <div>
            <button
              onClick={() => setStep('welcome')}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2733] dark:text-white flex items-center justify-center mb-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="font-['Figtree'] font-extrabold text-[24px] text-[#0F2733] dark:text-white leading-tight">
              Welcome back
            </h2>

            <div className="space-y-3.5 mt-5">
              <div>
                <label className="block font-['Figtree'] font-bold text-[12px] text-[#0F2733] dark:text-white mb-1">
                  Mobile number
                </label>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] flex items-center">
                    +971
                  </span>
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] focus:outline-hidden focus:border-[#0B5F73]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Figtree'] font-bold text-[12px] text-[#0F2733] dark:text-white mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[14px] bg-[#F1F6F8] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0F2733] dark:text-white font-['Figtree'] font-medium text-[15px] focus:outline-hidden focus:border-[#0B5F73]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-['Figtree'] font-bold text-[12px] text-[#0B5F73] dark:text-[#6CCBE0] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={onComplete}
              className="w-full min-h-[48px] bg-[#0B5F73] hover:bg-[#084958] text-white font-['Figtree'] font-extrabold text-[16px] rounded-full flex items-center justify-center transition-all shadow-sm"
            >
              Log in
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="font-['Noto_Sans'] text-[11px] text-[#475569] dark:text-[#A9B8C0]">or</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Face ID Button */}
            <button
              onClick={handleSimulateFaceId}
              className="w-full min-h-[44px] rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F2733] dark:text-white font-['Figtree'] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Scan className={`w-4 h-4 text-[#0B5F73] dark:text-[#6CCBE0] ${isFaceIdScanning ? 'animate-spin' : ''}`} />
              <span>{isFaceIdScanning ? 'Scanning Face ID...' : 'Use Face ID'}</span>
            </button>

            <button
              onClick={() => setStep('signup')}
              className="w-full py-1.5 text-center font-['Figtree'] font-bold text-[13px] text-[#475569] dark:text-[#A9B8C0] hover:text-[#0B5F73]"
            >
              New here? Create account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
