/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(12px)' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
      },
      colors: {
        "orange-gold": "#e67e22",
        "cream-light": "#fffdfa",
        cream: "#ffe0b4",
        brown: {
          DEFAULT: "#874721",
          light: "#a45b2f",
          dark: "#3a1c0b",
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
