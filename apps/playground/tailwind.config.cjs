const config = require('@cosmonic/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [config],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
};
