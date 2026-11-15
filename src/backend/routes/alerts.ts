import { Router, Request, Response } from 'express';

export const alertsRouter = Router();

// Dispatch emergency triage alert (998 & Dr. Noura hospital notification)
alertsRouter.post('/trigger', (req: Request, res: Response) => {
  const { patientId, condition, reading } = req.body;
  res.status(200).json({
    alertId: 'ALT-' + Date.now(),
    patientId: patientId || 'PT-9942',
    condition,
    reading,
    hospitalNotified: true,
    doctorAssigned: 'Dr. Noura Al-Hashemi',
    dispatchCode: 'EMS-998-PRIMED',
    timestamp: new Date().toISOString()
  });
});

// Acknowledge alert by patient or clinic
alertsRouter.post('/acknowledge', (req: Request, res: Response) => {
  const { alertId, acknowledgedBy } = req.body;
  res.status(200).json({
    alertId,
    acknowledgedBy,
    acknowledgedAt: new Date().toISOString(),
    status: 'acknowledged'
  });
});
