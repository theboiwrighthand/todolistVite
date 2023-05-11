/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        slate: {
          800: "#141E33",
        },
      },
      screens: {
        "2xl": "1736px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // require('@tailwindcss/forms'),
    ],
  darkMode: "class",
};
