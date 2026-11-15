import React from 'react';
import { 
  X, 
  Menu, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Clock, 
  AlertTriangle,
  PlaySquare,
  Shield,
  Layers,
  Smartphone
} from 'lucide-react';
import { AppScenario, ScreenTab } from '../types';
import { OnboardingStep } from '../screens/OnboardingFlow';

interface ScenarioSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  // Active states
  currentTab: ScreenTab;
  scenario: AppScenario;
  isClinicPortalActive: boolean;
  currentAuthScreen: OnboardingStep | 'authenticated';
  // Scenario actions
  onSelectAuthStep: (step: OnboardingStep) => void;
  onSelectPatientTab: (tab: ScreenTab) => void;
  onSelectScenario: (scen: AppScenario) => void;
  onOpenHelp: () => void;
  onToggleClinicPortal: () => void;
  // Flag to care actions
  onOpenWhatToDo: () => void;
  onOpenWhyFlagged: () => void;
  onOpenBookVideo: () => void;
  onOpenCuffTimer: () => void;
  onOpenCuffResult: () => void;
  onOpenVisitDone: () => void;
  onOpenMissedCheck: () => void;
  // Utilities
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onGuestSkip: () => void;
}

export const ScenarioSidebar: React.FC<ScenarioSidebarProps> = ({
  isOpen,
  onToggle,
  currentTab,
  scenario,
  isClinicPortalActive,
  currentAuthScreen,
  onSelectAuthStep,
  onSelectPatientTab,
  onSelectScenario,
  onOpenHelp,
  onToggleClinicPortal,
  onOpenWhatToDo,
  onOpenWhyFlagged,
  onOpenBookVideo,
  onOpenCuffTimer,
  onOpenCuffResult,
  onOpenVisitDone,
  onOpenMissedCheck,
  isPlayingAudio,
  onToggleAudio,
  isDarkMode,
  onToggleDarkMode,
  onGuestSkip,
}) => {
  return (
    <>
      {/* Floating Collapsed Trigger Badge (visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          aria-label="Open Scenarios Sidebar"
          className="fixed top-4 left-4 z-40 px-3.5 py-2 rounded-full bg-white dark:bg-[#15252D] text-[#0B5F73] dark:text-[#6CCBE0] font-['Figtree'] font-extrabold text-[12px] flex items-center gap-2 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
        >
          <Menu className="w-4 h-4" />
          <span>Scenarios & Views</span>
          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
        </button>
      )}

      {/* Dimmed backdrop on mobile when drawer is open */}
      {isOpen && (
        <div 
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Slide-out Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-[#15252D] border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0B5F73] text-white flex items-center justify-center font-['Figtree'] font-black text-[13px] shadow-xs">
              FV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Figtree'] font-black text-[15px] text-[#0F2733] dark:text-white">
                  FirstVisit
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#DDEFF4] dark:bg-[#0B5F73] text-[#0B5F73] dark:text-[#6CCBE0] font-bold text-[9px]">
                  MERN
                </span>
              </div>
              <p className="font-['Noto_Sans'] text-[11px] text-[#475569] dark:text-[#A9B8C0]">
                Prototype Scenario Switcher
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            aria-label="Collapse Scenarios Sidebar"
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Scenario Groups */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left text-xs">
          {/* Guest Mode Direct Access */}
          <div className="p-2.5 rounded-xl bg-[#DCFCE7] dark:bg-emerald-950/40 border border-[#15803D]/30 flex items-center justify-between">
            <div>
              <span className="font-['Figtree'] font-extrabold text-[12px] text-[#15803D] dark:text-emerald-300 block">
                Tester Guest Mode
              </span>
              <span className="font-['Noto_Sans'] text-[11px] text-[#15803D]/80 dark:text-emerald-400">
                Skip straight to home
              </span>
            </div>
            <button
              onClick={() => {
                onGuestSkip();
                if (window.innerWidth < 1024) onToggle();
              }}
              className="px-2.5 py-1 rounded-lg bg-[#15803D] text-white font-['Figtree'] font-bold text-[11px] hover:bg-[#126b33] transition-colors shadow-xs"
            >
              Skip →
            </button>
          </div>

          {/* Group 1: Onboarding & Login (Screens 01-07) */}
          <div>
            <div className="px-1 mb-1.5 flex items-center justify-between">
              <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0]">
                01-07 · Onboarding & Auth
              </span>
              {currentAuthScreen !== 'authenticated' && (
                <span className="w-2 h-2 rounded-full bg-[#0B5F73] animate-pulse" />
              )}
            </div>

            <div className="space-y-1">
              {[
                { id: 'splash', label: '01 · Splash' },
                { id: 'welcome', label: '02 · Welcome' },
                { id: 'signup', label: '03 · Sign up' },
                { id: 'verify', label: '04 · Verify code' },
                { id: 'setup', label: '05 · Choose setup' },
                { id: 'pair', label: '06 · Pair band' },
                { id: 'login', label: '07 · Log in' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectAuthStep(s.id as OnboardingStep);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                    currentAuthScreen === s.id
                      ? 'bg-[#0B5F73] text-white shadow-xs'
                      : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{s.label}</span>
                  {currentAuthScreen === s.id && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2: Core Patient App */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-slate-400 dark:text-slate-500 px-1 mb-1.5 block">
              Core Patient App
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onSelectScenario('home_week31');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'today' && scenario === 'home_week31'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  <span>Home (Week 31)</span>
                </div>
                <span className="text-[9px] opacity-70">Day 4</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('track');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'track'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>11 · Track</span>
                <span className="text-[9px] opacity-70">Kicks & Band</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('journey');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'journey'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>31 · Baby Journey</span>
                <span className="text-[9px] opacity-70">AI Montage</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('care');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'care'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>12 · Care</span>
                <span className="text-[9px] opacity-70">Plan & Vitamins</span>
              </button>

              <button
                onClick={() => {
                  onSelectPatientTab('family');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && currentTab === 'family'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>13 · Family</span>
                <span className="text-[9px] opacity-70">Ahmed husband</span>
              </button>

              <button
                onClick={() => {
                  onOpenHelp();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between bg-[#B3261E] text-white hover:bg-[#8F1D17] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>14 · Help</span>
                </div>
                <span className="text-[9px] text-white/80">Call 998</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('critical_alert');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && scenario === 'critical_alert'
                    ? 'bg-[#B3261E] text-white shadow-xs'
                    : 'text-[#B3261E] hover:bg-red-50 dark:hover:bg-red-950/30'
                }`}
              >
                <span>BP Alert (162/112)</span>
                <span className="text-[9px] opacity-80">Urgent</span>
              </button>

              <button
                onClick={() => {
                  onSelectScenario('early_pregnancy');
                  onSelectPatientTab('today');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] flex items-center justify-between transition-colors ${
                  currentAuthScreen === 'authenticated' && !isClinicPortalActive && scenario === 'early_pregnancy'
                    ? 'bg-[#0B5F73] text-white shadow-xs'
                    : 'text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>Early Pregnancy</span>
                <span className="text-[9px] opacity-70">Week 9</span>
              </button>
            </div>
          </div>

          {/* Group 3: From Flag to Care Loop (Screens 19-25) */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-[#0B5F73] dark:text-[#6CCBE0] px-1 mb-1.5 block">
              19-25 · Flag to Care Loop
            </span>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenWhatToDo();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                19 · What to do now
              </button>

              <button
                onClick={() => {
                  onOpenWhyFlagged();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                20 · Why we flagged this
              </button>

              <button
                onClick={() => {
                  onOpenBookVideo();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                21 · Book a video check
              </button>

              <button
                onClick={() => {
                  onOpenCuffTimer();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                22 · Cuff rest timer (3:00)
              </button>

              <button
                onClick={() => {
                  onOpenCuffResult();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#475569] dark:text-[#A9B8C0] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                23 · Cuff check: 138/88
              </button>

              <button
                onClick={() => {
                  onOpenVisitDone();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#15803D] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
              >
                24 · Visit done (5 dots)
              </button>

              <button
                onClick={() => {
                  onOpenMissedCheck();
                  if (window.innerWidth < 1024) onToggle();
                }}
                className="w-full px-2.5 py-1.5 rounded-lg font-['Figtree'] font-bold text-[11px] text-left text-[#F2A541] hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
              >
                25 · Missed check (Reschedule)
              </button>
            </div>
          </div>

          {/* Group 4: Doctor Station */}
          <div>
            <span className="font-['Figtree'] font-extrabold uppercase tracking-wider text-[10px] text-slate-400 dark:text-slate-500 px-1 mb-1.5 block">
              Clinic App
            </span>

            <button
              onClick={() => {
                onToggleClinicPortal();
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full px-2.5 py-2 rounded-xl font-['Figtree'] font-bold text-[12px] flex items-center justify-between transition-colors border ${
                isClinicPortalActive
                  ? 'bg-[#0B5F73] text-white border-[#0B5F73] shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-[#0B5F73] dark:text-[#6CCBE0] border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>Dr. Noura Clinic View</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Utilities (Sound & Dark Mode) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-[#F1F6F8]/60 dark:bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl border transition-colors ${
                isPlayingAudio
                  ? 'bg-[#0B5F73] text-white border-[#0B5F73]'
                  : 'bg-white dark:bg-slate-800 text-[#475569] dark:text-[#A9B8C0] border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle authentic 138 bpm fetal Doppler audio"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-[#F2A541] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 text-[#475569] dark:text-[#A9B8C0] border border-slate-200 dark:border-slate-700 hover:text-[#0F2733] dark:hover:text-white transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#F2A541]" /> : <Moon className="w-4 h-4 text-[#0B5F73]" />}
            </button>
          </div>

          <span className="font-['Figtree'] font-extrabold text-[11px] text-slate-400">
            FirstVisit v1.4
          </span>
        </div>
      </aside>
    </>
  );
};
