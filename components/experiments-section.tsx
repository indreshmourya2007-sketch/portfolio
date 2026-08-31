"use client";

import React, { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

type SimMode = "particles" | "waves";

export default function ExperimentsSection() {
  const [simMode, setSimMode] = useState<SimMode>("particles");
  const [particleCount, setParticleCount] = useState<number>(65);
  const [connectionRadius, setConnectionRadius] = useState<number>(110);
  const [waveFrequency, setWaveFrequency] = useState<number>(0.04);
  const [waveSpeed, setWaveSpeed] = useState<number>(0.03);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number; isHover: boolean }>({
    x: -9999,
    y: -9999,
    isHover: false,
  });

  // Dual Mode Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle Lattice State
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
    }

    const particles: Particle[] = [];
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    initParticles();

    // Wave Simulation State
    let waveStep = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains("dark");
      const dotColor = isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(10, 15, 24, 0.75)";
      const lineColor = isDarkMode ? "rgba(96, 165, 250, " : "rgba(45, 104, 196, ";

      if (simMode === "particles") {
        // --- MODE 01: Kinetic Vector Lattice ---
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Boundary Bounce
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Mouse Repulsion & Spring
          if (mousePos.current.isHover) {
            const dx = p.x - mousePos.current.x;
            const dy = p.y - mousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 130;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 3.5;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          // Draw Particle Dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();

          // Connect with neighbors
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

            if (dist < connectionRadius) {
              const alpha = (1 - dist / connectionRadius) * 0.45;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${lineColor}${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      } else {
        // --- MODE 02: Spatial Harmonic Waves ---
        waveStep += waveSpeed;
        const lineCount = 9;
        const gap = height / (lineCount + 1);

        for (let line = 1; line <= lineCount; line++) {
          const baseY = line * gap;
          ctx.beginPath();

          for (let x = 0; x <= width; x += 6) {
            let offset =
              Math.sin(x * waveFrequency + waveStep + line * 0.4) * 18 +
              Math.cos(x * 0.015 - waveStep * 0.8) * 12;

            if (mousePos.current.isHover) {
              const mouseDist = Math.abs(x - mousePos.current.x);
              if (mouseDist < 160) {
                const mouseForce = (1 - mouseDist / 160) * 35;
                const sign = mousePos.current.y > baseY ? 1 : -1;
                offset += Math.sin((x / 160) * Math.PI) * mouseForce * sign;
              }
            }

            const y = baseY + offset;
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          const lineAlpha = (0.2 + (line / lineCount) * 0.6).toFixed(2);
          ctx.strokeStyle = `${lineColor}${lineAlpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [simMode, particleCount, connectionRadius, waveFrequency, waveSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHover: true,
    };
  };

  const handleMouseLeave = () => {
    mousePos.current.isHover = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      mousePos.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        isHover: true,
      };
    }
  };

  const handleTouchEnd = () => {
    mousePos.current.isHover = false;
  };

  return (
    <section
      id="experiments"
      aria-label="Interactive Systems & Core Logic"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>07 / Interactive Systems & Core Logic</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Interactive Systems & Core Logic.
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#0a0f18]/80 dark:text-slate-300 mt-2 font-light">
              Applied Python and C++ object-oriented foundations.
            </p>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 max-w-xs md:text-right font-medium">
            <span>PYTHON NLP • OCR VISION • C++ OOP ARCHITECTURE</span>
            <br />
            <span>AUTHENTIC APPLIED SYSTEMS</span>
          </div>
        </div>

        {/* Live Simulation Container */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_8px_32px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgb(0,0,0,0.5)] overflow-hidden transition-colors">
          {/* Top Simulation Toolbar */}
          <div className="p-4 sm:p-6 bg-[#edf5ff]/60 dark:bg-slate-800/80 border-b border-[#0a0f18]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 sm:gap-2 bg-white dark:bg-slate-900 p-1 rounded-full border border-[#0a0f18]/10 dark:border-white/10 font-mono text-xs max-w-full overflow-x-auto">
              <button
                onClick={() => setSimMode("particles")}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium whitespace-nowrap text-[11px] sm:text-xs ${
                  simMode === "particles"
                    ? "bg-[#0a0f18] text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                    : "text-[#0a0f18]/70 dark:text-slate-300 hover:text-[#0a0f18] dark:hover:text-white"
                }`}
              >
                01 / Kinetic Vector Lattice
              </button>
              <button
                onClick={() => setSimMode("waves")}
                className={`px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium whitespace-nowrap text-[11px] sm:text-xs ${
                  simMode === "waves"
                    ? "bg-[#0a0f18] text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                    : "text-[#0a0f18]/70 dark:text-slate-300 hover:text-[#0a0f18] dark:hover:text-white"
                }`}
              >
                02 / Spatial Harmonic Waves
              </button>
            </div>

            {/* Simulation Parameter Sliders */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-[#0a0f18]/80 dark:text-slate-300">
              {simMode === "particles" ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="opacity-75">Nodes:</span>
                    <input
                      type="range"
                      min={20}
                      max={120}
                      value={particleCount}
                      onChange={(e) => setParticleCount(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-[#2d68c4] dark:accent-[#60a5fa] cursor-pointer"
                    />
                    <span className="w-5 sm:w-6 font-bold text-right">{particleCount}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-75">Radius:</span>
                    <input
                      type="range"
                      min={60}
                      max={180}
                      value={connectionRadius}
                      onChange={(e) => setConnectionRadius(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-[#2d68c4] dark:accent-[#60a5fa] cursor-pointer"
                    />
                    <span className="w-8 sm:w-10 font-bold text-right">{connectionRadius}px</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="opacity-75">Freq:</span>
                    <input
                      type="range"
                      min={0.01}
                      max={0.1}
                      step={0.005}
                      value={waveFrequency}
                      onChange={(e) => setWaveFrequency(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-[#2d68c4] dark:accent-[#60a5fa] cursor-pointer"
                    />
                    <span className="w-10 sm:w-12 font-bold text-right">{waveFrequency.toFixed(3)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-75">Speed:</span>
                    <input
                      type="range"
                      min={0.01}
                      max={0.08}
                      step={0.005}
                      value={waveSpeed}
                      onChange={(e) => setWaveSpeed(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-[#2d68c4] dark:accent-[#60a5fa] cursor-pointer"
                    />
                    <span className="w-8 sm:w-10 font-bold text-right">{waveSpeed.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Canvas Rendering Area */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[460px] bg-white dark:bg-slate-950 cursor-crosshair touch-none">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#0a0f18]/60 dark:text-slate-400 pointer-events-none bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-xs border border-[#0a0f18]/10 dark:border-white/10 font-semibold">
              Touch or drag cursor over canvas for kinetic force
            </div>
          </div>
        </div>

        {/* 3 Authentic Grounded Engineering Cards (Mobile Stack, Tablet 2-Col, Desktop 3-Col Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.experiments.map((item) => (
            <div
              key={item.id}
              className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 hover:border-[#0a0f18]/30 dark:hover:border-white/30 shadow-[0_4px_24px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_36px_rgb(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] bg-[#2d68c4]/10 dark:bg-[#60a5fa]/10 px-3 py-1 rounded-full border border-[#2d68c4]/20 dark:border-[#60a5fa]/20 font-semibold">
                    {item.type}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60 font-semibold">
                    ● {item.status}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#0a0f18] dark:text-white group-hover:text-[#2d68c4] dark:group-hover:text-[#60a5fa] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0a0f18]/85 dark:text-slate-300 mt-2 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metrics / Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-[#edf5ff] dark:bg-slate-800 text-[#0a0f18] dark:text-slate-200 border border-[#0a0f18]/10 dark:border-white/15 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Button */}
              <div className="pt-4 border-t border-[#0a0f18]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#0a0f18]/60 dark:text-slate-400 font-medium">
                  {item.date} • Production Ready
                </span>
                <a
                  href={item.link || "https://github.com/indreshmourya2007-sketch"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d68c4] dark:text-[#60a5fa] font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  {item.id === "lost-and-found-oop" ? (
                    <>
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>View Source Code</span>
                    </>
                  ) : (
                    <>
                      <span>Explore Engine</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
