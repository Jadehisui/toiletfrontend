import { motion } from "framer-motion";

const navLinks = [
  { label: "Lottery", href: "#lottery" },
  { label: "Staking", href: "#staking" },
  { label: "Features", href: "#features" },
  { label: "Token", href: "#token" },
  { label: "How It Works", href: "#how-it-works" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 rounded-none border-x-0"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-mono font-bold text-sm">TS</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Toilet<span className="text-primary">Stake</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="btn-primary text-sm py-2.5 px-5">
          Connect Wallet
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
