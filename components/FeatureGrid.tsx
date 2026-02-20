
import React, { useEffect, useState } from 'react';
import { Layers, Database, Globe, Smartphone, Microscope, Lock } from 'lucide-react';

const features = [
  {
    title: "Multi-modal Fusion",
    description: "Combines audio, video, and metadata analysis to improve confidence in authenticity assessments.",
    icon: <Layers className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Continuous Learning",
    description: "Automatically updates stability models using new manipulation patterns while preserving privacy.",
    icon: <Database className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Platform Integration",
    description: "Embeds into social media, messaging, and surveillance pipelines for real-time screening.",
    icon: <Globe className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Native Edge Deployment",
    description: "Packaged for direct deployment on smartphones, body-cams, and ruggedized IoT devices.",
    icon: <Smartphone className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Advanced Explainability",
    description: "Enhanced visual/audio explanations supporting forensic analysis and legal verification.",
    icon: <Microscope className="w-6 h-6 text-pink-400" />
  },
  {
    title: "Privacy-Preserving",
    description: "On-device processing ensures that sensitive media never leaves the secure tactical perimeter.",
    icon: <Lock className="w-6 h-6 text-red-400" />
  }
];

export const FeatureGrid: React.FC = () => {
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

    const element = document.getElementById('feature-grid-container');
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, []);

  return (
    <div id="feature-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <div 
          key={idx} 
          className={`reveal group p-8 bg-neutral-900/50 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-700 hover:-translate-y-2 hover:bg-neutral-900 cursor-default ${isVisible ? 'active' : ''}`}
          style={{ transitionDelay: `${idx * 100}ms` }}
        >
          <div className="mb-6 p-3 w-fit rounded-lg bg-neutral-800 transition-transform group-hover:scale-110 group-hover:bg-neutral-700 duration-300">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
          <p className="text-neutral-500 leading-relaxed text-sm group-hover:text-neutral-400 transition-colors">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};
