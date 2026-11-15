export interface ClinicPatient {
  id: string;
  name: string;
  gestationalWeek: number;
  gestationalDay: number;
  bloodPressure: string;
  fetalHeartRate: number;
  maternalHeartRate: number;
  triageStatus: 'urgent' | 'review' | 'normal';
  assignedDoctor: string;
  hospitalUnit: string;
  wearablesConnected: {
    bumpBand: boolean;
    watch: boolean;
  };
  lastTelemetryTimestamp: string;
  notes: string[];
}

export interface ClinicAlertEvent {
  id: string;
  patientId: string;
  patientName: string;
  timestamp: string;
  alertType: 'severe_hypertension' | 'fetal_tachycardia' | 'sensor_detached';
  values: string;
  acknowledgedBy?: string;
  actionTaken?: string;
}
