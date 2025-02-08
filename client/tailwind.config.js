/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      proximaNova: ['"ProximaNova"', "sans-serif"],
      nelPhim: ['"NelPhim"', "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "reverse-spin": "spin 1s linear infinite reverse",
        slideAndFade: "slideAndFade 3s ease-in-out infinite",
        shakeRotate: "shakeRotate 4s ease-in-out infinite",
      },
      keyframes: {
        slideAndFade: {
          "0%": { transform: "translateX(-50%)", opacity: "0" },
          "40%": { transform: "translateX(0)", opacity: "1" },
          "60%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(50%)", opacity: "0" },
        },
        shakeRotate: {
          "0%, 25%": { transform: "rotate(0deg)" },
          "5%": { transform: "rotate(-20deg)" },
          "10%": { transform: "rotate(20deg)" },
          "15%": { transform: "rotate(-20deg)" },
          "20%": { transform: "rotate(20deg)" },
        },
      },
    },
  },
  plugins: [],
};
