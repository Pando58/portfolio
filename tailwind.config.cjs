/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html", //
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
        mono: ["Jetbrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
