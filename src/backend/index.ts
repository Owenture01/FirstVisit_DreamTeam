import express from 'express';
import { vitalsRouter } from './routes/vitals.ts';
import { alertsRouter } from './routes/alerts.ts';
import { companionRouter } from './routes/companion.ts';

export const backendApp = express();

backendApp.use(express.json());

// Health check endpoint for deployment probes
backendApp.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API route registrations
backendApp.use('/api/vitals', vitalsRouter);
backendApp.use('/api/alerts', alertsRouter);
backendApp.use('/api/companion', companionRouter);

export { MotherProfileSchemaDefinition, type IMotherProfile } from './models/MotherProfile.ts';
export { VitalsLogSchemaDefinition, type IVitalsLog } from './models/VitalsLog.ts';
export { WearableDeviceSchemaDefinition, type IWearableDevice } from './models/WearableDevice.ts';
export { EmergencyAlertSchemaDefinition, type IEmergencyAlert } from './models/EmergencyAlert.ts';
