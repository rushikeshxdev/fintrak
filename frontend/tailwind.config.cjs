// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRUCIAL: Must scan all your JS/JSX files in the src folder
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}