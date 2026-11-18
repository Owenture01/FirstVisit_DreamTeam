/**
 * FirstVisit - Mother & Child Health Tracker (MERN Mobile Web Architecture)
 * Complete implementation following design tokens (image_beffec35.png) and layouts (image_1d641382.png)
 */

import React, { useEffect, useState } from 'react';
import { 
  Moon, 
  Sun, 
  Stethoscope, 
  Volume2, 
  VolumeX, 
  Heart,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MobileLayout } from './frontend/components/MobileLayout';
import { BottomNav } from './frontend/components/BottomNav';
import { HomeScreen } from './frontend/screens/HomeScreen';
import { TrackScreen } from './frontend/screens/TrackScreen';
import { JourneyScreen } from './frontend/screens/JourneyScreen';
import { CareScreen } from './frontend/screens/CareScreen';
import { FamilyScreen } from './frontend/screens/FamilyScreen';
import { EmergencyModal, EmergencyContextInfo } from './frontend/components/EmergencyModal';
import { HardwareSheet } from './frontend/components/HardwareSheet';
import { HanaChatSheet, HanaView } from './frontend/components/HanaChatSheet';
import { WhatToDoSheet } from './frontend/components/sheets/WhatToDoSheet';
import { WhyWeFlaggedSheet } from './frontend/components/sheets/WhyWeFlaggedSheet';
import { BookVideoCheckSheet } from './frontend/components/sheets/BookVideoCheckSheet';
import { CuffRestTimerSheet } from './frontend/components/sheets/CuffRestTimerSheet';
import { CuffResultSheet } from './frontend/components/sheets/CuffResultSheet';
import { MissedCheckSheet } from './frontend/components/sheets/MissedCheckSheet';
import { ClinicPortalView } from './clinic_app/ClinicPortalView';
import { ScenarioSidebar } from './frontend/components/ScenarioSidebar';
import { LockScreenNotification, LockScreenMode } from './frontend/components/LockScreenNotification';
import { PhoneHomeScreen } from './frontend/components/PhoneHomeScreen';
import { OnboardingFlow, OnboardingStep } from './frontend/screens/OnboardingFlow';
import { ScreenTab, AppScenario } from './frontend/types';
import { fetalAudio } from './frontend/utils/fetalSound';
import { emergencyAlarm } from './frontend/utils/emergencyAlarm';
import {
  INITIAL_TODAY_DOSES,
  TodayDoseItem,
  markDoseTaken,
  toggleDoseStatus,
} from './frontend/utils/careMedicines';
import {
  DEFAULT_DUE_DATE,
  DEFAULT_SIMULATED_DATE,
  calculateGestationalProgress,
  getDateForGestationalWeek,
} from './frontend/utils/gestationalAge';

export default function App() {
  // Navigation & Scenario States
  const [currentTab, setCurrentTab] = useState<ScreenTab>('today');
  const [scenario, setScenario] = useState<AppScenario>('home_week31');
  const [isClinicPortalActive, setIsClinicPortalActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMidwifeChecking, setIsMidwifeChecking] = useState(false);
  const [isVideoBooked, setIsVideoBooked] = useState(false);
  const [isCareVisitDone, setIsCareVisitDone] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLockScreenOpen, setIsLockScreenOpen] = useState(false);
  const [lockScreenMode, setLockScreenMode] = useState<LockScreenMode>('morning');
  const [lockScreenTriggerKey, setLockScreenTriggerKey] = useState(0);
  const [isPhoneHomeOpen, setIsPhoneHomeOpen] = useState(false);
  const [phoneHomeTriggerKey, setPhoneHomeTriggerKey] = useState(0);
  const [todayDoses, setTodayDoses] = useState<TodayDoseItem[]>(INITIAL_TODAY_DOSES);
  const [currentAuthScreen, setCurrentAuthScreen] = useState<OnboardingStep | 'authenticated'>('authenticated');

  // Progressive Baby Size Companion Date Simulation State
  const [dueDate, setDueDate] = useState<string>(DEFAULT_DUE_DATE);
  const [simulatedDate, setSimulatedDate] = useState<string>(DEFAULT_SIMULATED_DATE);
  const {
    gestationalWeek,
    gestationalDay,
    daysRemaining,
  } = calculateGestationalProgress(simulatedDate, dueDate);

  // Modal Sheet States
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyContext, setEmergencyContext] = useState<EmergencyContextInfo | null>(null);
  const [showHardwareSheet, setShowHardwareSheet] = useState(false);
  const [showHanaChat, setShowHanaChat] = useState(false);
  const [hanaInitialView, setHanaInitialView] = useState<HanaView>('daily');
  const [showWhatToDoSheet, setShowWhatToDoSheet] = useState(false);
  const [showWhyWeFlaggedSheet, setShowWhyWeFlaggedSheet] = useState(false);
  const [showBookVideoSheet, setShowBookVideoSheet] = useState(false);
  const [showCuffTimerSheet, setShowCuffTimerSheet] = useState(false);
  const [showCuffResultSheet, setShowCuffResultSheet] = useState(false);
  const [showMissedCheckSheet, setShowMissedCheckSheet] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAlarmMuted, setIsAlarmMuted] = useState<boolean>(emergencyAlarm.getState().isMuted);

  const isCriticalAlertView =
    currentAuthScreen === 'authenticated' &&
    !isClinicPortalActive &&
    currentTab === 'today' &&
    scenario === 'critical_alert';

  const isEmergencyActive = isCriticalAlertView || showEmergencyModal;

  useEffect(() => {
    const unsubscribe = emergencyAlarm.subscribe((_playing, muted) => {
      setIsAlarmMuted(muted);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isEmergencyActive) {
      if (fetalAudio.getIsPlaying()) {
        fetalAudio.stop();
        setIsPlayingAudio(false);
      }
      emergencyAlarm.start();
    } else {
      emergencyAlarm.stop();
    }
    return () => {
      emergencyAlarm.stop();
    };
  }, [isEmergencyActive]);

  const toggleAudio = () => {
    fetalAudio.toggle(138, (playing) => {
      setIsPlayingAudio(playing);
    });
  };

  const handleScenarioChange = (newScenario: AppScenario) => {
    setScenario(newScenario);
    setIsClinicPortalActive(false);
    setIsCareVisitDone(false);
    if (newScenario === 'early_pregnancy') {
      setSimulatedDate(getDateForGestationalWeek(dueDate, 9, 2));
    } else if (newScenario === 'home_week31') {
      setSimulatedDate(getDateForGestationalWeek(dueDate, 31, 4));
    }
    if (newScenario === 'critical_alert') {
      setCurrentTab('today');
    }
  };

  const closeAllSheets = () => {
    setShowWhatToDoSheet(false);
    setShowWhyWeFlaggedSheet(false);
    setShowBookVideoSheet(false);
    setShowCuffTimerSheet(false);
    setShowCuffResultSheet(false);
    setShowMissedCheckSheet(false);
    setShowEmergencyModal(false);
    setShowHanaChat(false);
    setIsLockScreenOpen(false);
    setIsPhoneHomeOpen(false);
  };

  const handleOpenLockScreen = (mode: LockScreenMode = 'morning') => {
    closeAllSheets();
    setIsClinicPortalActive(false);
    setCurrentAuthScreen('authenticated');
    setScenario('home_week31');
    setSimulatedDate(getDateForGestationalWeek(dueDate, 31, 4));
    setCurrentTab('today');
    setLockScreenMode(mode);
    setLockScreenTriggerKey((prev) => prev + 1);
    setIsLockScreenOpen(true);
  };

  const handleOpenPhoneHomeScreen = () => {
    closeAllSheets();
    setIsClinicPortalActive(false);
    setCurrentAuthScreen('authenticated');
    setScenario('home_week31');
    setSimulatedDate(getDateForGestationalWeek(dueDate, 31, 4));
    setCurrentTab('today');
    setPhoneHomeTriggerKey((prev) => prev + 1);
    setIsPhoneHomeOpen(true);
  };

  const handleToggleDose = (doseId: string) => {
    setTodayDoses((prev) => toggleDoseStatus(prev, doseId));
  };

  const handleMarkDoseTaken = (doseId: string) => {
    setTodayDoses((prev) => markDoseTaken(prev, doseId));
  };

  const handleOpenHana = () => {
    setHanaInitialView('daily');
    setShowHanaChat(true);
  };

  return (
    <div className={`min-h-screen w-full transition-colors ${
      isDarkMode ? 'dark bg-[#0E1A20] text-[#F1F6F8]' : 'bg-[#EBF1F4] text-[#0F2733]'
    } flex flex-col items-center justify-start p-0 sm:p-4 selection:bg-[#0B5F73] selection:text-white relative`}>
      
      {/* Dedicated Collapsible Scenario Sidebar Drawer */}
      <ScenarioSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentTab={currentTab}
        scenario={scenario}
        isClinicPortalActive={isClinicPortalActive}
        isLockScreenOpen={isLockScreenOpen}
        lockScreenMode={lockScreenMode}
        isPhoneHomeOpen={isPhoneHomeOpen}
        currentAuthScreen={currentAuthScreen}
        onSelectAuthStep={(step) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen(step);
        }}
        onOpenLockScreen={() => handleOpenLockScreen('morning')}
        onOpenRoutineLockScreen={() => handleOpenLockScreen('routine')}
        onOpenPhoneHomeScreen={handleOpenPhoneHomeScreen}
        onOpenHanaView={(view) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
          setHanaInitialView(view);
          setShowHanaChat(true);
        }}
        onSelectPatientTab={(tab) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
          if (tab === 'care') {
            setIsCareVisitDone(false);
          }
          setCurrentTab(tab);
        }}
        onSelectScenario={(scen) => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
          handleScenarioChange(scen);
        }}
        onOpenHelp={() => {
          setIsLockScreenOpen(false);
          setCurrentAuthScreen('authenticated');
          setShowEmergencyModal(true);
        }}
        onToggleClinicPortal={() => {
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(!isClinicPortalActive);
        }}
        onOpenWhatToDo={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowWhatToDoSheet(true);
        }}
        onOpenWhyFlagged={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowWhyWeFlaggedSheet(true);
        }}
        onOpenBookVideo={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowBookVideoSheet(true);
        }}
        onOpenCuffTimer={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowCuffTimerSheet(true);
        }}
        onOpenCuffResult={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowCuffResultSheet(true);
        }}
        onOpenVisitDone={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(false);
          setIsCareVisitDone(true);
          setCurrentTab('care');
        }}
        onOpenMissedCheck={() => {
          closeAllSheets();
          setCurrentAuthScreen('authenticated');
          setIsMidwifeChecking(true);
          setIsVideoBooked(true);
          handleScenarioChange('home_week31');
          setCurrentTab('today');
          setShowMissedCheckSheet(true);
        }}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onGuestSkip={() => {
          closeAllSheets();
          setIsClinicPortalActive(false);
          setCurrentAuthScreen('authenticated');
        }}
        simulatedDate={simulatedDate}
        dueDate={dueDate}
        gestationalWeek={gestationalWeek}
        gestationalDay={gestationalDay}
        daysRemaining={daysRemaining}
        onSimulatedDateChange={(nextDate) => {
          setSimulatedDate(nextDate);
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(false);
        }}
        onDueDateChange={(nextDue) => {
          setDueDate(nextDue);
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(false);
        }}
        onSelectWeek={(week) => {
          setSimulatedDate(getDateForGestationalWeek(dueDate, week, 0));
          setCurrentAuthScreen('authenticated');
          setIsClinicPortalActive(false);
          if (scenario === 'critical_alert') {
            setScenario('home_week31');
          }
        }}
        onResetDateSimulation={() => {
          setDueDate(DEFAULT_DUE_DATE);
          setSimulatedDate(DEFAULT_SIMULATED_DATE);
          setScenario('home_week31');
        }}
      />

      {/* Main Workspace Display (Clean Edge-to-Edge Mobile Container) */}
      {isClinicPortalActive ? (
        /* Doctor Triage Station View (Clinic App) */
        <div className="w-full animate-in fade-in duration-300">
          <ClinicPortalView 
            scenario={scenario}
            onBackToPatientApp={() => setIsClinicPortalActive(false)}
          />
        </div>
      ) : (
        /* Mobile Web App View (Clean Mobile Layout) */
        <MobileLayout 
          isDark={isDarkMode}
          isCritical={isCriticalAlertView}
          bottomNav={
            currentAuthScreen === 'authenticated' ? (
              <BottomNav
                currentTab={currentTab}
                onTabChange={(tab) => setCurrentTab(tab)}
              />
            ) : undefined
          }
          overlay={
            <>
              <HanaChatSheet
                isOpen={showHanaChat}
                onClose={() => setShowHanaChat(false)}
                onOpenHelp={(ctx) => {
                  setEmergencyContext(ctx ?? null);
                  setShowHanaChat(false);
                  setShowEmergencyModal(true);
                }}
                gestationalWeek={gestationalWeek}
                gestationalDay={gestationalDay}
                loggedMedications={todayDoses.map((d) => ({
                  name: d.name,
                  time: d.time,
                  status: d.status,
                  badgeText: d.badgeText,
                }))}
                vitals={{
                  bp: scenario === 'critical_alert' ? '162/112' : '128/82',
                  heartRate: scenario === 'critical_alert' ? 104 : 88,
                  fetalHeartRate: 138,
                }}
                initialView={hanaInitialView}
              />
              <LockScreenNotification
                isOpen={isLockScreenOpen}
                triggerKey={lockScreenTriggerKey}
                mode={lockScreenMode}
                gestationalWeek={gestationalWeek}
                onMarkDoseTaken={handleMarkDoseTaken}
                onUnlockComplete={() => {
                  setIsLockScreenOpen(false);
                  setCurrentTab('today');
                }}
              />
              <PhoneHomeScreen
                isOpen={isPhoneHomeOpen}
                triggerKey={phoneHomeTriggerKey}
                gestationalWeek={gestationalWeek}
                onMarkDoseTaken={handleMarkDoseTaken}
                onLaunchFirstVisit={() => {
                  setIsPhoneHomeOpen(false);
                  setCurrentTab('today');
                }}
              />
            </>
          }
        >
          {/* Active Screen View */}
          {currentAuthScreen !== 'authenticated' ? (
            <OnboardingFlow
              initialStep={currentAuthScreen}
              dueDate={dueDate}
              onDueDateChange={(nextDue) => setDueDate(nextDue)}
              onComplete={() => setCurrentAuthScreen('authenticated')}
              onGuestSkip={() => setCurrentAuthScreen('authenticated')}
            />
          ) : (
            <main className="flex-1 flex flex-col">
              {currentTab === 'today' && (
                <HomeScreen
                  scenario={scenario}
                  gestationalWeek={gestationalWeek}
                  gestationalDay={gestationalDay}
                  daysRemaining={daysRemaining}
                  dueDate={dueDate}
                  isMidwifeChecking={isMidwifeChecking}
                  isVideoBooked={isVideoBooked}
                  isAlarmMuted={isAlarmMuted}
                  onToggleAlarmMute={() => emergencyAlarm.toggleMute()}
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={handleOpenHana}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  onOpenHardwareSheet={() => setShowHardwareSheet(true)}
                  onOpenFirstScanDetails={() => setCurrentTab('care')}
                  onOpenWhyWeFlagged={() => {
                    closeAllSheets();
                    setShowWhyWeFlaggedSheet(true);
                  }}
                  onOpenWhatToDo={() => {
                    closeAllSheets();
                    setShowWhatToDoSheet(true);
                  }}
                  onMarkDoseTaken={handleMarkDoseTaken}
                />
              )}

              {currentTab === 'track' && (
                <TrackScreen
                  gestationalWeek={gestationalWeek}
                  gestationalDay={gestationalDay}
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={handleOpenHana}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  onOpenHardwareSheet={() => setShowHardwareSheet(true)}
                />
              )}

              {currentTab === 'journey' && (
                <JourneyScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={handleOpenHana}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                />
              )}

              {currentTab === 'care' && (
                <CareScreen
                  gestationalWeek={gestationalWeek}
                  gestationalDay={gestationalDay}
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={handleOpenHana}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                  isVisitDone={isCareVisitDone}
                  todayDoses={todayDoses}
                  onToggleDose={handleToggleDose}
                />
              )}

              {currentTab === 'family' && (
                <FamilyScreen
                  onOpenHelp={() => setShowEmergencyModal(true)}
                  onOpenHana={handleOpenHana}
                  onOpenProfile={() => setShowHardwareSheet(true)}
                />
              )}
            </main>
          )}
        </MobileLayout>
      )}

      {/* Interactive Overlays & Sheets */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => {
          setShowEmergencyModal(false);
          setEmergencyContext(null);
        }}
        currentBP={scenario === 'critical_alert' ? '162/112' : '128/82'}
        isCriticalBP={scenario === 'critical_alert'}
        isAlarmMuted={isAlarmMuted}
        onToggleMute={() => emergencyAlarm.toggleMute()}
        emergencyContext={emergencyContext}
      />

      <HardwareSheet
        isOpen={showHardwareSheet}
        onClose={() => setShowHardwareSheet(false)}
        bumpBandBattery={scenario === 'early_pregnancy' ? 0 : 82}
        watchBattery={scenario === 'early_pregnancy' ? 71 : 64}
      />

      {/* Flag to Care Sheets (Screens 19-25) */}
      <WhatToDoSheet
        isOpen={showWhatToDoSheet}
        onClose={() => setShowWhatToDoSheet(false)}
        onCall998={() => {
          setShowWhatToDoSheet(false);
          setShowEmergencyModal(true);
        }}
        onAppointmentBooked={() => {
          setIsVideoBooked(true);
        }}
      />

      <WhyWeFlaggedSheet
        isOpen={showWhyWeFlaggedSheet}
        onClose={() => setShowWhyWeFlaggedSheet(false)}
        onPickATime={() => {
          setShowWhyWeFlaggedSheet(false);
          setShowBookVideoSheet(true);
        }}
      />

      <BookVideoCheckSheet
        isOpen={showBookVideoSheet}
        onClose={() => setShowBookVideoSheet(false)}
        onBookingConfirmed={() => {
          setIsVideoBooked(true);
        }}
      />

      <CuffRestTimerSheet
        isOpen={showCuffTimerSheet}
        onClose={() => setShowCuffTimerSheet(false)}
        onCompleteRest={() => {
          setShowCuffTimerSheet(false);
          setShowCuffResultSheet(true);
        }}
      />

      <CuffResultSheet
        isOpen={showCuffResultSheet}
        onClose={() => setShowCuffResultSheet(false)}
        onAnswerNo={() => {
          setShowCuffResultSheet(false);
        }}
        onAnswerYes={() => {
          setShowCuffResultSheet(false);
          setShowEmergencyModal(true);
        }}
      />

      <MissedCheckSheet
        isOpen={showMissedCheckSheet}
        onClose={() => setShowMissedCheckSheet(false)}
        onRebooked={() => {
          setIsVideoBooked(true);
        }}
        onAskAhmed={() => {
          setShowMissedCheckSheet(false);
          setCurrentTab('family');
        }}
      />
    </div>
  );
}
