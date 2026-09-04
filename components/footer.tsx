"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  InstagramIcon,
  TwitterIcon,
  LocationPinIcon,
} from "./icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIconsMap: Record<string, React.ReactNode> = {
    github: <GitHubIcon className="w-4 h-4" />,
    linkedin: <LinkedInIcon className="w-4 h-4" />,
    whatsapp: <WhatsAppIcon className="w-4 h-4" />,
    instagram: <InstagramIcon className="w-4 h-4" />,
    twitter: <TwitterIcon className="w-4 h-4" />,
  };

  return (
    <footer
      id="contact-footer"
      aria-label="Site Footer and Links"
      className="relative w-full py-28 md:py-36 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/[0.08] dark:border-white/[0.08] transition-colors duration-300 overflow-hidden"
    >
      {/* Background Technical Grid Continuity */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`f-grid-${i}`}
              className="border-r border-[#173255]/[0.06] dark:border-white/[0.06] h-full"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1720px] mx-auto space-y-24 md:space-y-32">
        {/* Center Mega Heading */}
        <div className="text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] font-semibold block">
            09 / Editorial Dispatch & Networks
          </span>
          <h2 className="font-sans text-[clamp(3.5rem,7vw,7rem)] font-light tracking-[-0.06em] leading-[0.92] text-[#0a0f18] dark:text-white max-w-5xl mx-auto">
            Let&apos;s build something great.
          </h2>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PORTFOLIO_DATA.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button font-mono text-xs uppercase tracking-wider font-medium px-8 py-3.5 rounded-full inline-flex items-center gap-2 text-[#0a0f18] dark:text-white"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Initiate Conversation (WhatsApp)</span>
              <span>↗</span>
            </a>
            <a
              href={PORTFOLIO_DATA.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button font-mono text-xs uppercase tracking-wider font-medium px-6 py-3.5 rounded-full inline-flex items-center gap-2 text-[#0a0f18] dark:text-white"
            >
              <LinkedInIcon className="w-4 h-4 text-[#0077b5]" />
              <span>Connect on LinkedIn</span>
              <span>↗</span>
            </a>
            <a
              href="/Indresh_Mourya_Resume.pdf"
              download="Indresh_Mourya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-primary font-mono text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full inline-flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-transform"
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
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="12" y2="18" />
                <line x1="15" y1="15" x2="12" y2="18" />
              </svg>
              <span>Resume [PDF]</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Social Links & Back to Top */}
        <div className="pt-12 border-t border-[#173255]/[0.1] dark:border-white/[0.1] flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Social Links with SVG icons & scale-x underline effect */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {PORTFOLIO_DATA.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white relative py-1 flex items-center gap-1.5 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 font-medium group"
              >
                <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                  {socialIconsMap[social.id]}
                </span>
                <span>{social.label}</span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            ))}
          </div>

          {/* Location, Copyright & Back to top Button */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-6 text-xs font-mono text-[#0a0f18]/70 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <LocationPinIcon className="w-3.5 h-3.5 text-[#2d68c4] dark:text-[#60a5fa]" />
              <span>{PORTFOLIO_DATA.profile.location}</span>
            </span>

            <span>
              © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}
            </span>

            <button
              onClick={scrollToTop}
              className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-current after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 font-medium cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
