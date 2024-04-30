/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      darkBlue: "hsl(209,23%,22%)", // Dark Mode Elements
      veryDarkBlueBackground: "hsl(207,26%,17%)", // Dark Mode Background
      veryDarkBlueText: "hsl(200,15%,8%)", // Light Mode Text
      darkGray: "hsl(0,0%,52%)", // Light Mode Input
      veryLightGray: "hsl(0,0%,98%)", // Light Mode Background
      white: "hsl(0,0%,100%)", // Dark Mode Text & Light Mode Elements
    },
  },
  plugins: [require("flowbite/plugin")],
};
