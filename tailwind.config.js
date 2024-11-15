/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./global/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'hack': ['var(--font-hack)', 'monospace'],
        'hack-bold': ['var(--font-hack-bold)', 'monospace'],
      },
      screens: {
        'mobile': { 'max': '700px' },   // => @media (max-width: 639px) { ... }
        'desktop': { 'min': '1280px' }, // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
