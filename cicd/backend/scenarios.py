# scenarios.py

# Only ONE error is active per run.
# To simulate another error, change ACTIVE_ERROR_KEY.

ACTIVE_ERROR_KEY = "SYNTAX_MISSING_COLON_FOR"

ERRORS = {
    "SYNTAX_MISSING_COLON_FOR": {
        "code": "SYNTAX_MISSING_COLON_FOR",
        "file": "main.py",
        "line": 3,
        "message": "Missing ':' in for statement",
        "analysis_logs": [
            "[ANALYSIS] Starting static analysis",
            "[ANALYSIS] Scanning repository files",
            "[ANALYSIS] Analyzing file: main.py",
            "[ANALYSIS] Parsing source code"
        ],
        "fix": "Add ':' at the end of the for statement",
        "fix_file": "fix_main_py.py"
    },

    "STRING_FLOAT_CONCAT": {
        "code": "STRING_FLOAT_CONCAT",
        "file": "main.py",
        "line": 9,
        "message": "Cannot concatenate 'str' and 'float'",
        "analysis_logs": [
            "[ANALYSIS] Starting static analysis",
            "[ANALYSIS] Scanning repository files",
            "[ANALYSIS] Analyzing file: main.py",
            "[ANALYSIS] Running type checks"
        ],
        "fix": "Convert numeric value to string or use formatted string",
        "fix_file": "fix_main_py.py"
    },

    "FILE_NOT_CLOSED": {
        "code": "FILE_NOT_CLOSED",
        "file": "main.py",
        "line": 13,
        "message": "File is not properly closed",
        "analysis_logs": [
            "[ANALYSIS] Starting static analysis",
            "[ANALYSIS] Scanning repository files",
            "[ANALYSIS] Analyzing file: main.py",
            "[ANALYSIS] Checking resource handling"
        ],
        "fix": "Call file.close() or use a context manager",
        "fix_file": "fix_main_py.py"
    },

    "INPUT_TYPE_MISMATCH": {
        "code": "INPUT_TYPE_MISMATCH",
        "file": "main.py",
        "line": 29,
        "message": "Input is string but compared with integer",
        "analysis_logs": [
            "[ANALYSIS] Starting static analysis",
            "[ANALYSIS] Scanning repository files",
            "[ANALYSIS] Analyzing file: main.py",
            "[ANALYSIS] Running type checks"
        ],
        "fix": "Convert input to integer before comparison",
        "fix_file": "fix_main_py.py"
    },

    "MUTABLE_DEFAULT_ARG": {
        "code": "MUTABLE_DEFAULT_ARG",
        "file": "main.py",
        "line": 46,
        "message": "Mutable default argument used in constructor",
        "analysis_logs": [
            "[ANALYSIS] Starting static analysis",
            "[ANALYSIS] Scanning repository files",
            "[ANALYSIS] Analyzing file: main.py",
            "[ANALYSIS] Checking object initialization patterns"
        ],
        "fix": "Use None as default and initialize inside the constructor",
        "fix_file": "fix_main_py.py"
    }
}

def get_active_error():
    return ERRORS[ACTIVE_ERROR_KEY]