import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          light: "#edf5ff",
          dark: "#070b12",
        },
        ink: {
          DEFAULT: "#0a0f18",
          dark: "#f1f5f9",
          muted: "rgba(10, 15, 24, 0.68)",
          faint: "rgba(10, 15, 24, 0.42)",
        },
      },
      fontFamily: {
        sans: ["var(--font-albert)", "system-ui", "sans-serif"],
        mono: ["var(--font-fragment)", "monospace"],
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
