import SlotMachine from "@/components/SlotMachine";
import mascot1 from "@/assets/mascot-1.jpg";
import mascot2 from "@/assets/mascot-2.jpg";
import mascot3 from "@/assets/mascot-3.jpg";
import mascot4 from "@/assets/mascot-4.jpg";
import mascot5 from "@/assets/mascot-5.jpg";
import { motion } from "framer-motion";
import { ConnectButton } from "@mysten/dapp-kit";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-background/90 backdrop-blur-md border-b-2 border-primary/20 shadow-sm shadow-primary/5">
        <div className="font-display text-base md:text-lg text-primary tracking-wider font-bold">TD2</div>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground font-mono">
          <a href="#machine" className="hover:text-primary transition-colors py-2">LOTTERY</a>
          <a href="#stake" className="hover:text-primary transition-colors py-2">STAKE</a>
          <a href="#about" className="hover:text-primary transition-colors py-2">ABOUT</a>
          <a href="#token" className="hover:text-primary transition-colors py-2">TOKEN</a>
          <a href="#how" className="hover:text-primary transition-colors py-2">HOW IT WORKS</a>
        </nav>
        <div className="scale-90 md:scale-100 origin-right">
          <ConnectButton />
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center gap-10">
        <motion.img
          src={mascot1}
          alt="TD2 Mascot"
          className="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-primary retro-glow object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary leading-tight animate-flicker tracking-wide drop-shadow-sm">
            STAKE. FLUSH. WIN.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-mono max-w-lg mx-auto leading-relaxed">
            Next-gen staking & lottery protocol on Sui.<br />
            One ticket. One winner. Pure on-chain luck.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none justify-center">
          <a href="#machine" className="px-8 py-4 bg-primary text-primary-foreground font-display text-sm md:text-base retro-border hover:retro-glow transition-all hover:-translate-y-1 text-center font-bold tracking-wider">
            ENTER LOTTERY
          </a>
          <a href="#token" className="px-8 py-4 border-2 border-primary text-primary font-display text-sm md:text-base hover:bg-primary/10 transition-all hover:-translate-y-1 text-center font-bold tracking-wider">
            LEARN MORE
          </a>
        </div>
      </section>

      {/* ═══ SLOT MACHINE ═══ */}
      <section id="machine" className="py-20 px-6 flex flex-col items-center gap-8">
        <motion.div {...fadeUp} className="text-center space-y-4 mb-4">
          <h2 className="font-display text-xl md:text-3xl text-primary tracking-wider">THE FLUSH MACHINE</h2>
          <p className="text-sm md:text-base text-muted-foreground font-mono max-w-md mx-auto">
            Pull the lever. Match three. Win the jackpot.
          </p>
        </motion.div>
        <motion.div {...fadeUp}>
          <SlotMachine />
        </motion.div>
      </section>

      {/* ═══ STAKING APP ═══ */}
      <section id="stake" className="py-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div {...fadeUp} className="text-center space-y-4 mb-8">
          <h2 className="font-display text-xl md:text-3xl text-primary tracking-wider">STAKE YOUR TD2</h2>
          <p className="text-sm md:text-base text-muted-foreground font-mono max-w-lg mx-auto leading-relaxed">
            Lock up your TD2 tokens to earn high yields and support the network protocol. Enter the dApp to get started.
          </p>
        </motion.div>

        <motion.div {...fadeUp}>
          <a href="/stake" className="px-10 py-5 bg-primary text-primary-foreground font-display text-base md:text-lg retro-border hover:retro-glow transition-all hover:-translate-y-1 text-center font-bold tracking-widest inline-block">
            STAKE ON LAUNCH
          </a>
        </motion.div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-20 px-6 max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="text-center space-y-4 mb-14">
          <h2 className="font-display text-xl md:text-3xl text-primary tracking-wider">WHAT IS TD2?</h2>
          <p className="text-sm md:text-base text-muted-foreground font-mono max-w-2xl mx-auto leading-relaxed">
            TD2 is a community-driven staking & lottery protocol built on the Sui blockchain.
            Stake your TD2 tokens, earn rewards, and enter decentralized lottery draws — all fully on-chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { img: mascot2, title: "DECENTRALIZED LOTTERY", desc: "Provably fair draws using on-chain randomness. No middlemen." },
            { img: mascot3, title: "HIGH YIELD STAKING", desc: "Stake TD2 tokens and earn passive rewards every epoch." },
            { img: mascot4, title: "COMMUNITY DRIVEN", desc: "Governance by holders. The community decides the protocol's future." },
            { img: mascot5, title: "FAST SUI TRANSACTIONS", desc: "Sub-second finality on Sui. Low fees, instant settlement." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="retro-border bg-card p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start hover:retro-glow hover:-translate-y-1 transition-all duration-300"
            >
              <img src={card.img} alt={card.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded border border-primary/30 object-cover flex-shrink-0" />
              <div className="text-center sm:text-left flex-1" style={{ minWidth: 0 }}>
                <h3 className="font-display text-sm md:text-base text-primary mb-3 mt-1 sm:mt-0 tracking-wide">{card.title}</h3>
                <p className="text-sm text-muted-foreground font-mono leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ TOKEN ═══ */}
      <section id="token" className="py-20 px-6 max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp} className="space-y-8">
          <h2 className="font-display text-xl md:text-3xl text-primary tracking-wider">$TD2 TOKEN</h2>
          <div className="retro-border bg-card p-8 md:p-10 space-y-8 hover:retro-glow transition-all duration-300">
            <img src={mascot1} alt="TD2 Token" className="w-32 h-32 rounded-full border-2 border-primary mx-auto object-cover retro-glow mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                { label: "SYMBOL", value: "$TD2" },
                { label: "NETWORK", value: "SUI" },
                { label: "UTILITY", value: "STAKE / LOTTERY / GOV" },
                { label: "SUPPLY", value: "10,000,000,000" },
              ].map((item) => (
                <div key={item.label} className="p-3 border-l-2 border-primary/20 pl-4">
                  <div className="text-xs text-muted-foreground font-mono mb-1">{item.label}</div>
                  <div className="text-sm md:text-base font-mono font-bold text-primary tracking-wide">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-20 px-6 max-w-3xl mx-auto">
        <motion.div {...fadeUp} className="text-center space-y-4 mb-14">
          <h2 className="font-display text-xl md:text-3xl text-primary tracking-wider">HOW IT WORKS</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: "01", title: "CONNECT", desc: "Link your Sui wallet" },
            { step: "02", title: "STAKE", desc: "Stake TD2 tokens" },
            { step: "03", title: "ENTER", desc: "Buy a lottery ticket" },
            { step: "04", title: "WIN", desc: "Collect your rewards" },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="retro-border bg-card p-6 md:p-8 text-center hover:retro-glow hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]"
            >
              <div className="text-4xl font-mono font-bold text-primary/20 mb-4">{item.step}</div>
              <div className="font-display text-sm text-primary mb-2 tracking-wide">{item.title}</div>
              <div className="text-xs md:text-sm text-muted-foreground font-mono leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t-2 border-primary/20 py-10 px-6 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto opacity-80 hover:opacity-100 transition-opacity text-center md:text-left">
          <div className="text-xs text-muted-foreground font-mono">© 2026 TD2 — BUILT ON SUI</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs text-muted-foreground font-mono tracking-wider">
            <a href="#" className="hover:text-primary transition-colors py-2">DOCS</a>
            <a href="#" className="hover:text-primary transition-colors py-2">GITHUB</a>
            <a href="https://x.com/toiletdustsui2?s=21" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors py-2">X</a>
            <a href="https://t.me/ToiletDustTD2" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors py-2">TELEGRAM</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
