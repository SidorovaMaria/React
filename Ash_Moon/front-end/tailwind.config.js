/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-light": "#fff",
        main: "#091741",
        secondary: "#1d2c59",
        accent: "#ae2d47",
        tertiary: "#fcc7bf",
      },
      fontFamily: {
        AS: ["AS", "sans-serif"], // Custom font for AS
        "AS-Bold": ["AS-Bold", "sans-serif"], // Custom font for AS-Bold
        "AS-3D": ["AS-3D", "sans-serif"], // Custom font for AS-3D
        "AS-3D-Bold": ["AS-3D-Bold", "sans-serif"], // Custom font for AS-3D-Bold
        "AS-Bullet": ["AS-Bullet", "sans-serif"], // Custom font for AS-Bullet
        "AS-Outline": ["AS-Outline", "sans-serif"], // Custom font for AS-Outline
        "AS-Platinum": ["AS-Platinum", "sans-serif"], // Custom font for AS-Platinum
        mitr: ["Mitr", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
    },
  },
  plugins: [],
};
