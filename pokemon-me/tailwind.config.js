/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poke-h": ["Pokemon-Hollow", ...fontFamily.sans],
        "poke-s": ["Pokemon-Solid", ...fontFamily.sans],
        gummy: ["Sour Gummy"],
      },
    },
  },
  plugins: [],
};
