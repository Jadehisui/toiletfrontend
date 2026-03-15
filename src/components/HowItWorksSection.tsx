import { motion } from "framer-motion";
import { Wallet, Lock, Ticket, Gift } from "lucide-react";

const steps = [
  { icon: Wallet, title: "Connect Wallet", desc: "Link your Sui wallet to get started." },
  { icon: Lock, title: "Stake Tokens", desc: "Stake TOILET to earn rewards." },
  { icon: Ticket, title: "Enter Lottery", desc: "Use 1 SUI to join a lottery round." },
  { icon: Gift, title: "Win Rewards", desc: "Collect staking yields and lottery prizes." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Get Started</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-foreground">
            How It <span className="text-gradient">Works</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 text-center relative"
            >
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-card-glow mb-4">
                <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 right-0 font-mono text-6xl font-bold text-muted/30 -z-10 -translate-y-2">
                {i + 1}
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
