/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#ffe0b4",
        brown: {
          DEFAULT: "#874721",
          light: "#a45b2f",
        },
        green: {
          DEFAULT: "#219348",
          dark: "#1a7539",
        },
        orange: {
          DEFAULT: "#f67000",
          light: "#ff8522",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
