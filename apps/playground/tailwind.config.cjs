const config = require('@cosmonic/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [config],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    '../../packages/orbit-ui/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/orbit-icons/src/**/*.{js,jsx,ts,tsx}',
  ],
};
