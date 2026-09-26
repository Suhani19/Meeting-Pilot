"use client";

import React from "react";

interface FinalReportProps {
  metrics?: {
    openBefore: number;
    resolved: number;
    unresolved: number;
    actionItemsUpdated: number;
    slackNotifications: number;
    humanClarifications: number;
  };
}

export const FinalReport: React.FC<FinalReportProps> = ({ metrics }) => {
  const m = metrics || {
    openBefore: 4,
    resolved: 3,
    unresolved: 1,
    actionItemsUpdated: 2,
    slackNotifications: 2,
    humanClarifications: 1,
  };

  return (
    <div className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#10B981] text-lg">🏁</span>
          <div>
            <h3 className="font-sans text-sm font-semibold text-[#F8FAFC]">
              Final Agent Execution Report
            </h3>
            <p className="font-mono text-[11px] text-[#10B981]">
              Meeting Processed Successfully
            </p>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded border border-[#10B981]/30 font-semibold uppercase">
          WORKFLOW COMPLETE
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8]">Open Before</span>
          <span className="font-sans text-xl font-bold text-[#F8FAFC]">{m.openBefore}</span>
          <span className="font-mono text-[10px] text-[#94A3B8]">items tracked</span>
        </div>

        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#10B981]">Resolved</span>
          <span className="font-sans text-xl font-bold text-[#10B981]">{m.resolved}</span>
          <span className="font-mono text-[10px] text-[#10B981]">commitments</span>
        </div>

        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#F59E0B]">Unresolved</span>
          <span className="font-sans text-xl font-bold text-[#F59E0B]">{m.unresolved}</span>
          <span className="font-mono text-[10px] text-[#F59E0B]">item pending</span>
        </div>

        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#818CF8]">Actions Updated</span>
          <span className="font-sans text-xl font-bold text-[#818CF8]">{m.actionItemsUpdated}</span>
          <span className="font-mono text-[10px] text-[#818CF8]">Jira tickets</span>
        </div>

        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#06B6D4]">Slack Notifications</span>
          <span className="font-sans text-xl font-bold text-[#06B6D4]">{m.slackNotifications}</span>
          <span className="font-mono text-[10px] text-[#06B6D4]">messages sent</span>
        </div>

        <div className="bg-[#161B26] p-3.5 rounded-lg border border-[#232A3B] flex flex-col gap-1">
          <span className="font-mono text-[10px] uppercase text-[#F59E0B]">Human Clarification</span>
          <span className="font-sans text-xl font-bold text-[#F59E0B]">{m.humanClarifications}</span>
          <span className="font-mono text-[10px] text-[#F59E0B]">DRI intervention</span>
        </div>
      </div>
    </div>
  );
};
