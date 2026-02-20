import time
from scenarios import SCENARIOS
from git_ops import clone_repo
from log_stream import sse_event

def run_pipeline(run_id: str, repo_url: str, scenario_key: str):
    # 1. Clone
    yield sse_event("[CLONE] Cloning repository")
    repo_path = clone_repo(repo_url, run_id)
    time.sleep(1)
    yield sse_event(f"[CLONE] Repository cloned into {repo_path}")

    # 2. Analysis
    scenario = SCENARIOS[scenario_key]

    for line in scenario["analysis_logs"]:
        yield sse_event(line)
        time.sleep(1)

    # 3. Error found
    yield sse_event(scenario["error_log"])
    time.sleep(0.5)

    # 4. Stop here for now
    yield sse_event("[PIPELINE] Execution stopped due to detected error")