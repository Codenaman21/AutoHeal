import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";

const LOADING_STAGES = [
  "Decoding signal entropy",
  "Validating temporal coherence",
  "Cross-referencing latent artifacts",
  "Executing forensic consensus engine"
];

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/result", { state });
    }, 3200 + Math.random() * 1500); // feels organic

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-neutral-300">
      <RefreshCw className="w-12 h-12 animate-spin mb-6 text-emerald-400" />
      <p className="text-xs font-mono tracking-widest uppercase">
        {LOADING_STAGES[Math.floor(Math.random() * LOADING_STAGES.length)]}
      </p>
    </div>
  );
};
