/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,jpg,jpeg}"],
  theme: {
    extend: {
      backgroundImage: {
        heroBg: "url(./src/components/assets/hero-bg.jpeg)",
      },
    },
  },
  plugins: [],
};
