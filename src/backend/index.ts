import express from 'express';
import { vitalsRouter } from './routes/vitals';
import { alertsRouter } from './routes/alerts';
import { companionRouter } from './routes/companion';

export const backendApp = express();

backendApp.use(express.json());

// API route registrations
backendApp.use('/api/vitals', vitalsRouter);
backendApp.use('/api/alerts', alertsRouter);
backendApp.use('/api/companion', companionRouter);

export * from './models/MotherProfile';
export * from './models/VitalsLog';
export * from './models/WearableDevice';
export * from './models/EmergencyAlert';
