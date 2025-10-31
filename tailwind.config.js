/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  safelist: [
  {
    pattern: /(bg|text|border)-(primary|destroy)/,
  },
],
  theme: {
    extend: {
      colors:
      {
        background:"#3E3E3E",
        primary:"#45A75A",
        secondary:"#F7F4EB",
destroy:"#A74545",
muted:"#9D9D9D",
primaryDark:"#367048",
destroyDark:"#963E3E",
primaryLight:"#B0F0BE",
destroyLight:"#F0B0B0",
edit:"#6CA745"
      }
    },
  },
  plugins: [],
}

