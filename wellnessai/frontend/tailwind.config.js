// wellnessai/frontend/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // already should exist
  ],
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        gradientMove: "gradientMove 20s ease infinite", // slow movement
      },
    },
  },
  plugins: [],
};
