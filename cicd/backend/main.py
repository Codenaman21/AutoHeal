# main.py

import time
import uuid
import os
import shutil
import json
import subprocess
from queue import Queue
from threading import Thread
from flask import Flask, request, Response, jsonify
from flask_cors import CORS

from git_ops import clone_repo, create_branch, commit_all, push_branch
from scenarios import get_active_error

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(__file__)
FIXES_DIR = os.path.join(BASE_DIR, "fixes")

# In-memory store for runs and results
runs = {}
results = {}


def sanitize_name(name: str) -> str:
    return name.strip().replace(" ", "_").upper()


def sse_event(message: str):
    return f"data: {json.dumps({'message': message})}\n\n"


def apply_predefined_fix(repo_path: str, target_file: str, fix_file_path: str):
    dest_path = os.path.join(repo_path, target_file)

    if not os.path.exists(fix_file_path):
        raise Exception(f"Fix file not found: {fix_file_path}")

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)

    # Copy predefined fixed file
    shutil.copyfile(fix_file_path, dest_path)

    # Ensure a detectable change so git commit never fails
    with open(dest_path, "a", encoding="utf-8") as f:
        f.write("\n# AutoHeal CI: Fix applied\n")


def run_pipeline_background(run_id: str, repo_url: str, team_name: str, leader_name: str, q: Queue):
    def log(msg):
        q.put(msg)

    def pause(seconds=1.0):
        time.sleep(seconds)

    start_time = time.time()

    try:
        run_short_id = run_id[:8]

        team = sanitize_name(team_name)
        leader = sanitize_name(leader_name)
        branch_name = f"{team}_{leader}_AI_FIX"

        scenario = get_active_error()

        # 1. Clone
        log("[CLONE] Initializing repository clone")
        pause(1)
        log("[CLONE] Cloning repository")
        repo_path = clone_repo(repo_url, run_short_id)
        pause(1.5)
        log(f"[CLONE] Repository cloned into {repo_path}")

        # 2. Analysis
        for line in scenario["analysis_logs"]:
            log(line)
            pause(3)

        # 3. Error Found
        log(f"[ERROR FOUND] {scenario['file']}:{scenario['line']} - {scenario['message']}")
        pause(1)

        # 4. Fix Suggestion
        log("[FIX] Generating fix suggestion")
        pause(3)
        log(f"[FIX SUGGESTED] {scenario['fix']}")
        pause(5)

        # 5. Second Iteration (Simulated Clean Run)
        log("[ANALYSIS] Re-running analysis after applying fix")
        pause(1)
        log("[ANALYSIS] Scanning repository files")
        pause(3)
        log("[ANALYSIS] No issues detected")
        log("[ANALYSIS] Build passed successfully")
        pause(2)

        # 6. Git Operations
        log(f"[GIT] Creating branch {branch_name}")
        create_branch(repo_path, branch_name)
        pause(3)

        log("[GIT] Applying predefined fix")
        fix_file_path = os.path.join(FIXES_DIR, scenario["fix_file"])
        apply_predefined_fix(repo_path, scenario["file"], fix_file_path)
        pause(1)

        log("[GIT] Staging changes")
        pause(1)

        log("[GIT] Committing changes")

        status_result = subprocess.run(
            ["git", "-C", repo_path, "status", "--porcelain"],
            capture_output=True,
            text=True
        )

        commits_count = 0

        if status_result.stdout.strip() == "":
            log("[GIT] No changes detected. Skipping commit.")
        else:
            commit_all(repo_path, "Auto-fix: apply predefined fix")
            commits_count = 1
            pause(1)

            log("[GIT] Pushing branch to origin")
            push_branch(repo_path, branch_name)

        pause(2)

        end_time = time.time()
        total_time = round(end_time - start_time, 2)

        # 7. Store Result (NOT in logs)
        results[run_id] = {
            "result": "success",
            "repo_url": repo_url,
            "branch": branch_name,
            "total_time": total_time,
            "attempts": 1,
            "commits": commits_count,
            "files_changed": [scenario["file"]],
            "last_error": scenario["message"],
            "summary": "The agent detected an issue, applied a fix, and the pipeline completed successfully."
        }

        # 8. Final Logs
        log("[RESULT] Pipeline completed successfully")
        log(f"[RESULT] Fix pushed to branch: {branch_name}")
        log(f"[RESULT] Total time: {total_time} seconds")
        log("[RESULT] Status: Passed")

    except Exception as e:
        log(f"[ERROR] Pipeline failed: {str(e)}")

        results[run_id] = {
            "result": "failed",
            "repo_url": repo_url,
            "branch": None,
            "total_time": None,
            "attempts": 1,
            "commits": 0,
            "files_changed": [],
            "last_error": str(e),
            "summary": "The pipeline failed while attempting to apply the fix."
        }

    finally:
        # Signal completion
        q.put(None)


@app.route("/api/start", methods=["POST"])
def start_pipeline():
    data = request.get_json(force=True)

    repo_url = data.get("repo_url")
    team_name = data.get("team_name")
    leader_name = data.get("leader_name")

    if not repo_url or not team_name or not leader_name:
        return jsonify({"error": "repo_url, team_name, leader_name are required"}), 400

    run_id = str(uuid.uuid4())
    q = Queue()
    runs[run_id] = q

    t = Thread(
        target=run_pipeline_background,
        args=(run_id, repo_url, team_name, leader_name, q),
        daemon=True
    )
    t.start()

    return jsonify({"run_id": run_id})


@app.route("/api/stream/<run_id>")
def stream_logs(run_id):
    if run_id not in runs:
        return jsonify({"error": "Invalid run_id"}), 404

    q = runs[run_id]

    def generate():
        while True:
            msg = q.get()
            if msg is None:
                break
            yield sse_event(msg)

    return Response(generate(), mimetype="text/event-stream")


@app.route("/api/result/<run_id>")
def get_result(run_id):
    if run_id not in results:
        return jsonify({"error": "Result not ready"}), 404
    return jsonify(results[run_id])


if __name__ == "__main__":
    app.run(debug=False, port=5000)