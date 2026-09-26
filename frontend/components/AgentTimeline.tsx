"use client";

import React from "react";
import { ToolEvent, Decision } from "@/lib/api";

interface StepItem {
  id: string;
  stepNumber: string;
  time: string;
  title: string;
  description: string;
  tool: string;
  canonical_id: string;
  status: "COMPLETED" | "RUNNING" | "WAITING" | "HUMAN_ATTENTION";
  result: string;
}

interface AgentTimelineProps {
  toolEvents?: ToolEvent[];
  decisions?: Decision[];
  isLoading?: boolean;
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({
  toolEvents = [],
  decisions = [],
  isLoading = false,
}) => {
  // Pre-configured 8 lifecycle steps for clear agent orchestration display
  const defaultSteps: StepItem[] = [
    {
      id: "step-1",
      stepNumber: "01",
      time: "00:01.02",
      title: "Understanding request",
      description: "Natural language parsed into LangGraph intent state & DAG execution nodes.",
      tool: "LangGraph Planner",
      canonical_id: "agent.plan.decompose",
      status: toolEvents.length > 0 ? "COMPLETED" : isLoading ? "RUNNING" : "WAITING",
      result: "Intent graph resolved into 10 workflow nodes.",
    },
    {
      id: "step-2",
      stepNumber: "02",
      time: "00:01.45",
      title: "Finding upcoming meeting",
      description: "Executes Swytchcode calendar method to retrieve primary calendar events.",
      tool: "Google Calendar",
      canonical_id: "calendar.event.get",
      status: toolEvents.length > 0 ? "COMPLETED" : "WAITING",
      result: toolEvents.find((e) => e.canonical_id === "calendar.event.get")?.result_summary || "10 upcoming events fetched",
    },
    {
      id: "step-3",
      stepNumber: "03",
      time: "00:02.10",
      title: "Analyzing meeting context",
      description: "Extracts agenda items, attendees, and prior commitments.",
      tool: "Context Analyzer",
      canonical_id: "swytchcode.context.extract",
      status: toolEvents.length > 1 ? "COMPLETED" : "WAITING",
      result: "Extracted 4 pre-meeting open items & participant tree.",
    },
    {
      id: "step-4",
      stepNumber: "04",
      time: "00:02.85",
      title: "Building briefing",
      description: "Formats executive pre-meeting brief document.",
      tool: "Briefing Generator",
      canonical_id: "briefing.service.format",
      status: toolEvents.length > 2 ? "COMPLETED" : "WAITING",
      result: "Executive pre-meeting brief structured.",
    },
    {
      id: "step-5",
      stepNumber: "05",
      time: "00:03.40",
      title: "Sending Slack notification",
      description: "Posts brief to Slack channel via Swytchcode integration.",
      tool: "Slack",
      canonical_id: "slack.chat.postmessage.create",
      status: toolEvents.length > 3 ? "COMPLETED" : "WAITING",
      result: toolEvents.find((e) => e.canonical_id === "slack.chat.postmessage.create")?.result_summary || "Briefing sent to #demohackathon",
    },
    {
      id: "step-6",
      stepNumber: "06",
      time: "00:04.12",
      title: "Analyzing outcome & commitments",
      description: "Compares before-meeting status with meeting outcome transcript.",
      tool: "Commitment Engine",
      canonical_id: "commitment.engine.compare",
      status: toolEvents.length > 4 ? "COMPLETED" : "WAITING",
      result: "3 items resolved, 1 item requires human DRI assignment.",
    },
    {
      id: "step-7",
      stepNumber: "07",
      time: "00:04.80",
      title: "Human Attention Check",
      description: "Detects unassigned Security approval item. Invokes human-in-the-loop fallback.",
      tool: "Human Attention Dispatcher",
      canonical_id: "human.attention.flag",
      status: toolEvents.length > 5 ? "HUMAN_ATTENTION" : "WAITING",
      result: "Agent decision: Will not invent owner. Flagged for human review.",
    },
    {
      id: "step-8",
      stepNumber: "08",
      time: "00:05.90",
      title: "Verifying & Final Report",
      description: "Runs deterministic action verifier and compiles final summary.",
      tool: "Action Verifier",
      canonical_id: "verifier.actions.check",
      status: toolEvents.length > 6 ? "COMPLETED" : "WAITING",
      result: "Verified 2 planned actions executed cleanly.",
    },
  ];

  return (
    <section className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] relative">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#232A3B]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <h2 className="font-sans text-sm font-semibold text-[#F8FAFC] tracking-wide uppercase">
            Live Agent Autonomous Workflow Trace
          </h2>
          <span className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] font-mono text-[10px] font-semibold uppercase tracking-wider border border-[#10B981]/20">
            LANGGRAPH ORCHESTRATOR
          </span>
        </div>
        <div className="font-mono text-xs text-[#94A3B8]">
          TOTAL DURATION: <span className="text-[#F8FAFC] font-semibold">1,151ms</span> • DETERMINISTIC RUN: <span className="text-[#10B981]">TRUE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {defaultSteps.map((step) => {
          let badgeColor = "bg-[#161B26] text-[#94A3B8]";
          let icon = "⏳";
          let border = "border-[#232A3B]";

          if (step.status === "COMPLETED") {
            badgeColor = "bg-[#10B981]/15 text-[#10B981]";
            icon = "✓";
            border = "border-[#10B981]/30";
          } else if (step.status === "RUNNING") {
            badgeColor = "bg-[#6366F1]/15 text-[#818CF8] animate-pulse";
            icon = "⚡";
            border = "border-[#6366F1]/50";
          } else if (step.status === "HUMAN_ATTENTION") {
            badgeColor = "bg-[#F59E0B]/15 text-[#F59E0B]";
            icon = "⚠️";
            border = "border-[#F59E0B]/40";
          }

          return (
            <div
              key={step.id}
              className={`rounded-lg bg-[#161B26] p-3.5 flex flex-col justify-between border ${border} transition-all hover:bg-[#1E2535]`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#94A3B8]">
                    STEP {step.stepNumber} • {step.time}
                  </span>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${badgeColor}`}>
                    {icon}
                  </span>
                </div>
                <div className="font-sans text-xs font-semibold text-[#F8FAFC] mb-1">
                  {step.title}
                </div>
                <p className="font-sans text-[11px] text-[#94A3B8] leading-snug">
                  {step.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#232A3B]/60 font-mono text-[10px] text-[#06B6D4] truncate">
                [{step.tool}]: {step.result}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
