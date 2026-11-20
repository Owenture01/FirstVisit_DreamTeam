/**
 * Types for Mother & Child Health Tracking and Wearables
 */

export type ScreenTab = 'today' | 'track' | 'journey' | 'care' | 'family';

export type AppScenario =
  | 'home_week31'
  | 'critical_alert'
  | 'early_pregnancy'
  | 'band_disconnected'
  | 'offline'
  | 'postpartum_day5';

export type VitalStatus = 'normal' | 'review' | 'urgent' | 'good' | 'calm' | 'missed';

export interface WearableDevice {
  id: string;
  name: 'Bump Band' | 'Watch';
  type: 'bump_band' | 'smartwatch';
  battery: number;
  status: 'connected' | 'syncing' | 'offline' | 'later';
  lastSync: string;
  signalStrength: number; // 0-100%
  sensorHealth: 'good' | 'check_placement' | 'idle';
}

export interface BabyVitals {
  heartRate: number; // bpm (typically 120-160 for normal fetus)
  isLive: boolean;
  status: VitalStatus;
  statusLabel: string;
  kickCountToday: number;
  lastKickTime?: string;
  kickGoal: number;
  stageNote?: string;
}

export interface MotherVitals {
  heartRate: number; // bpm
  heartRateStatus: VitalStatus;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  bloodPressureStatus: VitalStatus;
  sleepHours?: number;
  sleepStatus?: VitalStatus;
  stressLevel?: 'Low' | 'Moderate' | 'High';
  stressStatus?: VitalStatus;
  lastUpdated: string;
  nextStep: {
    title: string;
    actionLabel: string;
    actionType: 'remind' | 'safe' | 'done' | 'custom';
    completed?: boolean;
  };
}

export interface CriticalAlert {
  id: string;
  active: boolean;
  title: string;
  reading: string;
  time: string;
  description: string;
  doctorName: string;
  emergencyNumber: string;
  hospitalName: string;
}

export interface HanaTip {
  id: string;
  title: string;
  message: string;
  type: 'sleep' | 'hydration' | 'vitals' | 'kicks' | 'wellness';
  primaryAction: string;
  secondaryAction: string;
  tipDetail: string;
}

export interface Appointment {
  id: string;
  title: string;
  dateStr: string;
  timeStr: string;
  doctor: string;
  clinic: string;
  type: 'ultrasound' | 'telehealth' | 'blood_work' | 'routine';
  location: string;
}
