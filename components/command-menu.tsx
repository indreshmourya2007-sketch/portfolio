"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PORTFOLIO_DATA, Project } from "@/lib/data";
import { useTheme } from "./theme-provider";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export default function CommandMenu({ isOpen, onClose, onSelectProject }: CommandMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on Escape & Global ⌘K Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const event = new CustomEvent("toggle-command-menu");
          window.dispatchEvent(event);
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items
  const query = search.toLowerCase().trim();

  const sectionItems = [
    { type: "section", title: "Hero / Overview", href: "#hero", icon: "✦" },
    { type: "section", title: "About & Manifesto", href: "#about", icon: "◈" },
    { type: "section", title: "Global Distinctions & Honors", href: "#honors", icon: "★" },
    { type: "section", title: "Career Milestones & Timeline", href: "#timeline", icon: "⏱" },
    { type: "section", title: "Selected Works & Systems", href: "#work", icon: "◫" },
    { type: "section", title: "Engineering Process", href: "#process", icon: "⚙" },
    { type: "section", title: "Developer Terminal REPL", href: "#terminal", icon: "💻" },
    { type: "section", title: "Interactive Lab", href: "#experiments", icon: "⚡" },
    { type: "section", title: "Contact & Transmission", href: "#contact", icon: "✉" },
  ].filter((s) => s.title.toLowerCase().includes(query));

  const projectItems = PORTFOLIO_DATA.projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.subtitle.toLowerCase().includes(query) ||
      p.techStack.some((t) => t.toLowerCase().includes(query))
  );

  const actionItems = [
    {
      id: "toggle-theme",
      title: `Toggle Theme (Switch to ${theme === "dark" ? "Light" : "Dark"} Mode)`,
      action: () => {
        toggleTheme();
        onClose();
      },
      icon: theme === "dark" ? "☀️" : "🌙",
    },
    {
      id: "print-resume",
      title: "Print Resume [ATS-Friendly PDF]",
      action: () => {
        onClose();
        window.print();
      },
      icon: "📄",
    },
    {
      id: "copy-email",
      title: `Copy Email (${PORTFOLIO_DATA.profile.email})`,
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      icon: "📋",
    },
    {
      id: "open-github",
      title: "Open GitHub Profile",
      action: () => {
        window.open(PORTFOLIO_DATA.links.github, "_blank");
      },
      icon: "↗",
    },
    {
      id: "open-whatsapp",
      title: "Initiate WhatsApp Conversation",
      action: () => {
        window.open(PORTFOLIO_DATA.links.whatsapp, "_blank");
      },
      icon: "💬",
    },
    {
      id: "open-linkedin",
      title: "Connect on LinkedIn",
      action: () => {
        window.open(PORTFOLIO_DATA.links.linkedin, "_blank");
      },
      icon: "💼",
    },
  ].filter((a) => a.title.toLowerCase().includes(query));

  const allItemsLength = sectionItems.length + projectItems.length + actionItems.length;

  const handleNavigate = useCallback(
    (href: string) => {
      onClose();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Navigation Menu"
      className="fixed inset-0 z-[110] flex items-start justify-center pt-[8vh] sm:pt-[15vh] px-3 sm:px-4 bg-[#0a0f18]/50 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 backdrop-blur-xl rounded-2xl border border-[#0a0f18]/15 dark:border-white/20 shadow-2xl overflow-hidden animate-scaleIn transition-colors text-[#0a0f18] dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#0a0f18]/15 dark:border-white/15 gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#0a0f18] dark:text-white opacity-70"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Type a command, project, or section..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm md:text-base text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/50 dark:placeholder-slate-400 focus:outline-none font-sans font-medium"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#0a0f18]/5 dark:bg-white/10 text-[#0a0f18] dark:text-white border border-[#0a0f18]/15 dark:border-white/20">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {copied && (
            <div className="mx-2 p-2 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-mono rounded-lg border border-emerald-200 dark:border-emerald-700 text-center animate-fadeIn font-semibold">
              ✓ Email address copied to clipboard!
            </div>
          )}

          {allItemsLength === 0 && (
            <div className="py-8 text-center text-xs font-mono text-[#0a0f18] dark:text-white opacity-60">
              No matching results for &ldquo;{search}&rdquo;
            </div>
          )}

          {/* Quick Sections */}
          {sectionItems.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#0a0f18] dark:text-white opacity-75 font-semibold">
                Sections
              </div>
              <div className="space-y-0.5 mt-1">
                {sectionItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/5 dark:hover:bg-white/10 transition-colors group font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[#2d68c4] dark:text-[#60a5fa] font-mono text-xs">{item.icon}</span>
                      <span>{item.title}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#0a0f18] dark:text-white opacity-60 group-hover:opacity-100">
                      Jump →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projectItems.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#0a0f18] dark:text-white opacity-75 font-semibold">
                Projects
              </div>
              <div className="space-y-0.5 mt-1">
                {projectItems.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      onClose();
                      if (onSelectProject) {
                        onSelectProject(project);
                      } else {
                        handleNavigate("#work");
                      }
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/5 dark:hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-xs text-[#0a0f18] dark:text-white opacity-80 truncate max-w-sm">
                        {project.subtitle}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 text-[#0a0f18] dark:text-white border border-[#0a0f18]/15 dark:border-white/20 font-medium">
                      {project.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {actionItems.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#0a0f18] dark:text-white opacity-75 font-semibold">
                Actions
              </div>
              <div className="space-y-0.5 mt-1">
                {actionItems.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/5 dark:hover:bg-white/10 transition-colors group font-medium cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{action.icon}</span>
                      <span>{action.title}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#0a0f18] dark:text-white opacity-60 group-hover:opacity-100">
                      Execute
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0a0f18]/[0.03] dark:bg-white/[0.03] border-t border-[#0a0f18]/15 dark:border-white/15 flex items-center justify-between text-[11px] font-mono text-[#0a0f18] dark:text-white opacity-70">
          <span>Navigate with mouse, keyboard or touch</span>
          <span>Indresh Portfolio v3.2 • Indore, M.P.</span>
        </div>
      </div>
    </div>
  );
}
