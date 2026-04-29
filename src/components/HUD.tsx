import { useEffect, useState } from "react";

export default function HUD() {
  const [stars, setStars] = useState(0);
  const [cash, setCash] = useState(420);

  useEffect(() => {
    const onScroll = () => {
      const sp = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      setStars(Math.min(5, Math.floor(sp * 6)));
      setCash(420 + Math.floor(sp * 999_999));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-start justify-between p-3 md:p-5">
      {/* Wanted level */}
      <div className="flex items-center gap-2 border-2 border-black bg-black/55 px-3 py-2 backdrop-blur-sm">
        <span className="font-stencil text-[10px] tracking-[0.3em] text-white/80">WANTED</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-base ${i < stars ? "text-[var(--gta-green)]" : "text-white/20"}`}
              style={{ textShadow: i < stars ? "0 0 8px var(--gta-green)" : undefined }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Cash counter */}
      <div className="flex flex-col items-end gap-1 border-2 border-black bg-black/55 px-3 py-2 text-right backdrop-blur-sm">
        <span className="font-stencil text-[9px] tracking-[0.3em] text-white/60">$TD2</span>
        <span
          className="font-display text-base tabular-nums md:text-xl"
          style={{ color: "var(--gta-green)" }}
        >
          ${cash.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
