"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#edf5ff] dark:bg-[#070b12] text-[#0a0f18] dark:text-[#f1f5f9] py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#0a0f18] selection:text-[#edf5ff] dark:selection:bg-[#f1f5f9] dark:selection:text-[#070b12]">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-[#173255]/10 dark:border-white/10 shadow-sm print:hidden">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-[#0a0f18] dark:text-white hover:text-[#2d68c4] dark:hover:text-[#60a5fa] transition-colors flex items-center gap-1.5 font-semibold"
        >
          <span>←</span>
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="hidden sm:inline-flex pill-button font-mono text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full cursor-pointer"
          >
            <span>Print View</span>
          </button>

          <a
            href="/Indresh_Mourya_Resume.pdf"
            download="Indresh_Mourya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-primary font-mono text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-transform"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main ATS Resume Document Container */}
      <main className="max-w-4xl mx-auto bg-white text-[#111827] p-6 sm:p-12 rounded-3xl shadow-xl border border-gray-200/80 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-full">
        {/* 1-PAGE GOLD-STANDARD ATS EXECUTIVE RESUME */}
        <article className="space-y-5">
          {/* Header */}
          <header className="border-b-2 border-black pb-4 text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-black leading-none">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <p className="text-sm font-bold text-gray-800 tracking-wide">
              {PORTFOLIO_DATA.profile.role} • {PORTFOLIO_DATA.profile.location}
            </p>
            <p className="text-xs text-gray-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 font-medium">
              <span>
                Email:{" "}
                <a
                  href="mailto:indreshmourya2007@gmail.com"
                  className="underline font-bold text-black"
                >
                  indreshmourya2007@gmail.com
                </a>
              </span>
              <span>•</span>
              <span>
                Phone:{" "}
                <a
                  href="tel:+917566221905"
                  className="underline font-bold text-black"
                >
                  +91 75662 21905
                </a>
              </span>
              <span>•</span>
              <span>
                GitHub:{" "}
                <a
                  href="https://github.com/indreshmourya2007-sketch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-black"
                >
                  github.com/indreshmourya2007-sketch
                </a>
              </span>
              <span>•</span>
              <span>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/indreshmourya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-black"
                >
                  linkedin.com/in/indreshmourya
                </a>
              </span>
            </p>
          </header>

          {/* 01 / Education */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              Education
            </h2>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-sm">
                <div>
                  <strong className="text-black font-bold">
                    Prestige Institute of Engineering Management & Research (PIEMR)
                  </strong>{" "}
                  — <span className="text-gray-800 font-medium">Indore, M.P., India</span>
                </div>
                <span className="font-mono text-xs font-bold text-black">
                  2024 — 2028
                </span>
              </div>
              <div className="text-xs text-gray-800 italic">
                Bachelor of Technology (B.Tech) in Computer Science & Engineering (2nd Year)
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Relevant Coursework:</strong> Data Structures & Algorithms,
                Object-Oriented Programming (OOP in C++), Cloud Computing & Architecture,
                Operating Systems, Database Management Systems (DBMS), Computer Networks.
              </p>
            </div>
          </section>

          {/* 02 / Technical Skills Matrix */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              Technical Competencies & Skills
            </h2>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <div>
                <strong className="text-black font-bold">Programming Languages:</strong>{" "}
                Python, C++, TypeScript, JavaScript, SQL, HTML5, CSS3
              </div>
              <div>
                <strong className="text-black font-bold">Frameworks & Libraries:</strong>{" "}
                Next.js 15, React 19, Node.js, Express.js, FastAPI, Tailwind CSS, RESTful APIs,
                WebSockets
              </div>
              <div>
                <strong className="text-black font-bold">Cloud, Systems & Tools:</strong>{" "}
                Google Cloud Platform (GCP - 5x Certified), AWS Cloud, Git, GitHub, Docker,
                Linux/Bash, Vercel
              </div>
              <div>
                <strong className="text-black font-bold">Core Competencies:</strong>{" "}
                Fullstack Web Engineering, Autonomous AI Multi-Agent Systems, OOP
                Architecture, Cloud-Native Logic
              </div>
            </div>
          </section>

          {/* 03 / Distinctions & Global Accreditations */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              Distinctions & Global Accreditations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded border border-gray-300 bg-gray-50/60 space-y-1">
                <div className="font-bold text-black flex items-center justify-between">
                  <span>Top 10% Replit Agent Developer</span>
                  <span className="text-[10px] font-mono text-gray-700 font-bold uppercase">
                    GLOBAL RANK
                  </span>
                </div>
                <p className="text-gray-700 leading-snug">
                  Ranked in top decile on Replit (@indreshmourya20) for agentic AI architectures & tool orchestration.
                </p>
              </div>

              <div className="p-2.5 rounded border border-gray-300 bg-gray-50/60 space-y-1">
                <div className="font-bold text-black flex items-center justify-between">
                  <span>5x Google Cloud Certified</span>
                  <span className="text-[10px] font-mono text-gray-700 font-bold uppercase">
                    GENAI ACADEMY
                  </span>
                </div>
                <p className="text-gray-700 leading-snug">
                  5x verified tracks (AI/ML, Data Analytics, Data Engineering, Software Eng, Network Eng) via Hack2skill.
                </p>
              </div>

              <div className="p-2.5 rounded border border-gray-300 bg-gray-50/60 space-y-1">
                <div className="font-bold text-black flex items-center justify-between">
                  <span>33+ Google Cloud Skill Badges</span>
                  <span className="text-[10px] font-mono text-gray-700 font-bold uppercase">
                    CREDLY VERIFIED
                  </span>
                </div>
                <p className="text-gray-700 leading-snug">
                  33+ official Google Cloud Badges accredited on Credly (credly.com/users/indresh-mourya).
                </p>
              </div>

              <div className="p-2.5 rounded border border-gray-300 bg-gray-50/60 space-y-1">
                <div className="font-bold text-black flex items-center justify-between">
                  <span>NASA Open Science 101 & Essentials</span>
                  <span className="text-[10px] font-mono text-gray-700 font-bold uppercase">
                    NASA CERTIFIED
                  </span>
                </div>
                <p className="text-gray-700 leading-snug">
                  NASA Open Science 101 & Open Science Essentials accredited on Credly (credly.com/users/indresh-mourya).
                </p>
              </div>
            </div>
          </section>

          {/* 04 / Experience & Leadership */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              Experience & Community Leadership
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">Campus Ambassador</strong>
                  <span className="font-mono text-xs text-gray-700 font-bold">
                    Jun 2026 — Present | Mumbai / Indore
                  </span>
                </div>
                <div className="text-gray-800 italic">
                  Entrepreneurship Cell, IIT Bombay (Official Offer Letter Appointment)
                </div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Formally appointed by E-Cell IIT Bombay (Signed by Overall Coordinators) to lead developer initiatives, hackathons, and technical entrepreneurship across university ecosystems.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">
                    AWS Student Builder Campus Leader
                  </strong>
                  <span className="font-mono text-xs text-gray-700 font-bold">
                    Jun 2026 — Present | Indore, India
                  </span>
                </div>
                <div className="text-gray-800 italic">Amazon Web Services (AWS)</div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Selected to drive AWS cloud learning initiatives, conduct technical bootcamps, and mentor 100+ peers across cloud computing, serverless architectures, and deployment pipelines.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">Lead Media Coordinator</strong>
                  <span className="font-mono text-xs text-gray-700 font-bold">
                    Jun 2026 | Indore, India
                  </span>
                </div>
                <div className="text-gray-800 italic">
                  PIEMR Media Club & Tech Fest URJOTSAV 2K26
                </div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Led brand engineering, technical media operations, live digital broadcasting, and production infrastructure for institute-wide flagship technical symposiums.
                </p>
              </div>
            </div>
          </section>

          {/* 05 / Flagship Engineering Projects */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
              Featured Engineering Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">
                    Dr. Decode AI — Clinical Report Analyzer
                  </strong>
                  <span className="font-mono text-[11px] text-gray-700 font-semibold">
                    JavaScript, Groq LLaMA 3, Three.js, Tesseract OCR, Chart.js
                  </span>
                </div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Engineered intelligent clinical laboratory analyzer with Tesseract OCR, Groq LLaMA 3 70B reasoning, 3D molecular Bio-Core visualizer in Three.js, and multi-language translation across 7 languages.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">
                    SatyaDrishti AI (सत्यदृष्टि) — Digital Safety Platform
                  </strong>
                  <span className="font-mono text-[11px] text-gray-700 font-semibold">
                    React, Node.js, Express, TailwindCSS, REST APIs
                  </span>
                </div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Built an AI-powered scam and fake news detection platform featuring multi-modal threat search (text, voice, photo, files), real-time threat monitoring dashboard, and gamified safety challenges.
                </p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <strong className="text-black font-bold text-sm">
                    Lost & Found Management System
                  </strong>
                  <span className="font-mono text-[11px] text-gray-700 font-semibold">
                    C++, OOP Architecture, Data Structures, File Streams
                  </span>
                </div>
                <p className="text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-1">
                  Built an institutional item tracking platform in C++ featuring polymorphic search filters, custom AVL tree indexing, zero-memory-leak memory management, and binary persistence journals.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
