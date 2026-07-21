import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#07070a", panel: "#101014", lime: "#d9ff58" }, boxShadow: { glow: "0 0 80px rgba(217,255,88,.13)" } } },
  plugins: [],
} satisfies Config;
