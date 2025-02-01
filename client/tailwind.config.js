/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      proximaNova: ['"ProximaNova"', "sans-serif"],
      nelPhim: ['"NelPhim"', "sans-serif"],
    },
    extend: {
      animation: {
        "reverse-spin": "spin 1s linear 1 reverse",
      },
    },
  },
  plugins: [],
};

