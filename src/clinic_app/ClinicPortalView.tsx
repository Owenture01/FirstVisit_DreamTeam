import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Activity, 
  Heart, 
  PhoneCall, 
  CheckCircle2, 
  Stethoscope, 
  ShieldAlert,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ClinicPatient } from './types';

interface ClinicPortalViewProps {
  onBackToPatientApp: () => void;
  scenario: 'home_week31' | 'critical_alert' | 'early_pregnancy';
}

export const ClinicPortalView: React.FC<ClinicPortalViewProps> = ({ 
  onBackToPatientApp,
  scenario 
}) => {
  const isCritical = scenario === 'critical_alert';
  const [activeTab, setActiveTab] = useState<'triage' | 'patients' | 'telemetry'>('triage');
  const [acknowledged, setAcknowledged] = useState(false);
  const [doctorNote, setDoctorNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([
    'Previous baseline BP: 124/80 at week 28 checkup.',
    'Uterine artery Doppler within normal reference ranges.'
  ]);

  const patient: ClinicPatient = {
    id: 'PT-9942',
    name: 'Mariam Al-Mansoor',
    gestationalWeek: isCritical ? 31 : scenario === 'early_pregnancy' ? 9 : 31,
    gestationalDay: isCritical ? 4 : scenario === 'early_pregnancy' ? 2 : 4,
    bloodPressure: isCritical ? '162/112' : scenario === 'early_pregnancy' ? '118/76' : '128/82',
    fetalHeartRate: 138,
    maternalHeartRate: isCritical ? 104 : scenario === 'early_pregnancy' ? 82 : 88,
    triageStatus: isCritical ? 'urgent' : 'normal',
    assignedDoctor: 'Dr. Noura Al-Hashemi, OB/GYN',
    hospitalUnit: 'Maternity Triage & Fetal Assessment Center',
    wearablesConnected: {
      bumpBand: scenario !== 'early_pregnancy',
      watch: true,
    },
    lastTelemetryTimestamp: isCritical ? 'Just now (21:10:44)' : '5 minutes ago',
    notes: savedNotes
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorNote.trim()) return;
    setSavedNotes(prev => [doctorNote.trim(), ...prev]);
    setDoctorNote('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-4 text-[#0F2733]">
      {/* Clinic Header Bar */}
      <div className="bg-[#0B5F73] text-white p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
            <Stethoscope className="w-6 h-6" strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-['Figtree'] font-bold text-lg">FirstVisit Clinical Portal</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#15803D] text-white font-medium">
                Hospital Telemetry Live
              </span>
            </div>
            <p className="text-xs text-[#DDEFF4]">
              Physician Station · {patient.assignedDoctor} ({patient.hospitalUnit})
            </p>
          </div>
        </div>

        <button
          onClick={onBackToPatientApp}
          className="px-4 py-2 bg-white text-[#0B5F73] text-xs font-bold rounded-full hover:bg-[#DDEFF4] transition-colors flex items-center gap-1.5"
        >
          <span>Return to Mobile App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-[#F1F6F8] px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('triage')}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
              activeTab === 'triage' ? 'bg-[#0B5F73] text-white' : 'text-[#475569] hover:text-[#0F2733]'
            }`}
          >
            {isCritical && (
              <span className="inline-block w-2 h-2 rounded-full bg-[#B3261E] mr-1.5 animate-pulse"></span>
            )}
            Triage & Telemetry
          </button>
          <button 
            onClick={() => setActiveTab('patients')}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
              activeTab === 'patients' ? 'bg-[#0B5F73] text-white' : 'text-[#475569] hover:text-[#0F2733]'
            }`}
          >
            Patient Record & History
          </button>
        </div>
        <div className="text-xs text-[#475569] flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Sync interval: Real-time (WebSocket)</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Critical Emergency Banner if in critical alert scenario */}
        {isCritical && (
          <div className="mb-6 p-4 rounded-xl bg-[#FBE3E0] border border-[#B3261E]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B3261E] text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-['Figtree'] font-bold text-[#B3261E] text-base">
                    PRIORITY 1 ALERT: Stage 2 Gestational Hypertension Detected
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#B3261E] text-white font-bold">
                    URGENT
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-0.5">
                  Patient reported reading: <span className="font-bold text-[#B3261E]">162/112 mmHg</span> at 21:10. Dual device verification confirmed via Bump Band & Watch.
                </p>
                <p className="text-xs text-[#1E293B] font-medium mt-1">
                  Patient prompt sent: "Sit and rest. Don't drive." Triage ambulance protocol 998 primed.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setAcknowledged(true)}
                disabled={acknowledged}
                className={`px-4 py-2 text-xs font-bold rounded-full flex items-center gap-1.5 transition-colors ${
                  acknowledged 
                    ? 'bg-[#15803D] text-white cursor-default' 
                    : 'bg-[#B3261E] text-white hover:bg-[#8F1D17]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {acknowledged ? 'Acknowledged by Dr. Noura' : 'Acknowledge Triage'}
              </button>
              <button
                onClick={() => alert('Initiating direct secure physician call to Mariam (PT-9942)...')}
                className="px-3 py-2 text-xs font-bold rounded-full bg-white border border-[#B3261E] text-[#B3261E] hover:bg-[#FBE3E0] flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call Patient
              </button>
            </div>
          </div>
        )}

        {/* Patient Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1: Patient demographics */}
          <div className="p-4 rounded-xl bg-[#F1F6F8] border border-slate-200">
            <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Patient Details</span>
            <div className="mt-2">
              <div className="font-['Figtree'] font-extrabold text-lg text-[#0F2733]">{patient.name}</div>
              <div className="text-xs text-[#475569]">ID: {patient.id} · Age: 29</div>
              <div className="mt-2 text-xs font-bold text-[#0B5F73]">
                Gestational Age: Week {patient.gestationalWeek}, Day {patient.gestationalDay}
              </div>
            </div>
          </div>

          {/* Card 2: Fetal status */}
          <div className="p-4 rounded-xl bg-[#F1F6F8] border border-slate-200">
            <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Fetal Heart Rate (Bump Band)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-['Figtree'] font-extrabold text-2xl text-[#0B5F73]">
                {scenario === 'early_pregnancy' ? 'Pending (Wk 14)' : `${patient.fetalHeartRate} bpm`}
              </span>
              {scenario !== 'early_pregnancy' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] font-bold">
                  ✓ Reassuring
                </span>
              )}
            </div>
            <p className="text-xs text-[#475569] mt-1">
              Baseline: 135–142 bpm · Accelerations present
            </p>
          </div>

          {/* Card 3: Maternal Vitals */}
          <div className="p-4 rounded-xl bg-[#F1F6F8] border border-slate-200">
            <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Maternal BP & Pulse</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`font-['Figtree'] font-extrabold text-2xl ${isCritical ? 'text-[#B3261E]' : 'text-[#0F2733]'}`}>
                {patient.bloodPressure}
              </span>
              <span className="text-xs text-[#475569]">mmHg</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                isCritical 
                  ? 'bg-[#FBE3E0] text-[#B3261E]' 
                  : 'bg-[#15803D]/10 text-[#15803D]'
              }`}>
                {isCritical ? '! High alert' : '✓ Normal'}
              </span>
            </div>
            <p className="text-xs text-[#475569] mt-1">
              Maternal Pulse: <span className="font-bold">{patient.maternalHeartRate} bpm</span> · {patient.lastTelemetryTimestamp}
            </p>
          </div>
        </div>

        {/* Doctor Clinical Notes Section */}
        <div className="border border-slate-200 rounded-xl p-4 bg-[#FBFDFE]">
          <h4 className="font-['Figtree'] font-bold text-sm text-[#0F2733] mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0B5F73]" />
            Physician Clinical Notes & Action Log (Noura)
          </h4>

          <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
            <input
              type="text"
              value={doctorNote}
              onChange={(e) => setDoctorNote(e.target.value)}
              placeholder="Add observation or protocol instruction for patient..."
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B5F73]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B5F73] text-white text-xs font-bold rounded-lg hover:bg-[#084857] transition-colors"
            >
              Save Note
            </button>
          </form>

          <div className="space-y-2">
            {savedNotes.map((note, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-100 text-xs text-[#0F2733] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B5F73] mt-1.5 shrink-0"></span>
                <span className="flex-1">{note}</span>
                <span className="text-[10px] text-[#475569]">Dr. Noura</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
