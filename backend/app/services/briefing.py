from typing import Dict, Any, List


def generate_pre_meeting_briefing(
    meeting: Dict[str, Any],
    open_items: List[Dict[str, Any]] = None,
    suggested_questions: List[str] = None
) -> str:
    """
    Generates a structured pre-meeting briefing string from Meeting data.
    Architecture is ready for future LLM enhancement.
    """
    title = meeting.get("title", "Untitled Meeting")
    start_time = meeting.get("start_time", "TBD")
    location = meeting.get("location", "Not specified")
    context = meeting.get("description", "No description provided.")

    participants = meeting.get("participants", [])
    if participants and isinstance(participants[0], dict):
        participant_names = [p.get("name") or p.get("email", "Unknown") for p in participants]
    else:
        participant_names = [str(p) for p in participants]
    
    participants_str = ", ".join(participant_names) if participant_names else "None listed"

    open_items = open_items or [
        "Architecture v3 needs approval",
        "Retry mechanism status incomplete",
        "Reconciliation ownership unassigned",
        "Security approval required for release"
    ]

    suggested_questions = suggested_questions or [
        "Who will take primary engineering ownership for the retry mechanism?",
        "What are the specific security compliance prerequisites for sign-off?",
        "When is the target deadline for payment reconciliation deployment?"
    ]

    open_items_str = "\n".join([f"• {item if isinstance(item, str) else item.get('description')}" for item in open_items])
    questions_str = "\n".join([f"• {q}" for q in suggested_questions])

    briefing = (
        f"⚡ *MeetingPilot — Pre-Meeting Brief*\n\n"
        f"📌 *Meeting:* {title}\n"
        f"🕒 *Time:* {start_time}\n"
        f"📍 *Location:* {location}\n\n"
        f"📝 *Context:*\n{context}\n\n"
        f"👥 *Participants:*\n{participants_str}\n\n"
        f"📋 *Open Items Prior to Meeting:*\n{open_items_str}\n\n"
        f"❓ *Suggested Decision Questions:*\n{questions_str}"
    )

    return briefing
