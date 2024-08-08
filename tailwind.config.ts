import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: {
          light: "hsl(111, 0%, 95%)",
          dark: "hsl(240, 0%, 12%)",
        },
        foreground: {
          light: "hsl(111, 0%, 10%)",
          dark: "hsl(151, 0%, 90%)",
        },
        card: {
          light: "hsl(111, 0%, 90%)",
          dark: "hsl(218, 1%, 19%)",
        },
        cardForeground: {
          light: "hsl(111, 0%, 15%)",
          dark: "hsl(151, 0%, 90%)",
        },
        popover: {
          light: "hsl(111, 0%, 95%)",
          dark: "hsl(151, 10%, 5%)",
        },
        popoverForeground: {
          light: "hsl(111, 95%, 10%)",
          dark: "hsl(151, 0%, 90%)",
        },
        primary: {
          light: "#00F5A0",
          dark: "hsl(151, 100%, 48%)",
        },
        primaryForeground: {
          light: "hsl(0, 0%, 100%)",
          dark: "hsl(0, 0%, 100%)",
        },
        secondary: {
          light: "#00D9F5",
          dark: "hsl(151, 10%, 10%)",
        },
        secondaryForeground: {
          light: "hsl(0, 0%, 0%)",
          dark: "hsl(0, 0%, 100%)",
        },
        muted: {
          light: "hsl(73, 10%, 89%)",
          dark: "hsl(113, 10%, 15%)",
        },
        mutedForeground: {
          light: "hsl(111, 0%, 40%)",
          dark: "hsl(151, 0%, 60%)",
        },
        accent: {
          light: "hsl(73, 10%, 89%)",
          dark: "hsl(113, 10%, 15%)",
        },
        accentForeground: {
          light: "hsl(111, 0%, 15%)",
          dark: "hsl(151, 0%, 90%)",
        },
        destructive: {
          light: "hsl(0, 50%, 50%)",
          dark: "hsl(0, 50%, 30%)",
        },
        destructiveForeground: {
          light: "hsl(111, 0%, 90%)",
          dark: "hsl(151, 0%, 90%)",
        },
        border: {
          light: "hsl(111, 20%, 82%)",
          dark: "hsl(151, 20%, 18%)",
        },
        input: {
          light: "hsl(111, 20%, 50%)",
          dark: "hsl(151, 20%, 18%)",
        },
        ring: {
          light: "hsl(111, 100%, 50%)",
          dark: "hsl(151, 100%, 48%)",
        },
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: "hsl(111, 0%, 15%)",

            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.blue[950],
            subtle: colors.blue[800],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[400],
            inverted: colors.blue[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: "hsl(151, 0%, 90%)",
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        DEFAULT: "0.3rem",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to top left,#00F5A0,#00D9F5)",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    // We add this flatMap to the safelist. You can pass more than one color if needed. E.g. "[#ffcc33]","[#161616]"
    ...["[#00F5A0]"].flatMap((customColor) => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
  ],
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
