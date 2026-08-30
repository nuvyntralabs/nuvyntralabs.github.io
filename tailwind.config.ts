import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
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
        lavender: {
          50: "#f6f4ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(76, 29, 149, 0.15)",
        glow: "0 8px 40px -8px rgba(124, 58, 237, 0.35)",
        card: "0 10px 40px -12px rgba(76, 29, 149, 0.18)",
        lift: "0 18px 50px -20px rgba(22, 13, 44, 0.35)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 50%, #a78bfa 100%)",
        "gradient-ink":
          "radial-gradient(1200px 480px at 12% -10%, rgba(139, 92, 246, 0.28), transparent 55%), radial-gradient(900px 400px at 92% 10%, rgba(167, 139, 250, 0.18), transparent 50%), linear-gradient(180deg, #0c0618 0%, #160d2c 45%, #0c0618 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
