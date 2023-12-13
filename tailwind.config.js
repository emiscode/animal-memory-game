/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this line as needed
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundClip: ['text'],
    },
  },
  plugins: [],
};
