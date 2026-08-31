"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function PrintResume() {
  return (
    <div
      id="print-resume"
      aria-hidden="true"
      className="hidden print:block w-full bg-white text-[#111827] p-0 m-0 font-sans text-[9.5pt] leading-[1.35]"
    >
      {/* 1-PAGE GOLD-STANDARD ATS EXECUTIVE RESUME */}
      <article className="max-w-[8.2in] mx-auto space-y-3">
        {/* Header */}
        <header className="border-b-2 border-black pb-2 text-center space-y-1">
          <h1 className="text-[22pt] font-black tracking-tight uppercase text-black leading-none">
            {PORTFOLIO_DATA.profile.name}
          </h1>
          <p className="text-[10pt] font-bold text-gray-800 tracking-wide">
            {PORTFOLIO_DATA.profile.role} • {PORTFOLIO_DATA.profile.location}
          </p>
          <p className="text-[8.5pt] text-gray-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 font-medium">
            <span>Email: <a href="mailto:indreshmourya2007@gmail.com" className="underline font-bold text-black">indreshmourya2007@gmail.com</a></span>
            <span>•</span>
            <span>Phone: <a href="tel:+917566221905" className="underline font-bold text-black">+91 75662 21905</a></span>
            <span>•</span>
            <span>GitHub: <a href="https://github.com/indreshmourya2007-sketch" className="underline font-bold text-black">github.com/indreshmourya2007-sketch</a></span>
            <span>•</span>
            <span>LinkedIn: <a href="https://www.linkedin.com/in/indreshmourya" className="underline font-bold text-black">linkedin.com/in/indreshmourya</a></span>
          </p>
        </header>

        {/* 01 / Education */}
        <section className="space-y-1">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
            Education
          </h2>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline text-[9.5pt]">
              <div>
                <strong className="text-black font-bold">Prestige Institute of Engineering Management & Research (PIEMR)</strong> — <span className="text-gray-800 font-medium">Indore, M.P., India</span>
              </div>
              <span className="font-mono text-[8.5pt] font-bold text-black">2024 — 2028</span>
            </div>
            <div className="flex justify-between items-baseline text-[8.8pt] text-gray-800 italic">
              <span>Bachelor of Technology (B.Tech) in Computer Science & Engineering (2nd Year)</span>
            </div>
            <p className="text-[8.5pt] text-gray-700 leading-snug">
              <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Object-Oriented Programming (OOP in C++), Cloud Computing & Architecture, Operating Systems, Database Management Systems (DBMS), Computer Networks.
            </p>
          </div>
        </section>

        {/* 02 / Technical Skills Matrix */}
        <section className="space-y-1">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
            Technical Competencies & Skills
          </h2>
          <div className="grid grid-cols-1 gap-1 text-[8.8pt]">
            <div>
              <strong className="text-black font-bold">Programming Languages:</strong> Python, C++, TypeScript, JavaScript, SQL, HTML5, CSS3
            </div>
            <div>
              <strong className="text-black font-bold">Frameworks & Libraries:</strong> Next.js 15, React 19, Node.js, Express.js, FastAPI, Tailwind CSS, RESTful APIs, WebSockets
            </div>
            <div>
              <strong className="text-black font-bold">Cloud, Systems & Tools:</strong> Google Cloud Platform (GCP - 5x Certified), AWS Cloud, Git, GitHub, Docker, Linux/Bash, Vercel
            </div>
            <div>
              <strong className="text-black font-bold">Core Competencies:</strong> Fullstack Web Engineering, Autonomous AI Multi-Agent Systems, OOP Architecture, Cloud-Native Logic
            </div>
          </div>
        </section>

        {/* 03 / Distinctions & Global Accreditations */}
        <section className="space-y-1">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
            Distinctions & Global Accreditations
          </h2>
          <div className="grid grid-cols-2 gap-2 text-[8.5pt]">
            <div className="p-2 rounded border border-gray-300 bg-gray-50/60 space-y-0.5">
              <div className="font-bold text-black flex items-center justify-between text-[8.8pt]">
                <span>Top 10% Replit Agent Developer</span>
                <span className="text-[7.5pt] font-mono text-gray-700 font-bold uppercase">GLOBAL RANK</span>
              </div>
              <p className="text-[8.2pt] text-gray-700 leading-snug">
                Ranked in top decile on Replit (@indreshmourya20) for agentic AI architectures & tool orchestration.
              </p>
            </div>

            <div className="p-2 rounded border border-gray-300 bg-gray-50/60 space-y-0.5">
              <div className="font-bold text-black flex items-center justify-between text-[8.8pt]">
                <span>5x Google Cloud Certified</span>
                <span className="text-[7.5pt] font-mono text-gray-700 font-bold uppercase">GENAI ACADEMY</span>
              </div>
              <p className="text-[8.2pt] text-gray-700 leading-snug">
                5x verified tracks (AI/ML, Data Analytics, Data Engineering, Software Eng, Network Eng) via Hack2skill.
              </p>
            </div>

            <div className="p-2 rounded border border-gray-300 bg-gray-50/60 space-y-0.5">
              <div className="font-bold text-black flex items-center justify-between text-[8.8pt]">
                <span>33+ Google Cloud Skill Badges</span>
                <span className="text-[7.5pt] font-mono text-gray-700 font-bold uppercase">CREDLY VERIFIED</span>
              </div>
              <p className="text-[8.2pt] text-gray-700 leading-snug">
                33+ official Google Cloud Badges accredited on Credly (credly.com/users/indresh-mourya).
              </p>
            </div>

            <div className="p-2 rounded border border-gray-300 bg-gray-50/60 space-y-0.5">
              <div className="font-bold text-black flex items-center justify-between text-[8.8pt]">
                <span>NASA Open Science 101 & Essentials</span>
                <span className="text-[7.5pt] font-mono text-gray-700 font-bold uppercase">NASA CERTIFIED</span>
              </div>
              <p className="text-[8.2pt] text-gray-700 leading-snug">
                NASA Open Science 101 & Open Science Essentials accredited on Credly (credly.com/users/indresh-mourya).
              </p>
            </div>
          </div>
        </section>

        {/* 04 / Experience & Leadership */}
        <section className="space-y-1.5">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
            Experience & Community Leadership
          </h2>
          <div className="space-y-2 text-[8.8pt]">
            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">Campus Ambassador</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-bold">Jun 2026 — Present | Mumbai / Indore</span>
              </div>
              <div className="text-[8.5pt] text-gray-800 italic">Entrepreneurship Cell, IIT Bombay (Official Offer Letter Appointment)</div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Formally appointed by E-Cell IIT Bombay (Signed by Overall Coordinators) to lead developer initiatives, hackathons, and technical entrepreneurship across university ecosystems.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">AWS Student Builder Campus Leader</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-bold">Jun 2026 — Present | Indore, India</span>
              </div>
              <div className="text-[8.5pt] text-gray-800 italic">Amazon Web Services (AWS)</div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Selected to drive AWS cloud learning initiatives, conduct technical bootcamps, and mentor 100+ peers across cloud computing, serverless architectures, and deployment pipelines.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">Lead Media Coordinator</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-bold">Jun 2026 | Indore, India</span>
              </div>
              <div className="text-[8.5pt] text-gray-800 italic">PIEMR Media Club & Tech Fest URJOTSAV 2K26</div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Led brand engineering, technical media operations, live digital broadcasting, and production infrastructure for institute-wide flagship technical symposiums.
              </p>
            </div>
          </div>
        </section>

        {/* 05 / Flagship Engineering Projects */}
        <section className="space-y-1.5">
          <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b-2 border-black pb-0.5 text-black">
            Featured Engineering Projects
          </h2>
          <div className="space-y-2 text-[8.8pt]">
            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">Dr. Decode AI — Clinical Report Analyzer</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-semibold">JavaScript, Groq LLaMA 3, Three.js, Tesseract OCR, Chart.js</span>
              </div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Engineered intelligent clinical laboratory analyzer with Tesseract OCR, Groq LLaMA 3 70B reasoning, 3D molecular Bio-Core visualizer in Three.js, and multi-language translation across 7 languages.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">SatyaDrishti AI (सत्यदृष्टि) — Digital Safety Platform</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-semibold">React, Node.js, Express, TailwindCSS, Framer Motion, REST APIs</span>
              </div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Built an AI-powered scam and fake news detection platform featuring multi-modal threat search (text, voice, photo, files), real-time threat monitoring dashboard, and gamified safety challenges.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <strong className="text-black font-bold text-[9pt]">Lost & Found Management System</strong>
                <span className="font-mono text-[8pt] text-gray-700 font-semibold">C++, OOP Architecture, Data Structures, File Streams</span>
              </div>
              <p className="text-[8.5pt] text-gray-700 leading-snug pl-2.5 border-l-2 border-gray-400 mt-0.5">
                Built an institutional item tracking platform in C++ featuring polymorphic search filters, custom AVL tree indexing, zero-memory-leak memory management, and binary persistence journals.
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
