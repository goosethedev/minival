import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      // Catppuccin's sky and crust
      accent: "#89dceb",
      background: "#11111b",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};

export default config;
