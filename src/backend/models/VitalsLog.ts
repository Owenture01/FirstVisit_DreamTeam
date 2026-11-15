/**
 * Mongoose Schema Draft: VitalsLog
 * High-frequency telemetry log from Bump Band and Watch
 */

export interface IVitalsLog {
  id: string;
  patientId: string;
  sourceDevice: 'bump_band' | 'watch' | 'manual_cuff';
  timestamp: Date;
  
  // Fetal telemetry
  fetalHeartRateBpm?: number;
  fetalMovementKickCount?: number;
  fetalHeartRateQuality?: number; // 0-100%
  
  // Maternal telemetry
  maternalHeartRateBpm?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  sleepDurationMinutes?: number;
  stressIndex?: number; // 1-100
  skinTemperatureCelsius?: number;
  
  // Clinical status flags
  isAnomalous: boolean;
  triagePriority: 'normal' | 'review' | 'urgent';
}

export const VitalsLogSchemaDefinition = {
  patientId: { type: String, required: true, index: true },
  sourceDevice: { type: String, enum: ['bump_band', 'watch', 'manual_cuff'], required: true },
  timestamp: { type: Date, default: Date.now, index: true },
  fetalHeartRateBpm: Number,
  fetalMovementKickCount: Number,
  fetalHeartRateQuality: Number,
  maternalHeartRateBpm: Number,
  bloodPressureSystolic: Number,
  bloodPressureDiastolic: Number,
  sleepDurationMinutes: Number,
  stressIndex: Number,
  skinTemperatureCelsius: Number,
  isAnomalous: { type: Boolean, default: false },
  triagePriority: { type: String, enum: ['normal', 'review', 'urgent'], default: 'normal' }
};
