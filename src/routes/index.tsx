import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import HeroScene from "@/components/HeroScene";
import HUD from "@/components/HUD";
import LotteryHub from "@/components/LotteryHub";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Tokenomics, HowToBuy, Roadmap, TheCrew, Footer } from "@/components/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--gta-night)] text-foreground">
      <IntroSequence onDone={() => setIntroDone(true)} />
      <BackgroundMusic />
      {introDone && <HUD />}
      <HeroScene />
      <LotteryHub />
      <Tokenomics />
      <HowToBuy />
      <Roadmap />
      <TheCrew />
      <Footer />
    </main>
  );
}
