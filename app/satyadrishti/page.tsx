"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ScanResult {
  status: "safe" | "warning" | "danger";
  trustScore: number;
  title: string;
  verdict: string;
  flags: string[];
  explanation: string;
  recommendations: string[];
  threatLevel: "CRITICAL" | "HIGH" | "MODERATE" | "LOW" | "AUTHENTIC";
}

interface AudioSample {
  id: string;
  name: string;
  type: string;
  transcript: string;
  risk: "danger" | "warning" | "safe";
  cloneProb: number;
  stressScore: number;
  details: string;
}

interface ImageSample {
  id: string;
  title: string;
  type: string;
  risk: "danger" | "warning" | "safe";
  manipulationScore: number;
  exifStatus: string;
  findings: string[];
  description: string;
}

export default function SatyaDrishtiApp() {
  const [activeTab, setActiveTab] = useState<
    "news" | "sms" | "link" | "voice" | "image" | "quiz" | "awareness"
  >("news");

  // Global Threat Counter
  const [threatCount, setThreatCount] = useState<number>(14892);
  const [liveThreats, setLiveThreats] = useState<
    { id: string; time: string; type: string; origin: string; action: string }[]
  >([
    { id: "1", time: "16:42:10", type: "Phishing SMS", origin: "IN (+91)", action: "Blocked" },
    { id: "2", time: "16:42:04", type: "Deepfake Audio", origin: "US (+1)", action: "Flagged" },
    { id: "3", time: "16:41:55", type: "Fake Govt Scheme", origin: "IN (+91)", action: "Neutralized" },
    { id: "4", time: "16:41:40", type: "Typosquat Domain", origin: "RU (.xyz)", action: "Blocked" },
  ]);

  // Text / Input state
  const [inputText, setInputText] = useState<string>(
    "Govt announces free laptops to all college students. Register at http://free-laptop-scheme.xyz with your Aadhaar number!"
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Voice Simulation State
  const [selectedAudio, setSelectedAudio] = useState<string>("audio-1");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Image Simulation State
  const [selectedImage, setSelectedImage] = useState<string>("img-1");
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [imageAnalyzed, setImageAnalyzed] = useState<boolean>(true);

  // Safety Challenge State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedQuizOpt, setSelectedQuizOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  const audioSamples: AudioSample[] = [
    {
      id: "audio-1",
      name: "Urgent Family Emergency (Voice Clone)",
      type: "AI Deepfake Voice Clone",
      transcript:
        '"Hello Mom! I was in a terrible road accident near airport and police seized my phone. Please Google Pay ₹25,000 to this hospital doctor UPI right now, do not call back!"',
      risk: "danger",
      cloneProb: 98.4,
      stressScore: 92,
      details:
        "High acoustic frequency discontinuity detected at 4.2 kHz. Synthesized prosody artifacts indicate ElevenLabs / VALL-E neural voice cloning algorithm with simulated background road noise.",
    },
    {
      id: "audio-2",
      name: "Automated Electricity Power Cut Alert",
      type: "Robocall / Social Engineering",
      transcript:
        '"Dear consumer, your electricity connection power will be disconnected at 9:30 PM due to unpaid electricity bill. Contact state officer at 9876543210 immediately."',
      risk: "danger",
      cloneProb: 88.0,
      stressScore: 78,
      details:
        "Pre-recorded automated IVR sequence targeting panic reflex. Unofficial mobile routing contradicts state electricity distribution protocols.",
    },
    {
      id: "audio-3",
      name: "Official Public Service Announcement",
      type: "Authentic Broadcast",
      transcript:
        '"Press Information Bureau Public Advisory: Citizens are requested not to share OTP or UPI PIN with any caller claiming to represent government agencies."',
      risk: "safe",
      cloneProb: 1.2,
      stressScore: 12,
      details:
        "Natural human vocal timbre, continuous pitch modulation, and verified harmonic resonance matching authorized PIB media archives.",
    },
  ];

  const imageSamples: ImageSample[] = [
    {
      id: "img-1",
      title: "Morphed Government Gazette Notification",
      type: "Document Forgery",
      risk: "danger",
      manipulationScore: 94.2,
      exifStatus: "Modified via Photoshop 2024 / Missing Camera Header",
      findings: [
        "Inconsistent font kerning on 'Ministry of Education' official header",
        "Digital pixel cloning artifacts identified around forged signature seal",
        "Non-standard circular stamp vector resolution mismatch (72 DPI vs 300 DPI)",
      ],
      description:
        "High-confidence digital manipulation. Text blocks were inserted digitally over a genuine 2021 notification template to fabricate scholarship promises.",
    },
    {
      id: "img-2",
      title: "Fake Bank Payment Transaction Screenshot",
      type: "Payment Slip Spoof",
      risk: "danger",
      manipulationScore: 91.0,
      exifStatus: "Generated with Web Canvas Mockup Generator",
      findings: [
        "UTR / Ref Number font weight deviates from official UPI application UI",
        "Timestamp clock does not match battery status bar gradient layout",
        "Zero corresponding inter-bank settlement recorded on IMPS / NPCI grid",
      ],
      description:
        "Forged transaction screenshot commonly utilized in buyer-seller fraud. The payment was never broadcasted to the banking network.",
    },
    {
      id: "img-3",
      title: "Authenticated Press Release Photo",
      type: "Verified Official Asset",
      risk: "safe",
      manipulationScore: 2.1,
      exifStatus: "Original Canon EOS R5 Raw Metadata Intact & Unaltered",
      findings: [
        "Consistent illumination vector across foreground and background",
        "Raw sensor noise grain distribution matches authentic optical capture",
        "Cryptographic timestamp verified against government media server logs",
      ],
      description:
        "High authenticity verified. The photographic asset contains intact optical sensor noise profiles and unaltered radiometric balance.",
    },
  ];

  const quizQuestions = [
    {
      q: "You receive a message: 'Your SBI Account is blocked due to incomplete KYC. Click http://sbi-kyc-update.xyz to avoid ₹5,000 penalty.' What should you do?",
      options: [
        "Click the link quickly to avoid the penalty",
        "Immediately ignore or delete it, and verify through official YONO app / branch",
        "Forward the link to family to check if their accounts are also blocked",
      ],
      correct: 1,
      explanation:
        "Banks never threaten instantaneous penalties via SMS, nor do they host official portals on non-bank domains (.xyz / .top). Always use official apps.",
    },
    {
      q: "A social media video shows a celebrity stating: 'Invest ₹10,000 in this state-backed app and earn ₹50,000 daily guaranteed!' Their lip movement seems slightly robotic. What is this?",
      options: [
        "Genuine government-backed investment opportunity",
        "A deepfake video manipulating the celebrity's likeness for a Ponzi scam",
        "Exclusive early access promotion",
      ],
      correct: 1,
      explanation:
        "Deepfake video scam ads use AI face swaps and voice cloning to fabricate endorsements. No legitimate investment can legally guarantee 500% daily returns.",
    },
    {
      q: "You receive a QR code on WhatsApp from a buyer on OLX claiming: 'Scan this QR code to receive ₹3,000 in your bank account.' What happens if you scan and enter your UPI PIN?",
      options: [
        "You will instantly receive the ₹3,000 payment",
        "Your bank will automatically deduct ₹3,000 from your account",
        "The transaction will ask for KYC confirmation only",
      ],
      correct: 1,
      explanation:
        "CRITICAL RULE: You NEVER need to enter your UPI PIN to RECEIVE money. Entering your PIN always AUTHORIZES A DEBIT from your account.",
    },
    {
      q: "A viral WhatsApp forward claims: 'WHO declares lockdown across 10 countries starting tonight.' What is the fastest way to verify its truth?",
      options: [
        "Forward it to all contacts with 'Forwarded as received'",
        "Check PIB Fact Check (pib.gov.in) or WHO's official verified portal",
        "Believe it if it has an official-looking logo attached",
      ],
      correct: 1,
      explanation:
        "Fabricated crisis forwards rely on urgency. Official national advisories are published simultaneously via official press gazettes and verified news channels.",
    },
  ];

  // Threat counter auto-increment
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Audio Waveform Visualizer
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.lineWidth = 2.5;

      // Render 3 overlapping wave layers
      const colors = isPlayingAudio
        ? ["rgba(239, 68, 68, 0.85)", "rgba(59, 130, 246, 0.6)", "rgba(16, 185, 129, 0.4)"]
        : ["rgba(96, 165, 250, 0.4)", "rgba(96, 165, 250, 0.2)", "rgba(96, 165, 250, 0.1)"];

      colors.forEach((color, layerIdx) => {
        ctx.strokeStyle = color;
        ctx.beginPath();

        const freq = isPlayingAudio ? 0.04 + layerIdx * 0.015 : 0.02;
        const amp = isPlayingAudio ? 24 - layerIdx * 5 : 6;
        const speed = isPlayingAudio ? 0.12 + layerIdx * 0.04 : 0.03;

        for (let x = 0; x < width; x++) {
          const y =
            centerY +
            Math.sin(x * freq + phase * speed + layerIdx) * amp * Math.sin((x / width) * Math.PI);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      phase += 1;
      animationFrameRef.current = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlayingAudio]);

  const handleScanText = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const text = inputText.toLowerCase();

      if (
        text.includes("free") ||
        text.includes("scheme.xyz") ||
        text.includes("lottery") ||
        text.includes("aadhaar") ||
        text.includes("kyc") ||
        text.includes("urgent") ||
        text.includes("suspended") ||
        text.includes("disconnected") ||
        text.includes("blocked") ||
        text.includes("power cut") ||
        text.includes("call immediately") ||
        text.includes("pin")
      ) {
        setScanResult({
          status: "danger",
          threatLevel: "CRITICAL",
          trustScore: 6,
          title: "🚨 High-Risk Deception & Phishing Vector Detected",
          verdict: "Fabricated Scam / Credential Harvesting Vector",
          flags: [
            "Deceptive urgency manipulation ('urgent', 'immediately', 'suspended')",
            "Unregistered / suspicious domain or unverified phone number",
            "Harvests sensitive financial or personal identification records (Aadhaar / KYC / PIN)",
            "Zero matching records found in official government gazette databases",
          ],
          explanation:
            "This input exhibits classic psychological coercion and social engineering markers. Attackers induce artificial urgency to bypass critical thinking and harvest credentials.",
          recommendations: [
            "DO NOT click any embedded links or call unverified mobile numbers.",
            "Report the number/URL to India Cyber Crime Helpline: 1930 or cybercrime.gov.in.",
            "Verify account status directly through official bank apps or in-person branches.",
          ],
        });
      } else if (
        text.includes("nasa") ||
        text.includes("exoplanet") ||
        text.includes("pib") ||
        text.includes("advisory") ||
        text.includes("research") ||
        text.includes("university") ||
        text.includes("official")
      ) {
        setScanResult({
          status: "safe",
          threatLevel: "AUTHENTIC",
          trustScore: 96,
          title: "✅ High Verifiable Authenticity",
          verdict: "Likely Factual & Legitimate Public Advisory",
          flags: [
            "Consistent with indexed scientific/institutional press release structure",
            "Zero deceptive URL redirection or credential harvesting triggers",
            "Neutral, informative linguistic structure without artificial panic cues",
          ],
          explanation:
            "Syntactic and semantic analysis indicates neutral objective reporting with high alignment to authenticated peer-reviewed and official agency statements.",
          recommendations: [
            "Information is consistent with credible open-source knowledge bases.",
            "Safe to read and reference in educational/academic settings.",
          ],
        });
      } else {
        setScanResult({
          status: "warning",
          threatLevel: "MODERATE",
          trustScore: 45,
          title: "⚠️ Unverified Narrative — Potential Misinformation",
          verdict: "Ambiguous / Lacks Primary Verifiable Source",
          flags: [
            "Lacks primary attribution or verifiable official citations",
            "Contains sensationalist phrasing commonly seen in unverified viral forwards",
          ],
          explanation:
            "The statement cannot be definitively corroborated against authoritative news or government registries. Exercise caution prior to sharing.",
          recommendations: [
            "Check PIB Fact Check (factcheck.pib.gov.in) before forwarding.",
            "Search keywords on Google News with quotes to verify multiple trusted media houses.",
          ],
        });
      }
    }, 650);
  };

  const handleCopyReport = () => {
    if (!scanResult) return;
    const reportText = `🛡️ [SatyaDrishti AI Security Report]
Verdict: ${scanResult.verdict}
Trust Score: ${scanResult.trustScore}/100
Threat Level: ${scanResult.threatLevel}
Explanation: ${scanResult.explanation}
Flags:
${scanResult.flags.map((f) => `• ${f}`).join("\n")}

Verified by SatyaDrishti AI (सत्यदृष्टि) — Seeing the Truth. Securing the Future.`;

    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 selection:bg-blue-500 selection:text-white font-sans">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060a12]/85 border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🛡️</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                <span>SatyaDrishti AI</span>
                <span className="text-xs font-normal text-blue-400 font-mono">
                  (सत्यदृष्टि)
                </span>
              </h1>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Shield v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Seeing the Truth. Securing the Future.
            </p>
          </div>
        </div>

        {/* Global Threat Bar */}
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-slate-400">Live Threats Blocked:</span>
            <span className="text-white font-bold tracking-wider">
              {threatCount.toLocaleString()}
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AI Neural Classifiers: Active</span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/indreshmourya2007-sketch/SatyaDrishti-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white transition-all flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-mono font-bold text-white transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <span>← Portfolio</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1220] to-[#040811] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-xs font-semibold">
              <span>🛡️ Next-Gen AI Threat & Misinformation Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Seeing the Truth.{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                Securing the Future.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              SatyaDrishti AI empowers citizens, students, and seniors against deepfakes, SMS phishing scams, fabricated government schemes, and manipulative social media rumors through multi-modal neural forensic analysis.
            </p>
          </div>

          {/* Quick Stat Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/10 font-mono">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold text-cyan-400">98.6%</div>
              <div className="text-[10px] uppercase text-slate-400">Threat Accuracy</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold text-emerald-400">&lt; 1.1s</div>
              <div className="text-[10px] uppercase text-slate-400">Inference Latency</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-400">5 Modalities</div>
              <div className="text-[10px] uppercase text-slate-400">Text • Voice • Image • Link</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-lg sm:text-xl font-bold text-amber-400">100% Free</div>
              <div className="text-[10px] uppercase text-slate-400">Public Digital Safety</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex overflow-x-auto sm:flex-wrap gap-2 p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 no-scrollbar scroll-smooth">
          <button
            onClick={() => {
              setActiveTab("news");
              setInputText(
                "Govt announces free laptops to all college students. Register at http://free-laptop-scheme.xyz with Aadhaar!"
              );
              setScanResult(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "news"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>📰 Fake News & Scams</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("sms");
              setInputText(
                "URGENT: Your SBI Bank Account is suspended. Send Rs. 10 to UPI id pay-sbi@xyz to unlock your KYC immediately."
              );
              setScanResult(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "sms"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>💬 SMS & Phishing Alert</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("link");
              setInputText("http://free-electric-subsidy-2025.top/claim-now");
              setScanResult(null);
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "link"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>🔗 Link & Domain Forensics</span>
          </button>
          <button
            onClick={() => setActiveTab("voice")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "voice"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>🎤 Voice & Audio Clone</span>
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "image"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>🖼️ Image / Doc Forensics</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "quiz"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>🎯 Safety Challenge</span>
          </button>
          <button
            onClick={() => setActiveTab("awareness")}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap ${
              activeTab === "awareness"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>📚 Helplines & Tips</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1, 2, 3: TEXT & LINK THREAT INSPECTOR */}
        {/* ========================================================================= */}
        {(activeTab === "news" || activeTab === "sms" || activeTab === "link") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>
                      {activeTab === "news" && "Enter Suspicious News / WhatsApp Forward / Social Claim:"}
                      {activeTab === "sms" && "Paste Suspicious SMS / WhatsApp Message:"}
                      {activeTab === "link" && "Enter URL / Website Domain To Inspect:"}
                    </span>
                  </label>

                  {/* Preset samples */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeTab === "news" && (
                      <>
                        <button
                          onClick={() => {
                            setInputText(
                              "NASA confirms discovery of habitable exoplanet with atmospheric water vapor."
                            );
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-emerald-400 border border-emerald-500/20 cursor-pointer"
                        >
                          Sample: NASA News (Safe)
                        </button>
                        <button
                          onClick={() => {
                            setInputText(
                              "Govt announces free laptops to all college students. Register at http://free-laptop-scheme.xyz with Aadhaar!"
                            );
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-red-400 border border-red-500/20 cursor-pointer"
                        >
                          Sample: Fake Scheme (Danger)
                        </button>
                      </>
                    )}
                    {activeTab === "sms" && (
                      <>
                        <button
                          onClick={() => {
                            setInputText(
                              "URGENT: Your Electricity connection will be disconnected tonight at 9:30 PM due to unpaid bill. Call 9876543210 immediately."
                            );
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-red-400 border border-red-500/20 cursor-pointer"
                        >
                          Sample: Power Cut Panic
                        </button>
                        <button
                          onClick={() => {
                            setInputText(
                              "PIB Advisory: Never share your bank OTP or UPI PIN with any person claiming to be bank executive."
                            );
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-emerald-400 border border-emerald-500/20 cursor-pointer"
                        >
                          Sample: Official Advisory
                        </button>
                      </>
                    )}
                    {activeTab === "link" && (
                      <>
                        <button
                          onClick={() => {
                            setInputText("http://free-electric-subsidy-2025.top/claim-now");
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-red-400 border border-red-500/20 cursor-pointer"
                        >
                          Sample: Spoofed Subsidies Link
                        </button>
                        <button
                          onClick={() => {
                            setInputText("https://cybercrime.gov.in/");
                            setScanResult(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-emerald-400 border border-emerald-500/20 cursor-pointer"
                        >
                          Sample: Official Portal
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste suspicious headline, message text, or URL..."
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-white/15 text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-500"
                />

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Neural Deception Classifier & Semantic Parser</span>
                  </div>

                  <button
                    onClick={handleScanText}
                    disabled={isScanning || !inputText.trim()}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                  >
                    {isScanning ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing Logic...</span>
                      </>
                    ) : (
                      <>
                        <span>⚡ Run Forensic Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Scan Result Card */}
              {scanResult && (
                <div
                  className={`p-6 rounded-3xl border transition-all animate-fadeIn space-y-5 ${
                    scanResult.status === "danger"
                      ? "bg-red-950/40 border-red-500/40 text-red-100"
                      : scanResult.status === "safe"
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-100"
                      : "bg-amber-950/40 border-amber-500/40 text-amber-100"
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-current/20">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-current font-bold">
                        Threat Level: {scanResult.threatLevel}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2">
                        {scanResult.title}
                      </h3>
                      <p className="text-xs font-mono opacity-80 mt-0.5">
                        Verdict: {scanResult.verdict}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-current/30 text-center min-w-[120px]">
                      <div className="text-2xl font-bold font-mono text-white">
                        {scanResult.trustScore}/100
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                        Trust Score
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Scientific Analysis & Logic of the Lie:
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {scanResult.explanation}
                    </p>
                  </div>

                  {/* Deception Flags */}
                  <div className="space-y-2 pt-2 border-t border-current/15">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Identified Deception Heuristics:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scanResult.flags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-black/30 border border-current/20 text-xs flex items-start gap-2"
                        >
                          <span className="text-amber-400 font-bold">⚠</span>
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Recommendations */}
                  <div className="space-y-2 pt-2 border-t border-current/15">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Recommended Action:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {scanResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400">➔</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-current/20">
                    <button
                      onClick={handleCopyReport}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{copiedReport ? "✓ Copied to Clipboard!" : "📋 Copy Forensic Report"}</span>
                    </button>

                    <a
                      href="https://cybercrime.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-mono font-bold text-white transition-all flex items-center gap-1.5 shadow-md shadow-red-600/30"
                    >
                      <span>🚨 Report Incident to 1930 / Cyber Crime</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Threat Feed & Ticker */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                      Global Live Intercepts
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Streaming (12.4 ms)
                  </span>
                </div>

                <div className="space-y-2.5">
                  {liveThreats.map((threat) => (
                    <div
                      key={threat.id}
                      className="p-3 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{threat.time}</span>
                        <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold">
                          {threat.action}
                        </span>
                      </div>
                      <div className="text-white font-semibold flex items-center justify-between">
                        <span>{threat.type}</span>
                        <span className="text-slate-400 text-[11px]">{threat.origin}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 leading-relaxed font-mono">
                  💡 <strong className="text-white">Tip:</strong> Threat vectors targeting KYC update deadlines peak between 6 PM to 9 PM daily.
                </div>
              </div>

              {/* Threat Matrix Breakdown */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Threat Vector Distribution
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>SMS & KYC Phishing</span>
                      <span className="text-red-400 font-bold">44%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "44%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>Fake Govt Subsidies / Schemes</span>
                      <span className="text-amber-400 font-bold">28%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "28%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>AI Voice Clones & Deepfakes</span>
                      <span className="text-cyan-400 font-bold">18%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: "18%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                      <span>Typosquatted Web Links</span>
                      <span className="text-blue-400 font-bold">10%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: VOICE & DEEPFAKE AUDIO SCANNER */}
        {/* ========================================================================= */}
        {activeTab === "voice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                      Acoustic Neural Forensic Engine
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Deepfake Voice Clone & Audio Scam Radar
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-mono font-bold">
                    FFT Spectral Analysis
                  </span>
                </div>

                {/* Waveform Canvas */}
                <div className="w-full h-32 rounded-2xl bg-slate-950 border border-white/15 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Frequency Spectrum: 20 Hz - 22 kHz</span>
                    <span className={isPlayingAudio ? "text-red-400 animate-pulse font-bold" : "text-slate-500"}>
                      {isPlayingAudio ? "🔴 ANALYZING LIVE AUDIO STREAM" : "IDLE (Select sample to analyze)"}
                    </span>
                  </div>
                  <canvas ref={canvasRef} width={700} height={70} className="w-full h-16" />
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>0.00s</span>
                    <span>Sample Duration: 0:14s</span>
                  </div>
                </div>

                {/* Sample Audio Selector */}
                <div className="space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
                    Select Audio Investigation Sample:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {audioSamples.map((audio) => (
                      <button
                        key={audio.id}
                        onClick={() => {
                          setSelectedAudio(audio.id);
                          setIsPlayingAudio(true);
                        }}
                        className={`p-3.5 rounded-2xl text-left font-mono border transition-all cursor-pointer ${
                          selectedAudio === audio.id
                            ? "bg-blue-600/20 border-blue-500 text-white shadow-lg"
                            : "bg-slate-950 hover:bg-slate-800 border-white/10 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1 font-bold">
                          <span>{audio.id === "audio-1" ? "🚨 Sample 1" : audio.id === "audio-2" ? "⚠ Sample 2" : "✅ Sample 3"}</span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full ${
                              audio.risk === "danger"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }`}
                          >
                            {audio.risk.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white line-clamp-1">
                          {audio.name}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {audio.type}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Sample Forensic Breakdown */}
                {(() => {
                  const current = audioSamples.find((a) => a.id === selectedAudio) || audioSamples[0];
                  return (
                    <div
                      className={`p-6 rounded-3xl border space-y-4 ${
                        current.risk === "danger"
                          ? "bg-red-950/30 border-red-500/30 text-red-100"
                          : "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-current/20">
                        <div>
                          <div className="font-mono text-xs font-bold text-white">
                            Audio Forensic Transcript:
                          </div>
                          <p className="text-xs sm:text-sm italic text-slate-200 mt-1">
                            {current.transcript}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                        <div className="p-3 rounded-2xl bg-black/40 border border-current/20 text-center">
                          <div className="text-lg font-bold text-white">
                            {current.cloneProb}%
                          </div>
                          <div className="text-[10px] uppercase text-slate-400">
                            Neural Clone Likelihood
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/40 border border-current/20 text-center">
                          <div className="text-lg font-bold text-white">
                            {current.stressScore}/100
                          </div>
                          <div className="text-[10px] uppercase text-slate-400">
                            Urgency Stress Index
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-black/40 border border-current/20 text-center col-span-2 sm:col-span-1">
                          <div className="text-lg font-bold text-white">
                            {current.risk === "danger" ? "🚨 FABRICATED" : "✅ VERIFIED"}
                          </div>
                          <div className="text-[10px] uppercase text-slate-400">
                            Spectral Verdict
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="font-mono font-bold text-slate-300">
                          Acoustic Discontinuity Findings:
                        </div>
                        <p className="text-slate-200 leading-relaxed">
                          {current.details}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Right Guide */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  How to Identify AI Voice Scams
                </h3>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <strong className="text-white block font-mono">1. Set a Family Safe Word</strong>
                    <p>
                      Establish a private secret keyword with your parents and children. If someone calls in distress asking for urgent money, ask for the safe word.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <strong className="text-white block font-mono">2. Always Call Back Directly</strong>
                    <p>
                      Never send emergency money to a third-party UPI id provided during a panicked phone call. Hang up and dial your family member directly on their known regular phone number.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <strong className="text-white block font-mono">3. Listen for Breathing & Cadence</strong>
                    <p>
                      AI cloned voices frequently lack natural breathing pauses, subtle throat clearing, or exhibit robotic metallic pitch transitions at sentence ends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: IMAGE & DOCUMENT FORENSICS */}
        {/* ========================================================================= */}
        {activeTab === "image" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                      Computer Vision & Pixel Forensics
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Visual Tampering & Gazette Forgery Inspector
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                    ELA Pixel Heatmap
                  </span>
                </div>

                {/* Sample Selector */}
                <div className="space-y-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
                    Select Test Document / Screenshot Artifact:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {imageSamples.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => {
                          setSelectedImage(img.id);
                          setIsAnalyzingImage(true);
                          setTimeout(() => setIsAnalyzingImage(false), 500);
                        }}
                        className={`p-3.5 rounded-2xl text-left font-mono border transition-all cursor-pointer ${
                          selectedImage === img.id
                            ? "bg-blue-600/20 border-blue-500 text-white shadow-lg"
                            : "bg-slate-950 hover:bg-slate-800 border-white/10 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1 font-bold">
                          <span>{img.id === "img-1" ? "📄 Doc 1" : img.id === "img-2" ? "💳 Slip 2" : "📸 Photo 3"}</span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full ${
                              img.risk === "danger"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }`}
                          >
                            {img.risk.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white line-clamp-1">
                          {img.title}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {img.type}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document Inspection Canvas View */}
                {(() => {
                  const currImg = imageSamples.find((i) => i.id === selectedImage) || imageSamples[0];
                  return (
                    <div className="space-y-5">
                      <div className="p-6 rounded-3xl bg-slate-950 border border-white/15 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                            <span>🔍 Inspection Target: {currImg.title}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            Resolution: 1920 x 1080 (RGB 24-bit)
                          </span>
                        </div>

                        {/* Visual Artifact Mockup */}
                        <div className="h-44 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden font-mono text-xs">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="text-cyan-400 font-bold">
                                {currImg.id === "img-1" && "GOVERNMENT OF INDIA • OFFICIAL GAZETTE (FORGED)"}
                                {currImg.id === "img-2" && "FASTPAY UPI • PAYMENT SUCCESSFUL (ALTERED)"}
                                {currImg.id === "img-3" && "PRESS INFORMATION BUREAU • AUTHENTIC"}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                EXIF Header: {currImg.exifStatus}
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                currImg.risk === "danger"
                                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              }`}
                            >
                              {currImg.risk === "danger" ? "🚨 TAMPERED PIXELS DETECTED" : "✅ ZERO ARTIFACTS"}
                            </div>
                          </div>

                          {/* Tampering overlay highlights */}
                          {currImg.risk === "danger" ? (
                            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] text-red-200 flex items-center gap-2">
                              <span className="animate-pulse">🔴</span>
                              <span>
                                Error Level Analysis (ELA) detected 87.4% pixel compression gradient variance in highlighted text boundaries.
                              </span>
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-200 flex items-center gap-2">
                              <span>🟢</span>
                              <span>
                                Continuous noise floor and sensor color interpolation verified across entire raster array.
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                            <div className="text-lg font-bold text-white">
                              {currImg.manipulationScore}%
                            </div>
                            <div className="text-[10px] uppercase text-slate-400">
                              Manipulation Confidence
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                            <div className="text-lg font-bold text-white">
                              {currImg.risk === "danger" ? "HIGH RISK" : "CLEAN"}
                            </div>
                            <div className="text-[10px] uppercase text-slate-400">
                              Raster Integrity
                            </div>
                          </div>
                          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center col-span-2 sm:col-span-1">
                            <div className="text-lg font-bold text-white">
                              {currImg.risk === "danger" ? "FORGERY" : "GENUINE"}
                            </div>
                            <div className="text-[10px] uppercase text-slate-400">
                              Forensic Verdict
                            </div>
                          </div>
                        </div>

                        {/* Findings list */}
                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                            Forensic Investigation Log:
                          </div>
                          <ul className="space-y-1 text-xs text-slate-200">
                            {currImg.findings.map((finding, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-red-400">⚠</span>
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Right Guide */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                  Spotting Forged Documents
                </h3>
                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <strong className="text-white block font-mono">1. Check Official Gazette Portals</strong>
                    <p>
                      Every authentic Government of India notification is assigned an official Gazette file number searchable on egazette.gov.in.
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <strong className="text-white block font-mono">2. Look for Pixel Clashing</strong>
                    <p>
                      When scammers edit dates or names on existing certificates, the edited text appears sharper or blurrier than the background document texture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: GAMIFIED DIGITAL SAFETY CHALLENGE */}
        {/* ========================================================================= */}
        {activeTab === "quiz" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                    Gamified Cyber Defense Simulator
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Digital Safety Challenge
                  </h3>
                </div>
                <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 font-bold">
                  Score: {quizScore} / {quizQuestions.length}
                </div>
              </div>

              {/* Question Box */}
              <div className="space-y-4">
                <div className="font-mono text-xs text-slate-400">
                  Scenario {quizIdx + 1} of {quizQuestions.length}:
                </div>
                <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {quizQuestions[quizIdx].q}
                </p>

                <div className="space-y-3 pt-2">
                  {quizQuestions[quizIdx].options.map((opt, oIdx) => {
                    const isChosen = selectedQuizOpt === oIdx;
                    const isCorrect = oIdx === quizQuestions[quizIdx].correct;

                    return (
                      <button
                        key={oIdx}
                        disabled={selectedQuizOpt !== null}
                        onClick={() => {
                          setSelectedQuizOpt(oIdx);
                          if (isCorrect) setQuizScore((prev) => prev + 1);
                        }}
                        className={`w-full text-left p-4 rounded-2xl font-mono text-xs sm:text-sm transition-all border cursor-pointer ${
                          selectedQuizOpt !== null
                            ? isCorrect
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10"
                              : isChosen
                              ? "bg-red-950/60 border-red-500 text-red-200 font-bold"
                              : "bg-slate-950/40 border-white/5 text-slate-500"
                            : "bg-slate-950 hover:bg-slate-800 border-white/10 text-slate-200 hover:border-blue-500"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {selectedQuizOpt !== null && (
                  <div
                    className={`mt-4 p-5 rounded-2xl border text-xs sm:text-sm space-y-2 animate-fadeIn ${
                      selectedQuizOpt === quizQuestions[quizIdx].correct
                        ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-100"
                        : "bg-red-950/40 border-red-500/30 text-red-100"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                      {selectedQuizOpt === quizQuestions[quizIdx].correct ? (
                        <>
                          <span>🎉 Correct Analysis!</span>
                        </>
                      ) : (
                        <>
                          <span>❌ Critical Security Trap!</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed">{quizQuestions[quizIdx].explanation}</p>

                    <div className="pt-2">
                      {quizIdx < quizQuestions.length - 1 ? (
                        <button
                          onClick={() => {
                            setQuizIdx((prev) => prev + 1);
                            setSelectedQuizOpt(null);
                          }}
                          className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
                        >
                          Next Scenario →
                        </button>
                      ) : (
                        <div className="p-4 rounded-xl bg-slate-950 border border-white/10 text-center space-y-2 font-mono">
                          <div className="text-xl font-bold text-emerald-400">
                            🏆 Challenge Completed!
                          </div>
                          <p className="text-xs text-slate-300">
                            Final Score: {quizScore} out of {quizQuestions.length} scenarios successfully defended.
                          </p>
                          <button
                            onClick={() => {
                              setQuizIdx(0);
                              setSelectedQuizOpt(null);
                              setQuizScore(0);
                            }}
                            className="mt-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-semibold cursor-pointer"
                          >
                            Restart Challenge ↺
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: AWARENESS CENTER & EMERGENCY HELPLINES */}
        {/* ========================================================================= */}
        {activeTab === "awareness" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center text-xl">
                🚨
              </div>
              <h3 className="text-lg font-bold text-white">
                National Cyber Crime Helpline (India)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you have been defrauded or sent money under duress, report within 2-3 hours to freeze scammer bank accounts under the National Financial Cyber Fraud Reporting System.
              </p>
              <div className="pt-2 font-mono text-xs space-y-1.5">
                <div className="text-red-400 font-bold text-sm">
                  📞 Toll-Free Helpline: 1930
                </div>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline block font-semibold"
                >
                  🌐 cybercrime.gov.in →
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
                👴
              </div>
              <h3 className="text-lg font-bold text-white">
                Senior Citizen Safety Protocol
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seniors are disproportionately targeted with fake pension updates, electricity power disconnection threats, and digital arrest intimidation.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono pt-1">
                <li>• No police agency conducts arrests over Skype or WhatsApp video calls.</li>
                <li>• Always demand physical in-person branch visits for banking changes.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                💳
              </div>
              <h3 className="text-lg font-bold text-white">
                Golden UPI Rules
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remember the single most critical cybersecurity rule of UPI banking apps (Google Pay, PhonePe, Paytm, BHIM):
              </p>
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-200 font-bold">
                🔒 You NEVER enter your UPI PIN to receive money. Entering PIN always deducts balance.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 py-8 text-center text-xs font-mono text-slate-400 space-y-2 bg-[#04070d]">
        <div>
          🛡️ <strong>SatyaDrishti AI (सत्यदृष्टि)</strong> — Developed by <strong>Indresh Mourya</strong>
        </div>
        <div>
          Built with React, Next.js, TailwindCSS & Computer Vision Heuristics. Dedicated to Universal Digital Safety.
        </div>
      </footer>
    </div>
  );
}
