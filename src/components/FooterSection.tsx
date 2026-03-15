import { Github, Twitter } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-mono font-bold text-xs">TS</span>
          </div>
          <span className="font-display font-bold text-foreground">
            Toilet<span className="text-primary">Stake</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Docs</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-8">
        © 2026 ToiletStake. All rights reserved. Built on Sui.
      </div>
    </footer>
  );
};

export default FooterSection;
