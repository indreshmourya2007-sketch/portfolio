"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = PORTFOLIO_DATA.processSteps;

  return (
    <section
      id="process"
      aria-label="Engineering Methodology and Process"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>05 / Engineering Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-slate-100 leading-[1.05]">
              Rigorous execution from <br className="hidden sm:inline" />
              <span className="italic font-normal">first principles to production</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/60 dark:text-slate-400 max-w-xs md:text-right">
            <span>ZERO JANK GUARANTEE</span>
            <br />
            <span>SUB-10MS INTERACTION LATENCY</span>
          </div>
        </div>

        {/* Process Stepper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((item, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? "bg-white dark:bg-slate-900 border-[#0a0f18]/20 dark:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                      : "bg-white/50 dark:bg-slate-900/50 border-[#0a0f18]/5 dark:border-white/5 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:border-[#0a0f18]/10 dark:hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-[#2d68c4] dark:text-[#60a5fa]">
                      PHASE {item.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#0a0f18]/40 dark:text-slate-400">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-[#0a0f18] dark:text-slate-100 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0a0f18]/65 dark:text-slate-400 mt-1 line-clamp-2 font-normal">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Container */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0a0f18] dark:bg-slate-950 text-[#edf5ff] shadow-2xl border border-[#0a0f18] dark:border-white/10 flex flex-col justify-between space-y-8 min-h-[460px]">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#2d68c4] flex items-center justify-center font-mono text-xs font-bold text-white">
                    {steps[activeStep].step}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#edf5ff]/60 dark:text-slate-400">
                    {steps[activeStep].tag}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#2d68c4] dark:text-[#60a5fa] bg-[#2d68c4]/20 dark:bg-[#60a5fa]/20 px-3 py-1 rounded-full border border-[#2d68c4]/30 dark:border-[#60a5fa]/30">
                  Interactive Node
                </span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                  {steps[activeStep].title}
                </h4>
                <p className="text-sm sm:text-base text-[#edf5ff]/75 dark:text-slate-300 mt-3 leading-relaxed font-light">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Code Snippet */}
              <div className="rounded-2xl bg-[#05080e] dark:bg-black/60 p-4 sm:p-5 border border-white/10 font-mono text-xs text-[#a0c5f0] overflow-x-auto">
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">
                  Architecture Blueprint Preview
                </div>
                <pre className="leading-relaxed">
                  <code>{steps[activeStep].codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="pt-4 border-t border-white/10">
              <div className="font-mono text-xs uppercase tracking-wider text-[#edf5ff]/50 dark:text-slate-400 mb-3">
                Phase Deliverables & Verification
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {steps[activeStep].deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#edf5ff]/85 dark:text-slate-200 flex items-center gap-2"
                  >
                    <span className="text-[#2d68c4] dark:text-[#60a5fa]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
