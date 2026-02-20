
import React from 'react';
import { ShieldCheck, Menu, Terminal, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  onNavigateDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onNavigateDashboard }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <ShieldCheck className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tighter">STHIRA</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-400">
          <a href="#pipeline" className="hover:text-white transition-colors">Forensics</a>
          <a href="#features" className="hover:text-white transition-colors">Edge Ops</a>
          <button onClick={onNavigateDashboard} className="flex items-center gap-1.5 hover:text-white transition-colors text-emerald-400 font-bold">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group/tooltip hidden sm:flex items-center">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium border border-white/10 rounded-lg hover:bg-white/5 transition-all hover:border-white/20">
              <Terminal className="w-4 h-4" />
              <span>Developer Login</span>
            </button>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-md text-[10px] uppercase tracking-widest text-neutral-400 opacity-0 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-1 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-2xl">
              Access tactical API keys & docs
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-l border-t border-white/10 rotate-45"></div>
            </div>
          </div>
          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
