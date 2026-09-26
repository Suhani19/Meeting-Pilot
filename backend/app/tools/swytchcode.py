import os
import json
import subprocess
import tempfile
from pathlib import Path
from typing import Any, Optional, Dict
from dotenv import load_dotenv

load_dotenv()

# Detect default project root
PROJECT_ROOT = Path(os.getenv("SWYTCHCODE_PROJECT_ROOT", Path(__file__).resolve().parents[3]))


def get_credential(key_name: str) -> Optional[str]:
    """
    Credential priority resolution:
    1. System / Process environment variables (os.environ)
    2. ~/.swytchcode credentials (~/.swytchcode/credentials, credentials.json, auth.json)
    3. .env file (os.getenv)
    """
    # 1. Highest Priority: Process environment variable
    if key_name in os.environ and os.environ[key_name]:
        return os.environ[key_name]

    # 2. Second Priority: ~/.swytchcode/credentials or ~/.swytchcode/auth.json
    home_swytchcode = Path.home() / ".swytchcode"
    cred_filenames = ["credentials.json", "credentials", "auth.json", "config.json"]
    
    for fname in cred_filenames:
        cred_path = home_swytchcode / fname
        if cred_path.exists() and cred_path.is_file():
            try:
                with open(cred_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        val = (
                            data.get(key_name) or 
                            data.get(key_name.lower()) or 
                            data.get("credentials", {}).get(key_name) or
                            data.get("tokens", {}).get(key_name)
                        )
                        if val:
                            return str(val)
            except Exception:
                pass

    # 3. Third Priority: .env file
    return os.getenv(key_name)


def execute_swytchcode(
    canonical_id: str,
    inputs: Optional[Dict[str, str]] = None,
    params: Optional[Dict[str, str]] = None,
    request_body: Optional[Dict[str, Any]] = None,
    headers: Optional[Dict[str, str]] = None,
) -> Dict[str, Any]:
    """
    Executes a tool via Swytchcode CLI via PowerShell on Windows.
    Keys go directly to the target provider API - Swytchcode servers are never in the request path.
    """
    inputs = inputs or {}
    params = params or {}
    headers = headers or {}
    demo_mode = (get_credential("DEMO_MODE") or "true").lower() in ("true", "1", "yes")

    # Inject Authorization headers directly if credentials are provided
    slack_token = get_credential("SLACK_BOT_TOKEN")
    if "slack" in canonical_id and slack_token and "Authorization" not in headers:
        headers["Authorization"] = f"Bearer {slack_token}"

    command_parts = ["swy", "exec", canonical_id]

    for key, value in inputs.items():
        command_parts.extend(["--input", f"{key}={value}"])

    for key, value in params.items():
        command_parts.extend(["--param", f"{key}={value}"])

    for key, value in headers.items():
        command_parts.extend(["--header", f"{key}={value}"])

    temp_body_file = None
    if request_body:
        temp_dir = tempfile.gettempdir()
        temp_body_path = Path(temp_dir) / f"swy_body_{os.getpid()}.json"
        with open(temp_body_path, "w", encoding="utf-8") as f:
            json.dump(request_body, f)
        temp_body_file = str(temp_body_path)
        command_parts.extend(["--body-file", f'"{temp_body_file}"'])

    command_parts.append("--json")
    command_str = " ".join(command_parts)

    print(f"\n[Swytchcode Direct API Execution] Command: {command_str}")
    print(f"[Swytchcode Direct API Execution] Working Dir: {PROJECT_ROOT}")

    # Build process environment passing resolved credentials directly
    proc_env = os.environ.copy()
    if slack_token:
        proc_env["SLACK_BOT_TOKEN"] = slack_token
    slack_channel = get_credential("SLACK_CHANNEL_ID")
    if slack_channel:
        proc_env["SLACK_CHANNEL_ID"] = slack_channel

    try:
        result = subprocess.run(
            [
                "powershell.exe",
                "-NoProfile",
                "-Command",
                command_str,
            ],
            cwd=PROJECT_ROOT,
            env=proc_env,
            capture_output=True,
            text=True,
            check=False,
            timeout=15,
        )

        if temp_body_file and os.path.exists(temp_body_file):
            try:
                os.remove(temp_body_file)
            except Exception:
                pass

        if result.returncode == 0 and result.stdout.strip():
            try:
                return json.loads(result.stdout)
            except json.JSONDecodeError as err:
                if not demo_mode:
                    raise RuntimeError(
                        f"Swytchcode returned invalid JSON for {canonical_id}.\nOutput:\n{result.stdout}"
                    ) from err

        if result.returncode != 0:
            error_msg = f"Swytchcode execution failed with code {result.returncode}.\nSTDOUT: {result.stdout}\nSTDERR: {result.stderr}"
            if "not recognized" in result.stderr or "command not found" in result.stderr:
                error_msg = f"Swytchcode CLI ('swy') is not installed or not in PATH.\n{error_msg}"
            
            if not demo_mode:
                raise RuntimeError(error_msg)
            print(f"[Swytchcode Warning] Direct API CLI execution note: {result.stderr or result.stdout}")

    except Exception as ex:
        if temp_body_file and os.path.exists(temp_body_file):
            try:
                os.remove(temp_body_file)
            except Exception:
                pass
        if not demo_mode:
            raise RuntimeError(f"Failed to execute Swytchcode direct API command: {str(ex)}") from ex
        print(f"[Swytchcode Warning] Exception during CLI execution, using fallback: {ex}")

    return _get_demo_fallback_response(canonical_id, inputs, params, request_body)


def _get_demo_fallback_response(
    canonical_id: str,
    inputs: Dict[str, str],
    params: Dict[str, str],
    request_body: Optional[Dict[str, Any]],
) -> Dict[str, Any]:
    from app.demo_data import DEMO_MEETING, DEMO_SLACK_POST_RESPONSE

    if "calendar" in canonical_id:
        return {
            "status": 200,
            "data": {
                "kind": "calendar#events",
                "items": [
                    {
                        "id": DEMO_MEETING["id"],
                        "summary": DEMO_MEETING["title"],
                        "start": {"dateTime": DEMO_MEETING["start_time"]},
                        "end": {"dateTime": DEMO_MEETING["end_time"]},
                        "description": DEMO_MEETING["description"],
                        "location": DEMO_MEETING["location"],
                        "hangoutLink": DEMO_MEETING["meeting_link"],
                        "organizer": {"displayName": DEMO_MEETING["organizer"], "email": "engineering-lead@company.com"},
                        "attendees": [
                            {"displayName": p["name"], "email": p["email"]}
                            for p in DEMO_MEETING["participants"]
                        ],
                    }
                ]
            }
        }
    elif "slack" in canonical_id:
        return DEMO_SLACK_POST_RESPONSE

    return {"status": 200, "message": "Success (Direct API Execution)", "canonical_id": canonical_id}