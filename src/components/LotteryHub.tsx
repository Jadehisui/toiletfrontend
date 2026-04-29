import { useEffect, useMemo, useRef, useState } from "react";
import { getWallets } from "@wallet-standard/app";
import { Transaction } from "@mysten/sui/transactions";

type WalletAccount = { address: string };
type WalletLike = {
  name: string;
  chains?: string[];
  accounts?: WalletAccount[];
  features?: Record<string, any>;
};

const TREASURY_ADDRESS = "0x972332e8ada870675bf7e878f186d46566b6a6d8adca57ba1c5d25d69616542b";
const ENTRY_FEE_SUI = 1;
const ENTRY_FEE_MIST = 1_000_000_000;
const JACKPOT_AMOUNT = 100;
const WIN_CHANCE = 100;
const SYMBOLS = ["🚽", "💰", "⭐", "💎", "🪙", "🔥", "🎰", "👑"];

export default function LotteryHub() {
  const [connectedWallet, setConnectedWallet] = useState<WalletLike | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<WalletAccount | null>(null);
  const [balanceSui, setBalanceSui] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "info" | "success" | "error" } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<string[]>(["🚽", "💰", "⭐"]);
  const [isWinner, setIsWinner] = useState(false);
  const [countdown, setCountdown] = useState({ h: 2, m: 47, s: 33 });

  const spinTimers = useRef<number[]>([]);
  const tickerRef = useRef<number | null>(null);

  const walletLabel = useMemo(() => {
    if (!connectedAccount) return "Connect Wallet";
    const a = connectedAccount.address;
    return `${a.slice(0, 4)}..${a.slice(-4)}`;
  }, [connectedAccount]);

  const showToast = (msg: string, type: "info" | "success" | "error" = "info") => {
    setToast({ msg, type });
    window.setTimeout(() => setToast(null), 2600);
  };

  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch("https://fullnode.mainnet.sui.io:443", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "suix_getBalance",
          params: [address, "0x2::sui::SUI"],
        }),
      });
      const data = await response.json();
      const mist = Number(data?.result?.totalBalance ?? 0);
      setBalanceSui(mist / 1_000_000_000);
    } catch {
      setBalanceSui(null);
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) {
          return { h: 23, m: 59, s: 59 };
        }
        return { h, m, s };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const walletsApi = getWallets();
    const existing = walletsApi.get() as WalletLike[];
    const authorized = existing.find((w) => w.accounts?.length && w.chains?.some((c) => c.startsWith("sui:")));

    if (authorized && authorized.accounts?.[0]) {
      setConnectedWallet(authorized);
      setConnectedAccount(authorized.accounts[0]);
      fetchBalance(authorized.accounts[0].address);
    }
  }, []);

  const connectWallet = async () => {
    if (connectedAccount) {
      try {
        await connectedWallet?.features?.["standard:disconnect"]?.disconnect?.();
      } catch {
        // Ignore disconnect errors and reset local state.
      }
      setConnectedWallet(null);
      setConnectedAccount(null);
      setBalanceSui(null);
      showToast("Disconnected", "info");
      return;
    }

    const wallets = getWallets().get() as WalletLike[];
    const suiWallets = wallets.filter((w) => w.chains?.some((c) => c.startsWith("sui:")));

    if (!suiWallets.length) {
      showToast("No SUI wallet found. Install Slush or Sui Wallet.", "error");
      return;
    }

    const preferred =
      suiWallets.find((w) => w.name.toLowerCase().includes("slush") || w.name.toLowerCase().includes("sui")) ??
      suiWallets[0];

    try {
      const result = await preferred.features?.["standard:connect"]?.connect?.();
      const accounts = result?.accounts || preferred.accounts || [];
      if (!accounts.length) {
        showToast("No accounts authorized", "error");
        return;
      }

      setConnectedWallet(preferred);
      setConnectedAccount(accounts[0]);
      await fetchBalance(accounts[0].address);
      showToast(`Connected to ${preferred.name}`, "success");
    } catch (error: any) {
      showToast(error?.message || "Connection failed", "error");
    }
  };

  const clearSpinTimers = () => {
    spinTimers.current.forEach((id) => window.clearInterval(id));
    spinTimers.current = [];
    if (tickerRef.current) {
      window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  };

  useEffect(() => clearSpinTimers, []);

  const startVisualSpin = (isJackpot: boolean) => {
    clearSpinTimers();
    setIsWinner(false);
    const initial = [...reels];
    setSpinning(true);

    tickerRef.current = window.setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }, 70);

    const finalReels = (() => {
      if (isJackpot) {
        const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        return [symbol, symbol, symbol];
      }
      let next = initial;
      do {
        next = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ];
      } while (next[0] === next[1] && next[1] === next[2]);
      return next;
    })();

    window.setTimeout(() => {
      setReels((prev) => [finalReels[0], prev[1], prev[2]]);
    }, 1500);
    window.setTimeout(() => {
      setReels((prev) => [prev[0], finalReels[1], prev[2]]);
    }, 2000);
    window.setTimeout(() => {
      clearSpinTimers();
      setReels(finalReels);
      setSpinning(false);
      if (isJackpot) {
        setIsWinner(true);
        showToast(`JACKPOT! ${JACKPOT_AMOUNT} SUI!`, "success");
      } else {
        showToast("No win this round. Try again.", "info");
      }
    }, 2500);
  };

  const handleSpin = async () => {
    if (spinning) return;
    if (!connectedAccount || !connectedWallet) {
      showToast("Connect wallet first", "error");
      return;
    }
    if (balanceSui === null) {
      showToast("Balance not loaded yet", "error");
      return;
    }
    if (balanceSui < ENTRY_FEE_SUI) {
      showToast(`Need at least ${ENTRY_FEE_SUI} SUI`, "error");
      return;
    }

    try {
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [ENTRY_FEE_MIST]);
      tx.transferObjects([coin], TREASURY_ADDRESS);

      const signTx = connectedWallet.features?.["sui:signAndExecuteTransaction"];
      const signTxBlock = connectedWallet.features?.["sui:signAndExecuteTransactionBlock"];
      let result: any = null;

      if (signTx?.signAndExecuteTransaction) {
        result = await signTx.signAndExecuteTransaction({
          transaction: tx,
          account: connectedAccount,
          chain: "sui:mainnet",
        });
      } else if (signTxBlock?.signAndExecuteTransactionBlock) {
        result = await signTxBlock.signAndExecuteTransactionBlock({
          transactionBlock: tx,
          account: connectedAccount,
          chain: "sui:mainnet",
        });
      } else {
        showToast("Wallet does not support transactions", "error");
        return;
      }

      if (!result?.digest) {
        showToast("Transaction failed", "error");
        return;
      }

      showToast(`TX confirmed: ${result.digest.slice(0, 8)}...`, "success");
      const isJackpot = Math.floor(Math.random() * WIN_CHANCE) === 0;
      startVisualSpin(isJackpot);
      window.setTimeout(() => fetchBalance(connectedAccount.address), 2200);
    } catch (error: any) {
      if (error?.message?.toLowerCase()?.includes("rejected")) {
        showToast("Transaction cancelled", "info");
        return;
      }
      showToast(error?.message || "Transaction failed", "error");
    }
  };

  const countdownText = `${String(countdown.h).padStart(2, "0")}:${String(countdown.m).padStart(2, "0")}:${String(countdown.s).padStart(2, "0")}`;

  return (
    <section id="lottery" className="relative overflow-hidden bg-[var(--gta-night)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center md:mb-14">
          <p className="font-stencil text-[10px] tracking-[0.5em] md:text-xs" style={{ color: "var(--gta-green)" }}>
            ◆ MISSION LOTTERY ◆
          </p>
          <h2 className="mt-2 font-display text-4xl leading-none text-stroke-black md:text-6xl" style={{ color: "var(--gta-cream)" }}>
            FLUSH MACHINE
          </h2>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <a href="https://dexscreener.com/sui/0xaa2347159a55adaf1d76745e13c2bc91449570d998f6ba8ecbf5129a5d4a0bbf" target="_blank" rel="noreferrer" className="border-4 border-black bg-black/70 p-4 font-stencil text-xs uppercase tracking-widest text-[var(--gta-cream)] shadow-[var(--shadow-card)]">
            DexScreener Chart
          </a>
          <a href="https://td2swap.co/app" target="_blank" rel="noreferrer" className="border-4 border-black bg-[var(--gta-green)] p-4 font-stencil text-xs uppercase tracking-widest text-black shadow-[var(--shadow-card)]">
            TD2SWAP: Cross-chain swap
          </a>
          <a href="https://td2stake.site/" target="_blank" rel="noreferrer" className="border-4 border-black bg-black/70 p-4 font-stencil text-xs uppercase tracking-widest text-[var(--gta-cream)] shadow-[var(--shadow-card)]">
            TD2 Stake Portal
          </a>
          <a href="https://www.td2vest.site/" target="_blank" rel="noreferrer" className="border-4 border-black bg-black/70 p-4 font-stencil text-xs uppercase tracking-widest text-[var(--gta-cream)] shadow-[var(--shadow-card)]">
            TD2 Vesting Portal
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]">
          <div className="border-4 border-black bg-black/70 p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-2xl" style={{ color: "var(--gta-cream)" }}>Wallet</h3>
            <p className="mt-2 text-sm text-white/70">
              {balanceSui === null ? "Connect wallet to view balance" : `Balance: ${balanceSui.toFixed(4)} SUI`}
            </p>
            <button onClick={connectWallet} className="mt-4 w-full border-2 border-black bg-[var(--gta-green)] px-4 py-3 font-stencil text-xs tracking-widest text-black">
              {walletLabel}
            </button>
          </div>

          <div className="border-4 border-black bg-black/70 p-6 text-center shadow-[var(--shadow-card)]">
            <p className="font-stencil text-[10px] tracking-[0.3em] text-white/60">JACKPOT</p>
            <p className="font-display text-5xl text-[var(--gta-green)]">{JACKPOT_AMOUNT} SUI</p>

            <div className={`mt-6 grid grid-cols-3 gap-3 ${spinning ? "animate-pulse" : ""}`}>
              {reels.map((symbol, i) => (
                <div
                  key={`${symbol}-${i}`}
                  className={`grid h-24 place-items-center border-4 border-black text-5xl ${isWinner ? "bg-[var(--gta-green)] text-black" : "bg-[var(--gta-cream)]"}`}
                >
                  {symbol}
                </div>
              ))}
            </div>

            <button
              onClick={handleSpin}
              disabled={spinning}
              className="mt-6 w-full border-2 border-black bg-[var(--gta-orange)] px-5 py-4 font-display text-lg text-black shadow-[0_5px_0_#000] disabled:opacity-60"
            >
              {spinning ? "SPINNING..." : `PULL LEVER — ${ENTRY_FEE_SUI} SUI`}
            </button>

            <div className="mt-4 flex justify-between text-xs font-stencil tracking-widest text-white/70">
              <span>WIN CHANCE: 1/{WIN_CHANCE}</span>
              <span>NEXT DRAW: {countdownText}</span>
            </div>
          </div>

          <div className="border-4 border-black bg-black/70 p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-2xl" style={{ color: "var(--gta-cream)" }}>How to Play</h3>
            <ol className="mt-3 grid gap-2 text-sm text-white/80">
              <li>1. Connect your SUI wallet.</li>
              <li>2. Pay 1 SUI entry fee.</li>
              <li>3. Pull the lever.</li>
              <li>4. Match 3 symbols to hit jackpot.</li>
            </ol>
            <a href="https://td2stake.site/" target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center border-2 border-black bg-[var(--gta-green)] px-4 py-3 font-stencil text-xs tracking-widest text-black">
              Stake TD2
            </a>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 z-[120] border-2 border-black px-4 py-3 font-stencil text-xs tracking-widest shadow-[0_5px_0_#000] ${toast.type === "success" ? "bg-[var(--gta-green)] text-black" : toast.type === "error" ? "bg-[var(--gta-orange)] text-black" : "bg-[var(--gta-cream)] text-black"}`}>
          {toast.msg}
        </div>
      )}

      <div className="grain" />
    </section>
  );
}
