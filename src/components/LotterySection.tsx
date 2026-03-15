import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Users, Trophy, Zap } from "lucide-react";

const LotteryBall = ({ color, index, isSpinning }: { color: string; index: number; isSpinning: boolean }) => {
  const baseAngle = (index / 7) * Math.PI * 2;
  const radius = 80;

  return (
    <motion.div
      className="absolute w-8 h-8 rounded-full shadow-lg"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${color}, ${color}88)`,
        boxShadow: `0 0 15px ${color}44`,
      }}
      animate={
        isSpinning
          ? {
              x: [Math.cos(baseAngle) * radius, Math.cos(baseAngle + Math.PI) * radius, Math.cos(baseAngle + Math.PI * 2) * radius],
              y: [Math.sin(baseAngle) * radius, Math.sin(baseAngle + Math.PI) * radius, Math.sin(baseAngle + Math.PI * 2) * radius],
              scale: [1, 1.2, 1],
            }
          : {
              x: Math.cos(baseAngle) * radius * 0.6,
              y: Math.sin(baseAngle) * radius * 0.6,
            }
      }
      transition={
        isSpinning
          ? { duration: 1.5 + index * 0.1, repeat: Infinity, ease: "linear" }
          : { duration: 1, ease: "easeOut" }
      }
    />
  );
};

const ballColors = ["#22d3ee", "#a855f7", "#eab308", "#22c55e", "#f43f5e", "#3b82f6", "#f97316"];

const CountdownTimer = () => {
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

  return (
    <div className="flex gap-2">
      {[
        { val: pad(time.h), label: "HRS" },
        { val: pad(time.m), label: "MIN" },
        { val: pad(time.s), label: "SEC" },
      ].map((t, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="glass-card px-3 py-2 min-w-[3rem] text-center">
            <span className="number-mono text-2xl font-bold text-foreground">{t.val}</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 font-mono">{t.label}</span>
        </div>
      ))}
    </div>
  );
};

const steps = [
  { num: "01", title: "Enter Lottery", desc: "Submit 1 SUI to enter the current round.", icon: Zap },
  { num: "02", title: "Get Your Ticket", desc: "Your unique ticket is generated on-chain.", icon: Trophy },
  { num: "03", title: "Machine Spins", desc: "When the round ends, the lottery machine draws.", icon: Timer },
  { num: "04", title: "Winner Takes All", desc: "Random winner receives the 100 SUI jackpot.", icon: Users },
];

const LotterySection = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 4000);
  };

  return (
    <section id="lottery" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">The Flush Machine</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-foreground">
            Decentralized <span className="text-gradient">Lottery</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            One ticket. One winner. Pure on-chain randomness.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Lottery Machine */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Machine glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl scale-150" />

              {/* Sphere */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full glass-card-glow flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, hsl(var(--card) / 0.8), hsl(var(--background) / 0.9))',
                  border: '1px solid hsl(var(--primary) / 0.15)',
                }}
              >
                {/* Inner glow ring */}
                <div className="absolute inset-4 rounded-full border border-primary/10" />
                <div className="absolute inset-8 rounded-full border border-accent/5" />

                {/* Balls */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {ballColors.map((color, i) => (
                    <LotteryBall key={i} color={color} index={i} isSpinning={isSpinning} />
                  ))}
                </div>

                {/* Center text */}
                <AnimatePresence>
                  {isSpinning && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-xl font-mono font-bold text-primary animate-pulse">DRAWING...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Machine base */}
              <div className="glass-card mt-4 px-8 py-4 text-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="btn-primary w-full text-lg disabled:opacity-50"
                >
                  {isSpinning ? "Drawing..." : "Flush 1 SUI"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Prize Pool card */}
            <div className="glass-card-glow p-6">
              <div className="text-sm text-muted-foreground font-mono mb-1">Current Jackpot</div>
              <div className="text-5xl font-mono font-bold text-gradient-gold">100 SUI</div>
              <div className="text-sm text-muted-foreground mt-1">≈ $420.00 USD</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Users className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  Players
                </div>
                <div className="text-2xl font-mono font-bold text-foreground">47 / 100</div>
              </div>
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Timer className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  Next Draw
                </div>
                <CountdownTimer />
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="text-sm text-muted-foreground font-mono mb-1">Entry Cost</div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-mono font-bold text-foreground">1 SUI</div>
                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                  Per Ticket
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card-glow p-6 group cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-mono text-primary/60">{step.num}</span>
                <step.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LotterySection;
