"use client";

import React, { useState } from "react";
import { PromptBox } from "@/components/PromptBox";
import { AgentTimeline } from "@/components/AgentTimeline";
import { ToolCallCard } from "@/components/ToolCallCard";
import { DecisionCard } from "@/components/DecisionCard";
import { PreMeetingBrief } from "@/components/PreMeetingBrief";
import { BeforeAfterPanel } from "@/components/BeforeAfterPanel";
import { HumanAttentionCard } from "@/components/HumanAttentionCard";
import { FinalReport } from "@/components/FinalReport";
import { runAgent, AgentRunState } from "@/lib/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [agentState, setAgentState] = useState<AgentRunState | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleRunAgent = async (prompt: string, slackChannel: string) => {
    setIsLoading(true);
    try {
      const response = await runAgent(prompt, slackChannel);
      setAgentState(response.state);
    } catch (err) {
      console.error("Failed to run agent:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Meetings", icon: "📅" },
    { name: "Agent Runs", icon: "⚡" },
    { name: "Action Items", icon: "✅" },
    { name: "Integrations", icon: "🔌" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0D12] text-[#F8FAFC]">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-[#10141D] border-r border-[#232A3B] flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-5">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#6366F1] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              ✈️
            </div>
            <div>
              <div className="font-sans font-bold text-sm tracking-tight text-[#F8FAFC]">
                MeetingPilot
              </div>
              <div className="font-mono text-[10px] text-[#94A3B8]">
                Swytchcode AI Agent
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#6366F1]/15 text-[#818CF8] font-semibold border border-[#6366F1]/30"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161B26]"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Swytchcode Connected Badge */}
        <div className="p-4 border-t border-[#232A3B]">
          <div className="p-3 rounded-lg bg-[#161B26] border border-[#232A3B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-sans text-[11px] font-semibold text-[#F8FAFC]">
                  Swytchcode CLI
                </span>
                <span className="font-mono text-[9px] text-[#10B981]">
                  Connected • Live
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#94A3B8] bg-[#0A0D12] px-1.5 py-0.5 rounded border border-[#232A3B]">
              v4.2
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER */}
        <header className="h-14 bg-[#10141D] border-b border-[#232A3B] px-6 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-3">
            <h1 className="font-sans text-sm font-bold text-[#F8FAFC]">
              MeetingPilot
            </h1>
            <span className="text-xs text-[#94A3B8] font-mono">•</span>
            <span className="text-xs text-[#94A3B8] font-sans">
              AI Meeting Lifecycle Agent
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] font-mono text-[10px] font-semibold uppercase border border-[#10B981]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              IDLE & READY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#94A3B8] bg-[#0A0D12] px-3 py-1 rounded border border-[#232A3B]">
              <span className="text-[#10B981]">●</span>
              <span>LATENCY: 42ms</span>
              <span className="text-[#232A3B]">|</span>
              <span className="text-[#06B6D4]">SYNCED</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-xs font-bold shadow-md">
              MP
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="p-6 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
          {/* Tagline Banner */}
          <div className="flex items-center justify-between bg-[#161B26] p-4 rounded-xl border border-[#232A3B]">
            <div>
              <span className="font-mono text-[10px] text-[#818CF8] uppercase tracking-wider font-semibold">
                Autonomous Meeting Lifecycle Engine
              </span>
              <h2 className="font-sans text-base font-bold text-[#F8FAFC] tracking-tight">
                “Before the meeting. During the decision. After the action.”
              </h2>
            </div>
            <div className="font-mono text-xs text-[#94A3B8] bg-[#0A0D12] px-3 py-1.5 rounded-lg border border-[#232A3B] hidden lg:block">
              LangGraph Orchestrator + Swytchcode Tools
            </div>
          </div>

          {/* 1. Prompt Input Box */}
          <PromptBox onRunAgent={handleRunAgent} isLoading={isLoading} />

          {/* 2. Live Agent Timeline */}
          <AgentTimeline
            toolEvents={agentState?.tool_events}
            decisions={agentState?.decisions}
            isLoading={isLoading}
          />

          {/* 3. Tool Execution Cards & Decision Summaries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ToolCallCard toolEvents={agentState?.tool_events} />
            <DecisionCard decisions={agentState?.decisions} />
          </div>

          {/* 4. Pre-Meeting Brief Card */}
          <PreMeetingBrief
            meeting={agentState?.meeting}
            briefingText={agentState?.briefing}
          />

          {/* 5. Before vs After Comparison Panel */}
          <BeforeAfterPanel comparisons={agentState?.commitments} />

          {/* 6. Human Attention Required Warning Card */}
          <HumanAttentionCard
            humanQuestions={agentState?.human_questions}
            slackChannel={agentState?.slack_channel}
          />

          {/* 7. Final Execution Summary Report */}
          <FinalReport />
        </main>
      </div>
    </div>
  );
}
