import React, { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Terminal,
  ListChecks,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type StepStatus = "pending" | "running" | "done" | "failed";

interface Step {
  name: string;
  status: StepStatus;
}

export const RunningPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data passed from Dashboard
  const { runId, repoUrl, teamName, teamLead } = (location.state || {}) as any;

  const [activeTab, setActiveTab] = useState<"logs" | "status">("logs");
  const [logs, setLogs] = useState<string[]>([]);
  const [steps, setSteps] = useState<Step[]>([
    { name: "Cloning repository", status: "pending" },
    { name: "Creating new branch", status: "pending" },
    { name: "Installing dependencies", status: "pending" },
    { name: "Running tests", status: "pending" },
    { name: "Analyzing failure", status: "pending" },
    { name: "Generating fix", status: "pending" },
    { name: "Applying changes", status: "pending" },
    { name: "Committing changes", status: "pending" },
    { name: "Pushing branch", status: "pending" },
    { name: "Re-running tests", status: "pending" }
  ]);

  const [attempt, setAttempt] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [suggestedFix, setSuggestedFix] = useState<string | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // === LIVE LOG STREAM FROM BACKEND (SSE) ===
  useEffect(() => {
    if (!runId) return;

    const evtSource = new EventSource(`http://localhost:5000/api/stream/${runId}`);

    evtSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const msg: string = payload.message;

      setLogs((prev) => [...prev, msg]);

      // Update steps based on log prefixes
      setSteps((prevSteps) => {
        const newSteps = prevSteps.map((s) => ({ ...s }));

        const setRunning = (i: number) => {
          if (newSteps[i]) newSteps[i].status = "running";
        };
        const setDone = (i: number) => {
          if (newSteps[i]) newSteps[i].status = "done";
        };

        if (msg.startsWith("[CLONE]")) {
          setRunning(0);
        } else if (msg.startsWith("[ANALYSIS]")) {
          setDone(0);
          setRunning(3);
        } else if (msg.startsWith("[ERROR FOUND]")) {
          setDone(3);
          setRunning(4);
          setErrorMsg(msg);
        } else if (msg.startsWith("[FIX]") || msg.startsWith("[FIX SUGGESTED]")) {
          setDone(4);
          setRunning(5);
          setSuggestedFix(msg);
        } else if (msg.startsWith("[GIT] Creating branch")) {
          setDone(5);
          setRunning(1);
        } else if (msg.startsWith("[GIT] Applying")) {
          setRunning(6);
        } else if (msg.startsWith("[GIT] Committing")) {
          setDone(6);
          setRunning(7);
        } else if (msg.startsWith("[GIT] Pushing")) {
          setDone(7);
          setRunning(8);
        } else if (msg.startsWith("[RESULT]")) {
          // Mark all as done visually
          return newSteps.map((s) => ({ ...s, status: "done" }));
        }

        return newSteps;
      });
    };

    // When backend finishes, SSE will close -> redirect to result page
    evtSource.onerror = async () => {
      console.log("Log stream closed");
      evtSource.close();

      try {
        const res = await fetch(`http://localhost:5000/api/result/${runId}`);
        if (res.ok) {
          const resultData = await res.json();
          navigate("/result", { state: resultData });
        } else {
          console.error("Failed to fetch result");
        }
      } catch (e) {
        console.error("Error fetching result:", e);
      }
    };

    return () => {
      evtSource.close();
    };
  }, [runId, navigate]);

  // Manual mode actions (kept as-is)
  const applyFix = async () => {
    setShowModal(false);
  };

  const manualEdit = () => {
    window.open(repoUrl, "_blank");
    navigate("/");
  };

  const cancelHealing = async () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#050505] text-neutral-200 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-950 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 text-white font-bold">
          Agent Control
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl ${
              activeTab === "logs"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:bg-white/5"
            }`}
          >
            <Terminal className="w-5 h-5" />
            Live Logs
          </button>

          <button
            onClick={() => setActiveTab("status")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl ${
              activeTab === "status"
                ? "bg-white text-black font-bold"
                : "text-neutral-400 hover:bg-white/5"
            }`}
          >
            <ListChecks className="w-5 h-5" />
            Pipeline Status
          </button>
        </nav>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 flex flex-col bg-[#080808]">
        <header className="h-16 border-b border-white/5 flex items-center px-6 justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-neutral-400" />
            <span className="font-bold text-white">Healing Agent Running</span>
          </div>
          <div className="text-sm text-neutral-400">
            Attempt: {attempt}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {activeTab === "logs" ? (
            <div className="h-full bg-black rounded-xl border border-white/5 p-4 overflow-y-auto font-mono text-sm">
              {logs.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap text-neutral-200">
                  {line}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          ) : (
            <div className="h-full bg-neutral-950 rounded-xl border border-white/5 p-6 space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-white/5 pb-2"
                >
                  <span>{step.name}</span>
                  <span>
                    {step.status === "pending" && <Clock className="w-4 h-4 text-neutral-500" />}
                    {step.status === "running" && <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />}
                    {step.status === "done" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {step.status === "failed" && <XCircle className="w-4 h-4 text-red-500" />}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Manual Fix Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6 w-full max-w-xl space-y-4">
            <h2 className="text-lg font-bold text-white">AI Suggested Fix</h2>

            <div className="text-sm text-red-400">
              <strong>Error:</strong> {errorMsg}
            </div>

            <pre className="bg-black rounded-lg p-3 text-sm overflow-auto max-h-60 text-neutral-200">
              {suggestedFix}
            </pre>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelHealing}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Cancel Healing
              </button>
              <button
                onClick={manualEdit}
                className="px-4 py-2 rounded-lg bg-neutral-700 text-white"
              >
                Manual Edit
              </button>
              <button
                onClick={applyFix}
                className="px-4 py-2 rounded-lg bg-white text-black font-bold"
              >
                Apply Fix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};