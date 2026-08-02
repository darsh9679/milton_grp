import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      colors: {
        ink: "#18201d",
        paper: "#f6f2e9",
        stone: "#d9d4c8",
        realty: {
          50: "#f4f7f5",
          100: "#e8eee9",
          500: "#526b61",
          700: "#263f37",
          900: "#14231f"
        },
        solar: {
          50: "#fff8e6",
          100: "#ffefba",
          500: "#f1aa15",
          700: "#c17107",
          900: "#43320a"
        }
      },
      boxShadow: {
        soft: "0 22px 80px rgba(24, 32, 29, 0.16)",
        glow: "0 24px 80px rgba(241, 170, 21, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
