"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, GlobalHonor } from "@/lib/data";
import { VerifiedBadgeIcon, ExternalLinkIcon, SparklesIcon } from "./icons";

interface HonorsSectionProps {
  onSelectHonor: (honor: GlobalHonor) => void;
}

function HonorCard({
  honor,
  onSelect,
}: {
  honor: GlobalHonor;
  onSelect: () => void;
}) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number; hovered: boolean }>({
    x: 0,
    y: 0,
    hovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      hovered: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, hovered: false }));
  };

  return (
    <div
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMousePos((prev) => ({ ...prev, hovered: true }))}
      onMouseLeave={handleMouseLeave}
      className="group relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0e1726] border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_20px_50px_rgb(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
      style={{
        borderColor: mousePos.hovered ? `${honor.accentColor}80` : undefined,
      }}
    >
      {/* Dynamic Cursor Spotlight Tracking Light */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: mousePos.hovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${honor.accentColor}22, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Ambient Corner Brand Aura */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-0"
        style={{ backgroundColor: honor.accentColor }}
        aria-hidden="true"
      />

      <div className="space-y-6 relative z-10">
        {/* Scope & Verified Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-colors duration-300"
              style={{
                color: honor.accentColor,
                backgroundColor: `${honor.accentColor}15`,
                border: `1px solid ${honor.accentColor}35`,
              }}
            >
              {honor.scope}
            </span>
          </div>

          <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5 shadow-sm">
            <VerifiedBadgeIcon className="w-3.5 h-3.5" />
            <span>{honor.badge}</span>
          </span>
        </div>

        {/* Main Distinction Title */}
        <div>
          <div className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-400 font-semibold mb-1">
            {honor.issuer}
          </div>
          <h3
            className="text-2xl sm:text-3xl font-light text-[#0a0f18] dark:text-white transition-colors duration-300 leading-tight group-hover:font-normal"
            style={{
              color: mousePos.hovered ? honor.accentColor : undefined,
            }}
          >
            {honor.title}
          </h3>
        </div>

        {/* Narrative Summary */}
        <p className="text-sm sm:text-base text-[#0a0f18]/85 dark:text-slate-200 font-light leading-relaxed">
          {honor.description}
        </p>

        {/* Key Deliverables Matrix */}
        <div className="pt-2 space-y-2">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#0a0f18]/60 dark:text-slate-400 font-semibold">
            Core Technical Benchmarks:
          </div>
          <div className="space-y-1.5">
            {honor.deliverables.map((item, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0a0f18]/90 dark:text-slate-200"
              >
                <span
                  className="mt-0.5 flex-shrink-0 font-bold transition-colors duration-300"
                  style={{
                    color: mousePos.hovered ? honor.accentColor : "#2d68c4",
                  }}
                >
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Action & Verification ID */}
      <div className="pt-6 mt-8 border-t border-[#0a0f18]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10 text-xs font-mono">
        <div className="text-[#0a0f18]/70 dark:text-slate-400">
          <span className="opacity-75">Verification ID: </span>
          <span className="font-bold text-[#0a0f18] dark:text-white">
            {honor.verificationId}
          </span>
        </div>

        <span
          className="font-bold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all duration-300"
          style={{
            color: mousePos.hovered ? honor.accentColor : "#2d68c4",
          }}
        >
          <span>Inspect Official Credential</span>
          <ExternalLinkIcon className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

export default function HonorsSection({ onSelectHonor }: HonorsSectionProps) {
  return (
    <section
      id="honors"
      aria-label="Global Accreditations & Major Distinctions"
      className="relative w-full py-28 md:py-36 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Technical Grid Continuity */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`honor-grid-${i}`}
              className="border-r border-[#173255]/[0.06] dark:border-white/[0.06] h-full"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto space-y-20 md:space-y-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <SparklesIcon className="w-4 h-4 text-[#2d68c4] dark:text-[#60a5fa]" />
              <span>02 / Global Distinctions & Tier-1 Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Major global honors & <br className="hidden sm:inline" />
              <span className="italic font-normal">institutional recognitions</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/80 dark:text-slate-300 max-w-xs md:text-right font-medium">
            <span>REPLIT • GOOGLE CLOUD • NASA • AWS • IIT BOMBAY</span>
            <br />
            <span>OFFICIAL VERIFIED CREDENTIALS</span>
          </div>
        </div>

        {/* Global Honors Hero Cards Grid with Signature Brand Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PORTFOLIO_DATA.globalHonors.map((honor) => (
            <HonorCard
              key={honor.id}
              honor={honor}
              onSelect={() => onSelectHonor(honor)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
