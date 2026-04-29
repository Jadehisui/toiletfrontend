import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tileHeli from "@/assets/tile-heli.jpg";
import tileSign from "@/assets/tile-sign.jpg";
import tileCar from "@/assets/tile-car.jpg";
import tileBeach from "@/assets/tile-beach.jpg";
import tileGraffiti from "@/assets/tile-graffiti.jpg";
import tileVine from "@/assets/tile-vine.jpg";
import mascot from "@/assets/mascot.png";

const tiles = [
  { src: tileHeli, area: "1 / 1 / 2 / 2" },
  { src: tileSign, area: "1 / 2 / 2 / 4" },
  { src: tileVine, area: "1 / 4 / 2 / 5" },
  { src: tileGraffiti, area: "2 / 1 / 3 / 2" },
  { src: tileBeach, area: "2 / 4 / 3 / 5" },
  { src: tileCar, area: "3 / 1 / 4 / 5" },
];

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0 = loading, 1 = tiles, 2 = logo, 3 = done

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("td_intro_seen");
    if (reduce || seen) {
      onDone();
      return;
    }
    sessionStorage.setItem("td_intro_seen", "1");
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 3600);
    const t3 = setTimeout(() => {
      setPhase(3);
      onDone();
    }, 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  const skip = () => {
    setPhase(3);
    onDone();
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={skip}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[var(--gta-night)]"
        >
          {/* Phase 0 — loading */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div
                key="load"
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-3xl text-stroke-thin text-gta-cream md:text-5xl"
                  style={{ color: "var(--gta-cream)" }}
                >
                  TOILET&nbsp;DUST&nbsp;V
                </motion.h2>
                <div className="mt-8 h-[3px] w-64 overflow-hidden bg-white/15 md:w-96">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full bg-gta-green"
                    style={{ background: "var(--gta-green)" }}
                  />
                </div>
                <p className="mt-3 font-stencil text-[10px] tracking-[0.4em] text-white/60 animate-blink">
                  LOADING LOS SANTOS…
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 1+ — tile mosaic */}
          {phase >= 1 && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-2 p-3 md:gap-3 md:p-6">
              {tiles.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.09, duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
                  style={{ gridArea: t.area }}
                  className="relative overflow-hidden border-2 border-black"
                >
                  <img src={t.src} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Phase 2 — slam logo */}
          {phase >= 2 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/55" />
              <motion.img
                src={mascot}
                alt=""
                initial={{ x: "-60%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
                className="absolute bottom-0 left-2 h-[70%] md:left-10 md:h-[85%]"
              />
              <div className="relative z-10 text-center">
                <h1
                  className="animate-slam font-display text-6xl leading-[0.85] text-stroke-black md:text-[10rem]"
                  style={{ color: "var(--gta-cream)" }}
                >
                  TOILET<br />DUST
                </h1>
                <motion.div
                  initial={{ y: -40, scale: 0.6, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.45, type: "spring", stiffness: 220, damping: 14 }}
                  className="mx-auto mt-2 inline-flex h-20 w-20 items-center justify-center md:h-28 md:w-28"
                >
                  <div className="gta-shield flex h-full w-full items-end justify-center pb-2 shadow-[0_8px_0_rgba(0,0,0,0.5)]">
                    <span
                      className="font-display text-xl text-stroke-thin md:text-3xl"
                      style={{ color: "var(--gta-cream)" }}
                    >
                      V&nbsp;2.0
                    </span>
                  </div>
                </motion.div>
              </div>
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-stencil text-[10px] tracking-[0.4em] text-white/70 animate-blink">
                CLICK TO ENTER LOS SANTOS
              </p>
            </div>
          )}

          <div className="grain" />
          <div className="scanline" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
