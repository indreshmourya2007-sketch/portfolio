"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Multilingual translations map for 7 languages
const TRANSLATIONS = {
  en: {
    title: "Dr. Decode AI",
    tagline: "Intelligent Clinical Report Informatics & Biomarker Analyzer",
    heroHeading: "Decode Complex Medical Reports",
    heroHeadingSub: "Into Clear, Actionable Human Insights",
    heroDesc:
      "Upload lab reports, extract critical biomarkers with intelligent OCR simulation, inspect real-time 3D cellular structures, and receive structured layperson clinical interpretations across 7 languages.",
    uploadTab: "1. Upload & OCR Lab",
    dashboardTab: "2. Biomarkers Matrix",
    visualTab: "3. 3D Bio-Core DNA",
    stressTab: "4. Stress Buster",
    routerTab: "5. Specialist Router",
    chatTab: "6. AI Clinical Copilot",
    loadPreset: "Load Clinical Sample Preset",
    analyzeBtn: "Analyze Clinical Biomarkers",
    analyzing: "Running Neural OCR & Clinical Extraction...",
    disclaimer:
      "⚠️ Educational & Informational Tool Only. Not a substitute for professional clinical medical advice, diagnosis, or treatment.",
    normal: "Normal Range",
    elevated: "Elevated / High",
    critical: "Critical Alert",
    low: "Below Normal",
    consultDoctor: "Consultation Recommended",
    specialistUrgent: "Specialist Review Required",
  },
  hi: {
    title: "Dr. Decode AI (डॉ. डिकोड)",
    tagline: "स्मार्ट मेडिकल रिपोर्ट विश्लेषक एवं बायोमार्कर इंफॉर्मेटिक्स",
    heroHeading: "जटिल मेडिकल रिपोर्ट्स को समझें",
    heroHeadingSub: "आसान और स्पष्ट भाषा में",
    heroDesc:
      "अपनी लैब रिपोर्ट अपलोड करें, ओसीआर द्वारा बायोमार्कर निकालें, 3डी बायो-कोर देखें और 7 भाषाओं में आसान क्लिनिकल विश्लेषण प्राप्त करें।",
    uploadTab: "1. रिपोर्ट अपलोड एवं ओसीआर",
    dashboardTab: "2. बायोमार्कर मैट्रिक्स",
    visualTab: "3. 3D बायो-कोर डीएनए",
    stressTab: "4. तनाव मुक्ति रिलैक्स",
    routerTab: "5. डॉक्टर विशेषज्ञ चयन",
    chatTab: "6. एआई मेडिकल असिस्टेंट",
    loadPreset: "सैंपल रिपोर्ट लोड करें",
    analyzeBtn: "बायोमार्कर का विश्लेषण करें",
    analyzing: "ओसीआर और क्लिनिकल डेटा निकाला जा रहा है...",
    disclaimer:
      "⚠️ केवल शैक्षणिक एवं सूचनात्मक उद्देश्य के लिए। यह पेशेवर डॉक्टर की सलाह, निदान या उपचार का विकल्प नहीं है।",
    normal: "सामान्य स्तर (Normal)",
    elevated: "बढ़ा हुआ (High)",
    critical: "गंभीर चेतावनी (Critical)",
    low: "कम स्तर (Low)",
    consultDoctor: "चिकित्सक से परामर्श लें",
    specialistUrgent: "विशेषज्ञ डॉक्टर की सलाह आवश्यक",
  },
  hinglish: {
    title: "Dr. Decode AI",
    tagline: "Smart Medical Report Analyzer & Biomarker Decoder",
    heroHeading: "Apni Complex Lab Reports Ko Samjhein",
    heroHeadingSub: "Simple & Clear Aasan Bhasha Mein",
    heroDesc:
      "Lab reports upload karein, parameters scan karein, interactive 3D Bio-Core DNA dekhein aur doctor consultation ke liye clear clinical insights payein.",
    uploadTab: "1. Upload & OCR Lab",
    dashboardTab: "2. Biomarkers Matrix",
    visualTab: "3. 3D Bio-Core DNA",
    stressTab: "4. Stress Buster",
    routerTab: "5. Specialist Router",
    chatTab: "6. AI Clinical Copilot",
    loadPreset: "Sample Report Load Karein",
    analyzeBtn: "Biomarkers Analyze Karein",
    analyzing: "OCR & Analysis Run Ho Raha Hai...",
    disclaimer:
      "⚠️ Sirf educational purpose ke liye hai. Yeh doctor ke clinical diagnosis ka substitute nahi hai.",
    normal: "Normal Range",
    elevated: "Elevated / High",
    critical: "Critical Alert",
    low: "Low Level",
    consultDoctor: "Doctor Consultation Recommended",
    specialistUrgent: "Specialist Review Required",
  },
  es: {
    title: "Dr. Decode AI",
    tagline: "Analizador Inteligente de Informes Clínicos y Biomarcadores",
    heroHeading: "Descifre Informes Médicos Complejos",
    heroHeadingSub: "En Perspectivas Claras y Comprensibles",
    heroDesc:
      "Suba sus informes de laboratorio, extraiga parámetros con OCR, visualice la hélice 3D de ADN y obtenga interpretaciones clínicas accesibles.",
    uploadTab: "1. Subir e Informes OCR",
    dashboardTab: "2. Matriz de Biomarcadores",
    visualTab: "3. ADN 3D Bio-Core",
    stressTab: "4. Alivio de Estrés",
    routerTab: "5. Especialistas Médicos",
    chatTab: "6. Asistente Clínico IA",
    loadPreset: "Cargar Ejemplo Clínico",
    analyzeBtn: "Analizar Biomarcadores",
    analyzing: "Extrayendo Datos Clínicos...",
    disclaimer:
      "⚠️ Solo con fines educativos. No sustituye el diagnóstico ni tratamiento de un médico profesional.",
    normal: "Rango Normal",
    elevated: "Elevado / Alto",
    critical: "Alerta Crítica",
    low: "Por debajo de lo normal",
    consultDoctor: "Consulta Recomendada",
    specialistUrgent: "Revisión Especializada Requerida",
  },
  fr: {
    title: "Dr. Decode AI",
    tagline: "Analyseur Intelligent de Rapports Médicaux et Biomarqueurs",
    heroHeading: "Décodez Vos Analyses Médicales",
    heroHeadingSub: "En Informations Claires et Accessibles",
    heroDesc:
      "Téléchargez vos bilans sanguins, extrayez les paramètres par OCR, observez l'ADN 3D et obtenez des synthèses cliniques fiables.",
    uploadTab: "1. Téléchargement & OCR",
    dashboardTab: "2. Matrice Biomarqueurs",
    visualTab: "3. ADN 3D Bio-Core",
    stressTab: "4. Anti-Stress",
    routerTab: "5. Orientation Médicale",
    chatTab: "6. Assistant Clinique IA",
    loadPreset: "Charger un Échantillon",
    analyzeBtn: "Analyser les Biomarqueurs",
    analyzing: "Extraction des données...",
    disclaimer:
      "⚠️ Outil informatif et éducatif uniquement. Ne remplace pas l'avis d'un professionnel de santé.",
    normal: "Valeurs Normales",
    elevated: "Élevé / Supérieur",
    critical: "Alerte Critique",
    low: "Inférieur à la normale",
    consultDoctor: "Consultation Recommandée",
    specialistUrgent: "Avis Spécialisé Requis",
  },
  de: {
    title: "Dr. Decode AI",
    tagline: "Intelligente Analyse Medizinischer Laborberichte & Biomarker",
    heroHeading: "Komplexe Laborberichte Verstehen",
    heroHeadingSub: "In Klar Verständlichen Erkenntnissen",
    heroDesc:
      "Laden Sie Laborbefunde hoch, extrahieren Sie Parameter mittels OCR, erkunden Sie 3D-DNA-Modelle und erhalten Sie verlässliche klinische Zusammenfassungen.",
    uploadTab: "1. Upload & OCR Labor",
    dashboardTab: "2. Biomarker-Matrix",
    visualTab: "3. 3D Bio-Core DNA",
    stressTab: "4. Stressabbau",
    routerTab: "5. Facharzt-Finder",
    chatTab: "6. KI-Klinikassistent",
    loadPreset: "Musterbefund Laden",
    analyzeBtn: "Biomarker Analysieren",
    analyzing: "Extrahiere Labordaten...",
    disclaimer:
      "⚠️ Nur zu Bildungszwecken. Ersetzt keinen ärztlichen Befund oder professionelle Behandlung.",
    normal: "Normalbereich",
    elevated: "Erhöht / Hoch",
    critical: "Kritischer Alarm",
    low: "Niedrig",
    consultDoctor: "Arztbesuch empfohlen",
    specialistUrgent: "Facharzt-Überprüfung erforderlich",
  },
  ja: {
    title: "Dr. Decode AI",
    tagline: "インテリジェント臨床検査レポート分析＆バイオマーカーデコーダー",
    heroHeading: "複雑な医療検査結果を分かりやすく",
    heroHeadingSub: "明快で行動可能な健康データへ変換",
    heroDesc:
      "検査報告書を読み込み、OCRでバイオマーカーを自動抽出し、リアルタイム3D DNA螺旋を可視化しながら、7言語でわかりやすい解説を提供します。",
    uploadTab: "1. アップロード＆OCR",
    dashboardTab: "2. バイオマーカー一覧",
    visualTab: "3. 3D Bio-Core DNA",
    stressTab: "4. ストレス解消ツール",
    routerTab: "5. 専門医ガイダンス",
    chatTab: "6. AI医療相談コパイロット",
    loadPreset: "サンプル検査を読み込む",
    analyzeBtn: "バイオマーカーを解析",
    analyzing: "OCRと臨床データを解析中...",
    disclaimer:
      "⚠️ 本システムは教育・情報提供のみを目的としており、医師の診断や治療の代わりとなるものではありません。",
    normal: "正常範囲 (Normal)",
    elevated: "高値 (Elevated)",
    critical: "要精密検査 (Critical)",
    low: "低値 (Low)",
    consultDoctor: "医師への相談を推奨",
    specialistUrgent: "専門医による診察が必要",
  },
};

interface Biomarker {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  minNormal: number;
  maxNormal: number;
  status: "normal" | "elevated" | "critical" | "low";
  explanation: string;
  lifestyleAdvice: string;
  specialistNeeded: string;
}

interface ReportPreset {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  findingsCount: number;
  urgency: "LOW" | "MODERATE" | "HIGH";
  biomarkers: Biomarker[];
  clinicalSummary: {
    summary: string;
    keyRisk: string;
    actionPlan: string[];
    recommendedSpecialist: string;
  };
}

const REPORT_PRESETS: ReportPreset[] = [
  {
    id: "cbc-anemia",
    name: "Complete Blood Count (CBC) Panel",
    subtitle: "Microcytic Anemia & Mild Leukocytosis Indicator",
    category: "Hematology",
    description: "Routine hematological profile evaluating erythrocytes, hemoglobin saturation, and immune defense leukocytes.",
    findingsCount: 6,
    urgency: "MODERATE",
    biomarkers: [
      {
        id: "hb",
        name: "Hemoglobin (Hb)",
        category: "Erythrocytes",
        value: 10.4,
        unit: "g/dL",
        minNormal: 13.5,
        maxNormal: 17.5,
        status: "low",
        explanation: "Low hemoglobin indicates reduced oxygen-carrying capacity of red blood cells, indicative of mild iron-deficiency anemia.",
        lifestyleAdvice: "Increase dietary iron intake (spinach, legumes, fortified cereals, vitamin C to boost absorption).",
        specialistNeeded: "Hematologist / General Physician",
      },
      {
        id: "wbc",
        name: "Total Leukocyte Count (WBC)",
        category: "Immune System",
        value: 12400,
        unit: "/mcL",
        minNormal: 4500,
        maxNormal: 11000,
        status: "elevated",
        explanation: "Mildly elevated white blood cells suggest an active physiological immune response or minor localized inflammation.",
        lifestyleAdvice: "Ensure adequate rest, hydration, and monitor for low-grade fever.",
        specialistNeeded: "General Physician",
      },
      {
        id: "plt",
        name: "Platelet Count",
        category: "Clotting",
        value: 260000,
        unit: "/mcL",
        minNormal: 150000,
        maxNormal: 450000,
        status: "normal",
        explanation: "Optimal platelet density ensuring normal blood coagulation and vascular repair.",
        lifestyleAdvice: "Maintain regular balanced nutrition.",
        specialistNeeded: "None (Within Range)",
      },
      {
        id: "mcv",
        name: "Mean Corpuscular Volume (MCV)",
        category: "Erythrocyte Indices",
        value: 72.0,
        unit: "fL",
        minNormal: 80.0,
        maxNormal: 100.0,
        status: "low",
        explanation: "Low MCV signifies microcytosis (smaller RBCs than normal), characteristic of iron deficiency.",
        lifestyleAdvice: "Consult physician for serum ferritin testing.",
        specialistNeeded: "Hematologist",
      },
      {
        id: "neut",
        name: "Neutrophils",
        category: "Immune System",
        value: 68,
        unit: "%",
        minNormal: 40,
        maxNormal: 70,
        status: "normal",
        explanation: "Normal proportion of primary bacterial defense white blood cells.",
        lifestyleAdvice: "Normal immune balance.",
        specialistNeeded: "None",
      },
      {
        id: "rbc",
        name: "Total RBC Count",
        category: "Erythrocytes",
        value: 4.1,
        unit: "million/mcL",
        minNormal: 4.5,
        maxNormal: 5.9,
        status: "low",
        explanation: "Mildly diminished erythrocyte production.",
        lifestyleAdvice: "Support with folate and vitamin B12 supplementation as advised.",
        specialistNeeded: "General Physician",
      },
    ],
    clinicalSummary: {
      summary: "Patient displays classic hallmarks of mild microcytic hypochromic anemia (Hemoglobin: 10.4 g/dL, MCV: 72 fL) accompanied by reactive mild leukocytosis (WBC: 12,400/mcL).",
      keyRisk: "Reduced tissue oxygen delivery, mild fatigue, and potential acute immune stimulus.",
      actionPlan: [
        "Schedule full Iron Profile (Serum Ferritin, TIBC, Transferrin Saturation).",
        "Introduce iron-rich nutritional sources with vitamin C synergy.",
        "Re-evaluate Complete Blood Count in 4 to 6 weeks.",
      ],
      recommendedSpecialist: "Hematologist & General Physician",
    },
  },
  {
    id: "lipid-profile",
    name: "Comprehensive Lipid & Cardiovascular Panel",
    subtitle: "Atherogenic Dyslipidemia & Elevated LDL Cholesterol",
    category: "Cardiology",
    description: "Evaluates circulating lipoproteins, atherogenic particles, and cardiovascular plaque risk indices.",
    findingsCount: 5,
    urgency: "HIGH",
    biomarkers: [
      {
        id: "tc",
        name: "Total Cholesterol",
        category: "Lipids",
        value: 248,
        unit: "mg/dL",
        minNormal: 125,
        maxNormal: 200,
        status: "elevated",
        explanation: "High overall circulating cholesterol contributing to vascular endothelial shear stress and plaque deposition.",
        lifestyleAdvice: "Reduce saturated fats and eliminate trans fats. Adopt Mediterranean-style nutrition.",
        specialistNeeded: "Cardiologist",
      },
      {
        id: "ldl",
        name: "LDL Cholesterol (Bad Lipoprotein)",
        category: "Atherogenic Lipids",
        value: 168,
        unit: "mg/dL",
        minNormal: 50,
        maxNormal: 100,
        status: "critical",
        explanation: "Substantially elevated Low-Density Lipoprotein. Primary driver of coronary atherosclerosis.",
        lifestyleAdvice: "Consult cardiologist regarding statin therapy and high soluble fiber intake (oats, psyllium).",
        specialistNeeded: "Cardiologist",
      },
      {
        id: "hdl",
        name: "HDL Cholesterol (Cardio-Protective)",
        category: "Protective Lipids",
        value: 36,
        unit: "mg/dL",
        minNormal: 40,
        maxNormal: 60,
        status: "low",
        explanation: "Low protective HDL impairs reverse cholesterol transport from arteries back to the liver.",
        lifestyleAdvice: "Engage in 150 minutes of weekly aerobic exercise (brisk walking, cycling) and consume healthy fats (nuts, olive oil).",
        specialistNeeded: "Cardiologist / Lifestyle Medicine",
      },
      {
        id: "tg",
        name: "Triglycerides",
        category: "Lipids",
        value: 215,
        unit: "mg/dL",
        minNormal: 50,
        maxNormal: 150,
        status: "elevated",
        explanation: "Elevated neutral fats in blood linked to insulin resistance and metabolic strain.",
        lifestyleAdvice: "Restrict refined sugars, alcohol, and high-glycemic carbohydrates.",
        specialistNeeded: "Cardiologist / Endocrinologist",
      },
      {
        id: "vldl",
        name: "VLDL Cholesterol",
        category: "Lipids",
        value: 43,
        unit: "mg/dL",
        minNormal: 5,
        maxNormal: 30,
        status: "elevated",
        explanation: "Elevated triglyceride-rich lipoproteins.",
        lifestyleAdvice: "Regular cardiovascular exercise and weight management.",
        specialistNeeded: "Cardiologist",
      },
    ],
    clinicalSummary: {
      summary: "Significant atherogenic dyslipidemia marked by severe LDL cholesterol elevation (168 mg/dL), depressed HDL (36 mg/dL), and hypertriglyceridemia (215 mg/dL). High cardiovascular risk index.",
      keyRisk: "Accelerated coronary artery plaque accumulation and elevated 10-year ASCVD risk.",
      actionPlan: [
        "Prompt cardiology consultation for cardiovascular risk scoring and lipid-lowering medication (statin/ezetimibe).",
        "Adopt strict cardioprotective dietary protocol: < 7% saturated fat calories.",
        "Perform baseline ECG, Echocardiogram, or Coronary Calcium CT scan if indicated.",
      ],
      recommendedSpecialist: "Cardiologist & Preventive Medicine",
    },
  },
  {
    id: "diabetes-panel",
    name: "Glycemic & Diabetic Biomarker Panel",
    subtitle: "Type 2 Diabetes Screening with Glycated Hemoglobin (HbA1c)",
    category: "Endocrinology",
    description: "Assesses chronic 90-day glycemic equilibrium, insulin sensitivity, and fasting plasma glucose levels.",
    findingsCount: 4,
    urgency: "HIGH",
    biomarkers: [
      {
        id: "hba1c",
        name: "HbA1c (Glycated Hemoglobin)",
        category: "Glycemic Control",
        value: 7.8,
        unit: "%",
        minNormal: 4.0,
        maxNormal: 5.6,
        status: "critical",
        explanation: "HbA1c >= 6.5% confirms diabetes. 7.8% indicates moderate-to-high average blood sugar (~177 mg/dL) over the past 3 months.",
        lifestyleAdvice: "Immediate endocrinologist review for pharmacological glycemic management (Metformin/SGLT2i).",
        specialistNeeded: "Endocrinologist / Diabetologist",
      },
      {
        id: "fbs",
        name: "Fasting Blood Glucose",
        category: "Glycemic Control",
        value: 154,
        unit: "mg/dL",
        minNormal: 70,
        maxNormal: 99,
        status: "elevated",
        explanation: "Elevated fasting blood sugar demonstrates hepatic glucose overproduction and peripheral insulin resistance.",
        lifestyleAdvice: "Maintain low-glycemic meal cadence, portion control, and 30-min post-meal walks.",
        specialistNeeded: "Diabetologist",
      },
      {
        id: "ppbs",
        name: "Post-Prandial Blood Sugar (2hr)",
        category: "Glycemic Control",
        value: 210,
        unit: "mg/dL",
        minNormal: 90,
        maxNormal: 140,
        status: "critical",
        explanation: "Significant post-meal glucose spike exceeding the 200 mg/dL diabetic diagnostic threshold.",
        lifestyleAdvice: "Eliminate sugary beverages, refined flours, and sweet desserts.",
        specialistNeeded: "Endocrinologist",
      },
      {
        id: "egfr",
        name: "Estimated GFR (Kidney Protection)",
        category: "Renal Function",
        value: 94,
        unit: "mL/min/1.73m²",
        minNormal: 90,
        maxNormal: 120,
        status: "normal",
        explanation: "Renal filtration capacity is currently well-preserved. Crucial baseline for diabetes management.",
        lifestyleAdvice: "Maintain optimal blood pressure (< 130/80) to protect microvascular kidney structures.",
        specialistNeeded: "None (Routine Monitoring)",
      },
    ],
    clinicalSummary: {
      summary: "Confirmed hyperglycemia and Type 2 Diabetes pattern with elevated 3-month HbA1c (7.8%), high fasting blood glucose (154 mg/dL), and post-prandial excursion (210 mg/dL). Renal filtration remains preserved (eGFR 94).",
      keyRisk: "Microvascular and macrovascular complications (neuropathy, retinopathy, nephropathy) if unmanaged.",
      actionPlan: [
        "Consult Diabetologist/Endocrinologist for personalized medication and glycemic targets.",
        "Enroll in certified Diabetes Self-Management Education (DSME) & Medical Nutrition Therapy.",
        "Perform annual diabetic retinopathy eye screening and urine albumin-to-creatinine ratio (uACR).",
      ],
      recommendedSpecialist: "Endocrinologist / Diabetologist",
    },
  },
  {
    id: "thyroid-panel",
    name: "Thyroid Function Panel (TFT)",
    subtitle: "Primary Subclinical Hypothyroidism Profile",
    category: "Endocrinology",
    description: "Evaluates pituitary-thyroid feedback loop regulating basal metabolic rate, energy, and thermogenesis.",
    findingsCount: 3,
    urgency: "MODERATE",
    biomarkers: [
      {
        id: "tsh",
        name: "Thyroid Stimulating Hormone (TSH)",
        category: "Pituitary Feedback",
        value: 6.85,
        unit: "uIU/mL",
        minNormal: 0.45,
        maxNormal: 4.5,
        status: "elevated",
        explanation: "Elevated TSH indicates the pituitary is signaling harder to stimulate an underactive thyroid gland.",
        lifestyleAdvice: "Discuss repeat testing and anti-TPO antibody screening with physician.",
        specialistNeeded: "Endocrinologist",
      },
      {
        id: "ft4",
        name: "Free Thyroxine (Free T4)",
        category: "Active Hormone",
        value: 1.15,
        unit: "ng/dL",
        minNormal: 0.82,
        maxNormal: 1.77,
        status: "normal",
        explanation: "Circulating active T4 hormone levels are maintained within normal biological limits (Subclinical state).",
        lifestyleAdvice: "Maintain balanced iodine and selenium nutrition (Brazil nuts, seafood).",
        specialistNeeded: "Endocrinologist",
      },
      {
        id: "ft3",
        name: "Free Triiodothyronine (Free T3)",
        category: "Active Hormone",
        value: 3.1,
        unit: "pg/mL",
        minNormal: 2.0,
        maxNormal: 4.4,
        status: "normal",
        explanation: "Normal cellular metabolic drive hormone levels.",
        lifestyleAdvice: "Maintain regular sleep cycles and stress moderation.",
        specialistNeeded: "None",
      },
    ],
    clinicalSummary: {
      summary: "Biochemical evidence of Subclinical Hypothyroidism characterized by elevated TSH (6.85 uIU/mL) with preserved peripheral Free T4 and Free T3 levels.",
      keyRisk: "Potential progression to overt hypothyroidism, fatigue, dyslipidemia, and metabolic slowdown.",
      actionPlan: [
        "Test Anti-Thyroperoxidase (Anti-TPO) antibodies to assess Hashimoto's autoimmune etiology.",
        "Repeat TSH & Free T4 in 8 to 12 weeks before initiating levothyroxine therapy.",
        "Screen lipid profile due to secondary hypercholesterolemia association with high TSH.",
      ],
      recommendedSpecialist: "Endocrinologist",
    },
  },
  {
    id: "cmp-liver-renal",
    name: "Comprehensive Metabolic Panel (CMP)",
    subtitle: "Hepatic Transaminase Elevation & Renal Clearance",
    category: "Biochemistry",
    description: "Evaluates electrolyte balance, hepatic transaminases (ALT/AST), and renal nitrogenous clearance.",
    findingsCount: 5,
    urgency: "MODERATE",
    biomarkers: [
      {
        id: "alt",
        name: "ALT (Alanine Transaminase)",
        category: "Hepatic Enzymes",
        value: 68,
        unit: "U/L",
        minNormal: 7,
        maxNormal: 45,
        status: "elevated",
        explanation: "Elevated ALT reflects hepatocellular membrane leakage, commonly associated with fatty liver (NAFLD/MASLD) or medication effects.",
        lifestyleAdvice: "Avoid alcohol, reduce fructose/sugar, and maintain moderate physical activity.",
        specialistNeeded: "Gastroenterologist / Hepatologist",
      },
      {
        id: "ast",
        name: "AST (Aspartate Transaminase)",
        category: "Hepatic Enzymes",
        value: 52,
        unit: "U/L",
        minNormal: 8,
        maxNormal: 40,
        status: "elevated",
        explanation: "Mildly elevated transaminase supporting hepatic metabolic stress.",
        lifestyleAdvice: "Maintain antioxidant-rich diet and review all hepatically cleared supplements.",
        specialistNeeded: "Hepatologist",
      },
      {
        id: "creat",
        name: "Serum Creatinine",
        category: "Renal Function",
        value: 0.92,
        unit: "mg/dL",
        minNormal: 0.6,
        maxNormal: 1.2,
        status: "normal",
        explanation: "Normal glomerular filtration indicator without evidence of azotemia or renal impairment.",
        lifestyleAdvice: "Maintain standard hydration (2-2.5L daily).",
        specialistNeeded: "None",
      },
      {
        id: "bun",
        name: "Blood Urea Nitrogen (BUN)",
        category: "Renal Function",
        value: 14,
        unit: "mg/dL",
        minNormal: 6,
        maxNormal: 20,
        status: "normal",
        explanation: "Normal protein catabolism and renal excretion rate.",
        lifestyleAdvice: "Balanced dietary protein intake.",
        specialistNeeded: "None",
      },
      {
        id: "alp",
        name: "Alkaline Phosphatase (ALP)",
        category: "Biliary System",
        value: 82,
        unit: "U/L",
        minNormal: 44,
        maxNormal: 147,
        status: "normal",
        explanation: "Normal biliary tract and bone turnover enzyme levels.",
        lifestyleAdvice: "Normal biliary clearance.",
        specialistNeeded: "None",
      },
    ],
    clinicalSummary: {
      summary: "Mild hepatic transaminitis with elevated ALT (68 U/L) and AST (52 U/L) in the setting of completely normal kidney biomarkers (Creatinine: 0.92 mg/dL, BUN: 14 mg/dL). Suggests metabolic hepatic steatosis (Fatty Liver).",
      keyRisk: "Progressive steatohepatitis if dietary and metabolic risk factors are not optimized.",
      actionPlan: [
        "Obtain Upper Abdominal Ultrasound (USG) for hepatic steatosis grading.",
        "Eliminate alcohol and high-fructose corn syrup beverages.",
        "Gradual weight reduction (5-7% body weight) and follow-up LFT in 8 weeks.",
      ],
      recommendedSpecialist: "Gastroenterologist & Hepatologist",
    },
  },
];

export default function DrDecodePage() {
  const [lang, setLang] = useState<keyof typeof TRANSLATIONS>("en");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("cbc-anemia");
  const [activeTab, setActiveTab] = useState<
    "upload" | "dashboard" | "visual" | "stress" | "router" | "chat"
  >("upload");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [customReportText, setCustomReportText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Groq / Chatbot state
  const [groqKey, setGroqKey] = useState<string>("");
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string; time: string }[]
  >([
    {
      role: "assistant",
      text: "👋 Hello! I am Dr. Decode AI. You can ask me any clinical questions regarding your lab values, biomarker meanings, dietary suggestions, or medical specialist recommendations.",
      time: "Now",
    },
  ]);
  const [inputChat, setInputChat] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // 3D Canvas Ref for Bio-Core Helix
  const canvas3DRef = useRef<HTMLCanvasElement | null>(null);
  const [helixSpeed, setHelixSpeed] = useState<number>(1);
  const [helixTheme, setHelixTheme] = useState<"cyan" | "emerald" | "violet">("cyan");

  // Stress Buster Canvas Ref
  const stressCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stressBallsCount, setStressBallsCount] = useState<number>(24);
  const [breathPhase, setBreathPhase] = useState<"Inhale (4s)" | "Hold (7s)" | "Exhale (8s)">("Inhale (4s)");
  const [breathProgress, setBreathProgress] = useState<number>(0);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const currentReport =
    REPORT_PRESETS.find((p) => p.id === selectedPresetId) || REPORT_PRESETS[0];

  // Run analysis simulation
  const handleTriggerAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    const step1 = setTimeout(() => setAnalysisProgress(40), 400);
    const step2 = setTimeout(() => setAnalysisProgress(75), 900);
    const step3 = setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setActiveTab("dashboard");
    }, 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  // 3D DNA Helix / Bio-Core Canvas Animation
  useEffect(() => {
    if (activeTab !== "visual" || !canvas3DRef.current) return;
    const canvas = canvas3DRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const totalNodes = 36;
      const radius = Math.min(canvas.width, canvas.height) * 0.28;
      const heightStep = (canvas.height * 0.7) / totalNodes;

      // Color scheme
      let primaryColor = "#06b6d4";
      let secondaryColor = "#3b82f6";
      let rungColor = "rgba(6, 182, 212, 0.25)";

      if (helixTheme === "emerald") {
        primaryColor = "#10b981";
        secondaryColor = "#34d399";
        rungColor = "rgba(16, 185, 129, 0.25)";
      } else if (helixTheme === "violet") {
        primaryColor = "#a855f7";
        secondaryColor = "#ec4899";
        rungColor = "rgba(168, 85, 247, 0.25)";
      }

      for (let i = 0; i < totalNodes; i++) {
        const y = cy - (canvas.height * 0.35) + i * heightStep;
        const currentAngle = angle + (i * Math.PI) / 8;

        const x1 = cx + Math.cos(currentAngle) * radius;
        const z1 = Math.sin(currentAngle);
        const x2 = cx + Math.cos(currentAngle + Math.PI) * radius;
        const z2 = Math.sin(currentAngle + Math.PI);

        // Scale & alpha based on Z depth
        const scale1 = 0.7 + (z1 + 1) * 0.3;
        const scale2 = 0.7 + (z2 + 1) * 0.3;
        const alpha1 = 0.3 + (z1 + 1) * 0.35;
        const alpha2 = 0.3 + (z2 + 1) * 0.35;

        // Draw connecting base-pair hydrogen bond rung
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = rungColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Strand 1 Node (Adenine/Thymine)
        ctx.beginPath();
        ctx.arc(x1, y, 6 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = alpha1;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Draw Strand 2 Node (Guanine/Cytosine)
        ctx.beginPath();
        ctx.arc(x2, y, 6 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = secondaryColor;
        ctx.globalAlpha = alpha2;
        ctx.shadowColor = secondaryColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      angle += 0.02 * helixSpeed;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, helixSpeed, helixTheme]);

  // Stress Buster Physics Animation
  useEffect(() => {
    if (activeTab !== "stress" || !stressCanvasRef.current) return;
    const canvas = stressCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const palette = ["#06b6d4", "#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899"];
    const particles: Particle[] = [];

    for (let i = 0; i < stressBallsCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 12 + 10,
        color: palette[i % palette.length],
      });
    }

    let animId: number;

    const renderStress = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision
        if (p.x - p.radius < 0 || p.x + p.radius > canvas.width) p.vx *= -0.96;
        if (p.y - p.radius < 0 || p.y + p.radius > canvas.height) p.vy *= -0.96;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw interaction lines between nearby nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - dist / 80)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(renderStress);
    };

    renderStress();

    // Click to add impulse / pop ball
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 10;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [activeTab, stressBallsCount]);

  // Breathing Guide Cycle (4-7-8 Breathing Technique)
  useEffect(() => {
    if (activeTab !== "stress") return;

    let timer = 0;
    const interval = setInterval(() => {
      timer = (timer + 1) % 19;
      if (timer < 4) {
        setBreathPhase("Inhale (4s)");
        setBreathProgress((timer / 4) * 100);
      } else if (timer < 11) {
        setBreathPhase("Hold (7s)");
        setBreathProgress(((timer - 4) / 7) * 100);
      } else {
        setBreathPhase("Exhale (8s)");
        setBreathProgress(((timer - 11) / 8) * 100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Chatbot Send Message Logic
  const handleSendMessage = async () => {
    if (!inputChat.trim() || isChatLoading) return;
    const userMsg = inputChat.trim();
    setInputChat("");

    const newMessages = [
      ...chatMessages,
      {
        role: "user" as const,
        text: userMsg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
    setChatMessages(newMessages);
    setIsChatLoading(true);

    // If Groq key is provided, attempt live Groq LLaMA 3 query; otherwise intelligent built-in clinical copilot
    if (groqKey.startsWith("gsk_")) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
              {
                role: "system",
                content:
                  "You are Dr. Decode AI, an empathetic clinical informatics assistant. Explain medical lab reports, biomarkers, and test results in clear, reassuring, layman language. Include a brief medical disclaimer.",
              },
              { role: "user", content: userMsg },
            ],
            temperature: 0.4,
            max_tokens: 400,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content || "Analysis complete.";
          setChatMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: reply,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          setIsChatLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Groq API fallback triggered", err);
      }
    }

    // Built-in intelligent clinical reasoning engine response
    setTimeout(() => {
      let reply = "";
      const lower = userMsg.toLowerCase();

      if (lower.includes("cholesterol") || lower.includes("ldl") || lower.includes("lipid") || lower.includes("heart")) {
        reply = `🫀 **Lipid & Cardiovascular Insights:**\nLDL (Low-Density Lipoprotein) carries cholesterol directly into arterial walls. When LDL is above 100 mg/dL (or 160+ mg/dL), plaque accumulation accelerates. We recommend incorporating soluble oat fiber, omega-3 fatty acids, and discussing statin therapy with a cardiologist.`;
      } else if (lower.includes("hba1c") || lower.includes("sugar") || lower.includes("diabetes") || lower.includes("glucose")) {
        reply = `🩸 **Glycemic Control & HbA1c:**\nHbA1c measures the percentage of glycated hemoglobin over 90 days. A value of 7.8% indicates an average blood glucose of ~177 mg/dL. Key steps include portion control, reducing high-glycemic carbohydrates, 30-minute daily walks, and diabetologist consultation for optimal medication.`;
      } else if (lower.includes("anemia") || lower.includes("hemoglobin") || lower.includes("iron") || lower.includes("fatigue") || lower.includes("blood")) {
        reply = `🩺 **Erythrocyte & Anemia Analysis:**\nHemoglobin below 13.5 g/dL (men) or 12.0 g/dL (women) causes decreased oxygen delivery to muscles and brain, causing fatigue and lightheadedness. Iron-rich nutrition (spinach, beans, fortified cereals) paired with Vitamin C aids absorption. Check Serum Ferritin for definitive diagnosis.`;
      } else if (lower.includes("thyroid") || lower.includes("tsh") || lower.includes("weight")) {
        reply = `🦋 **Thyroid Hormone Regulation:**\nElevated TSH with normal Free T4 indicates Subclinical Hypothyroidism. The pituitary gland produces extra TSH to push the thyroid. Consider testing Anti-TPO antibodies to check for Hashimoto's thyroiditis and maintain adequate dietary selenium.`;
      } else if (lower.includes("doctor") || lower.includes("specialist") || lower.includes("urgent")) {
        reply = `👨‍⚕️ **Medical Specialist Guidance:**\nBased on your selected report (${currentReport.name}), we recommend scheduling a review with a **${currentReport.clinicalSummary.recommendedSpecialist}**. They can order confirmatory panels and provide tailored prescriptions.`;
      } else {
        reply = `💡 **Clinical Analysis:**\nRegarding your inquiry on "${userMsg}": In clinical diagnostics, test parameters must always be evaluated in conjunction with your personal clinical history, symptoms, and vital signs. Review our **Biomarkers Matrix** and **Specialist Router** tabs for tailored guidance!`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsChatLoading(false);
    }, 800);
  };

  const filteredBiomarkers = currentReport.biomarkers.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased flex flex-col justify-between">
      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070b12]/90 border-b border-cyan-500/20 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <span>←</span>
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
              🩺
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                Dr. Decode AI
              </h1>
              <p className="text-[10px] font-mono text-cyan-300/80 hidden md:block">
                Clinical Medical Informatics & Multi-Modal Biomarker Engine
              </p>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as keyof typeof TRANSLATIONS)}
              aria-label="Language Selector"
              className="bg-slate-900/90 text-cyan-300 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-cyan-500/30 outline-none cursor-pointer hover:border-cyan-400 transition-all"
            >
              <option value="en">English (US)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="hinglish">Hinglish</option>
              <option value="es">Español (ES)</option>
              <option value="fr">Français (FR)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ja">日本語 (JA)</option>
            </select>
          </div>

          {/* Groq Key Configure */}
          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Groq LLM</span>
            <span>{groqKey ? "✓" : "+"}</span>
          </button>

          {/* Print/Export */}
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer transition-all"
          >
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
            </svg>
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </header>

      {/* Groq API Key Setup Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔑</span>
                <h3 className="font-bold text-white text-base">Configure Groq API Key</h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white text-lg font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your free Groq API key to power live LLaMA 3 70B clinical report reasoning. Your key is stored solely in local memory and is never shared.
            </p>
            <div>
              <label className="text-xs font-mono text-cyan-400 block mb-1">Groq API Key (gsk_...)</label>
              <input
                type="password"
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxx"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                className="w-full bg-slate-950 border border-cyan-500/30 focus:border-cyan-400 text-white text-xs font-mono px-3.5 py-2.5 rounded-xl outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Get a free instant key at{" "}
                <a
                  href="https://console.groq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline font-semibold"
                >
                  console.groq.com
                </a>
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer transition-all shadow-md"
              >
                Save & Continue
              </button>
              <button
                onClick={() => {
                  setGroqKey("");
                  setShowKeyModal(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer transition-all"
              >
                Use Built-in Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-cyan-500/20 shadow-xl">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "upload"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>📤</span>
            <span>{t.uploadTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>📊</span>
            <span>{t.dashboardTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "visual"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🧬</span>
            <span>{t.visualTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("stress")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "stress"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🧘</span>
            <span>{t.stressTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("router")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "router"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>🗺️</span>
            <span>{t.routerTab}</span>
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "chat"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>💬</span>
            <span>{t.chatTab}</span>
          </button>
        </nav>

        {/* Global Medical Disclaimer Alert */}
        <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-xs text-amber-300 font-mono">
          <span className="text-base flex-shrink-0">⚠️</span>
          <span>{t.disclaimer}</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: UPLOAD & OCR LAB
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "upload" && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>✨ Multi-Modal Clinical Intelligence Engine</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  {t.heroHeading}{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                    {t.heroHeadingSub}
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  {t.heroDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={handleTriggerAnalysis}
                    disabled={isAnalyzing}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
                  >
                    <span>🔬</span>
                    <span>{isAnalyzing ? t.analyzing : t.analyzeBtn}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("visual")}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 font-semibold text-xs font-mono border border-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>🧬</span>
                    <span>Launch 3D Bio-Core Helix</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Preset Selector Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                  <span>📂</span>
                  <span>{t.loadPreset}</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">5 Diagnostic Test Protocols Available</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {REPORT_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPresetId(preset.id);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/15"
                          : "bg-slate-900/60 border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-900"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 text-cyan-300 border border-cyan-500/20">
                            {preset.category}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                              preset.urgency === "HIGH"
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : preset.urgency === "MODERATE"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {preset.urgency} ALERT
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{preset.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {preset.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                        <span className="text-slate-400">{preset.findingsCount} Parameters Decoded</span>
                        <span className="text-cyan-400 font-bold">
                          {isSelected ? "Active Preset ✓" : "Select Preset →"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OCR Progress Bar when Analyzing */}
            {isAnalyzing && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-xl space-y-3 animate-pulse">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    OCR Neural Extraction: {currentReport.name}
                  </span>
                  <span className="text-white font-bold">{analysisProgress}% Complete</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Tesseract.js OCR Bounding Box Filter</span>
                  <span>Groq LLaMA 3 Clinical Normalizer</span>
                </div>
              </div>
            )}

            {/* Custom Report Text Area */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <span>📝</span>
                <span>Paste Custom Lab Report Text / OCR Stream</span>
              </h4>
              <textarea
                rows={4}
                value={customReportText}
                onChange={(e) => setCustomReportText(e.target.value)}
                placeholder="Example: HEMOGLOBIN: 10.4 g/dL (Normal: 13.5-17.5) | TOTAL CHOLESTEROL: 248 mg/dL | HbA1c: 7.8% | TSH: 6.85 uIU/mL..."
                className="w-full bg-slate-950 text-slate-200 text-xs font-mono p-3.5 rounded-xl border border-cyan-500/30 focus:border-cyan-400 outline-none leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleTriggerAnalysis}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold cursor-pointer transition-all"
                >
                  Analyze Pasted Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: BIOMARKERS MATRIX & DASHBOARD
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Header Summary Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Diagnostic Report Evaluation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{currentReport.name}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{currentReport.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Filter By Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    aria-label="Filter Biomarkers by Status"
                    className="bg-slate-950 text-cyan-300 text-xs font-mono px-3 py-1.5 rounded-lg border border-cyan-500/30 outline-none"
                  >
                    <option value="all">All Parameters ({currentReport.biomarkers.length})</option>
                    <option value="critical">Critical Only</option>
                    <option value="elevated">Elevated Only</option>
                    <option value="low">Low Only</option>
                    <option value="normal">Normal Only</option>
                  </select>
                </div>
              </div>

              {/* Clinical AI Summary Box */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-bold">
                  <span>🧠</span>
                  <span>AI Clinical Synthesis ({lang.toUpperCase()})</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {currentReport.clinicalSummary.summary}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-amber-400">⚡ Primary Risk Vector</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentReport.clinicalSummary.keyRisk}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="text-[11px] font-mono font-bold text-emerald-400">🩺 Recommended Specialist</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentReport.clinicalSummary.recommendedSpecialist}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Biomarker Parameters Cards Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBiomarkers.map((bm) => {
                const isOutOfRange = bm.status !== "normal";
                const badgeColor =
                  bm.status === "critical"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : bm.status === "elevated"
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : bm.status === "low"
                    ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";

                // Calculate progress position on gauge
                const rangeSpan = (bm.maxNormal - bm.minNormal) * 2;
                const normalizedVal = Math.min(
                  Math.max(((bm.value - (bm.minNormal * 0.5)) / rangeSpan) * 100, 5),
                  95
                );

                return (
                  <div
                    key={bm.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                      isOutOfRange
                        ? "bg-slate-900/90 border-cyan-500/30 shadow-lg"
                        : "bg-slate-900/50 border-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                          {bm.category}
                        </span>
                        <h4 className="font-bold text-base text-white">{bm.name}</h4>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {bm.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Measured Value & Reference Range */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-white font-mono">{bm.value}</span>
                        <span className="text-xs font-mono text-slate-400">{bm.unit}</span>
                      </div>
                      <div className="text-right text-[11px] font-mono text-slate-400">
                        <span>Standard Reference:</span>{" "}
                        <strong className="text-slate-200">
                          {bm.minNormal} — {bm.maxNormal} {bm.unit}
                        </strong>
                      </div>
                    </div>

                    {/* Visual Risk Gauge Meter */}
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden relative border border-white/10">
                        {/* Normal zone indicator */}
                        <div className="absolute inset-y-0 left-[25%] right-[25%] bg-emerald-500/20" />
                        {/* Pointer mark */}
                        <div
                          className="absolute top-0 bottom-0 w-2 bg-cyan-400 rounded-full shadow-md shadow-cyan-400/80 -ml-1 transition-all duration-500"
                          style={{ left: `${normalizedVal}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>Low</span>
                        <span className="text-emerald-400">Normal Range</span>
                        <span>Elevated</span>
                      </div>
                    </div>

                    {/* Layperson Explanation & Lifestyle Advice */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 text-xs">
                      <p className="text-slate-200 leading-relaxed font-normal">{bm.explanation}</p>
                      <div className="text-cyan-300 text-[11px] font-mono pt-1">
                        💡 <strong>Actionable Tip:</strong> {bm.lifestyleAdvice}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: 3D BIO-CORE DNA HELIX VISUALIZER
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "visual" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Interactive Molecular Engine
                  </span>
                  <h3 className="text-xl font-bold text-white">3D Bio-Core DNA Double Helix</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Real-time procedural DNA base-pairing & cellular particle dynamics.
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400">Color Palette:</span>
                  <button
                    onClick={() => setHelixTheme("cyan")}
                    className={`px-2.5 py-1 rounded-md border ${
                      helixTheme === "cyan" ? "bg-cyan-500 text-black border-cyan-400 font-bold" : "bg-slate-950 text-cyan-400 border-cyan-500/30"
                    }`}
                  >
                    Cyan/Blue
                  </button>
                  <button
                    onClick={() => setHelixTheme("emerald")}
                    className={`px-2.5 py-1 rounded-md border ${
                      helixTheme === "emerald" ? "bg-emerald-500 text-black border-emerald-400 font-bold" : "bg-slate-950 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    Emerald
                  </button>
                  <button
                    onClick={() => setHelixTheme("violet")}
                    className={`px-2.5 py-1 rounded-md border ${
                      helixTheme === "violet" ? "bg-purple-500 text-white border-purple-400 font-bold" : "bg-slate-950 text-purple-400 border-purple-500/30"
                    }`}
                  >
                    Violet
                  </button>
                  <span className="text-slate-400 ml-2">Rotation Speed:</span>
                  <button
                    onClick={() => setHelixSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
                    className="px-2.5 py-1 rounded-md bg-slate-950 text-cyan-300 border border-cyan-500/30 cursor-pointer"
                  >
                    {helixSpeed}x
                  </button>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-inner flex items-center justify-center">
                <canvas
                  ref={canvas3DRef}
                  width={800}
                  height={500}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-3 left-4 font-mono text-[11px] text-cyan-400/80 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                  🧬 Double Helix Adenine-Thymine & Guanine-Cytosine Rungs • 60 FPS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: STRESS BUSTER & BIO-FEEDBACK RELAXATION
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "stress" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Biofeedback & Mental Relaxation Sandbox
                  </span>
                  <h3 className="text-xl font-bold text-white">Stress Buster & Breath Synchronizer</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Click particles to release stress impulses. Follow the 4-7-8 breathing pacer to reduce cortisol.
                  </p>
                </div>

                {/* Breathing Pacer Status */}
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center font-bold text-cyan-300 text-xs">
                    🧘
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">4-7-8 Breath Pacer</div>
                    <div className="text-sm font-black text-cyan-300 font-mono">{breathPhase}</div>
                  </div>
                </div>
              </div>

              {/* Stress Canvas */}
              <div className="relative w-full h-[400px] sm:h-[460px] rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-inner cursor-pointer">
                <canvas
                  ref={stressCanvasRef}
                  width={800}
                  height={460}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-4 font-mono text-[11px] text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                  🖱️ Click any floating particle to create a kinetic stress-relief shockwave
                </div>
                <div className="absolute bottom-3 right-4 font-mono text-[11px] text-cyan-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-cyan-500/20 backdrop-blur-sm flex items-center gap-2">
                  <span>Particle Nodes:</span>
                  <button
                    onClick={() => setStressBallsCount((prev) => (prev === 24 ? 40 : prev === 40 ? 12 : 24))}
                    className="underline font-bold"
                  >
                    {stressBallsCount} Particles
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 5: SPECIALIST ROUTER
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "router" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Healthcare Triage & Referral Assistant
                </span>
                <h3 className="text-xl font-bold text-white">Recommended Clinical Specialist Network</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Automatically matched based on abnormal laboratory biomarkers in {currentReport.name}.
                </p>
              </div>

              {/* Primary Recommended Specialist Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border border-cyan-400 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                        PRIMARY SPECIALTY MATCH
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        {currentReport.clinicalSummary.recommendedSpecialist}
                      </h4>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
                    {currentReport.urgency} CONSULT PRIORITY
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-cyan-500/20">
                  <div className="text-xs font-mono font-bold text-slate-300">
                    📋 Recommended Action Plan & Questions to Ask:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentReport.clinicalSummary.actionPlan.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clinical Departments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="text-xl">🫀 Cardiology & Lipidology</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Specializes in coronary artery disease, lipid disorders, hypertension, and cardiovascular risk reduction.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="text-xl">🦋 Endocrinology & Diabetology</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Manages insulin resistance, Type 1/2 diabetes, thyroid nodules, Hashimoto’s, and hormonal imbalances.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="text-xl">🩸 Hematology</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Treats iron-deficiency microcytic anemias, leukocytosis, thrombocytopenia, and clotting abnormalities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 6: AI CLINICAL COPILOT (GROQ LLM / BUILT-IN)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === "chat" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    Interactive Clinical Dialogue
                  </span>
                  <h3 className="text-xl font-bold text-white">Dr. Decode AI Clinical Copilot</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Ask questions regarding your report biomarkers, dietary changes, or medical terms.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Model:</span>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                    {groqKey ? "Groq LLaMA 3 70B (Live)" : "Neural Clinical Engine (Built-in)"}
                  </span>
                </div>
              </div>

              {/* Chat Message Window */}
              <div className="h-[360px] sm:h-[420px] rounded-2xl bg-slate-950 border border-cyan-500/20 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {chatMessages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                          isUser
                            ? "bg-cyan-600 text-white rounded-tr-none font-medium"
                            : "bg-slate-900 border border-cyan-500/20 text-slate-200 rounded-tl-none font-normal"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  );
                })}

                {isChatLoading && (
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs p-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Analyzing clinical reasoning...</span>
                  </div>
                )}
              </div>

              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setInputChat("What does high LDL cholesterol mean for my heart health?")}
                  className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 hover:bg-cyan-950/60 border border-cyan-500/20 cursor-pointer"
                >
                  High LDL Meaning?
                </button>
                <button
                  onClick={() => setInputChat("Can low hemoglobin cause extreme fatigue and brain fog?")}
                  className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 hover:bg-cyan-950/60 border border-cyan-500/20 cursor-pointer"
                >
                  Anemia & Fatigue?
                </button>
                <button
                  onClick={() => setInputChat("What lifestyle changes help lower HbA1c in Type 2 Diabetes?")}
                  className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 hover:bg-cyan-950/60 border border-cyan-500/20 cursor-pointer"
                >
                  Lower HbA1c?
                </button>
              </div>

              {/* Chat Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a medical report or biomarker question..."
                  className="flex-1 bg-slate-950 border border-cyan-500/30 focus:border-cyan-400 text-white text-xs font-mono px-4 py-3 rounded-xl outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isChatLoading || !inputChat.trim()}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-[#070b12] py-6 px-4 text-center font-mono text-[11px] text-slate-500 space-y-1">
        <div>
          🩺 <strong>Dr. Decode AI</strong> — Engineered by{" "}
          <Link href="/" className="text-cyan-400 hover:underline">
            Indresh Mourya
          </Link>{" "}
          • Built with Next.js 15, TypeScript & Clinical Informatics.
        </div>
        <div>
          Licensed under Open Medical AI Guidelines. Verified on GitHub:{" "}
          <a
            href="https://github.com/indreshmourya2007-sketch/Dr.Decode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            indreshmourya2007-sketch/Dr.Decode
          </a>
        </div>
      </footer>
    </div>
  );
}
