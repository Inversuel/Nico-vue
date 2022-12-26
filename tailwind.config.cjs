/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,vue,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
    },
    extend: {
      colors: {
        prime: "#fff",
        second: "rgba(70, 157,221,1)",
      },
    },
  },
  plugins: [],
};
