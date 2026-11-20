import { Router, type Request, type Response } from 'express';

export const vitalsRouter = Router();

// GET current latest vitals for patient
vitalsRouter.get('/current/:patientId', (req: Request, res: Response) => {
  const { patientId } = req.params;
  
  res.json({
    patientId,
    timestamp: new Date().toISOString(),
    fetal: {
      heartRate: 138,
      status: 'normal',
      isLive: true,
      lastKickRecorded: '14:20'
    },
    maternal: {
      heartRate: 88,
      heartRateStatus: 'normal',
      bloodPressureSystolic: 128,
      bloodPressureDiastolic: 82,
      bloodPressureStatus: 'normal',
      sleepHours: 5.2,
      stressLevel: 'Moderate'
    },
    wearables: [
      { name: 'Bump Band', battery: 82, status: 'connected' },
      { name: 'Watch', battery: 64, status: 'connected' }
    ]
  });
});

// POST telemetry stream packet from Bump Band or Watch
vitalsRouter.post('/telemetry', (req: Request, res: Response) => {
  const { deviceType, reading } = req.body;
  res.status(201).json({
    status: 'recorded',
    deviceType,
    processedAt: new Date().toISOString()
  });
});
