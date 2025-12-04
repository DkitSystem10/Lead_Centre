/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2F284F',          // Primary dark purple
          light: '#6157E1',          // Light purple
          'light-2': '#4A3F7A',      // Medium purple
          'light-3': '#4EB5A9',      // Teal accent
          'light-4': '#374854',      // Dark gray-blue
          accent: '#4EB5A9',         // Teal accent
          background: '#F8FAFC',     // Light background
        },
      },
    },
  },
  plugins: [],
}
