import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BALL_COUNT = 7;
const SYMBOLS = ["$", "★", "♠", "◆", "♣", "▲", "●"];

const LotteryMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      setIsSpinning(false);
      setResult(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }, 3000);
  }, [isSpinning]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Machine */}
      <div className="relative retro-border p-1 bg-card">
        {/* Machine header */}
        <div className="border-b-2 border-primary/30 px-6 py-3 text-center">
          <span className="font-display text-[10px] text-primary tracking-widest">
            ◄ FLUSH MACHINE ►
          </span>
        </div>

        {/* Globe area */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center overflow-hidden">
          {/* Rotating balls */}
          {SYMBOLS.map((sym, i) => {
            const angle = (i / BALL_COUNT) * Math.PI * 2;
            const radius = isSpinning ? 90 : 60;
            return (
              <motion.div
                key={i}
                className="absolute w-10 h-10 md:w-12 md:h-12 border-2 border-primary flex items-center justify-center font-mono font-bold text-primary text-lg"
                style={{ borderRadius: "50%" }}
                animate={
                  isSpinning
                    ? {
                        x: [
                          Math.cos(angle) * radius,
                          Math.cos(angle + Math.PI) * radius,
                          Math.cos(angle + Math.PI * 2) * radius,
                        ],
                        y: [
                          Math.sin(angle) * radius,
                          Math.sin(angle + Math.PI) * radius,
                          Math.sin(angle + Math.PI * 2) * radius,
                        ],
                        rotate: [0, 360, 720],
                      }
                    : {
                        x: Math.cos(angle) * radius,
                        y: Math.sin(angle) * radius,
                        rotate: 0,
                      }
                }
                transition={
                  isSpinning
                    ? { duration: 1.2 + i * 0.08, repeat: Infinity, ease: "linear" }
                    : { duration: 0.8, ease: "easeOut" }
                }
              >
                {sym}
              </motion.div>
            );
          })}

          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <AnimatePresence mode="wait">
              {isSpinning ? (
                <motion.div
                  key="spinning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-xs text-primary animate-blink"
                >
                  DRAWING...
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 border-2 border-primary flex items-center justify-center retro-glow"
                  style={{ borderRadius: "50%" }}
                >
                  <span className="text-2xl text-primary font-mono font-bold">{result}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-[10px] text-muted-foreground"
                >
                  READY
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Machine footer / stats */}
        <div className="border-t-2 border-primary/30 px-4 py-3 grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-[9px] text-muted-foreground font-mono">JACKPOT</div>
            <div className="text-sm font-mono font-bold text-primary">100 SUI</div>
          </div>
          <div>
            <div className="text-[9px] text-muted-foreground font-mono">PLAYERS</div>
            <div className="text-sm font-mono font-bold text-primary">47/100</div>
          </div>
          <div>
            <div className="text-[9px] text-muted-foreground font-mono">NEXT DRAW</div>
            <div className="text-sm font-mono font-bold text-primary">
              {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </div>
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3 bg-primary text-primary-foreground font-display text-xs tracking-wider hover:retro-glow transition-shadow duration-300 disabled:opacity-50 border-t-2 border-primary/30"
        >
          {isSpinning ? "► FLUSHING..." : "► FLUSH — 1 SUI"}
        </button>
      </div>

      {/* Entry cost label */}
      <div className="text-xs text-muted-foreground font-mono">
        ENTRY: 1 SUI &nbsp;|&nbsp; WINNER TAKES ALL
      </div>
    </div>
  );
};

export default LotteryMachine;
