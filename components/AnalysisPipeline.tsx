
import React, { useEffect, useState } from 'react';
import { Upload, Cpu, BarChart3, ShieldCheck, Activity } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    title: "Media Capture",
    description: "Accepts audio/video from smartphones, body-cams, or tactical web interfaces.",
    color: "blue"
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Stress Analysis",
    description: "Applies controlled compression stress to reveal structural instability.",
    color: "emerald"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Fingerprinting",
    description: "Generates stability fingerprints that expose synthetic content behavior.",
    color: "purple"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Scoring Engine",
    description: "Converts deep analysis into an explainable authenticity stability score.",
    color: "amber"
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Operational Action",
    description: "Delivers clear Green/Yellow/Red assessments with actionable guidance.",
    color: "red"
  }
];

export const AnalysisPipeline: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('pipeline-grid');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div id="pipeline-grid" className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
      {steps.map((step, idx) => (
        <div 
          key={idx} 
          className={`reveal group relative transition-all duration-700 ${isVisible ? 'active' : ''}`}
          style={{ transitionDelay: `${idx * 150}ms` }}
        >
          <div className="flex flex-col items-center p-6 bg-neutral-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:bg-neutral-900 duration-500 h-full">
            <div className={`mb-6 p-4 rounded-xl bg-neutral-800 border border-white/5 text-neutral-400 group-hover:text-white transition-all group-hover:scale-110 duration-500 shadow-xl`}>
              {step.icon}
            </div>
            <h3 className="text-lg font-bold mb-3 text-center tracking-tight">{step.title}</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed">
              {step.description}
            </p>
            
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                <div className="w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        </div>
      ))}
    </div>
  );
};
