/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        twitter: "#1DA1F2",
        reddit: "#FF4500",
        youtube: "#FF0000",
        instagram: "#C13584",
        tiktok: "#00f2ea",

        orange: "#ED8A1B",
      },
      backgroundImage: {
        clip: "url('/public/90sclip.jpg')",
        dog: "url('/public/happydog.gif')",
      },
      backgroundSize: {
        smalltile: "48px",
      },
      fontFamily: {
        default: ['"Times New Roman"'],
      },
    },
  },
  plugins: [],
};
