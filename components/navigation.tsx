"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { PORTFOLIO_DATA } from "@/lib/data";

interface NavigationProps {
  onOpenCommand: () => void;
}

export default function Navigation({ onOpenCommand }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 120);

      // Section spy
      const sections = ["hero", "about", "honors", "timeline", "work", "process", "experiments", "contact"];
      const scrollPosition = scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Honors", href: "#honors", id: "honors" },
    { label: "Timeline", href: "#timeline", id: "timeline" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Lab", href: "#experiments", id: "experiments" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      {/* Floating Sticky Pill Bar (Visible on scroll) */}
      <header
        className={`fixed top-4 md:top-6 inset-x-0 z-40 flex justify-center pointer-events-none transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 md:p-2 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-[#0a0f18]/15 dark:border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-colors">
          {/* Monogram Brand */}
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 group rounded-full hover:bg-[#0a0f18]/5 dark:hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#0a0f18] dark:bg-white text-white dark:text-[#0a0f18] flex items-center justify-center font-mono text-[10px] font-bold">
              I
            </div>
            <span className="font-mono text-xs font-semibold tracking-tight text-[#0a0f18] dark:text-white hidden sm:inline-block">
              {PORTFOLIO_DATA.profile.shortName}
            </span>
          </a>

          <div className="w-px h-4 bg-[#0a0f18]/15 dark:bg-white/20 mx-1 hidden sm:block" />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18] font-semibold shadow-sm"
                      : "text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/10 dark:hover:bg-white/10 font-medium"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="w-px h-4 bg-[#0a0f18]/15 dark:bg-white/20 mx-1" />

          {/* Search / Command Menu Button */}
          <button
            onClick={onOpenCommand}
            aria-label="Open Command Menu"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 hover:bg-[#0a0f18]/15 dark:hover:bg-white/20 transition-colors text-xs font-mono text-[#0a0f18] dark:text-white cursor-pointer"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="hidden sm:inline-block font-medium">Search</span>
            <kbd className="hidden lg:inline-block font-mono text-[9px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-[#0a0f18]/15 dark:border-white/20 text-[#0a0f18] dark:text-white">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-2 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 hover:bg-[#0a0f18]/15 dark:hover:bg-white/20 text-[#0a0f18] dark:text-white transition-colors cursor-pointer"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            className="md:hidden p-2 rounded-full hover:bg-[#0a0f18]/10 dark:hover:bg-white/10 text-[#0a0f18] dark:text-white cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0f18]/50 dark:bg-black/80 backdrop-blur-md md:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-20 inset-x-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-[#0a0f18]/15 dark:border-white/20 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#0a0f18]/15 dark:border-white/15">
              <span className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-medium">
                Navigation
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 text-[#0a0f18] dark:text-white font-mono text-xs cursor-pointer"
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 flex items-center justify-center text-xs text-[#0a0f18] dark:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-sm py-2.5 px-4 rounded-xl transition-colors ${
                    activeSection === link.id
                      ? "bg-[#0a0f18] text-white dark:bg-white dark:text-[#0a0f18] font-semibold"
                      : "text-[#0a0f18] dark:text-white hover:bg-[#0a0f18]/10 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[#0a0f18]/15 dark:border-white/15 flex flex-col gap-2">
              <a
                href="/Indresh_Mourya_Resume.pdf"
                download="Indresh_Mourya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full font-mono text-xs uppercase tracking-wider py-3 rounded-xl border border-[#0a0f18]/20 dark:border-white/20 text-[#0a0f18] dark:text-white text-center font-medium cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>Resume [PDF]</span>
                <span>⬇</span>
              </a>
              <a
                href={PORTFOLIO_DATA.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full pill-button-primary font-mono text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center text-center"
              >
                Initiate Conversation
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
