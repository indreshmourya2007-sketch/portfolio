"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Certification } from "@/lib/data";
import { VerifiedBadgeIcon, ExternalLinkIcon } from "./icons";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section
      id="certifications"
      aria-label="Accreditations & Certifications"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Technical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="hidden md:grid absolute inset-0 grid-cols-12 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`cert-grid-${i}`} className="border-r border-[#173255]/[0.06] dark:border-white/[0.06] h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2d68c4] dark:bg-[#60a5fa]" />
              <span>03 / Accreditations & Certifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Validated industry accreditations <br className="hidden sm:inline" />
              <span className="italic font-normal">& cloud certifications</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 max-w-xs md:text-right">
            <span>GOOGLE CLOUD • NASA • AWS</span>
            <br />
            <span>INSTITUTIONALLY VERIFIED</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 hover:border-[#0a0f18]/30 dark:hover:border-white/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.4)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_32px_rgb(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                    <VerifiedBadgeIcon className="w-3.5 h-3.5" />
                    <span>{cert.date}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 text-[#0a0f18] dark:text-white border border-[#0a0f18]/10 dark:border-white/15 font-medium">
                    {cert.credentialId}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-[#0a0f18] dark:text-white group-hover:text-[#2d68c4] dark:group-hover:text-[#60a5fa] transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 mt-1 font-medium">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-[#edf5ff] dark:bg-slate-800 text-[#0a0f18] dark:text-slate-200 border border-[#0a0f18]/10 dark:border-white/15 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0a0f18]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#0a0f18]/70 dark:text-slate-300 font-medium">
                  Verified Credential
                </span>
                <span className="text-[#2d68c4] dark:text-[#60a5fa] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Modal Drawer */}
        {selectedCert && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f18]/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-[#0a0f18]/15 dark:border-white/20 shadow-2xl space-y-6 text-[#0a0f18] dark:text-white animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                    Accreditation Record
                  </span>
                  <h3 className="text-2xl font-light text-[#0a0f18] dark:text-white mt-1">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-8 h-8 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#edf5ff] dark:bg-slate-800 border border-[#0a0f18]/10 dark:border-white/15 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="opacity-70">Issuing Body:</span>
                  <span className="font-semibold">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Date Issued:</span>
                  <span className="font-semibold">{selectedCert.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Verification ID:</span>
                  <span className="font-semibold">{selectedCert.credentialId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active & Verified ✓</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider opacity-75 font-semibold">
                  Competencies Assessed
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={selectedCert.verifyUrl || "https://www.cloudskillsboost.google"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full pill-button-primary font-mono text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center gap-2"
                >
                  <span>Verify on Official Portal</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
