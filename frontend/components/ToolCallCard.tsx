"use client";

import React from "react";
import { ToolEvent } from "@/lib/api";

interface ToolCallCardProps {
  toolEvents?: ToolEvent[];
}

export const ToolCallCard: React.FC<ToolCallCardProps> = ({ toolEvents = [] }) => {
  const displayEvents: ToolEvent[] = toolEvents.length > 0 ? toolEvents : [
    {
      id: "evt-1",
      timestamp: "00:01.02",
      tool: "Google Calendar",
      canonical_id: "calendar.event.get",
      status: "Success",
      result_summary: "10 upcoming events fetched",
      latency_ms: 42,
    },
    {
      id: "evt-2",
      timestamp: "00:02.85",
      tool: "Slack",
      canonical_id: "slack.chat.postmessage.create",
      status: "Success",
      result_summary: "Briefing sent to #demohackathon",
      latency_ms: 88,
    },
    {
      id: "evt-3",
      timestamp: "00:04.12",
      tool: "Swytchcode Commitment Engine",
      canonical_id: "commitment.engine.compare",
      status: "Success",
      result_summary: "Matched commitments: 3 resolved, 1 unresolved",
      latency_ms: 52,
    },
    {
      id: "evt-4",
      timestamp: "00:05.90",
      tool: "Action Verifier",
      canonical_id: "verifier.actions.check",
      status: "Success",
      result_summary: "Verified 2 planned actions executed cleanly",
      latency_ms: 15,
    }
  ];

  return (
    <div className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#818CF8]">🔧</span>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
            Swytchcode Tool Call Execution
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#94A3B8]">
          CLI INTEGRATIONS LAYER
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {displayEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[#161B26] border border-[#232A3B] hover:border-[#2E374D] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-semibold text-[#F8FAFC]">
                    {evt.tool}
                  </span>
                  <span className="font-mono text-[10px] text-[#818CF8] bg-[#6366F1]/10 px-1.5 py-0.5 rounded border border-[#6366F1]/20">
                    {evt.canonical_id}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#94A3B8] mt-0.5">
                  "{evt.result_summary}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded font-semibold border border-[#10B981]/20">
                {evt.status}
              </span>
              <span className="font-mono text-[10px] text-[#94A3B8]">
                {evt.latency_ms || 42}ms
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
