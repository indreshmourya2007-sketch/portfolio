"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";
import { PORTFOLIO_DATA } from "@/lib/data";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

export default function GlassHero() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLElement | null>(null);
  const rawPointer = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const smoothPointer = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const currentRadius = useRef<number>(0);
  const targetRadius = useRef<number>(0);
  const isTrackingTouch = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Single requestAnimationFrame loop
    const animate = () => {
      const factor = prefersReducedMotion ? 1 : 0.14;
      const radiusFactor = prefersReducedMotion ? 1 : 0.12;

      // Position interpolation
      if (smoothPointer.current.x === -999 && rawPointer.current.x !== -999) {
        smoothPointer.current.x = rawPointer.current.x;
        smoothPointer.current.y = rawPointer.current.y;
      } else {
        smoothPointer.current.x += (rawPointer.current.x - smoothPointer.current.x) * factor;
        smoothPointer.current.y += (rawPointer.current.y - smoothPointer.current.y) * factor;
      }

      // Radius interpolation
      currentRadius.current += (targetRadius.current - currentRadius.current) * radiusFactor;

      // Stop near-zero vibrations
      if (Math.abs(currentRadius.current - targetRadius.current) < 0.05) {
        currentRadius.current = targetRadius.current;
      }

      // Direct CSS variables updates with zero React re-render overhead
      el.style.setProperty("--reveal-x", `${smoothPointer.current.x.toFixed(2)}px`);
      el.style.setProperty("--reveal-y", `${smoothPointer.current.y.toFixed(2)}px`);
      el.style.setProperty("--reveal-radius", `${currentRadius.current.toFixed(2)}px`);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Desktop Pointer Handlers
  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rawPointer.current = { x, y };
      if (smoothPointer.current.x === -999) {
        smoothPointer.current = { x, y };
      }
      targetRadius.current = DESKTOP_RADIUS;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.pointerType === "mouse") {
      rawPointer.current = { x, y };
      if (targetRadius.current === 0) {
        targetRadius.current = DESKTOP_RADIUS;
      }
    } else if (isTrackingTouch.current) {
      rawPointer.current = { x, y };
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      targetRadius.current = 0;
    }
  };

  // Touch Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") {
      isTrackingTouch.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rawPointer.current = { x, y };
      smoothPointer.current = { x, y };
      targetRadius.current = MOBILE_RADIUS;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") {
      isTrackingTouch.current = false;
      targetRadius.current = 0;
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe ignore
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") {
      isTrackingTouch.current = false;
      targetRadius.current = 0;
    }
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Editorial Portfolio Hero"
      className="relative w-full h-[100dvh] min-h-[42rem] md:min-h-screen min-w-[320px] overflow-hidden isolate select-none touch-none bg-[#edf5ff] dark:bg-[#070b12] transition-colors duration-300"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* PORTRAIT LAYERS: Base + Reveal with text-like entrance animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 animate-portrait-entrance">
        {/* LAYER 1: Base Portrait */}
        <div
          className="absolute inset-0 w-full h-full portrait-base pointer-events-none"
          aria-hidden="true"
        />

        {/* LAYER 2: Reveal Portrait (Masked) */}
        <div
          className="absolute inset-0 w-full h-full portrait-reveal pointer-events-none z-[1]"
          aria-hidden="true"
        />
      </div>

      {/* Dark Mode Gradient Overlay: ensures white text on left is 100% visible while keeping the photo crisp on the right */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-0 dark:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#070b12] via-[#070b12]/80 to-transparent/20 md:via-[#070b12]/65"
        aria-hidden="true"
      />

      {/* LAYER 3: Technical Grid & Background Circle */}
      <div
        className="absolute inset-0 pointer-events-none z-[3] animate-grid-fade"
        aria-hidden="true"
      >
        {/* Desktop 12-col x 4-row technical grid */}
        <div className="hidden md:grid absolute inset-0 grid-cols-12 grid-rows-4 pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={`d-grid-${i}`}
              className="border-r border-b border-[#173255]/[0.06] dark:border-white/[0.08] first:border-t"
            />
          ))}
        </div>

        {/* Mobile 4-col x 6-row technical grid */}
        <div className="grid md:hidden absolute inset-0 grid-cols-4 grid-rows-6 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={`m-grid-${i}`}
              className="border-r border-b border-[#173255]/[0.035] dark:border-white/[0.06] first:border-t"
            />
          ))}
        </div>

        {/* Oversized Outlined Circle */}
        <div className="hidden md:block absolute rounded-full border border-[#173255]/[0.09] dark:border-white/[0.15] pointer-events-none w-[min(78vw,72rem)] aspect-square left-[8%] top-[-36%]" />
        <div className="block md:hidden absolute rounded-full border border-[#173255]/[0.06] dark:border-white/[0.1] pointer-events-none w-[150vw] aspect-square left-[-76%] top-[-8%]" />
      </div>

      {/* LAYER 5: Navigation (Top layer z-30 for pristine interaction) */}
      <header className="absolute top-0 left-0 right-0 z-30 pt-[max(2.5rem,env(safe-area-inset-top,0px))] px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] animate-nav-down pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className="flex items-center justify-between w-full max-w-[1720px] mx-auto"
        >
          {/* Brand Monogram & Name */}
          <a
            href="#hero"
            aria-label="Indresh Mourya Portfolio Home"
            className="group flex items-center gap-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded-md transition-opacity hover:opacity-80"
          >
            {/* Geometric Inline Monogram 'I' */}
            <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900 shadow-sm border border-[#0a0f18]/10 dark:border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#0a0f18] dark:text-white"
                aria-hidden="true"
              >
                <rect x="3.5" y="3" width="9" height="1.75" rx="0.875" fill="currentColor" />
                <rect x="7" y="4.75" width="2" height="6.5" rx="0.5" fill="currentColor" />
                <rect x="3.5" y="11.25" width="9" height="1.75" rx="0.875" fill="currentColor" />
                <circle cx="8" cy="8" r="1" fill="#2d68c4" />
              </svg>
            </div>
            <span className="font-mono text-sm tracking-tight text-[#0a0f18] dark:text-white font-medium">
              {PORTFOLIO_DATA.profile.name}
            </span>
          </a>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, "about")}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium"
            >
              About
            </a>

            <a
              href="#timeline"
              onClick={(e) => handleScrollTo(e, "timeline")}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium"
            >
              Timeline
            </a>

            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "work")}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium"
            >
              Work
            </a>

            <a
              href="#process"
              onClick={(e) => handleScrollTo(e, "process")}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium"
            >
              Process
            </a>

            <a
              href="#experiments"
              onClick={(e) => handleScrollTo(e, "experiments")}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium"
            >
              Lab
            </a>

            {/* Desktop Resume Print Trigger */}
            <button
              onClick={() => window.print()}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:opacity-70 transition-opacity py-2 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0a0f18] dark:focus-visible:outline-white rounded font-medium cursor-pointer"
            >
              Resume [PDF]
            </button>

            {/* Search command button */}
            <button
              onClick={() => {
                const event = new CustomEvent("toggle-command-menu");
                window.dispatchEvent(event);
              }}
              aria-label="Open Command Menu"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-xs font-mono text-[#0a0f18] dark:text-white transition-colors border border-[#0a0f18]/10 dark:border-white/10"
            >
              <span>⌘K</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#0a0f18] dark:text-white transition-colors border border-[#0a0f18]/10 dark:border-white/10"
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Right CTA Button -> WhatsApp */}
          <a
            href={PORTFOLIO_DATA.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button font-mono text-xs uppercase tracking-wider font-medium px-5 py-2.5 rounded-full min-h-[44px] min-w-[44px] inline-flex items-center justify-center cursor-pointer text-[#0a0f18] dark:text-white"
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>

      {/* LAYER 4: Headline, Intro Copy, Tagline */}
      <div className="relative z-20 w-full h-full pointer-events-none flex flex-col justify-between">
        {/* Main Headline */}
        <div
          className="absolute left-[max(1.25rem,env(safe-area-inset-left,0px))] md:left-[max(5.6vw,2rem)] top-[15%] md:top-[34%] max-w-[92vw] md:max-w-none pointer-events-auto"
        >
          <h1 className="font-light tracking-[-0.075em] md:tracking-[-0.085em] text-[#0a0f18] dark:text-white flex flex-col leading-[0.87] md:leading-[0.93] text-[clamp(2.7rem,12.5vw,3.8rem)] md:text-[clamp(5.4rem,6.2vw,6.8rem)]">
            <span className="block overflow-hidden py-0.5">
              <span className="block animate-line-1">Building</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="block animate-line-2">Beyond</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="block animate-line-3 text-[#0a0f18] dark:text-white font-normal">Possible.</span>
            </span>
          </h1>
        </div>

        {/* Right Tagline */}
        <div className="absolute right-[max(1.25rem,env(safe-area-inset-left,0px))] md:right-[max(5.6vw,2rem)] top-[55%] md:top-[36%] text-right pointer-events-auto animate-tagline-up">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.22em] text-[#0a0f18] dark:text-white leading-[1.6] select-none opacity-90">
            <span>BUILDING THE</span>
            <br />
            <span>NEXT VERSION</span>
            <br />
            <span className="text-[#0a0f18] dark:text-white font-bold">IN PUBLIC</span>
          </p>
        </div>

        {/* Bottom Left Intro Copy & CTA */}
        <div className="absolute left-[max(1.25rem,env(safe-area-inset-left,0px))] md:left-[max(5.6vw,2rem)] bottom-[max(2rem,env(safe-area-inset-bottom,0px))] md:bottom-[max(3rem,env(safe-area-inset-bottom,0px))] max-w-[88vw] md:max-w-[26rem] lg:max-w-[28rem] pointer-events-auto animate-intro-up">
          <p className="text-sm md:text-base text-[#0a0f18] dark:text-white leading-relaxed mb-4 md:mb-5 font-normal opacity-90">
            {PORTFOLIO_DATA.profile.bio}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => handleScrollTo(e, "work")}
              className="pill-button font-mono text-xs uppercase tracking-wider font-medium px-5 py-3 rounded-full min-h-[44px] inline-flex items-center justify-center gap-2 cursor-pointer group text-[#0a0f18] dark:text-white"
            >
              <span>Explore my work</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#0a0f18] dark:text-white transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path
                  d="M6 2.5V9.5M6 9.5L3 6.5M6 9.5L9 6.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <button
              onClick={() => window.print()}
              className="pill-button font-mono text-xs uppercase tracking-wider font-medium px-5 py-3 rounded-full min-h-[44px] inline-flex items-center justify-center gap-2 cursor-pointer group text-[#0a0f18] dark:text-white"
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
                className="text-[#0a0f18] dark:text-white transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="18" />
                <line x1="15" y1="15" x2="12" y2="18" />
              </svg>
              <span>Resume [PDF]</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
