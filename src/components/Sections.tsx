import { motion } from "framer-motion";
import tileGraffiti from "@/assets/tile-graffiti.jpg";
import tileSign from "@/assets/tile-sign.jpg";
import tileCar from "@/assets/tile-car.jpg";
import tileBeach from "@/assets/tile-beach.jpg";
import tileVine from "@/assets/tile-vine.jpg";
import tileHeli from "@/assets/tile-heli.jpg";
import mascot from "@/assets/mascot.png";

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <p
        className="font-stencil text-[10px] tracking-[0.5em] md:text-xs"
        style={{ color: "var(--gta-green)" }}
      >
        ◆ {kicker} ◆
      </p>
      <h2
        className="mt-2 font-display text-4xl leading-none text-stroke-black md:text-6xl"
        style={{ color: "var(--gta-cream)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export function MissionBriefing() {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--gta-night)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="MISSION 01" title="MISSION BRIEFING" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative border-4 border-black bg-[var(--gta-cream)] p-2 shadow-[var(--shadow-card)] md:rotate-[-2deg]">
              <img src={mascot} alt="The King" className="mx-auto h-[420px] object-contain" />
              <p className="absolute bottom-4 left-4 font-stencil text-xs tracking-widest text-black/70">
                SUSPECT: "THE KING"
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="font-stencil text-xs tracking-[0.4em] text-[var(--gta-orange)]">
              TARGET PROFILE
            </p>
            <h3
              className="font-display text-3xl leading-tight md:text-4xl"
              style={{ color: "var(--gta-cream)" }}
            >
              Community first. <br />Built for TD2 holders.
            </h3>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              TD2 is a community-powered token focused on transparent growth, active participation,
              and long-term utility across the ecosystem.
            </p>
            <p className="text-base leading-relaxed text-white/70">
              $TD2 is a 100% community-owned, contract-renounced, zero-tax memecoin built for holders
              who value momentum, consistency, and strong community execution.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["RENOUNCED", "LP BURNED", "0 / 0 TAX", "FAIR LAUNCH"].map((b) => (
                <span
                  key={b}
                  className="border-2 border-black bg-[var(--gta-green)] px-3 py-1 font-stencil text-[10px] tracking-widest text-black"
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="grain" />
    </section>
  );
}

export function Tokenomics() {
  const stats = [
    { label: "Symbol", value: "$TD2" },
    { label: "Network", value: "SUI" },
    { label: "Total Supply", value: "10,000,000,000" },
  ];

  return (
    <section id="tokenomics" className="relative overflow-hidden bg-[var(--gta-night)] py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${tileVine})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[var(--gta-night)]/85" />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle kicker="MISSION 02" title="THE STATS" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="border-4 border-black bg-black/70 p-5 text-center shadow-[var(--shadow-card)] backdrop-blur-sm"
            >
              <p className="font-stencil text-[10px] tracking-[0.3em] text-white/60">
                {s.label}
              </p>
              <p
                className="mt-2 font-display text-xl md:text-2xl"
                style={{ color: "var(--gta-green)" }}
              >
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-5xl"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border-4 border-black bg-black/70 p-5 shadow-[var(--shadow-card)]">
              <p className="font-display text-3xl" style={{ color: "var(--gta-green)" }}>70%</p>
              <p className="mt-1 font-stencil text-[10px] tracking-[0.25em] text-white/60">COMMUNITY & LIQUIDITY</p>
              <p className="mt-2 text-xs text-white/75">Initial liquidity plus public market supply.</p>
            </div>
            <div className="border-4 border-black bg-black/70 p-5 shadow-[var(--shadow-card)]">
              <p className="font-display text-3xl" style={{ color: "var(--gta-green)" }}>20%</p>
              <p className="mt-1 font-stencil text-[10px] tracking-[0.25em] text-white/60">STRATEGIC PARTNERS</p>
              <p className="mt-2 text-xs text-white/75">KOLs and ecosystem partners with locked + linear vesting profile.</p>
            </div>
            <div className="border-4 border-black bg-black/70 p-5 shadow-[var(--shadow-card)]">
              <p className="font-display text-3xl" style={{ color: "var(--gta-green)" }}>10%</p>
              <p className="mt-1 font-stencil text-[10px] tracking-[0.25em] text-white/60">STAKING REWARDS</p>
              <p className="mt-2 text-xs text-white/75">Reserved for staking emissions to reward holders.</p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-7 max-w-md text-center">
          <a
            href="https://td2stake.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-black bg-[var(--gta-green)] px-8 py-4 font-display text-lg uppercase text-black shadow-[0_5px_0_#000] transition-transform hover:translate-y-[-2px] hover:shadow-[0_7px_0_#000]"
          >
            🔒 Stake $TD2
          </a>
          <p className="mt-2 text-xs text-white/70">Earn passive rewards every epoch.</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <a
            href="https://github.com/syntrei/Audit-reports-/blob/7ce2376f3889dfccf495e05052d923532573544a/reports/2026/TD2/TD2%20Audit%20report-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border-4 border-black bg-black/70 p-5 text-left shadow-[var(--shadow-card)] transition-transform hover:translate-y-[-2px]"
          >
            <p className="font-stencil text-[10px] tracking-[0.3em] text-white/60">AUDIT REPORT</p>
            <h4 className="mt-2 font-display text-2xl" style={{ color: "var(--gta-cream)" }}>TD2 STAKING AUDIT</h4>
            <p className="mt-2 text-xs text-white/75">Open the official TD2 audit report PDF.</p>
          </a>

          <a
            href="https://github.com/syntrei/Audit-reports-/tree/7ce2376f3889dfccf495e05052d923532573544a/reports/2026/Vesting-Module"
            target="_blank"
            rel="noopener noreferrer"
            className="border-4 border-black bg-black/70 p-5 text-left shadow-[var(--shadow-card)] transition-transform hover:translate-y-[-2px]"
          >
            <p className="font-stencil text-[10px] tracking-[0.3em] text-white/60">AUDIT REPORT</p>
            <h4 className="mt-2 font-display text-2xl" style={{ color: "var(--gta-cream)" }}>VESTING MODULE AUDIT</h4>
            <p className="mt-2 text-xs text-white/75">Open the Vesting-Module audit reports folder.</p>
          </a>
        </div>
      </div>
      <div className="grain" />
    </section>
  );
}

export function HowToBuy() {
  const steps = [
    { t: "Get a wallet", d: "Install Phantom, MetaMask, or your weapon of choice." },
    { t: "Load it up", d: "Fund with SOL or ETH. Don't ask the King for change." },
    { t: "Swap for $TD2", d: "Paste the contract, swap, and confirm." },
    { t: "Hold the throne", d: "Diamond hands the dust. The King watches." },
  ];
  return (
    <section id="buy" className="relative overflow-hidden bg-[var(--gta-night)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="MISSION 03" title="HOW TO BUY" />
        <ol className="grid gap-4 md:grid-cols-2 md:gap-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="relative flex items-start gap-4 border-4 border-black bg-black/60 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm"
            >
              <div
                className="grid h-12 w-12 shrink-0 place-items-center border-2 border-black font-display text-xl text-black"
                style={{ background: "var(--gta-green)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-xl" style={{ color: "var(--gta-cream)" }}>
                  {s.t}
                </h3>
                <p className="mt-1 text-sm text-white/70">{s.d}</p>
              </div>
              <span
                className="absolute right-3 top-3 font-stencil text-[10px] tracking-widest"
                style={{ color: "var(--gta-orange)" }}
              >
                OBJECTIVE
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
      <div className="grain" />
    </section>
  );
}

export function Roadmap() {
  const phases = [
    { phase: "PHASE 01", title: "STREET LAUNCH", body: "Stealth launch, LP burn, contract renounce, secure the block.", img: tileGraffiti },
    { phase: "PHASE 02", title: "CITY HEAT", body: "1k+ holders, CMC + CG listings, meme arsenal deployed across socials.", img: tileSign },
    { phase: "PHASE 03", title: "PARTNERSHIP GROWTH", body: "Tier-1 CEX talks, KOL partnerships, and sustained campaign execution.", img: tileVine },
    { phase: "PHASE 04", title: "ECOSYSTEM EXPANSION", body: "Cross-chain expansion, product rollouts, and broader community activation.", img: tileHeli },
  ];
  return (
    <section id="roadmap" className="relative overflow-hidden bg-[var(--gta-night)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="MISSION 04" title="THE ROADMAP" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden border-4 border-black shadow-[var(--shadow-card)]"
            >
              <img src={p.img} alt="" className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="bg-black p-4">
                <p className="font-stencil text-[10px] tracking-[0.3em]" style={{ color: "var(--gta-green)" }}>
                  {p.phase}
                </p>
                <h3 className="mt-1 font-display text-lg" style={{ color: "var(--gta-cream)" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-xs text-white/70">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="grain" />
    </section>
  );
}

export function TheCrew() {
  const socials = [
    { name: "X", href: "https://x.com/toiletdustsui2", icon: "𝕏" },
    { name: "Telegram", href: "https://t.me/ToiletDustTD2", icon: "✈" },
    { name: "DexScreener", href: "https://dexscreener.com/sui/0xaa2347159a55adaf1d76745e13c2bc91449570d998f6ba8ecbf5129a5d4a0bbf", icon: "📊" },
    { name: "Swap", href: "https://td2swap.co/app", icon: "⇄" },
    { name: "Stake", href: "https://td2stake.site/", icon: "🔒" },
    { name: "Vesting", href: "https://www.td2vest.site/", icon: "🧾" },
  ];
  return (
    <section
      id="crew"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage: `linear-gradient(rgba(11,14,22,0.78), rgba(11,14,22,0.95)), url(${tileBeach})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle kicker="MISSION 05" title="JOIN THE CREW" />
        <p className="mx-auto mb-10 max-w-xl text-center text-white/75">
          Pick your weapon. The streets are loud, the chats are louder. Don't get left in the dust.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center gap-2 border-4 border-black bg-black/70 p-6 text-center shadow-[var(--shadow-card)] backdrop-blur-sm transition-colors hover:bg-[var(--gta-green)]"
            >
              <span className="text-4xl text-[var(--gta-green)] group-hover:text-black">
                {s.icon}
              </span>
              <span className="font-stencil text-xs uppercase tracking-widest text-white group-hover:text-black">
                {s.name}
              </span>
            </motion.a>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-md text-center">
          <a
            href="https://td2swap.co/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-black bg-[var(--gta-green)] px-8 py-4 font-display text-lg uppercase text-black shadow-[0_5px_0_#000] transition-transform hover:translate-y-[-2px] hover:shadow-[0_7px_0_#000]"
          >
            ▶ Buy $TD2 Now
          </a>
        </div>
      </div>
      <div className="grain" />
    </section>
  );
}

export function Footer() {
  const items = ["TD2", "COMMUNITY FIRST", "FLUSH THE MARKET", "$TD2", "ON SUI", "WANTED ★★★★★"];
  return (
    <footer className="relative overflow-hidden border-t-4 border-black bg-[var(--gta-green)] py-4 text-black">
      <div className="flex animate-ticker whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-8 font-display text-lg uppercase tracking-widest">
            {it} ◆
          </span>
        ))}
      </div>
      <div className="border-t-2 border-black bg-[var(--gta-night)] px-5 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} TD2 — A community memecoin parody. Not financial advice.
        Not affiliated with Rockstar Games or Take-Two Interactive.
      </div>
    </footer>
  );
}
