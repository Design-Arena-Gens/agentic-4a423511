import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f6ff",
          100: "#e6e8ff",
          200: "#c5c9ff",
          300: "#9ca0ff",
          400: "#6d70ff",
          500: "#3f41ff",
          600: "#2427e5",
          700: "#1a1db3",
          800: "#14178a",
          900: "#13166d"
        }
      }
    }
  },
  plugins: []
};

export default config;
