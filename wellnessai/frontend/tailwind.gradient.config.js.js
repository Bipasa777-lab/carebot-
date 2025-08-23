/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'moving-aqua': "linear-gradient(180deg, #dffefe, #a6f9fc, #74f2f9)",
      },
      backgroundSize: {
        '400%': '400% 400%',
      },
      animation: {
        'moving-gradient': 'movingGradient 40s ease infinite',
      },
      keyframes: {
        movingGradient: {
          '0%': { backgroundPosition: 'top center' },
          '50%': { backgroundPosition: 'bottom center' },
          '100%': { backgroundPosition: 'top center' },
        },
      },
    },
  },
  plugins: [],
};
