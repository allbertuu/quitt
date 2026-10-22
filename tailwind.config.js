/** @type {import('tailwindcss').Config} */
import nativewindPreset from "nativewind/preset";

export default {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        chart: {
          1: "rgb(var(--chart-1) / <alpha-value>)",
          2: "rgb(var(--chart-2) / <alpha-value>)",
          3: "rgb(var(--chart-3) / <alpha-value>)",
          4: "rgb(var(--chart-4) / <alpha-value>)",
          5: "rgb(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--sidebar) / <alpha-value>)",
          foreground: "rgb(var(--sidebar-foreground) / <alpha-value>)",
          primary: "rgb(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground":
            "rgb(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "rgb(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground":
            "rgb(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "rgb(var(--sidebar-border) / <alpha-value>)",
          ring: "rgb(var(--sidebar-ring) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        DEFAULT: "var(--radius)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      fontFamily: {
        body: "var(--font-body)",
        heading: "var(--font-heading)",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": {
          // Variáveis convertidas de HEX para RGB para suportar alpha-values
          "--background": "248 249 250",
          "--foreground": "25 25 25",
          "--card": "255 255 255",
          "--card-foreground": "25 25 25",
          "--popover": "255 255 255",
          "--popover-foreground": "25 25 25",
          "--primary": "25 25 25",
          "--primary-foreground": "255 255 255",
          "--secondary": "241 241 241",
          "--secondary-foreground": "25 25 25",
          "--muted": "241 241 241",
          "--muted-foreground": "115 115 115",
          "--accent": "138 148 122",
          "--accent-foreground": "255 255 255",
          "--destructive": "239 68 68",
          "--destructive-foreground": "255 255 255",
          "--border": "229 229 229",
          "--input": "229 229 229",
          "--ring": "25 25 25",
          "--chart-1": "25 25 25",
          "--chart-2": "138 148 122",
          "--chart-3": "74 222 128",
          "--chart-4": "251 191 36",
          "--chart-5": "96 165 250",
          "--sidebar": "255 255 255",
          "--sidebar-foreground": "25 25 25",
          "--sidebar-primary": "25 25 25",
          "--sidebar-primary-foreground": "255 255 255",
          "--sidebar-accent": "241 241 241",
          "--sidebar-accent-foreground": "25 25 25",
          "--sidebar-border": "229 229 229",
          "--sidebar-ring": "25 25 25",

          // Outras variáveis base
          "--radius": "0.5rem",
          "--radius-sm": "0.375rem",
          "--radius-md": "0.5rem",
          "--radius-lg": "1rem",
          "--radius-xl": "1.5rem",
          "--font-body": "Inter-Regular",
          "--font-heading": "Inter-Regular",

          // Sombras
          "--shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "--shadow":
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "--shadow-md":
            "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
          "--shadow-lg":
            "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
          "--shadow-xl":
            "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
          "--shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        },
      }),
  ],
};

