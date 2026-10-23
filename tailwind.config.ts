import type { Config } from "tailwindcss";

/**
 * The Magic Patterns redesign authored its tokens in a Tailwind v4 `@theme`
 * block. This registers the same names in v3 so every class string in the
 * prototype (`bg-canvas`, `text-ink-2`, `border-line`, `bg-night`,
 * `text-mist-2`, `border-brand-on-dark/35`, `divide-night-line`) compiles
 * unchanged. Values live in `app/globals.css` as HSL triplets so opacity
 * modifiers work and so `.dark` can re-point them.
 *
 * The legacy semantic names are kept as aliases onto the same variables —
 * routes that have not been rebuilt pick up the new palette with no edits.
 */
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

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
      padding: "1.25rem",
      // Matches the prototype's `Container` (max-w-[1240px] px-5 sm:px-8).
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1240px", "2xl": "1240px" },
    },
    extend: {
      colors: {
        // ---- Magic Patterns tokens ----
        canvas: token("canvas"),
        paper: token("paper"),
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        line: {
          DEFAULT: token("line"),
          strong: token("line-strong"),
        },
        night: {
          DEFAULT: token("night"),
          2: token("night-2"),
          3: token("night-3"),
          line: token("night-line"),
        },
        mist: {
          DEFAULT: token("mist"),
          2: token("mist-2"),
        },
        brand: {
          DEFAULT: token("brand"),
          strong: token("brand-strong"),
          subtle: token("brand-subtle"),
          "on-dark": token("brand-on-dark"),
          foreground: token("brand-foreground"),
        },
        ok: {
          DEFAULT: token("ok"),
          subtle: token("ok-subtle"),
          "on-dark": token("ok-on-dark"),
        },
        warn: {
          DEFAULT: token("warn"),
          subtle: token("warn-subtle"),
          "on-dark": token("warn-on-dark"),
        },
        danger: {
          DEFAULT: token("danger"),
          subtle: token("danger-subtle"),
          "on-dark": token("danger-on-dark"),
        },

        // ---- Legacy semantic aliases, for routes not yet rebuilt ----
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        panel: token("panel"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
