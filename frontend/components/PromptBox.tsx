"use client";

import React, { useState } from "react";

interface PromptBoxProps {
  onRunAgent: (prompt: string, slackChannel: string) => void;
  isLoading: boolean;
}

export const PromptBox: React.FC<PromptBoxProps> = ({ onRunAgent, isLoading }) => {
  const [prompt, setPrompt] = useState(
    "Prepare me for my next architecture review, find relevant context, send me a Slack briefing, and track unresolved action items."
  );
  const [slackChannel, setSlackChannel] = useState("#demohackathon");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onRunAgent(prompt, slackChannel);
  };

  return (
    <section className="relative rounded-xl bg-[#10141D] p-5 shadow-xl border border-[#232A3B] overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.3), 0 12px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)" }}>
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#6366F1]/10 blur-3xl pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#6366F1]/15 text-[#818CF8] font-mono text-xs font-medium">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                SWYTCHCODE AGENT RUNTIME
              </span>
              <span className="font-mono text-xs text-[#94A3B8]/70">SESSION: #SWYTCH-9942</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask MeetingPilot to prepare, analyze, or follow up on a meeting..."
                className="w-full bg-[#0A0D12] text-[#F8FAFC] font-sans text-sm px-4 py-3 pr-10 rounded-lg border border-[#232A3B] focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] focus:outline-none shadow-inner"
                disabled={isLoading}
              />
              <span className="absolute right-3 text-[#94A3B8] text-sm">✨</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-[#0A0D12] px-3 py-1.5 rounded-lg border border-[#232A3B]">
              <span className="text-xs text-[#94A3B8] font-mono">Channel:</span>
              <input
                type="text"
                value={slackChannel}
                onChange={(e) => setSlackChannel(e.target.value)}
                className="bg-transparent text-xs text-[#F8FAFC] font-mono w-32 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium text-xs flex items-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Running Agent...</span>
                </>
              ) : (
                <>
                  <span>⚡</span>
                  <span>Run Agent</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onRunAgent(prompt, slackChannel)}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-lg bg-[#161B26] hover:bg-[#1E2535] text-[#94A3B8] hover:text-[#F8FAFC] font-medium text-xs flex items-center gap-1.5 border border-[#232A3B] transition-colors"
            >
              <span>↺</span>
              <span>Re-run Demo</span>
            </button>
          </div>
        </div>

        {/* Quick Metadata Strip */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#94A3B8] border-t border-[#232A3B]/60">
          <div className="inline-flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-[#161B26]">
            <span className="text-[#06B6D4] font-semibold">Target:</span>
            <span className="text-[#F8FAFC]">calendar.event.get</span>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-[#161B26]">
            <span className="text-[#6366F1] font-semibold">Orchestration:</span>
            <span className="text-[#F8FAFC]">LangGraph DAG</span>
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-[#161B26]">
            <span className="text-[#10B981]">●</span>
            <span className="text-[#F8FAFC]">CLI Latency: ~42ms</span>
          </div>
          <div className="ml-auto inline-flex items-center gap-1 font-mono text-[#10B981]">
            <span>✓</span>
            <span>DETERMINISTIC VERIFICATION ACTIVE</span>
          </div>
        </div>
      </form>
    </section>
  );
};
