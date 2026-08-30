"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Timeline() {
  return (
    <section
      id="timeline"
      aria-label="Experience & Academic Foundation"
      className="relative w-full py-28 md:py-36 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/[0.08] dark:border-white/[0.08] transition-colors duration-300 overflow-hidden"
    >
      {/* Background Technical Grid Continuity */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Desktop 12-col technical grid */}
        <div className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`t-grid-${i}`}
              className="border-r border-[#173255]/[0.06] dark:border-white/[0.06] h-full"
            />
          ))}
        </div>

        {/* Mobile 4-col technical grid */}
        <div className="grid md:hidden absolute inset-0 grid-cols-4 pointer-events-none">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`tm-grid-${i}`}
              className="border-r border-[#173255]/[0.035] dark:border-white/[0.04] h-full"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto space-y-24 md:space-y-32">
        {/* ========================================================================= */}
        {/* SECTION ONE: EXPERIENCE & LEADERSHIP */}
        {/* ========================================================================= */}
        <div className="space-y-16 md:space-y-20">
          {/* Section Header */}
          <div className="md:grid md:grid-cols-12 gap-6 md:gap-8 items-baseline pb-6 border-b border-[#173255]/[0.1] dark:border-white/[0.1]">
            <div className="md:col-span-3 pr-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] font-semibold block">
                03 / EXPERIENCE & LEADERSHIP
              </span>
            </div>
            <div className="md:col-span-9 mt-2 md:mt-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
                Professional roles & community leadership.
              </h2>
              <span className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 font-medium">
                CHRONOLOGICAL LOG
              </span>
            </div>
          </div>

          {/* Timeline Items List */}
          <div className="relative space-y-16 md:space-y-20">
            {/* Desktop Vertical Column 3 Line Guide */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-[25%] w-px bg-[#173255]/[0.1] dark:bg-white/[0.1] pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Vertical Left Axis Line */}
            <div
              className="block md:hidden absolute top-2 bottom-2 left-0 w-px bg-[#173255]/[0.1] dark:bg-white/[0.1] pointer-events-none"
              aria-hidden="true"
            />

            {PORTFOLIO_DATA.experiences.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-6 md:pl-0 md:grid md:grid-cols-12 gap-6 md:gap-8 items-start group"
              >
                {/* Mobile Dot Indicator */}
                <div className="block md:hidden absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa] ring-4 ring-[#edf5ff] dark:ring-[#070b12]" />

                {/* Left: Date / Period (Col 1-3) */}
                <div className="md:col-span-3 md:pr-8 md:text-right space-y-1">
                  <span className="font-mono text-xs uppercase tracking-tight text-[#0a0f18] dark:text-white block font-bold">
                    {item.period}
                  </span>
                  <span className="font-mono text-[11px] text-[#0a0f18]/70 dark:text-slate-300 block truncate font-medium">
                    {item.location}
                  </span>
                </div>

                {/* Right: Content (Col 4-12) */}
                <div className="md:col-span-9 space-y-3 mt-1 md:mt-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-sans text-[clamp(1.15rem,1.6vw,1.45rem)] text-[#0a0f18] dark:text-white font-normal leading-snug">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#2d68c4]/10 dark:bg-[#60a5fa]/15 text-[#2d68c4] dark:text-[#60a5fa] border border-[#2d68c4]/25 dark:border-[#60a5fa]/30 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs text-[#0a0f18]/80 dark:text-slate-300 font-medium">
                    {item.subtitle}
                  </div>

                  <p className="font-sans text-sm md:text-base text-[#0a0f18]/85 dark:text-slate-200 font-light leading-relaxed max-w-4xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION TWO: EDUCATION */}
        {/* ========================================================================= */}
        <div className="space-y-16 md:space-y-20">
          {/* Section Header */}
          <div className="md:grid md:grid-cols-12 gap-6 md:gap-8 items-baseline pb-6 border-b border-[#173255]/[0.1] dark:border-white/[0.1]">
            <div className="md:col-span-3 pr-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] font-semibold block">
                04 / ACADEMIC FOUNDATION
              </span>
            </div>
            <div className="md:col-span-9 mt-2 md:mt-0 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
                Academic background & engineering curriculum.
              </h2>
              <span className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 font-medium">
                UNDERGRADUATE DEGREE
              </span>
            </div>
          </div>

          {/* Timeline Items List */}
          <div className="relative space-y-16 md:space-y-20">
            {/* Desktop Vertical Column 3 Line Guide */}
            <div
              className="hidden md:block absolute top-0 bottom-0 left-[25%] w-px bg-[#173255]/[0.1] dark:bg-white/[0.1] pointer-events-none"
              aria-hidden="true"
            />

            {/* Mobile Vertical Left Axis Line */}
            <div
              className="block md:hidden absolute top-2 bottom-2 left-0 w-px bg-[#173255]/[0.1] dark:bg-white/[0.1] pointer-events-none"
              aria-hidden="true"
            />

            {PORTFOLIO_DATA.education.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-6 md:pl-0 md:grid md:grid-cols-12 gap-6 md:gap-8 items-start group"
              >
                {/* Mobile Dot Indicator */}
                <div className="block md:hidden absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa] ring-4 ring-[#edf5ff] dark:ring-[#070b12]" />

                {/* Left: Date / Period (Col 1-3) */}
                <div className="md:col-span-3 md:pr-8 md:text-right space-y-1">
                  <span className="font-mono text-xs uppercase tracking-tight text-[#0a0f18] dark:text-white block font-bold">
                    {item.period}
                  </span>
                  <span className="font-mono text-[11px] text-[#0a0f18]/70 dark:text-slate-300 block truncate font-medium">
                    {item.location}
                  </span>
                </div>

                {/* Right: Content (Col 4-12) */}
                <div className="md:col-span-9 space-y-3 mt-1 md:mt-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-sans text-[clamp(1.15rem,1.6vw,1.45rem)] text-[#0a0f18] dark:text-white font-normal leading-snug">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#2d68c4]/10 dark:bg-[#60a5fa]/15 text-[#2d68c4] dark:text-[#60a5fa] border border-[#2d68c4]/25 dark:border-[#60a5fa]/30 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="font-mono text-xs text-[#0a0f18]/80 dark:text-slate-300 font-medium">
                    {item.subtitle}
                  </div>

                  <p className="font-sans text-sm md:text-base text-[#0a0f18]/85 dark:text-slate-200 font-light leading-relaxed max-w-4xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
