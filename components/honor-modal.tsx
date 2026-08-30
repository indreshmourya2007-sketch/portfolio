"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GlobalHonor } from "@/lib/data";
import { ExternalLinkIcon } from "./icons";

interface HonorModalProps {
  honor: GlobalHonor | null;
  onClose: () => void;
}

export default function HonorModal({ honor, onClose }: HonorModalProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFullProof, setShowFullProof] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showFullProof) {
          setShowFullProof(false);
        } else {
          onClose();
        }
      }
    };
    if (honor) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [honor, onClose, showFullProof]);

  if (!honor) return null;

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="honor-modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0f172a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#0a0f18]/15 dark:border-white/20 shadow-2xl space-y-6 text-[#0a0f18] dark:text-white select-text"
          style={{
            backgroundColor: "var(--paper-modal-bg, #ffffff)",
            color: "var(--ink-color, #0a0f18)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Title and Close Button */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0a0f18]/10 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#2d68c4] dark:text-[#60a5fa] font-semibold">
                  {honor.scope}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  {honor.badge}
                </span>
              </div>
              <h3
                id="honor-modal-title"
                className="text-2xl sm:text-3xl font-light text-[#0a0f18] dark:text-white leading-snug"
              >
                {honor.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Accreditation Modal"
              className="w-10 h-10 rounded-full bg-[#0a0f18]/5 dark:bg-white/10 hover:bg-[#0a0f18]/10 dark:hover:bg-white/20 text-[#0a0f18] dark:text-white flex items-center justify-center text-base flex-shrink-0 cursor-pointer transition-colors"
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

          {/* Verification Registry Information Card */}
          <div className="p-5 rounded-2xl bg-[#edf5ff] dark:bg-[#1e293b] border border-[#0a0f18]/10 dark:border-white/15 space-y-2.5 font-mono text-xs text-[#0a0f18] dark:text-slate-100">
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75">Issuing Authority:</span>
              <span className="font-bold text-right">{honor.issuer}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75">Credential Scope:</span>
              <span className="font-bold text-right">{honor.scope}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75">Verification Registry / ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2d68c4] dark:text-[#60a5fa] break-all text-right">
                  {honor.verificationId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(honor.verificationId)}
                  className="px-2 py-0.5 text-[10px] rounded bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:border-black transition-colors flex-shrink-0"
                >
                  {copiedId === honor.verificationId ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75">Verification Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Official & Verified Registry ✓
              </span>
            </div>
          </div>

          {/* Narrative Summary */}
          <p className="text-sm sm:text-base text-[#0a0f18]/85 dark:text-slate-200 font-light leading-relaxed">
            {honor.description}
          </p>

          {/* Verified Certificates & Multi-Track Registry Links */}
          {honor.credentials && honor.credentials.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider opacity-75 font-semibold text-[#0a0f18] dark:text-slate-200">
                <span>Direct Verified Certificates ({honor.credentials.length})</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Click to verify</span>
              </div>
              <div className="space-y-2">
                {honor.credentials.map((cred, idx) => (
                  <a
                    key={idx}
                    href={cred.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-[#0a0f18]/15 dark:border-white/15 hover:border-[#2d68c4] dark:hover:border-[#60a5fa] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-xs text-[#0a0f18] dark:text-white group-hover:text-[#2d68c4] dark:group-hover:text-[#60a5fa] transition-colors">
                        {cred.name}
                      </div>
                      <div className="font-mono text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span>ID: <strong className="text-black dark:text-white">{cred.id}</strong></span>
                        {cred.issuer && <span>• {cred.issuer}</span>}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#2d68c4] dark:text-[#60a5fa] flex items-center gap-1 self-start sm:self-center flex-shrink-0">
                      <span>View Credential</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Official Document Proof (e.g. Offer Letter Preview) */}
          {honor.proofImage && (
            <div className="space-y-2.5 pt-2">
              <div className="font-mono text-xs uppercase tracking-wider opacity-75 font-semibold text-[#0a0f18] dark:text-slate-200">
                {honor.proofTitle || "Official Document Verification Proof:"}
              </div>
              <div
                onClick={() => setShowFullProof(true)}
                className="relative rounded-2xl overflow-hidden border-2 border-[#0a0f18]/15 dark:border-white/20 bg-gray-100 dark:bg-slate-950 cursor-pointer group shadow-sm"
              >
                <div className="relative w-full h-56 sm:h-72">
                  <Image
                    src={honor.proofImage}
                    alt={honor.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4 text-white">
                    <span className="font-mono text-xs font-bold bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                      🔍 Click to inspect full document
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">
                      Signed & Verified ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Deliverables & Benchmarks */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-wider opacity-75 font-semibold text-[#0a0f18] dark:text-slate-200">
              Core Technical Deliverables:
            </div>
            <div className="space-y-2">
              {honor.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#edf5ff]/70 dark:bg-[#1e293b]/90 border border-[#0a0f18]/10 dark:border-white/15 text-xs sm:text-sm text-[#0a0f18]/90 dark:text-slate-200 flex items-center gap-2.5 font-medium"
                >
                  <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Verification CTA */}
          <div className="pt-3 border-t border-[#0a0f18]/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={honor.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full pill-button-primary font-mono text-xs uppercase tracking-wider py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-md"
            >
              <span>Verify on Official Issuer Portal</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Screen Proof Document Modal */}
      {showFullProof && honor.proofImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-Screen Document Preview"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-lg animate-fadeIn"
          onClick={() => setShowFullProof(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[95vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-slate-800">
              <h4 className="font-mono text-xs uppercase font-bold text-[#0a0f18] dark:text-white">
                {honor.proofTitle || "Official Document Proof"}
              </h4>
              <button
                onClick={() => setShowFullProof(false)}
                className="px-3 py-1 text-xs font-mono rounded-full bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 text-black dark:text-white font-bold cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>
            <div className="relative w-full h-[70vh] sm:h-[80vh]">
              <Image
                src={honor.proofImage}
                alt="Document proof full preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
