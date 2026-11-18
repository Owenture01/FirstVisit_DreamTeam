/**
 * Web Audio Clinical Emergency Alarm Synthesizer
 * Generates a realistic urgent medical monitor double-beep pattern
 * for critical maternal hypertension alerts (BP >= 160/110).
 */

class EmergencyAlarmSynthesizer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private timerId: number | null = null;
  private listeners = new Set<(playing: boolean, muted: boolean) => void>();

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.isMuted));
  }

  public subscribe(cb: (playing: boolean, muted: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying, this.isMuted);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {
        // Browser may require a user gesture before resuming audio context
      });
    }
    return this.audioCtx;
  }

  private triggerDoubleBeep() {
    if (!this.isPlaying || this.isMuted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const tones = [
      { offset: 0, freq: 920, duration: 0.11 },
      { offset: 0.16, freq: 1160, duration: 0.13 },
    ];

    tones.forEach(({ offset, freq, duration }) => {
      const t = now + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.02);
    });
  }

  public start() {
    if (this.isPlaying) {
      this.ensureContext();
      return;
    }
    this.isPlaying = true;
    this.ensureContext();
    this.triggerDoubleBeep();
    this.timerId = window.setInterval(() => {
      this.triggerDoubleBeep();
    }, 1250);
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted && this.isPlaying) {
      this.ensureContext();
      this.triggerDoubleBeep();
    }
    this.notify();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
  }

  public getState() {
    return { isPlaying: this.isPlaying, isMuted: this.isMuted };
  }
}

export const emergencyAlarm = new EmergencyAlarmSynthesizer();
