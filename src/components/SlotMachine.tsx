import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "sonner";

const SYMBOLS = ["🚽", "💰", "⭐", "💎", "🪙", "🔥", "🎰"];
const REEL_COUNT = 3;
const SPIN_DURATION = 2500;
const TREASURY_ADDRESS = "0x972332e8ada870675bf7e878f186d46566b6a6d8adca57ba1c5d25d69616542b"; // Updated treasury

const ReelStrip = ({ spinning, finalSymbol }: { spinning: boolean; finalSymbol: string }) => {
  const [displaySymbol, setDisplaySymbol] = useState("🚽");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (spinning) {
      intervalRef.current = setInterval(() => {
        setDisplaySymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplaySymbol(finalSymbol);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [spinning, finalSymbol]);

  return (
    <div className="w-20 h-24 md:w-28 md:h-32 border-2 border-primary bg-background flex items-center justify-center overflow-hidden">
      <motion.span
        key={displaySymbol + (spinning ? "spin" : "stop")}
        initial={!spinning ? { y: -30, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="text-3xl md:text-5xl select-none"
      >
        {displaySymbol}
      </motion.span>
    </div>
  );
};

const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<string[]>(["🚽", "💰", "⭐"]);
  const [isWin, setIsWin] = useState(false);
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const handlePull = useCallback(async () => {
    if (isSpinning) return;

    if (!account) {
      toast.error("Please connect your wallet first!");
      return;
    }

    try {
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [1000000000]); // 1 SUI = 10^9 MIST
      tx.transferObjects([coin], TREASURY_ADDRESS);

      toast.info("Processing transaction...");

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log("Transaction successful:", result);
            toast.success("Transaction confirmed! Spinning...");
            startSpin();
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
            toast.error(`Transaction failed: ${error.message}`);
          },
        }
      );
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(`Payment failed: ${error.message}`);
    }
  }, [isSpinning, account, signAndExecuteTransaction]);

  const startSpin = useCallback(() => {
    setIsSpinning(true);
    setIsWin(false);

    // 1/100 Win Rate Logic
    const winRoll = Math.floor(Math.random() * 100);
    const isJackpot = winRoll === 0;

    let newResults: string[];
    if (isJackpot) {
      const winSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      newResults = [winSymbol, winSymbol, winSymbol];
    } else {
      // Ensure it's not a win
      do {
        newResults = Array.from({ length: REEL_COUNT }, () =>
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        );
      } while (newResults[0] === newResults[1] && newResults[1] === newResults[2]);
    }

    setTimeout(() => {
      setResults(newResults);
      setIsSpinning(false);
      setIsWin(isJackpot);
      if (isJackpot) {
        toast.success("JACKPOT! YOU WON 100 SUI!");
      }
    }, SPIN_DURATION);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      {/* Machine body */}
      <div className="w-full retro-border bg-card">
        {/* Top label */}
        <div className="border-b-2 border-primary/30 py-3 text-center">
          <span className="font-display text-[10px] md:text-xs text-primary tracking-[0.3em]">
            ★ FLUSH SLOTS ★
          </span>
        </div>

        {/* Jackpot display */}
        <div className="border-b-2 border-primary/20 py-2 text-center bg-primary/5">
          <div className="text-[9px] text-muted-foreground font-mono">JACKPOT</div>
          <div className="font-display text-lg md:text-xl text-primary retro-glow inline-block">
            100 SUI
          </div>
        </div>

        {/* Reels */}
        <div className="flex items-center justify-center gap-2 p-6 md:p-8">
          {Array.from({ length: REEL_COUNT }).map((_, i) => (
            <ReelStrip key={i} spinning={isSpinning} finalSymbol={results[i]} />
          ))}
        </div>

        {/* Win indicator */}
        <AnimatePresence>
          {isWin && !isSpinning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center pb-4"
            >
              <span className="font-display text-xs text-primary animate-blink">
                ★ WINNER ★
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bar */}
        <div className="border-t-2 border-primary/30 grid grid-cols-2 text-center divide-x-2 divide-primary/20">
          <div className="py-3 px-2">
            <div className="text-[8px] text-muted-foreground font-mono">ENTRY</div>
            <div className="text-xs font-mono font-bold text-primary">1 SUI</div>
          </div>
          <div className="py-3 px-2">
            <div className="text-[8px] text-muted-foreground font-mono">NEXT DRAW</div>
            <div className="text-xs font-mono font-bold text-primary">
              {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </div>
          </div>
        </div>

        {/* Pull lever button */}
        <button
          onClick={handlePull}
          disabled={isSpinning}
          className="w-full py-4 bg-primary text-primary-foreground font-display text-[10px] md:text-xs tracking-wider hover:retro-glow transition-shadow duration-300 disabled:opacity-50 border-t-2 border-primary/50"
        >
          {!account ? "CONNECT WALLET TO PLAY" : (isSpinning ? "► SPINNING..." : "► PULL LEVER — 1 SUI")}
        </button>
      </div>
    </div>
  );
};

export default SlotMachine;
