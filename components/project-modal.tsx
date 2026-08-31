"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/lib/data";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "demo">("specs");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Auto open demo tab for projects with interactive demonstrations
      if (project.id === "dr-decode" || project.id === "satya-drishti-ai") {
        setActiveTab("demo");
      } else {
        setActiveTab("specs");
      }
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isLive = project.status === "Live Production";
  const isDeployingSoon = project.status === "Deploying Soon" || project.status === "Production Ready";
  const liveLink = project.links?.live || project.demoUrl;
  const githubLink = project.links?.github || project.githubUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 dark:bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0f172a] rounded-3xl border border-[#0a0f18]/15 dark:border-white/15 shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 md:p-10 text-[#0a0f18] dark:text-slate-100 transition-colors select-text"
        style={{
          backgroundColor: "var(--paper-modal-bg, #ffffff)",
          color: "var(--ink-color, #0a0f18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#0a0f18]/10 dark:border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] bg-[#2d68c4]/10 dark:bg-[#60a5fa]/10 px-3 py-1 rounded-full border border-[#2d68c4]/20 dark:border-[#60a5fa]/20 font-semibold">
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 font-medium">
                {project.year}
              </span>
              {isLive ? (
                <span className="font-mono text-xs px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Production Ready ✓
                </span>
              ) : isDeployingSoon ? (
                <span className="font-mono text-xs px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold flex items-center gap-1.5">
                  <span>🚀</span>
                  Production Ready • Deploying Soon
                </span>
              ) : (
                <span className="font-mono text-xs px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold flex items-center gap-1.5">
                  <span>🚧</span>
                  In Active Development
                </span>
              )}
            </div>
            <h2 id="project-title" className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#0a0f18] dark:text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#0a0f18]/80 dark:text-slate-300 mt-1 font-normal">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Project Modal"
            className="w-10 h-10 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 hover:bg-[#0a0f18]/10 dark:hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 text-[#0a0f18] dark:text-white cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* View Switcher Tabs (For projects with live demonstrations) */}
        {(project.id === "dr-decode" || project.id === "satya-drishti-ai") && (
          <div className="flex items-center gap-2 pt-4 pb-1">
            <button
              onClick={() => setActiveTab("demo")}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all cursor-pointer font-semibold ${
                activeTab === "demo"
                  ? "bg-[#2d68c4] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              🎮 Live Interactive App Preview
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all cursor-pointer font-semibold ${
                activeTab === "specs"
                  ? "bg-[#2d68c4] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              📊 Architecture & Engineering Specs
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="py-5 space-y-6">
          {/* Active Status Banner */}
          {isDeployingSoon ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/25 flex items-start gap-3.5">
              <span className="text-xl sm:text-2xl flex-shrink-0">🚀</span>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  Project Status: Production Architecture Ready (Deploying Soon)
                </div>
                <p className="text-xs sm:text-sm text-[#0a0f18]/85 dark:text-slate-200 leading-relaxed font-normal">
                  The complete core codebase, object-oriented data structures, and algorithms have been engineered, profiled, and verified in private staging. Public live deployment and repository release are launching very soon.
                </p>
              </div>
            </div>
          ) : !isLive && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 flex items-start gap-3.5">
              <span className="text-xl sm:text-2xl flex-shrink-0">🚧</span>
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  Project Status: In Active Development (Working)
                </div>
                <p className="text-xs sm:text-sm text-[#0a0f18]/85 dark:text-slate-200 leading-relaxed font-normal">
                  This project is currently undergoing active engineering, architecture design, and private staging. Live public deployment and GitHub repository access are releasing soon.
                </p>
              </div>
            </div>
          )}

          {/* 1. Live Interactive Demo Tab for DR. DECODE */}
          {activeTab === "demo" && project.id === "dr-decode" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-gray-600 dark:text-gray-300">
                <span className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Clinical Intelligence Sandbox: Dr. Decode AI
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="/drdecode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>🚀 Launch Fullscreen</span>
                    <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                  <a
                    href="https://indreshmourya2007-sketch.github.io/Dr.Decode/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2d68c4] dark:text-[#60a5fa] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>GitHub Pages Site</span>
                    <ExternalLinkIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="w-full h-[520px] sm:h-[620px] md:h-[700px] rounded-2xl overflow-hidden border-2 border-[#0a0f18]/15 dark:border-white/20 bg-slate-950 shadow-2xl">
                <iframe
                  src="/drdecode"
                  title="Dr. Decode Live Interactive Demo"
                  className="w-full h-full border-none"
                  allow="camera; microphone; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400 text-center">
                🩺 Multi-Modal OCR Biomarker Extraction • 3D DNA Bio-Core Helix • 7 Languages • Doctor Triage
              </p>
            </div>
          )}

          {/* 2. Live Interactive Demo Tab for SATYADRISHTI AI */}
          {activeTab === "demo" && project.id === "satya-drishti-ai" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-gray-600 dark:text-gray-300">
                <span className="font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live App Sandbox Running: SatyaDrishti AI (सत्यदृष्टि)
                </span>
                <a
                  href="/satyadrishti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d68c4] dark:text-[#60a5fa] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Fullscreen App</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border-2 border-[#0a0f18]/15 dark:border-white/20 bg-slate-950 shadow-inner">
                <iframe
                  src="/satyadrishti"
                  title="SatyaDrishti AI Live Interactive Sandbox"
                  className="w-full h-full border-none"
                  allow="camera; microphone; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              <p className="font-mono text-[11px] text-gray-500 dark:text-gray-400 text-center">
                🛡️ Multi-Modal Threat Inspection Terminal • Neural Heuristic NLP • Audio & Document Forensics
              </p>
            </div>
          )}

          {/* 3. Architecture & Specifications Tab (Standard for all projects or when specs tab is active) */}
          {(activeTab === "specs" || (project.id !== "dr-decode" && project.id !== "satya-drishti-ai")) && (
            <>
              {/* Overview */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mb-2 font-semibold">
                  Overview & Engineering Scope
                </h3>
                <p className="text-sm sm:text-base text-[#0a0f18]/90 dark:text-slate-200 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mb-3 font-semibold">
                  Performance & Impact Benchmarks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-[#edf5ff]/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-[#0a0f18]/10 dark:border-white/10 text-center"
                    >
                      <div className="text-lg sm:text-2xl font-light tracking-tight text-[#0a0f18] dark:text-slate-100">
                        {m.value}
                      </div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mt-1 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Notes */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mb-3 font-semibold">
                  Architectural Highlights & Engineering Decisions
                </h3>
                <ul className="space-y-2.5">
                  {project.architectureNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0a0f18]/90 dark:text-slate-300 leading-normal">
                      <span className="font-mono text-xs text-[#2d68c4] dark:text-[#60a5fa] mt-0.5">◈</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mb-3 font-semibold">
                    Key Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/10 text-xs sm:text-sm text-[#0a0f18]/90 dark:text-slate-300 flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 mb-3 font-semibold">
                  Technologies & Tooling
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 text-[#0a0f18] dark:text-slate-200 border border-[#0a0f18]/10 dark:border-white/10 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-[#0a0f18]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 mt-auto">
          <div className="flex flex-wrap items-center gap-3">
            {isLive ? (
              <>
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-button-primary font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer font-semibold shadow-md"
                  >
                    <span>{project.id === "satya-drishti-ai" ? "Open GitHub Project" : "Launch Live Demonstration"}</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-button font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer text-[#0a0f18] dark:text-white font-semibold border border-gray-300 dark:border-slate-700"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>View GitHub Repository</span>
                  </a>
                )}
              </>
            ) : (
              <>
                <span className="font-mono text-xs px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-semibold inline-flex items-center gap-2">
                  <span>🚧</span>
                  <span>Under Active Construction (Releasing Soon)</span>
                </span>
                <a
                  href="https://github.com/indreshmourya2007-sketch"
                  target="_blank"
                  rel="noreferrer"
                  className="pill-button font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full inline-flex items-center gap-2 cursor-pointer text-[#0a0f18] dark:text-white font-medium border border-gray-300 dark:border-slate-700"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-[#0a0f18]/70 dark:text-slate-400 hover:text-[#0a0f18] dark:hover:text-white transition-colors py-2 px-3 cursor-pointer font-medium"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
