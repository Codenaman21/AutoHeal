
import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[120%] bg-blue-500/5 skew-x-[35deg] blur-3xl animate-[pulse_10s_infinite]" />
        <div className="absolute -top-[10%] right-[10%] w-[30%] h-[120%] bg-purple-500/5 skew-x-[-25deg] blur-3xl animate-[pulse_15s_infinite]" />
      </div>

      <div className="absolute inset-0 opacity-20 overflow-hidden">
         {Array.from({ length: 15 }).map((_, i) => (
           <div 
             key={i}
             className="absolute w-1 h-1 bg-white rounded-full animate-drift"
             style={{
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 5}s`,
               animationDuration: `${10 + Math.random() * 20}s`
             }}
           />
         ))}
      </div>

      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(100px, -100px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
