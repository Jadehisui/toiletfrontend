import { motion } from "framer-motion";
import mascotToken from "@/assets/mascot-token.jpg";

const utilities = [
  { label: "Staking", desc: "Lock tokens to earn protocol rewards" },
  { label: "Lottery Entry", desc: "Use TOILET to enter lottery rounds" },
  { label: "Governance", desc: "Vote on protocol upgrades and parameters" },
];

const TokenSection = () => {
  return (
    <section id="token" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,hsl(var(--gold)/0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gold tracking-widest uppercase">Token</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-foreground">
            The <span className="text-gradient-gold">TOILET</span> Token
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Token visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-gold/15 via-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse-glow" />
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                <img
                  src={mascotToken}
                  alt="TOILET Token"
                  className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-2 border-gold/30 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.3)]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Token info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Symbol</div>
                  <div className="text-xl font-mono font-bold text-foreground">TOILET</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Network</div>
                  <div className="text-xl font-mono font-bold text-primary">Sui</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                  <div className="text-xl font-mono font-bold text-foreground">1B</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Circulating</div>
                  <div className="text-xl font-mono font-bold text-foreground">420M</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-semibold text-foreground text-lg">Utility</h3>
              {utilities.map((u) => (
                <div key={u.label} className="glass-card p-4 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm">{u.label}</div>
                    <div className="text-xs text-muted-foreground">{u.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;
