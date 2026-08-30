"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function AboutSection() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section
      id="about"
      aria-label="About & Technical Manifesto"
      className="relative w-full py-28 md:py-36 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto space-y-16 md:space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>01 / Architectural Manifesto</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Engineering interfaces where <br className="hidden sm:inline" />
              <span className="italic font-normal">mathematics meets aesthetics</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/80 dark:text-slate-300 max-w-xs md:text-right font-medium">
            <span>PRESTIGE INSTITUTE (PIEMR)</span>
            <br />
            <span>INDORE, M.P., INDIA</span>
          </div>
        </div>

        {/* Core Manifesto Narrative & Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg md:text-xl text-[#0a0f18] dark:text-white leading-relaxed font-light">
            <p>
              I am <strong className="font-semibold text-[#0a0f18] dark:text-white">Indresh Mourya</strong>, a Software Developer and 2nd-year B.Tech CSE student at PIEMR, Indore, M.P. I engineer robust software systems, intelligent AI chatbot engines, and data-driven web applications.
            </p>
            <p className="opacity-95">
              Ranked in the <strong className="font-semibold text-[#2d68c4] dark:text-[#60a5fa]">Top 10% of Replit Agent Developers globally</strong> and <strong className="font-semibold text-[#0a0f18] dark:text-white">5x Google Cloud Certified</strong>, my work bridges rigorous algorithmic problem-solving with efficient, user-centered application design.
            </p>
            <p className="opacity-95">
              Whether integrating IoT sensors for smart agriculture in Python, building C++ object-oriented management systems, or deploying cloud-native logic, I believe clean abstractions and mathematical precision form the heartbeat of exceptional software.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-md transition-colors">
              <div className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white mb-6 font-semibold opacity-80">
                Verified Engineering Benchmarks
              </div>
              <div className="grid grid-cols-2 gap-6">
                {PORTFOLIO_DATA.profile.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0a0f18] dark:text-white">
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs text-[#0a0f18] dark:text-white uppercase tracking-wider opacity-85 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#0a0f18]/15 dark:border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs text-[#0a0f18] dark:text-white font-medium">
                    Available for select contracts
                  </span>
                </div>
                <a
                  href="#contact"
                  className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:text-[#2d68c4] dark:hover:text-[#60a5fa] transition-colors font-semibold"
                >
                  Contact me →
                </a>
              </div>
            </div>

            {/* Dedicated 1-Page Resume Quick Download Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-md flex items-center justify-between gap-4 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa]">
                    Curriculum Vitae
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                    1-Page Summary
                  </span>
                </div>
                <div className="text-sm font-semibold text-[#0a0f18] dark:text-white">
                  Executive Resume & Credentials
                </div>
                <p className="text-xs text-[#0a0f18]/70 dark:text-slate-400">
                  ATS-optimized PDF with technical stack, roles & honors.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="pill-button-primary font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-sm hover:scale-105 transition-transform"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="12" y2="18" />
                  <line x1="15" y1="15" x2="12" y2="18" />
                </svg>
                <span>Get PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Philosophy Pillars (Full Width Container) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.philosophy.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-xs space-y-2.5 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                  Principle 0{idx + 1}
                </div>
                <h3 className="font-semibold text-base text-[#0a0f18] dark:text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0a0f18]/85 dark:text-slate-300 leading-relaxed font-normal mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Mastery Matrix */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] mb-1 font-semibold">
                Technical Mastery
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#0a0f18] dark:text-white tracking-tight">
                Domain Stack & Core Capabilities
              </h3>
            </div>

            {/* Tab Selectors */}
            <div className="flex flex-wrap gap-1 p-1 bg-white dark:bg-slate-900 rounded-full border border-[#0a0f18]/15 dark:border-white/15">
              {PORTFOLIO_DATA.skills.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(idx)}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                    selectedCategory === idx
                      ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18] font-semibold shadow-xs"
                      : "text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/5 dark:hover:bg-white/10"
                  }`}
                >
                  0{idx + 1}. {cat.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Current Category Display Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-xs backdrop-blur-md space-y-6 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#0a0f18]/15 dark:border-white/15">
              <div>
                <h4 className="text-xl font-medium text-[#0a0f18] dark:text-white">
                  {PORTFOLIO_DATA.skills[selectedCategory].title}
                </h4>
                <p className="text-sm text-[#0a0f18] dark:text-white mt-0.5 font-normal opacity-85">
                  {PORTFOLIO_DATA.skills[selectedCategory].description}
                </p>
              </div>
              <span className="font-mono text-xs uppercase text-[#2d68c4] dark:text-[#60a5fa] px-3 py-1 rounded-full bg-[#2d68c4]/10 dark:bg-[#60a5fa]/10 border border-[#2d68c4]/20 dark:border-[#60a5fa]/20 w-fit font-semibold">
                Active Domain
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.skills[selectedCategory].skills.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#edf5ff]/80 dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/15 space-y-2 hover:bg-white dark:hover:bg-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0a0f18] dark:text-white">
                      {item.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[#0a0f18] dark:text-white border border-[#0a0f18]/10 dark:border-white/15 font-semibold">
                      {item.level}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 text-[#0a0f18] dark:text-white border border-[#0a0f18]/10 dark:border-white/15 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
