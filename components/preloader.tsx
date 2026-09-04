"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setStage(3);
      return;
    }

    // Lock body scroll during preloader presentation
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Stage 0: Count from 0% to 100% over 1400ms using smooth cubic easing
    const startTime = performance.now();
    const countDuration = 1400;
    let rafId: number;

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / countDuration, 1);
      // Smooth ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.min(100, Math.floor(ease * 100));
      setCount(currentVal);

      if (progress < 1) {
        rafId = requestAnimationFrame(animateCount);
      } else {
        setCount(100);
      }
    };

    rafId = requestAnimationFrame(animateCount);

    // Stage 1 (Greeting): Transition at 1.5s
    const t1 = setTimeout(() => {
      setStage(1);
    }, 1500);

    // Stage 2 (Revealing): Transition at 2.2s (curtain splits open)
    const t2 = setTimeout(() => {
      setStage(2);
      document.body.style.overflow = prevOverflow;
    }, 2200);

    // Stage 3 (Unmounted): Completely remove from DOM at 3.05s
    const t3 = setTimeout(() => {
      setStage(3);
    }, 3050);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Stage 3: Unmount completely from DOM
  if (stage === 3) {
    return null;
  }

  // Circle circumference for r = 110 (2 * π * 110 ≈ 691.15)
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <aside
      aria-label="Portfolio Loading Screen"
      aria-live="polite"
      aria-hidden={stage >= 2}
      className="fixed inset-0 z-[9999] bg-[#edf5ff] dark:bg-[#070b12] flex items-center justify-center overflow-hidden select-none no-print transition-all"
      style={{
        clipPath: stage >= 2 ? "inset(50% 0 50% 0)" : "inset(0 0 0 0)",
        opacity: stage >= 2 ? 0 : 1,
        pointerEvents: stage >= 2 ? "none" : "auto",
        transition:
          "clip-path 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "clip-path, opacity",
      }}
    >
      {/* Subtle Technical Grid Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(23, 50, 85, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(23, 50, 85, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Editorial Header & Corner Coordinates */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#0a0f18]/50 dark:text-[#f1f5f9]/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa] animate-pulse" />
        <span>SYS // INITIALIZE</span>
      </div>

      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 font-mono text-[11px] tracking-widest uppercase text-[#0a0f18]/40 dark:text-[#f1f5f9]/40">
        INDRESH.DEV
      </div>

      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 font-mono text-[10px] sm:text-[11px] tracking-wider text-[#0a0f18]/40 dark:text-[#f1f5f9]/40">
        22°43&apos;N 75°52&apos;E
      </div>

      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#0a0f18]/40 dark:text-[#f1f5f9]/40">
        PORTFOLIO v2.6
      </div>

      {/* Central Interactive Content Display */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* STAGE 0: Percentage Counter & Spinning SVG Technical Ring */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out"
          style={{
            opacity: stage === 0 ? 1 : 0,
            transform: stage === 0 ? "scale(1)" : "scale(0.95)",
            pointerEvents: stage === 0 ? "auto" : "none",
          }}
        >
          {/* Animated SVG Technical Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinning Dashed Outer Accent Ring */}
            <svg
              className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] animate-[spin_12s_linear_infinite]"
              viewBox="0 0 300 300"
              fill="none"
            >
              <circle
                cx="150"
                cy="150"
                r="135"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="text-[#173255]/15 dark:text-[#a0c5f0]/15"
              />
            </svg>

            {/* Main Progress Indicator Ring */}
            <svg
              className="w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] -rotate-90 transform"
              viewBox="0 0 240 240"
              fill="none"
            >
              {/* Background Guide Ring */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="currentColor"
                strokeWidth="1"
                className="text-[#173255]/10 dark:text-[#a0c5f0]/15"
              />
              {/* Active Progress Ring */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-[#2d68c4] dark:text-[#60a5fa] transition-all duration-75 ease-out"
              />
            </svg>
          </div>

          {/* Central Monospace Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#0a0f18] dark:text-[#f1f5f9] tabular-nums">
              {count}%
            </span>
            <span className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0a0f18]/50 dark:text-[#f1f5f9]/50">
              loading system
            </span>
          </div>
        </div>

        {/* STAGE 1: Editorial Greeting */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-600 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform:
              stage === 1
                ? "scale(1) translateY(0px)"
                : stage === 0
                ? "scale(0.96) translateY(12px)"
                : "scale(1.04) translateY(-8px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center text-center px-4">
            <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-[#0a0f18] dark:text-[#f1f5f9]">
              hello<span className="text-[#2d68c4] dark:text-[#60a5fa]">.</span>
            </h1>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#0a0f18]/60 dark:text-[#f1f5f9]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>system.ready</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
