from typing import Dict, Any, Optional
from app.tools.swytchcode import execute_swytchcode, get_credential


def send_slack_message(
    channel_id: Optional[str] = None,
    text: str = "",
) -> Dict[str, Any]:
    """
    Sends a Slack message via Swytchcode CLI integration using slack.chat.postmessage.create.
    Credential priority:
    1. Process Environment Variable
    2. ~/.swytchcode/credentials (or auth.json/config.json)
    3. .env file
    Keys go directly to the API (Swytchcode servers are never in the request path).
    """
    slack_channel = channel_id or get_credential("SLACK_CHANNEL_ID") or "C0C4FNT8L0K"
    slack_token = get_credential("SLACK_BOT_TOKEN")

    headers = {}
    if slack_token:
        headers["Authorization"] = f"Bearer {slack_token}"

    request_body = {
        "channel": slack_channel,
        "text": text,
    }

    print(f"[Slack Tool] Direct API Execution to channel: {slack_channel}")

    response = execute_swytchcode(
        canonical_id="slack.chat.postmessage.create",
        inputs={
            "channel": slack_channel,
            "text": text,
        },
        request_body=request_body,
        headers=headers,
    )

    return response
