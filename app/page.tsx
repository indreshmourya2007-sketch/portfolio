"use client";

import React, { useState, useEffect } from "react";
import Preloader from "@/components/preloader";
import GlassHero from "@/components/glass-hero";
import Navigation from "@/components/navigation";
import AboutSection from "@/components/about-section";
import HonorsSection from "@/components/honors-section";
import Timeline from "@/components/timeline";
import WorkSection from "@/components/work-section";
import ProcessSection from "@/components/process-section";
import TerminalSection from "@/components/terminal-section";
import ExperimentsSection from "@/components/experiments-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ProjectModal from "@/components/project-modal";
import HonorModal from "@/components/honor-modal";
import CommandMenu from "@/components/command-menu";
import PrintResume from "@/components/print-resume";
import { Project, GlobalHonor } from "@/lib/data";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedHonor, setSelectedHonor] = useState<GlobalHonor | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    }

    const handleToggleCommand = () => {
      setIsCommandOpen((prev) => !prev);
    };

    window.addEventListener("toggle-command-menu", handleToggleCommand);
    return () => window.removeEventListener("toggle-command-menu", handleToggleCommand);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#edf5ff] dark:bg-[#070b12] text-[#0a0f18] dark:text-[#f1f5f9] transition-colors duration-300 relative selection:bg-[#0a0f18] selection:text-[#edf5ff] dark:selection:bg-[#f1f5f9] dark:selection:text-[#070b12]">
      {/* Cinematic Editorial Preloader Entrance */}
      <Preloader />

      {/* Floating Sticky Frosted Navigation Bar */}
      <Navigation onOpenCommand={() => setIsCommandOpen(true)} />

      {/* 00 / Editorial Liquid-Glass Hero */}
      <GlassHero />

      {/* 01 / Architectural Manifesto & Technical Domain Stack */}
      <AboutSection />

      {/* 02 / Global Distinctions & Tier-1 Accreditations (Replit Top 10%, 5x Google Cloud, NASA, AWS) */}
      <HonorsSection onSelectHonor={(honor) => setSelectedHonor(honor)} />

      {/* 03 / Career Milestones & Engineering Trajectory */}
      <Timeline />

      {/* 04 / Selected Works & Flagship NexusFlow Engine Showcase */}
      <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

      {/* 05 / Engineering Methodology & Code Blueprints */}
      <ProcessSection />

      {/* 06 / Interactive Developer Terminal & Shell REPL */}
      <TerminalSection />

      {/* 07 / Real-time Physics & Interactive Lab (Dual Canvas Sim) */}
      <ExperimentsSection />

      {/* 08 / Direct Terminal Dispatch & Live IST Clock */}
      <ContactSection />

      {/* 09 / Editorial Mega Footer */}
      <Footer />

      {/* Deep-Dive Global Honor Accreditation Modal (Root Level z-[100]) */}
      <HonorModal
        honor={selectedHonor}
        onClose={() => setSelectedHonor(null)}
      />

      {/* Deep-Dive Project Architecture Modal (Root Level z-[100]) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Global ⌘K Command Palette (Root Level z-[100]) */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Native ATS-Optimized Print Resume */}
      <PrintResume />
    </main>
  );
}
