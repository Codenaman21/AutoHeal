import React, { useState } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  GitBranch,
  Key,
  Link,
  Users,
  User
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config"; // adjust path if needed

interface DashboardProps {
  onExit: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onExit }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [token, setToken] = useState("");
  const [teamName, setTeamName] = useState("");          // ✅ NEW
  const [teamLead, setTeamLead] = useState("");          // ✅ NEW
  const [fixMode, setFixMode] = useState<"auto" | "manual">("auto");
  const [starting, setStarting] = useState(false);

  const navigate = useNavigate();

  const startAgent = async () => {
    if (!repoUrl || !teamName || !teamLead) return;

    setStarting(true);

    try {
      const res = await fetch(`${API_BASE}/api/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_url: repoUrl,
          team_name: teamName,
          leader_name: teamLead
        })
      });

      if (!res.ok) {
        throw new Error("Failed to start pipeline");
      }

      const data = await res.json();
      const runId = data.run_id;

      setStarting(false);

      // Go to running page with runId
      navigate("/running", {
        state: {
          runId,
          repoUrl,
          teamName,
          teamLead
        }
      });

    } catch (err) {
      console.error(err);
      setStarting(false);
      alert("Failed to start pipeline. Check backend.");
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-neutral-200 overflow-hidden font-sans">
      <aside className="w-64 border-r border-white/5 bg-neutral-950 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <ShieldCheck className="w-8 h-8 text-white" />
          <span className="text-xl font-bold tracking-tighter text-white">AutoHeal CI</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-white text-black font-bold">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm">Start Agent</span>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={onExit}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Exit</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#080808]">
        <header className="h-20 border-b border-white/5 flex items-center px-8 bg-neutral-950/50 backdrop-blur-md">
          <button onClick={onExit} className="p-2 hover:bg-white/5 rounded-full">
            <ArrowLeft className="w-5 h-5 text-neutral-500" />
          </button>
          <h1 className="ml-4 text-lg font-bold text-white tracking-tight">
            Autonomous CI/CD Healing Agent
          </h1>
        </header>

        <div className="flex-1 p-8 max-w-3xl mx-auto w-full space-y-6">

          {/* Team Name */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <Users className="w-5 h-5 text-neutral-400" />
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name (required)"
              className="bg-transparent outline-none flex-1 text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Team Lead */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <User className="w-5 h-5 text-neutral-400" />
            <input
              value={teamLead}
              onChange={(e) => setTeamLead(e.target.value)}
              placeholder="Team Lead Name (required)"
              className="bg-transparent outline-none flex-1 text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Repo URL */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <Link className="w-5 h-5 text-neutral-400" />
            <input
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Repository URL (required)"
              className="bg-transparent outline-none flex-1 text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Branch (Optional) */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <GitBranch className="w-5 h-5 text-neutral-400" />
            <input
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Branch (optional, default: main)"
              className="bg-transparent outline-none flex-1 text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Token (Optional) */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <Key className="w-5 h-5 text-neutral-400" />
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Access Token (optional)"
              className="bg-transparent outline-none flex-1 text-white placeholder:text-neutral-600"
            />
          </div>

          {/* Fix Mode Selector */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-sm text-neutral-300 font-medium">Fix Mode</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={fixMode === "auto"}
                  onChange={() => setFixMode("auto")}
                />
                <span>Auto AI Fix</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={fixMode === "manual"}
                  onChange={() => setFixMode("manual")}
                />
                <span>Manual AI Fix</span>
              </label>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-end">
            <button
              onClick={startAgent}
              disabled={starting || !repoUrl || !teamName || !teamLead}
              className="px-6 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 disabled:opacity-50"
            >
              {starting ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Start Healing Agent"}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};
