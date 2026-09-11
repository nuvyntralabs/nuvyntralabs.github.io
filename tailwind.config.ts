import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ink: {
          DEFAULT: "#08070d",
          soft: "#12111a",
        },
        surface: "hsl(var(--surface))",
        lavender: {
          50: "#f6f4ff",
          100: "#ece8ff",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#3b1d7a",
          950: "#140c28",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        soft: "0 8px 30px -18px rgba(20, 12, 40, 0.22)",
        glow: "0 12px 40px -16px rgba(124, 58, 237, 0.45)",
        card: "0 1px 0 rgba(255,255,255,0.7) inset, 0 18px 40px -24px rgba(20, 12, 40, 0.28)",
        lift: "0 24px 60px -28px rgba(20, 12, 40, 0.38)",
        nav: "0 10px 40px -24px rgba(20, 12, 40, 0.28)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #6d28d9 0%, #7c3aed 45%, #8b5cf6 100%)",
        "gradient-ink":
          "radial-gradient(900px 420px at 8% -20%, rgba(139, 92, 246, 0.32), transparent 58%), radial-gradient(700px 360px at 96% 0%, rgba(56, 189, 248, 0.14), transparent 50%), linear-gradient(180deg, #08070d 0%, #12111a 52%, #08070d 100%)",
        "gradient-hero":
          "radial-gradient(900px 480px at 12% -10%, rgba(139, 92, 246, 0.16), transparent 55%), radial-gradient(720px 380px at 92% 0%, rgba(45, 212, 191, 0.1), transparent 48%), linear-gradient(180deg, #fbfaff 0%, #f3f1fb 100%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "pulse-soft": "pulse-soft 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
