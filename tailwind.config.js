/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        heroBg: "url(./public/static/images/hero-bg.jpeg)",
      },
    },
  },
  plugins: [],
};
