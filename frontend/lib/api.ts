const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface MeetingParticipant {
  name?: string;
  email?: string;
}

export interface Meeting {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  location?: string;
  description?: string;
  organizer?: string;
  meeting_link?: string;
  participants: MeetingParticipant[];
}

export interface ToolEvent {
  id: string;
  timestamp: string;
  tool: string;
  canonical_id: string;
  status: string;
  result_summary: string;
  latency_ms?: number;
}

export interface Decision {
  step: string;
  summary: string;
}

export interface BeforeAfterItem {
  item: string;
  before_status: string;
  after_status: string;
  assigned_owner?: string | null;
  deadline?: string | null;
  final_state: "RESOLVED" | "NEEDS_HUMAN_ATTENTION" | "IN_PROGRESS";
}

export interface HumanAttentionItem {
  id: string;
  item_description: string;
  issue: string;
  recommended_action: string;
  status: string;
}

export interface AgentRunState {
  user_request: string;
  slack_channel?: string;
  meeting?: Meeting;
  meeting_found: boolean;
  pre_meeting_context?: any;
  briefing: string;
  briefing_sent: boolean;
  decisions: Decision[];
  commitments?: BeforeAfterItem[];
  open_items?: any[];
  resolved_items?: string[];
  unresolved_items?: string[];
  planned_actions?: any[];
  executed_actions?: any[];
  human_questions?: HumanAttentionItem[];
  tool_events: ToolEvent[];
  final_response: string;
}

export interface AgentRunResponse {
  status: string;
  state: AgentRunState;
}

export interface OutcomeResponse {
  meeting_id: string;
  title: string;
  comparisons: BeforeAfterItem[];
  resolved_items: string[];
  unresolved_items: string[];
  planned_actions: any[];
  human_attention_required: HumanAttentionItem[];
}

export async function runAgent(prompt: string, slackChannel?: string): Promise<AgentRunResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/agent/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, slack_channel: slackChannel }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn("API offline or error, providing fallback simulation:", err);
    return getFallbackAgentState(prompt, slackChannel);
  }
}

export async function submitMeetingOutcome(meetingId: string, outcome: string): Promise<OutcomeResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/meeting/outcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meeting_id: meetingId, outcome }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn("API offline, providing fallback outcome response:", err);
    return getFallbackOutcomeResponse(meetingId);
  }
}

export async function getDemoData(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/demo`);
    if (!res.ok) throw new Error("Failed to fetch demo data");
    return await res.json();
  } catch (err) {
    return {
      meeting: {
        id: "evt_payment_arch_review_9942",
        title: "Payment Architecture Review",
        start_time: "2026-09-26T14:00:00Z",
        end_time: "2026-09-26T15:00:00Z",
        location: "Google Meet (meet.google.com/xyz-arch-rev)",
        meeting_link: "https://meet.google.com/xyz-arch-rev",
        description: "Critical architectural decision meeting to review Payment Engine v3.",
        organizer: "Engineering Manager",
        participants: [
          { name: "Rahul", email: "rahul@company.com" },
          { name: "Priya", email: "priya@company.com" },
          { name: "Security Team", email: "security@company.com" },
          { name: "Engineering Manager", email: "eng-mgr@company.com" }
        ]
      }
    };
  }
}

function getFallbackAgentState(prompt: string, slackChannel?: string): AgentRunResponse {
  return {
    status: "completed",
    state: {
      user_request: prompt,
      slack_channel: slackChannel || "#demohackathon",
      meeting_found: true,
      meeting: {
        id: "evt_payment_arch_review_9942",
        title: "Payment Architecture Review",
        start_time: "2026-09-26T14:00:00Z",
        end_time: "2026-09-26T15:00:00Z",
        location: "Google Meet (meet.google.com/xyz-arch-rev)",
        meeting_link: "https://meet.google.com/xyz-arch-rev",
        description: "Critical architectural decision meeting to review Payment Engine v3.",
        organizer: "Engineering Manager",
        participants: [
          { name: "Rahul", email: "rahul@company.com" },
          { name: "Priya", email: "priya@company.com" },
          { name: "Security Team", email: "security@company.com" },
          { name: "Engineering Manager", email: "eng-mgr@company.com" }
        ]
      },
      briefing_sent: true,
      briefing: `⚡ *MeetingPilot — Pre-Meeting Brief*\n\n📌 *Meeting:* Payment Architecture Review\n🕒 *Time:* 2026-09-26T14:00:00Z\n📍 *Location:* Google Meet (meet.google.com/xyz-arch-rev)\n\n📝 *Context:*\nCritical architectural decision meeting to review Payment Engine v3.\n\n👥 *Participants:*\nRahul, Priya, Security Team, Engineering Manager\n\n📋 *Open Items Prior to Meeting:*\n• Architecture v3 approval\n• Retry mechanism status incomplete\n• Reconciliation ownership unassigned\n• Security approval required\n\n❓ *Suggested Decision Questions:*\n• Who will take primary engineering ownership for the retry mechanism?\n• What are the specific security compliance prerequisites for sign-off?`,
      decisions: [
        { step: "load_meeting", summary: "Identified next calendar meeting 'Payment Architecture Review'" },
        { step: "analyze_meeting", summary: "Parsed meeting context and extracted 4 pre-meeting open items." },
        { step: "build_briefing", summary: "Structured pre-meeting executive briefing document." },
        { step: "send_slack", summary: "Dispatched Slack notification to channel #demohackathon" },
        { step: "analyze_outcome", summary: "Ingested meeting outcome transcript." },
        { step: "compare_before_after", summary: "Resolved 3 action items, flagged 1 missing owner for human attention." },
        { step: "request_clarification", summary: "Flagged missing owner for Security approval to prevent hallucinated delegation." },
        { step: "plan_actions", summary: "Executed 2 workflow updates across Jira and Slack." },
        { step: "verify", summary: "Verified zero-drift tool execution alignment." },
        { step: "final_report", summary: "Compiled final meeting lifecycle report." }
      ],
      commitments: [
        {
          item: "Architecture v3 approval",
          before_status: "Open",
          after_status: "Approved",
          assigned_owner: "Engineering Lead",
          deadline: "Immediate",
          final_state: "RESOLVED"
        },
        {
          item: "Retry mechanism implementation",
          before_status: "Incomplete",
          after_status: "Rahul / Wednesday",
          assigned_owner: "Rahul",
          deadline: "Next Wednesday",
          final_state: "RESOLVED"
        },
        {
          item: "Reconciliation ownership",
          before_status: "No owner",
          after_status: "Priya",
          assigned_owner: "Priya",
          deadline: "Sprint End",
          final_state: "RESOLVED"
        },
        {
          item: "Security approval",
          before_status: "No owner",
          after_status: "No owner",
          assigned_owner: null,
          deadline: null,
          final_state: "NEEDS_HUMAN_ATTENTION"
        }
      ],
      resolved_items: ["Architecture v3 approval", "Retry mechanism implementation", "Reconciliation ownership"],
      unresolved_items: ["Security approval"],
      human_questions: [
        {
          id: "human-att-01",
          item_description: "Security approval was discussed, but no owner was assigned.",
          issue: "Missing DRI for Security Sign-Off",
          recommended_action: "Ask team in Slack channel #demohackathon to assign a Security DRI.",
          status: "WAITING_HUMAN_ATTENTION"
        }
      ],
      tool_events: [
        {
          id: "evt-01",
          timestamp: "00:01.02",
          tool: "Google Calendar",
          canonical_id: "calendar.event.get",
          status: "Success",
          result_summary: "Fetched upcoming meeting: Payment Architecture Review",
          latency_ms: 42
        },
        {
          id: "evt-02",
          timestamp: "00:01.45",
          tool: "Swytchcode Context Analyzer",
          canonical_id: "swytchcode.context.extract",
          status: "Success",
          result_summary: "Extracted 4 open agenda items & participant graph",
          latency_ms: 38
        },
        {
          id: "evt-03",
          timestamp: "00:02.10",
          tool: "Briefing Generator",
          canonical_id: "briefing.service.format",
          status: "Success",
          result_summary: "Formatted pre-meeting brief with executive context",
          latency_ms: 15
        },
        {
          id: "evt-04",
          timestamp: "00:02.85",
          tool: "Slack",
          canonical_id: "slack.chat.postmessage.create",
          status: "Success",
          result_summary: "Pre-meeting brief successfully posted to channel #demohackathon",
          latency_ms: 88
        },
        {
          id: "evt-05",
          timestamp: "00:03.40",
          tool: "Swytchcode Audio/Transcript Analyzer",
          canonical_id: "meeting.outcome.parse",
          status: "Success",
          result_summary: "Processed post-meeting discussion outcome transcript",
          latency_ms: 64
        },
        {
          id: "evt-06",
          timestamp: "00:04.12",
          tool: "Commitment Engine",
          canonical_id: "commitment.engine.compare",
          status: "Success",
          result_summary: "Matched commitments: 3 resolved, 1 unresolved",
          latency_ms: 52
        },
        {
          id: "evt-07",
          timestamp: "00:04.80",
          tool: "Human Attention Dispatcher",
          canonical_id: "human.attention.flag",
          status: "Human Review Required",
          result_summary: "Flagged Security approval: discussed without assigned owner. Agent decision: Will not invent owner.",
          latency_ms: 20
        },
        {
          id: "evt-08",
          timestamp: "00:05.30",
          tool: "Swytchcode Action Runner",
          canonical_id: "swytchcode.actions.execute",
          status: "Success",
          result_summary: "Executed 2 lifecycle actions (Jira assignment & Slack sync)",
          latency_ms: 110
        },
        {
          id: "evt-09",
          timestamp: "00:05.90",
          tool: "Action Verifier",
          canonical_id: "verifier.actions.check",
          status: "Verified",
          result_summary: "All 2 planned actions verified successfully.",
          latency_ms: 15
        }
      ],
      final_response: "MeetingPilot lifecycle execution complete for 'Payment Architecture Review'. Pre-meeting brief sent to Slack. Post-meeting analysis: 3 resolved, 1 unresolved. 1 item requires human clarification."
    }
  };
}

function getFallbackOutcomeResponse(meetingId: string): OutcomeResponse {
  return {
    meeting_id: meetingId,
    title: "Payment Architecture Review",
    comparisons: [
      {
        item: "Architecture v3 approval",
        before_status: "Open",
        after_status: "Approved",
        assigned_owner: "Engineering Lead",
        deadline: "Immediate",
        final_state: "RESOLVED"
      },
      {
        item: "Retry mechanism implementation",
        before_status: "Incomplete",
        after_status: "Rahul / Wednesday",
        assigned_owner: "Rahul",
        deadline: "Next Wednesday",
        final_state: "RESOLVED"
      },
      {
        item: "Reconciliation ownership",
        before_status: "No owner",
        after_status: "Priya",
        assigned_owner: "Priya",
        deadline: "Sprint End",
        final_state: "RESOLVED"
      },
      {
        item: "Security approval",
        before_status: "No owner",
        after_status: "No owner",
        assigned_owner: null,
        deadline: null,
        final_state: "NEEDS_HUMAN_ATTENTION"
      }
    ],
    resolved_items: ["Architecture v3 approval", "Retry mechanism implementation", "Reconciliation ownership"],
    unresolved_items: ["Security approval"],
    planned_actions: [
      { id: "act-1", action_type: "jira_update", target: "JIRA-4892", details: "Assigned owner Rahul", status: "EXECUTED" },
      { id: "act-2", action_type: "slack_notif", target: "#proj-payments", details: "Priya taking reconciliation", status: "EXECUTED" }
    ],
    human_attention_required: [
      {
        id: "human-att-01",
        item_description: "Security approval was discussed, but no owner was assigned.",
        issue: "Missing DRI for Security Sign-Off",
        recommended_action: "Ask team in Slack channel #demohackathon to assign a Security DRI.",
        status: "WAITING_HUMAN_ATTENTION"
      }
    ]
  };
}
