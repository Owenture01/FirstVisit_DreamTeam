/**
 * Web Audio Fetal Doppler Synthesizer
 * Generates an authentic rhythmic "whoosh-thump" fetal doppler heartbeat sound
 */

class FetalSoundSynthesizer {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;

  public init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
  }

  public toggle(bpm: number = 138, onStateChange?: (playing: boolean) => void) {
    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
    } else {
      this.play(bpm);
      if (onStateChange) onStateChange(true);
    }
  }

  public play(bpm: number = 138) {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isPlaying = true;
    const intervalMs = (60 / bpm) * 1000;

    const playBeep = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      
      // First beat (lub)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      const filter1 = this.audioCtx.createBiquadFilter();

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(160, now);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(90, now);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.15);

      // Second beat (dub) slightly delayed
      const t2 = now + 0.10;
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      const filter2 = this.audioCtx.createBiquadFilter();

      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(140, t2);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(80, t2);
      osc2.frequency.exponentialRampToValueAtTime(40, t2 + 0.1);

      gain2.gain.setValueAtTime(0.001, t2);
      gain2.gain.linearRampToValueAtTime(0.2, t2 + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.12);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc2.start(t2);
      osc2.stop(t2 + 0.14);
    };

    playBeep();
    this.timerId = window.setInterval(playBeep, intervalMs);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const fetalAudio = new FetalSoundSynthesizer();
