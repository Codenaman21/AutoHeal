
import React from 'react';
import { ShieldCheck, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-20 bg-neutral-950 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="text-xl font-bold tracking-tighter">STHIRA</span>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Real-time, offline, and explainable deepfake authentication for high-stakes operational environments.
          </p>
          <div className="flex space-x-4">
            <Twitter className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer transition-colors" />
            <MessageCircle className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Solution</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">Tactical Edge Ops</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Forensic Analysis</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Real-Time Verification</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Methodology</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ethics & Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Legal</h4>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 gap-4">
        <p>© 2024 STHIRA Forensic Stack. All Rights Reserved.</p>
        <p>Built for National Security and Law Enforcement Agencies.</p>
      </div>
    </footer>
  );
};
