import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.agent.graph import build_graph
from app.models.schemas import (
    AgentRunRequest,
    MeetingOutcomeRequest,
    BeforeAfterComparisonResponse
)
from app.services.commitment_engine import compare_before_after
from app.demo_data import (
    DEMO_MEETING,
    DEMO_BEFORE_ITEMS,
    DEMO_AFTER_COMPARISONS,
    DEMO_OUTCOME_TRANSCRIPT
)

app = FastAPI(
    title="MeetingPilot AI API",
    description="AI meeting lifecycle agent backend powered by LangGraph and Swytchcode CLI",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Compile LangGraph application instance
agent_app = build_graph()


@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "MeetingPilot AI Backend",
        "swytchcode_mode": os.getenv("DEMO_MODE", "true"),
        "version": "1.0.0"
    }


@app.post("/api/agent/run")
def run_agent(request: AgentRunRequest):
    """
    Executes the full MeetingPilot AI agent workflow via LangGraph orchestration.
    """
    try:
        initial_state = {
            "user_request": request.prompt,
            "slack_channel": request.slack_channel or os.getenv("SLACK_CHANNEL_ID", "#demohackathon"),
            "tool_events": [],
            "decisions": []
        }

        # Run the LangGraph orchestration graph
        final_state = agent_app.invoke(initial_state)

        return {
            "status": "completed",
            "state": final_state
        }
    except Exception as ex:
        print(f"[API Error] Failed to execute agent: {ex}")
        raise HTTPException(status_code=500, detail=str(ex))


@app.post("/api/meeting/outcome", response_model=BeforeAfterComparisonResponse)
def analyze_meeting_outcome(request: MeetingOutcomeRequest):
    """
    Analyzes post-meeting transcript outcome against pre-meeting items.
    """
    try:
        outcome = request.outcome or DEMO_OUTCOME_TRANSCRIPT
        result = compare_before_after(DEMO_BEFORE_ITEMS, outcome)

        return {
            "meeting_id": request.meeting_id,
            "title": DEMO_MEETING["title"],
            "comparisons": result["comparisons"],
            "resolved_items": result["resolved_items"],
            "unresolved_items": result["unresolved_items"],
            "planned_actions": result["planned_actions"],
            "human_attention_required": result["human_attention_required"]
        }
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))


@app.get("/api/demo")
def get_demo_data():
    """
    Returns deterministic demo dataset for Hackathon presentation.
    """
    return {
        "meeting": DEMO_MEETING,
        "before_items": DEMO_BEFORE_ITEMS,
        "after_comparisons": DEMO_AFTER_COMPARISONS,
        "outcome_transcript": DEMO_OUTCOME_TRANSCRIPT
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)