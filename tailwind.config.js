// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#212a31", // Dark grey
        secondary: "#2e3944", // Slate grey
        accent: "#124e66", // Teal
        muted: "#748d92", // Light teal
        light: "#d3d9d4", // Light grey
      },
    },
  },
  plugins: [],
};
