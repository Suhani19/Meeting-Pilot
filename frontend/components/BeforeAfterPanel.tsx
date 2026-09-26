"use client";

import React from "react";
import { BeforeAfterItem } from "@/lib/api";

interface BeforeAfterPanelProps {
  comparisons?: BeforeAfterItem[];
}

export const BeforeAfterPanel: React.FC<BeforeAfterPanelProps> = ({ comparisons = [] }) => {
  const displayItems: BeforeAfterItem[] = comparisons.length > 0 ? comparisons : [
    {
      item: "Architecture approval",
      before_status: "Open",
      after_status: "Approved",
      assigned_owner: "Engineering Team",
      deadline: "Immediate",
      final_state: "RESOLVED",
    },
    {
      item: "Retry mechanism",
      before_status: "Incomplete",
      after_status: "Rahul / Wednesday",
      assigned_owner: "Rahul",
      deadline: "Wednesday",
      final_state: "RESOLVED",
    },
    {
      item: "Reconciliation ownership",
      before_status: "No owner",
      after_status: "Priya",
      assigned_owner: "Priya",
      deadline: "Sprint End",
      final_state: "RESOLVED",
    },
    {
      item: "Security approval",
      before_status: "No owner",
      after_status: "No owner",
      assigned_owner: null,
      deadline: null,
      final_state: "NEEDS_HUMAN_ATTENTION",
    },
  ];

  return (
    <div className="rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#10B981] text-lg">🔄</span>
          <div>
            <h3 className="font-sans text-sm font-semibold text-[#F8FAFC]">
              Before vs After Meeting Lifecycle Comparison
            </h3>
            <p className="font-mono text-[11px] text-[#94A3B8]">
              Automated Commitment Engine Analysis
            </p>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/20 font-semibold uppercase">
          COMMITMENTS TRACKED
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#232A3B] font-mono text-[10px] uppercase text-[#94A3B8]">
              <th className="py-2.5 px-3">Agenda / Objective Item</th>
              <th className="py-2.5 px-3">Before Meeting State</th>
              <th className="py-2.5 px-3">After Meeting Outcome</th>
              <th className="py-2.5 px-3">Assigned Owner</th>
              <th className="py-2.5 px-3">Target Deadline</th>
              <th className="py-2.5 px-3 text-right">Lifecycle Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#232A3B]/50 font-sans text-xs">
            {displayItems.map((item, idx) => {
              const isResolved = item.final_state === "RESOLVED";
              return (
                <tr key={idx} className="hover:bg-[#161B26] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#F8FAFC]">
                    {item.item}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#161B26] text-[#94A3B8] font-mono text-[11px] border border-[#232A3B]">
                      {item.before_status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono text-[11px] ${
                      isResolved ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20" : "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                    }`}>
                      {item.after_status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#F8FAFC]">
                    {item.assigned_owner ? (
                      <span className="flex items-center gap-1">
                        👤 {item.assigned_owner}
                      </span>
                    ) : (
                      <span className="text-[#F59E0B] font-mono text-[11px]">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-[#94A3B8]">
                    {item.deadline || "—"}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {isResolved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#10B981]/15 text-[#10B981] font-mono text-[10px] font-semibold border border-[#10B981]/30 uppercase">
                        ✓ Resolved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F59E0B]/15 text-[#F59E0B] font-mono text-[10px] font-semibold border border-[#F59E0B]/30 uppercase animate-pulse">
                        ⚠️ Needs Human Attention
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
