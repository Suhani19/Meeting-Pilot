"use client";

import React, { useState } from "react";
import { HumanAttentionItem } from "@/lib/api";

interface HumanAttentionCardProps {
  humanQuestions?: HumanAttentionItem[];
  slackChannel?: string;
}

export const HumanAttentionCard: React.FC<HumanAttentionCardProps> = ({
  humanQuestions = [],
  slackChannel = "#demohackathon",
}) => {
  const [asked, setAsked] = useState(false);

  const handleAskSlack = () => {
    setAsked(true);
  };

  return (
    <div
      className="rounded-xl bg-[#10141D] p-5 border border-[#F59E0B]/40 relative overflow-hidden"
      style={{
        boxShadow:
          "0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 24px -4px rgba(245, 158, 11, 0.15)",
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center shrink-0 text-xl">
            ⚠️
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="font-sans text-sm font-bold text-[#F59E0B] tracking-tight">
                Human Attention Required
              </h3>
              <span className="px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] font-mono text-[10px] font-semibold uppercase border border-[#F59E0B]/20">
                MISSING DRI DETECTED
              </span>
            </div>

            <p className="font-sans text-xs text-[#F8FAFC]">
              "Security approval was discussed, but no owner was assigned."
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[11px] text-[#94A3B8]">
                Agent Decision:
              </span>
              <span className="font-mono text-[11px] text-[#F59E0B] font-semibold bg-[#0A0D12] px-2 py-0.5 rounded border border-[#232A3B]">
                "I will not invent an owner."
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {asked ? (
            <div className="flex items-center gap-2 bg-[#10B981]/15 text-[#10B981] px-4 py-2 rounded-lg font-mono text-xs font-semibold border border-[#10B981]/30">
              <span>✓ Notification sent to {slackChannel}</span>
            </div>
          ) : (
            <button
              onClick={handleAskSlack}
              className="px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
            >
              <span>💬</span>
              <span>Ask via Slack</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
