import { useEffect, useRef, useState } from "react";

function noteToFreq(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

export default function BackgroundMusic() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const stepTimerRef = useRef<number | null>(null);
  const melodyStepRef = useRef(0);

  const stopLoop = () => {
    if (stepTimerRef.current) {
      window.clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  };

  const playTone = (ctx: AudioContext, gain: GainNode, freq: number, duration = 0.42, type: OscillatorType = "triangle") => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(0.04, now + 0.03);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(gain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  };

  const startLoop = () => {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const bass = [40, 40, 38, 35, 33, 35, 38, 40];
    const lead = [64, 67, 71, 72, 71, 67, 64, 62, 64, 67, 69, 71, 69, 67, 64, 62];

    stopLoop();

    stepTimerRef.current = window.setInterval(() => {
      const i = melodyStepRef.current;
      playTone(ctx, gain, noteToFreq(lead[i % lead.length]), 0.28, "sawtooth");
      if (i % 2 === 0) {
        playTone(ctx, gain, noteToFreq(bass[(i / 2) % bass.length]), 0.55, "triangle");
      }
      melodyStepRef.current += 1;
    }, 300);
  };

  const ensureAudio = async () => {
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0.42;
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainRef.current = gain;
    }

    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    setReady(true);
  };

  const toggleMusic = async () => {
    await ensureAudio();
    setEnabled((v) => !v);
  };

  useEffect(() => {
    if (!ready) return;
    if (enabled) {
      startLoop();
    } else {
      stopLoop();
    }
  }, [enabled, ready]);

  useEffect(() => {
    return () => {
      stopLoop();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className="pointer-events-auto fixed bottom-4 left-4 z-[120] border-2 border-black bg-black/70 px-4 py-2 font-stencil text-xs tracking-widest text-[var(--gta-cream)] backdrop-blur-sm hover:bg-[var(--gta-green)] hover:text-black"
    >
      {enabled ? "MUSIC: ON" : "MUSIC: OFF"}
    </button>
  );
}
