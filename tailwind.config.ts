import type { Config } from "tailwindcss";

import daisyui from "daisyui";

import scrollbarHide from "tailwind-scrollbar-hide";

import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/base/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },

      scrollbar: {
        thin: "thin",
        thumb: "rounded-full bg-gray-300 hover:bg-gray-400",
        track: "rounded-full bg-gray-100",
      },

      container: {
        screens: {
          DEFAULT: "1500px",
        },
        center: true,
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },

        "charging-bar": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },

        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        fadeIn: "fadeIn 1s ease-in forwards",
      },
    },
  },
  plugins: [daisyui, scrollbarHide, typography],
  daisyui: {
    themes: ["var(--background)"],
  },
} satisfies Config;
