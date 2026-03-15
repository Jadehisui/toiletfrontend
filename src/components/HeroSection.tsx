import { motion } from "framer-motion";
import mascotHero from "@/assets/mascot-hero.jpg";

const FloatingCoin = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-gold to-yellow-600 border border-gold/30"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -15, 5, 0], rotate: [0, 10, -5, 0], scale: [1, 1.05, 0.98, 1] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="w-full h-full rounded-full flex items-center justify-center">
      <span className="text-gold-foreground font-mono font-bold" style={{ fontSize: size * 0.4 }}>S</span>
    </div>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.06),transparent_60%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Floating coins */}
      <FloatingCoin delay={0} x="10%" y="20%" size={40} />
      <FloatingCoin delay={1.5} x="85%" y="25%" size={32} />
      <FloatingCoin delay={3} x="75%" y="70%" size={28} />
      <FloatingCoin delay={0.8} x="15%" y="75%" size={36} />
      <FloatingCoin delay={2.2} x="50%" y="15%" size={24} />

      {/* Glow orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        style={{ left: '20%', top: '30%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent/5 blur-3xl"
        style={{ right: '15%', top: '40%' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm text-primary font-mono">Live on Sui Network</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-6"
          >
            <span className="text-gradient">Stake.</span>
            <br />
            <span className="text-gradient">Flush.</span>
            <br />
            <span className="text-gradient">Win.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            ToiletStake is a next-generation staking and lottery protocol built on Sui.
            Stake tokens, earn rewards, and participate in decentralized lottery draws.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a href="#lottery" className="btn-primary text-center text-lg">
              Enter Lottery
            </a>
            <a href="#staking" className="btn-ghost text-center text-lg">
              Start Staking
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { label: "Total Staked", value: "2.4M" },
              { label: "Winners", value: "1,247" },
              { label: "APY", value: "12.8%" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-mono font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mascot image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 max-w-md lg:max-w-lg relative"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-gold/20 rounded-3xl blur-2xl animate-pulse-glow" />
            <img
              src={mascotHero}
              alt="ToiletStake Golden Mascot"
              className="relative w-full rounded-2xl border border-border/50"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary/60" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
