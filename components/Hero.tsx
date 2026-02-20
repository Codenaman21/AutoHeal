
import React, { useEffect, useState } from 'react';
import { ChevronRight, PlayCircle, Fingerprint, ShieldAlert } from 'lucide-react';

interface HeroProps {
  onStart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] opacity-20" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl text-center space-y-8">
        <div className={`reveal inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-800/50 border border-white/10 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4 animate-pulse transition-all duration-700 delay-100 ${isVisible ? 'active' : ''}`}>
          <Fingerprint className="w-4 h-4" />
          <span>Real-Time Structural Analysis</span>
        </div>
        
        <h1 className={`reveal text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 transition-all duration-1000 delay-200 ${isVisible ? 'active' : ''}`}>
          Where the truth <br className="hidden sm:block" /> meets media
        </h1>
        
        <p className={`reveal text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'active' : ''}`}>
          The fastest on-device media authentication stack. Built for field environments, tactical operations, 
          and law enforcement. Powered by <span className="text-white font-medium">Compression-Aware AI</span>.
        </p>

        <div className={`reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-1000 delay-600 ${isVisible ? 'active' : ''}`}>
          <button 
            onClick={onStart}
            className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
            <PlayCircle className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            Talk to an Engineer
          </button>
        </div>

        <div className={`reveal pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-white/5 mt-16 opacity-70 hover:opacity-100 transition-all duration-1000 delay-700 ${isVisible ? 'active' : ''}`}>
          <div className="space-y-2 group cursor-default p-4 rounded-xl transition-all hover:bg-white/5">
            <div className="text-white font-bold flex items-center gap-2">
               <ShieldAlert className="w-4 h-4 text-red-400" />
               National Security
            </div>
            <p className="text-xs text-neutral-500">Defend against operational deception across compressed platforms.</p>
          </div>
          <div className="space-y-2 group cursor-default p-4 rounded-xl transition-all hover:bg-white/5">
            <div className="text-white font-bold flex items-center gap-2">
               <Fingerprint className="w-4 h-4 text-emerald-400" />
               Digital Trust
            </div>
            <p className="text-xs text-neutral-500">Authenticate identity for secure high-stakes field communications.</p>
          </div>
          <div className="space-y-2 group cursor-default p-4 rounded-xl transition-all hover:bg-white/5">
            <div className="text-white font-bold flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
               Edge Optimized
            </div>
            <p className="text-xs text-neutral-500">Lightweight models designed for smartphones and body-cams.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
