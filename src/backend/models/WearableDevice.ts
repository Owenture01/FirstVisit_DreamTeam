/**
 * Mongoose Schema Draft: WearableDevice
 * Dual device management: Bump Band & Smart Watch pairing
 */

export interface IWearableDevice {
  deviceId: string;
  patientId: string;
  deviceType: 'bump_band' | 'watch';
  hardwareSerial: string;
  firmwareVersion: string;
  batteryPercentage: number;
  connectionState: 'connected' | 'syncing' | 'disconnected' | 'charging';
  lastPing: Date;
  bluetoothRssi: number;
  sensorCalibration: {
    ultrasonicAcousticGain: number;
    ppgSignalQuality: number;
    accelerometerCalibrated: boolean;
  };
}

export const WearableDeviceSchemaDefinition = {
  deviceId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true, index: true },
  deviceType: { type: String, enum: ['bump_band', 'watch'], required: true },
  hardwareSerial: { type: String, required: true },
  firmwareVersion: { type: String, default: 'v2.4.1' },
  batteryPercentage: { type: Number, min: 0, max: 100 },
  connectionState: { type: String, enum: ['connected', 'syncing', 'disconnected', 'charging'], default: 'connected' },
  lastPing: { type: Date, default: Date.now },
  bluetoothRssi: { type: Number, default: -62 }
};
