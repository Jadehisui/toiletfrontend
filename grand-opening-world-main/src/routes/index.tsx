import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import HeroScene from "@/components/HeroScene";
import HUD from "@/components/HUD";
import { MissionBriefing, Tokenomics, HowToBuy, TheCrew, Footer } from "@/components/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--gta-night)] text-foreground">
      <IntroSequence onDone={() => setIntroDone(true)} />
      {introDone && <HUD />}
      <HeroScene />
      <MissionBriefing />
      <Tokenomics />
      <HowToBuy />
      <TheCrew />
      <Footer />
    </main>
  );
}
