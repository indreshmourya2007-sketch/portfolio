import type { Metadata, Viewport } from "next";
import { Albert_Sans, Fragment_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Indresh — Software Developer & Student",
  description:
    "Personal portfolio of Indresh Mourya — Software Developer & B.Tech CSE Student at PIEMR. Engineering fullstack web applications, intelligent AI models, and cloud-native software.",
  keywords: [
    "Indresh",
    "Indresh Mourya",
    "Portfolio",
    "Software Developer",
    "Student",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "C++",
    "Cloud Computing",
  ],
  authors: [{ name: "Indresh Mourya", url: "https://indresh.dev" }],
  creator: "Indresh Mourya",
  openGraph: {
    title: "Indresh — Software Developer & Student",
    description:
      "Personal portfolio of Indresh Mourya — Software Developer & B.Tech CSE Student at PIEMR.",
    type: "website",
    locale: "en_US",
    siteName: "Indresh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indresh — Software Developer & Student",
    description:
      "Personal portfolio of Indresh Mourya — Software Developer & B.Tech CSE Student at PIEMR.",
    creator: "@INDRESHbuilds",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#edf5ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Indresh Mourya",
    jobTitle: "Software Developer & Student",
    description:
      "Software Developer and 2nd-year B.Tech CSE Student at PIEMR, Indore.",
    url: "https://indresh.dev",
    sameAs: [
      "https://github.com/indreshmourya2007-sketch",
      "https://x.com/INDRESHbuilds",
      "https://www.linkedin.com/in/indreshmourya",
      "https://instagram.com/indresh_optimist",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${albertSans.variable} ${fragmentMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('portfolio-theme');
                if (stored === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#edf5ff] dark:bg-[#070b12] text-[#0a0f18] dark:text-[#f1f5f9] font-sans antialiased selection:bg-[#0a0f18] selection:text-[#edf5ff] dark:selection:bg-[#f1f5f9] dark:selection:text-[#070b12]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
