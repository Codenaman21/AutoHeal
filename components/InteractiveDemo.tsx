
import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle2, ShieldAlert, RefreshCw, BarChart, ChevronRight } from 'lucide-react';

interface InteractiveDemoProps {
  onLaunchDashboard?: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onLaunchDashboard }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | 'SAFE' | 'DANGER'>(null);
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setProgress(0);
  };

  useEffect(() => {
    if (analyzing && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 2), 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setAnalyzing(false);
      setResult(Math.random() > 0.5 ? 'SAFE' : 'DANGER');
    }
  }, [analyzing, progress]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Real-Time Simulator</h2>
        <p className="text-neutral-400 leading-relaxed">
          Upload a sample audio or video file to see the STHIRA stability fingerprinting in action. 
          The engine will apply stress testing and check for abnormal degradation patterns found in synthetic content.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
             <CheckCircle2 className="w-5 h-5" />
             <span>Structural Stability Analysis</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
             <CheckCircle2 className="w-5 h-5" />
             <span>Compression Stress Test</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-emerald-400">
             <CheckCircle2 className="w-5 h-5" />
             <span>Latent Noise Fingerprinting</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={startAnalysis}
            disabled={analyzing}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all disabled:opacity-50"
          >
            {analyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            {analyzing ? 'Analyzing Bitstream...' : 'Begin Tactical Simulation'}
          </button>
          
          {result && (
            <button 
              onClick={onLaunchDashboard}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/20 transition-all animate-in fade-in slide-in-from-left-4 duration-500"
            >
              Access Full Dashboard <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="aspect-video bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8">
          {!analyzing && !result && (
            <div className="text-center space-y-4 animate-pulse">
              <div className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center mx-auto">
                <BarChart className="w-8 h-8 text-neutral-600" />
              </div>
              <p className="text-neutral-500 font-medium italic">Awaiting Input Signal...</p>
            </div>
          )}

          {analyzing && (
            <div className="w-full space-y-6 text-center">
              <div className="relative w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex justify-between">
                <span>STRESS_TESTING_CHUNKS</span>
                <span>{progress}% COMPLETE</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 rounded ${i < (progress / 100) * 16 ? 'bg-blue-500/20' : 'bg-neutral-900'} transition-colors duration-200`}
                  />
                ))}
              </div>
            </div>
          )}

          {result === 'SAFE' && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-emerald-400">AUTHENTIC MEDIA</h3>
                <p className="text-neutral-400 text-sm">Stability fingerprint: 98.2% Correlation</p>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-xs text-emerald-200/70">
                Media shows expected structural degradation under compression stress. Proceed with operation.
              </div>
            </div>
          )}

          {result === 'DANGER' && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert className="w-10 h-10 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-red-400">DEEPFAKE DETECTED</h3>
                <p className="text-neutral-400 text-sm">Stability fingerprint: 14.5% Correlation</p>
              </div>
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg text-xs text-red-200/70">
                CRITICAL ANOMALY: Structural stability failed under stress test. Highly likely synthetic origin.
              </div>
            </div>
          )}
        </div>
        
        <div className={`absolute -inset-4 rounded-3xl blur-2xl -z-10 transition-colors duration-1000 ${
          result === 'SAFE' ? 'bg-emerald-500/10' : result === 'DANGER' ? 'bg-red-500/10' : 'bg-transparent'
        }`} />
      </div>
    </div>
  );
};
