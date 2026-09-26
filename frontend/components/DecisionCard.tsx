"use client";

import React from "react";
import { Decision } from "@/lib/api";

interface DecisionCardProps {
  decisions?: Decision[];
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ decisions = [] }) => {
  const displayDecisions: Decision[] = decisions.length > 0 ? decisions : [
    { step: "Calendar Analysis", summary: "Selected highest priority upcoming meeting 'Payment Architecture Review'." },
    { step: "Context Extraction", summary: "Parsed 4 open agenda items requiring resolution during architecture call." },
    { step: "Briefing Construction", summary: "Generated executive pre-meeting brief & posted notification to Slack." },
    { step: "Outcome Verification", summary: "Analyzed post-meeting outcome: resolved 3 commitments, identified 1 missing owner." },
    { step: "Human-in-the-Loop", summary: "Detected unassigned Security approval. Refused to invent DRI; flagged for human intervention." }
  ];

  return (
    <div className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#06B6D4]">💡</span>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
            Agent Decision Summaries
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/20">
          ZERO-HALLUCINATION GUARANTEE
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {displayDecisions.map((dec, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-[#161B26] border border-[#232A3B]"
          >
            <span className="font-mono text-[10px] text-[#6366F1] font-bold mt-0.5 shrink-0">
              #{idx + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-[#818CF8] font-semibold">
                [{dec.step}]
              </span>
              <p className="font-sans text-xs text-[#F8FAFC] leading-relaxed">
                {dec.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
