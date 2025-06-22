/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Red Colors

        'custom-red': '#ff5a5f',

        // Orange Colors

        'occupied-orange': "#ffb319",
        'occupied-chip-background': "#ffeccb",
        'occupied-card-background': "#fff5e3",

        // Avaialble Colors
        'available-green': "#2ecc71",
        'available-chip-background': "#cef2df",
        'available-card-background': "#e5f8ee",

        // Overdue colors
        'overdue-red': "#ff4e64",
        'overdue-chip-background':"#ffd6dc",
        'overdue-card-background':"#ffe9ec",
      },
      fontFamily: {
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
