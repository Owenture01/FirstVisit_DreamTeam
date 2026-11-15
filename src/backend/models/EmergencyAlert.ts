/**
 * Mongoose Schema Draft: EmergencyAlert
 * Records critical thresholds (e.g. Systolic BP > 160 or Diastolic > 110)
 * dispatches notifications to clinic doctor (Dr. Noura) and emergency triage (998)
 */

export interface IEmergencyAlert {
  alertId: string;
  patientId: string;
  timestamp: Date;
  severity: 'urgent' | 'review';
  triggerCondition: 'severe_hypertension' | 'fetal_bradycardia' | 'reduced_fetal_movement';
  readingSummary: string;
  doctorNotified: boolean;
  hospitalNotified: boolean;
  patientAcknowledged: boolean;
  emergencyDispatchPrimed: boolean;
  resolvedAt?: Date;
  resolutionNotes?: string;
}

export const EmergencyAlertSchemaDefinition = {
  alertId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  severity: { type: String, enum: ['urgent', 'review'], required: true },
  triggerCondition: { type: String, required: true },
  readingSummary: { type: String, required: true },
  doctorNotified: { type: Boolean, default: true },
  hospitalNotified: { type: Boolean, default: true },
  patientAcknowledged: { type: Boolean, default: false },
  emergencyDispatchPrimed: { type: Boolean, default: false },
  resolvedAt: Date,
  resolutionNotes: String
};
