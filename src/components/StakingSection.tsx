import { motion } from "framer-motion";
import { TrendingUp, Shield, Droplets } from "lucide-react";

const stakingCards = [
  {
    title: "Stake TOILET",
    desc: "Lock your TOILET tokens to earn passive rewards and support the protocol.",
    apy: "12.8%",
    icon: TrendingUp,
    color: "primary",
  },
  {
    title: "Earn Rewards",
    desc: "Rewards auto-compound daily. Withdraw anytime with no lockup penalties.",
    apy: "8.4%",
    icon: Shield,
    color: "accent",
  },
  {
    title: "Provide Liquidity",
    desc: "Supply liquidity to TOILET/SUI pools and earn additional LP rewards.",
    apy: "24.2%",
    icon: Droplets,
    color: "gold",
  },
];

const StakingSection = () => {
  return (
    <section id="staking" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.04),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent tracking-widest uppercase">Yield Protocol</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-foreground">
            High Yield <span className="text-gradient">Staking</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Stake your tokens and watch your portfolio grow. No hidden pipes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stakingCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card-glow p-8 group relative overflow-hidden"
            >
              {/* Liquid fill on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full bg-gradient-to-t from-primary/5 to-transparent transition-all duration-700 ease-out" />

              <div className="relative z-10">
                <card.icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{card.desc}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-bold text-primary">{card.apy}</span>
                  <span className="text-sm font-mono text-muted-foreground">APY</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-semibold text-foreground text-lg">Staking Dashboard</h3>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
              Preview
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Your Staked", value: "5,420 TOILET" },
              { label: "Earned", value: "312.7 TOILET" },
              { label: "Current APY", value: "12.8%" },
              { label: "Next Reward", value: "00:42:18" },
            ].map((item) => (
              <div key={item.label} className="bg-muted/30 rounded-xl p-4">
                <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                <div className="text-xl font-mono font-bold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StakingSection;
