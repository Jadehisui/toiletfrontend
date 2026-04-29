import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import skyline from "@/assets/skyline.jpg";
import palms from "@/assets/palms.png";
import mascot from "@/assets/mascot.png";

const Coin3D = lazy(() => import("./Coin3D"));

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ySky = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yPalms = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yMascot = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      style={{ background: "var(--grad-sunset)" }}
    >
      {/* Sky / skyline */}
      <motion.img
        src={skyline}
        alt="Los Santos skyline"
        style={{
          y: ySky,
          x: mouse.x * -10,
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--gta-night)]" />

      {/* Palm silhouettes */}
      <motion.img
        src={palms}
        alt=""
        aria-hidden
        style={{ y: yPalms, x: mouse.x * -25 }}
        className="absolute inset-x-0 bottom-0 h-[60%] w-[120%] -translate-x-[8%] object-cover object-bottom mix-blend-multiply"
      />

      {/* 3D coin (right) */}
      <motion.div
        style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, -120]) }}
        className="absolute right-[-4%] top-[8%] hidden h-[80%] w-[55%] md:block lg:right-[2%] lg:w-[45%]"
      >
        <Suspense fallback={null}>
          <Coin3D />
        </Suspense>
      </motion.div>

      {/* Mobile CSS-3D coin fallback */}
      <div className="pointer-events-none absolute bottom-24 right-3 block h-20 w-20 [perspective:600px] md:hidden">
        <div
          className="coin-3d relative h-full w-full animate-glow"
          style={{
            backgroundImage: `url(${new URL("../assets/coin-face.png", import.meta.url).href})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Mascot */}
      <motion.img
        src={mascot}
        alt="Toilet Dust mascot"
        style={{ y: yMascot, x: mouse.x * 14 }}
        className="absolute bottom-0 left-1/2 h-[55%] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] md:left-[2%] md:h-[88%] md:translate-x-0"
      />

      {/* Title */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-4 pt-20 text-center md:items-end md:justify-center md:pr-[8%] md:pt-0 md:text-right">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-xl"
        >
          <p
            className="mb-2 font-stencil text-[10px] tracking-[0.5em] md:text-xs"
            style={{ color: "var(--gta-cream)" }}
          >
            ◆ WELCOME TO LOS SANTOS ◆
          </p>
          <h1
            className="font-display text-5xl leading-[0.85] text-stroke-black md:text-7xl lg:text-8xl"
            style={{ color: "var(--gta-cream)" }}
          >
            TOILET<br />DUST
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3 md:justify-end">
            <div className="gta-shield flex h-16 w-16 items-end justify-center pb-1 md:h-20 md:w-20">
              <span className="font-display text-base md:text-xl" style={{ color: "var(--gta-cream)", WebkitTextStroke: "1.5px #000" }}>V&nbsp;2.0</span>
            </div>
            <p
              className="font-stencil text-xs tracking-[0.3em] md:text-sm"
              style={{ color: "var(--gta-cream)" }}
            >
              FLUSH THE<br />MARKET
            </p>
          </div>
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <a
              href="https://dexscreener.com/sui/0xaa2347159a55adaf1d76745e13c2bc91449570d998f6ba8ecbf5129a5d4a0bbf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 border-2 border-black bg-[var(--gta-green)] px-6 py-3 font-stencil text-sm uppercase text-black shadow-[0_4px_0_#000] transition-transform hover:translate-y-[-2px] hover:shadow-[0_6px_0_#000]"
            >
              📊 View Chart
            </a>
            <a
              href="https://td2swap.co/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black bg-black/60 px-6 py-3 font-stencil text-sm uppercase text-white shadow-[0_4px_0_#000] transition-transform hover:translate-y-[-2px] hover:bg-black/80"
            >
              ⚡ Swap $TDUST
            </a>
            <a
              href="https://td2stake.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black bg-black/60 px-6 py-3 font-stencil text-sm uppercase text-white shadow-[0_4px_0_#000] transition-transform hover:translate-y-[-2px] hover:bg-black/80"
            >
              🔒 Stake Portal
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-stencil text-[10px] tracking-[0.4em] text-white/70"
      >
        SCROLL ▼
      </motion.div>

      <div className="grain" />
      <div className="scanline" />
    </section>
  );
}
