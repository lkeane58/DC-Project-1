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
        jhu: {
          heritage: "#002D72", // Official JHU Heritage Blue
          spirit: "#68ACE5",   // Official JHU Spirit Blue
          dark: "#001E4D",
          light: "#E8F3FA",
          gold: "#EAAA00",
          accent: "#41748D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

