# MeetingPilot — AI Meeting Lifecycle Agent ✈️

> **Tagline:** “Before the meeting. During the decision. After the action.”

MeetingPilot is an autonomous AI agent that manages the end-to-end lifecycle of critical team meetings. From discovering upcoming Google Calendar events and preparing executive pre-meeting briefings to dispatching notifications to Slack and tracking post-meeting decisions, action items, deadlines, and unresolved commitments — MeetingPilot ensures zero decision drift across your team.

---

## 🎯 Problem Statement

Modern teams lose hours every week before and after meetings:
1. **Pre-meeting friction:** Context is scattered across calendars, Jira, and Slack, leaving participants unprepared.
2. **Post-meeting drop-off:** Action items discussed during calls are frequently forgotten or left without explicit Direct Responsibility Individuals (DRIs).
3. **Agent Hallucination Risk:** Traditional AI summaries invent owners or deadlines when none were assigned during the discussion.

**MeetingPilot solves this** by acting as an autonomous meeting lifecycle supervisor that strictly enforces DRI accountability and invokes **Human Attention Flags** whenever action items lack a designated owner.

---

## 🏗️ Architecture & Stack

### Backend Stack
- **Python 3.11+**
- **FastAPI** — High-performance web API framework.
- **LangGraph** — StateGraph orchestrator with conditional node routing and state persistence.
- **Pydantic v2** — Schema validation and type safety.
- **Swytchcode CLI Integration Wrapper** — Subprocess execution layer interfacing directly with external tools via PowerShell on Windows (`calendar.event.get`, `slack.chat.postmessage.create`).
- **Uvicorn** — ASGI web server.

### Frontend Stack
- **Next.js 14+ (App Router)**
- **TypeScript**
- **Tailwind CSS** — Styled matching `stitch_meetingpilot_ai_dashboard` deep slate modern SaaS aesthetic.
- **Inter & JetBrains Mono** typography.

```
meetingpilot/
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Main MeetingPilot AI Dashboard
│   │   ├── layout.tsx        # Modern dark SaaS layout & fonts
│   │   └── globals.css       # Design system styles & dark scrollbars
│   ├── components/
│   │   ├── PromptBox.tsx     # Hero agent execution & prompt input panel
│   │   ├── AgentTimeline.tsx # Live LangGraph step-by-step trace
│   │   ├── ToolCallCard.tsx  # Swytchcode CLI tool execution card
│   │   ├── DecisionCard.tsx  # Agent decision summaries
│   │   ├── PreMeetingBrief.tsx# Executive pre-meeting briefing card
│   │   ├── BeforeAfterPanel.tsx # Pre-vs-Post commitment tracker table
│   │   ├── HumanAttentionCard.tsx # Missing DRI human-in-the-loop alert
│   │   └── FinalReport.tsx   # Lifecycle summary metrics
│   └── lib/
│       └── api.ts            # Frontend API client & fallback simulation
│
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI endpoints (/api/agent/run, /api/meeting/outcome, /api/demo)
│   │   ├── agent/
│   │   │   ├── state.py      # MeetingState TypedDict definition
│   │   │   └── graph.py      # LangGraph StateGraph orchestration workflow
│   │   ├── tools/
│   │   │   ├── __init__.py
│   │   │   ├── swytchcode.py # Swytchcode CLI execution wrapper (PowerShell)
│   │   │   ├── calendar.py   # Google Calendar tool (calendar.event.get)
│   │   │   └── slack.py      # Slack tool (slack.chat.postmessage.create)
│   │   ├── services/
│   │   │   ├── briefing.py   # Pre-meeting briefing service
│   │   │   ├── commitment_engine.py # Before/After commitment analysis engine
│   │   │   └── verifier.py   # Action verifier
│   │   ├── models/
│   │   │   └── schemas.py    # Request & Response Pydantic models
│   │   └── demo_data.py      # Deterministic hackathon demo dataset
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## ⚡ Agent Workflow (LangGraph Graph)

```
START 
  └─► load_meeting (Google Calendar tool via Swytchcode CLI)
        ├─► [No meeting found] ──► final_report ──► END
        └─► analyze_meeting (Extract agenda & pre-meeting items)
              └─► build_briefing (Format pre-meeting executive brief)
                    └─► send_slack (Post brief to Slack channel)
                          └─► analyze_outcome (Ingest post-meeting transcript)
                                └─► compare_before_after (Commitment Engine)
                                      ├─► [Missing DRI?] ──► request_clarification (Human Attention Required)
                                      │                            └─► plan_actions
                                      └─► plan_actions (Execute Jira/Slack updates)
                                            └─► verify (Action Verifier)
                                                  └─► final_report ──► END
```

---

## 🔌 Swytchcode Integration Layer

MeetingPilot leverages **Swytchcode CLI** as its external tool execution layer:
- **Google Calendar integration:** Invokes `swy exec calendar.event.get` with `--input calendarId=primary` and `--param singleEvents=true`.
- **Slack integration:** Invokes `swy exec slack.chat.postmessage.create` with JSON payload body files for Windows compatibility.
- **Fallback Resilience:** Includes `DEMO_MODE=true` fallback logic for high hackathon reliability.

---

## 🛠️ Quick Start & Setup

### 1. Backend Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

#### `backend/.env`
```env
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_CHANNEL_ID=C08DEMO1234
SWYTCHCODE_PROJECT_ROOT=c:/Users/suhan/Downloads/Monad project/swytchcode
DEMO_MODE=true
```

#### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🎤 Hackathon Pitch & Demo Flow

1. **Launch App:** Open the live dashboard at `http://localhost:3000`.
2. **Execute Agent:** Click **"⚡ Run Agent"** in the Prompt Bar.
3. **Watch Real-Time Trace:** Observe the live **LangGraph Autonomous Trace** executing calendar retrieval, context analysis, briefing construction, and Slack dispatch.
4. **Pre-Meeting Brief Card:** View the generated executive brief with context and decision questions.
5. **Before vs After Panel:** Review the commitment comparison table:
   - *Architecture v3 approval:* Open → Approved → **Resolved**
   - *Retry mechanism:* Incomplete → Rahul / Wednesday → **Resolved**
   - *Reconciliation ownership:* No owner → Priya → **Resolved**
   - *Security approval:* No owner → No owner → **Needs Human Attention**
6. **Human Attention Card:** Highlight the amber alert. Point out the agent decision: *"I will not invent an owner."* Click **"Ask via Slack"** to dispatch the human clarification request.
7. **Final Report:** Review metrics showing 4 items tracked, 3 resolved, 1 unresolved, 2 action items updated, and 1 human clarification requested.
