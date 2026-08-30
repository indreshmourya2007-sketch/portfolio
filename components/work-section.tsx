"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/lib/data";

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewLayout, setViewLayout] = useState<"grid" | "list">("grid");

  const categories = [
    "All",
    "Cloud & IoT",
    "AI & Web Systems",
    "Systems & C++",
    "Creative Engineering",
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="work"
      aria-label="Selected Works & Systems"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>04 / Selected Works & Flagship Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Architectures, hardware engines, <br className="hidden sm:inline" />
              <span className="italic font-normal">and intelligent models</span>.
            </h2>
          </div>

          {/* Controls Bar: Category Filters & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full sm:w-56 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/20 text-xs font-mono text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/40 dark:placeholder-slate-400 focus:outline-none focus:border-[#0a0f18] dark:focus:border-white transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0a0f18]/50 dark:text-slate-400 hover:text-[#0a0f18]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Grid / List layout switch */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-full border border-[#0a0f18]/15 dark:border-white/20 w-fit">
              <button
                onClick={() => setViewLayout("grid")}
                aria-label="Grid layout"
                className={`p-1.5 rounded-full transition-colors ${
                  viewLayout === "grid"
                    ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18]"
                    : "text-[#0a0f18] dark:text-white opacity-60"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                onClick={() => setViewLayout("list")}
                aria-label="List layout"
                className={`p-1.5 rounded-full transition-colors ${
                  viewLayout === "list"
                    ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18]"
                    : "text-[#0a0f18] dark:text-white opacity-60"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-full border border-[#0a0f18]/15 dark:border-white/20 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all ${
                activeFilter === cat
                  ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18] font-semibold shadow-xs"
                  : "text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/5 dark:hover:bg-white/10 font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/20 space-y-3">
            <div className="font-mono text-sm text-[#0a0f18] dark:text-white opacity-75">
              No matching projects found for &ldquo;{searchQuery}&rdquo; in category &ldquo;{activeFilter}&rdquo;
            </div>
            <button
              onClick={() => {
                setActiveFilter("All");
                setSearchQuery("");
              }}
              className="pill-button font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full text-[#0a0f18] dark:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Showcase Container */}
        {viewLayout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.4)] backdrop-blur-md hover:border-[#0a0f18]/30 dark:hover:border-white/30 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.6)] transition-all duration-300 ${
                  project.featured && idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Card Header Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] bg-[#2d68c4]/10 dark:bg-[#60a5fa]/15 px-2.5 py-0.5 rounded-full border border-[#2d68c4]/20 dark:border-[#60a5fa]/25 font-semibold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.status === "Live Production" ? (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Ready
                        </span>
                      ) : project.status === "Deploying Soon" || project.status === "Production Ready" ? (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold flex items-center gap-1">
                          <span>🚀</span>
                          Deploying Soon
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold flex items-center gap-1">
                          <span>🚧</span>
                          In Progress
                        </span>
                      )}
                      <span className="font-mono text-xs text-[#0a0f18] dark:text-white opacity-70">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-normal text-[#0a0f18] dark:text-white tracking-tight group-hover:text-[#2d68c4] dark:group-hover:text-[#60a5fa] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#0a0f18] dark:text-white mt-1 opacity-80 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#0a0f18] dark:text-white leading-relaxed font-light opacity-90">
                    {project.summary}
                  </p>

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-3 gap-2 py-2">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/15 text-center"
                      >
                        <div className="font-mono text-xs sm:text-sm font-bold text-[#0a0f18] dark:text-white">
                          {m.value}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-wider text-[#0a0f18] dark:text-white mt-0.5 truncate opacity-75 font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-[#0a0f18] dark:text-white border border-[#0a0f18]/15 dark:border-white/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded text-[#0a0f18] dark:text-white opacity-70">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-[#0a0f18]/15 dark:border-white/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.status === "Live Production" && project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill-button-primary font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full inline-flex items-center gap-1.5 font-bold shadow-xs cursor-pointer"
                      >
                        <span>Launch App</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : null}

                    <button
                      onClick={() => onSelectProject(project)}
                      className="pill-button font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-full inline-flex items-center gap-1.5 hover:bg-[#0a0f18] hover:text-white dark:hover:bg-white dark:hover:text-[#0a0f18] transition-all cursor-pointer text-[#0a0f18] dark:text-white font-semibold border border-gray-300 dark:border-slate-700"
                    >
                      <span>
                        {project.id === "dr-decode" || project.id === "satya-drishti-ai"
                          ? "🎮 Live Demo & Spec"
                          : "Inspect Spec"}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub Source`}
                        title="GitHub Repository"
                        className="w-8 h-8 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 hover:bg-[#0a0f18]/15 dark:hover:bg-white/20 flex items-center justify-center text-[#0a0f18] dark:text-white transition-colors"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#0a0f18]/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                      {project.category}
                    </span>
                    {project.status === "Live Production" ? (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold">
                        ● Live Ready
                      </span>
                    ) : project.status === "Deploying Soon" || project.status === "Production Ready" ? (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold">
                        🚀 Deploying Soon
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold">
                        🚧 In Progress
                      </span>
                    )}
                    <span className="font-mono text-xs text-[#0a0f18] dark:text-white opacity-70">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a0f18] dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#0a0f18] dark:text-white opacity-85 font-light">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="pill-button font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full inline-flex items-center gap-1.5 text-[#0a0f18] dark:text-white"
                  >
                    Inspect Spec →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
