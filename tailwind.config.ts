import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core navy palette
        navy: {
          950: "#060d1a",
          900: "#0a1628",
          800: "#0f2040",
          700: "#162d58",
          600: "#1e3a70",
          500: "#2a4d8f",  // primary brand
          400: "#3d65b0",
          300: "#5a81cc",
          200: "#8aaee0",
          100: "#c0d5f2",
          50:  "#e8f0fb",
        },
        // JHU specific
        jhu: {
          heritage: "#002D72",
          dark:     "#001E4D",
          spirit:   "#4a7fc1",
          muted:    "#3d5a8a",
        },
        // Surface grays (slightly warm-neutral, not cool)
        surface: {
          950: "#0c0c0e",
          900: "#141418",
          800: "#1e1e24",
          700: "#28282f",
          600: "#34343d",
          500: "#4a4a56",
          400: "#6b6b7a",
          300: "#94949f",
          200: "#c2c2ca",
          100: "#e2e2e8",
          50:  "#f4f4f6",
        },
      },
      fontFamily: {
        // Lato — body copy, labels, UI text
        sans:  ["'Lato'", "var(--font-lato)", "system-ui", "sans-serif"],
        // Roboto — mono/code elements, course codes
        mono:  ["'Roboto Mono'", "var(--font-roboto)", "ui-monospace", "monospace"],
        // Inter — headings and display text
        display: ["'Inter'", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "card":   "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        "card-md": "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.08)",
        "card-lg": "0 8px 24px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.10)",
        "inset-ring": "inset 0 0 0 1px rgba(255,255,255,0.08)",
      },
      animation: {
        "fade-in": "fade-in 0.18s ease-out",
        "slide-up": "slide-up 0.22s ease-out",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
