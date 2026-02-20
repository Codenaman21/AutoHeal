import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnalysisPipeline } from './components/AnalysisPipeline';
import { FeatureGrid } from './components/FeatureGrid';
import { Footer } from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/loading';
import { ResultPage } from './components/Resultpage';
import {RunningPage} from './components/RunningPage';

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div className={`reveal ${isVisible ? 'active' : ''}`} ref={domRef}>
      {children}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">
      <BackgroundEffects />

      <Navbar
        scrolled={scrolled}
        onNavigateDashboard={() => navigate("/dashboard")}
      />

      <main className="relative z-10">
        <Hero onStart={() => navigate("/dashboard")} />

        <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                The Forensic Pipeline
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                Authenticating media through structural stability under controlled compression stress.
              </p>
            </div>
          </RevealOnScroll>
          <AnalysisPipeline />
        </section>

        <section
          id="features"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-900"
        >
          <RevealOnScroll>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Enterprise Capabilities
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                Native edge deployment for law enforcement, defense, and digital security.
              </p>
            </div>
          </RevealOnScroll>
          <FeatureGrid />
        </section>

        <section className="py-24 bg-gradient-to-b from-transparent to-neutral-900/50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <RevealOnScroll>
              <h3 className="text-2xl md:text-4xl font-semibold mb-6">
                Strengthening trust in digital media.
              </h3>
              <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                The STHIRA lightweight, compression-aware, agentic AI system provides reliable deepfake authentication
                in real-world environments. By focusing on media stability rather than appearance,
                it delivers accurate, explainable, and deployable results.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              >
                Access Tactical Dashboard
              </button>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard onExit={() => window.location.href = "/"} />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/running" element={<RunningPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
