import React, { useState } from 'react';
import { X, Battery, Wifi, CheckCircle2, RefreshCw, Cpu, Activity, ShieldCheck } from 'lucide-react';

interface HardwareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  bumpBandBattery?: number;
  watchBattery?: number;
}

export const HardwareSheet: React.FC<HardwareSheetProps> = ({
  isOpen,
  onClose,
  bumpBandBattery = 82,
  watchBattery = 64,
}) => {
  const [calibrating, setCalibrating] = useState(false);
  const [calibrated, setCalibrated] = useState(false);

  if (!isOpen) return null;

  const handleRecalibrate = () => {
    setCalibrating(true);
    setTimeout(() => {
      setCalibrating(false);
      setCalibrated(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-t-[28px] shadow-2xl border border-slate-200 overflow-hidden text-left flex flex-col max-h-[85vh]">
        {/* Grab bar */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-3 shrink-0" />

        {/* Header */}
        <div className="px-6 py-2 pb-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <h3 className="font-['Figtree'] font-extrabold text-[19px] text-[#0F2733]">
              Dual Wearables Telemetry
            </h3>
            <p className="font-['Noto_Sans'] text-xs text-[#475569]">
              Bump Band & Smartwatch synchronized sensor stream
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F2733] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Hardware Device 1: Bump Band */}
          <div className="p-4 rounded-[20px] bg-[#F1F6F8] border border-slate-200/80">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B5F73] text-white flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="12" rx="9" ry="5" />
                    <path d="M7 12a5 5 0 0 1 10 0" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-['Figtree'] font-bold text-base text-[#0F2733]">
                      FirstVisit Bump Band
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#15803D] text-white font-bold">
                      Connected
                    </span>
                  </div>
                  <span className="text-xs text-[#475569]">
                    Serial: BB-2026-X8 · Firmware v2.4.1
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#0B5F73]">
                <Battery className="w-4 h-4" />
                <span>{bumpBandBattery}%</span>
              </div>
            </div>

            {/* Sub-sensors inside Bump Band */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Acoustic Doppler Array</span>
                <span className="font-bold text-[#15803D] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3 Nodes Active
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Uterine Kick Sensor</span>
                <span className="font-bold text-[#0B5F73] flex items-center gap-1 mt-0.5">
                  <Activity className="w-3.5 h-3.5" /> High Sensitivity
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Skin Temperature</span>
                <span className="font-bold text-[#0F2733] mt-0.5 block">36.8°C (Optimal)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Contact Impedance</span>
                <span className="font-bold text-[#15803D] mt-0.5 block">98% Couplant Gel</span>
              </div>
            </div>
          </div>

          {/* Hardware Device 2: Smartwatch */}
          <div className="p-4 rounded-[20px] bg-[#F1F6F8] border border-slate-200/80">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-['Figtree'] font-bold text-base text-[#0F2733]">
                      Smart Watch Integration
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#15803D] text-white font-bold">
                      Paired
                    </span>
                  </div>
                  <span className="text-xs text-[#475569]">
                    Apple Watch / Wear OS HealthKit Bridge
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#0B5F73]">
                <Battery className="w-4 h-4" />
                <span>{watchBattery}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Maternal Optical PPG</span>
                <span className="font-bold text-[#15803D] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 88 bpm Continuous
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="text-[#475569] block text-[11px]">Oscillometric BP Link</span>
                <span className="font-bold text-[#0B5F73] mt-0.5 block">BLE 5.2 Auto-Sync</span>
              </div>
            </div>
          </div>

          {/* Recalibrate & Test button */}
          <button
            onClick={handleRecalibrate}
            disabled={calibrating}
            className="w-full h-12 rounded-full bg-[#0B5F73] text-white font-['Figtree'] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#084857] active:scale-98 transition-all shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${calibrating ? 'animate-spin' : ''}`} />
            <span>{calibrating ? 'Running Acoustic Calibration...' : calibrated ? 'Calibration Complete (100%)' : 'Run Dual Sensor Diagnostics'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
