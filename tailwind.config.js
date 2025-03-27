/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#f76c02",
        neutralGray: "#757586",
        danger: "#FF7F51",
        purple: "#8758FF",
        line: "#F2F2F2",
      },
      fontFamily: {
        halverica: ["HelveticaNeueCyr"],
      },
    },
  },
  plugins: [],
};
