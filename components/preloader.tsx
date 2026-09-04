"use client";

import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [count, setCount] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.classList.add("site-entered");
      setStage(3);
      return;
    }

    // Ensure site-entered is removed during preloader presentation
    document.documentElement.classList.remove("site-entered");

    // Lock body scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // STAGE 0: Count from 0% to 100% over 1400ms using smooth cubic easing
    const countStartTime = performance.now();
    const countDuration = 1400;
    let countRafId: number;

    const animateCount = (now: number) => {
      const elapsed = now - countStartTime;
      const progress = Math.min(elapsed / countDuration, 1);
      // Smooth ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.min(100, Math.floor(ease * 100));
      setCount(currentVal);

      if (progress < 1) {
        countRafId = requestAnimationFrame(animateCount);
      } else {
        setCount(100);
      }
    };

    countRafId = requestAnimationFrame(animateCount);

    // STAGE 1 (Greeting & Typewriter): Starts at 1.4s
    const fullGreeting = "hello.";
    let typeRafId: number;

    const t1 = setTimeout(() => {
      setStage(1);

      // Typewriter animation: 1.0 second duration (1000ms)
      const typeStartTime = performance.now();
      const typeDuration = 1000;

      const animateTyping = (now: number) => {
        const elapsed = now - typeStartTime;
        const progress = Math.min(elapsed / typeDuration, 1);
        const charCount = Math.min(
          fullGreeting.length,
          Math.max(1, Math.ceil(progress * fullGreeting.length))
        );
        setTypedText(fullGreeting.slice(0, charCount));

        if (progress < 1) {
          typeRafId = requestAnimationFrame(animateTyping);
        } else {
          setTypedText(fullGreeting);
        }
      };

      typeRafId = requestAnimationFrame(animateTyping);
    }, 1400);

    // STAGE 2 (Revealing & Site Entrance):
    // 1400ms (count) + 1000ms (typing) + 1100ms (watch time) = 3500ms
    const t2 = setTimeout(() => {
      setStage(2);
      // Trigger site entrance animations across the hero and page
      document.documentElement.classList.add("site-entered");
      document.body.style.overflow = prevOverflow;
    }, 3500);

    // STAGE 3 (Unmounted): 3500ms + 850ms (reveal transition) = 4350ms
    const t3 = setTimeout(() => {
      setStage(3);
    }, 4350);

    return () => {
      cancelAnimationFrame(countRafId);
      cancelAnimationFrame(typeRafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.add("site-entered");
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
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] min-h-[100dvh] bg-[#edf5ff] dark:bg-[#070b12] flex items-center justify-center overflow-hidden select-none touch-none no-print transition-all"
      style={{
        clipPath: stage >= 2 ? "inset(50% 0 50% 0)" : "inset(0 0 0 0)",
        opacity: stage >= 2 ? 0 : 1,
        pointerEvents: stage >= 2 ? "none" : "auto",
        transition:
          "clip-path 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "clip-path, opacity",
      }}
    >
      {/* Subtle Blueprint Grid Pattern */}
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

      {/* Atmospheric Soft Center Glow */}
      <div
        className="absolute w-[min(500px,90vw)] h-[min(500px,90vw)] rounded-full bg-blue-500/5 dark:bg-blue-400/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial Corner Coordinates & Status Tags (Safe-Area Aware for Mobile App UI) */}
      <div className="absolute top-[max(1.25rem,env(safe-area-inset-top,0px))] left-[max(1.25rem,env(safe-area-inset-left,0px))] flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#0a0f18]/60 dark:text-[#f1f5f9]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa] animate-ping" />
        <span>SYS // INIT</span>
      </div>

      <div className="absolute top-[max(1.25rem,env(safe-area-inset-top,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#0a0f18]/50 dark:text-[#f1f5f9]/50">
        <span>INDRESH.DEV</span>
        <span className="text-[#2d68c4] dark:text-[#60a5fa] hidden sm:inline">//</span>
        <span className="hidden sm:inline">2026</span>
      </div>

      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-[max(1.25rem,env(safe-area-inset-left,0px))] flex items-center gap-2 font-mono text-[9px] sm:text-[11px] tracking-wider text-[#0a0f18]/50 dark:text-[#f1f5f9]/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
        <span>22°43&apos;N 75°52&apos;E</span>
      </div>

      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] flex items-center gap-2 font-mono text-[9px] sm:text-[11px] tracking-widest uppercase text-[#0a0f18]/50 dark:text-[#f1f5f9]/50">
        {/* Equalizer frequency micro-bars */}
        <div className="flex items-end gap-0.5 h-2.5 sm:h-3">
          <span className="w-0.5 h-1.5 bg-[#2d68c4] dark:bg-[#60a5fa] animate-pulse" />
          <span className="w-0.5 h-3 bg-[#2d68c4] dark:bg-[#60a5fa] animate-[pulse_0.7s_ease-in-out_infinite]" />
          <span className="w-0.5 h-2 bg-[#2d68c4] dark:bg-[#60a5fa] animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
          <span className="w-0.5 h-2.5 bg-[#2d68c4] dark:bg-[#60a5fa] animate-[pulse_0.9s_ease-in-out_infinite_0.1s]" />
        </div>
        <span>v2.6</span>
      </div>

      {/* Central Interactive Content Display */}
      <div className="relative w-[min(320px,88vw)] h-[min(320px,88vw)] sm:w-96 sm:h-96 flex items-center justify-center">
        {/* ============================================================ */}
        {/* STAGE 0: Technical Counter & HUD Precision Rings (0s - 1.4s) */}
        {/* ============================================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out"
          style={{
            opacity: stage === 0 ? 1 : 0,
            transform: stage === 0 ? "scale(1)" : "scale(0.94)",
            pointerEvents: stage === 0 ? "auto" : "none",
          }}
        >
          {/* Animated SVG HUD Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Spinning Dashed Outer Orbital Ring */}
            <svg
              className="absolute w-[min(270px,76vw)] h-[min(270px,76vw)] sm:w-[310px] sm:h-[310px] animate-[spin_10s_linear_infinite]"
              viewBox="0 0 310 310"
              fill="none"
            >
              <circle
                cx="155"
                cy="155"
                r="145"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
                className="text-[#173255]/15 dark:text-[#a0c5f0]/20"
              />
              {/* Outer Cardinal Tick Marks */}
              <circle cx="155" cy="10" r="2.5" fill="currentColor" className="text-[#2d68c4] dark:text-[#60a5fa]" />
              <circle cx="300" cy="155" r="2.5" fill="currentColor" className="text-[#2d68c4] dark:text-[#60a5fa]" />
              <circle cx="155" cy="300" r="2.5" fill="currentColor" className="text-[#2d68c4] dark:text-[#60a5fa]" />
              <circle cx="10" cy="155" r="2.5" fill="currentColor" className="text-[#2d68c4] dark:text-[#60a5fa]" />
            </svg>

            {/* Main Progress Indicator Ring */}
            <svg
              className="w-[min(230px,66vw)] h-[min(230px,66vw)] sm:w-[270px] sm:h-[270px] -rotate-90 transform"
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
              {/* Active Dynamic Progress Ring */}
              <circle
                cx="120"
                cy="120"
                r={radius}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-[#2d68c4] dark:text-[#60a5fa] transition-all duration-75 ease-out"
              />
            </svg>
          </div>

          {/* Central Monospace Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="font-mono text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#0a0f18] dark:text-[#f1f5f9] tabular-nums">
              {count}%
            </span>
            <div className="mt-2.5 sm:mt-3 flex items-center gap-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0a0f18]/60 dark:text-[#f1f5f9]/60">
              <span className="w-1 h-1 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa] animate-ping" />
              <span>loading system</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 1: Typewriter Greeting & Extended Watch Experience (1.4s - 3.5s)    */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transform:
              stage === 1
                ? "scale(1) translateY(0px)"
                : stage === 0
                ? "scale(0.96) translateY(12px)"
                : "scale(1.04) translateY(-10px)",
            pointerEvents: stage === 1 ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center text-center px-3">
            {/* Typewriter Greeting Text in Albert Sans */}
            <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-[#0a0f18] dark:text-[#f1f5f9] flex items-center justify-center">
              <span>{typedText}</span>
              {/* Sleek Blinking Editorial Cursor */}
              <span
                className="inline-block w-[3px] sm:w-[4px] h-[0.75em] bg-[#2d68c4] dark:bg-[#60a5fa] ml-1.5 align-middle rounded-full"
                style={{
                  animation: "cursorBlink 0.8s infinite ease-in-out",
                }}
              />
            </h1>

            {/* Status Pill Badge with Emerald Beacon */}
            <div className="mt-3.5 sm:mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#173255]/5 dark:bg-white/10 border border-[#173255]/10 dark:border-white/10 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#0a0f18]/70 dark:text-[#f1f5f9]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>system.ready</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
