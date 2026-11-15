/**
 * Mongoose Schema Draft: MotherProfile
 * Stores maternal patient record, estimated due date, assigned clinic OB/GYN
 */

export interface IMotherProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  pregnancyStartDate: Date;
  estimatedDueDate: Date;
  gestationalWeek: number;
  gestationalDay: number;
  assignedDoctor: {
    name: string;
    clinic: string;
    phone: string;
  };
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  baselineVitals: {
    restingHeartRate: number;
    systolicBP: number;
    diastolicBP: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const MotherProfileSchemaDefinition = {
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  pregnancyStartDate: { type: Date, required: true },
  estimatedDueDate: { type: Date, required: true },
  gestationalWeek: { type: Number, default: 4 },
  gestationalDay: { type: Number, default: 0 },
  assignedDoctor: {
    name: { type: String, default: 'Dr. Noura Al-Hashemi' },
    clinic: { type: String, default: 'Maternity Triage & Fetal Assessment Center' },
    phone: { type: String, default: '+971-4-555-0199' },
  },
  emergencyContacts: [
    {
      name: String,
      relationship: String,
      phone: String,
    }
  ],
  baselineVitals: {
    restingHeartRate: { type: Number, default: 75 },
    systolicBP: { type: Number, default: 118 },
    diastolicBP: { type: Number, default: 78 },
  }
};
