import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: '#fbe9e2',
          100: '#f8d3c5',
          200: '#f5bda7',
          300: '#f2a78a',
          400: '#ef916c',
          500: '#f05722', // primary
          600: '#ea652f',
          700: '#c9461b',
          800: '#a13715',
          900: '#79280f',
          950: '#521a09',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
