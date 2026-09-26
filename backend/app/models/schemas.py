from typing import Optional, List, Any
from pydantic import BaseModel, Field


class AgentRunRequest(BaseModel):
    prompt: str = Field(default="Prepare me for my next meeting and send me a Slack briefing.")
    slack_channel: Optional[str] = Field(default=None)


class MeetingOutcomeRequest(BaseModel):
    meeting_id: str
    outcome: str


class CommitmentModel(BaseModel):
    id: Optional[str] = None
    description: str
    owner: Optional[str] = None
    deadline: Optional[str] = None
    status: str = "OPEN"  # OPEN, RESOLVED, BLOCKED, NEEDS_OWNER, NEEDS_DEADLINE
    confidence: float = 1.0
    source: str = "meeting_notes"


class ActionPlanModel(BaseModel):
    id: str
    action_type: str
    target: str
    details: str
    status: str = "PENDING"  # PENDING, EXECUTED, BLOCKED, WAITING_HUMAN


class HumanClarificationModel(BaseModel):
    id: str
    item_description: str
    issue: str
    recommended_action: str
    status: str = "WAITING"


class ToolEventModel(BaseModel):
    id: str
    timestamp: str
    tool: str
    canonical_id: str
    status: str
    result_summary: str
    raw_output: Optional[Any] = None
    latency_ms: Optional[int] = 42


class BeforeAfterComparisonItem(BaseModel):
    item: str
    before_status: str
    after_status: str
    assigned_owner: Optional[str] = None
    deadline: Optional[str] = None
    final_state: str  # RESOLVED, NEEDS_HUMAN_ATTENTION, IN_PROGRESS


class BeforeAfterComparisonResponse(BaseModel):
    meeting_id: str
    title: str
    comparisons: List[BeforeAfterComparisonItem]
    resolved_items: List[str]
    unresolved_items: List[str]
    planned_actions: List[ActionPlanModel]
    human_attention_required: List[HumanClarificationModel]
