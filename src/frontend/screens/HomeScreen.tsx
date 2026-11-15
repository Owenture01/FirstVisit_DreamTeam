import React from 'react';
import { Header } from '../components/Header';
import { BabyHeartbeatCard } from '../components/BabyHeartbeatCard';
import { MotherVitalsCard } from '../components/MotherVitalsCard';
import { WearableStatusPill } from '../components/WearableStatusPill';
import { HanaCompanion } from '../components/HanaCompanion';
import { CriticalAlertBanner } from '../components/CriticalAlertBanner';
import { FirstScanCard } from '../components/FirstScanCard';
import { MidwifeTriageBanner } from '../components/MidwifeTriageBanner';
import { AppScenario } from '../types';

interface HomeScreenProps {
  scenario: AppScenario;
  isMidwifeChecking?: boolean;
  isVideoBooked?: boolean;
  onOpenHelp: () => void;
  onOpenHana: () => void;
  onOpenProfile: () => void;
  onOpenHardwareSheet: () => void;
  onOpenFirstScanDetails: () => void;
  onOpenWhyWeFlagged?: () => void;
  onOpenWhatToDo?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  scenario,
  isMidwifeChecking = false,
  isVideoBooked = false,
  onOpenHelp,
  onOpenHana,
  onOpenProfile,
  onOpenHardwareSheet,
  onOpenFirstScanDetails,
  onOpenWhyWeFlagged = () => {},
  onOpenWhatToDo = () => {},
}) => {
  const isEarly = scenario === 'early_pregnancy';
  const isCritical = scenario === 'critical_alert';

  return (
    <div className="w-full flex flex-col space-y-3.5 pb-6">
      {/* Top Header */}
      <Header
        gestationalWeek={isEarly ? 9 : 31}
        gestationalDay={isEarly ? 2 : 4}
        motherInitials="M"
        onOpenHelp={onOpenHelp}
        onOpenHana={onOpenHana}
        onOpenProfile={onOpenProfile}
      />

      {/* Screen 2: Critical Alert View */}
      {isCritical && (
        <>
          {/* Urgent Red Banner */}
          <CriticalAlertBanner
            bloodPressure="162/112"
            time="21:10"
            doctorName="Noura"
            onCall998={onOpenHelp}
            onHospitalDirections={onOpenHelp}
          />

          {/* Mother Vitals with High HR and Urgent BP */}
          <MotherVitalsCard
            heartRate={104}
            heartRateStatus="urgent"
            bloodPressure="162/112"
            bloodPressureStatus="urgent"
            timeAgo="Just now"
            nextStepTitle="Sit and rest. Don't drive."
            nextStepAction="I'm safe"
            nextStepType="safe"
            onNextStepAction={() => {
              alert("Safety status confirmed and dispatched to Dr. Noura's clinic console.");
            }}
          />

          {/* Compact Baby's Heartbeat card */}
          <BabyHeartbeatCard
            bpm={138}
            compact={true}
            statusText="Normal"
            onCardClick={onOpenHana}
          />

          {/* Wearables status */}
          <WearableStatusPill
            bumpBandBattery={82}
            bumpBandStatus="connected"
            watchBattery={64}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />
        </>
      )}

      {/* Screen 3: Early Pregnancy View (Week 9) */}
      {isEarly && (
        <>
          {/* Baby's heartbeat: month 4 or 5 card */}
          <BabyHeartbeatCard
            bpm={0}
            isEarlyPregnancy={true}
            onCardClick={onOpenHardwareSheet}
          />

          {/* First scan card */}
          <FirstScanCard
            title="First scan"
            dateTime="Thu 21 Nov · 9:00"
            onDetailsClick={onOpenFirstScanDetails}
          />

          {/* Mother Vitals with Extended Sleep & Stress */}
          <MotherVitalsCard
            heartRate={82}
            heartRateStatus="normal"
            bloodPressure="118/76"
            bloodPressureStatus="normal"
            timeAgo="5 min ago"
            showExtendedMetrics={true}
            sleepHours={7}
            stressLevel="Low"
            nextStepTitle="Folic acid with breakfast"
            nextStepAction="Done"
            nextStepType="done"
            onNextStepAction={() => {
              alert("Folic acid (400 mcg) recorded as taken today.");
            }}
          />

          {/* Wearables status (Bump Band later, Watch 71%) */}
          <WearableStatusPill
            bumpBandBattery={0}
            bumpBandStatus="later"
            watchBattery={71}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />
        </>
      )}

      {/* Screen 1 / Screens 19-23: Week 31 Home & Flag-to-Care View */}
      {!isCritical && !isEarly && (
        <>
          {/* Hero Baby's Heartbeat card */}
          <BabyHeartbeatCard
            bpm={138}
            isLive={true}
            statusText="Normal"
            onCardClick={onOpenHana}
          />

          {/* Clinical Triage Flag Flow Banner (Screens 19-23, 25) */}
          {isMidwifeChecking ? (
            <MidwifeTriageBanner
              currentStep={isVideoBooked ? 'booked' : 'midwife'}
              isBooked={isVideoBooked}
              onOpenWhyWeFlagged={onOpenWhyWeFlagged}
              onOpenWhatToDo={onOpenWhatToDo}
            />
          ) : (
            /* Standard Vitals & Next Step */
            <MotherVitalsCard
              heartRate={88}
              heartRateStatus="normal"
              bloodPressure="128/82"
              bloodPressureStatus="normal"
              timeAgo="5 min ago"
              nextStepTitle="Cuff check at 20:00"
              nextStepAction="Remind me"
              nextStepType="remind"
              onNextStepAction={() => {
                alert("Reminder set for cuff blood pressure check at 20:00.");
              }}
            />
          )}

          {/* Dual Wearables Sync Status */}
          <WearableStatusPill
            bumpBandBattery={82}
            bumpBandStatus="connected"
            watchBattery={64}
            watchStatus="connected"
            onOpenHardwareSheet={onOpenHardwareSheet}
          />

          {/* Proactive Hana AI Helper Mascot Card (when not in full triage sheet) */}
          {!isMidwifeChecking && (
            <HanaCompanion
              title="Hana · AI helper"
              message="Only 5 h of sleep. Want a tip?"
              primaryAction="Yes please"
              secondaryAction="Later"
              onYesPlease={onOpenHana}
              onLater={() => {
                console.log("Tip snoozed");
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
