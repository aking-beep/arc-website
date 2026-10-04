import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          subtle: "hsl(var(--brand-subtle))",
        },
        panel: "hsl(var(--panel))",
        "on-image": "hsl(var(--on-image))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // Surfaces are generous where small controls stay tight, which is what
        // separates a designed card from a default one.
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      /*
       * Separation comes from elevation, not from a 1px outline on every box.
       * Shadows are green-tinted so they read as shadow on a warm page rather
       * than as grey haze.
       */
      boxShadow: {
        xs: "0 1px 2px -1px hsl(165 30% 10% / 0.06), 0 1px 3px hsl(165 30% 10% / 0.04)",
        sm: "0 1px 2px hsl(165 30% 10% / 0.04), 0 4px 12px -2px hsl(165 30% 10% / 0.06)",
        md: "0 2px 4px hsl(165 30% 10% / 0.04), 0 12px 28px -8px hsl(165 30% 10% / 0.1)",
        lg: "0 4px 8px hsl(165 30% 10% / 0.04), 0 24px 48px -12px hsl(165 30% 10% / 0.14)",
        xl: "0 8px 16px hsl(165 30% 10% / 0.05), 0 40px 72px -16px hsl(165 30% 10% / 0.18)",
        lift: "0 2px 4px hsl(165 30% 10% / 0.05), 0 18px 40px -10px hsl(165 40% 10% / 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        display: "-0.032em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "slow-zoom": "slow-zoom 1.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
