"use client";

import React, { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/lib/data";
import { TerminalIcon } from "./icons";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "neofetch",
      output: (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">
            indresh@piemr-indore ~ %
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#0a0f18]/80 dark:text-slate-300">
            <div>• <strong className="text-[#0a0f18] dark:text-white">User:</strong> Indresh Mourya</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Role:</strong> Software Developer & Student</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Institution:</strong> PIEMR (B.Tech CSE)</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Location:</strong> Indore, M.P., India</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Accreditations:</strong> 5x Google Cloud, NASA, AWS</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Status:</strong> Top 10% Replit Agent Dev</div>
          </div>
          <div className="text-[11px] text-[#0a0f18]/60 dark:text-slate-400 pt-1">
            Type <span className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">help</span> to view all interactive CLI commands.
          </div>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#0a0f18]/80 dark:text-slate-300">
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">bio</strong> — Overview of Indresh Mourya & background</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">resume</strong> — Download / print 1-page ATS executive resume [PDF]</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">projects</strong> — List flagship and production projects</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">skills</strong> — Technical stack & core competencies</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">certs</strong> — Google Cloud, NASA, & AWS credentials</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">contact</strong> — Reach out directly via WhatsApp/Email</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">location</strong> — Geographic location & coordinates</div>
            <div><strong className="text-[#2d68c4] dark:text-[#60a5fa]">clear</strong> — Clear terminal screen buffer</div>
          </div>
        );
        break;

      case "bio":
      case "about":
        output = (
          <div className="text-xs font-mono text-[#0a0f18]/85 dark:text-slate-200 leading-relaxed">
            {PORTFOLIO_DATA.profile.bio}
          </div>
        );
        break;

      case "projects":
      case "list":
        output = (
          <div className="space-y-2 text-xs font-mono">
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[#2d68c4] dark:border-[#60a5fa] pl-2">
                <span className="font-bold text-[#0a0f18] dark:text-white">{p.title}</span> ({p.category}) — {p.subtitle}
                <div className="text-[11px] text-[#0a0f18]/60 dark:text-slate-400">
                  Stack: {p.techStack.join(", ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {PORTFOLIO_DATA.skills.map((c) => (
              <div key={c.title} className="p-2 rounded bg-[#0a0f18]/5 dark:bg-white/5">
                <strong className="text-[#2d68c4] dark:text-[#60a5fa]">{c.title}:</strong>
                <div className="text-[11px] text-[#0a0f18]/70 dark:text-slate-300 mt-0.5">
                  {c.skills.map((s) => s.name).join(" • ")}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "certs":
        output = (
          <div className="space-y-1.5 text-xs font-mono">
            {PORTFOLIO_DATA.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between border-b border-[#0a0f18]/10 dark:border-white/10 pb-1">
                <span>{cert.title}</span>
                <span className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">{cert.credentialId}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono text-[#0a0f18]/80 dark:text-slate-300">
            <div>• <strong className="text-[#0a0f18] dark:text-white">Email:</strong> {PORTFOLIO_DATA.profile.email}</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">WhatsApp:</strong> {PORTFOLIO_DATA.links.whatsapp}</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">LinkedIn:</strong> {PORTFOLIO_DATA.links.linkedin}</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">GitHub:</strong> {PORTFOLIO_DATA.links.github}</div>
            <div>• <strong className="text-[#0a0f18] dark:text-white">Instagram:</strong> {PORTFOLIO_DATA.links.instagram}</div>
          </div>
        );
        break;

      case "location":
        output = (
          <div className="text-xs font-mono text-[#0a0f18]/80 dark:text-slate-300">
            <div><strong className="text-[#0a0f18] dark:text-white">Location:</strong> {PORTFOLIO_DATA.profile.location}</div>
            <div><strong className="text-[#0a0f18] dark:text-white">Coordinates:</strong> {PORTFOLIO_DATA.profile.coordinates}</div>
            <div><strong className="text-[#0a0f18] dark:text-white">Timezone:</strong> Asia/Kolkata (IST • UTC+5:30)</div>
          </div>
        );
      case "resume":
      case "cv":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              ✓ Loaded 1-Page ATS Executive Resume Summary (Indresh Mourya).
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg bg-[#2d68c4] text-white hover:bg-[#20529d] font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Download / Print Resume (PDF)</span>
                <span>⬇</span>
              </button>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "neofetch":
      case "whoami":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">
              indresh@piemr-indore ~ %
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#0a0f18]/80 dark:text-slate-300">
              <div>• <strong className="text-[#0a0f18] dark:text-white">User:</strong> Indresh Mourya</div>
              <div>• <strong className="text-[#0a0f18] dark:text-white">Role:</strong> Software Developer & Student</div>
              <div>• <strong className="text-[#0a0f18] dark:text-white">Institution:</strong> PIEMR (B.Tech CSE)</div>
              <div>• <strong className="text-[#0a0f18] dark:text-white">Location:</strong> Indore, M.P., India</div>
              <div>• <strong className="text-[#0a0f18] dark:text-white">Accreditations:</strong> 5x Google Cloud, NASA, AWS</div>
              <div>• <strong className="text-[#0a0f18] dark:text-white">Status:</strong> Top 10% Replit Agent Dev</div>
            </div>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-rose-600 dark:text-rose-400">
            command not found: {cmd}. Type <span className="font-bold underline">help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <section
      id="terminal"
      aria-label="Interactive Developer Terminal"
      className="relative w-full py-24 md:py-32 px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-[max(5.6vw,2rem)] bg-[#edf5ff] dark:bg-[#070b12] border-t border-[#173255]/10 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#173255]/15 dark:border-white/15">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#2d68c4] dark:text-[#60a5fa] mb-3 font-semibold">
              <TerminalIcon className="w-4 h-4 text-[#2d68c4] dark:text-[#60a5fa]" />
              <span>06 / Interactive Developer Terminal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] text-[#0a0f18] dark:text-white leading-[1.05]">
              Direct shell interface & <br className="hidden sm:inline" />
              <span className="italic font-normal">system telemetry REPL</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 max-w-xs md:text-right">
            <span>INDRESH-OS v2.5 [POSIX SHELL]</span>
            <br />
            <span>TYPE &apos;HELP&apos; FOR COMMANDS</span>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-[#0a0f18]/15 dark:border-white/15 shadow-[0_12px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgb(0,0,0,0.5)] overflow-hidden transition-colors">
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-[#edf5ff]/80 dark:bg-slate-800/90 border-b border-[#0a0f18]/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-[#0a0f18]/70 dark:text-slate-300 ml-2 font-medium">
                indresh@piemr-indore: ~ (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-[#2d68c4] dark:text-[#60a5fa] px-2 py-0.5 rounded bg-[#2d68c4]/10 dark:bg-[#60a5fa]/10 font-semibold">
                Interactive REPL
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div ref={terminalBodyRef} className="p-6 sm:p-8 space-y-4 max-h-[420px] overflow-y-auto font-mono text-sm bg-white dark:bg-slate-950">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#2d68c4] dark:text-[#60a5fa] font-bold">indresh@indore:~$</span>
                  <span className="text-[#0a0f18] dark:text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Current Input Line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 text-xs pt-2">
              <span className="text-[#2d68c4] dark:text-[#60a5fa] font-bold flex-shrink-0">
                indresh@indore:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help', 'projects', 'skills', 'certs', 'contact'..."
                className="w-full bg-transparent text-[#0a0f18] dark:text-white placeholder-[#0a0f18]/35 dark:placeholder-slate-500 focus:outline-none font-mono"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
