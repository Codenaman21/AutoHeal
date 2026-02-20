# git_ops.py
import os
import subprocess
import shutil

BASE_REPO_DIR = os.path.join(os.path.dirname(__file__), "repos")

def clone_repo(repo_url: str, run_id: str):
    target_path = os.path.join(BASE_REPO_DIR, run_id)
    os.makedirs(BASE_REPO_DIR, exist_ok=True)

    if os.path.exists(target_path):
        shutil.rmtree(target_path)

    result = subprocess.run(
        ["git", "clone", repo_url, target_path],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        raise Exception(f"Git clone failed: {result.stderr}")

    return target_path

def create_branch(repo_path: str, branch_name: str):
    subprocess.run(["git", "-C", repo_path, "checkout", "-b", branch_name], check=True)

def commit_all(repo_path: str, message: str):
    subprocess.run(["git", "-C", repo_path, "add", "."], check=True)
    subprocess.run(["git", "-C", repo_path, "commit", "-m", message], check=True)

def push_branch(repo_path: str, branch_name: str):
    subprocess.run(["git", "-C", repo_path, "push", "origin", branch_name], check=True)