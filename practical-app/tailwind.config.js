/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configure the files Tailwind should scan for classes
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    // Extend the default theme with custom values
    extend: {
      colors: {
        'custom-blue': '#007bff',
      },
      // You can add more customizations here (e.g., fontFamily, spacing)
    },
  },
  plugins: [
    // Add plugins here (e.g., require('@tailwindcss/typography'))
  ],
};
