import { motion } from "framer-motion";
import { Zap, Dice5, TrendingUp, Users } from "lucide-react";

const features = [
  {
    title: "Fast Sui Transactions",
    desc: "Sub-second finality with Sui's parallel execution engine. No waiting, no congestion.",
    icon: Zap,
  },
  {
    title: "Decentralized Lottery",
    desc: "Fully on-chain randomness powered by verifiable random functions. No manipulation possible.",
    icon: Dice5,
  },
  {
    title: "High Yield Staking",
    desc: "Competitive APY rates with auto-compounding rewards. Your tokens work while you sleep.",
    icon: TrendingUp,
  },
  {
    title: "Community Driven",
    desc: "Governance-enabled protocol where TOILET holders vote on upgrades, fees, and treasury allocation.",
    icon: Users,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Protocol</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-foreground">
            Built <span className="text-gradient">Different</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="glass-card p-8 flex gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
