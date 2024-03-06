const config = require('@cosmonic/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
