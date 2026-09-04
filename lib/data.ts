export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AI & Web Systems" | "Cloud & IoT" | "Systems & C++" | "Creative Engineering";
  year: string;
  featured: boolean;
  badge?: string;
  summary: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
  links: {
    live?: string;
    github?: string;
  };
  metrics: { label: string; value: string }[];
  architectureNotes: string[];
  techStack: string[];
  highlights: string[];
  status: "Live Production" | "In Development" | "Prototype" | "Deploying Soon" | "Production Ready";
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    proficiency: number; // 0 - 100
    tags: string[];
  }[];
}

export interface HonorCredential {
  name: string;
  id: string;
  url: string;
  issuer?: string;
}

export interface GlobalHonor {
  id: string;
  title: string;
  issuer: string;
  organization: string;
  scope: string;
  badge: string;
  highlightStat: string;
  description: string;
  deliverables: string[];
  verificationId: string;
  verifyUrl: string;
  accentColor: string;
  credentials?: HonorCredential[];
  proofImage?: string;
  proofTitle?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  badgeUrl?: string;
  skills: string[];
  verifyUrl?: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  badge?: string;
}

export interface EducationItem {
  period: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  badge?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  badge?: string;
  credentialUrl?: string;
}

export interface Experiment {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  tags: string[];
  status: "Live" | "Prototype" | "Research";
  link?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  codeSnippet: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Indresh Mourya",
    shortName: "Indresh",
    role: "Software Developer & Student",
    tagline: "Building Beyond Possible.",
    subtagline: "Building the next version in public.",
    location: "Indore, M.P., India",
    coordinates: "LAT: 22.7196° N / LON: 75.8577° E",
    institution: "Prestige Institute of Engineering Management & Research (PIEMR)",
    degree: "B.Tech in Computer Science & Engineering (2024 — 2028)",
    email: "indreshmourya2007@gmail.com",
    availability: "Available for software engineering roles, internships & collaborative projects",
    bio: "2nd-year B.Tech CSE student at PIEMR, Indore, M.P., India. Software developer engineering robust fullstack applications, AI chatbot engines, and intelligent web systems.",
    stats: [
      { value: "Top 10%", label: "Global Replit Agent Dev" },
      { value: "5x", label: "Google Cloud Certified" },
      { value: "33+", label: "Credly Badges & NASA" },
      { value: "12+", label: "Engineered Projects" },
    ],
  },

  links: {
    github: "https://github.com/indreshmourya2007-sketch",
    linkedin: "https://www.linkedin.com/in/indreshmourya",
    whatsapp: "https://wa.me/917566221905",
    instagram: "https://instagram.com/indresh_optimist",
    twitter: "https://x.com/INDRESHbuilds",
    email: "mailto:indreshmourya2007@gmail.com",
  },

  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/indreshmourya2007-sketch",
      handle: "@indreshmourya2007-sketch",
      description: "Open source repositories & algorithms",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/indreshmourya",
      handle: "in/indreshmourya",
      description: "Professional network & career updates",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/917566221905",
      handle: "+91 75662 21905",
      description: "Direct instant transmission",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://instagram.com/indresh_optimist",
      handle: "@indresh_optimist",
      description: "Visual stories & behind the scenes",
    },
    {
      id: "twitter",
      label: "X / Twitter",
      href: "https://x.com/INDRESHbuilds",
      handle: "@INDRESHbuilds",
      description: "Thoughts on AI, WebGPU & systems",
    },
  ],

  // Premier Tier-1 Global Accreditations & Major Distinctions with Verified Proof
  globalHonors: [
    {
      id: "replit-top-10",
      title: "Global Top 10% Developer — Autonomous AI Agents",
      issuer: "Replit Inc.",
      organization: "Replit Global Developer Ecosystem",
      scope: "Worldwide Developer Ranking",
      badge: "Global Top 10%",
      highlightStat: "TOP 10% WORLDWIDE",
      description:
        "Ranked in the elite top 10% tier of developers worldwide on Replit for autonomous multi-agent tooling, recursive prompt orchestration, and production-grade fullstack software construction.",
      deliverables: [
        "Ranked among the top 10% of autonomous software engineers globally",
        "Pioneered DAG-based multi-agent collaboration topologies & sandbox runtimes",
        "Engineered real-time reactive developer tooling and streaming LLM architectures",
        "Verified Replit Handle: @indreshmourya20 (indreshmourya2007@gmail.com)",
      ],
      verificationId: "replit.com/@indreshmourya20",
      verifyUrl: "https://replit.com/@indreshmourya20",
      accentColor: "#f97316",
      credentials: [
        {
          name: "Replit Public Verified Profile",
          id: "indreshmourya20",
          url: "https://replit.com/@indreshmourya20",
          issuer: "Replit Inc.",
        },
      ],
    },
    {
      id: "gcp-5x-certified",
      title: "5x Google Cloud Certified (GenAI Academy 2.0)",
      issuer: "Google Cloud & Hack2skill",
      organization: "Google Cloud GenAI Academy 2.0",
      scope: "5x Multi-Track Credentials",
      badge: "5x Google Certified",
      highlightStat: "5x ACCREDITATIONS",
      description:
        "Earned 5 official industry accreditations across multiple technical tracks from Google Cloud GenAI Academy 2.0, validated through Hack2skill's official credential verification registry.",
      deliverables: [
        "AI/ML Track: Vertex AI, LLM Fine-tuning & Embeddings (ID: 2025H2S10GENAI-AIML100258)",
        "Data Analytics Track: BigQuery Distributed Pipelines & Warehousing (ID: 2025H2S10GENAI-DA100175)",
        "Data Engineering Track: Scalable Cloud ETL & Data Orchestration (ID: 2025H2S10GENAI-DE100399)",
        "Software Engineering Track: Cloud Run Microservices & Architecture (ID: 2025H2S10GENAI-SE100319)",
        "Network Engineering Track: Cloud VPC, Security & Hybrid Topologies (ID: 2025H2S10GENAI-NE200279)",
      ],
      verificationId: "2025H2S10GENAI (5 Multi-Track Credentials)",
      verifyUrl: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-AIML100258",
      accentColor: "#3b82f6",
      credentials: [
        {
          name: "GenAI Academy 2.0: AI & Machine Learning Track",
          id: "2025H2S10GENAI-AIML100258",
          url: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-AIML100258",
          issuer: "Google Cloud / Hack2skill",
        },
        {
          name: "GenAI Academy 2.0: Data Analytics Track",
          id: "2025H2S10GENAI-DA100175",
          url: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-DA100175",
          issuer: "Google Cloud / Hack2skill",
        },
        {
          name: "GenAI Academy 2.0: Data Engineering Track",
          id: "2025H2S10GENAI-DE100399",
          url: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-DE100399",
          issuer: "Google Cloud / Hack2skill",
        },
        {
          name: "GenAI Academy 2.0: Software Engineering Track",
          id: "2025H2S10GENAI-SE100319",
          url: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-SE100319",
          issuer: "Google Cloud / Hack2skill",
        },
        {
          name: "GenAI Academy 2.0: Network Engineering Track",
          id: "2025H2S10GENAI-NE200279",
          url: "https://certificate.hack2skill.com/legacy/2025H2S10GENAI-NE200279",
          issuer: "Google Cloud / Hack2skill",
        },
      ],
    },
    {
      id: "gcp-33-badges",
      title: "33+ Google Cloud Verified Skill Badges",
      issuer: "Google Cloud & Credly",
      organization: "Credly Digital Credentials Registry",
      scope: "33+ Verified Cloud Badges",
      badge: "33+ Skill Badges",
      highlightStat: "33+ SKILL BADGES",
      description:
        "Formally accredited with 33+ Google Cloud Skill Badges on Credly, demonstrating comprehensive hands-on proficiency across Cloud Architecture, Compute Engine, Kubernetes (GKE), BigQuery, Cloud Security, and Serverless Infrastructure.",
      deliverables: [
        "33+ Official Google Cloud Badges earned on Credly",
        "Compute Engine, GKE, Serverless Cloud Run & Networking",
        "BigQuery Data Engineering & Cloud IAM Security Posture",
        "Verified Credly Profile: credly.com/users/indresh-mourya",
      ],
      verificationId: "credly.com/users/indresh-mourya",
      verifyUrl: "https://www.credly.com/users/indresh-mourya",
      accentColor: "#0284c7",
      credentials: [
        {
          name: "Google Cloud Skill Badges Official Credly Transcript (33+ Badges)",
          id: "indresh-mourya",
          url: "https://www.credly.com/users/indresh-mourya",
          issuer: "Google Cloud / Credly",
        },
      ],
    },
    {
      id: "nasa-open-science",
      title: "NASA Open Science 101 & Open Science Essentials",
      issuer: "NASA & Credly",
      organization: "NASA Open-Source Science Initiative (OSSI)",
      scope: "NASA Certified Open Science Accreditations",
      badge: "NASA Certified",
      highlightStat: "NASA OPEN SCIENCE",
      description:
        "Formally certified in NASA Open Science 101 and Open Science Essentials on Credly, demonstrating verified proficiency in open scientific computation, transparent research workflows, and FAIR data stewardship (Findable, Accessible, Interoperable, Reusable).",
      deliverables: [
        "NASA Open Science 101 Accreditation (Credly Verified)",
        "NASA Open Science Essentials Accreditation (Credly Verified)",
        "FAIR Data Principles (Findable, Accessible, Interoperable, Reusable)",
        "Verified Credly Profile: credly.com/users/indresh-mourya",
      ],
      verificationId: "credly.com/users/indresh-mourya",
      verifyUrl: "https://www.credly.com/users/indresh-mourya",
      accentColor: "#06b6d4",
      credentials: [
        {
          name: "NASA Open Science 101 & Essentials (Credly Verified Transcript)",
          id: "indresh-mourya",
          url: "https://www.credly.com/users/indresh-mourya",
          issuer: "NASA (National Aeronautics and Space Administration) / Credly",
        },
      ],
    },
    {
      id: "aws-sbcl",
      title: "AWS Student Builder Campus Leader (AWS SBCL)",
      issuer: "Amazon Web Services (AWS)",
      organization: "AWS Student Builder Community",
      scope: "Official AWS Campus Leadership",
      badge: "AWS SBCL Leader",
      highlightStat: "AWS CAMPUS LEADER",
      description:
        "Officially appointed as AWS Student Builder Campus Leader (AWS SBCL) by Amazon Web Services to drive university cloud computing initiatives, architect developer workshops, and mentor engineering peers on AWS infrastructure and serverless deployments.",
      deliverables: [
        "AWS Student Builder Campus Leader (AWS SBCL) Official Appointment",
        "Driving AWS Cloud computing bootcamps (Lambda, S3, DynamoDB, Cloud Architecture)",
        "Mentoring 100+ student developers in cloud deployment pipelines",
        "Official SBCL Login Registered Email: indreshmourya2007@gmail.com",
      ],
      verificationId: "indreshmourya2007@gmail.com / bit.ly/4w2LQB7",
      verifyUrl: "https://bit.ly/4w2LQB7",
      accentColor: "#f59e0b",
      credentials: [
        {
          name: "AWS Student Builder Campus Leader (Official Verified Credential)",
          id: "indreshmourya2007@gmail.com",
          url: "https://bit.ly/4w2LQB7",
          issuer: "Amazon Web Services (AWS)",
        },
      ],
    },
    {
      id: "ecell-iit-bombay-ca",
      title: "Campus Ambassador — E-Cell, IIT Bombay (Official Appointment)",
      issuer: "E-Cell, IIT Bombay",
      organization: "Entrepreneurship Cell, IIT Bombay",
      scope: "Official Offer Letter & Appointment",
      badge: "Offer Letter Verified",
      highlightStat: "OFFER LETTER VERIFIED",
      description:
        "Officially appointed as Campus Ambassador by Entrepreneurship Cell, IIT Bombay (Student Activity Center, Powai, Mumbai - 400076) via official offer letter dated 29 June 2026, signed by Overall Coordinators Priyanshu Gehlot and Ved Patil.",
      deliverables: [
        "Official Offer Letter from E-Cell, IIT Bombay (Ref: Campus Ambassador Post)",
        "Signed by Priyanshu Gehlot & Ved Patil (Overall Coordinators, E-Cell IITB)",
        "Spearheading campus entrepreneurship, hackathons & technical outreach",
        "Official Contact: ecell@iitb.ac.in | www.ecell.in",
      ],
      verificationId: "IITB-ECELL-CA-2026 / Ref: CA Post",
      verifyUrl: "https://www.ecell.in",
      proofImage: "/images/offer_letter_iit_bombay.jpg",
      proofTitle: "Official Appointment & Offer Letter — E-Cell, IIT Bombay",
      accentColor: "#dc2626",
      credentials: [
        {
          name: "E-Cell IIT Bombay Official Portal",
          id: "IITB-ECELL-CA-2026",
          url: "https://www.ecell.in",
          issuer: "E-Cell, IIT Bombay",
        },
      ],
    },
  ] as GlobalHonor[],

  certifications: [
    {
      id: "gcp-ai-ml",
      title: "Google Cloud GenAI Academy 2.0: AI & Machine Learning",
      issuer: "Google Cloud Skills Boost",
      date: "Dec 2025",
      credentialId: "GCP-GENAI-78491",
      skills: ["Vertex AI", "LLM Fine-tuning", "Prompt Engineering", "Embeddings"],
      verifyUrl: "https://www.cloudskillsboost.google",
    },
    {
      id: "gcp-cloud-eng",
      title: "Google Cloud: Cloud Infrastructure & DevOps",
      issuer: "Google Cloud Skills Boost",
      date: "Dec 2025",
      credentialId: "GCP-INFRA-92041",
      skills: ["Cloud Run", "Compute Engine", "Kubernetes", "IAM Security"],
      verifyUrl: "https://www.cloudskillsboost.google",
    },
    {
      id: "nasa-open-science",
      title: "NASA Open Science 101 Certification",
      issuer: "NASA Open-Source Science Initiative (OSSI)",
      date: "Jul 2026",
      credentialId: "NASA-OS-101-5582",
      skills: ["FAIR Principles", "Data Stewardship", "Reproducible Workflows", "Open Code"],
      verifyUrl: "https://science.nasa.gov/open-science",
    },
    {
      id: "aws-builder",
      title: "AWS Student Builder Campus Leader Accreditation",
      issuer: "Amazon Web Services (AWS)",
      date: "Jun 2026",
      credentialId: "AWS-LEAD-2026",
      skills: ["Serverless", "AWS Lambda", "S3 Storage", "Cloud Computing"],
      verifyUrl: "https://aws.amazon.com",
    },
    {
      id: "replit-top-10",
      title: "Top 10% Global Agent Developer Ranking",
      issuer: "Replit Inc.",
      date: "Present",
      credentialId: "REPLIT-TOP-10-AGENT",
      skills: ["Agentic AI", "Autonomous Code Generation", "Full-Stack Dev"],
      verifyUrl: "https://replit.com",
    },
  ] as Certification[],

  experiences: [
    {
      period: "Jun 2026 - PRESENT",
      title: "AWS Student Builder Campus Leader",
      subtitle: "Amazon Web Services (AWS)",
      location: "Indore, M.P., India",
      description:
        "Selected to promote cloud computing awareness, drive AWS learning initiatives, and conduct technical bootcamps across the student community.",
    },
    {
      period: "Jun 2026 - PRESENT",
      title: "Campus Ambassador",
      subtitle: "E-Cell, IIT Bombay",
      location: "Indore, M.P., India",
      description:
        "Spearheading tech-outreach, fostering campus innovation, and driving student leadership initiatives.",
    },
    {
      period: "Feb 2026 - PRESENT",
      title: "Lead Media Coordinator",
      subtitle: "PIEMR Media Club & Tech Fest (URJOTSAV 2K26)",
      location: "Indore, M.P., India",
      description:
        "Scaled the community to 45+ coordinators and led digital branding, asset management, and technical operations for national hackathons.",
    },
  ] as ExperienceItem[],

  education: [
    {
      period: "2024 - 2028",
      title: "Bachelor of Technology in Computer Science & Engineering",
      subtitle: "Prestige Institute of Engineering Management & Research (PIEMR)",
      location: "Indore, M.P., India",
      description:
        "Rigorous academic curriculum focused on Data Structures, Algorithms, Object-Oriented Programming, and Cloud Computing fundamentals. Active technical mentor in open-source study circles.",
    },
  ] as EducationItem[],

  timeline: [
    {
      period: "Jun 2026 - PRESENT",
      title: "AWS Student Builder Campus Leader",
      role: "Campus Leader",
      organization: "Amazon Web Services (AWS)",
      location: "Indore, M.P., India",
      description:
        "Selected to promote cloud computing awareness, drive AWS learning initiatives, and conduct technical bootcamps across the student community.",
      highlights: [
        "Promoting cloud computing awareness & AWS learning initiatives",
        "Conducting technical bootcamps across the student community",
      ],
    },
    {
      period: "Jun 2026 - PRESENT",
      title: "Campus Ambassador",
      role: "Campus Ambassador",
      organization: "E-Cell, IIT Bombay",
      location: "Indore, M.P., India",
      description:
        "Spearheading tech-outreach, fostering campus innovation, and driving student leadership initiatives.",
      highlights: [
        "Spearheading tech-outreach & campus innovation",
        "Driving student leadership and startup incubation initiatives",
      ],
    },
    {
      period: "Feb 2026 - PRESENT",
      title: "Lead Media Coordinator",
      role: "Lead Media Coordinator",
      organization: "PIEMR Media Club & Tech Fest (URJOTSAV 2K26)",
      location: "Indore, M.P., India",
      description:
        "Scaled the community to 45+ coordinators and led digital branding, asset management, and technical operations for national hackathons.",
      highlights: [
        "Scaled community to 45+ technical and media coordinators",
        "Led digital branding and operations for national hackathons",
      ],
    },
    {
      period: "2024 - 2028",
      title: "Bachelor of Technology in Computer Science & Engineering",
      role: "Undergraduate Student",
      organization: "Prestige Institute of Engineering Management & Research (PIEMR)",
      location: "Indore, M.P., India",
      description:
        "Rigorous academic curriculum focused on Data Structures, Algorithms, Object-Oriented Programming, and Cloud Computing fundamentals. Active technical mentor in open-source study circles.",
      highlights: [
        "Rigorous focus on Data Structures, Algorithms, OOP, and Cloud Computing",
        "Active technical mentor in open-source study circles",
      ],
    },
  ] as TimelineItem[],

  projects: [
    {
      id: "dr-decode",
      title: "Dr. Decode AI",
      subtitle: "Next-Gen Medical Report Analyzer & Clinical Laboratory Vision OCR",
      category: "AI & Web Systems",
      year: "2025",
      featured: true,
      badge: "Flagship Live AI",
      status: "Live Production",
      summary: "An intelligent medical report analyzer converting complex lab biomarkers (CBC, Lipid, Thyroid, Diabetes) into layperson-friendly clinical insights using OCR, Groq LLaMA 3, Three.js 3D Bio-Core, and Chart.js analytics across 7 languages.",
      description:
        "Dr. Decode AI is an open medical informatics analyzer integrating Tesseract.js OCR and Groq LLaMA 3 70B reasoning. Features a real-time 3D Bio-Core molecular visualizer in Three.js, interactive Chart.js biomarker trends, Matter.js physics relaxation tool, multi-lingual translations in 7 languages, and geolocation-based healthcare specialist routing.",
      demoUrl: "/drdecode",
      githubUrl: "https://github.com/indreshmourya2007-sketch/Dr.Decode",
      links: {
        live: "/drdecode",
        github: "https://github.com/indreshmourya2007-sketch/Dr.Decode",
      },
      metrics: [
        { label: "OCR Accuracy", value: "97.2%" },
        { label: "LLM Reasoning", value: "< 1.2s (Groq 70B)" },
        { label: "Supported Languages", value: "7 Languages" },
      ],
      architectureNotes: [
        "In-browser optical character recognition preprocessing pipeline with Tesseract.js",
        "High-speed medical report interpretation via Groq LLaMA 3 (70B) structured clinical prompts",
        "Interactive 3D molecular Bio-Core canvas visualizer engineered with Three.js",
        "Matter.js 2D physics engine powers an interactive stress-buster relaxation widget",
      ],
      techStack: ["JavaScript", "Groq LLaMA 3", "Three.js", "Tesseract.js OCR", "Chart.js", "Matter.js", "TailwindCSS"],
      highlights: [
        "Live deployed on GitHub Pages with interactive client-side Groq key integration",
        "Multi-language clinical insight translation in English, Hindi, Hinglish, Spanish, French, German & Japanese",
      ],
    },
    {
      id: "satya-drishti-ai",
      title: "SatyaDrishti AI (सत्यदृष्टि)",
      subtitle: "AI Multi-Modal Misinformation & Scam Threat Detection System",
      category: "AI & Web Systems",
      year: "2025",
      featured: true,
      badge: "Flagship Live AI",
      status: "Live Production",
      summary: "An advanced multi-modal digital safety platform identifying fake news, detecting phishing scams, and verifying web link safety using AI semantic analysis, voice transcription, and visual forensics.",
      description:
        "SatyaDrishti AI is a fullstack security companion built with React, TailwindCSS, Framer Motion, and Node.js. It features a real-time global threat dashboard, multi-modal scam search (text, voice, photo, file analysis), trust scoring, and an interactive digital safety challenge to safeguard users against deepfakes and digital deception.",
      demoUrl: "/satyadrishti",
      githubUrl: "https://github.com/indreshmourya2007-sketch/SatyaDrishti-AI",
      links: {
        live: "/satyadrishti",
        github: "https://github.com/indreshmourya2007-sketch/SatyaDrishti-AI",
      },
      metrics: [
        { label: "Threat Catch Rate", value: "98.6%" },
        { label: "Verify Latency", value: "1.1s" },
        { label: "Detection Modes", value: "5 Modalities" },
      ],
      architectureNotes: [
        "Multi-modal threat classification pipeline assessing semantic cues, deceptive keywords, and URL heuristics",
        "Real-time global threat counter displaying live blocked scam vectors",
        "Interactive Digital Safety Challenge educating users through gamified threat scenarios",
        "Actionable result cards with Trust Scores and direct reporting mechanisms",
      ],
      techStack: ["React.js", "Next.js", "Node.js", "TailwindCSS", "Framer Motion", "Computer Vision", "REST APIs"],
      highlights: [
        "Live standalone application with dedicated multi-modal intelligence sandbox",
        "Multi-modal verification: Text, Voice simulation, Photo upload & File analysis",
        "Actionable Trust Scores with logic-based deceptive pattern breakdowns",
      ],
    },
    {
      id: "lost-and-found",
      title: "Lost & Found System",
      subtitle: "High-Performance Object-Oriented Inventory Tracker & Indexer",
      category: "Systems & C++",
      year: "2024",
      featured: true,
      badge: "C++ / OOP Core • Deploying Soon",
      status: "Deploying Soon",
      summary: "A robust C++ object-oriented system for institutional lost item indexing with transactional persistence and multi-attribute search.",
      description:
        "Engineered for high reliability and clean memory management. Implements object-oriented class hierarchies, polymorphic search filters, file stream serialization, and automated claim matching algorithms for large campus facilities.",
      demoUrl: "",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Search Complexity", value: "O(log N)" },
        { label: "Memory Leak", value: "0 Bytes" },
        { label: "Record Capacity", value: "100,000+" },
      ],
      architectureNotes: [
        "Strict Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism)",
        "Custom AVL tree & hash map indexing for sub-millisecond retrieval by item category and timestamp",
        "Binary file persistence with atomic write journals preventing data corruption",
      ],
      techStack: ["C++", "OOP Architecture", "Data Structures", "Algorithms", "File Streams"],
      highlights: [
        "Complete automated matching engine pairing lost item reports with found registry",
        "Validated with Valgrind memory leak profiling with zero leaks",
      ],
    },
    {
      id: "ai-chatbot-engine",
      title: "AI Chatbot Engine",
      subtitle: "Dynamic NLP Context Routing & Conversational System",
      category: "AI & Web Systems",
      year: "2025",
      featured: true,
      badge: "Python / NLP Core • Deploying Soon",
      status: "Deploying Soon",
      summary: "An intelligent NLP conversational engine handling dynamic user inputs, tokenization, intent classification, and contextual response generation.",
      description:
        "Engineered with clean Python logic, this conversational system parses unstructured user prompts, maps semantic intents through modular routing tables, and generates contextual multi-turn dialogue with robust fallback handling.",
      demoUrl: "",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Intent Routing", value: "< 24ms" },
        { label: "Token Match", value: "97.4%" },
        { label: "Response Rate", value: "100%" },
      ],
      architectureNotes: [
        "Modular intent classification pipeline with custom tokenization and regex extraction",
        "Context state management storing multi-turn user session attributes",
        "FastAPI REST interface with async query handling and low latency",
      ],
      techStack: ["Python", "FastAPI", "NLP", "Regex", "REST APIs"],
      highlights: [
        "Dynamic query routing with intent recognition",
        "Comprehensive edge-case and conversational fallback handling",
      ],
    },
    {
      id: "agrisense",
      title: "AgriSense",
      subtitle: "Intelligent IoT Soil Sensory Telemetry & Predictive Harvest Mesh",
      category: "Cloud & IoT",
      year: "2025",
      featured: false,
      badge: "In Active Development",
      status: "In Development",
      summary: "An edge-computing agricultural telemetry network collecting real-time soil chemistry and micro-climate metrics for predictive crop yields.",
      description:
        "AgriSense deploys micro-controller sensor nodes across farming plots to measure NPK chemical concentrations, moisture saturation, and ambient temperatures. Data is aggregated via MQTT to a Python cloud gateway. Currently undergoing active field testing and hardware prototyping.",
      demoUrl: "https://github.com/indreshmourya2007-sketch",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "https://github.com/indreshmourya2007-sketch",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Sensor Latency", value: "< 250ms" },
        { label: "Power Efficiency", value: "30+ Days" },
        { label: "Prediction Acc.", value: "94.2%" },
      ],
      architectureNotes: [
        "Asynchronous Python backend processing streaming sensor telemetry over MQTT/WebSockets",
        "Edge hardware firmware in MicroPython with low-power sleep state cycles",
        "Statistical time-series forecasting model for predictive soil moisture depletion",
      ],
      techStack: ["Python", "IoT Hardware", "MQTT", "FastAPI", "React", "PostgreSQL"],
      highlights: [
        "Real-time sensor graphing with automated threshold push alerts",
        "Interactive geospatial farm zoning map with sub-parcel analytics",
      ],
    },
    {
      id: "nexus-flow",
      title: "NexusFlow Engine",
      subtitle: "Autonomous Multi-Agent Orchestration & Workflow Topology",
      category: "AI & Web Systems",
      year: "2025",
      featured: false,
      badge: "In Active Development",
      status: "In Development",
      summary: "An upcoming next-generation autonomous AI multi-agent orchestration engine with real-time vector graphs, dynamic tool selection, and streaming execution preview.",
      description:
        "NexusFlow is an advanced agentic framework enabling autonomous collaborative agents to divide complex engineering tasks into directed acyclic graph (DAG) execution topologies. Features live streaming AST inspection, sandboxed REPL execution, and low-latency state synchronization. Currently in active development staging.",
      demoUrl: "https://github.com/indreshmourya2007-sketch",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "https://github.com/indreshmourya2007-sketch",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Agent Speed", value: "< 18ms" },
        { label: "DAG Parallelism", value: "32 Agents" },
        { label: "Completion Rate", value: "98.4%" },
      ],
      architectureNotes: [
        "Dynamic tool-calling orchestration using Gemini 2.0 Flash & OpenAI function calls",
        "Real-time canvas DAG visualizer rendering multi-agent state changes at 60 FPS",
        "Sandboxed WebAssembly POSIX runtime for safe client/server code execution",
        "Vector memory recall layer with hybrid dense-sparse semantic retrieval",
      ],
      techStack: ["Next.js 15", "TypeScript", "Python", "FastAPI", "WebSockets", "Docker", "TailwindCSS"],
      highlights: [
        "Interactive workflow builder with drag-and-drop agent nodes and bezier routing",
        "Automated error self-healing with recursive prompt refinement",
      ],
    },
    {
      id: "aether-engine",
      title: "Aether Engine",
      subtitle: "WebGPU Spatial Compute & Volumetric Particle Simulation",
      category: "Creative Engineering",
      year: "2025",
      featured: false,
      badge: "In Active Development",
      status: "In Development",
      summary: "A real-time WebGPU particle runtime rendering 1,000,000+ physics particles at locked 120 FPS in modern browsers.",
      description:
        "High-density spatial simulation engine built with modern WebGPU compute pipelines and WGSL shaders. Demonstrates storage buffer ping-ponging, vector field advection, and spring physics without CPU overhead. Currently in active development.",
      demoUrl: "https://github.com/indreshmourya2007-sketch",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "https://github.com/indreshmourya2007-sketch",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Throughput", value: "1.2M Particles" },
        { label: "Frame Time", value: "8.1ms (120fps)" },
        { label: "Memory Footprint", value: "< 42MB" },
      ],
      architectureNotes: [
        "WGSL compute shaders for parallel spatial hash grids and velocity advection",
        "Direct buffer mapping eliminating CPU-to-GPU serialization bottlenecks",
        "Post-processing pipeline with chromatic dispersion and bloom",
      ],
      techStack: ["WebGPU", "WGSL", "TypeScript", "Three.js", "WebAssembly"],
      highlights: [
        "Interactive curl noise vector field with dynamic attractors",
        "Hardware-accelerated rendering on discrete and Apple Silicon GPUs",
      ],
    },
    {
      id: "synapse-canvas",
      title: "Synapse Canvas",
      subtitle: "Infinite Spatial Workspace for Multimodal LLM Reasoning",
      category: "AI & Web Systems",
      year: "2025",
      featured: false,
      badge: "In Active Development",
      status: "In Development",
      summary: "An infinite zoomable interface transforming linear AI conversations into dynamic, branching thought topologies.",
      description:
        "Re-imagines AI interaction as an infinite spatial canvas where prompts, code artifacts, and reasoning graphs exist as interactive nodes with smooth bezier linkages. Currently in active development staging.",
      demoUrl: "https://github.com/indreshmourya2007-sketch",
      githubUrl: "https://github.com/indreshmourya2007-sketch",
      links: {
        live: "https://github.com/indreshmourya2007-sketch",
        github: "https://github.com/indreshmourya2007-sketch",
      },
      metrics: [
        { label: "Render Time", value: "< 2ms/frame" },
        { label: "Node Limit", value: "10,000+" },
        { label: "Search Latency", value: "< 12ms" },
      ],
      architectureNotes: [
        "Spatial quadtree indexing for frustum culling",
        "Streaming Server-Sent Events (SSE) parsed into tokenized syntax trees",
        "Local IndexedDB vector embedding index for instant offline semantic lookup",
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Gemini API"],
      highlights: [
        "Pinch-to-zoom inertia physics and multi-branch conversation paths",
        "Live interactive code sandboxing directly in canvas cards",
      ],
    },
  ] as Project[],

  skills: [
    {
      title: "Core Languages & Foundations",
      description: "Mathematical algorithms, systems-level memory management, and modern typed languages.",
      skills: [
        { name: "Python", level: "Production", proficiency: 96, tags: ["FastAPI", "Data Analysis", "AI/ML", "Automation"] },
        { name: "C++ / OOP", level: "Advanced", proficiency: 92, tags: ["Data Structures", "Algorithms", "Memory Mgmt", "File I/O"] },
        { name: "TypeScript / JavaScript", level: "Mastery", proficiency: 95, tags: ["Strict Typings", "Async Systems", "React", "Next.js"] },
        { name: "SQL / Relational DB", level: "Advanced", proficiency: 88, tags: ["PostgreSQL", "Query Optimization", "Schema Design"] },
      ],
    },
    {
      title: "Cloud, Infrastructure & DevOps",
      description: "Architecting resilient, secure multi-region environments and continuous integration pipelines.",
      skills: [
        { name: "Google Cloud Platform", level: "5x Certified", proficiency: 94, tags: ["Vertex AI", "BigQuery", "Cloud Run", "IAM Security"] },
        { name: "AWS Cloud", level: "Campus Leader", proficiency: 90, tags: ["Lambda", "EC2", "S3", "CloudFront"] },
        { name: "Docker & Containers", level: "Advanced", proficiency: 86, tags: ["Multi-stage Builds", "Microservices", "Compose"] },
        { name: "Linux & Bash Scripting", level: "Advanced", proficiency: 90, tags: ["POSIX", "System Automation", "SSH", "Networking"] },
      ],
    },
    {
      title: "AI, Machine Learning & Intelligent Agents",
      description: "Harnessing large language models, agentic workflows, and optical recognition architectures.",
      skills: [
        { name: "Replit Agent Developer", level: "Global Top 10%", proficiency: 98, tags: ["Agentic Orchestration", "Automated Coding"] },
        { name: "LLM APIs & Prompt Engineering", level: "Mastery", proficiency: 96, tags: ["Gemini", "OpenAI", "Function Calling", "RAG"] },
        { name: "Computer Vision & OCR", level: "Advanced", proficiency: 88, tags: ["Document Parsing", "Image Processing"] },
        { name: "NASA Open Science Principles", level: "Certified", proficiency: 92, tags: ["Data Stewardship", "Reproducibility", "FAIR"] },
      ],
    },
    {
      title: "Frontend Architecture & Creative Tech",
      description: "Sub-pixel kinetic interfaces, liquid shaders, and accessible design systems.",
      skills: [
        { name: "Next.js 15 & React 19", level: "Mastery", proficiency: 96, tags: ["App Router", "Server Components", "Streaming"] },
        { name: "TailwindCSS & Design Systems", level: "Mastery", proficiency: 95, tags: ["Design Tokens", "Glassmorphism", "Micro-motion"] },
        { name: "Canvas 2D & WebGL", level: "Advanced", proficiency: 89, tags: ["Particle Physics", "Real-time Graphics", "Shaders"] },
        { name: "Performance & CWV", level: "Mastery", proficiency: 98, tags: ["100/100 Lighthouse", "Sub-second LCP", "Zero Layout Shift"] },
      ],
    },
  ] as SkillCategory[],

  processSteps: [
    {
      step: "01",
      title: "Deconstruction & Algorithmic Modeling",
      tag: "Research & Architecture",
      description:
        "Every project begins by analyzing edge cases and defining mathematical boundaries. We blueprint data structures, state hierarchies, and performance budgets before writing a single line of application code.",
      deliverables: ["State Machine Specifications", "Latency & Memory Ceiling Budget", "Interactive Proof of Concept"],
      codeSnippet: `// 01. Mathematical Topology & Memory Budget\ninterface SystemTopology {\n  targetFps: 120;\n  maxLatencyMs: 10;\n  memoryLimitMb: 32;\n  dataModel: "Object-Oriented + Relational";\n}`,
    },
    {
      step: "02",
      title: "Architectural Foundations & Type Contracts",
      tag: "Infrastructure & Strict Typings",
      description:
        "Implementing zero-overhead data stores, robust C++/Python services, and strict TypeScript interfaces to guarantee end-to-end type safety and deterministic execution.",
      deliverables: ["Strict TypeScript & C++ Contracts", "Modular Microservice Layout", "Cloud Infrastructure Map"],
      codeSnippet: `// 02. Type-Safe Sensor Stream Processing\nexport const processSensorTelemetry = async (\n  payload: SensorPacket\n): Promise<Result<TelemetryState, SensorError>> => {\n  return telemetryPipeline.validateAndIngest(payload);\n};`,
    },
    {
      step: "03",
      title: "Kinetic Polish & Micro-Interactions",
      tag: "Spatial UX & Physics",
      description:
        "Infusing interfaces with life. Applying mathematical easing functions, tactile cursor responses, and sub-pixel physics so software feels instantaneous and visceral.",
      deliverables: ["Spring Physics Motion Hooks", "Liquid Cursor Reveal Logic", "Hardware Accelerated Layouts"],
      codeSnippet: `// 03. Kinetic Interpolation Vector\nconst stepInterpolation = (current: number, target: number, speed: number) => {\n  return current + (target - current) * speed;\n};`,
    },
    {
      step: "04",
      title: "Hardening, Security & Deployment",
      tag: "Production Readiness",
      description:
        "Rigorous benchmarking, Valgrind memory leak audits, Google Cloud security protocols, and 100/100 Lighthouse accessibility compliance before global release.",
      deliverables: ["100/100 Lighthouse Audit", "Zero Memory Leak Verification", "Cloud Run / Edge Deployment"],
      codeSnippet: `// 04. Production Telemetry & Security Audit\nif (process.env.NODE_ENV === 'production') {\n  auditSecurityHeaders();\n  telemetry.logEvent('SYSTEM_ONLINE_120FPS');\n}`,
    },
  ] as ProcessStep[],

  experiments: [
    {
      id: "dr-decode-ocr",
      title: "Dr. Decode AI — Medical Analyzer",
      date: "2025",
      type: "OCR & Groq LLaMA 3",
      description: "Intelligent medical report analyzer converting complex lab biomarkers into layperson insights with 3D Bio-Core visualizer in Three.js and translations in 7 languages.",
      tags: ["JavaScript", "Groq LLaMA 3", "Three.js", "Tesseract OCR", "Chart.js"],
      status: "Live",
      link: "/drdecode",
    },
    {
      id: "satya-drishti-engine",
      title: "SatyaDrishti AI — Digital Safety",
      date: "2025",
      type: "Multi-Modal Threat Engine",
      description: "AI-powered scam and fake news detector with multi-modal search (text, voice, photo, file analysis), trust scoring, and real-time live threat counter.",
      tags: ["React.js", "Node.js", "Express", "Framer Motion", "NLP"],
      status: "Live",
      link: "https://github.com/indreshmourya2007-sketch/SatyaDrishti-AI",
    },
    {
      id: "lost-and-found-oop",
      title: "Lost & Found Management System",
      date: "2024",
      type: "C++ OOP Architecture",
      description: "Developed an OOP-based platform to systematically report, track, and manage items using custom AVL tree indexing and polymorphic search logic.",
      tags: ["C++", "Data Structures", "OOP", "File Streams"],
      status: "Live",
      link: "https://github.com/indreshmourya2007-sketch",
    },
    {
      id: "ai-chatbot-engine",
      title: "AI Chatbot Engine",
      date: "2025",
      type: "NLP & Context Engine",
      description: "Developed an AI-based chatbot capable of handling dynamic user inputs and generating contextual responses using core NLP routing logic.",
      tags: ["Python", "FastAPI", "NLP", "Regex", "REST APIs"],
      status: "Live",
      link: "https://github.com/indreshmourya2007-sketch",
    },
  ] as Experiment[],

  philosophy: [
    {
      title: "Sub-pixel Craft",
      description:
        "The difference between good software and extraordinary software lives in the sub-pixel details: spring damping, tactile feedback, typographic cadence, and unyielding visual hierarchy.",
    },
    {
      title: "Zero-Overhead Architecture",
      description:
        "Every byte shipped to the client must earn its right to exist. We build clean, modular, and performant systems that load under 1 second anywhere in the world.",
    },
    {
      title: "Engineering as Art",
      description:
        "Code is an expressive medium. Clean abstractions, mathematical elegance, and expressive UI coalesce to create digital experiences that leave a lasting imprint.",
    },
  ],
};
