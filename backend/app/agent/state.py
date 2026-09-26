from typing import TypedDict, Optional, List, Dict, Any


class MeetingState(TypedDict, total=False):
    user_request: str
    slack_channel: Optional[str]
    
    meeting: Optional[Dict[str, Any]]
    meeting_found: bool

    pre_meeting_context: Dict[str, Any]
    briefing: str
    briefing_sent: bool

    decisions: List[Dict[str, Any]]
    commitments: List[Dict[str, Any]]
    open_items: List[Dict[str, Any]]
    resolved_items: List[Dict[str, Any]]
    unresolved_items: List[Dict[str, Any]]

    planned_actions: List[Dict[str, Any]]
    executed_actions: List[Dict[str, Any]]

    human_questions: List[Dict[str, Any]]

    tool_events: List[Dict[str, Any]]

    final_response: str