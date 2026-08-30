"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  InstagramIcon,
  TwitterIcon,
  LocationPinIcon,
  ExternalLinkIcon,
} from "./icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Engineering Engagement & Architecture",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  // Real-time IST clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PORTFOLIO_DATA.profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Transmission] ${formData.subject} - from ${formData.name}`,
          inquiry_scope: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (response.ok) {
        setSubmittedData({ ...formData });
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "Engineering Engagement & Architecture",
          message: "",
        });
      } else {
        throw new Error("Transmission dispatch failed via network gateway.");
      }
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      setSubmittedData({ ...formData });
      setStatus("error");
      setErrorMessage("Direct gateway reached a temporary rate limit or network issue. You can instantly transmit your inquiry via WhatsApp or Email below.");
    }
  };

  const socialIconsMap: Record<string, React.ReactNode> = {
    github: <GitHubIcon className="w-4 h-4" />,
    linkedin: <LinkedInIcon className="w-4 h-4" />,
    whatsapp: <WhatsAppIcon className="w-4 h-4" />,
    instagram: <InstagramIcon className="w-4 h-4" />,
    twitter: <TwitterIcon className="w-4 h-4" />,
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Direct Inquiry Terminal"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>08 / Direct Transmission & Inquiries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Let&apos;s build something <br className="hidden sm:inline" />
              <span className="italic font-normal">extraordinary together</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18] dark:text-white max-w-xs md:text-right opacity-80 font-medium">
            <span>LOCAL TIME (IST): {currentTime || "08:50 PM"}</span>
            <br />
            <span>INDORE, M.P., INDIA (UTC+5:30)</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Direct Info & Social Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_4px_24px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgb(0,0,0,0.4)] backdrop-blur-md space-y-6 transition-colors">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                  Direct Inquiries
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-[#0a0f18] dark:text-white mt-1">
                  Connect for collaborations & software development
                </h3>
                <p className="text-sm text-[#0a0f18] dark:text-white mt-2 font-light leading-relaxed opacity-90">
                  Open to exciting projects, agentic workflows, WebGPU rendering prototypes, and fullstack web applications.
                </p>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/15 flex items-center gap-3 font-mono text-xs">
                <LocationPinIcon className="w-5 h-5 text-[#2d68c4] dark:text-[#60a5fa] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-[#0a0f18] dark:text-white">
                    {PORTFOLIO_DATA.profile.location}
                  </div>
                  <div className="text-[11px] opacity-75 text-[#0a0f18] dark:text-slate-300">
                    {PORTFOLIO_DATA.profile.institution}
                  </div>
                </div>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-2xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase text-[#0a0f18] dark:text-white opacity-70 font-semibold">
                    Direct Email
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-[#0a0f18] dark:text-white">
                    {PORTFOLIO_DATA.profile.email}
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="pill-button font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full inline-flex items-center justify-center gap-1.5 cursor-pointer text-[#0a0f18] dark:text-white font-medium"
                >
                  {copied ? (
                    <>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Availability Chip */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/15">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-[#0a0f18] dark:text-white font-medium">
                  {PORTFOLIO_DATA.profile.availability}
                </span>
              </div>
            </div>

            {/* Social Grid with Custom SVG Icons */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 space-y-4 transition-colors">
              <div className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-semibold opacity-75">
                Networks & Social Channels
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTFOLIO_DATA.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-[#edf5ff]/50 dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/15 hover:border-[#0a0f18]/30 dark:hover:border-white/30 hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0a0f18] dark:text-white">
                      <span className="flex items-center gap-2">
                        {socialIconsMap[social.id]}
                        <span>{social.label}</span>
                      </span>
                      <ExternalLinkIcon className="w-3 h-3 text-[#0a0f18]/60 dark:text-slate-400 group-hover:text-[#0a0f18] dark:group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-mono text-[11px] text-[#0a0f18] dark:text-white mt-1.5 truncate opacity-75">
                      {social.handle}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/20 shadow-[0_8px_32px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgb(0,0,0,0.5)] backdrop-blur-xl transition-colors">
            <div className="flex items-center justify-between pb-6 border-b border-[#0a0f18]/15 dark:border-white/15">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-[#0a0f18] dark:text-white ml-2 opacity-80 font-medium">
                  dispatch_inquiry.sh
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#2d68c4] dark:text-[#60a5fa] font-bold">
                ENCRYPTED TLS
              </span>
            </div>

            {status === "success" ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-2xl font-light text-[#0a0f18] dark:text-white">
                  Transmission Dispatched Successfully
                </h4>
                <p className="text-sm text-[#0a0f18] dark:text-white max-w-md mx-auto font-light opacity-90 leading-relaxed">
                  Your message has been securely delivered directly to <strong className="font-semibold text-[#2d68c4] dark:text-[#60a5fa]">{PORTFOLIO_DATA.profile.email}</strong>. Indresh will review your transmission and get back to you within 24 business hours.
                </p>

                {submittedData && (
                  <div className="my-4 p-4 max-w-md mx-auto rounded-2xl bg-[#edf5ff] dark:bg-slate-800/80 border border-[#0a0f18]/10 dark:border-white/10 text-left font-mono text-xs space-y-1.5">
                    <div className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">TRANSMISSION RECEIPT:</div>
                    <div className="text-[#0a0f18] dark:text-slate-200 truncate"><strong>Sender:</strong> {submittedData.name} ({submittedData.email})</div>
                    <div className="text-[#0a0f18] dark:text-slate-200 truncate"><strong>Scope:</strong> {submittedData.subject}</div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917566221905?text=${encodeURIComponent(
                      `Hi Indresh, I just submitted an inquiry on your portfolio regarding: ${submittedData?.subject || "Collaboration"}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button-primary font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-white cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Ping on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setStatus("idle");
                      setSubmittedData(null);
                    }}
                    className="pill-button font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-block text-[#0a0f18] dark:text-white cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : status === "error" ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  !
                </div>
                <h4 className="text-2xl font-light text-[#0a0f18] dark:text-white">
                  Direct Gateway Alert
                </h4>
                <p className="text-sm text-[#0a0f18] dark:text-white max-w-md mx-auto font-light opacity-90 leading-relaxed">
                  {errorMessage}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/917566221905?text=${encodeURIComponent(
                      `Hi Indresh, my name is ${submittedData?.name || ""}. Subject: ${submittedData?.subject || ""}\n\nMessage: ${submittedData?.message || ""}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button-primary font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-white cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
                      `[Portfolio Inquiry] ${submittedData?.subject || "Collaboration"}`
                    )}&body=${encodeURIComponent(
                      `Name: ${submittedData?.name || ""}\nEmail: ${submittedData?.email || ""}\n\nMessage:\n${submittedData?.message || ""}`
                    )}`}
                    className="pill-button font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-[#0a0f18] dark:text-white cursor-pointer"
                  >
                    <span>Send via Email Client</span>
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="pill-button font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full inline-block text-[#0a0f18] dark:text-white cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-semibold">
                      Your Name / Entity
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20 text-sm text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/50 dark:placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:border-[#0a0f18] dark:focus:border-white transition-all font-sans font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20 text-sm text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/50 dark:placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:border-[#0a0f18] dark:focus:border-white transition-all font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-semibold">
                    Inquiry Scope
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20 text-sm text-[#0a0f18] dark:text-white focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:border-[#0a0f18] dark:focus:border-white transition-all font-sans font-medium"
                  >
                    <option>Engineering Engagement & Architecture</option>
                    <option>Autonomous AI Multi-Agent Workflows</option>
                    <option>IoT & Embedded Telemetry Systems</option>
                    <option>Creative Tech & WebGL/WebGPU Prototyping</option>
                    <option>General Inquiries & Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white font-semibold">
                    Project Brief / Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide an overview of your project, timeline, and engineering scope..."
                    className="w-full px-4 py-3 rounded-xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20 text-sm text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/50 dark:placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:border-[#0a0f18] dark:focus:border-white transition-all font-sans resize-none font-medium"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#0a0f18] dark:text-white opacity-70">
                    All communications are strictly confidential.
                  </span>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="pill-button-primary font-mono text-xs uppercase tracking-wider px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Send Transmission</span>
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
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
