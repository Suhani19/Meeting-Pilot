"use client";

import React from "react";
import { Meeting } from "@/lib/api";

interface PreMeetingBriefProps {
  meeting?: Meeting;
  briefingText?: string;
}

export const PreMeetingBrief: React.FC<PreMeetingBriefProps> = ({ meeting, briefingText }) => {
  const m = meeting || {
    id: "evt_payment_arch_review_9942",
    title: "Payment Architecture Review",
    start_time: "2026-09-26T14:00:00Z",
    end_time: "2026-09-26T15:00:00Z",
    location: "Google Meet (meet.google.com/xyz-arch-rev)",
    meeting_link: "https://meet.google.com/xyz-arch-rev",
    description: "Critical architectural decision meeting to review Payment Engine v3. Objectives include resolving open items on retry handling, transaction reconciliation ownership, and security sign-off.",
    organizer: "Engineering Manager",
    participants: [
      { name: "Rahul", email: "rahul@company.com" },
      { name: "Priya", email: "priya@company.com" },
      { name: "Security Team", email: "security@company.com" },
      { name: "Engineering Manager", email: "eng-mgr@company.com" }
    ]
  };

  const openItems = [
    "Architecture v3 needs approval",
    "Retry mechanism status incomplete",
    "Reconciliation ownership unassigned",
    "Security approval required"
  ];

  const suggestedQuestions = [
    "Who will take primary engineering ownership for the retry mechanism?",
    "What are the specific security compliance prerequisites for sign-off?",
    "When is the target deadline for payment reconciliation deployment?"
  ];

  return (
    <div className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#6366F1] text-lg">📄</span>
          <div>
            <h3 className="font-sans text-sm font-semibold text-[#F8FAFC]">
              Pre-Meeting Briefing Card
            </h3>
            <p className="font-mono text-[11px] text-[#94A3B8]">
              Automated Google Calendar & Context Synthesis
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded bg-[#6366F1]/10 text-[#818CF8] font-mono text-[10px] font-semibold uppercase border border-[#6366F1]/20">
          SLACK BRIEF DISPATCHED
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">Meeting Title</span>
            <div className="font-sans text-sm font-bold text-[#F8FAFC] mt-0.5">{m.title}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#161B26] p-3 rounded-lg border border-[#232A3B]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">Time</span>
              <div className="font-mono text-xs text-[#06B6D4] font-medium mt-0.5">Today, 2:00 PM</div>
            </div>
            <div className="bg-[#161B26] p-3 rounded-lg border border-[#232A3B]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">Location</span>
              <div className="font-sans text-xs text-[#F8FAFC] truncate mt-0.5">{m.location || "Google Meet"}</div>
            </div>
          </div>

          <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">Context & Objectives</span>
            <p className="font-sans text-xs text-[#94A3B8] leading-relaxed mt-1">{m.description}</p>
          </div>

          <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">Participants</span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {m.participants.map((p, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-[#10141D] text-[#F8FAFC] font-sans text-xs border border-[#232A3B]">
                  👤 {p.name || p.email}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Open items & Questions */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#F59E0B]">Open Items Prior to Meeting</span>
            <ul className="flex flex-col gap-1.5 mt-2">
              {openItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-[#F8FAFC]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#818CF8]">Suggested Decision Questions</span>
            <ul className="flex flex-col gap-2 mt-2">
              {suggestedQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                  <span className="font-mono text-[#818CF8]">Q{idx + 1}:</span>
                  <span className="text-[#F8FAFC]">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
