import { useLocation, useNavigate } from "react-router-dom";
import { Download, CheckCircle, XCircle, ChevronDown, ChevronUp, GitCommit, FileText, Clock, GitBranch } from "lucide-react";
import { useMemo, useState } from "react";

export const ResultPage = () => {
  const { state } = useLocation() as any;
  const navigate = useNavigate();

  // Fallback mock data if nothing passed (for UI testing)
  const data = state || {
    result: "success",
    repo_url: "https://github.com/Codenaman21/test",
    total_time: 32.5,
    branch: "ERRORPAGLUS_CHAITANYADALAL_AI_FIX",
    attempts: 1,
    commits: 1,
    files_changed: ["main.py"],
    last_error: "Missing ':' in for statement",
    primary_fix: "Add ':' at the end of the for statement",
    alternative_fix: "Rewrite the loop using a safer iteration pattern",
    summary: "The agent detected a syntax error, applied a fix, and the pipeline passed successfully."
  };

  const [showTech, setShowTech] = useState(false);

  const fullResult = useMemo(() => {
    return {
      result: data.result,
      repo: data.repo_url,
      branch: data.branch,
      attempts: data.attempts,
      commits: data.commits,
      files_changed: data.files_changed,
      last_error: data.last_error || null,
      primary_fix: data.primary_fix,
      alternative_fix: data.alternative_fix,
      total_time: data.total_time,
      summary: data.summary,
      timestamp: new Date().toISOString()
    };
  }, [data]);

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(fullResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "healing_result.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const success = data.result === "success";

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto p-10 space-y-12">

        {/* ===================== */}
        {/* 1) HERO RESULT */}
        {/* ===================== */}
        <div className="p-8 rounded-2xl border border-white/10 bg-black space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black tracking-tight">
              Result:{" "}
              <span className={success ? "text-emerald-400" : "text-red-400"}>
                {success ? "Healing Successful" : "Healing Failed"}
              </span>
            </h1>
            <div className="text-right text-sm text-neutral-400">
              <p>Repository</p>
              <p className="font-mono text-white break-all max-w-md">{data.repo_url}</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-neutral-400" />
              <span>Commits: <strong>{data.commits}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>Attempts: <strong>{data.attempts}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>Time: <strong>{data.total_time}s</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-neutral-400" />
              <span>Branch: <strong>{data.branch}</strong></span>
            </div>
          </div>
        </div>

        {/* ===================== */}
        {/* 2) FILES CHANGED / ERROR */}
        {/* ===================== */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-white/10 bg-black space-y-3">
            <h2 className="text-lg font-bold">Files Changed</h2>
            {data.files_changed && data.files_changed.length > 0 ? (
              <ul className="text-sm text-neutral-300 list-disc list-inside">
                {data.files_changed.map((f: string, i: number) => (
                  <li key={i} className="font-mono">{f}</li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-500 text-sm">No files were changed.</p>
            )}
          </div>

          {!success && (
            <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10 space-y-3">
              <h2 className="text-lg font-bold text-red-400">Last Error</h2>
              <p className="text-sm font-mono text-red-200">
                {data.last_error || "Unknown error"}
              </p>
            </div>
          )}
        </div>

        {/* ===================== */}
        {/* 3) FIXES */}
        {/* ===================== */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-white/10 bg-black space-y-3">
            <h2 className="text-lg font-bold">Applied Fix</h2>
            <pre className="text-sm text-neutral-300 bg-[#0b0b0b] p-4 rounded-lg border border-white/10">
              {data.primary_fix}
            </pre>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-black space-y-3">
            <h2 className="text-lg font-bold">Alternative Fix</h2>
            <pre className="text-sm text-neutral-300 bg-[#0b0b0b] p-4 rounded-lg border border-white/10">
              {data.alternative_fix}
            </pre>
          </div>
        </div>

        {/* ===================== */}
        {/* 4) TECHNICAL DETAILS */}
        {/* ===================== */}
        <div className="border border-white/10 rounded-2xl bg-black">
          <button
            onClick={() => setShowTech(!showTech)}
            className="w-full flex items-center justify-between p-6"
          >
            <span className="font-bold">Technical Details</span>
            {showTech ? <ChevronUp /> : <ChevronDown />}
          </button>

          {showTech && (
            <div className="p-6 border-t border-white/10 space-y-6">
              <pre className="max-h-64 overflow-auto p-4 rounded-xl bg-[#0b0b0b] border border-white/10 text-xs">
                {JSON.stringify(fullResult, null, 2)}
              </pre>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-white text-black rounded-lg font-bold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as JSON
              </button>
            </div>
          )}
        </div>

        {/* ===================== */}
        {/* 5) SUMMARY + ACTIONS */}
        {/* ===================== */}
        <div className="p-8 bg-black border border-white/10 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold">Summary</h2>
          <p className="text-neutral-400 italic">
            "{data.summary}"
          </p>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleExportJSON}
              className="flex-1 py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Results JSON
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-bold"
            >
              New Run
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-[10px] text-neutral-600 py-4">
        AutoHeal CI © Autonomous CI/CD Healing Agent
      </footer>
    </div>
  );
};