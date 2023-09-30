/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#b8f170",

          secondary: "#d926a9",

          accent: "#641ae6",

          neutral: "#9ca3af",

          "base-100": "#fcfcfd",

          info: "#3c6fcd",

          success: "#4ade80",
          warning: "#fde047",
          error: "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
