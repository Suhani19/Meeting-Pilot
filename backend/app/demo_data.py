"""
Demo data for MeetingPilot Hackathon project.
Provides deterministic data for realistic testing and demo flow.
"""

DEMO_MEETING = {
    "id": "evt_payment_arch_review_9942",
    "title": "Payment Architecture Review",
    "start_time": "2026-09-26T14:00:00Z",
    "end_time": "2026-09-26T15:00:00Z",
    "location": "Google Meet (meet.google.com/xyz-arch-rev)",
    "meeting_link": "https://meet.google.com/xyz-arch-rev",
    "description": "Critical architectural decision meeting to review Payment Engine v3. Objectives include resolving open items on retry handling, transaction reconciliation ownership, and security sign-off.",
    "organizer": "Engineering Manager",
    "participants": [
        {"name": "Rahul", "email": "rahul@company.com"},
        {"name": "Priya", "email": "priya@company.com"},
        {"name": "Security Team", "email": "security@company.com"},
        {"name": "Engineering Manager", "email": "eng-mgr@company.com"}
    ]
}

DEMO_BEFORE_ITEMS = [
    {
        "id": "item-1",
        "description": "Architecture v3 needs approval",
        "status": "OPEN",
        "owner": None,
        "deadline": None
    },
    {
        "id": "item-2",
        "description": "Retry mechanism incomplete",
        "status": "OPEN",
        "owner": None,
        "deadline": None
    },
    {
        "id": "item-3",
        "description": "Reconciliation has no owner",
        "status": "NEEDS_OWNER",
        "owner": None,
        "deadline": None
    },
    {
        "id": "item-4",
        "description": "Security approval required",
        "status": "OPEN",
        "owner": None,
        "deadline": None
    }
]

DEMO_OUTCOME_TRANSCRIPT = (
    "In the Payment Architecture Review meeting: Architecture v3 was officially approved by the team. "
    "Rahul committed to own and finish the retry mechanism by Wednesday. "
    "Priya volunteered to take full ownership of transaction reconciliation. "
    "Security approval was discussed extensively regarding compliance requirements, but no owner was assigned."
)

DEMO_AFTER_COMPARISONS = [
    {
        "item": "Architecture v3 approval",
        "before_status": "Open",
        "after_status": "Approved",
        "assigned_owner": "Engineering Lead",
        "deadline": "Immediate",
        "final_state": "RESOLVED"
    },
    {
        "item": "Retry mechanism implementation",
        "before_status": "Incomplete",
        "after_status": "Rahul / Wednesday",
        "assigned_owner": "Rahul",
        "deadline": "Next Wednesday",
        "final_state": "RESOLVED"
    },
    {
        "item": "Reconciliation ownership",
        "before_status": "No owner",
        "after_status": "Priya",
        "assigned_owner": "Priya",
        "deadline": "Sprint End",
        "final_state": "RESOLVED"
    },
    {
        "item": "Security approval",
        "before_status": "No owner",
        "after_status": "No owner",
        "assigned_owner": None,
        "deadline": None,
        "final_state": "NEEDS_HUMAN_ATTENTION"
    }
]

DEMO_SLACK_POST_RESPONSE = {
    "ok": True,
    "channel": "C08DEMO1234",
    "ts": "1727352000.000100",
    "message": {
        "text": "MeetingPilot — Pre-Meeting Briefing sent successfully!",
        "username": "MeetingPilot Bot",
        "bot_id": "B08MEETINGPILOT"
    }
}
